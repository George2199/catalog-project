<template>
    <div>
      <AppHeader :user="user" />
      <div class="add-resource-container">
        <h2>Редактирование ресурса</h2>
  
        <form @submit.prevent="handleSubmit">
          <label>Название ресурса *</label>
          <input v-model="form.title" type="text" required />
  
          <label>URL *</label>
          <input v-model="form.url" type="url" required />
  
          <label>Раздел *</label>
          <input v-model="form.section" type="text" required />
  
          <label>Ключевые слова *</label>
          <input v-model="form.tags" type="text" required />
  
          <label>Краткое описание</label>
          <textarea v-model="form.description"></textarea>
  
          <label>Контактная информация *</label>
          <input v-model="form.contact_info" type="text" required />
  
          <div class="actions">
            <button type="button" class="clear" @click="resetForm">Сбросить</button>
            <button type="submit" class="submit" :disabled="!isValid">Сохранить</button>
          </div>
  
          <p class="error" v-if="!isValid">⚠ Заполните обязательные поля</p>
        </form>
      </div>
    </div>
  </template>
  
  <script>
  import AppHeader from '@/components/AppHeader.vue';
  
  export default {
    components: { AppHeader },
    data() {
      return {
        user: null,
        form: {
          title: '',
          url: '',
          section: '',
          tags: '',
          description: '',
          contact_info: ''
        }
      };
    },
    computed: {
      isValid() {
        const { title, url, section, tags, contact_info } = this.form;
        return title && url && section && tags && contact_info;
      }
    },
    created() {
      this.loadUser();
      this.fetchResource();
    },
    methods: {
      async loadUser() {
        const user_id = localStorage.getItem("user_id");
        if (!user_id) return;
  
        try {
          const res = await fetch(`http://localhost:5000/api/auth/profile?user_id=${user_id}`);
          if (!res.ok) throw new Error("Ошибка загрузки пользователя");
          this.user = await res.json();
        } catch (err) {
          console.error("Ошибка при получении пользователя:", err);
        }
      },
      async fetchResource() {
        const id = this.$route.params.id;
        try {
          const res = await fetch(`http://localhost:5000/api/resources/${id}`);
          if (!res.ok) throw new Error("Ошибка при загрузке ресурса");
          const data = await res.json();
          this.form = {
            title: data.title,
            url: data.url,
            section: data.section,
            tags: data.tags,
            description: data.description,
            contact_info: data.contact_info
          };
        } catch (err) {
          console.error("Ошибка при получении ресурса:", err);
        }
      },
      async handleSubmit() {
        const id = this.$route.params.id;
  
        try {
          const res = await fetch(`http://localhost:5000/api/resources/${id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.form)
          });
  
          if (!res.ok) throw new Error("Ошибка при обновлении ресурса");
          this.$router.push('/profile');
        } catch (err) {
          console.error("Ошибка сохранения:", err);
          alert("Не удалось обновить ресурс. Попробуйте позже.");
        }
      },
      resetForm() {
        this.fetchResource(); // сбрасываем до оригинального состояния
      }
    }
  };
  </script>
  
  <style>
  /* те же стили, что в AddResource */
  </style>
  