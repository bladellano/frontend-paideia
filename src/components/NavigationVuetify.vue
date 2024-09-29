<template>
  <div class="mt-4">
    <v-menu :close-on-content-click="closeOnContentClick">
      <template v-slot:activator="{ on: menu, attrs }">
        <v-tooltip bottom>
          <template v-slot:activator="{ on: tooltip }">
            <v-btn
              color="primary"
              dark
              v-bind="attrs"
              v-on="{ ...tooltip, ...menu }"
            >
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <span>Clique aqui para listar todos os itens do menu</span>
        </v-tooltip>
      </template>
      <v-list>
        <!-- Loop through the main menu items -->
        <v-list-group
          v-for="(item, index) in items"
          :key="index"
          v-bind="item.attrs"
          :prepend-icon="item.icon"
          no-action
        >
          <template v-slot:activator>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </template>

          <!-- Loop through the subitems of each main item -->
          <v-list-item
            v-for="(child, childIndex) in item.children"
            :key="childIndex"
            @click="$router.push(child.path)"
          >
            <v-list-item-content>
              <v-list-item-title>{{ child.action }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>

        <!-- Item for home -->
        <v-list-item>
          <v-list-item-content>

            <v-btn
              to="/"
              depressed
              color="secondary"
            >
            Home
            </v-btn>
          
          </v-list-item-content>
        </v-list-item>

        <!-- Item for gestão -->
        <v-list-item>
          <v-list-item-content>

            <v-btn
              to="/admin/dashboard"
              depressed
              color="warning"
            >
            Gestão
            </v-btn>
          
          </v-list-item-content>
        </v-list-item>

        <!-- Item for logout -->
        <v-list-item @click="logout">
          <v-list-item-content>
            <v-btn
              depressed
              color="error"
            >
              Sair
            </v-btn>
          </v-list-item-content>
        </v-list-item>
        
      </v-list>
    </v-menu>
  </div>
</template>
<script>
export default {
  methods: {
    logout() {
      window.localStorage.removeItem("token");
      this.isLogged = false;
      window.location.reload();
    },
  },
  props: {
    items: {
      type: Array,
      required: true,
      default: () => [],
    },
  },
  data: () => ({
    closeOnContentClick: false,
  }),
};
</script>
