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
    await postAPI.put(`/update/${id}`, body)
}

export const deletePost = async(id)=>{
    await postAPI.delete(`/delete/${id}`)
}