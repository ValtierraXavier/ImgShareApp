import React from 'react'
import './AddPostModal.css'

export default function AddPostModal({handleOpenAddPostModal, handleCloseAddPostModal, setTitle, title, setUrl, url, setCaption, caption, handleAddPost, user}) {

  

  return (
    <div className='addPostModal' id='addPostModal'>
        <div className='modalBackground'>
        <div className='addPostModalCloseButton' onClick={handleCloseAddPostModal}>Close</div>
          <div className="modalContent">
            <div className='addPostModalTitle'>
              <h2 className='modalTitle'>Make a Post!</h2>
            </div>            
            <div className='addPostFormContainer'>
              <form className="addPostForm">
                  <label className='addModalLabel'>Title</label>
                  <input className='addModalInput' type="text" onChange={(e)=>setTitle(prev=>prev=e.target.value)} value={title} ></input>
                  <label className="addModalLabel" >URL</label>
                  <input className='addModalInput' type="text" onChange={(e)=>setUrl(prev=>prev=e.target.value)} value={url}></input>              
                  <label className="addModalLabel" >Caption</label>
                  <input className='addModalInput' type="text" onChange={(e)=>setCaption(prev=>prev=e.target.value)} value={caption}></input>              
                  <input className='addModalSubmitButton' type="submit" onClick={handleAddPost}></input>
              </form>
            </div>
          </div>
          </div> 
    </div>
  )
}
