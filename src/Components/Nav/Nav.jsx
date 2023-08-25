import React, {useState, useEffect} from 'react'
import './Nav.css'
import { Link, NavLink } from 'react-router-dom'

export default function Nav({HandleLoginModal, user}) {
    // const[modalOpen, setModalOpen] = useState(false)


  return (
    <div className = 'navContainer'>
        <div className = 'navUserDetail'>
            <NavLink to = '/user'>
                <img height = "45rem" src={`${user.avatarImg}`}></img>
            </NavLink>
            <NavLink to = '/user'>
                <div>Hello, {user.username}</div>
            </NavLink>
        </div>
            <NavLink to = '/'>Home</NavLink>
        <div  className = 'signInButtons'>
            <div onClick ={HandleLoginModal} className = 'signInButton'>Sign In</div>
            <Link to='/signup' className = 'signUpButton'>Sign Up</Link>
        </div>
    </div>
  )
}
