import React, { useEffect, useState } from 'react'
import './UserHomepage.css'
import PostCard from '../../Components/PostCard/PostCard.jsx'
import PostModal from '../../Components/PostModal/PostModal.jsx'
import {getAllUserPosts} from '../../Services/UserServices/UserServices.js'
import { postWithPopulatedComments } from '../../Services/PostServices/PostServices.js'

export default function UserHomepage({user, getPostAndComments, postModalData, setPostModalData}) {
  const[userPosts, setUserPosts] = useState([])

const postsSamples = []

const getUserPosts = async()=>{
  try{
    const theUserPosts = await getAllUserPosts(user.id)
    setUserPosts(prev => prev= theUserPosts.data.posts)
    console.log(theUserPosts.data.posts)
  }catch(error){console.log(error.message)}
  
}

console.log(postModalData)


useEffect(()=>{
  getUserPosts()
},{})

return (
    <div className='userHomepage'>
      <h1 id='userHomepageLabel' className='pageLabel'>Your Page</h1>
      {userPosts?
      <div id='userPostsMapContainer'>
        {userPosts.map((post, index)=>{
          return(
            <div key={`PCC${index}`} onClick={getPostAndComments} data-_id = {post._id}><PostCard  getUserPosts = {getUserPosts} key = {`uPC${index}`} id = 'userPostsCard' post={post}/></div>
          )
        })}
      </div>
      :
      <h1>Loading...</h1>
        }
    </div>
  )
}
