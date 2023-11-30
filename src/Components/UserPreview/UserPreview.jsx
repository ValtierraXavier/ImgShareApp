import React from "react";
import './UserPreview.css'
import FollowButton from "../FollowButton/FollowButton.jsx";

export default function UserPreview({user, postModalData, getPostAndComments}){

    const timeStamp = (postModalData?._id)?.toString().substring(0,8)
    const date = new Date(parseInt(timeStamp,16)*1000).toDateString().substring(4, 15)
    const openPreview = () => {
        const preview = document.getElementById('')
        
    }
    const closePreview = () => {
        const preview = document.getElementById('')
    }
    return(
        <div className="postBy">
            <a className='userPageLink' href ={`/user/${postModalData?.poster?._id}`}>{postModalData?.poster?.userName}</a>
            <div id='userDetails'>                
                <div><strong>{postModalData?.poster?.userName}</strong></div>
                <div><strong>{postModalData?.poster?.comments?.length}</strong> - Comments</div>
                <div><strong>{postModalData?.poster?.posts?.length}</strong> - Posts</div>
                <div>Memeber Since - <strong>{date}</strong></div>
                <div id ='followbuttonDiv'>
            </div>
                <FollowButton user={user} postModalData={postModalData} getPostAndComments={getPostAndComments}/>
            </div>
        </div>
    )
}