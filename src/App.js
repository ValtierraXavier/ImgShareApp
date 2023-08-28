import './App.css';
import { useEffect, useState, useRef } from 'react';
import {Routes, Route} from 'react-router-dom'
import Nav from './Components/Nav/Nav.jsx'
import Landing from './Screens/Landing/Landing.jsx'
import LogInModal from './Components/LogInModal/LogInModal.jsx';
import SignupPage from './Screens/SignUp/SignUp.jsx';
import UserHomepage from './Screens/UserHomepage/UserHomepage.jsx';
import UserStuff from './Screens/userStuff/UserStuff.jsx';
import PostModal from './Components/PostModal/PostModal.jsx';
import {getPosts, postWithPopulatedComments} from './Services/PostServices/PostServices.js'
import jwtDecode from 'jwt-decode';
import AddPostModal from './Components/AddPostModal/AddPostModal.jsx';

function App() {

  const[modalOpen, setModalOpen] = useState(false)
  const[postModalData, setPostModalData] = useState({})
  const[posts, setPosts] = useState([])
  const[user, setUser] = useState({})
  // const[postComments, setPostComments]= useState([])
  let postModalRef = useRef({})
        
  const HandleLoginModal=()=>{
            if(modalOpen === false){
              const loginModal = document.getElementById('loginModal')
              loginModal.style.visibility = 'visible'
              setModalOpen(prev => prev = true)
            }else if(modalOpen === true){
              const loginModal = document.getElementById('loginModal')
              loginModal.style.visibility = 'hidden'            
              setModalOpen(prev => prev = false)
            }
    }

    const handleAddPostModal = () =>{
        const addPostModal = document.getElementById('addPostModal')
        addPostModal.style.visibility='visible'
      }

    const checkUser=()=>{
      const token = window.localStorage.getItem('Token')
      if(token){
        console.log('youre logged in')
        const decoded = jwtDecode(token)
        setUser(prev => prev = decoded)
        console.log("decoded JWT", user)
      }else{
        console.log('you are not logged in')
        setUser(prev => prev = {
          username: "Guest",
          avatarImg:"https://static.vecteezy.com/system/resources/previews/013/042/571/original/default-avatar-profile-icon-social-media-user-photo-in-flat-style-vector.jpg"
        } )
      }
    }
    const getAllPosts = async () => {
      try{
        const allPosts = await getPosts()
        setPosts(prev => prev = allPosts.data)
      }catch(error){console.log(error)}
    }
    
    const getPostAndComments = async(e)=>{
      const postModal = document.getElementById('postModal')
      e.preventDefault(true)
      try{
        const postWComments = await postWithPopulatedComments(e.target.dataset._id)
        setPostModalData(prev=>prev=postWComments.data)
        // console.log(postWComments.data)
        postModal.style.visibility = "visible"
      }catch(error){console.log(error.message)}

    }

  useEffect(()=>{
    checkUser()
    getAllPosts()
  },[])

  return (
    <div className="App" id='App'>
      <Nav user = {user} handleAddPostModal={handleAddPostModal} HandleLoginModal={HandleLoginModal} />
      <LogInModal setModalOpen={setModalOpen}/>
      <PostModal user = {user} getAllPosts={getAllPosts} setPostModalData={setPostModalData} postModalData={postModalData} />
      <AddPostModal user = {user}/>
      <Routes> 
        <Route path = '/' element={<Landing user = {user} setPostModalData={setPostModalData} getPostAndComments={getPostAndComments} setPosts={setPosts} posts={posts}/>}/>
        <Route path = '/signup' element={<SignupPage/>} />
        <Route path = '/user' element={<UserHomepage user = {user} postModalRef={postModalRef} getPostAndComments={getPostAndComments}/>} />       
        <Route path = '/user/settings' element={<UserStuff user = {user}/>} />
      </Routes>
    </div>
  );
}

export default App;
