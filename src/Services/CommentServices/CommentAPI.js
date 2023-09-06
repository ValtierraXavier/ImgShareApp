import axios from 'axios'

const baseUrl = 'https://imgsharebe-production.up.railway.app/comments/'

const commentsAPI = axios.create({
    baseURL: baseUrl,
    timeout: 2000,
    headers:{
        'Content-Type': 'application/json',
        'Accept': "application/json , text/html"
    }
})

export default commentsAPI