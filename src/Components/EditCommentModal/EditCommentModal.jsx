import React,{useEffect, useState} from 'react'
import { updateComment } from '../../Services/CommentServices/CommentServices.js'
import './EditCommentModal.css'

export default function EditCommentModal({user, getPostAndComments, editComment, setEditComment, setEditCommentText, editCommentText}) {

    const[editSuccess,setEditSuccess] = useState('Comment Text')

    const closeEditCommentModal =()=>{
        const submitButton = document.getElementById('editCommentSubmitButton')
        const editCommentModal = document.getElementById('editCommentModal')
        editCommentModal.style.visibility = 'hidden'
        submitButton.style.backgroundColor = 'white'
        setEditComment(prev => prev = null)
        setEditCommentText(prev=>prev = "")

      }

      const handleEditComment = async(e)=>{
          e.preventDefault(true)
          const submitButton = document.getElementById('editCommentSubmitButton')
          const edited = {
            ...editComment,
            commentText: editCommentText
          }
        try{
            const newComment = await updateComment(editComment._id, {edited})
            if(newComment.status === 200){
                setEditSuccess(prev => prev = "Successfully Edited")
                submitButton.style.backgroundColor = 'green'            
                await getPostAndComments(e)
                setTimeout(()=>{
                    closeEditCommentModal()
                }, 750) 
            }
            else{
                setEditSuccess(prev => prev = "Uh Oh! Couldnt Edit")
            }
        }catch(error){console.log(error.message)}
      }
      useEffect(()=>{
      },[editCommentText])
      

  return (
    <div className='editCommentModal' id ='editCommentModal'>
        <div className='editCommentModalBackground'>
            <div className='editCommentModalContent'>
                <div className='editCommentModalNameContainer'>
                    <h2 className='editCommentModalName'>Edit Comment</h2>
                </div>
                <div className='editCommentModalFormContainer'>                    
                    <form className='editCommentModalForm'>
                        <label className='editCommentLabels' id='editCommentUserName'></label>
                        <label className='editCommentLabels' id ='editCommentTextInput'>{editSuccess}</label>
                        <textarea type='text' className='editCommentInput' name='commentText' id='editCommentTextInput'  onChange={(e)=>setEditCommentText(prev => prev =e.target.value)} value ={editCommentText} ></textarea>
                        <input onClick={handleEditComment} data-post_id ={editComment?editComment.whatPost:null} type='submit' className='editCommentInput' id='editCommentSubmitButton'></input>
                    </form>
                </div>
            </div>
                <div className='editCommentCloseButton' onClick={closeEditCommentModal}>Close</div>
        </div>
    </div>
  )
}
