<template>
    <header class="header">
      <div class="header__left">
        <router-link to="/catalog" class="header__home-button">
          <img src="@/assets/home.png" alt="Домой" />
        </router-link>
      </div>
  
      <router-link to="/profile" class="header__right" v-if="isLoggedIn">
        <span class="header__username">{{ user?.username || 'Гость'}}</span>
        <img :src="avatarUrl" alt="Аватар пользователя" class="header__avatar" />
      </router-link>
    </header>
  </template>
  
  <script>
  export default {
    props: {
      user: Object
    },
    computed: {
      isLoggedIn() {
        return !!this.user
      },
      avatarUrl() {
        return require('@/assets/avatar.png')
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('token')
        localStorage.removeItem('username')
        localStorage.removeItem('user_id')
        this.$router.push('/login')
      }
    }
  }
  </script>
  
  <style scoped>
  .header {
    background-color: #002b5b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    color: white;
  }
  
  .header__left .header__home-button img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    padding: 4px;
  }
  
  .header__right {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .header__username {
    text-decoration: none;
    color: white;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .header__avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: darkred;
  }
  </style>
  