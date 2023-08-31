import React from 'react'
import './PostCard.css'

export default function PostCard({post, userPosts}) {

   
  return (
    <div className = 'postCardContainer' >
      <div id = 'postCard'>
        <div id='imgContainer'>
          <h2 onClick={userPosts} className= 'cardTitle'  data-_id = {post._id}>{post.title}</h2>
          <img onClick={userPosts} height='300px' width='400px' id = "postImg" src = {post.url} data-post_id = {post._id}></img>
          <div onClick={userPosts} id = 'caption' data-_id = {post._id}>{post.caption} </div>     
        </div>
        <div id = 'likesButtonContainer'>
            <div id = 'likesButton'>Likes</div>  
        </div>
      </div>
    </div>
  )
}
