<template>
    <div class="register-wrapper">
      <div class="register-card">
        <h2>Регистрация</h2>
        <form @submit.prevent="register">
          <label>Email:</label>
          <input v-model="email" type="email" required />
  
          <label>Имя пользователя:</label>
          <input v-model="username" type="text" required />
  
          <label>Пароль:</label>
          <input v-model="password" type="password" required />
  
          <label>Повторите пароль:</label>
          <input v-model="confirmPassword" type="password" required />
  
          <button type="submit">Создать аккаунт</button>
        </form>
  
        <div class="links">
          <router-link to="/login">Назад ко входу</router-link>
        </div>
  
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios'
  
  export default {
    data() {
      return {
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        error: ''
      }
    },
    methods: {
      async register() {
        if (this.password !== this.confirmPassword) {
          this.error = 'Пароли не совпадают'
          return
        }
        try {
          await axios.post('http://localhost:5000/api/auth/register', {
            email: this.email,
            username: this.username,
            password: this.password
          })
          this.$router.push('/login')
        } catch (err) {
          this.error = 'Ошибка при регистрации'
        }
      }
    }
  }
  </script>
  
  <style scoped>
  html, body {
    margin: 0;
    padding: 0;
    height: 100%;
    overflow: hidden;
  }
  
  body {
    background-image: url('background.png');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  
  .register-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  
  .register-card {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    text-align: left; /* ключевой момент */
  }
  
  h2 {
    text-align: center;
    color: #002b5b;
    margin-bottom: 1.5rem;
  }
  
  label {
    display: block;
    margin-bottom: 0.25rem;
    font-weight: 500;
  }
  
  input {
    width: 100%;
    padding: 10px;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 10px;
  }
  
  button {
    width: 100%;
    background: #002b5b;
    color: white;
    border: none;
    padding: 12px;
    border-radius: 10px;
    cursor: pointer;
    font-weight: bold;
  }
  
  .links {
    margin-top: 1rem;
    text-align: left;
  }
  
  .links a {
    color: darkred;
    text-decoration: none;
  }
  
  .links a:hover {
    text-decoration: underline;
    color: #a00000;
  }
  
  .error {
    margin-top: 1rem;
    color: red;
    text-align: center;
  }
  </style>  
  