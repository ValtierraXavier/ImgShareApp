import React, { useEffect, useState } from 'react'
import './UserHomepage.css'
import PostCard from '../../Components/PostCard/PostCard.jsx'
import {getAllUserPosts} from '../../Services/UserServices/UserServices.js'
import PostLikes from '../../Components/PostLikes/PostLikes.jsx'

export default function UserHomepage({checkUser, user, getPostAndComments, postModalData, setPostModalData, getAllPosts}) {
  const[userPosts, setUserPosts] = useState([])
  const[arePosts, setArePosts] = useState('')

const getUserPosts = async()=>{
  checkUser()
  try{
    const theUserPosts = await getAllUserPosts(user.id)
    setArePosts(prev => prev = true)
    setUserPosts(prev => prev= theUserPosts.data.posts)
  }catch(error){
    setArePosts(prev => prev = false)
    console.log(error)}
  
}

useEffect(()=>{
  getUserPosts()
},[arePosts, postModalData])

return (
    <div className='userHomepage'>
      <h1 id='userHomepageLabel' className='pageLabel'>Your Page</h1>
      {arePosts?
        <div id='userPostsMapContainer'>
          {userPosts.map((post, index)=>{
            return(
              <div key={`PCC${index}`} >
                <div onClick={getPostAndComments} data-_id = {post._id}>
                  <PostCard  getUserPosts = {getUserPosts} key = {`uPC${index}`}  post={post}/>
                </div>
                <div className='userpagePostLikes'>
                  <PostLikes key ={`lB${index}`}  postlikes = {post.likes} user={user} post_id = {post._id} getAllPosts={getUserPosts} postModalData={postModalData} />  
                </div>
              </div>

              )
            })}
        </div>
        :
        <h1 className='noPost'>No posts Here</h1>
        }
    </div>
  )
}
