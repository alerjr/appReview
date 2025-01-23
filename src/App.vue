<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Home from '../src/views/HomeView.vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div>
    <!-- Padrão definido do app -->
    <Navbar />
    <RouterView />
    <Footer />
  </div>
</template>

<style scoped>
</style>
