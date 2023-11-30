import React, { useEffect, useState } from 'react'
import './OtherUserPage.css'
import PostCard from '../../Components/PostCard/PostCard.jsx'
import PostLikes from '../../Components/PostLikes/PostLikes.jsx'
import { getAllUserPosts } from '../../Services/UserServices/UserServices'
import { useParams } from 'react-router-dom'

export default function OtherUserPage({user, getPostAndComments, postModalData}) {
  const userId = useParams()?.id
  const [specifiedUserPosts, setSpecifiedUserPost] = useState(null)

  const otherUserPosts =async(id)=>{
    try{
      const userPosts = await getAllUserPosts(id)
      setSpecifiedUserPost(prev => prev = userPosts.data)
    }catch(e){console.log(e.message)}
  }

  useEffect(()=>{
    otherUserPosts(userId)
  },[])

    
  return (
    <div className='otherUserPage'>
      <h1 onClick ={otherUserPosts} className='otherUserTitle'>{`${specifiedUserPosts?specifiedUserPosts.userName:''}${specifiedUserPosts?.userName?'\'s Page':'Loading'}`}</h1>
        {specifiedUserPosts?specifiedUserPosts.posts.map((post, index)=>{
          return(
            <div className='otherFullContainer' key = {`oFC${index}`}>
              <div className='otherLikesContainer' key={`oLC${index}`} >
                <PostLikes key ={`lB${index}`}  postlikes = {post.likes} user={user} post_id = {post._id} getAllPosts={otherUserPosts} postModalData={postModalData} />
              </div>
              <div className='otherPostCardContainer' key = {`oPCC${index}`} onClick={getPostAndComments} data-_id = {post._id}>
                <PostCard getPostAndComments={getPostAndComments} key={`PU${index}`} post={post?post:[]}/>
              </div>
            </div>
          )
          })
        :
          <div>
            <h1> Loading... </h1>
          </div>
        
        }
    </div>
  )
}
