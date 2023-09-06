import axios from 'axios'

const baseUrl = 'https://imgsharebe-production.up.railway.app/posts/'

const postAPI = axios.create({
    baseURL: baseUrl,
    'Content-Type': 'application/json',
    'Accept': "application/json , text/html"
})

export default postAPI