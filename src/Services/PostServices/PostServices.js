import postAPI from "./PostAPI.js";

export const getPosts = async()=>{
    return(await postAPI.get('/get'))
}

export const getPost = async(id)=>{
    return(await postAPI.get(`/get/${id}`))
}

export const postPost = async(PostBody)=>{
    await postAPI.post('/post', PostBody)
    return(
         await getPost()
        )
}

export const updatePost = async(id, body)=>{
    await postAPI.put(`/update/${id}`, body)
}

export const deletePost = async(id)=>{
    await postAPI.delete(`/delete/${id}`)
}