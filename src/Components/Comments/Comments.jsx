import React from 'react'
import './Comments.css'

export default function Comments({comment}) {

  const seeData =(e) =>{
    console.log(e.target)
  }

  // console.log(comment)
  return (
    <div className='eachCommentContainer' data-id = {comment._id} onClick={(seeData)}>
        <div className='commentDetails'>
            <div className='nameDiv'>name</div>
            <div className='timeSincePost'>1day</div>
        </div>
        <p className='commentText'>{comment.commentText}</p>
        <div className='actionButtonsContainer'>...
            <div className='deleteButton'>delete</div>
            <div className='editButton'>edit</div>
        </div>
    </div>
  )
}
