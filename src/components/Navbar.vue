<template>
  <!-- Componente de Navbar -->
  <nav class="navbar navbar-expand-lg">
    <!-- Home em mobile -->
    <div class="container-fluid">
      <div class="navbar-brand d-block d-sm-none">
        <a href="/home"><img src="../assets/logo.svg" id="logo" alt="" /></a>
      </div>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- Home em desktop -->
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
          <li class="nav-item">
            <a
              class="nav-link d-none d-md-block"
              :class="{ active: route.path === '/' }"
              aria-current="page"
              href="/home"
              >Página inicial</a
            >
          </li>
          <!-- Aba de reviews -->
          <li class="nav-item">
            <a class="nav-link" :class="{ active: route.path === '/reviews' }" href="/reviews"
              >Avaliações</a
            >
          </li>
          <!-- Aba de avaliacao -->
          <li class="nav-item">
            <a type="button" class="nav-link" data-bs-toggle="modal" data-bs-target="#exampleModal">
              Avaliar
            </a>

            <!-- Modal -->
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
            >
              <div class="modal-dialog modal-dialog-centered" id="navbarModal">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">Nova avaliação</h5>
                    <button
                      type="button"
                      class="btn-close btn-close-white"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <div class="mb-3">
                      <label for="exampleInputName" class="form-label">Nome:</label>
                      <input type="text" class="form-control" id="name" v-model="name" required />
                    </div>

                    <div class="mb-3">
                      <label for="exampleInputName" class="form-label">Sobrenome:</label>
                      <input
                        type="text"
                        class="form-control"
                        id="lastName"
                        v-model="lastName"
                        required
                      />
                    </div>

                    <div class="mb-3">
                      <label for="exampleInputName" class="form-label">Email:</label>
                      <input
                        type="email"
                        class="form-control"
                        id="email"
                        v-model="email"
                        required
                      />
                    </div>

                    <div class="mb-3">
                      <label for="exampleInputName" class="form-label">Telefone:</label>
                      <input
                        type="tel"
                        class="form-control"
                        id="phone"
                        v-model="phone"
                        required
                        maxlength="15"
                        minlength="15"
                        @keyup="maskPhoneNo"
                      />
                    </div>

                    <div class="mb-3">
                      <label for="exampleInputStars" class="form-label">Estrelas:</label>
                      <br />
                      <fieldset class="rating">
                        <!-- Ao clicar na estrela ela marca e desmarca -->
                        <input
                          type="radio"
                          id="star5"
                          name="stars"
                          value="5"
                          v-model="stars"
                          @click="handleStarClick(5)"
                          required
                        /><label class="full" for="star5" title="5 estrelas"></label>
                        <input
                          type="radio"
                          id="star4"
                          name="stars"
                          value="4"
                          v-model="stars"
                          @click="handleStarClick(4)"
                          required
                        /><label class="full" for="star4" title="4 estrelas"></label>
                        <input
                          type="radio"
                          id="star3"
                          name="stars"
                          value="3"
                          v-model="stars"
                          @click="handleStarClick(3)"
                          required
                        /><label class="full" for="star3" title="3 estrelas"></label>
                        <input
                          type="radio"
                          id="star2"
                          name="stars"
                          value="2"
                          v-model="stars"
                          @click="handleStarClick(2)"
                          required
                        /><label class="full" for="star2" title="2 estrelas"></label>
                        <input
                          type="radio"
                          id="star1"
                          name="stars"
                          value="1"
                          v-model="stars"
                          @click="handleStarClick(1)"
                          required
                        /><label class="full" for="star1" title="1 estrela"></label>
                      </fieldset>
                      <br />
                    </div>

                    <div class="mb-3">
                      <label for="exampleInputReviewText" class="form-label">Texto:</label>
                      <textarea
                        class="form-control"
                        aria-label="With textarea"
                        v-model="reviewText"
                        id="reviewText"
                      ></textarea>
                    </div>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" @click="cleanForm">
                      Limpar
                    </button>
                    <button type="button" class="btn btn-primary" @click="submitForm">
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </li>

          <!-- Aba de about -->
          <li class="nav-item">
            <a class="nav-link" :class="{ active: route.path === '/about' }" href="/about">Sobre</a>
          </li>
        </ul>
        <!-- Formulario de pesquisa -->
        <form
          @submit.prevent="handleSearch"
          class="d-flex col-sm-12 col-lg-3"
          role="search"
          id="searchForm"
        >
          <input
            class="form-control me-2"
            type="search"
            placeholder="Pesquise uma avaliação"
            aria-label="Search"
            v-model="searchTerm"
          />
          <button class="btn" type="submit">Pesquisar</button>
        </form>
      </div>
    </div>
  </nav>
</template>

