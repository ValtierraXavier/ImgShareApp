import React, { useEffect } from 'react'
import './OtherUserPage.css'
import PostCard from '../../Components/PostCard/PostCard.jsx'
import PostLikes from '../../Components/PostLikes/PostLikes.jsx'
import { getAllUserPosts } from '../../Services/UserServices/UserServices'
import { useParams } from 'react-router-dom'

export default function OtherUserPage({usersPosts, setUsersPosts, checkUser, user, getPostAndComments, postModalData, setPostModalData, getAllPosts}) {
  const userId = useParams()

  const otherUserPosts =async()=>{
    const posts = await getAllUserPosts(userId.id)
    setUsersPosts(prev => prev = posts.data)
  }

  useEffect(()=>{
    otherUserPosts(userId)
  },[])

    
  return (
    <div className='otherUserPage'>
      <h1 onClick ={otherUserPosts} className='otherUserTitle'>{`${usersPosts?usersPosts.userName:''}${usersPosts?.userName?'\'s Page':'Loading'}`}</h1>
        {usersPosts?usersPosts.posts.map((post, index)=>{
          return(
            <div className='otherFullContainer'>
              <div className='otherLikesContainer' key={`oLC${index}`} >
                <PostLikes key ={`lB${index}`}  postlikes = {post.likes} user={user} post_id = {post._id} getAllPosts={otherUserPosts} postModalData={postModalData} />
              </div>
              <div className='otherPostCardContainer' onClick={getPostAndComments} data-_id = {post._id}>
                <PostCard key={`PU${index}`} post={post?post:[]}/>
              </div>
            </div>
          )
          })
        :
          <div>
            <h1> Loading... </h1>
          </div>
        
        }
    </div>
  )
}
