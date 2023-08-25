import React from 'react'
import './UserHomepage.css'
import PostCard from '../../Components/PostCard/PostCard.jsx'
import PostModal from '../../Components/PostModal/PostModal.jsx'

export default function UserHomepage({}) {

  const postsSamples = [
  {
    "title": "a title",
    "caption": "a caption",
    "url":"https://akm-img-a-in.tosshub.com/indiatoday/images/story/201412/fart_story_650_121414044341.jpg?size=690:388"
  },
  {
    "title": "a title2",
    "caption": "a caption2",
    "url":"https://www.chiangmai-hospital.com/stocks/news/c710x400/ei/od/7shceiodapg/ตด.png"
  },
  {
    "title": "a title3",
    "caption": "a caption3",
    "url":"https://i0.wp.com/images-prod.healthline.com/hlcmsresource/images/topic_centers/2018-10/10034-farting_in_sleep-1296x728header.jpg?w=1155&h=1528"
  }
]
  return (
    <div className='userHomepage'>
      <h1 id='userHomepageLabel' className='pageLabel'>Your Page</h1>
      {postsSamples?
      <div id='userPostsMapContainer'>
        {postsSamples.map((post, index)=>{
          return(
            <PostCard key = {`uPC${index}`} id = 'userPostsCard' post={post}/>
          )
        })}
      </div>
      :
      <h1>Loading...</h1>
        }
    </div>
  )
}
