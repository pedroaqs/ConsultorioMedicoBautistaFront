<template>
  <div style="position: absolute; top: 25%">
    <el-row :gutter="10" style="height: 100%" justify="center" align="middle">
      <el-col :sm="24" :md="10" :lg="10">
        <el-card>
          <el-row>
            <el-col :sm="24" :md="11" :lg="11" style="align-items: center">
              <img src="@/assets/logo.png" style="width: 100%" />
            </el-col>
            <el-col :sm="24" :md="11" :lg="11">
              <h2>Inicia sesión</h2>
              <el-alert
                v-if="incorrectAuth"
                title="Usuario o contraseña incorrectos."
                type="error"
              />
              <el-form label-position="top">
                <el-form-item label="Usuario">
                  <el-input v-model="username"></el-input>
                </el-form-item>
                <el-form-item label="Contraseña">
                  <el-input v-model="password" type="password"></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button plain @click="login">Inicia sesión</el-button>
                </el-form-item>
              </el-form>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      incorrectAuth: false,
    };
  },
  methods: {
    login() {
      this.incorrectAuth = false;
      this.$store
        .dispatch("userLogin", {
          username: this.username,
          password: this.password,
        })
        .then(() => {
          this.$router.push({ path: "/profile" });
        })
        .catch((error) => {
          console.log(error);
          this.incorrectAuth = true;
        });
    },
  },
};
</script>