<script>
// imports
import { ref, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import FilterReviews from './FilterReviews.vue'
import axios from 'axios'

export default {
  // dados vazios
  data() {
    return {
      name: '',
      lastName: '',
      phone: '',
      email: '',
      stars: '',
      reviewText: '',
      lastClickedStar: null,
    }
  },
  methods: {
    async checkUserExistence() {
      // Funcao para validar se o email ou telefone já estao no banco de dados
      try {
        const response = await axios.post('http://localhost:3000/check-user', {
          email: this.email,
          phone: this.phone,
        })
        return response.data
      } catch (error) {
        if (error.response && error.response.data) {
          alert(error.response.data.message)
        } else {
          alert('Erro ao verificar os dados. Tente novamente mais tarde.')
        }
      }
    },
    async submitForm() {
      // Funcao para retirar espacos e caracteres especiais do telefone
      function removeSpacesAndSpecialChars(str) {
        return str.replace(/[^a-zA-Z0-9]/g, '')
      }
      // Verifica se os valores foram preenchidos
      if (this.name && this.lastName && this.stars && this.reviewText && this.phone && this.email) {
        // Valida se email e telefone ja estao no banco de dados
        const userCheck = await this.checkUserExistence()

        // Se nao existem faz o envio
        if (!userCheck) return

        try {
          const response = await axios.post('http://localhost:3000/submitForm', {
            name: this.name,
            lastName: this.lastName,
            phone: removeSpacesAndSpecialChars(this.phone),
            email: this.email,
            stars: this.stars,
            reviewText: this.reviewText,
          })
          alert(response.data)

          this.name = ''
          this.lastName = ''
          this.phone = ''
          this.email = ''
          this.stars = ''
          this.reviewText = ''
          window.location.reload()
        } catch (error) {
          alert('Erro ao enviar avaliação')
          console.error(error)
        }
      } else {
        alert('Por favor, preencha todos os campos')
      }
    },
    // Funcao para marcar e desmarcar uma estrela no click
    handleStarClick(starValue) {
      if (this.lastClickedStar === starValue) {
        this.stars = ''
        this.lastClickedStar = null
      } else {
        this.lastClickedStar = starValue
      }
    },
    // Funcao para limpar campos do formulario
    cleanForm() {
      this.name = ''
      this.lastName = ''
      this.phone = ''
      this.email = ''
      this.stars = ''
      this.reviewText = ''
    },
    // Mascara no input do telefone
    maskPhoneNo() {
      let el = document.getElementById('phone')
      let pnum = el.value.replace(/\D*/g, '')
      if (pnum.length >= 2) {
        pnum = '(' + pnum.slice(0, 2) + ') ' + pnum.slice(2)
      }
      if (pnum.length >= 10) {
        pnum = pnum.slice(0, 10) + '-' + pnum.slice(10)
      }
      el.value = pnum
    },
  },
  components: { FilterReviews },
  setup() {
    const searchTerm = ref('')
    const router = useRouter()
    const route = useRoute()

    // url de pesquisa
    const isReviewsPage = computed(() => {
      return route.path === '/reviews'
    })

    // rota de pesquisa
    const handleSearch = () => {
      if (searchTerm.value.trim()) {
        router.push(`/reviews/results?search_query=${encodeURIComponent(searchTerm.value)}`)
      }
    }

    return {
      searchTerm,
      handleSearch,
      isReviewsPage,
      route,
    }
  },
}
</script>

<style>
@import url(//netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css);

fieldset,
label {
  margin: 0;
  padding: 0;
}

#navbarModal {
  color: #fff;
}

.modal-footer {
  border: 0;
}

.modal-body input,
.modal-body textarea,
.modal-body input:focus,
.modal-body textarea:focus {
  background-color: rgb(36, 35, 35);
  border: 0;
  color: #fff;
}

input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-background-clip: text;
  -webkit-text-fill-color: #ffffff;
  transition: background-color 5000s ease-in-out 0s;
  box-shadow: inset 0 0 20px 20px rgb(36, 35, 35);
}

.modal-footer button {
  background-color: rgb(15, 15, 15);
  border: 0;
}

.modal-footer button:hover {
  background-color: #978c8e;
}

nav,
#searchForm input {
  background-color: #978c8e;
  border: 0;
}

.rating {
  border: none;
  float: left;
}

.rating > input {
  display: none;
}
.rating > label:before {
  margin: 5px;
  font-size: 1.25em;
  font-family: FontAwesome;
  display: inline-block;
  content: '\f005';
}

.rating > .half:before {
  content: '\f089';
  position: absolute;
}

.rating > label {
  color: rgb(36, 35, 35);
  float: right;
}

.rating > input:checked ~ label,
.rating:not(:checked) > label:hover,
.rating:not(:checked) > label:hover ~ label {
  color: #ffffff;
}

.rating > input:checked + label:hover,
.rating > input:checked ~ label:hover,
.rating > label:hover ~ input:checked ~ label,
.rating > input:checked ~ label:hover ~ label {
  color: #777777;
}

input:focus,
textarea:focus,
select:focus {
  outline: rgba(0, 0, 0, 0.527) 2px solid !important;
  box-shadow: none !important;
}

input[type='search']::-webkit-search-cancel-button {
  display: none;
}

input[type='search']::-moz-search-cancel-button {
  display: none;
}

input[type='search']::-ms-clear {
  display: none;
}

#logo {
  width: 3rem;
}
</style>
