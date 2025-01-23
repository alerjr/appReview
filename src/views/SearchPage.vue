<template>
  <div class="min-vh-100" id="results">
    <!-- Titulo da pagina -->
    <h1 class="text-center mt-3">Resultados da Pesquisa</h1>

    <!-- Exibe o termo pesquisado -->
    <p class="text-center text-white">
      Você está buscando por: <strong>{{ searchQuery }}</strong>
    </p>

    <!-- Validacao de erro e carregamento -->
    <div v-if="loading">Carregando...</div>
    <div v-if="error" style="color: red">{{ error }}</div>

    <!-- Parametro para identificar se ha resultados e exibi-los -->
    <div v-if="results.length > 0">
      <div v-for="(result, index) in results" :key="index">
        <div class="card mt-4 col-8 container">
          <div class="card-body p-4">
            <div class="card-title">
              {{ result.review }},
              <span v-for="i in result.stars" :key="i" class="fa fa-star checked"></span>
            </div>
            <div class="col-sm mt-2" @click="showUserModal(result)" id="user_name">
              {{ result.first_name }} {{ result.last_name }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Parametro para ser exibidos quando nao ha resultados -->
    <div v-else-if="results.length === 0 && !loading" class="container text-center" id="noResult">
      <h4 class="text-white">Nenhum resultado encontrado :(</h4>
      <div class="container row-12 d-flex justify-content-center">
        <img class="col-6" src="../assets/Questions-amico.svg" alt="" />
      </div>
    </div>

    <!-- Modal para exibir os dados do usuario selecionado no card obtido pela pesquisa -->
    <transition name="fade" @before-enter="beforeEnter" @enter="enter" @leave="leave">
      <div
        v-if="selectedUser"
        class="modal fade show"
        id="userModal"
        tabindex="-1"
        aria-labelledby="userModalLabel"
        data-bs-backdrop="true"
        style="display: block"
        @click.self="closeModal"
      >
        <div class="modal-dialog modal-dialog-centered fade show">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="userModalLabel">Dados do usuário</h1>
              <button
                type="button"
                class="btn-close"
                @click="closeModal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">
              <div class="card" id="cardReview">
                <div class="card-body">
                  <h5 class="card-title">
                    {{ selectedUser.first_name }} {{ selectedUser.last_name }}
                  </h5>
                  <hr />
                  <p class="card-text">Telefone: {{ formatPhoneNumber(selectedUser.phone) }}</p>
                  <p class="card-text">Email: {{ selectedUser.email }}</p>
                  <div class="row justify-content d-flex justify-content-center">
                    <a :href="'tel:+55' + selectedUser.phone" class="btn btn-primary col-2 m-2"
                      >Ligar</a
                    >
                    <a :href="'mailto:' + selectedUser.email" class="btn btn-primary col-4 m-2"
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
    </transition>
  </div>
</template>

<script>
// imports
import { ref, onMounted, watch } from 'vue'
import { useRoute } from 'vue-router'
import { searchData } from '@/services/api'

export default {
  setup() {
    const route = useRoute() // Captura os parâmetros da URL
    const searchQuery = ref(route.query.search_query) // Captura o parâmetro search_query
    const results = ref([]) // Variavel de resultados
    const loading = ref(false) // Variavel de carregamento
    const error = ref(null) // Variavel de erro
    const selectedUser = ref(null) // Parametro do usuario selecionado

    // animacoes
    const beforeEnter = (el) => {
      el.style.opacity = 0
    }

    const enter = (el, done) => {
      // fade in
      el.offsetHeight
      el.style.transition = 'opacity 0.5s ease'
      el.style.opacity = 1
      done()
    }

    const leave = (el, done) => {
      // fade out
      el.style.transition = 'opacity 0.5s ease'
      el.style.opacity = 0
      done()
    }

    // Funcao para buscar os dados na API
    const searchReviews = async () => {
      if (!searchQuery.value.trim()) return

      loading.value = true
      error.value = null

      try {
        const data = await searchData(searchQuery.value) // Chama a API para buscar os dados
        results.value = data // Armazena os resultados
      } catch (err) {
        error.value = 'Erro ao realizar a busca'
        console.error(err)
      } finally {
        loading.value = false
      }
    }

    // Chama a função de busca quando o componente é montado ou quando o parâmetro search_query mudar
    onMounted(() => {
      searchReviews()
    })

    // Usando o watch para observar mudanças no search_query
    watch(
      () => route.query.search_query,
      (newSearchQuery) => {
        searchQuery.value = newSearchQuery // Atualiza o searchQuery com o novo valor
        searchReviews() // Rechama a busca
      }
    )

    // Funcao para definir como valor do usuario selecionado o resultado clicado
    const showUserModal = (result) => {
      selectedUser.value = result
    }

    // Funcao para fechar a modal
    const closeModal = () => {
      selectedUser.value = null
    }

    // Formatacao do telefone
    const formatPhoneNumber = (phoneNumber) => {
      const cleaned = phoneNumber.replace(/\D/g, '')
      if (cleaned.length === 11) {
        return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 3)} ${cleaned.slice(
          3,
          7
        )}-${cleaned.slice(7, 11)}`
      } else {
        return phoneNumber
      }
    }

    return {
      searchQuery,
      results,
      loading,
      error,
      selectedUser,
      showUserModal,
      closeModal,
      beforeEnter,
      enter,
      leave,
      formatPhoneNumber,
    }
  },
}
</script>

<style scoped>
#user_name:hover {
  cursor: pointer;
}

body {
  padding-right: 0 !important;
}

.card {
  background-color: #070200;
  color: #fff;
}

#cardReview .card-body {
  background-color: #3f3639;
}

h1 {
  color: #fff;
}

#noResult {
  margin-top: 10vh;
}

@media (max-width: 768px) {
  #noResult {
    align-items: center;
    margin-top: 25vh;
  }

  #noResult img {
    width: 200px;
  }
}

@media (min-width: 769px) {
  #results {
    margin-top: 15vh;
  }

  #noResult {
    margin-top: 10vh;
  }
}

@media (min-width: 992px) {
  #results {
    margin-top: 5vh;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
