<template>
  <header class="header">
    <div class="header__left">
      <router-link to="/catalog" class="header__home-button">
        <img src="@/assets/home.png" alt="Домой" />
      </router-link>
    </div>

    <div class="header__right" @click="handleProfileClick">
      <span class="header__username">{{ displayName }}</span>
      <img :src="avatarUrl" alt="Аватар пользователя" class="header__avatar" />
    </div>
  </header>
</template>
  
<script>
export default {
  data() {
    return {
      username: null
    }
  },
  computed: {
    isLoggedIn() {
      return !!this.username;
    },
    avatarUrl() {
      return require('@/assets/avatar.png');
    },
    displayName() {
      return this.username || "Гость";
    }
  },
  mounted() {
    this.username = localStorage.getItem("username");
    window.addEventListener("storage", this.syncUsername);
  },
  beforeUnmount() {
    window.removeEventListener("storage", this.syncUsername);
  },
  methods: {
    syncUsername() {
      this.username = localStorage.getItem("username");
    },
    handleProfileClick() {
      if (this.isLoggedIn) {
        this.$router.push("/profile");
      } else {
        this.$router.push("/register");
      }
    }
  }
}
</script>

  
<style scoped>
  .header {
    background-color: #002b5b;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 10px 20px;
    color: white;
  }
  
  .header__left .header__home-button img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    padding: 4px;
  }
  
  .header__right {
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .header__username {
    text-decoration: none;
    color: white;
    display: flex;
    align-items: center;
    gap: 10px;
  }
  
  .header__avatar {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: darkred;
  }
</style>
  