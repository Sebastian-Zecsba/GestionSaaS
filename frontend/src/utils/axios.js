import axios from 'axios'

const getAuthorization = () => 'Bearer ' + localStorage.getItem('token')

const axios = axios.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
        'Authorization': getAuthorization()
    }
})

export default axios