import React, { useState, useEffect } from 'react'
import { addLikeToComment } from '../../Services/CommentServices/CommentServices.js'
import { addCommentLike } from '../../Services/UserServices/UserServices.js'
import './CommentLikes.css'
import notLiked from '../../Assets/notLiked.png'
import Liked from '../../Assets/Liked.png'

export default function CommentLikes({getPostAndComments, postId, comment, user, editComment, setEditComment, editCommentText, setEditCommentText, loadUserPosts, setLoadUserPosts}){
  const[liked, setliked]=useState(false)
  const commentLikes = comment.likes

  const checkLikes=()=>{
    const likeIndex = comment?comment.likes.indexOf(user?user.id:''):[]
    if(likeIndex > -1){
      setliked(prev =>prev= true)
    }else if(likeIndex===-1){
      setliked(prev=>prev=false)
    }
  }  
  
  const likeComment = async (e) =>{
    const commentId = comment._id
    const userId = user?user.id:""
    try{
      if(user?user.id:'' !== ""){
      await addLikeToComment(commentId, {userId})
      await addCommentLike(userId, {commentId})
      await getPostAndComments(e)
    }else{
      window.alert('Please Login')
    }
    }catch(error){console.log(error.message)}
  }
  useEffect(()=>{
    checkLikes()
  },[commentLikes])
  
  return (
    <div className='commentLikes'>
      {liked?
        <div className='commentLikeButtonContainer'>
          <img height="20px" className='commentLikeButton' data-post_id={postId} onClick={likeComment} src={Liked} alt='Like button icon'></img>
          <div className='commentLikesCounter'>{commentLikes?commentLikes.length:[]}</div>
        </div>
      :
      <div className='commentLikeButtonContainer'>
          <img height='20px' className='commentUnLikeButton' data-post_id={postId} onClick={likeComment} src={notLiked} alt='Like button icon'></img>
          <div className='commentLikesCounter'>{commentLikes?commentLikes.length:[]}</div>
        </div>
      }
    </div>
  )
}
