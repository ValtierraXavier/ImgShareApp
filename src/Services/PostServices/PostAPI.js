import axios from 'axios'

let baseUrl = 'http://localhost:3020/posts/'
if(process.env.NODE_ENV === "production"){
    baseUrl = 'https://imgsharebe-production.up.railway.app/posts/'
}

const postAPI = axios.create({
    baseURL: baseUrl,
    'Content-Type': 'application/json',
    'Accept': "application/json , text/html"
})

export default postAPI