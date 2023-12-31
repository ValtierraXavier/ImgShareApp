import postAPI from "./PostAPI.js";

export const getPosts = async()=>{
    return(await postAPI.get('/get'))
}

export const getPost = async(id)=>{
    return(await postAPI.get(`/get/${id}`))
}

export const postPost = async(PostBody)=>{
    return(
        await postAPI.post('/post', PostBody)
        )
}

export const updatePost = async(id, body)=>{
    return(
        await postAPI.put(`/put/${id}`, body)
    )
}

export const deletePost = async(id)=>{
    await postAPI.delete(`/delete/${id}`)
}

export const linkCommentToPost = async ( id, body)=>{
    return(
        await postAPI.put(`/comment/put/${id}`,body)
    )
}

export const postWithPopulatedComments =async(id)=>{
    return(
        await postAPI.get(`/postwcomments/${id}`)
    )
}

export const userPosts = async (id, postId)=>{
    return(
        await postAPI.get(`/userposts/${id}`, postId)
    )
}

export const unlinkCommentFromPost = async(id, body)=>{
    return(
        await postAPI.put(`/unlinkcomment/${id}`, body)
    )
}

export const addLikeToPost = async(id, body)=>{
    return(
        await postAPI.put(`/postlike/${id}`, body)
    )
}