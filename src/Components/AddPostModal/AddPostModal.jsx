import React, {useState} from 'react'
import './AddPostModal.css'
import {postPost, linkComment} from '../../Services/PostServices/PostServices.js'
import { linkPostToUser } from '../../Services/UserServices/UserServices.js'

export default function AddPostModal({user}) {

  const[title, setTitle] = useState('')
  const[url, setUrl] = useState('')
  const[caption, setCaption] = useState('')

  const handleAddPost= async (e)=>{
    e.preventDefault(true)
    const addPostModal = document.getElementById('addPostModal')
    const newPost ={
      poster: user.id,
      title: title,
      url: url,
      caption: caption
    }
    try{
      const sendPost = await postPost(newPost)
      const newPostId = sendPost.data._id
      const linkPost = await linkPostToUser(sendPost.data.poster ,{newPostId})
      addPostModal.style.visibility='hidden'
      setTitle(prev => prev = "")
      setUrl(prev => prev = "")
      setCaption(prev => prev = "")
    }catch(error){console.log(error.message)}
  }

  const handleCloseAddPostModal =()=>{
    const addPostModal = document.getElementById('addPostModal')
    addPostModal.style.visibility='hidden'
  }

  return (
    <div className='addPostModal' id='addPostModal'>addPostModal
        <div className='modalBackground'>
          <div className='closeButton' onClick={handleCloseAddPostModal}>Close</div>
          <div className="modalContent">            
            <h2 className='modalTitle'>Make a Post!</h2>
            <form className="addPostForm">
                <label className='Label'>Title</label>
                <input className='Input' type="text" onChange={(e)=>setTitle(prev=>prev=e.target.value)} value={title} ></input>
                  <label className="Label" >url</label>
                <input className='Input' type="text" onChange={(e)=>setUrl(prev=>prev=e.target.value)} value={url}></input>              
                <label className="Label" >Caption</label>
                <input className='Input' type="text" onChange={(e)=>setCaption(prev=>prev=e.target.value)} value={caption}></input>              
                <input className='submitButton' type="submit" onClick={handleAddPost}></input>
            </form>
          </div>
          </div> 
    </div>
  )
}
