import axios from 'axios'

// const baseUrl = window.env.USER_BASE_URL
const baseUrl = 'https://imgsharebe-production.up.railway.app/user/'
// const baseUrl = 'http://localhost:3020/user/'

const usersAPI = axios.create({
    baseURL: baseUrl,
    timeout: 2000,
    headers:{
        'Content-Type': 'application/json',
        'Accept': "application/json , text/html"
    }
})

export default usersAPI