<template>
  <footer>
    <div class="container">
      <div class="column">
        <ul>
          <li><a href="#">Sobre nós</a></li>
          <li><a href="#">Contato</a></li>
          <li><a href="#">Termos de uso</a></li>
          <li><a href="#">Política de privacidade</a></li>
        </ul>
      </div>
      <div class="column">
        <ul>
          <li><a href="#">Sobre nós</a></li>
          <li><a href="#">Contato</a></li>
          <li><a href="#">Termos de uso</a></li>
          <li><a href="#">Política de privacidade</a></li>
        </ul>
      </div>
      <div class="column">
        <ul>
          <li><a href="#">Sobre nós</a></li>
          <li><a href="#">Contato</a></li>
          <li><a href="#">Termos de uso</a></li>
          <li><a href="#">Política de privacidade</a></li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>

<style scoped>
footer {
  padding: 10px 0px;
  width: 100%;
  height: 200px;
  color: var(--color-text-light);
  background-color: var(--color-background-nav);
}

.column {
  width: 33.33%;
  height: 100%;
  float: left;
}
a {
  color: var(--color-text-light);
}
</style>