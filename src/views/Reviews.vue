<template>
  <div class="container min-vh-100">
    <h1 class="text-center mt-4">Avaliações</h1>
    <!-- Componente para filtrar reviews -->
    <div class="text-center-sm mb-4">
      <FilterReviews @filter-changed="applyFilter" />
      <hr />
    </div>

    <!-- Cards de reviews -->
    <div class="container">
      <!-- Lista com resultados disponíveis -->
      <ul class="list-unstyled d-flex justify-content-center-md flex-wrap justify-content-between">
        <li v-for="review in filteredReviews" :key="review.id" class="col-md-5 col-12">
          <div class="card mt-4" id="cardReview">
            <div class="card-body p-4">
              <h5 class="card-title">
                "<b>{{ review.review }}</b
                >"
                <span v-for="i in review.stars" :key="i" class="fa fa-star checked"> </span>
              </h5>
              <div class="row">
                <div
                  class="col-sm mt-2"
                  data-bs-toggle="modal"
                  data-bs-target="#staticBackdrop"
                  @click="showUserModal(review)"
                  id="user_name"
                >
                  {{ review.first_name }} {{ review.last_name }}
                </div>
              </div>

              <div
                class="modal fade"
                id="staticBackdrop"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header">
                      <h1 class="modal-title fs-5" id="staticBackdropLabel">Dados do usuário</h1>
                      <button
                        type="button"
                        class="btn-close"
                        data-bs-dismiss="modal"
                        aria-label="Close"
                      ></button>
                    </div>
                    <div class="modal-body">
                      <div v-if="selectedUser">
                        <div class="card">
                          <div class="card-body" id="modalBody">
                            <h5 class="card-title">
                              {{ selectedUser.first_name }} {{ selectedUser.last_name }}
                            </h5>
                            <hr />
                            <p class="card-text">
                              Telefone: {{ formatPhoneNumber(selectedUser.phone) }}
                            </p>
                            <p class="card-text">Email: {{ selectedUser.email }}</p>
                            <div class="row justify-content d-flex justify-content-center">
                              <a
                                :href="'tel:+55' + selectedUser.phone"
                                class="btn btn-primary col-2 m-2"
                                >Ligar</a
                              >
                              <a
                                :href="'mailto:' + selectedUser.email"
                                class="btn btn-primary col-4 m-2"
                                >Enviar email</a
                              >
                              <a
                                :href="'https://api.whatsapp.com/send?phone=' + selectedUser.phone"
                                class="btn btn-primary col-3 m-2"
                                >Whatsapp</a
                              >
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <small class="text-muted" id="data">{{
                formatRelativeDate(review.created_at)
              }}</small>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
// Imports
import { getData } from '@/services/api'
import FilterReviews from '../components/FilterReviews.vue'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export default {
  components: { FilterReviews },
  data() {
    return {
      dados: [], // Dados originais
      filter: null, // Filtro selecionado
      selectedUser: null, // Usuario selecionado
    }
  },
  computed: {
    // Funcao de filtro
    filteredReviews() {
      let reviews = [...this.dados]
      if (this.filter === 'oldest') {
        reviews.sort((a, b) => a.id - b.id)
      } else if (this.filter === 'newest') {
        reviews.sort((a, b) => b.id - a.id)
      } else if (this.filter === 'az') {
        reviews.sort((a, b) => a.review.localeCompare(b.review))
      } else if (this.filter === 'stars_asc') {
        reviews.sort((a, b) => a.stars - b.stars)
      } else if (this.filter === 'stars_desc') {
        reviews.sort((a, b) => b.stars - a.stars)
      }
      return reviews
    },
  },
  mounted() {
    getData()
      .then((data) => {
        this.dados = data
        this.filter = 'newest'
      })
      .catch((error) => {
        console.error('Erro ao carregar os dados', error)
      })
  },
  methods: {
    // Aplicacao do filtro definido
    applyFilter(filterType) {
      this.filter = filterType
    },
    // Parametro de data
    formatRelativeDate(dateString) {
      const date = new Date(dateString)
      return formatDistanceToNow(date, { addSuffix: true, locale: ptBR })
    },
    // Exibir a modal da review selecionada
    showUserModal(review) {
      this.selectedUser = review // Armazenando o usuário selecionado
    },
    formatPhoneNumber(phoneNumber) {
      const cleaned = phoneNumber.replace(/\D/g, '') // Remove qualquer caractere não numérico

      if (cleaned.length === 11) {
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 3)} ${cleaned.slice(
          3,
          7
        )}-${cleaned.slice(7, 11)}`
      } else {
        return phoneNumber
      }
    },
  },
}
</script>

<style>
#user_name:hover {
  cursor: pointer;
  color: #ffffffa7;
}

body {
  padding-right: 0 !important;
}

#cardReview {
  background-color: #070200;
  color: #fff;
}

h1 {
  color: #fff;
}

#data {
  color: #a3a3a3 !important;
}

.modal {
  background-color: #0702004d;
}

.modal-content {
  background-color: #3f3639;
  border: 0;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px, rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
}

#modalBody {
  background-color: #3f3639;
  color: white;
}

.modal-body {
  border: 0;
}

.modal-body .card {
  border: 0;
}

.modal-body a {
  background-color: black;
  border: 0;
}

.modal-body a:hover {
  background-color: rgba(0, 0, 0, 0.329);
}

button .btn-close {
  background-color: white;
}

@media (max-width: 768px) {
  .modal-body .card a {
    width: 50%;
  }
}
</style>
