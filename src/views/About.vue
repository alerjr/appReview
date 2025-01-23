<template>
  <!-- Card de about -->
  <div
    class="container d-flex justify-content-center align-items-center col-lg-6 col-10 mt-4 mb-4 min-vh-100"
  >
    <div class="list-group">
      <div class="list-group-item list-group-item-action" aria-current="true">
        <div class="d-flex w-100 justify-content-between mt-2">
          <h5 class="mb-2"><b>Descrição</b></h5>
        </div>
        <p class="mb-1">
          Esse projeto é uma aplicação web construída a partir do Vue onde são apresentados dados
          enviados ao banco de dados MySQL referente à avaliações.
        </p>
      </div>
      <div class="list-group-item list-group-item-action" aria-current="true">
        <div class="d-flex w-100 justify-content-between mt-2">
          <h5 class="mb-2"><b>Objetivo</b></h5>
        </div>
        <p class="mb-2">
          O objetivo deste projeto é exibir prontamente não apenas as avaliações enviadas, mas
          também dados básicos obtidos através de cadastro, como nome completo, telefone e e-mail
          para contato.
        </p>
      </div>
      <div class="list-group-item list-group-item-action" aria-current="true">
        <div class="d-flex w-100 justify-content-between mt-2">
          <h5 class="mb-1"><b>Tecnologias/frameworks utilizadas(os):</b></h5>
        </div>
        <small>
          <ol class="list-group list-group-numbered">
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">HTML/CSS</div>
                Front-end
              </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">Vue.JS</div>
                Front-end
              </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">Javascript</div>
                Back-end
              </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">Bootstrap</div>
                Front-end
              </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">MySQL</div>
                Back-end/banco de dados
              </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">Express</div>
                Back-end
              </div>
            </li>
            <li class="list-group-item d-flex justify-content-between align-items-start">
              <div class="ms-2 me-auto">
                <div class="fw-bold">date-fns</div>
                Front-end
              </div>
            </li>
          </ol>
        </small>

        <div class="d-flex justify-content-around mt-2" id="botoesCard">
          <a href="/home" class="btn col-6">Página inicial</a>
          <a href="https://github.com/alerjr" target="_blank" class="btn col-6"
            ><img src="../assets/github.svg" class="col-1" /> Github</a
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
</script>

<style scoped>
.list-group {
  cursor: default;
}

.list-group-item {
  background-color: rgb(28, 28, 28);
  border: 0;
  color: white;
}

#botoesCard a,
span {
  color: #ffffffb1;
  border: 0;
}

#botoesCard a:hover,
span:hover {
  color: #fff;
}
</style>