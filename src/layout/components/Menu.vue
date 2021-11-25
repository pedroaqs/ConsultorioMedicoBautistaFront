<template>
  <div class="menu-container">
    <div style="margin-right: 30px"></div>
    <MenuItem v-for="(r, i) in routes" :key="i" :route="r"></MenuItem>
  </div>
</template>
<script>
import MenuItem from "./MenuItem.vue";
export default {
  name: "Menu",
  components: { MenuItem },
  computed: {
    routes() {
      return this.$router.options.routes;
    },
  },
};
</script>
<style>
.menu-container {
  height: 100vh;
  width: 100%;
  background: #545c64;
}
a {
  padding: 15px;
  font-size: 16px;
  color: #ffffff;
  text-decoration: none;
}

a.router-link-exact-active {
  color: #ff6500;
}
</style>