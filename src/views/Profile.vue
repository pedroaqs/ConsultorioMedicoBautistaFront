<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="10">
        <el-card style="height: 89vh">
          <template #header>
            <el-row>
              <el-col :span="18"> <h2>Perfil del Usuario</h2> </el-col>
              <el-col :span="3">
                <el-button v-if="data.is_superuser" type="success" disabled>
                  Admin
                </el-button>
              </el-col>
            </el-row>
          </template>
          <div class="image-container">
            <img src="@/assets/avatar.png" alt="avatar" />
          </div>

          <el-divider></el-divider>
          <div>
            <h5>Nombres: {{ data.first_name }}</h5>
          </div>
          <div>
            <h5>Apellidos: {{ data.last_name }}</h5>
          </div>
          <div>
            <h5>Usuario: {{ data.username }}</h5>
          </div>
          <div>
            <h5>E-mail: {{ data.email }}</h5>
          </div>
        </el-card>
      </el-col>
      <el-col :span="14">
        <el-card style="height: 89vh">
          <div>
            <h3>Grupos:</h3>
            <el-divider></el-divider>
            <el-table :data="data.groups" style="width: 100%" height="300px">
              <el-table-column type="expand">
                <template #default="props">
                  <h5>Permissions</h5>
                  <ol>
                    <li v-for="item in props.row.permissions" :key="item">
                      {{ item.id }} -> {{ item.name }}
                    </li>
                  </ol>
                </template>
              </el-table-column>
              <el-table-column label="ID" prop="id" />
              <el-table-column label="Nombre" prop="name" />
            </el-table>
          </div>
          <div>
            <h3>Permisos:</h3>
            <el-divider></el-divider>
            <el-table
              :data="data.user_permissions"
              style="width: 100%"
              height="300px"
            >
              <el-table-column label="ID" prop="id" />
              <el-table-column label="Nombre" prop="name" />
            </el-table>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Profile",
  data() {
    return {
      data: {},
    };
  },

  created() {
    this.data = JSON.parse(localStorage.getItem("store"));
  },
};
</script>
<style>
.image-container {
  display: flex;
  justify-content: center;
}
img {
  border-radius: 40%;
}
</style>