<template>
  <div>
    <AppHeader />
    <div class="profile-container">
      <h2>Личный кабинет</h2>
      <div class="profile-info">
        <p><strong>Имя пользователя:</strong> {{ user.name }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Статус:</strong> {{ user.status }}</p>
      </div>

      <div class="resources-header">
        <h3>Мои ресурсы</h3>
        <button class="add-resource" @click="goToAddResource">Добавить ресурс</button>
      </div>

      <div class="resources-list">
        <div
          class="resource-card"
          v-for="(resource, index) in user.resources"
          :key="index"
        >
          <div class="resource-text">
            <p class="resource-title">{{ resource.title }}</p>
            <p class="resource-date">Добавлено: {{ resource.date }}</p>
          </div>
          <button class="edit-btn">Редактировать</button>
        </div>
      </div>

      <button class="back-button" @click="$router.go(-1)">Назад</button>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';

export default {
  components: { AppHeader },
  data() {
    return {
      user: {
        name: 'Иоганн фон Цвайшпиц',
        email: 'io@lands.de',
        status: 'Активен',
        resources: [
          { title: 'SmartMind KB', date: '05.04.2025' },
          { title: 'EduBase', date: '10.04.2025' }
        ]
      }
    };
  },
  methods: {
    goToAddResource() {
      this.$router.push('/add-resource');
    }
  }
};
</script>

<style>
.profile-container {
  max-width: 600px;
  margin: 2rem auto;
  padding: 2rem;
  background: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  text-align: left;
  font-family: Arial, sans-serif;
}
.profile-info p {
  margin: 0.5rem 0;
}
.resources-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 2rem;
}
.add-resource {
  background-color: #002d5b;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  border-radius: 4px;
}
.resources-list {
  margin-top: 1rem;
}
.resource-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f5f5f5;
  padding: 1rem;
  border-radius: 8px;
  margin-bottom: 1rem;
}
.resource-title {
  font-weight: bold;
}
.edit-btn {
  background-color: #002d5b;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  border-radius: 4px;
}
.back-button {
  margin-top: 1rem;
  background-color: #002d5b;
  color: white;
  border: none;
  padding: 0.5rem 1rem;
  cursor: pointer;
  border-radius: 4px;
}
.back-button:hover {
  background-color: #004080;
}
</style>