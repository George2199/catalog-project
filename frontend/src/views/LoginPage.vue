<template>
    <div class="login-wrapper">
      <div class="login-card">
        <form @submit.prevent="login">
          <label>Имя пользователя:</label>
          <input v-model="username" type="text" />
  
          <label>Пароль:</label>
          <input v-model="password" type="password" />
  
          <button type="submit">Войти</button>
        </form>
  
        <div class="links">
            <router-link to="/register">Пройти регистрацию</router-link>
            <a href="#" @click.prevent="loginAsGuest">Войти как гость</a>
        </div>
  
        <div class="roles-box">
          <p><strong>Роли в системе:</strong></p>
          <ul>
            <li>Посетитель — просмотр и поиск</li>
            <li>Пользователь — добавление ресурсов</li>
            <li>Администратор — модерация и управление</li>
          </ul>
        </div>
  
        <p v-if="error" class="error">{{ error }}</p>
      </div>
    </div>
  </template>
  
  <script>  
  export default {
    data() {
      return {
        username: '',
        password: '',
        error: ''
      }
    },
    methods: {
      login() {
        fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: this.username,
            password: this.password
          })
        })
        .then(res => res.json())
        .then(data => {
          if (data.access_token) {
            localStorage.setItem("token", data.access_token);
            localStorage.setItem("user_id", data.user_id);
            localStorage.setItem("username", data.username);
            localStorage.setItem("user_role", data.role);
            console.log("Записал роль:", data.role);

            this.$router.push("/catalog");
          } else {
            alert("Ошибка входа: " + (data.error || "Неизвестно"));
          }
        })
        .catch(err => {
          console.error("Ошибка запроса:", err);
          alert("Сервер не отвечает");
        });
      },
      loginAsGuest() {
        localStorage.clear(); // удаляем данные
        this.$emit('guest-login'); // сообщаем родителю
        this.$router.push("/catalog");
      }
    }

  }
  </script>
  
  
  
  <style scoped>

  .login-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }
  
  .login-card {
    background: white;
    padding: 2rem;
    border-radius: 20px;
    max-width: 400px;
    width: 100%;
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
    text-align: left;
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
    text-align: center;
  }
  
  .links a {
    color: darkred;
    display: block;
    margin-bottom: 0.25rem;
    text-decoration: none;
    text-align: left;
  }
  
  .roles-box {
    margin: 0;
    margin-top: 1rem;
    padding: 1rem;
    border: 1px solid darkred;
    border-radius: 10px;
    background: #fefefe;
    font-size: 0.9rem;
  }
  
  .error {
    margin-top: 1rem;
    color: red;
    text-align: left;
  }

    .links a,
    .links router-link {
    color: darkred;
    display: block;
    margin-bottom: 0.25rem;
    text-decoration: none;
    text-align: left;
    transition: all 0.2s ease-in-out;
    }

    .links a:hover,
    .links router-link:hover {
    color: #db3737;
    text-decoration: underline;
    }

    </style>
  