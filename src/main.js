import Vue from "vue";
import {Button} from "mint-ui"
import "./mock"
import router from "./router"
import store from "./store"
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.component(Button.name,Button)

new Vue({
  render: (h) => h(App),
  router,
  store
}).$mount("#app");
