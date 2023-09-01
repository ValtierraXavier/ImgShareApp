import React,{useState} from 'react'
import './Comments.css'
import {deleteComment} from '../../Services/CommentServices/CommentServices.js'
import { unlinkCommentFromPost } from '../../Services/PostServices/PostServices.js'
import { unlinkCommentFromUser } from '../../Services/UserServices/UserServices.js'

export default function Comments({ handleEditComment, comment , postId, user, getPostAndComments, editComment, setEditComment, editCOmmetText, setEditCommentText}) {


  const handleDeleteComment= async(e)=>{
    const commentId = e.target.dataset.commentid
    const authorId = e.target.dataset.authorid
    try{
      console.log(commentId)
      const deleteAComment = await deleteComment(commentId)
      const thepost = await unlinkCommentFromPost(postId, {commentId})
      const theUser = await unlinkCommentFromUser(authorId, {commentId})
      await getPostAndComments(e)
    }catch(error){console.log(error.message)}
  }

  const openEditCommentModal = (e)=>{
    const editCommentModal = document.getElementById('editCommentModal')
    setEditComment(prev => prev = comment)
    setEditCommentText(prev => prev = comment.commentText)
    editCommentModal.style.visibility = 'visible'
    console.log(comment)
  }

  
  return (
    
   <div className='Comments'>  
    {user.id === comment.commentAuthor._id ?
      <div className='eachCommentContainer' data-id = {comment._id} >
        <div className='commentDetails'>
        <div className='nameDiv'>{comment.commentAuthor.userName}</div>
        <div className='timeSincePost'>1day</div>
        </div>
        <p className='commentText'>{comment.commentText}</p>
        <div className='actionButtonsContainer'>...
          <div className='deleteButton commentActionButtons' data-commentid = {comment._id} data-authorid={comment.commentAuthor._id} data-post_id= {postId} onClick={handleDeleteComment} >Delete</div>
          <div className='editButton commentActionButtons' data-id = {comment._id} data-commenttext={comment.commentText} onClick={openEditCommentModal}>Edit</div>
        </div>
      </div>
      :
      <div className='eachCommentContainer' data-id = {comment._id} >
      <div className='commentDetails'>
      <div className='nameDiv'>{comment.commentAuthor.userName}</div>
      <div className='timeSincePost'>1day</div>
      </div>
      <p className='commentText'>{comment.commentText}</p>
      <div className='actionButtonsContainer'>...</div>
    </div>
    }  
   </div>
      
  )
}
