<template>
<!-- Componente de filtro -->
  <div class="btn-group d-md-block d-flex mt-2">
    <button
      type="button"
      class="btn btn-secondary btn-sm dropdown-toggle"
      data-bs-toggle="dropdown"
      aria-expanded="false"
      id="filterButton"
    >
      Ordenar por
    </button>
    <!-- Tipos de filtro -->
    <ul class="dropdown-menu dropdown-menu-start custom-dropdown-width">
      <li>
        <button class="dropdown-item" type="button" @click="applyFilter('newest')">
          Mais recente
        </button>
      </li>
      <li>
        <button class="dropdown-item" type="button" @click="applyFilter('oldest')">
          Mais antigo
        </button>
      </li>
      <li><button class="dropdown-item" type="button" @click="applyFilter('az')">A-Z</button></li>
      <li>
        <button class="dropdown-item" type="button" @click="applyFilter('stars_asc')">
          Estrelas (crescente)
        </button>
      </li>
      <li>
        <button class="dropdown-item" type="button" @click="applyFilter('stars_desc')">
          Estrelas (decrescente)
        </button>
      </li>
    </ul>
  </div>
</template>

<script>
// definicao do tipo de filtro
export default {
  methods: {
    applyFilter(filterType) {
      this.$emit('filter-changed', filterType)
    },
  },
}
</script>

<style scoped>
.dropdown-menu li {
  font-size: 12px;
  cursor: pointer;
}

#filterButton {
  background-color: #4e4347b1;
  color: black;
  width: 12rem;
  border: 0;
}

@media (max-width: 767px) {
  .custom-dropdown-width {
    width: 100%;
  }
}

@media (min-width: 768px) {
  .custom-dropdown-width {
    width: 12rem;
  }
}

ul {
  background-color: #4e4347;
  border: 0;
}

ul .dropdown-item {
  color: #fff !important;
}

ul .dropdown-item:hover {
  background-color: rgba(0, 0, 0, 0.55);
}
</style>
