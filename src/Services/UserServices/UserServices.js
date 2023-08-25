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