import usersAPI from './UserAPI.js'

export const signUp = async (newUser)=>{
    try{
        return(
            await usersAPI.post('/signup', newUser)
        )
        
    }catch(error){console.log(error)}
}

export const signIn = async (currentUser)=>{
    try{
        return(
            await usersAPI.post('/signin', currentUser)
        )
    }catch(error){
        return(
            error
        )
    }
}

export const getUser = async (id) =>{
    try{
        return(
            await usersAPI.get(`/get/${id}`)
        )
    }catch(error){console.log(error.message)}
}

export const updateUser = async (id, newCommentId)=>{
    try{
        return(
            await usersAPI.put(`/user/${id}`, newCommentId)
            // console.log("from update User", id)
        )
    }catch(error){console.log(error.message)}

}

export const linkPostToUser = async (id, body)=>{
    try{
        return(
            await usersAPI.put(`/linkpost/${id}`, body)
        )
    }catch(error){console.log(error.message)}
}

export const getAllUserPosts = async (id)=>{
    console.log(id)
    try{
        return(
            await usersAPI.get(`/userposts/${id}`)
        )
    }catch(error){console.log(error.message)}
}

// export const getUserPosts = async(id)=>{
//     return(
//         await usersAPI.get(`/userposts/${id}`)
//     )
// }

export const unlinkCommentFromUser = async(id, body)=>{
    try{     
        return(
            await usersAPI.put(`/unlinkcomment/${id}`, body)
        )
    }catch(error){console.log(error.message)}
}

export const addPostLike = async(id, body)=>{
    try{
        return(
            await usersAPI.put(`/postlike/${id}`, body)
        )
    }catch(error){console.log(error.message)}
}

export const addCommentLike = async(id, body)=>{
    try{
        return(
            await usersAPI.put(`/commentlike/${id}`, body)
        )
    }catch(error){console.log(error.message)}
}

export const follow = async(id, body)=>{
    try{
        return(
            await usersAPI.put(`/follow/${id}`, body)
        )
    }catch(error){console.log(error.message)}  
}
export const unfollow = async(id, body)=>{
    try{
        return(
            await usersAPI.put(`/unfollow/${id}`, body)
        )
    }catch(error){console.log(error.message)}  
}