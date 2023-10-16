import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueAlertify from 'vue-alertify'
import VueSweetalert2 from 'vue-sweetalert2'
import Swal from "sweetalert2/dist/sweetalert2.js"
import VueTheMask from 'vue-the-mask'

import "bootstrap/dist/css/bootstrap.min.css";
import 'sweetalert2/dist/sweetalert2.min.css'
import "./styles/global.css";

import "bootstrap/dist/js/bootstrap.js"

/* Import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { library } from "@fortawesome/fontawesome-svg-core"
import { fas } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons';

export const EventBus = new Vue();

Vue.config.productionTip = false
 
Vue.use(VueAlertify);
Vue.use(VueSweetalert2);
Vue.use(VueTheMask)

library.add(fas)
library.add(faWhatsapp)

Vue.component('font-awesome-icon', FontAwesomeIcon)

const Toast = Swal.mixin({
  toast:true,
  position:"top-end", 
  timer:5000,
  timerProgressBar:true,
  showConfirmButton:false
});

window.Toast = Toast;

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
