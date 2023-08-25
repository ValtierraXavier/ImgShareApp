import React, {useState} from 'react'
import {signIn} from '../../Services/UserServices/UserServices.js'
import axios from 'axios'
import './LogInModal.css'

export default function LogInModal({setModalOpen}) {
    const[email, setEmail] = useState('')
    const[password, setPassword] = useState('')

   

const handleLogin = async (e)=>{
    e.preventDefault(true)
    const credentials = {
        email: email,
        password: password
    }
    console.log(email)
    console.log(password)
    try{
        const userToken = await signIn(credentials)
        // console.log(userToken.data.token)
        window.localStorage.setItem('Token', `Bearer ${userToken.data.token}`)
        axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken.data.token;
    }catch(error){console.log(error)}
}

const closeLoginModal = ()=>{
    const loginModal = document.getElementById('loginModal')
    loginModal.style.visibility = 'hidden'
    setModalOpen(prev => prev = false)
}

  return (
    <div className='loginModal' id='loginModal'>
        <h2 className='loginFormTitle'>Log In</h2>
        <form onSubmit={handleLogin} className='loginForm'>
            <label id='usernameLabel'>Email</label>
            <input type='text' className='loginInput' id='userNameInput' onChange={(e)=>{setEmail(prev => prev = e.target.value)}} value={email}></input>
            <label id='passwordLabel'>Password</label>
            <input type='password' className='loginInput' id='passwordInput' onChange={(e)=>{setPassword(prev => prev = e.target.value)}} value={password}></input>
            <input type='submit' id='loginSubmitButton'></input>
        </form>
        <div onClick={closeLoginModal} id = 'loginModalCloseButton'>Close</div>
    </div>
  )
}
