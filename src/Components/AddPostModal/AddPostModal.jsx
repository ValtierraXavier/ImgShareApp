import React, { useState } from 'react'
import './AddPostModal.css'

export default function AddPostModal({ handleCloseAddPostModal, setTitle, title, setUrl, url, setCaption, caption, handleAddPost, user}) {
  const[postType, setPostType]=useState('File')
  // const[imgPreview, setImgPreview]=useState(null)

  const generateUrl=(e)=>{
    const file = e.target.files[0]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load',()=>{
      setUrl(prev => prev = reader.result)
      // setImgPreview(prev => prev = reader.result)
    })
  }

  const whatType =(e)=>{
    setPostType(prev => prev = e.target.value)
    setUrl(prev => prev = '')
  }

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
                  <label className="addModalLabel">{postType}</label>
                  <section className='previewDiv'> 
                  <div id='selectionDiv'>
                    <label id='selectLabel' >Select Type:</label>
                    <select name='postType' className='postTypeSelection' id='postTypeSelection' onChange={whatType}>
                      <option value='File'>File</option>
                      <option value='URL'>URL</option>
                    </select>
                  </div>
                    {postType === "URL"?
                      <input type='text' className='addModalInput' id='urlInput' onChange={(e)=>setUrl(prev => prev = e.target.value)} value ={url}></input>
                      :
                      <input id='fileInput' className='addModalInput' type="file" onChange={generateUrl}></input>
                    }              
                  </section>
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
