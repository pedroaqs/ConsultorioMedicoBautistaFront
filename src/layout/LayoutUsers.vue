<template>
  <el-container>
    <el-aside width="200px;"><Menu /></el-aside>
    <el-container>
      <el-header>
        <div id="header">
          <el-breadcrumb separator="\">
            <el-breadcrumb-item></el-breadcrumb-item>
            <el-breadcrumb-item>{{ title }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
      </el-header>
      <el-main><slot /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import Menu from "./components/Menu.vue";
export default {
  name: "LayoutUsers",
  components: { Menu },
  data() {
    return {
      title: "",
    };
  },
  created() {
    this.title = this.$route.name;
  },
};
</script>
<style>
#header {
  margin: 0;
  padding: 20px;
}
.el-main {
  background-color: #e7e7e7;
}
</style>