import React, {useState} from 'react'
import './AddPostModal.css'
import {postPost} from '../../Services/PostServices/PostServices.js'

export default function AddPostModal({user}) {

  const[title, setTitle] = useState('')
  const[url, setUrl] = useState('')
  const[caption, setCaption] = useState('')
  // console.log(`title: ${title}\n url: ${url}\n caption: ${caption}`)

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
      console.log(sendPost)
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
              {/* <div className='inputLabelDiv'> */}
                <label className='Label'>Title</label>
                <input className='Input' type="text" onChange={(e)=>setTitle(prev=>prev=e.target.value)} value={title} ></input>
              {/* </div> */}
              {/* <div className='inputLabelDiv'> */}
                  <label className="Label" >url</label>
                <input className='Input' type="text" onChange={(e)=>setUrl(prev=>prev=e.target.value)} value={url}></input>
              {/* </div> */}
              {/* <div className='inputLabelDiv'> */}
                <label className="Label" >Caption</label>
                <input className='Input' type="text" onChange={(e)=>setCaption(prev=>prev=e.target.value)} value={caption}></input>
              {/* </div> */}
              {/* <div> */}
                <input className='submitButton' type="submit" onClick={handleAddPost}></input>
              {/* </div> */}
            </form>
          </div>
          </div> 
    </div>
  )
}
