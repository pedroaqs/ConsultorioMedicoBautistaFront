import { createApp } from "vue";
import App from "./App.vue";
import installElementPlus from "./plugins/element";
import router from "./router";
import store from "./store";

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresLogin)) {
    if (!store.getters.loggedIn) {
      next({ path: "/login" });
    } else {
      next();
    }
  } else {
    next();
  }
});
store.subscribe((mutation, state) => {
  localStorage.setItem("store", JSON.stringify(state));
});
const app = createApp(App).use(store).use(router);
installElementPlus(app);
app.mount("#app");
