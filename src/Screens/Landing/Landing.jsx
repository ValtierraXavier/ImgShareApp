import React from 'react'
import PostCard from '../../Components/PostCard/PostCard.jsx'
import './Landing.css'

export default function Landing({posts ,setPosts, setPostModalData, getPostAndComments}) {

  return (
    <div className ='landingContainer'>
      <h1 id='homeLabel' className='pageLabel'>Home</h1>
    {posts.length?
      <div id ='postCardMapContainer'>{
      posts.map((post, index)=>{
        return(<div key={`PCC${index}`} onClick={getPostAndComments} data-_id = {post._id}><PostCard key={`PU${index}`} post={post}/></div>)
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