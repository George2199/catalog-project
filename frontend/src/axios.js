import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://localhost:5000', // адрес твоего Flask-сервера
})

export default instance
