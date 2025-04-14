<template>
  <div class="page-wrapper">
    <AppHeader />


    <div class="catalog-wrapper">
      <h1>Каталог ресурсов</h1>

      <div class="filters">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Поиск по ключевым словам..."
          @input="currentPage = 1"
        />
        <div class="filter-controls">
          <label>Сортировать по:</label>
          <select v-model="sortBy" @change="sortResources">
            <option value="date">Дате</option>
            <option value="title">Названию</option>
          </select>

          <label>Показывать:</label>
          <select v-model="perPage" @change="currentPage = 1; fetchItems()">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
          </select>
        </div>
      </div>

      <div class="section-chips">
        <span
          v-for="section in allSections"
          :key="section"
          class="section-chip"
          :class="{ active: sectionFilter.includes(section) }"
          @click="toggleSection(section)"
        >
        {{ section }}
      </span>
    </div>


      <div class="resource-list">
        <div class="catalog-container">
          <div v-for="resource in paginatedResources" :key="resource.id" class="resource-card">
            <div class="resource-info">
              <router-link :to="`/resource/${resource.id}`" class="resource-title">{{ resource.title }}</router-link>
              <p class="resource-description">{{ resource.description }}</p>
              <p class="resource-meta">Обновлено: {{ formatDate(resource.last_updated) }}</p>
              <p class="resource-meta">Контакт: {{ resource.contact_info }}</p>
            </div>
            <div class="resource-action">
              <router-link :to="`/resource/${resource.id}`" class="go-button">Перейти</router-link>
            </div>
            <div class="admin-controls" v-if="userRole === 'admin'">
              <router-link :to="`/resources/${resource.id}/edit`" class="edit-btn">
                ✏ Редактировать
              </router-link>
              <button class="delete-btn" @click="deleteResource(resource.id)">
                🗑 Удалить
              </button>
            </div>
          </div>
        </div>
      </div>

      <div class="pagination">
        <button :disabled="currentPage === 1" @click="currentPage--; fetchItems()">
          Назад
        </button>

        <span>Страница {{ currentPage }} из {{ totalPages }}</span>
        <button :disabled="currentPage === totalPages" @click="currentPage++; fetchItems()">Вперед</button>
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
      perPage: 10,
      currentPage: 1,
      sectionFilter: [],
      allSections: ["science", "tech", "history", "math", "culture"],
      user: null,
      sortBy: 'date', // 'date' или 'title'
      searchQuery: '',
    }
  },
  created() {
    this.loadUserFromStorage()
    this.fetchItems()
  },
  methods: {
    loadUserFromStorage() {
      const username = localStorage.getItem("username")
      const user_id = localStorage.getItem("user_id")

      if (username && user_id) {
        this.user = { id: user_id, username: username }
        console.log("Загружен user:", this.user)
      }
    },

    async fetchItems() {
      try {
        const params = new URLSearchParams({
          limit: this.perPage,
          offset: (this.currentPage - 1) * this.perPage,
        });

        if (this.sectionFilter.length > 0) {
          this.sectionFilter.forEach(section => {
            params.append('section', section);
          });
        }

        const res = await axios.get(`http://localhost:5000/api/resources?${params}`);
        this.allResources = res.data;
      } catch (err) {
        console.error('Ошибка загрузки ресурсов:', err);
      }
      this.sortResources();
    },

    formatDate(dateString) {
      const options = { year: 'numeric', month: '2-digit', day: '2-digit' }
      return new Date(dateString).toLocaleDateString('ru-RU', options)
    },

    toggleSection(section) {
      if (this.sectionFilter.includes(section)) {
        this.sectionFilter = this.sectionFilter.filter(s => s !== section)
      } else {
        this.sectionFilter.push(section)
      }
      this.currentPage = 1
      this.fetchItems()
    },
    async deleteResource(id) {
      if (!confirm("Удалить этот ресурс?")) return;

      try {
        const res = await fetch(`http://localhost:5000/api/resources/${id}`, {
          method: 'DELETE'
        });
        if (!res.ok) throw new Error("Ошибка при удалении");

        this.allResources = this.allResources.filter(r => r.id !== id);
      } catch (err) {
        console.error("Ошибка удаления:", err);
        alert("Не удалось удалить ресурс");
      }
    },

    sortResources() {
      if (this.sortBy === 'date') {
        this.allResources.sort((a, b) => new Date(b.last_updated) - new Date(a.last_updated));
      } else if (this.sortBy === 'title') {
        this.allResources.sort((a, b) => a.title.localeCompare(b.title));
      }
    }

  },
  computed: {
    totalPages() {
      const filtered = this.allResources.filter(resource => {
        const query = this.searchQuery.toLowerCase();
        return (
          resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query)
        );
      });

      return Math.ceil(filtered.length / this.perPage);
    },

    paginatedResources() {
      const filtered = this.allResources.filter(resource => {
        const query = this.searchQuery.toLowerCase();
        return (
          resource.title.toLowerCase().includes(query) ||
          resource.description.toLowerCase().includes(query)
        );
      });

      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return filtered.slice(start, end);
    },
    userRole() {
      return localStorage.getItem("user_role");
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

.filters {
  display: flex;
  gap: 10px;
  align-items: center;
}

.filters {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
  align-items: center;
}

.filters span {
  font-weight: bold;
}

.filters button {
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

.section-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin: 10px 0 20px;
}

.section-chip {
  padding: 6px 12px;
  border-radius: 9999px;
  background-color: #eee;
  cursor: pointer;
  transition: all 0.2s;
}

.section-chip.active {
  background-color: #002b5c;
  color: white;
}

.admin-controls {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-left: 20px;
}

.edit-btn,
.delete-btn {
  background-color: #002d5b;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 0.9rem;
}

.delete-btn {
  background-color: #b00020;
}

</style>