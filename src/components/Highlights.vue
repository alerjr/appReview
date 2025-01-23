<template>
  <!-- Destaques -->
  <div class="container col-10 mt-4">
    <div id="carouselExampleControls" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <!-- Lista com resultados -->
        <ul>
          <li
            v-for="(review, index) in dados"
            :key="review.id"
            class="carousel-item"
            :class="{ active: index === 0 }"
          >
            <img
              :src="`../src/assets/highlights-0${index + 1}.jpg`"
              class="d-block w-100"
              alt="..."
            />
            <div class="carousel-caption d-none d-md-block">
              <h5>
                <b>{{ review.review }}</b>
              </h5>
              <p>{{ review.first_name }} {{ review.last_name }}</p>
            </div>
          </li>
        </ul>
      </div>

      <!-- Controles -->
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleControls"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </div>
</template>

<script>
// imports
import { getData } from '@/services/api'

export default {
  data() {
    return {
      dados: [], // dados vazios
    }
  },
  mounted() {
    // obtem as reviews de id 1 2 e 3
    getData()
      .then((data) => {
        this.dados = data.filter((review) => review.id === 1 || review.id === 2 || review.id === 3)
      })
      .catch((error) => {
        console.error('Erro ao carregar os dados', error)
      })
  },
}
</script>

<style scoped>
#carouselExampleControls {
  display: flex;
}

img {
  width: 100%;
  object-fit: cover;
}

.carousel-inner {
  justify-content: center;
  align-content: center;
  align-items: center;
}

button {
  width: 30%;
}
</style>
