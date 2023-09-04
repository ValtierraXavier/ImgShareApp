import React, {useState} from 'react'
import './PostModal.css'
import Comments from '../Comments/Comments.jsx'
import { postComment } from '../../Services/CommentServices/CommentServices.js'
import {updateUser} from '../../Services/UserServices/UserServices.js'
import {linkCommentToPost} from '../../Services/PostServices/PostServices.js'
import PostLikes from '../PostLikes/PostLikes.jsx'

export default function PostModal({ getAllPosts, getPostAndComments, setPostModalData, postModalData, user, openEditCommentModal, editComment, setEditComment, setEditCommentText, editCommentText, loadUserPosts, setLoadUserPosts}) {
    


    const[commentText, setCommentText] = useState("")

    const closePostModal=()=>{
        const postModal = document.getElementById('postModal')
        console.log(postModalData.likes)
        postModal.style.visibility = 'hidden'
        setCommentText(prev => prev = '')
        setPostModalData(prev => prev = {})
    }

    const handleMakeComment=async(e)=>{
        e.preventDefault(false)

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

        

  return (
    <div className='postModal' id ='postModal'>
        <div id ='PostModalInnerContainer'>
            <div className='imgAndDeets'>
                <div id = 'postModalBanner'>
                    <h2 className='postModalTitle'>{postModalData.title? postModalData.title:"Title"}</h2>
                </div>
                <div className='imgContainer'>
                    <img  src={postModalData.url? postModalData.url: 'https://i.natgeofe.com/n/5f35194b-af37-4f45-a14d-60925b280986/NationalGeographic_2731043_4x3.jpg'} className='postModalImg'></img>
                </div>
                <div className='captionAndLikesContainer'>
                    <div className='postModalCaption'>{postModalData.caption? postModalData.caption:'caption asfoiasfoksnfasoifnsof afi asfoasi fsaoif safoias fosaif safbasof safas fosajf saofj safoasf oasfu saoajs ofas fsa faosf saofj asof asfosa fsa foasf aof saofis foasf saof saofsa fosa fosa fsaof saof sfoasfjosaof saf safojf asojsa fosaj fsaojf saof saojf safojsa foasf asof fojas foasjf o'}</div>
                    <div >
                        <PostLikes postlikes = {postModalData.likes?postModalData.likes:[]} user={user}  post_id = {postModalData._id} getAllPosts={getPostAndComments}/>
                    </div>
                </div>
            </div>
            <div className='commentsContainer'>
                <div id ='postModalBanner'>
                    <h2 className='commentsContainerBanner'>Comments</h2>
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
        
    </div>
  )
}
