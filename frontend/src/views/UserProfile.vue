<template>
  <div class="profile-page">
    <header class="profile-header">
      <div class="home-icon">🏠</div>
      <div class="user-info">
        {{ user.username }}
      </div>
      <button class="logout-btn" @click="logout">Выйти</button>
    </header>

    <main class="profile-main">
      <h2>Личный кабинет</h2>
      <p><strong>Имя пользователя:</strong> {{ user.username }}</p>
      <p><strong>Email:</strong> {{ user.email }}</p>
      <p><strong>Статус:</strong> {{ user.is_banned ? 'Заблокирован' : 'Активен' }}</p>

      <h3>Мои ресурсы</h3>
      <div v-for="resource in resources" :key="resource.id" class="resource-box">
        <div>
          <strong>{{ resource.title }}</strong><br />
          <small>Добавлено: {{ formatDate(resource.created_at) }}</small>
        </div>
        <button class="edit-btn">Редактировать</button>
      </div>

      <button class="back-btn" @click="$router.push('/')">Назад</button>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {
        username: 'Иоганн фон Цвайшпиц',
        email: 'io@lands.de',
        is_banned: false
      },
      resources: [
        { id: 1, title: 'SmartMind KB', created_at: '2025-04-05' },
        { id: 2, title: 'EduBase', created_at: '2025-04-10' }
      ]
    }
  },
  methods: {
    logout() {
      alert('Выход выполнен'); // можно заменить на логику выхода
    },
    formatDate(dateStr) {
      const [y, m, d] = dateStr.split('-')
      return `${d}.${m}.${y}`
    }
  }
}
</script>

<style scoped>
.profile-page {
  min-height: 100vh;
  background: #f7f8fa;
}

.profile-header {
  background-color: #002b5b;
  color: white;
  display: flex;
  justify-content: space-between;
  padding: 1rem 2rem;
  align-items: center;
}

.logout-btn {
  background-color: #7a0000;
  border: none;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
}

.profile-main {
  max-width: 600px;
  margin: 2rem auto;
  background: white;
  padding: 2rem;
  border-radius: 16px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

h2, h3 {
  color: #002b5b;
}

.resource-box {
  border: 1px solid #eee;
  padding: 1rem;
  border-radius: 10px;
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.edit-btn {
  background: #002b5b;
  color: white;
  border: none;
  padding: 0.5rem 0.75rem;
  border-radius: 8px;
  cursor: pointer;
}

.back-btn {
  margin-top: 2rem;
  background: #002b5b;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 10px;
  cursor: pointer;
}
</style>
