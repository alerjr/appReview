<template>
<!-- Card com titulo texto e estrelas -->
  <div class="container">
    <h2 class="text-center mt-3" id="pagetitle">Destaques:</h2>
    <ul class="row">
      <li v-for="review in dados" :key="review.id" class="col-lg-3 col-md-6">
        <router-link to="/reviews" class="card mt-4 p-2" id="card">
          <div class="card-body">
            <h5 class="card-title">
              {{ review.review }}
            </h5>
            <p class="card-text">{{ review.first_name }} {{ review.last_name }}.</p>
            <span v-for="i in review.stars" :key="i" class="fa fa-star checked"></span>
          </div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
// imports
import { getData } from '@/services/api'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default {
  data() {
    return {
      dados: [], // dados originais
    }
  },
  mounted() {
    getData()
      .then((data) => {
        // filtro para pegar as reviews 5 estrelas
        this.dados = data.filter((review) => review.stars === 5)
      })
      .catch((error) => {
        console.error('Erro ao carregar dados', error)
      })
  },
  methods: {
    // metodo de data
    formatRelativeDate(dateString) {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true, locale: ptBR })
    },
  },
}
</script>

<style>
@font-face {
  font-family: 'Vercetti';
  src: url('./src/assets/fonts/OpenType WOFFs/Vercetti-Regular.woff') format('woff'),
    url('./src/assets/fonts/OpenType WOFFs/Vercetti-Regular.woff2') format('woff2');
  font-weight: normal;
  font-style: normal;
}

body {
  font-family: 'Vercetti', sans-serif;
  background-color: #3f3639;
}

#pagetitle {
  font-weight: 600;
  color: #fff;
}

ul {
  list-style-type: none;
  padding-left: 0;
}

#card {
  background-color: #070200;
  color: #fff;
}

#card:hover {
  animation: pulse;
  animation-duration: 1s;
  background-color: #fff;
  color: #070200;
}

a {
  text-decoration: none;
}

.fa {
  color: #3f3639;
}
</style>