import React from 'react'
import PostCard from '../../Components/PostCard/PostCard.jsx'
import PostLikes from '../../Components/PostLikes/PostLikes.jsx'
import './Landing.css'

export default function Landing({user, posts ,setPosts, postModalData, setPostModalData, getPostAndComments, getAllPosts}) {
  return (
    <div className ='landingContainer'>
      <h1 id='homeLabel' className='pageLabel'>Home</h1>
      {posts?
        posts.map((post, index)=>{
          return(
            <div className='fullCardContainer' key={`lMC${index}`}>
              <div key={`lBC${index}`} id = 'likesButtonContainer' postlikes = {post.likes}>
                <PostLikes key ={`pL${index}`} id = 'likesButton' postlikes = {post.likes} user={user} post_id = {post._id} getAllPosts={getAllPosts} postModalData={postModalData?postModalData:{}}/>  
              </div>
              <div className='innerCardContainer' key={`PCC${index}`} onClick={getPostAndComments} data-_id = {post._id}>
                <PostCard getPostAndComments={getPostAndComments} key={`PU${index}`} post={post}/>
              </div>
          </div>
          )
        })
     
        :
        <div id ='homepageLoading'>
          <h1 id ='loading' >Loading...</h1>
        </div>
      }    
    </div>
  )
}