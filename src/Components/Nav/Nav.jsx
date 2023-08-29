import React, {useState, useEffect} from 'react'
import './Nav.css'
import { Link, NavLink } from 'react-router-dom'
import AddPostModal from '../AddPostModal/AddPostModal.jsx'

export default function Nav({openLoginModal, user, handleOpenAddPostModal, handleSignout}) {
    const token = window.localStorage.getItem('Token')

  return (
    <div className = 'navContainer'>
        <div className = 'navUserDetail'>
            <NavLink to = '/user'>
                <img height = "45rem" src={`${user.avatarImg}`}></img>
            </NavLink>
            <NavLink to = {`/user/${user.id}`}>
                <div>Hello, {user.username}</div>
            </NavLink>
        </div>
            <NavLink to = '/'>Home</NavLink>
            <div className='postButton' onClick={handleOpenAddPostModal}>Make a Post!</div>
        <div  className = 'signInButtons'>
            {!token?
                <div onClick ={openLoginModal} className = 'signInButton'>Sign In</div>
                :
                <div onClick={handleSignout}  className = 'signOutButton'>Sign Out</div>
            }
            <div className='signupButtonContainer'>
                <Link to='/signup' className = 'signUpButton'>Sign Up</Link>
            </div>
        </div>
    </div>
  )
}
