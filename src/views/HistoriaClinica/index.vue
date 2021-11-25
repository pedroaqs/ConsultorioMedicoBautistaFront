<template>
  <div>
    <el-row>
      <el-card style="width: 100%">
        <el-row justify="center" align="middle">
          <el-col :span="18">
            <el-form :inline="true" :model="searchForm" style="width: 100%">
              <el-form-item label="DNI: ">
                <el-input v-model="searchForm.dni" placeholder="DNI"></el-input>
              </el-form-item>

              <el-form-item label="Apellidos">
                <el-input
                  v-model="searchForm.apellidos"
                  placeholder="Apellidos"
                ></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="onSearch">Buscar</el-button>
                <el-button @click="limpiarBusqueda" type="danger"
                  >Limpiar Busqueda</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="6">
            <el-button plain type="success" @click="dialog1 = true">
              Nuevo Paciente
            </el-button>
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-card style="width: 100%">
        <el-table :data="pacientesData" style="width: 100%" height="500px">
          <el-table-column label="Id" prop="id" />
          <el-table-column label="Nombre" prop="nombres" />
          <el-table-column label="Apellido Paterno" prop="apellidoP" />
          <el-table-column label="Apellido Materno" prop="apellidoM" />
          <el-table-column label="DNI" prop="dni" />
          <el-table-column label="Opciones">
            <template #default="scope">
              <el-button @click="verPaciente(scope.row.id)"
                >Ver Historia Clínica</el-button
              >
              <el-button @click="editarPaciente(scope.row.id)"
                >Editar</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-card>
      <el-card style="width: 100%">
        <el-row justify="center" align="middle">
          <el-pagination
            background
            v-model:currentPage="currentPage"
            :page-size="10"
            layout="total, prev, pager, next, jumper"
            :total="countPacientes"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          >
          </el-pagination>
        </el-row>
      </el-card>
    </el-row>
    <!-- Modales -->
    <!-- 1 -->
    <el-dialog
      v-loading="dialog1Loader"
      v-model="dialog1"
      title="Nuevo Paciente"
      width="60%"
      destroy-on-close
    >
      <nuevo-paciente
        @close="onClose"
        @changeloader="dialog1Loader = dialog1Loader ? false : true"
      />
    </el-dialog>
    <!-- 2 -->
    <el-dialog
      v-loading="dialog2Loader"
      v-model="dialog2"
      title="Nuevo Paciente"
      width="60%"
      destroy-on-close
    >
      <editar-paciente
        :id="idEdit"
        @close="onClose"
        @changeloader="dialog2Loader = dialog2Loader ? false : true"
      />
    </el-dialog>
  </div>
</template>
<script>
import { getAPI } from "@/api/axios";
import NuevoPaciente from "../Paciente/NuevoPaciente.vue";
import EditarPaciente from "../Paciente/EditPaciente.vue";
export default {
  name: "HistoriasClinicas",
  components: { NuevoPaciente, EditarPaciente },
  data() {
    return {
      searchForm: {
        dni: "",
        apellidos: "",
      },
      pacientesData: [],
      dialog1: false,
      dialog1Loader: false,
      dialog2: false,
      dialog2Loader: false,
      idEdit: 0,
      countPacientes: 0,
      currentPage: 1,
    };
  },
  created() {
    this.getPacientes(this.currentPage);
  },
  methods: {
    getPacientes() {
      getAPI
        .get(
          "/paciente/?page=" +
            this.currentPage +
            "&search=" +
            this.searchForm.dni +
            "+" +
            this.searchForm.apellidos,
          {
            headers: { Authorization: `Bearer ${this.$store.getters.token}` },
          }
        )
        .then((response) => {
          this.pacientesData = response.data.results;
          this.countPacientes = response.data.count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onSearch() {
      this.getPacientes();
    },
    verPaciente(id) {
      this.$router.push({ path: "/view-paciente", query: { id: id } });
    },
    editarPaciente(id) {
      this.idEdit = id;
      this.dialog2 = true;
    },
    onClose() {
      this.dialog1 = false;
      this.dialog2 = false;
      this.getPacientes();
    },
    limpiarBusqueda() {
      this.searchForm = {
        dni: "",
        apellidos: "",
      };
      this.getPacientes();
    },
    handleSizeChange() {
      this.getPacientes();
    },
    handleCurrentChange() {
      this.getPacientes();
    },
  },
};
</script>
<style>
</style>