import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from './views/LoginPage.vue'
import RegisterPage from './views/RegisterPage.vue' // ← Вот это добавь

const routes = [
  { path: '/login', component: LoginPage },
  { path: '/register', component: RegisterPage },
]

export default createRouter({
  history: createWebHistory(),
  routes
})
