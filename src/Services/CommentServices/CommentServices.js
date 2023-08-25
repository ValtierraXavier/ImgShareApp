import commentsAPI from "./CommentAPI.js";

export const getComments = async()=>{
    return(await commentsAPI.get('/get'))
}

export const getComment = async(id)=>{
    return(await commentsAPI.get(`/get/${id}`))
}

export const postComment = async(commentBody)=>{
    await commentsAPI.post('/post', commentBody)
    return(
         await getComments()
        )
}

export const updateComment = async(id, body)=>{
    await commentsAPI.put(`/update/${id}`, body)
}

export const deleteComment = async(id)=>{
    await commentsAPI.delete(`/delete/${id}`)
}