import React from 'react'
import './PostCard.css'

export default function PostCard({post}) {
    const caption = 'Some Random Caption that i am going to add a bunch of text to so that i can see how itl look. what do i do now when all the text is sitting at the bottom of the container? i dont know why this is so hard to style right now. its literally just a box with 4 things in it.'

    const setPostData=(e)=>{
      console.log(e.target.dataset._id)
    }
  return (
    <div className = 'postCardContainer' >
      <div id = 'postCard'>
        <div id='imgContainer'>
          <h2 className= 'cardTitle' onClick={setPostData} data-_id = {post._id}>{post.title}</h2>
          <img height='240px' id = "postImg" src = {post.url} onClick={setPostData} data-_id = {post._id}></img>
          <div id = 'caption' onClick={setPostData} data-_id = {post._id}>{post.caption} </div>     
        </div>
        <div id = 'likesButtonContainer'>
            <div id = 'likesButton'>Likes</div>  
        </div>
      </div>
    </div>
  )
}
