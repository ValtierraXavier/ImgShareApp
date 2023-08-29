import React, { useEffect, useState } from 'react'
import './Comments.css'

export default function Comments({comment}) {
  
  return (
    <div className='eachCommentContainer' data-id = {comment._id} >
        <div className='commentDetails'>
            <div className='nameDiv'>{comment.commentAuthor.userName}</div>
            <div className='timeSincePost'>1day</div>
        </div>
        <p className='commentText'>{comment.commentText}</p>
        <div className='actionButtonsContainer'>...
            <div className='deleteButton commentActionButtons'>delete</div>
            <div className='editButton commentActionButtons'>edit</div>
        </div>
    </div>
  )
}
