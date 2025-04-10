import { createRouter, createWebHistory } from 'vue-router'
import LoginPage from '@/views/LoginPage.vue'
import RegisterPage from '@/views/RegisterPage.vue'
import UserProfile from '@/views/UserProfile.vue'
import CatalogPage from '@/views/CatalogPage.vue'
import AddResource from '@/views/AddResource.vue';

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
  }
  ,{
    path: '/resource/:id',
    name: 'ResourceDetail',
    component: () => import('@/views/ResourceDetail.vue')
  }
  ,  {
    path: '/add-resource',
    name: 'AddResource',
    component: AddResource
  }
  ,
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

