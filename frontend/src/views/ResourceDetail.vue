<template>
  <div>
    <AppHeader :user="user" />
    <div v-if="resource" class="resource-detail">
      <div class="resource-content">
        <h1 class="resource-title">
          <a :href="resource.url" target="_blank" rel="noopener">{{ resource.title }}</a>
        </h1>

        <div class="gallery" v-if="resource.images && resource.images.length">
          <img
            v-for="(img, index) in fullImageUrls"
            :key="index"
            :src="img"
            class="gallery-image"
            alt="Resource image"
          />
        </div>

        <div class="info-text">
          <p class="description"><strong>Описание:</strong><br>{{ resource.description }}</p>

          <p><strong>Ссылка:</strong> <a :href="resource.url" target="_blank">{{ resource.url }}</a></p>

          <p><strong>Ключевые слова:</strong>
            <span v-for="(tag, index) in parsedTags" :key="index">
              <span :style="{ color: isHighlighted(tag) ? 'red' : 'black' }">{{ tag }}</span>
              <span v-if="index < parsedTags.length - 1">, </span>
            </span>
          </p>

          <p><strong>Обновлено:</strong> {{ formatDate(resource.last_updated) }}</p>
          <p><strong>Контакт:</strong> {{ resource.contact_info }}</p>

          <button class="back-button" @click="$router.go(-1)">Назад</button>
          <button class="download-button" @click="downloadPdf">Загрузить PDF</button>
        </div>
      </div>
    </div>

    <div v-else class="loading">Загрузка...</div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue';
import html2pdf from 'html2pdf.js';

export default {
  name: 'ResourceDetail',
  components: { AppHeader },
  data() {
    return {
      resource: null,
      user: null
    };
  },
  computed: {
    parsedTags() {
      return this.resource?.tags?.split(',').map(t => t.trim()) || [];
    },
    fullImageUrls() {
      if (!this.resource?.images) return [];
      return this.resource.images.map(path =>
        path.startsWith('/') ? `http://localhost:5000${path}` : path
      );
    }
  },
  methods: {
    async fetchResource() {
      try {
        const id = this.$route.params.id;
        const response = await fetch(`http://localhost:5000/api/resources/${id}`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        this.resource = await response.json();
      } catch (error) {
        console.error('Ошибка при загрузке ресурса:', error);
      }
    },
    async loadUser() {
      const user_id = localStorage.getItem("user_id");
      if (!user_id) return;

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/login`);
        if (!res.ok) throw new Error("Ошибка загрузки пользователя");
        this.user = await res.json();
      } catch (err) {
        console.error("Ошибка при получении пользователя:", err);
      }
    },
    formatDate(dateStr) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' };
      return new Date(dateStr).toLocaleDateString('ru-RU', options);
    },
    isHighlighted(tag) {
      return ['знания', 'наука', 'искусственный интеллект', 'open data'].includes(tag.toLowerCase());
    },
    downloadPdf() {
      const element = document.querySelector('.resource-detail');

      // Ждём загрузки всех <img>
      const images = element.querySelectorAll('img');
      const promises = Array.from(images).map(img => {
        return new Promise(resolve => {
          if (img.complete) resolve(); // уже загружено
          else img.onload = resolve;
        });
      });

      Promise.all(promises).then(() => {
        const options = {
          margin: 0.5,
          filename: `${this.resource.title || 'ресурс'}.pdf`,
          image: { type: 'jpeg', quality: 0.98 },
          html2canvas: { scale: 2, useCORS: true }, // CORS нужен для картинок с другого источника
          jsPDF: { unit: 'in', format: 'a4', orientation: 'portrait' }
        };

        html2pdf().set(options).from(element).save();
      });
    }
  },
  mounted() {
    this.fetchResource();
    this.loadUser();
  }
};
</script>
  
  <style>
  .resource-detail {
    max-width: 1100px;
    margin: 2rem auto;
    padding: 1rem;
    font-family: Arial, sans-serif;
  }
  .resource-content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  .resource-title {
    font-size: 24px;
    margin-bottom: 1rem;
    text-align: left;
  }
  .gallery {
    display: flex;
    gap: 1rem;
    margin-bottom: 1rem;
    flex-wrap: wrap;
  }
  .gallery-image {
    max-height: 180px;
    border: 1px solid #ccc;
  }
  .info-text {
    text-align: left;
    line-height: 1.6;
    font-size: 16px;
    width: 100%;
  }
  .description {
    margin-bottom: 1rem;
  }
  .back-button {
    margin-top: 2rem;
    padding: 0.5rem 1rem;
    background-color: #002d5b;
    color: white;
    border: none;
    cursor: pointer;
  }
  .back-button:hover {
    background-color: #004080;
  }
  .loading {
    text-align: center;
    margin-top: 2rem;
    font-style: italic;
    color: #555;
  }

  .download-button {
  margin-top: 1rem;
  margin-left: 1rem;
  padding: 0.5rem 1rem;
  background-color: #006400;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;
  }
  .download-button:hover {
    background-color: #008000;
  }

</style>