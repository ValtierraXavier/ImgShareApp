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
    }catch(error){console.log(error)}
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