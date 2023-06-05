<template>
  <footer>
    <div class="container">
      <div class="column">
        <div class="info">
          <h3>Paideia Educacional</h3>
          <p class="mb-2">Assessoria e Consultoria em Projetos Educacionais e Empresariais</p>

          <p><b>Horário de Funcionamento:</b> Comercial</p>
          <p><b>Responsável pela empresa:</b> Rosangela Santos e William Borralho</p>

          <p><b>Contato:</b></p>
          <p>(91) 9 8360 4463 | William Borralho</p>
          <p>(91) 9 8208 4651 | Rosângela Santos</p>
          <p>(91) 9 8176 9979 | Whatsapp</p>
          <p><b>E-mail:</b> contato@paideiaeducacional.com</p>
        </div>
      </div>
      <div class="column">
        <h5>Links úteis</h5>
        <ul>
          <li><a href="#">Home</a></li>
          <li><a href="#">Sobre nós</a></li>
          <li><a href="#">Cursos</a></li>
          <li><a href="#">Serviços</a></li>
          <li><a href="#">Política de privacidade</a></li>
        </ul>
      </div>
      <div class="column">
        <h5>Sobre o Validar</h5>
        <ul>
          <li><a href="#">Como funciona?</a></li>
          <li><a href="#">Quem poderá utilizar?</a></li>
          <li><a href="#">Termos de uso</a></li>
          <li><a href="#">Perguntas e respostas</a></li>
        </ul>
      </div>
      <div class="column">
        <h5>Dúvidas?</h5>
        <ul>
          <li><a href="#">Entre em contato:</a></li>
          <form action="">
            <div class="row">
              <div class="col-md-12 text-center">
                <input
                  class="form-control mb-2"
                  type="text"
                  placeholder="E-mail"
                />
                <input
                  class="form-control mb-2"
                  type="text"
                  placeholder="Assunto"
                />
                <button class="btn btn-sm btn-success">Enviar</button>
              </div>
            </div>
          </form>
        </ul>
      </div>
    </div>
    <div class="container-fluid text-center pt-5">
      <p class="text-white-50">© Copyright Paideia Educacional. Todos os direitos reservados.</p>
      <p class="text-white-50">Desenvolvido por <a href="#" target="_blank">CDNS Systems Ltda</a></p>
    </div>
  </footer>
</template>

<script>
export default {
  name: "TheFooter",
};
</script>

<style scoped>
.info {
  border-top: 4px solid var(--color-background-hover-nav);
  margin: 0px 10px;
  text-align: center;
}
.info p {
  font-size: 0.9rem;
}

.info h3 {
  font-weight: bold;
  font-size: 1.6rem;
  margin: 14px 0;
}

footer {
  padding: 40px 0px;
  width: 100%;
  color: var(--color-text-light);
  background-color: var(--color-background-nav);
  display: grid;
}
h5 {
  font-weight: 600;
  letter-spacing: -1px;
  font-size: 1.2rem;
}
li {
  list-style: none;
  line-height: 32px;
}

li::before {
  border-left: 2px solid var(--color-background-hover-nav);
  border-top: 2px solid var(--color-background-hover-nav);
  width: 6px;
  height: 6px;
  content: "";
  transform: rotate(135deg);
  margin-top: 12.4px;
  margin-right: 1.2%;
  float: left;
}
.column {
  width: 25%;
  height: 100%;
  float: left;
}

a {
  color: var(--color-text-light);
}

a:hover {
  color: var(--color-background-hover-nav);
  transition: 0.3s ease;
}
</style>