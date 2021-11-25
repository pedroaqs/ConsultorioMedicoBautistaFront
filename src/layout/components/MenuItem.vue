<template>
  <div v-if="isVisible" class="menu-item">
    <router-link :to="{ name: route.name }">{{ name }}</router-link>
  </div>
</template>
<script>
export default {
  name: "MenuItem",
  props: {
    route: {
      type: Object,
    },
  },
  computed: {
    isVisible() {
      if (this.route.meta.visible == true) {
        if (this.$store.getters.isAdmin) {
          return true;
        }
        if (this.route.meta.permission == null) {
          return true;
        } else {
          return this.$store.getters.permission(this.route.meta.permission);
        }
      }
      return false;
    },
    name() {
      return this.route.name.toUpperCase();
    },
  },
};
</script>
<style>
.menu-item {
  display: block;
  height: 20px;
  padding: 15px;
}
</style>
