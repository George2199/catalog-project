<template>
    <div>
      <AppHeader :user="user"/>
      <div class="add-resource-container">
        <h2>Добавление нового ресурса</h2>
  
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
  
          <label>Изображения ресурса:</label>
          <div class="images-preview">
            <input type="file" multiple @change="handleFileChange" />
            <div class="image-box" v-for="(img, index) in previewImages" :key="index">
              <img :src="img" alt="image preview" v-if="img" />
            </div>
          </div>
  
          <div class="actions">
            <button type="button" class="clear" @click="resetForm">Очистить</button>
            <button type="submit" class="submit" :disabled="!isValid">Добавить ресурс</button>
          </div>
  
          <p class="error" v-if="!isValid">⚠ Вы не можете добавить ресурс, пока не заполнены обязательные поля!</p>
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
        user: {
          full_name: 'Иоганн фон Цвайшпиц',
          email: 'io@lands.de'
        },
        form: {
          title: '',
          url: '',
          section: '',
          tags: '',
          description: '',
          contact_info: '',
          images: []
        },
        previewImages: []
      };
    },
    computed: {
      isValid() {
        const { title, url, section, tags, contact_info } = this.form;
        return title && url && section && tags && contact_info;
      }
    },
    methods: {
      handleFileChange(event) {
        const files = event.target.files;
        this.previewImages = [];
        this.form.images = Array.from(files);
  
        for (const file of this.form.images) {
          const reader = new FileReader();
          reader.onload = e => {
            this.previewImages.push(e.target.result);
          };
          reader.readAsDataURL(file);
        }
      },
      async handleSubmit() {
        if (!this.isValid) return;

        const formData = {
            title: this.form.title,
            url: this.form.url,
            section: this.form.section,
            tags: this.form.tags,
            description: this.form.description,
            contact_info: this.form.contact_info,
        };

        try {
            const res = await fetch('http://localhost:5000/api/resources/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!res.ok) throw new Error('Ошибка при сохранении ресурса');

            const result = await res.json();
            console.log('Ресурс добавлен:', result);

            this.resetForm();
            this.$router.push('/profile');
        } catch (err) {
            console.error('Ошибка отправки:', err);
            alert('Не удалось добавить ресурс. Попробуйте позже.');
        }
        }
        ,
      resetForm() {
        this.form = {
          title: '',
          url: '',
          section: '',
          tags: '',
          description: '',
          contact_info: '',
          images: []
        };
        this.previewImages = [];
      }
    }
  };
  </script>
  
  
  <style>
  .add-resource-container {
    max-width: 800px;
    margin: 2rem auto;
    background: white;
    padding: 2rem;
    border-radius: 10px;
    font-family: Arial, sans-serif;
    text-align: left;
  }
  form {
    display: flex;
    flex-direction: column;
  }
  label {
    margin-top: 1rem;
    margin-bottom: 0.4rem;
  }
  input[type="text"],
  input[type="url"],
  textarea {
    padding: 0.5rem;
    font-size: 1rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
  textarea {
    resize: vertical;
    min-height: 100px;
  }
  .images-preview {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
    flex-wrap: wrap;
  }
  .image-box {
    width: 120px;
    height: 80px;
    background: #f2f2f2;
    border: 1px dashed #ccc;
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
  }
  .image-box img {
    max-width: 100%;
    max-height: 100%;
  }
  .actions {
    display: flex;
    justify-content: space-between;
    margin-top: 2rem;
  }
  .clear,
  .submit {
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  .clear {
    background-color: #ccc;
  }
  .submit {
    background-color: #002d5b;
    color: white;
  }
  .submit:disabled {
    background-color: #999;
    cursor: not-allowed;
  }
  .error {
    color: #b30000;
    margin-top: 1rem;
    font-size: 0.9rem;
  }
  </style>
  