<template>
  <section class="container-fluid my-4">
    <h4 class="my-4">Editando <strong>Aluno</strong></h4>

    <div v-if="student">

      <img
          src="@/assets/loading.gif"
          :alt="`Imagem do aluno: ${student.name}`"
          id="student-photo"
        />

      <form @submit.prevent="handlerSubmit" @reset="reset" ref="formStudent">
     
        <input type="file" name="image" />

        <div class="row">
          <div class="form-group col-md-4">
            <label for="name">Nome</label>
            <input
              type="text"
              class="form-control"
              name="name"
              v-model="student.name"
            />
          </div>
          <div class="form-group col-md-2">
            <label for="gender">Gênero</label>
            <select name="gender" v-model="student.gender" class="form-control">
              <option disabled value="">-- Selecione --</option>
              <option value="F">F</option>
              <option value="M">M</option>
            </select>
          </div>
          <div class="form-group col-md-6">
            <label for="email">E-mail</label>
            <input
              type="email"
              name="email"
              class="form-control"
              id="email"
              v-model="student.email"
            />
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-6">
            <label for="phone">Telefone</label>

            <TheMask
              type="text"
              name="phone"
              class="form-control"
              :mask="['(##)#####-#####']"
              v-model="student.phone"
              :masked="true"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="cpf">Cpf</label>
            <TheMask
              type="text"
              name="cpf"
              class="form-control"
              :mask="['###.###.###-##']"
              v-model="student.cpf"
            />
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-6">
            <label for="rg">RG</label>
            <input
              type="text"
              class="form-control"
              id="rg"
              v-model="student.rg"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="expedient_body">Orgão expedidor</label>
            <input
              type="text"
              name="expedient_body"
              class="form-control"
              id="expedient_body"
              v-model="student.expedient_body"
            />
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-6">
            <label for="nationality">Nacionalidade</label>
            <input
              type="text"
              name="nationality"
              class="form-control"
              v-model="student.nationality"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="naturalness">Naturalidade</label>
            <input
              type="text"
              name="naturalness"
              class="form-control"
              id="naturalness"
              v-model="student.naturalness"
            />
          </div>
        </div>

        <div class="row">
          <div class="form-group col-md-6">
            <label for="birth_date">Data de nascimento</label>
            <input
              type="date"
              name="birth_date"
              class="form-control"
              v-model="student.birth_date"
            />
          </div>
          <div class="form-group col-md-6">
            <label for="name_mother">Nome da mãe</label>
            <input
              type="text"
              name="name_mother"
              class="form-control"
              v-model="student.name_mother"
            />
          </div>
        </div>

        <div class="form-group text-center my-2">
          <button type="submit" class="btn btn-success btn-sm mx-2">
            SALVAR
          </button>
          <button type="reset" class="btn btn-secondary btn-sm">LIMPAR</button>
        </div>
      </form>

      <!-- //? Novo processo de matricular -->

      <div class="row">
        <div class="col-md-12">
          <ul class="nav nav-tabs" id="studentTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button
                class="nav-link active"
                id="registration-tab"
                data-bs-toggle="tab"
                data-bs-target="#registration-tab-pane"
                type="button"
                role="tab"
                aria-controls="registration-tab-pane"
                aria-selected="true"
              >
                👨‍🎓MATRÍCULA(S)
              </button>
            </li>
            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="financial-tab"
                data-bs-toggle="tab"
                data-bs-target="#financial-tab-pane"
                type="button"
                role="tab"
                aria-controls="financial-tab-pane"
                aria-selected="false"
              >
                💰FINANCEIRO
              </button>
            </li>

            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="documents-tab"
                data-bs-toggle="tab"
                data-bs-target="#documents-tab-pane"
                type="button"
                role="tab"
                aria-controls="documents-tab-pane"
                aria-selected="false"
              >
                🖇️DOCUMENTO(S)
              </button>
            </li>

            <li class="nav-item" role="presentation">
              <button
                class="nav-link"
                id="documents-tab"
                data-bs-toggle="tab"
                data-bs-target="#books-tab-pane"
                type="button"
                role="tab"
                aria-controls="books-tab-pane"
                aria-selected="false"
              >
                📓LIVRO(S)
              </button>
            </li>
          </ul>
          <div class="tab-content" id="studentTabContent">
            <div
              class="tab-pane fade show active"
              id="registration-tab-pane"
              role="tabpanel"
              aria-labelledby="registration-tab"
              tabindex="0"
            >
              <div class="row my-2">
                <div class="col-md-6">
                  <!-- //? Matricular -->
                  <form @submit.prevent="handlerRegistration">
                    <div class="mb-3">
                      <label for="team" class="form-label">Turma</label>
                      <select
                        name="team"
                        v-model="teamRegistration"
                        class="form-control form-control-sm"
                      >
                        <option value="" selected disabled>
                          -- Selecione --
                        </option>
                        <option
                          v-for="(team, key) in teams"
                          :key="key"
                          :value="team.id"
                        >
                          {{ team.name | uppercase }}
                        </option>
                      </select>
                    </div>
                    <button
                      type="submit"
                      class="btn btn-success btn-sm text-uppercase"
                    >
                      Matricular
                    </button>
                  </form>
                </div>

                <div v-if="!!hasRegistration.length" class="col-md-6">
                  <small>Turmas em que o aluno está matriculado:</small>
                  <ul class="list-group">
                    <li
                      v-for="(registration, key) in student.registrations"
                      :key="key"
                      class="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <router-link
                        :to="{
                          name: 'team-edit',
                          params: { id: registration.team.id },
                        }"
                        class="btn btn-sm btn-outline-success"
                        :title="`${registration.user.name} - ${registration.created_at}`"
                      >
                        {{ String(registration.id).padStart(6, "0") }} |
                        {{ registration.team.name | uppercase }}
                      </router-link>

                      <ButtonDelete
                        @delete="
                          handlerDelete(registration.id, 'registrations')
                        "
                      />
                    </li>
                  </ul>
                </div>

                <div class="col-md-6" v-else>
                  <div class="alert alert-warning" role="alert">
                    Não há matrícula registrada para este aluno.
                  </div>
                </div>
              </div>
            </div>

            <div
              class="tab-pane fade"
              id="financial-tab-pane"
              role="tabpanel"
              aria-labelledby="financial-tab"
              tabindex="0"
            >
              <!-- //? Financeiro -->
              <br />

              <div class="accordion" id="accordionFinancial">
                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingTableFinancial">
                    <button
                      class="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTableFinancial"
                      aria-expanded="true"
                      aria-controls="collapseTableFinancial"
                    >
                      Pendências Financeira
                    </button>
                  </h2>
                  <div
                    id="collapseTableFinancial"
                    class="accordion-collapse collapse"
                    aria-labelledby="headingTableFinancial"
                    data-bs-parent="#accordionFinancial"
                  >
                    <div class="accordion-body">
                      <div class="row my-2 p-2">
                        <small class="p-0"
                          >Situação financeira do aluno:
                          <a
                            href="#"
                            class="text-primary"
                            @click.prevent="generateStatement"
                            ><u>🧾 EXTRATO FINANCEIRO</u></a
                          ></small
                        >

                        <table class="table table-bordered table-hover">
                          <thead>
                            <tr>
                              <th scope="col">#</th>
                              <th scope="col">Matrícula</th>
                              <th scope="col">Turma</th>
                              <th scope="col">Serviço</th>
                              <th scope="col">Parcela</th>
                              <th scope="col">Valor</th>
                              <th scope="col">Vencimento</th>
                              <th scope="col">Data do Pagamento</th>
                              <th scope="col">Quitado</th>
                              <th scope="col">Forma de Pagamento</th>
                              <th scope="col">Obs.</th>
                              <th scope="col">Criado</th>
                              <th scope="col">Usuário</th>
                              <th scope="col"></th>
                            </tr>
                          </thead>
                          <tbody>
                            <template v-if="!!hasRegistration.length">
                              <template
                                v-for="registration in student.registrations"
                              >
                                <tr
                                  v-for="financial in registration.financials"
                                  :key="financial.id"
                                >
                                  <td
                                    :class="
                                      styleToHighlightPaymentStatus(financial)
                                    "
                                  >
                                    {{ financial.id }}
                                  </td>
                                  <td
                                    :class="
                                      styleToHighlightPaymentStatus(financial)
                                    "
                                  >
                                    {{
                                      String(
                                        financial.registration_id
                                      ).padStart(6, "0")
                                    }}
                                  </td>
                                  <td
                                    :class="
                                      styleToHighlightPaymentStatus(financial)
                                    "
                                  >
                                    <span
                                      class="badge rounded-pill bg-secondary"
                                      >{{ registration.team.name }}</span
                                    >
                                  </td>
                                  <td
                                    :class="
                                      styleToHighlightPaymentStatus(financial)
                                    "
                                  >
                                    {{ financial.service_type.name }}
                                  </td>
                                  <td
                                    :class="
                                      styleToHighlightPaymentStatus(financial)
                                    "
                                  >
                                    {{ financial.quota }}
                                  </td>
                                  <td
                                    :class="
                                      styleToHighlightPaymentStatus(financial)
                                    "
                                  >
                                    {{ financial.value | currency }}
                                  </td>
                                  <td
                                    :class="
                                      styleToHighlightPaymentStatus(financial)
                                    "
                                  >
                                    {{ financial.due_date }}
                                  </td>
                                  <td
                                    :class="
                                      styleToHighlightPaymentStatus(financial)
                                    "
                                  >
                                    {{ financial.pay_day }}
                                  </td>
                                  <td
                                    :class="
                                      styleToHighlightPaymentStatus(financial)
                                    "
                                  >
                                    {{ financial.paid ? "SIM" : "NÃO" }}
                                  </td>
                                  <td
                                    :class="
                                      styleToHighlightPaymentStatus(financial)
                                    "
                                  >
                                    {{ financial.payment_type.name }}
                                  </td>
                                  <td
                                    :class="
                                      styleToHighlightPaymentStatus(financial)
                                    "
                                  >
                                    {{ financial.observations }}
                                  </td>
                                  <td
                                    :class="
                                      styleToHighlightPaymentStatus(financial)
                                    "
                                  >
                                    {{ financial.created_at }}
                                  </td>
                                  <td
                                    :class="
                                      styleToHighlightPaymentStatus(financial)
                                    "
                                  >
                                    {{ financial.user.name }}
                                  </td>
                                  <td
                                    :class="
                                      styleToHighlightPaymentStatus(financial)
                                    "
                                    style="width: 100px"
                                  >
                                    <button
                                      class="btn btn-outline-secondary btn-sm"
                                      @click="showModalFinancial(financial.id)"
                                    >
                                      <font-awesome-icon icon="edit" />
                                    </button>
                                    <ButtonDelete
                                      @delete="
                                        handlerDelete(
                                          financial.id,
                                          'financials'
                                        )
                                      "
                                    />
                                  </td>
                                </tr>
                              </template>
                            </template>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="accordion-item">
                  <h2 class="accordion-header" id="headingAddFinancial">
                    <button
                      class="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseAddFinancial"
                      aria-expanded="false"
                      aria-controls="collapseAddFinancial"
                    >
                      Adicionar Financeiro
                    </button>
                  </h2>
                  <div
                    id="collapseAddFinancial"
                    class="accordion-collapse collapse show"
                    aria-labelledby="headingAddFinancial"
                    data-bs-parent="#accordionFinancial"
                  >
                    <div class="accordion-body">
                      <div class="row my-2">
                        <div class="col-md-12">
                          <form
                            ref="formFinancial"
                            @submit.prevent="handlerFinancial"
                            class="row"
                            @reset="reset"
                          >
                            <div class="mb-3 col-md-2">
                              <label for="registration" class="form-label"
                                >Nº de matrícula</label
                              >
                              <select
                                v-if="!!hasRegistration.length"
                                name="registration_id"
                                class="form-control form-control-sm"
                              >
                                <option value="" selected disabled>
                                  -- Selecione --
                                </option>
                                <option
                                  v-for="(
                                    registration, key
                                  ) in student.registrations"
                                  :key="key"
                                  :value="registration.id"
                                >
                                  {{
                                    String(registration.id).padStart(6, "0")
                                  }}
                                  - {{ registration.team.name | uppercase }}
                                </option>
                              </select>
                            </div>

                            <div class="mb-3 col-md-1">
                              <label for="value" class="form-label"
                                >Parcela</label
                              >
                              <input
                                @keyup="filterNonNumeric"
                                type="number"
                                class="form-control form-control-sm"
                                name="quota"
                              />
                            </div>

                            <div class="mb-3 col-md-1">
                              <label for="value" class="form-label"
                                >Valor</label
                              >
                              <input
                                type="text"
                                class="form-control form-control-sm"
                                name="value"
                                placeholder="0,00"
                                data-thousands="."
                                data-decimal=","
                              />
                            </div>

                            <div class="mb-3 col-md-2">
                              <label for="due_date" class="form-label"
                                >Vencimento</label
                              >
                              <input
                                type="date"
                                class="form-control form-control-sm"
                                name="due_date"
                              />
                            </div>

                            <div class="mb-3 col-md-1">
                              <label for="paid" class="form-label"
                                >Quitado</label
                              >
                              <select
                                name="paid"
                                class="form-control form-control-sm"
                              >
                                <option value="" selected disabled>--</option>
                                <option value="0">NÃO</option>
                                <option value="1">SIM</option>
                              </select>
                            </div>

                            <div class="mb-3 col-md-2">
                              <label for="service_type_id" class="form-label"
                                >Tipo de Serviço</label
                              >
                              <select
                                name="service_type_id"
                                class="form-control form-control-sm"
                              >
                                <option value="" selected disabled>
                                  -- Selecione --
                                </option>
                                <option
                                  v-for="(service, key) in serviceTypes"
                                  :key="key"
                                  :value="service.id"
                                >
                                  {{ service.name | uppercase }}
                                </option>
                              </select>
                            </div>
                            <div class="mb-3 col-md-2">
                              <label for="payment_type" class="form-label"
                                >Forma de Pagamento</label
                              >
                              <select
                                name="payment_type"
                                class="form-control form-control-sm"
                              >
                                <option value="" selected disabled>
                                  -- Selecione --
                                </option>
                                <option
                                  v-for="(payment, key) in paymentTypes"
                                  :key="key"
                                  :value="payment.id"
                                >
                                  {{ payment.name | uppercase }}
                                </option>
                              </select>
                            </div>

                            <div class="mb-3 col-md-1">
                              <label for="observations" class="form-label"
                                >Observação</label
                              >
                              <input
                                type="text"
                                class="form-control form-control-sm"
                                name="observations"
                              />
                            </div>

                            <div
                              class="col-md-12 d-flex justify-content-between"
                            >
                              <div class="d-flex">
                                <button
                                  type="submit"
                                  title="Informe no campo à direita a quantidade de repetições desta ação."
                                  class="btn btn-success btn-sm text-uppercase"
                                >
                                  Criar <font-awesome-icon icon="question" />
                                </button>
                                <input
                                  @keyup="filterNonNumeric"
                                  type="text"
                                  name="numberOfTimesToEnter"
                                  v-model="numberOfTimesToEnter"
                                  class="form-control form-control-sm ms-2 w-25"
                                />
                              </div>
                              <button
                                type="reset"
                                class="btn btn-secondary btn-sm text-uppercase"
                              >
                                Limpar
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div
              class="tab-pane fade"
              id="documents-tab-pane"
              role="tabpanel"
              aria-labelledby="documents-tab"
              tabindex="0"
            >
              <div class="row my-2">
                <div class="col-md-3">
                  <div class="d-grid gap-2 col-12 mx-auto">
                    <router-link
                      :to="{
                        name: 'history-register',
                        params: { student: student.id },
                      }"
                      class="btn btn-success btn-sm"
                      type="button"
                      >GERAR HISTÓRICO</router-link
                    >
                    <router-link
                      :to="{
                        name: 'certificate-register',
                        params: { student: student.id },
                      }"
                      class="btn btn-info btn-sm"
                      type="button"
                      >GERAR CERTIFICADO</router-link
                    >
                  </div>
                </div>
                <div class="col-md-9">
                  <!-- //? Documentos -->
                  <small class="p-0"
                    >Documentos emitidos para o aluno até o momento:</small
                  >
                  <ul class="list-group" v-if="!!hasDocuments.length">
                    <li
                      v-for="(document, key) in student.documents"
                      :key="key"
                      class="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <button
                        @click.prevent="getBlob(document)"
                        class="btn btn-sm btn-outline-danger"
                        :title="`${document.file_name} - ${document.created_at}`"
                      >
                        {{ document.file_name }} - {{ document.created_at }}
                      </button>
                      <!--//! @TODO tem que remover, é apenas provisório -->
                      <div>
                        <small class="p-0">ID DO ALUNO:</small>
                        <input
                          title="Aqui, você pode alterar o ID do aluno, que aparece na URL do navegador na parte superior da tela."
                          :data-document-id="document.id"
                          style="width: 86px; background: #fafec2"
                          @change="changeStudentOfDocument"
                          type="text"
                          :value="student.id"
                          class="form-control form-control-sm"
                        />
                      </div>

                      <!--//! @TODO ate aqui -->

                      <a
                        href="#"
                        class="btn btn-sm btn-outline-secondary"
                        @click.prevent="destroyPDF(document)"
                      >
                        <font-awesome-icon icon="trash"
                      /></a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div
              class="tab-pane fade"
              id="books-tab-pane"
              role="tabpanel"
              aria-labelledby="books-tab"
              tabindex="0"
            >
              <div class="row my-2">
                <div class="col-md-4">
                  <form ref="formBook" @submit.prevent="handlerCreateBook">
                    <div class="mb-3">
                      <label for="team" class="form-label">Turma</label>
                      <select
                        name="team_id"
                        class="form-control form-control-sm"
                      >
                        <option value="" selected disabled>
                          -- Selecione --
                        </option>
                        <option
                          v-for="(team, key) in teams"
                          :key="key"
                          :value="team.id"
                        >
                          {{ team.name | uppercase }}
                        </option>
                      </select>
                    </div>
                    <div class="row mb-3">
                      <div class="col-md-6 mb-3">
                        <input
                          placeholder="N.º de Registro"
                          type="text"
                          class="form-control form-control-sm"
                          name="registration_number"
                        />
                      </div>
                      <div class="col-md-6 mb-3">
                        <input
                          placeholder="N.º do Livro"
                          type="text"
                          class="form-control form-control-sm"
                          name="book_number"
                        />
                      </div>
                      <div class="col-md-6 mb-3">
                        <input
                          placeholder="N.º da Folha"
                          type="text"
                          class="form-control form-control-sm"
                          name="page_number"
                        />
                      </div>
                      <div class="col-md-6 mb-3">
                        <input
                          placeholder="Data de Emissão"
                          type="text"
                          class="form-control form-control-sm"
                          name="issue_date"
                        />
                      </div>
                      <div class="col-md-6 mb-3">
                        <input
                          placeholder="N.º do Selo do Certificado"
                          type="text"
                          class="form-control form-control-sm"
                          name="certificate_seal_number"
                        />
                      </div>
                      <div class="col-md-6 mb-3">
                        <input
                          placeholder="N.º do Selo do Histórico"
                          type="text"
                          class="form-control form-control-sm"
                          name="history_seal_number"
                        />
                      </div>
                    </div>
                    <button
                      type="submit"
                      class="btn btn-success btn-sm text-uppercase"
                    >
                      Salvar
                    </button>
                  </form>
                </div>

                <div class="col-md-8">
                  <!-- //? Livros -->
                  <small class="p-0"
                    >Livros emitidos para o aluno até o momento:</small
                  >
                  <ul class="list-group" v-if="!!hasBooks.length">
                    <li
                      v-for="(book, key) in student.books"
                      :key="key"
                      class="list-group-item d-flex justify-content-between align-items-center"
                    >
                      <button
                        class="btn btn-sm btn-outline-dark"
                        :title="`${key} - ${book.created_at}`"
                      >
                        N.º de Registro: {{ book.registration_number }} / N.º do
                        Livro: {{ book.book_number }} / N.º da Folha:
                        {{ book.page_number }} / Data de Emissão:
                        {{ book.issue_date }} / N.º do Selo do Certificado:
                        {{ book.certificate_seal_number }} / N.º do Selo do
                        Histórico: {{ book.history_seal_number }} /
                      </button>

                      <ButtonDelete @delete="handlerDelete(book.id, 'books')" />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <button
        class="btn btn-sm btn-secondary text-uppercase"
        @click="$router.go(-1)"
      >
        Voltar
      </button>
    </div>

    <LoadingPage v-else />

    <!-- MODAL FINANCIAL -->
    <!--//! @TODO criar um componente para os campos do financeiro - nao precisa engloba os VERBOS (POST, PUT) -->
    <div
      class="modal fade"
      id="modalFinancial"
      tabindex="-1"
      aria-hidden="true"
    >
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Financeiro</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <form
              ref="formFinancialUpdate"
              @submit.prevent="handlerFinancialUpdate"
            >
              <div class="row mb-3 form-update">
                <label for="registration_id" class="col-sm-6 col-form-label"
                  >Matrícula</label
                >
                <div class="col-sm-6">
                  <input
                    disabled
                    type="text"
                    class="form-control form-control-sm"
                    name="registration_id"
                  />
                </div>
                <!-- -- --  -->
                <label for="value" class="col-sm-6 col-form-label">Valor</label>
                <div class="col-sm-6">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    name="value"
                    data-thousands="."
                    placeholder="0,00"
                    data-decimal=","
                  />
                </div>
                <!-- -- --  -->
                <label for="quota" class="col-sm-6 col-form-label"
                  >Parcela</label
                >
                <div class="col-sm-6">
                  <input
                    type="number"
                    @keyup="filterNonNumeric"
                    class="form-control form-control-sm"
                    name="quota"
                  />
                </div>
                <!-- -- -- -->
                <label for="due_date" class="col-sm-6 col-form-label"
                  >Vencimento</label
                >
                <div class="col-sm-6">
                  <input
                    type="date"
                    class="form-control form-control-sm"
                    name="due_date"
                  />
                </div>

                <!-- -- -- -->
                <label for="paid" class="col-sm-6 col-form-label"
                  >Quitado</label
                >
                <div class="col-sm-6">
                  <select
                    name="paid"
                    class="form-control form-control-sm"
                    v-model="paidValue"
                  >
                    <option value="" selected disabled>--</option>
                    <option value="0">NÃO</option>
                    <option value="1">SIM</option>
                  </select>
                </div>

                <!-- -- --  -->
                <label for="service_type_id" class="col-sm-6 col-form-label"
                  >Tipo de Serviço</label
                >
                <div class="col-sm-6">
                  <select
                    name="service_type_id"
                    class="form-control form-control-sm"
                  >
                    <option value="" selected disabled>-- Selecione --</option>
                    <option
                      v-for="(service, key) in serviceTypes"
                      :key="key"
                      :value="service.id"
                    >
                      {{ service.name | uppercase }}
                    </option>
                  </select>
                </div>

                <!-- -- --  -->
                <label for="payment_type" class="col-sm-6 col-form-label"
                  >Forma de Pagamento</label
                >
                <div class="col-sm-6">
                  <select
                    name="payment_type"
                    class="form-control form-control-sm"
                  >
                    <option value="" selected disabled>-- Selecione --</option>
                    <option
                      v-for="(payment, key) in paymentTypes"
                      :key="key"
                      :value="payment.id"
                    >
                      {{ payment.name | uppercase }}
                    </option>
                  </select>
                </div>

                <!-- -- --  -->
                <label for="pay_day" class="col-sm-6 col-form-label"
                  >Dia do Pagamento</label
                >
                <div class="col-sm-6">
                  <input
                    type="date"
                    class="form-control form-control-sm"
                    name="pay_day"
                  />
                </div>

                <!-- -- --  -->
                <label for="observations" class="col-sm-12 col-form-label"
                  >Observação</label
                >
                <div class="col-sm-12">
                  <input
                    type="text"
                    class="form-control form-control-sm"
                    name="observations"
                  />
                </div>
              </div>

              <div class="row">
                <div class="col-md-6">
                  <button type="submit" class="btn btn-success btn-sm">
                    ATUALIZAR
                  </button>
                </div>
                <div class="col-md-6 text-end">
                  <a
                    v-if="showReceipt"
                    type="button"
                    @click="generateReceipt"
                    class="link-secondary"
                    ><u>🧾 Emitir Recibo</u></a
                  >
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-secondary btn-sm"
              data-bs-dismiss="modal"
            >
              FECHAR
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import api from "@/services";
import {
  errorsToString,
  convertDateToDB,
  handlerDelete,
  decimal,
  filterNonNumeric,
} from "@/helpers";
import LoadingPage from "@/components/LoadingPage.vue";
import ButtonDelete from "@/components/ButtonDelete.vue";

