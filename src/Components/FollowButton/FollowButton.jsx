import React, { useState, useEffect } from "react";
import { follow, unfollow } from "../../Services/UserServices/UserServices.js";
import './FollowButton.css'

export default function FollowButton({user, postModalData, getPostAndComments}){

    const handleFollow=async(e)=>{
        const userToFollow = postModalData?.poster?._id
        const follower = user?.id
        const postid = postModalData?._id
        console.log(postModalData?.poster)
        try{
            if(userToFollow === follower){
                alert("Cannot follow yourself")
            }else{                
                const addFollower = await follow(userToFollow, {follower})
                getPostAndComments(e)
            }
        }catch(error){console.log(error?.message)}
        
    }  
    
    const handleUnfollow=async(e)=>{
        const userToUnfollow = postModalData?.poster?._id
        const unfollower = user?.id
        try{
            if(userToUnfollow === unfollower){
                alert("Cannot follow yourself")
            }else{
            const removeFollower = await unfollow(userToUnfollow, {unfollower})
            getPostAndComments(e)
            }
        }catch(error){console.log(error.message)}
    }

    return(
        
        <div className = 'followButtonContainer'>
        {postModalData?.poster?.followers?.indexOf(user?.id) >= 0?
            <button className="followButton" data-post_id={postModalData?._id} onClick={handleUnfollow}>Unfollow</button>
            :
            <button className="followButton" data-post_id={postModalData?._id} onClick={handleFollow}>Follow</button>
        }
        </div>

    )
}