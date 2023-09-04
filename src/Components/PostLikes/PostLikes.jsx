import React, { useEffect, useState } from 'react'
import { addLikeToPost } from '../../Services/PostServices/PostServices.js'
import { addPostLike } from '../../Services/UserServices/UserServices.js'
import './PostLikes.css'
import Liked from '../../Assets/Liked.png'
import notLiked from '../../Assets/notLiked.png'


export default function PostLikes({postlikes, post_id, user, getAllPosts, postModalData}) {
    const[liked, setLiked]=useState(false)

    
    const like = async(e)=>{
        if(user){            
            const userId = user.id
            const post = await addLikeToPost(post_id, {userId})
            const currentUser = await addPostLike(userId, {post_id})
            await getAllPosts(e)
        }else{
            window.alert("please log in to like")
            return
        }

        // console.log(post, currentUser)
    }

    const checkLiked=()=>{
        if(postlikes?postlikes.indexOf(user?user.id:{}) > -1:[]){            
            setLiked(prev => prev = true)
        }else{
            setLiked(prev => prev = false)
        }
    }
    useEffect(()=>{
        checkLiked()
    },[postlikes])

  return (
    <div>        
        {liked==false?
            <div onClick={like} className='postLikes'  data-post_id={post_id} id='likeButton'>
                <img  height='30px' data-post_id={post_id} src={notLiked}></img>
                <div className='postLikesCounter'>{postlikes.length}</div>
            </div>
        :           
            <div onClick={like} className='postLikes'  data-post_id={post_id} id='postLikedButton'>
                <img height='30px' data-post_id={post_id} src={Liked}></img>
                <div className='postLikesCounter'>{postlikes.length}</div>
            </div>
        }
    
    </div>
  )
}
