import { createStore } from "vuex";
import { getAPI } from "@/api/axios";
export default createStore({
  state: {
    accessToken: null,
    refreshToken: null,
    is_superuser: false,
    username: null,
    first_name: null,
    last_name: null,
    email: null,
    user_permissions: [],
    groups: [],
    profile: null,
  },
  mutations: {
    initialiseStore(state) {
      if (localStorage.getItem("store")) {
        this.replaceState(
          Object.assign(state, JSON.parse(localStorage.getItem("store")))
        );
      }
    },
    updateStorage(state, { access, refresh }) {
      state.accessToken = access;
      state.refreshToken = refresh;
    },
    destroyToken(state) {
      localStorage.removeItem("store");
      state.accessToken = null;
      state.refreshToken = null;
      state.is_superuser = false;
      state.username = null;
      state.first_name = null;
      state.last_name = null;
      state.email = null;
      state.user_permissions = [];
      state.groups = [];
      state.profile = null;
    },
    updateUserInfo(state, { data }) {
      state.is_superuser = data.is_superuser;
      state.username = data.username;
      state.first_name = data.first_name;
      state.last_name = data.last_name;
      state.email = data.email;
      state.user_permissions = data.user_permissions;
      state.groups = data.groups;
      state.profile = data.profile;
    },
  },
  getters: {
    loggedIn(state) {
      return state.accessToken != null;
    },
    token(state) {
      return state.accessToken;
    },
    isAdmin(state) {
      return state.is_superuser;
    },
    permission: (state) => (namePermision) => {
      let resp = false;
      state.user_permissions.forEach((p) => {
        if (p.codename == namePermision) resp = true;
      });
      state.groups.forEach((g) => {
        g.permissions.forEach((p) => {
          if (p.codename == namePermision) resp = true;
        });
      });
      return resp;
    },
  },
  actions: {
    userLogin(context, usercredentials) {
      return new Promise((resolve, reject) => {
        getAPI
          .post("/api-token/", {
            username: usercredentials.username,
            password: usercredentials.password,
          })
          .then((response) => {
            context.commit("updateStorage", {
              access: response.data.access,
              refresh: response.data.refresh,
            });
            context.dispatch("userInfo", { token: response.data.access });
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      });
    },
    userLoggout(context) {
      if (context.getters.loggedIn) {
        context.commit("destroyToken");
      }
    },
    userInfo(context, data) {
      return new Promise((resolve, reject) => {
        getAPI
          .get("/user-info/", {
            headers: { Authorization: `Bearer ${data.token}` },
          })
          .then((response) => {
            context.commit("updateUserInfo", {
              data: response.data,
            });
            resolve();
          })
          .catch((err) => {
            console.log(err);
            reject();
          });
      });
    },
  },
  modules: {},
});
