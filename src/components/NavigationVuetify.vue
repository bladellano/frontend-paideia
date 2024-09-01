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
      </v-list>
    </v-menu>
  </div>
</template>
<script>
import {
  VMenu,
  VIcon,
  VSwitch,
  VTooltip,
  VBtn,
  VList,
  VListItem,
  VListItemTitle,
  VListGroup,
  VListItemContent,
} from "vuetify/lib";

export default {
  components: {
    VTooltip,
    VIcon,
    VSwitch,
    VMenu,
    VBtn,
    VList,
    VListItem,
    VListItemTitle,
    VListGroup,
    VListItemContent,
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
