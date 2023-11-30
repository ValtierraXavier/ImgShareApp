import React, {useState} from 'react'
import './PostModal.css'
import Comments from '../Comments/Comments.jsx'
import { postComment } from '../../Services/CommentServices/CommentServices.js'
import {updateUser, getAllUserPosts} from '../../Services/UserServices/UserServices.js'
import {linkCommentToPost, updatePost} from '../../Services/PostServices/PostServices.js'
import PostLikes from '../PostLikes/PostLikes.jsx'
import FollowButton from '../FollowButton/FollowButton.jsx'
import UserPreview from '../UserPreview/UserPreview.jsx'

export default function PostModal({usersPost, setUsersPost, setUsersPosts, getAllPosts, getPostAndComments, setPostModalData, postModalData, user, editComment, setEditComment, setEditCommentText, editCommentText, loadUserPosts, setLoadUserPosts}) {

const[commentText, setCommentText] = useState("")
const[editPost, setEditPost]= useState(false)
const[editTitle, setEditTitle]= useState('')
const[editCaption, setEditCaption]=useState('')


const closePostModal=async()=>{
        const postModal = document.getElementById('postModal')
        postModal.style.visibility = 'hidden'
        setCommentText(prev => prev = '')
        setPostModalData(prev => prev = {})
        setEditPost(prev => prev = false)
        setUsersPost(prev => prev = false)
        await getAllPosts()
    }

    
    const handleMakeComment=async(e)=>{
        e.preventDefault()
        
        const commentBox = document.getElementById('commentsContainerMap')
        const CommentBoxHeight= commentBox.scrollHeight
        const comment ={
            commentAuthor:user?user.id:null,
            commentText: commentText,
            whatPost: e.target.dataset.post_id
        }
        
        try{
            if(user){
                const newComment = await postComment(comment)
                const newCommentId = newComment.newComment.data
                await updateUser(user.id, {newCommentId})
                await linkCommentToPost(e.target.dataset.post_id, {newCommentId})
                setCommentText(prev => prev = '')
                getPostAndComments(e)
                setTimeout(()=>{commentBox.scrollTop = CommentBoxHeight},350)
            }else if(!user){
                window.alert('Cant comment...Please log in')
            }
            
        }catch(error){console.log(error.message)}
        
    }

    const startPostEdit = ()=>{
        if(editPost ===false){            
            setEditPost(prev => prev = true)
            setEditTitle(prev => prev = postModalData.title)
            setEditCaption(prev => prev = postModalData.caption)
        }else{
            setEditPost(prev => prev = false)
            setEditTitle(prev => prev = '')
            setEditCaption(prev => prev = '')
        }
    }

    const handleEditPost =async(e)=>{
        e.preventDefault()
        const postId = e.target.dataset.post_id
        const newPost={
            title: editTitle,
            caption: editCaption,
        }
        try{
            const returnedPost = await updatePost(postId, {newPost})
            if(returnedPost.status ===200){
                const userSearch = await getAllUserPosts(returnedPost.data.poster)
                setUsersPosts(prev => prev = userSearch.data)
                await getPostAndComments(e)  
            }else{window.alert('Uh oh couldnt update Post')}
            startPostEdit()
        }catch(error){console.log(error.message)}
    }

  return (
    <div className='postModal' id ='postModal'>
        {editPost?
            <div id ='PostModalInnerContainer'>
            <div className='imgAndDeets'>
                <div id = 'postModalBanner'>
                    <form>
                        <input name='title' type='text' className='postModalTitle' value={editTitle} onChange={(e)=>setEditTitle(prev => prev = e.target.value)} ></input>
                    </form>
                    <h6 className = "postBy">by <a href={`/user/${postModalData.poster?postModalData.poster._id:'noID'}`}>{postModalData.poster?postModalData.poster.userName:'username'}</a></h6>
                </div>
                <div className='imgContainer'>
                    <img  src={postModalData.url? postModalData.url: 'https://i.natgeofe.com/n/5f35194b-af37-4f45-a14d-60925b280986/NationalGeographic_2731043_4x3.jpg'} alt = 'post in modal' className='postModalImg'></img>
                </div>
                <div className='captionAndLikesContainer'>
                    <form>
                        <input name = 'caption' type='textarea' className='postModalCaption' value={editCaption} onChange={(e)=>setEditCaption(prev => prev = e.target.value)}></input>
                        <div data-post_id ={postModalData?postModalData._id:{}} onClick ={handleEditPost}>Edit Post!</div>
                    </form>
                    <div >
                        <PostLikes postlikes = {postModalData.likes?postModalData.likes:[]} user={user}  post_id = {postModalData._id} getAllPosts={getPostAndComments}/>  
                    </div>
                </div>
            </div>
            <div className='commentsContainer'>
                <div id ='postModalBanner'>
                    <h3 className='commentsContainerBanner'>Comments</h3>
                    <div onClick={closePostModal} id='closeButton'> Close</div>
                </div>
                <div className= 'commentsContainerMap' id='commentsContainerMap'>
                {postModalData.postComments && postModalData.postComments.length !== 0 ?
                    postModalData.postComments.map((comment, index)=>{
                        return(
                            <div key={`CsC${index}`}>
                                <Comments getPostAndComments={getPostAndComments} postId = {postModalData._id} comment={comment} key ={`commentItself${index}`} user ={user} editComment={editComment} setEditComment={setEditComment} editCommentText={editCommentText} setEditCommentText={setEditCommentText} loadUserPosts={loadUserPosts} setLoadUserPosts={setLoadUserPosts}/>
                            </div>
                            )})
                            :  <div>
                            <h3> Be the first to comment</h3>

                        </div>
                    }
                </div>
            <div></div>
            <form id ='commentForm' >
                <label>Say Something</label>
                    <textarea className ='commentsTextArea' onChange={(e)=>setCommentText(prev => prev = e.target.value)} value = {commentText} type= 'text' ></textarea>
                {commentText?
                    <input onClick={handleMakeComment} data-post_id = {postModalData._id} data-user_id = {user?user.id:null} type = 'submit' id = 'makeCommentButton'></input>
                    :
                    <input onClick={handleMakeComment} disabled data-post_id = {postModalData._id} data-user_id = {user?user.id:null} type = 'submit' id = 'makeCommentButton'></input>

                }
            </form>
            </div>
        </div>
        
        :

        <div id ='PostModalInnerContainer'>
        <div className='imgAndDeets'>
            <div id = 'postModalBanner'>
                <div className='postModalTitleDiv'>
                    <h3 className='postModalTitle'>{postModalData.title? postModalData.title:"Title"}</h3>
                </div>
                <div className='postModalUserDiv'>
                    <h6 id='by'>by <UserPreview user={user} postModalData={postModalData} getPostAndComments={getPostAndComments}/></h6>
                    
                    {/* <FollowButton user={user} postModalData={postModalData} getPostAndComments={getPostAndComments}/> */}
                </div>
            </div>
            <div className='imgContainer'>
                <img  src={postModalData.url? postModalData.url: 'https://i.natgeofe.com/n/5f35194b-af37-4f45-a14d-60925b280986/NationalGeographic_2731043_4x3.jpg'} alt = 'modal placeholder' className='postModalImg'></img>
            </div>
            <div className='captionAndLikesContainer'>
                <div className='postModalCaption'>{postModalData.caption? postModalData.caption:'caption asfoiasfoksnfasoifnsof afi asfoasi fsaoif safoias fosaif safbasof safas fosajf saofj safoasf oasfu saoajs ofas fsa faosf saofj asof asfosa fsa foasf aof saofis foasf saof saofsa fosa fosa fsaof saof sfoasfjosaof saf safojf asojsa fosaj fsaojf saof saojf safojsa foasf asof fojas foasjf o'}</div>
                <div className='postLikesAndEdit' >
                    <PostLikes postlikes = {postModalData.likes?postModalData.likes:[]} user={user}  post_id = {postModalData._id} getAllPosts={getPostAndComments}/>
                    {usersPost === false?
                        <div ></div>
                        :
                        <div onClick={startPostEdit}>edit</div>

                    }
                </div>
            </div>
        </div>
        <div className='commentsContainer'>
            <div id ='postModalBanner'>
                <h3 className='commentsContainerBanner'>Comments</h3>
                <div onClick={closePostModal} id='closeButton'> Close</div>
            </div>
            <div className= 'commentsContainerMap' id='commentsContainerMap'>
            {postModalData.postComments && postModalData.postComments.length !== 0 ?
                postModalData.postComments.map((comment, index)=>{
                    return(
                        <div key={`CsC${index}`}>
                            <Comments getPostAndComments={getPostAndComments} postId = {postModalData._id} comment={comment} key ={`commentItself${index}`} user ={user} editComment={editComment} setEditComment={setEditComment} editCommentText={editCommentText} setEditCommentText={setEditCommentText} loadUserPosts={loadUserPosts} setLoadUserPosts={setLoadUserPosts}/>
                        </div>
                        )})
                        :  <div>
                        <h2> Be the first to comment</h2>

                    </div>
                }
            </div>
        <div></div>
        <form id ='commentForm' >
            <label>Say Something</label>
                <textarea className ='commentsTextArea' onChange={(e)=>setCommentText(prev => prev = e.target.value)} value = {commentText} type= 'text' ></textarea>
            {commentText?
                <input onClick={handleMakeComment} data-post_id = {postModalData._id} data-user_id = {user?user.id:null} type = 'submit' id = 'makeCommentButton'></input>
                :
                <input onClick={handleMakeComment} disabled data-post_id = {postModalData._id} data-user_id = {user?user.id:null} type = 'submit' id = 'makeCommentButton'></input>

            }
        </form>
        </div>
    </div>
                }
    </div>
  )
}