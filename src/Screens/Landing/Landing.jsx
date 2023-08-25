import React, {useState}from 'react'
import { Link, Routes, Route } from 'react-router-dom'
import PostCard from '../../Components/PostCard/PostCard.jsx'
import PostModal from '../../Components/PostModal/PostModal.jsx'
import { getPost } from '../../Services/PostServices/PostServices.js'
import './Landing.css'

export default function Landing({posts, postModalRef, setPostModalData}) {
  const setupOpenModal=async(e)=>{
    const postModal = document.getElementById('postModal')
    try{
     const postData = await getPost(e.target.dataset._id)
     setPostModalData(prev=>prev = postData.data)
     postModal.style.visibility = "visible"
    }catch(err){console.log(err.message)}

    console.log(e.target.dataset._id)

  }

  return (
    <div className ='landingContainer'>
      <h1 id='homeLabel' className='pageLabel'>Home</h1>
    {posts.length?
      <div id ='postCardMapContainer'>{
      posts.map((post, index)=>{
        return(<div onClick={setupOpenModal} data-_id = {post._id}><PostCard key={`PU${index}`} post={post}/></div>)
      })
      }</div>
      :<div id ='homepageLoading'>
          <h1 id ='loading' >Loading...</h1>
        </div>
    }    
  <div>
  </div>
    </div>
  )
}