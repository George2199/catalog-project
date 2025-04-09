<template>
  <div :class="{'auth-background': isAuthPage, 'default-background': !isAuthPage}">
    <router-view />
  </div>
</template>

<script>
export default {
  computed: {
    isAuthPage() {
      return this.$route.path === '/login' || this.$route.path === '/register'
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.auth-background {
  background-image: url('@/assets/background.png'); /* или где он у тебя */
  background-size: cover;
  background-position: center;
  min-height: 100vh;
}

.default-background {
  background-color: white;
  min-height: 100vh;
}

html, body {
  background-color: white !important;
  margin: 0;
  padding: 0;
}

</style>
