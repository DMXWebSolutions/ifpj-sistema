import axios from 'axios'

const token = sessionStorage.getItem('token')

export const api = axios.create({
    // baseURL: 'http://167.99.0.146',
    baseURL: 'http://localhost:3001',
    headers: {'x-access-token': token, 'Content-Type': 'application/json' }
})