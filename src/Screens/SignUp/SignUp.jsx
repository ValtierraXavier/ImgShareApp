import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { signUp } from '../../Services/UserServices/UserServices.js'
import './SignUp.css'

export default function SignupPage({redirectHome}) {
    const[email, setEmail] = useState('')
    const[userName, setUserName] = useState('')
    const[password,setPassword] = useState('')
    const[passwordConfirm, setPasswordConfirm] = useState('')
    const[passMatch, setpassMatch] = useState('Confirm Password')
    
    const handleSignup = async (e)=>{
        e.preventDefault()
        const newUser = {
            email: email,
            userName: userName,
            password: password
        }
        try{
            console.log(newUser)
            const userToken = await signUp(newUser)
            if(userToken.status === 201){
                console.log(userToken)
                window.localStorage.setItem('Token', `Bearer ${userToken.data.token}`)
                axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken.data.token;
                redirectHome('/')
            }
        }catch(error){console.log(error)}   
    }

    const handlePasswordVerify=()=>{
        const confirmPass = document.getElementById('passwordConfirm')
        const signupSubmit = document.getElementById('signupButton')
        if(passwordConfirm === ''){
            confirmPass.style.color = "black"
            signupSubmit.style.backgroundColor = "white"
            signupSubmit.disabled = true
            setpassMatch(prev=>prev='Confirm Password')
        }else if(password === passwordConfirm){     
            confirmPass.style.color = "green"
            signupSubmit.style.backgroundColor = "green"
            signupSubmit.disabled = false
            setpassMatch(prev=>prev='Passwords Match')
        }else{
            confirmPass.style.color = "red"
            signupSubmit.style.backgroundColor = "red"
            signupSubmit.disabled = true
            setpassMatch(prev=>prev='Passwords do not match')
        }
    }
    useEffect(()=>{
        handlePasswordVerify()
    },[passwordConfirm, password])
  
  return (
    <div className='signupPageContainer'>
        <div className='signupIsland'>
            <div className='islandLabelContainer'>
                <h2 className='islandLabel'>Sign Up!</h2>
            </div>
            <div>
            <form onSubmit={handleSignup} className='signupForm'>
                <label className='formLabels'>Email</label>
                <input required={true} req type='text' className='signupInput' id='signupNameInput' onChange={(e)=>setEmail(prev=>prev=e.target.value)} value={email}></input>
                <label className='formLabels'>Username</label>
                <input type='text' className='signupInput' id='signupUsernameInput' onChange={(e)=>setUserName(prev=>prev=e.target.value)} value={userName}></input>
                <label className='formLabels'>Password</label>
                <input type='password' className='signupInput' id='signupPasswordInput' onChange={(e)=>setPassword(prev=>prev=e.target.value)} value={password}></input>
                <label className='formLabels' id ='passwordConfirm'>{passMatch}</label>
                <input type='password' className='signupInput' id='signupPasswordConfirmInput' onChange={(e)=>setPasswordConfirm(prev=>prev= e.target.value)} value={passwordConfirm}></input>
                <input type='submit' className='signupInput' id='signupButton'></input>
            </form>
        </div>
        </div>        
    </div>
  )
}
