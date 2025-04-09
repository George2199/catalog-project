<template>
  <div class="page-wrapper">
    <AppHeader :user="{ full_name: 'Иоганн фон Цвайшпиц' }" />

    <div class="catalog-wrapper">
      <h1>Каталог ресурсов</h1>

      <div class="filters">
        <input type="text" placeholder="Поиск по ключевым словам..." />
        <div class="filter-controls">
          <label>Сортировать по:</label>
          <select>
            <option>Дате</option>
            <option>Названию</option>
          </select>

          <label>Показывать:</label>
          <select v-model="perPage" @change="currentPage = 1">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
          </select>
        </div>
      </div>

      <div class="categories">
        <span>Разделы:</span>
        <button>Все</button>
        <button>Образование</button>
        <button>Наука</button>
        <button>Разработка</button>
      </div>

      <div class="resource-list">
        <!-- <div
          v-for="resource in paginatedResources"
          :key="resource.id"
          class="resource-card"
        > -->
          <div class="catalog-container">
            <div v-for="resource in paginatedResources" :key="resource.id" class="resource-card">
              <div class="resource-info">
                <a :href="resource.url" class="resource-title">{{ resource.title }}</a>
                <p class="resource-description">{{ resource.description }}</p>
                <p class="resource-meta">Обновлено: {{ formatDate(resource.last_updated) }}</p>
                <p class="resource-meta">Контакт: {{ resource.contact_info }}</p>
              </div>
              <div class="resource-action">
                <a :href="resource.url" class="go-button">Перейти</a>
              </div>
            </div>
          </div>
        <!-- </div> -->
      </div>

      <div class="pagination">
        <button :disabled="currentPage === 1" @click="currentPage--">
          Назад
        </button>

        <span>Страница {{ currentPage }} из {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="currentPage++">Вперед</button>
      </div>
    </div>
  </div>
</template>

<script>
import AppHeader from '@/components/AppHeader.vue'
import axios from 'axios'

export default {
  components: {
    AppHeader
  },
  data() {
    return {
      allResources: [],
      resources: [],
      currentPage: 1,
      selectedLimit: 10,
      sortBy: 'date'
    }
  },
  async created() {
    const res = await axios.get('http://localhost:5000/api/resources')
    this.allResources = res.data
  },
  methods: {
    goToPage(page) {
      this.currentPage = page
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      return new Date(dateString).toLocaleDateString('ru-RU', options)
    }
  },
  computed: {
    totalPages() {
      return Math.ceil(this.allResources.length / this.selectedLimit)
    },
      paginatedResources() {
      const start = (this.currentPage - 1) * this.selectedLimit
      const end = start + this.selectedLimit
      return this.allResources.slice(start, end)
    },
  }
}
</script>

<style scoped>

body.style {
  overflow: auto;
}

.page-wrapper {
  background-color: white;
  min-height: 100vh;
}

.catalog-wrapper {
  padding: 20px 40px;
  text-align: left;
}

.filters {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  margin-bottom: 15px;
}

.filters input {
  flex: 1;
  margin-right: 20px;
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.filter-controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.categories {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.categories span {
  font-weight: bold;
}

.categories button {
  padding: 5px 10px;
  border-radius: 5px;
  background: #f0f0f0;
  border: none;
  cursor: pointer;
}

.resource-card {
  display: flex;
  justify-content: space-between;
  background: #f9f9f9;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 15px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.05);
  align-items: center;
}

.resource-info h3 {
  margin: 0;
  color: #003b70;
}

.resource-info p {
  margin: 5px 0;
}

.meta {
  color: gray;
  font-size: 0.9rem;
}

.go-button {
  background: #002b5b;
  color: white;
  border: none;
  padding: 10px 16px;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 8px;
}
.pagination button {
  padding: 6px 12px;
  border: none;
  background: #eee;
  cursor: pointer;
}
.pagination button.active {
  background-color: #002e5b;
  color: white;
  font-weight: bold;
}
.pagination button:disabled {
  background: #ccc;
  cursor: not-allowed;
}

</style>