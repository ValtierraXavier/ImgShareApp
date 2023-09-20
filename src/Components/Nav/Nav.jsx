import React, { useEffect, useState } from 'react'
import './Nav.css'
import { NavLink } from 'react-router-dom'

export default function Nav({getAllPosts, openLoginModal, user, handleOpenAddPostModal, handleSignout}) {
    const[userFirst, setUserFirst]= useState('G')

    const setUserBadge =()=>{
        if(user === null){
            setUserFirst(prev =>prev = 'G')
        }else{
            const uN = user.username[0].toUpperCase()
            setUserFirst(prev =>prev = uN)
        }}

    useEffect(()=>{
        setUserBadge()
    },[user])

  return (
    <div className = 'navContainer'>
        {user ? 
            <div className = 'nav'>
                <div className = 'navUserDetail'>
                    <NavLink className='navLink' to = {`/me/${user.id}`} >
                        {user.avatarImg === null ?
                        <img className='userImg' height = "40rem" src={`${user.avatarImg?user.avatarImg:''}`} alt = 'user profile'></img>
                        :
                        <div className='userImg userFirst' id='userFirst'  height = "40rem">{userFirst}</div>
                    }
                    </NavLink>
                    <NavLink className='userName' to = {`/me/${user.id}`}>
                        <button className='navButton'><em>{user.username}</em></button>
                    </NavLink>
                </div>
                    <NavLink onClick={getAllPosts} className='homeButton navButton' to = '/'>Home</NavLink>
                    <button className='postButton navButton' onClick={handleOpenAddPostModal}>Make a Post!</button>
                    <button onClick={handleSignout}  className = 'signOutButton navButton'>Sign Out</button>
            </div>
            :
            <div className = 'nav'>
                <div className = 'navUserDetail'>
                    <div className='userImg userFirst' id='userFirst' height = "45rem">{userFirst}</div>
                    <div className='userName'><em>Guest</em></div>
                </div>
                    <NavLink className='homeButton navButton' to = '/'>Home</NavLink> 
                    <button onClick ={openLoginModal} className = 'signInButton navButton'>Sign In</button>
                    <NavLink  to='/signup' className = 'signUpButton navButton'>Sign Up</NavLink>
                </div>
        }
    </div>
  )
}
