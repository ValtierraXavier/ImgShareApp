import React, {useState} from 'react'
import './PostModal.css'
import Comments from '../Comments/Comments.jsx'
import { postComment, getComments } from '../../Services/CommentServices/CommentServices.js'

export default function PostModal({setPostModalData, postModalData}) {
    
    const[commentText, setCommentText] = useState('')
    const[allComments, setAllComments] = useState([])

    const handleCommentSubmit = async (e)=>{
        e.preventDefault(true)
        const commentBody ={
            commentText: commentText,
        }
        try{
            const commentsReturn = await postComment(commentBody)

            const comments = await getComments()
            console.log(comments)
            setAllComments(prev => prev = commentsReturn.data)
            console.log(commentsReturn.data)
            console.log(postModalData)
        }catch(error){console.log(error)}
        console.log('comment submitted')

    }

  return (
    <div className='postModal' id ='postModal'>
        <div id ='PostModalInnerContainer'>
            <div className='imgAndDeets'>
                <div id = 'postModalBanner'>
                    <h2 className='postModalTitle'>{postModalData.title? postModalData.title:"Title"}</h2>
                </div>
                <img  src={postModalData.url? postModalData.url: 'https://i.natgeofe.com/n/5f35194b-af37-4f45-a14d-60925b280986/NationalGeographic_2731043_4x3.jpg'} className='postModalImg'></img>
                <div className='captionAndLikesContainer'>
                    <div className='postModalCaption'>{postModalData.caption? postModalData.caption:'caption asfoiasfoksnfasoifnsof afi asfoasi fsaoif safoias fosaif safbasof safas fosajf saofj safoasf oasfu saoajs ofas fsa faosf saofj asof asfosa fsa foasf aof saofis foasf saof saofsa fosa fosa fsaof saof sfoasfjosaof saf safojf asojsa fosaj fsaojf saof saojf safojsa foasf asof fojas foasjf o'}</div>
                    <div className='postModalLikeButton'>Likes</div>
                </div>
            </div>
            <div className='commentsContainer'>
                <div id ='postModalBanner'>
                    <h2 className='commentsContainerBanner'>Comments</h2>
                </div>
                <div className= 'commentsContainerMap'>
                {
                    allComments.map((comment, index)=>{
                        return(
                            <Comments comment = {comment} key ={`commentitself${index}`} />
                            )
                        })
                    }
                </div>
            <div></div>
            <form id ='commentForm' onSubmit={handleCommentSubmit}>
                <label>Comment Here</label>
                <textarea className ='commentsTextArea' onChange={(e)=>setCommentText(prev => prev = e.target.value)} value = {commentText} type= 'text' ></textarea>
                <input type = 'submit' id = 'makeCommentButton'></input>
            </form>
            </div>
        </div>
    </div>
  )
}
