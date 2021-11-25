<template>
  <div></div>
</template>
<script>
export default {
  name: "Logout",
  created() {
    this.$store
      .dispatch("userLoggout")
      .then(() => {
        this.$router.push({ path: "/login" });
      })
      .catch((error) => console.log(error));
  },
};
</script>