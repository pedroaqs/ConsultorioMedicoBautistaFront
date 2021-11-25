<template>
  <AppLayout>
    <router-view />
  </AppLayout>
</template>

<script>
import AppLayout from "@/layout/AppLayout.vue";
export default {
  name: "App",
  components: { AppLayout },
  beforeCreate() {
    this.$store.commit("initialiseStore");
  },
};
</script>

<style>
body {
  margin: 0;
  padding: 0;
  background-color: #f8f8f8 !important;
}
</style>
