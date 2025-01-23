import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Reviews from '../views/Reviews.vue'
import SearchPage from '../views/SearchPage.vue'
import About from '../views/About.Vue'

// Rotas
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // caminho da home ou pagina inicial
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    // caminho da aba de reviews
    {
      path: '/reviews',
      name: 'reviews',
      component: Reviews,
    },
    // caminho do about
    {
      path: '/about',
      name: 'about',
      component: About,
    },
    // caminho dos resultados
    {
      path: '/reviews/results',
      name: 'searchResults',
      component: SearchPage,
      props: route => ({ searchQuery: route.query.search_query })
    },
    // outras rotas
    {
      path: '/:catchAll(.*)', // Rota para lidar com caminhos não encontrados
      redirect: '/' // Redireciona para a home
    },
  ],
})

export default router
