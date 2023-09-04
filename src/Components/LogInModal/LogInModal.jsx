import React, { useEffect } from 'react'
import './LogInModal.css'

export default function LogInModal({email, setEmail, setPassword, handleLogin, password, closeLoginModal}) {
    
const waitForPassword =()=>{
    const loginSubmitButton = document.getElementById('loginSubmitButton')
    password === '' || email === '' ?
    loginSubmitButton.disabled = true
    :
    loginSubmitButton.disabled = false
}

useEffect(()=>{
    waitForPassword()
},[password, email])

  return (
    <div className='loginModal' id='loginModal'>
        <div className='loginFormContainerAndTitle'>
            <h2 className='loginFormTitle'>Log In</h2>
            <div className='loginFormContainer'>                
                <form onSubmit={handleLogin} className='loginForm'>
                    <label id='emailLabel'>Email</label>
                    <input type='text' className='loginInput' id='emailInput' onChange={(e)=>{setEmail(prev => prev = e.target.value)}} value={email}></input>
                    <label id='passwordLabel'>Password</label>
                    <input type='password' className='loginInput' id='passwordInput' onChange={(e)=>{setPassword(prev => prev = e.target.value)}} value={password}></input>
                    <input type='submit' id='loginSubmitButton'></input>
                </form>
            </div>
            <div onClick={closeLoginModal} id = 'loginModalCloseButton'>Close</div>
        </div>
    </div>
  )
}
