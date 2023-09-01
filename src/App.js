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
import {getPosts, postWithPopulatedComments, postPost} from './Services/PostServices/PostServices.js';
import { signIn, linkPostToUser } from './Services/UserServices/UserServices.js';

function App() {

  const[modalOpen, setModalOpen] = useState(false)
  const[postModalData, setPostModalData] = useState({})
  const[posts, setPosts] = useState([])
  const[user, setUser] = useState(null)
  const [isLoading, setIsLaoding] =useState(true)
  const[email, setEmail] = useState('')
  const[password, setPassword] = useState('')
  const[title, setTitle] = useState('')
  const[url, setUrl] = useState('')
  const[caption, setCaption] = useState('')
  const[loadAllPosts, setLoadAllPosts]= useState(true)
  const[loadUserPosts, setLoadUserPosts]=useState(false)
  const[editComment, setEditComment]=useState(null)
  const[editCommentText, setEditCommentText] = useState(null)
  const navigate = useNavigate()

        
  const openLoginModal=()=>{
    const emailLabel = document.getElementById('emailLabel')
    const passwordLabel = document.getElementById('passwordLabel')
    const loginSubmitButton = document.getElementById('loginSubmitButton')
    if(modalOpen === false){
      const loginModal = document.getElementById('loginModal')
      emailLabel.style.color = 'black'
      passwordLabel.style.color = 'black'
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
        const userToken = await signIn(credentials)
        console.log(userToken)
        if(userToken.status === 201){
          window.localStorage.setItem('Token', `Bearer ${userToken.data.token}`)
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + userToken.data.token;
          checkUser()
          emailLabel.style.color = 'green'
          passwordLabel.style.color = 'green'
          loginSubmitButton.style.backgroundColor = 'green'
          setTimeout(()=>{closeLoginModal()},1000)
          }
    }catch(error){console.log(error)}
  }

  const closeLoginModal = ()=>{
    const loginModal = document.getElementById('loginModal')
    loginModal.style.visibility = 'hidden'
    setEmail(prev => prev = '')
    setPassword(prev => prev = '')
    setModalOpen(prev => prev = false)
}

  const handleSignout =()=>{
    window.localStorage.removeItem('Token')
    setUser( prev => prev = {
      id: "",
      username: "",
      email: ""
    })
    checkUser()
    redirect('/')
  }
  
  const redirect =(path)=>{
   navigate(path)
  }
    
  const checkUser=()=>{
    const token = window.localStorage.getItem('Token')
    if(token){
      console.log('youre logged in')
      const decoded = jwtDecode(token)
      setUser(prev => prev = decoded)
      console.log("decoded JWT", user)
    }else if(!token){
      console.log('you are not logged in')
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
    }catch(error){console.log(error.message)}
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
      setPosts(prev => prev = allPosts.data)
      checkUser()
      setLoadAllPosts(prev => prev = false)
    }catch(error){console.log(error)}
  }

  const getPostAndComments = async(e)=>{
    const postModal = document.getElementById('postModal')
    try{
      const postWComments = await postWithPopulatedComments(e.target.dataset.post_id)
      setPostModalData(prev=>prev=postWComments.data)
      // console.log(postWComments.data)
      postModal.style.visibility = "visible"
    }catch(error){console.log(error.message)}

  }

  useEffect(()=>{
   getAllPosts()
  },[loadAllPosts])

  return (
    <div className="App" id='App'>
      <Nav user = {user} handleOpenAddPostModal={handleOpenAddPostModal} openLoginModal={openLoginModal} handleSignout={handleSignout}/>
      <LogInModal setModalOpen={setModalOpen} email={email} password={password} setEmail={setEmail} setPassword={setPassword} handleLogin={handleLogin} closeLoginModal={closeLoginModal}/>
      <PostModal setEditComment={setEditComment} editComment={editComment} editCommentText={editCommentText} setEditCommentText={setEditCommentText} user={user} setPostModalData={setPostModalData} postModalData={postModalData} getPostAndComments={getPostAndComments}  />
      <AddPostModal handleOpenAddPostModal={handleOpenAddPostModal} handleCloseAddPostModal={handleCloseAddPostModal} setTitle={setTitle} title ={title} setUrl={setUrl} url ={url} setCaption={setCaption} caption ={caption} handleAddPost={handleAddPost} user = {user}/>
      <EditCommentModal user={user} editComment={editComment} setEditComment={setEditComment} editCommentText={editCommentText} setEditCommentText={setEditCommentText} getPostAndComments={getPostAndComments}/>
      <Routes> 
        <Route path = '/' element={<Landing user = {user} setPostModalData={setPostModalData} getPostAndComments={getPostAndComments} setPosts={setPosts} posts={posts}/>}/>
        <Route path = '/signup' element={<SignupPage/>} />
        <Route path = '/user/:id' element={<UserHomepage checkUser={checkUser} user = {user} getPostAndComments={getPostAndComments}/>} postModalData={postModalData} setPostModalData={setPostModalData} />       
        <Route path = '/user/settings/:id' element={<UserStuff user = {user}/>} />
      </Routes>
    </div>
  );
}

export default App;