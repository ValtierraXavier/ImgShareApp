import React from 'react'
import './Nav.css'
import { Link, NavLink } from 'react-router-dom'

export default function Nav({getAllPosts, openLoginModal, user, handleOpenAddPostModal, handleSignout}) {

  return (
    <div className = 'navContainer'>
        {user ? 
            <div className = 'nav'>
                <div className = 'navUserDetail'>
                    <NavLink to = {`/me/${user.id}`} >
                        <img height = "40rem" src={`${user.avatarImg}`} alt = 'user profile'></img>
                    </NavLink>
                    <a className='userName' href = {`/me/${user.id}`}>
                        <div>{user.username}</div>
                    </a>
                </div>
                    <NavLink onClick={getAllPosts} className='homeButton' to = '/'>Home</NavLink>
                    <button className='postButton' onClick={handleOpenAddPostModal}>Make a Post!</button>
                    <div onClick={handleSignout}  className = 'signOutButton'>Sign Out</div>
            </div>
            :
            <div className = 'nav'>
                <div className = 'navUserDetail'>
                    <img height = "45rem" src='https://www.pngitem.com/pimgs/m/137-1370051_avatar-generic-avatar-hd-png-download.png' alt ='Guest Profile'></img>
                    <div>Browsing as a Guest</div>
                </div>
                <div className='homeAndPost'>
                    <NavLink className='homeButton' to = '/'>Home</NavLink> 
                </div> 
                    <div onClick ={openLoginModal} className = 'signInButton'>Sign In</div>
                    <Link  to='/signup' className = 'signUpButton'>Sign Up</Link>
            </div>
        }
    </div>
  )
}
