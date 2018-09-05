import axios from 'axios'

const token = sessionStorage.getItem('token')

export const api = axios.create({
    baseURL: 'https://ifpj-api.atualldigital.com.br/',
    headers: {'x-access-token': token, 'Content-Type': 'application/json' }
})