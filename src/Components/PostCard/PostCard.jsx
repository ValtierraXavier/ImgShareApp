import React from 'react'
import './PostCard.css'

export default function PostCard({post, userPosts}) {
  return (
    <div className = 'postCardContainer' >
      <div id = 'postCard'>
        <div id='imgContainer'>
          <div onClick={userPosts} className= 'cardTitle'  data-post_id = {post._id}>
            <h3 className='postCardTitle'>{post.title}</h3>
            <h6 className='postCardUsername'>by <a className='userPageLink' href ={`/user/${post.poster._id}`}>{post.poster.userName}</a></h6>
          </div>
          <img onClick={userPosts}  id = "postImg" src = {post.url} alt ='post' data-post_id = {post._id}></img>
          <div onClick={userPosts} id = 'caption' data-post_id = {post._id}>{post.caption} </div>     
        </div>
      </div>
    </div>
  )
}
