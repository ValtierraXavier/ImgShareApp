import React, { useEffect, useState } from 'react'
import './OtherUserPage.css'
import PostCard from '../../Components/PostCard/PostCard.jsx'
import PostLikes from '../../Components/PostLikes/PostLikes.jsx'
import { getAllUserPosts } from '../../Services/UserServices/UserServices'
import { useParams } from 'react-router-dom'
import { userPosts } from '../../Services/PostServices/PostServices'

export default function OtherUserPage({checkUser, user, getPostAndComments, postModalData, setPostModalData, getAllPosts}) {
  const[usersPosts, setUsersPosts]= useState(null)
  const userId = useParams()

  const otherUserPosts =async()=>{
    const posts = await getAllUserPosts(userId.id)
    setUsersPosts(prev => prev = posts.data)
  }

  useEffect(()=>{
    otherUserPosts(userId)
  },[])

  console.log(usersPosts?usersPosts.posts:[])
    
  return (
    <div className='otherUserPage'>
      <h1 onClick ={otherUserPosts} className='otherUserTitle'>{usersPosts?usersPosts.userName:''}'s Homepage</h1>
      <div className='otherMapDiv'>
        {usersPosts?usersPosts.posts.map((post, index)=>{
          return(
            <div>
              <div className='otherLikesContainer' >
                <PostLikes key ={`lB${index}`}  postlikes = {post.likes} user={user} post_id = {post._id} getAllPosts={otherUserPosts} postModalData={postModalData} />
              </div>
              <div className='postCardContainer' onClick={getPostAndComments} data-_id = {post._id}>
                <PostCard key={`PU${index}`} post={post?post:[]}/>
              </div>

            </div>)
          })
        :
          <div>
            <h1> Loading... </h1>
          </div>
        
        }
      </div>
    </div>
  )
}
