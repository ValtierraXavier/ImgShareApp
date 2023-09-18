import axios from 'axios'

let baseUrl = 'http://localhost:3020/user/'
if(process.env.NODE_ENV === "production"){
    baseUrl = 'https://imgsharebe-production.up.railway.app/user/'
}

const usersAPI = axios.create({
    baseURL: baseUrl,
    timeout: 2000,
    headers:{
        'Content-Type': 'application/json',
        'Accept': "application/json , text/html"
    }
})

export default usersAPI