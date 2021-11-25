<template>
  <div style="display: block; text-align: center">
    <el-progress :percentage="progres" />
    <img
      alt="Imagen Carga"
      src="../assets/logo.png"
      style="display: inline; margin: 0 0; width: 50%"
    />
  </div>
</template>

<script>
export default {
  name: "Home",
  mounted() {
    setTimeout(() => {
      this.$router.push({ path: "/login" });
    }, 5000);
    setInterval(() => {
      if (this.progres < 100) {
        this.progres = this.progres + 1;
      }
    }, 40);
  },
  data() {
    return {
      progres: 0,
    };
  },
};
</script>
<style>
.aqweqwe {
  text-align: center;
  align-content: center;
}
</style>
