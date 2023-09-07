import React from 'react'
import './PostCard.css'
// import PostLikes from '../PostLikes/PostLikes.jsx'
// import { getUser } from '../../Services/UserServices/UserServices.js'

export default function PostCard({post, userPosts}) {
  // const[userSearch, setUserSearch]=useState({})

  // const userLookup = async(e)=>{
  //   const userLookup = await getUser(post.poster)
  //   setUserSearch(prev => prev = userLookup.data)
  // }

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
