<template>
  <div>
    <AppHeader :user="user" />

    <div class="profile-container">
      <h2>Личный кабинет</h2>
      <div class="profile-info">
        <p><strong>Имя пользователя:</strong> {{ user.username }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
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
          <button class="delete-btn" @click="deleteResource(resource.id)">
            Удалить
          </button>
          <router-link
            class="edit-btn"
            :to="`/resources/${resource.id}/edit`"
          >
            Редактировать
          </router-link>

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
        resources: [
          { title: 'SmartMind KB', date: '05.04.2025' },
          { title: 'EduBase', date: '10.04.2025' }
        ]
      }
    };
  },
  created() {
    this.fetchUserProfile();
  },
  methods: {
  async fetchUserProfile() {
    const user_id = localStorage.getItem("user_id");
    if (!user_id) return;

    try {
      const res = await fetch(`http://localhost:5000/api/auth/profile?user_id=${user_id}`);

      if (!res.ok) throw new Error("Ошибка загрузки профиля");
      const data = await res.json();
      this.user = data;
    } catch (err) {
      console.error(err);
    }
  },
    goToAddResource() {
      this.$router.push('/add-resource');
    },
    async deleteResource(id) {
      if (!confirm("Вы уверены, что хотите удалить этот ресурс?")) return;

      try {
        const res = await fetch(`http://localhost:5000/api/resources/${id}`, {
          method: 'DELETE'
        });

        if (!res.ok) throw new Error("Ошибка при удалении ресурса");

        // Обновляем список ресурсов без удалённого
        this.user.resources = this.user.resources.filter(r => r.id !== id);
      } catch (err) {
        console.error("Ошибка при удалении:", err);
        alert("Не удалось удалить ресурс. Попробуйте позже.");
      }
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

.delete-btn {
  background-color: #c62828;
  color: white;
  border: none;
  padding: 0.4rem 0.8rem;
  cursor: pointer;
  border-radius: 4px;
  margin-left: 0.5rem;
}
.delete-btn:hover {
  background-color: #a30000;
}

</style>