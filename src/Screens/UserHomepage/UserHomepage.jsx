import React, { useEffect, useState } from 'react'
import './UserHomepage.css'
import PostCard from '../../Components/PostCard/PostCard.jsx'
import {getAllUserPosts} from '../../Services/UserServices/UserServices.js'
import PostLikes from '../../Components/PostLikes/PostLikes.jsx'
import { useParams } from 'react-router-dom'

export default function UserHomepage({ user, getPostAndComments, postModalData}) {
  const[userPosts, setUserPosts] = useState([])
  const[arePosts, setArePosts] = useState('')
  const userId = useParams()?.id

  const getUserPosts = async()=>{
    try{
      const theUserPosts = await getAllUserPosts(userId)
      if(theUserPosts.status === 200){      
      setArePosts(prev => prev = true)
      setUserPosts(prev => prev= theUserPosts.data.posts)
    }
    }catch(error){
      setArePosts(prev => prev = false)
      console.log(error.message, 'from userHomepage.jsx')}
  }

  useEffect(()=>{
    getUserPosts()
  },[])

  return (
      <div className='userHomepage'>
        <h1 id='userHomepageLabel' className='pageLabel'>Your Page</h1>
        {arePosts?
            userPosts.map((post, index)=>{
              return(
                <div className='fullUserPostContainer' key={`PCC${index}`} >
                  <div className='userpagePostLikes'>
                    <PostLikes key ={`lB${index}`}  postlikes = {post.likes} user={user} post_id = {post._id} getAllPosts={getUserPosts} postModalData={postModalData} />  
                  </div>
                  <div onClick={getPostAndComments} data-_id = {post._id}>
                    <PostCard getPostAndComments={getPostAndComments} key = {`uPC${index}`}  post={post}/>
                  </div>
                </div>
              )})
              :
              <h1 className='noPost'>No posts Here</h1>
          }
      </div>
    )}
