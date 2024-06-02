import './App.css';
import axios from 'axios';
import jwtDecode from 'jwt-decode';
import { useEffect, useState } from 'react';
import {Routes, Route, useNavigate} from 'react-router-dom'
import Nav from './Components/Nav/Nav.jsx'
import Landing from './Screens/Landing/Landing.jsx'
import LogInModal from './Components/LogInModal/LogInModal.jsx';
import SignupPage from './Screens/SignUp/SignUp.jsx';
import UserHomepage from './Screens/UserHomepage/UserHomepage.jsx';
import UserStuff from './Screens/userStuff/UserStuff.jsx';
import PostModal from './Components/PostModal/PostModal.jsx';
import AddPostModal from './Components/AddPostModal/AddPostModal.jsx';
import EditCommentModal from './Components/EditCommentModal/EditCommentModal.jsx';
import OtherUserPage from './Screens/OtherUserPage/OtherUserPage.jsx';
import {getPosts, postWithPopulatedComments, postPost} from './Services/PostServices/PostServices.js';
import { signIn, linkPostToUser } from './Services/UserServices/UserServices.js';

function App() {

  const[user, setUser] = useState(null)
  const[posts, setPosts] = useState(null)
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[title, setTitle] = useState('')
  const[url, setUrl] = useState('')
  const[caption, setCaption] = useState('')
  const[modalOpen, setModalOpen] = useState(false)
  const[loadAllPosts, setLoadAllPosts]= useState(true)
  const[postModalData, setPostModalData] = useState({})
  const[editComment, setEditComment]=useState(null)
  const[editCommentText, setEditCommentText] = useState("")
  const[usersPosts, setUsersPosts]= useState(null)
  const[usersPost, setUsersPost]= useState(false)
  const navigate = useNavigate()
        
  const openLoginModal=()=>{
    const emailLabel = document.getElementById('emailLabel')
    const passwordLabel = document.getElementById('passwordLabel')
    const loginSubmitButton = document.getElementById('loginSubmitButton')
    if(modalOpen === false){
      const loginModal = document.getElementById('loginModal')
      emailLabel.style.color = '#dedede'
      passwordLabel.style.color = '#dedede'
      loginSubmitButton.style.backgroundColor = 'white'
      loginModal.style.visibility = 'visible'
      setModalOpen(prev => prev = true)
    }else if(modalOpen === true){
      const loginModal = document.getElementById('loginModal')
      loginModal.style.visibility = 'hidden'            
      setModalOpen(prev => prev = false)
    }
  }

  const handleLogin = async (e)=>{
    e.preventDefault(false)
    const emailLabel = document.getElementById('emailLabel')
    const passwordLabel = document.getElementById('passwordLabel')
    const loginSubmitButton = document.getElementById('loginSubmitButton')
    const credentials = {
        email: email,
        password: password
    }
    try{
        const userToken = await signIn({credentials})
        if(userToken.status === 201){
          window.localStorage.setItem('Token', `Bearer ${userToken.data.token}`)
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken.data.token;
          checkUser()
          emailLabel.style.color = 'green'
          passwordLabel.style.color = 'green'
          loginSubmitButton.style.backgroundColor = 'green'
          setTimeout(()=>{closeLoginModal()},1000)
        }else if(userToken.response.status === 401){
            emailLabel.style.color = 'red'
            passwordLabel.style.color = 'red'
            loginSubmitButton.style.backgroundColor = 'red'
            setTimeout(() => {
              window.alert("Credentials incorrect. Please try again.")
              clearLoginModal()
              }, 500)
                        
          }else if(userToken.response.status === 500){
            window.alert('User not found. Signup for an account.')
          }
          getAllPosts()
    }catch(error){console.log(error)}
  }
  const clearLoginModal = () => {
    const emailLabel = document.getElementById('emailLabel')
    const passwordLabel = document.getElementById('passwordLabel')
    const loginSubmitButton = document.getElementById('loginSubmitButton')
    setEmail(prev => prev = '')
    setPassword(prev => prev = '')
    emailLabel.style.color = 'white'
    passwordLabel.style.color = 'white'
    loginSubmitButton.style.backgroundColor = 'white'
  }
  const closeLoginModal = ()=>{
    const loginModal = document.getElementById('loginModal')
    loginModal.style.visibility = 'hidden'
    clearLoginModal()
    setModalOpen(prev => prev = false)
}

  const handleSignout =()=>{
    window.localStorage.removeItem('Token')
    setUser( prev => prev = null)
    redirectHome('/')
  }
  
  const redirectHome =(path)=>{
   navigate(path)
   checkUser()
   getAllPosts()
  }
    
  const checkUser=()=>{
    const token = window.localStorage.getItem('Token')
    if(token){
      const decoded = jwtDecode(token)
      setUser(prev => prev = decoded)
    }else if(!token){
      setUser(prev => prev = null )
    }
  }
  const handleOpenAddPostModal = () =>{
    const addPostModal = document.getElementById('addPostModal')
    if(user){
      addPostModal.disabled = false
      addPostModal.style.visibility='visible'
    }else{
      addPostModal.disabled = true;
    }
    }

  
  const handleAddPost= async (e)=>{
    e.preventDefault(true)
    const addPostModal = document.getElementById('addPostModal')
    const newPost ={
      poster: user.id,
      title: title,
      url: url,
      caption: caption
    }
    try{
      const sendPost = await postPost(newPost)
      const newPostId = sendPost.data._id
      await linkPostToUser(sendPost.data.poster ,{newPostId})
      addPostModal.style.visibility='hidden'
      setTitle(prev => prev = "")
      setUrl(prev => prev = "")
      setCaption(prev => prev = "")
      setLoadAllPosts(prev=>prev = true)
      getAllPosts()
    }catch(error){console.log(error)}
  }

  const handleCloseAddPostModal =()=>{
    const addPostModal = document.getElementById('addPostModal')
    addPostModal.style.visibility='hidden'
    setTitle(prev => prev = "")
    setUrl(prev => prev = "")
    setCaption(prev => prev = "")
  }

  const getAllPosts = async () => {
    try{
      const allPosts = await getPosts()
      if(allPosts.data.length ===0){
        return
      }else{
        setPosts(prev => prev = allPosts.data)
      }
      checkUser()
      setLoadAllPosts(prev => prev = false)
    }catch(error){console.log(error)}
  }

  const getPostAndComments = async(e)=>{
    const postModal = document.getElementById('postModal')
    try{
      const postWComments = await postWithPopulatedComments(e.target.dataset.post_id)
      setPostModalData(prev=>prev=postWComments.data)
      if((user?user.id:user) === postWComments.data.poster._id){
        setUsersPost(prev => prev = true)
      }else if(user === null){
        setUsersPost(prev => prev = false)
      }
      postModal.style.visibility = "visible"
    }catch(error){console.log(error.message)}
  }
  useEffect(()=>{
   getAllPosts()
  },[loadAllPosts])

  return (
    <div className="App" id='App'>
      <Nav user = {user} getAllPosts={getAllPosts} handleOpenAddPostModal={handleOpenAddPostModal} openLoginModal={openLoginModal} handleSignout={handleSignout}/>
      <LogInModal setModalOpen={setModalOpen} email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleLogin={handleLogin} closeLoginModal={closeLoginModal} getAllPosts={getAllPosts}/>
      <PostModal setEditComment={setEditComment} editComment={editComment} editCommentText={editCommentText} setEditCommentText={setEditCommentText} user={user} setPostModalData={setPostModalData} postModalData={postModalData} getPostAndComments={getPostAndComments} getAllPosts={getAllPosts} usersPosts={usersPosts} setUsersPosts={setUsersPosts} setUsersPost={setUsersPost} usersPost={usersPost}/>
      <AddPostModal handleOpenAddPostModal={handleOpenAddPostModal} handleCloseAddPostModal={handleCloseAddPostModal} setTitle={setTitle} title ={title} setUrl={setUrl} url ={url} setCaption={setCaption} caption ={caption} handleAddPost={handleAddPost} user = {user}/>
      <EditCommentModal user={user} editComment={editComment} setEditComment={setEditComment} editCommentText={editCommentText} setEditCommentText={setEditCommentText} getPostAndComments={getPostAndComments}/>
      <Routes> 
        <Route path = '/signup' element={<SignupPage redirectHome={redirectHome}/>} />
        <Route path = '/' element={<Landing user = {user} setPostModalData={setPostModalData} postModalData={postModalData} getPostAndComments={getPostAndComments} getAllPosts={getAllPosts} setPosts={setPosts} posts={posts} />}/>
        <Route path = '/me/:id' element={<UserHomepage checkUser={checkUser} user = {user}  getPostAndComments={getPostAndComments}/>} postModalData={postModalData} setPostModalData={setPostModalData} getAllPosts={getAllPosts} />
        <Route path = '/user/:id' element={<OtherUserPage checkUser={checkUser} user={user} getPostAndComments={getPostAndComments} postModalData={postModalData} setPostModalData={setPostModalData} getAllPosts={getAllPosts} usersPosts={usersPosts} setUsersPosts={setUsersPosts}/>}/>    
        <Route path = '/me/settings/:id' element={<UserStuff user = {user}/>} />
      </Routes>
    </div>
  );
}

export default App;