export default {
  name: "StudentEdit",
  components: {
    LoadingPage,
    ButtonDelete,
  },
  props: ["id"],
  data() {
    return {
      convertDateToDB,
      decimal,
      handlerDelete,
      filterNonNumeric,
      student: [],
      teams: [],
      serviceTypes: [],
      paymentTypes: [],
      team_id: "",
      financial_id: "",
      teamRegistration: "",
      financial: {
        registration_id: "",
        payment_type: "",
        service_type_id: "",
        due_date: "",
        quota: "",
        paid: "",
        value: "",
      },
      showReceipt: 0,
      paidValue: "",
      hasRegistration: [],
      hasDocuments: [],
      hasBooks: [],
      numberOfTimesToEnter: 1,
      students: [],
    };
  },
  watch: {
    numberOfTimesToEnter(n, o) {
      isNaN(Number(n)) &&
        setTimeout(() => (this.numberOfTimesToEnter = o), 500);
    },
    paidValue(n, o) {
      this.showReceipt = +n;
    },
  },
  methods: {
    async getImage() {
      try {
        const response = await api.get(
          `/students/${this.$route.params.id}/get-image`,
          {
            responseType: "blob",
          }
        );
        if (response.status === 200) {
          const imageUrl = URL.createObjectURL(response.data);
          document.querySelector("#student-photo").classList.remove('d-none');
          document.querySelector("#student-photo").src = imageUrl;
          document.querySelector("#student-photo").classList.add("photo");
        } else {
          Toast.fire("Erro", response.statusText, "error");
        }
      } catch (error) {
        document.querySelector("#student-photo").classList.add('d-none');
        console.log(`> Photo ${error.response.statusText}`);
      }
    },
    async changeStudentOfDocument(e) {
      try {
        const { data } = await api.put(
          `/documents/${e.target.dataset.documentId}`,
          { student_id: e.target.value }
        );
        Toast.fire("Sucesso", data.message, "success");
      } catch (error) {
        Toast.fire("Erro", error.response.data.message, "error");
      }
    },
    styleToHighlightPaymentStatus(financial) {
      const dueDate = new Date(this.convertDateToDB(financial.due_date));
      const dataAtual = new Date();

      let _class = "";

      if (financial.paid) {
        _class = "table-success";
      } else if (dueDate < dataAtual) {
        _class = "table-danger";
      }

      return _class;
    },
    async getBlob(doc) {
      await api
        .get(`/documents/storage/${doc.folder}/${doc.file_name}`, {
          responseType: "blob",
        })
        .then((response) => {
          const blob = new Blob([response.data], { type: "application/pdf" });

          const link = document.createElement("a");

          link.href = URL.createObjectURL(blob);
          link.download = doc.file_name;
          link.click();
          URL.revokeObjectURL(link.href);
        })
        .catch((error) => console.error(error));
    },
    async destroyPDF(doc) {
      api
        .get(`/documents/${doc.folder}/${doc.file_name}/remove`)
        .then((response) => {
          Toast.fire("Sucesso", response.data.message, "success");
          this.getItens();
        })
        .catch((error) => {
          Toast.fire("Erro", error.response.data.message, "error");
        });
    },
    async getTeams() {
      await api.get(`/teams?page=0&perPage=99999`).then((res) => {
        this.teams = res.data.data;
      });
    },
    async getServiceType() {
      await api.get(`/service-types?page=0&perPage=99999`).then((res) => {
        this.serviceTypes = res.data.data;
      });
    },
    async getPaymentService() {
      await api.get(`/payment-types?page=0&perPage=99999`).then((res) => {
        this.paymentTypes = res.data.data;
      });
    },
    async getItens() {
      await api.get(`/students/${this.id}`).then((res) => {
        const student = res.data[0];
        student.birth_date = this.convertDateToDB(student.birth_date);

        this.hasRegistration = student.registrations;
        this.hasDocuments = student.documents;
        this.hasBooks = student.books;

        this.student = student;
      });
    },
    async handlerCreateBook() {
      try {
        const formData = new FormData(this.$refs.formBook);
        formData.set("student_id", this.id);

        const { data } = await api.post(`/books`, formData);

        Toast.fire("Sucesso", data.message, "success");

        this.getItens();
      } catch (error) {
        Toast.fire("Erro", error.response.data.message, "error");
      }
    },
    async handlerFinancialUpdate() {
      try {
        const formData = new FormData(this.$refs.formFinancialUpdate);

        formData.set("value", this.decimal(formData.get("value")));

        const { data } = await api.put(
          `/financials/${this.financial_id}`,
          Object.fromEntries(formData.entries())
        );

        Toast.fire("Sucesso", data.message, "success");

        this.getItens();

        this.financial_id = null;
      } catch (error) {
        Toast.fire("Erro", error.response.data.message, "error");
      }
    },
    increaseMonthsInstallments(_date, _increment) {
      const date = new Date(`${_date}T00:00:00`);

      date.setMonth(date.getMonth() + _increment);

      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");

      return `${year}-${month}-${String(date.getDate()).padStart(2, "0")}`;
    },
    async handlerFinancial() {
      try {
        const form = this.$refs.formFinancial;
        const mes = form.querySelector('[name="due_date"]').value;
        var quota = +form.querySelector('[name="quota"]').value;

        if (isNaN(this.numberOfTimesToEnter))
          return Toast.fire(
            "Atenção",
            "Por favor, preencha a quantidade de forma correta.",
            "warning"
          );

        for (let i = 0; i < this.numberOfTimesToEnter; i++) {
          const formData = new FormData(form);

          formData.set("value", this.decimal(formData.get("value")));
          formData.set("due_date", this.increaseMonthsInstallments(mes, i));
          formData.set("quota", quota++);

          var { data } = await api.post(`/financials`, formData);

          Toast.fire("Sucesso", data.message, "success");
        }

        this.getItens();
      } catch (error) {
        Toast.fire("Erro", error.response.data.message, "error");
      }
    },
    async generateStatement() {
      /** Gera extrato financeiro. */

      try {
        this.loading = !this.loading;

        await api
          .get(`/exports/student-financial-history/${this.$route.params.id}`, {
            responseType: "blob",
          })
          .then((response) => {
            const blob = new Blob([response.data], { type: "application/pdf" });

            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download =
              `Extrato Financeiro - ` + this.student.name.toUpperCase();
            a.click();
          });
      } catch (error) {
        Toast.fire("Erro", error.message, "error");
      }

      this.loading = !this.loading;
    },
    async generateReceipt() {
      if (!this.financial_id)
        return Toast.fire(
          "Erro",
          "Por favor, selecione uma pendência financeira.",
          "error"
        );

      try {
        this.loading = !this.loading;

        await api
          .get(`/exports/receipt/${this.financial_id}`, {
            responseType: "blob",
          })
          .then((response) => {
            const blob = new Blob([response.data], { type: "application/pdf" });

            const a = document.createElement("a");
            a.href = URL.createObjectURL(blob);
            a.download = `Recibo - ` + this.student.name.toUpperCase();
            a.click();
          });
      } catch (error) {
        Toast.fire("Erro", error.message, "error");
      }

      this.loading = !this.loading;
    },
    async showModalFinancial(id) {
      try {
        const { data } = await api.get(`/financials/${id}`);

        this.showReceipt = data.paid;
        this.paidValue = data.paid;

        for (let field in data) {
          const hasField = document.querySelector(
            `.form-update [name="${field}"]`
          );

          if (hasField) {
            if (field == "due_date" || field == "pay_day") {
              hasField.value = this.convertDateToDB(data[field]);
            } else if (field == "value") {
              const valorFormatado = data[field].toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              });

              hasField.value = valorFormatado;
            } else {
              hasField.value = data[field];
            }
          }
        }

        jQuery("#modalFinancial").modal("show");

        this.financial_id = id;
      } catch (error) {
        Toast.fire("Erro", error.response.data.message, "error");
      }
    },
    async handlerRegistration() {
      try {
        const { data } = await api.post(`/registrations`, {
          student_id: this.id,
          team_id: this.teamRegistration,
        });

        Toast.fire("Sucesso", data.message, "success");

        this.getItens();
      } catch (error) {
        Toast.fire("Erro", error.response.data.message, "error");
      }
    },
    async handlerSubmit() {

      const formData = new FormData(this.$refs.formStudent);

      formData.set('cpf', formData.get('cpf').replace(/[.\-]/g, ''));
      formData.append('_method', 'put');

      try {
        const { data } = await api.post(`/students/${this.$route.params.id}`, formData,  {
           headers: {'Content-Type': 'multipart/form-data'}
         });

        Toast.fire("Sucesso", data.message, "success");
        this.getImage();

      } catch (error) {
        Toast.fire("Erro", errorsToString(error.response.data.errors), "error");
      }
    },
    async handlerRegisterStudentInTeam() {
      try {
        const { data } = await api.post(`/teams/register-student`, {
          student_id: this.id,
          team_id: this.team_id,
        });

        this.$router.push({ name: "students" });

        Toast.fire("Sucesso", data.message, "success");
      } catch (error) {
        Toast.fire("Erro", errorsToString(error.response.data.errors), "error");
      }
    },
    reset() {
      this.getItens();
    },
  },
  mounted() {
    this.getItens();
    this.getImage();
    this.getTeams();
    this.getServiceType();
    this.getPaymentService();

    $('input[name="value"]').maskMoney();
  },
};
</script>

<style scoped>
.photo {
  width: 80px;
  height: 80px;
  object-fit: cover;
  border: 2px solid #0006;
  margin-bottom: 4px;
  border-radius: 5px;
}
</style>
