import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import UserProfile from '@/views/UserProfile.vue'
import CatalogPage from '@/views/CatalogPage.vue'
// Импортируй другие страницы, если они есть

const routes = [
  {
    path: '/',
    redirect: '/login'  // 👈 редирект на /login (или на главную страницу при наличии)
  },
  {
    path: '/login',
    component: LoginPage
  },
  {
    path: '/register',
    component: RegisterPage
  },
  {
    path: '/profile',
    name: 'Profile',
    component: UserProfile
  },
  { 
    path: '/catalog',
    component: CatalogPage
  },
  
  // добавь остальные маршруты при необходимости
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

