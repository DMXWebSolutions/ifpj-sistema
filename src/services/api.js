import axios from 'axios'

const token = sessionStorage.getItem('token')

export const api = axios.create({
    baseURL: 'http://ifpj-api.atualldigital.com.br/',
    headers: {'x-access-token': token, 'Content-Type': 'application/json' }
})