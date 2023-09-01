import React from 'react'
import './Nav.css'
import { Link, NavLink } from 'react-router-dom'

export default function Nav({openLoginModal, user, handleOpenAddPostModal, handleSignout}) {
    const token = window.localStorage.getItem('Token')

  return (
    <div className = 'navContainer'>
        {user ? 
        
            <div className = 'nav'>
                <div className = 'navUserDetail'>
                    <NavLink to = {`/user/${user.id}`}>
                        <img height = "45rem" src={`${user.avatarImg}`}></img>
                    </NavLink>
                    <NavLink className='userName' to = {`/user/${user.id}`}>
                        <div >{user.username}</div>
                    </NavLink>
                </div>
                <div className='homeAndPost'>
                    <NavLink className='homeButton' to = '/'>Home</NavLink>
                    <div className='postButton' onClick={handleOpenAddPostModal}>Make a Post!</div>
                </div>    
                <div  className = 'signInButtons'>
                    <div onClick={handleSignout}  className = 'signOutButton'>Sign Out</div>
                </div>
            </div>
            :
            <div className = 'nav'>
                <div className = 'navUserDetail'>
                    <img height = "45rem" src='https://www.pngitem.com/pimgs/m/137-1370051_avatar-generic-avatar-hd-png-download.png'></img>
                    <div>Browsing as a Guest</div>
                </div>
                <div className='homeAndPost'>
                    <NavLink className='homeButton' to = '/'>Home</NavLink> 
                </div> 
                    <div  className = 'signInButtons'>
                        <div onClick ={openLoginModal} className = 'signInButton'>Sign In</div>
                        <div className='signupButtonContainer'>
                            <Link  to='/signup' className = 'signUpButton'>Sign Up</Link>
                        </div>
                    </div>        
            </div>
        }
    </div>
  )
}
