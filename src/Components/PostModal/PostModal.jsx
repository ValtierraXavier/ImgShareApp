import React, {useState} from 'react'
import './PostModal.css'
import Comments from '../Comments/Comments.jsx'
import { postComment, getComments } from '../../Services/CommentServices/CommentServices.js'
import {getUser, updateUser} from '../../Services/UserServices/UserServices.js'
import {linkCommentToPost, postWithPopulatedComments, getPost, getPosts} from '../../Services/PostServices/PostServices.js'

export default function PostModal({getAllPosts, setPostModalData, postModalData, user}) {
    
    const[commentText, setCommentText] = useState('')

    const closePostModal=()=>{
        const postModal = document.getElementById('postModal')
        console.log(postModalData)
        postModal.style.visibility = 'hidden'
        setCommentText(prev => prev = '')
        setPostModalData(prev => prev = {})
    }

    const handleMakeComment=async(e)=>{
        e.preventDefault(false)

        const postModal = document.getElementById('postModal')

        const comment ={
            commentAuthor:user.id,
            commentText: commentText,
            whatPost: e.target.dataset.post_id
        }

        try{
            const newComment = await postComment(comment)
            const newCommentId = newComment.newComment.data
            const addCommentIdToUser = await updateUser(user.id, {newCommentId})
            const addCommentIdToPost = await linkCommentToPost(e.target.dataset.post_id, {newCommentId})
            setCommentText(prev => prev = '')
            getAllPosts()
        }catch(error){console.log(error.message)}

    }

  return (
    <div className='postModal' id ='postModal'>
        <div id ='PostModalInnerContainer'>
            <div className='imgAndDeets'>
                <div id = 'postModalBanner'>
                    <h2 className='postModalTitle'>{postModalData.title? postModalData.title:"Title"}</h2>
                </div>
                <img  src={postModalData.url? postModalData.url: 'https://i.natgeofe.com/n/5f35194b-af37-4f45-a14d-60925b280986/NationalGeographic_2731043_4x3.jpg'} className='postModalImg'></img>
                <div className='captionAndLikesContainer'>
                    <div className='postModalCaption'>{postModalData.caption? postModalData.caption:'caption asfoiasfoksnfasoifnsof afi asfoasi fsaoif safoias fosaif safbasof safas fosajf saofj safoasf oasfu saoajs ofas fsa faosf saofj asof asfosa fsa foasf aof saofis foasf saof saofsa fosa fosa fsaof saof sfoasfjosaof saf safojf asojsa fosaj fsaojf saof saojf safojsa foasf asof fojas foasjf o'}</div>
                    <div className='postModalLikeButton'>Likes</div>
                </div>
            </div>
            <div className='commentsContainer'>
                <div id ='postModalBanner'>
                    <h2 className='commentsContainerBanner'>Comments</h2>
                </div>
                <div className= 'commentsContainerMap'>
                {
                    postModalData.postComments?.map((comment, index)=>{
                        return(
                            <div key={`CsC${index}`}>
                                <Comments comment={comment} key ={`commentItself${index}`}  />
                            </div>
                            )
                        })
                    }
                </div>
            <div></div>
            <form id ='commentForm' >
                <label>Comment Here</label>
                <textarea className ='commentsTextArea' onChange={(e)=>setCommentText(prev => prev = e.target.value)} value = {commentText} type= 'text' ></textarea>
                <input onClick={handleMakeComment} data-post_id = {postModalData._id} data-user_id = {user.id} type = 'submit' id = 'makeCommentButton'></input>
            </form>
            </div>
        </div>
        <div onClick={closePostModal} id='closeButton'> Close</div>
    </div>
  )
}
