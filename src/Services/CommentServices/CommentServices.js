import commentsAPI from "./CommentAPI.js";

export const getComments = async()=>{
    return(await commentsAPI.get('/get'))
}

export const getComment = async(id)=>{
    return(await commentsAPI.get(`/get/${id}`))
}

export const postComment = async(commentBody)=>{
   const newComment = await commentsAPI.post('/post', commentBody)
    return(
         {allComments: await getComments(), newComment: newComment}
        )
}

export const updateComment = async(id, body)=>{
    return(
        await commentsAPI.put(`/update/${id}`, body)
    )
}

export const deleteComment = async(id)=>{
    return(
        await commentsAPI.delete(`/delete/${id}`)
    )
}

export const addLikeToComment = async(id , body)=>{
    return(
        await commentsAPI.put(`/commentlike/${id}`, body)
    )
}