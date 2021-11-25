<template>
  <div>
    <el-row>
      <el-card style="width: 100%">
        <el-row>
          <el-col :span="19">
            <el-form inline>
              <el-form-item label="Apellidos del Médico">
                <el-input v-model="searchForm.apellidosMedico"></el-input>
              </el-form-item>
              <el-form-item label="DNI del paciente">
                <el-input v-model="searchForm.dniPaciente"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="getCitas">Buscar</el-button>
                <el-button type="danger" @click="limpiarBusqueda"
                  >Limpiar busqueda</el-button
                >
              </el-form-item>
            </el-form>
          </el-col>
          <el-col :span="5">
            <el-button type="success" plain @click="dialog1 = true"
              >Nueva Cita</el-button
            >
          </el-col>
        </el-row>
      </el-card>
    </el-row>
    <el-divider></el-divider>
    <el-row>
      <el-card style="width: 100%">
        <el-table :data="citasData" style="width: 100%" height="500px">
          <el-table-column label="Id" prop="id" />
          <el-table-column label="Fecha y Hora" prop="fechayHora" />
          <el-table-column label="Paciente">
            <template #default="scope">
              {{ scope.row.paciente.nombres }}
              {{ scope.row.paciente.apellidoP }}
              {{ scope.row.paciente.apellidoM }}
            </template>
          </el-table-column>
          <el-table-column label="Médico">
            <template #default="scope">
              {{ scope.row.medico.first_name }}
              {{ scope.row.medico.last_name }}
            </template>
          </el-table-column>
          <el-table-column label="Opciones">
            <template #default="scope">
              <el-button @click="editarCita(scope.row.id)">Editar</el-button>
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
            :total="countCitas"
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
      v-model="dialog1"
      title="Nueva Cita"
      width="30%"
      destroy-on-close
    >
      <new-cita @close="onClose" />
    </el-dialog>
    <!-- 1 -->
    <el-dialog
      v-model="dialog2"
      :id="idEdit"
      title="Editar Cita"
      width="30%"
      destroy-on-close
    >
      <edit-cita :id="idEdit" @close="onClose" />
    </el-dialog>
  </div>
</template>
<script>
import { getAPI } from "@/api/axios";
import NewCita from "./components/NuevaCita.vue";
import EditCita from "./components/EditCita.vue";

export default {
  name: "Citas",
  components: { NewCita, EditCita },
  data() {
    return {
      dialog1: false,
      dialog2: false,
      dialog1Loader: false,
      searchForm: {
        apellidosMedico: "",
        dniPaciente: "",
      },
      citasData: [],
      idEdit: 0,
      currentPage: 1,
      countCitas: 0,
    };
  },
  created() {
    this.getCitas();
  },
  methods: {
    getCitas() {
      getAPI
        .get(
          "/cita/?page=" +
            this.currentPage +
            "&search=" +
            this.searchForm.apellidosMedico +
            "+" +
            this.searchForm.dniPaciente,
          {
            headers: { Authorization: `Bearer ${this.$store.getters.token}` },
          }
        )
        .then((response) => {
          this.citasData = response.data.results;
          this.countCitas = response.data.count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    limpiarBusqueda() {
      this.searchForm = {
        apellidosMedico: "",
        dniPaciente: "",
      };
      this.getCitas();
    },
    editarCita(id) {
      this.idEdit = id;
      this.dialog2 = true;
    },
    onClose() {
      this.dialog2 = false;
      this.dialog1 = false;
      this.getCitas();
    },
    handleSizeChange() {},
    handleCurrentChange() {
      this.getCitas();
    },
  },
};
</script>
<style>
</style>