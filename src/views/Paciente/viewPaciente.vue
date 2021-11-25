<template>
  <div>
    <el-row :gutter="10">
      <el-col :span="8">
        <el-card style="height: 89vh">
          <el-descriptions
            title="Datos del paciente"
            :column="1"
            size="medium"
            border
          >
            <template #extra>
              <el-button
                type="success"
                plain
                size="small"
                @click="dialog1 = true"
                >Nueva Consulta</el-button
              >
            </template>
            <el-descriptions-item>
              <template #label> Nombres </template>
              {{ pacienteData.nombres }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label> Apellido Paterno </template>
              {{ pacienteData.apellidoP }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label> Apellido Materno </template>
              {{ pacienteData.apellidoM }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label> DNI </template>
              {{ pacienteData.dni }}
            </el-descriptions-item>
          </el-descriptions>
          <el-divider></el-divider>
          <el-descriptions :column="1" size="medium" border>
            <el-descriptions-item>
              <template #label> Teléfono </template>
              {{ pacienteData.telefono }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label> Dirección </template>
              {{ pacienteData.direccion }}
            </el-descriptions-item>
            <el-descriptions-item>
              <template #label> Edad </template>
              {{ calcularEdad(pacienteData.fechaNacimiento) }}
            </el-descriptions-item>
          </el-descriptions>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-card style="max-height: 79vh; overflow: auto">
          <div style="max-height: 90%">
            <el-timeline>
              <el-timeline-item
                v-for="item in pacienteData.consultas"
                :key="item.id"
                :timestamp="new Date(item.fechayHora).toLocaleString()"
                placement="top"
              >
                <el-card>
                  <el-row justify="center">
                    <el-col :span="11">
                      <p>
                        <strong>Motivo: </strong> {{ item.motivo }}
                        <el-badge
                          type="success"
                          value="Via Cita"
                          v-if="item.viaCita"
                        ></el-badge>
                      </p>
                    </el-col>
                    <el-col :span="11">
                      <el-button
                        type="warning"
                        plain
                        @click="editConsulta(item.id)"
                      >
                        Editar
                      </el-button>
                      <el-button plain @click="verConsulta(item.id)"
                        >Ver Detalles</el-button
                      >
                    </el-col>
                  </el-row>
                </el-card>
              </el-timeline-item>
            </el-timeline>
          </div>
        </el-card>
        <el-card style="max-height: 10vh">
          <el-row justify="center" align="middle">
            <el-pagination
              background
              v-model:currentPage="currentPage"
              :page-size="10"
              layout="total, prev, pager, next, jumper"
              :total="totalConsutas"
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
            >
            </el-pagination>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <!-- Modales -->
    <el-dialog
      v-model="dialog1"
      title="Nuevo Consulta"
      width="60%"
      destroy-on-close
    >
      <new-consulta
        :idPaciente="pacienteData.id"
        :dniPaciente="pacienteData.dni"
        @close="onClose"
      />
    </el-dialog>
    <!-- Modales -->
    <el-dialog
      v-model="dialog2"
      title="Editar Consulta"
      width="60%"
      destroy-on-close
    >
      <edit-consulta
        :idConsulta="idConsulta"
        :dniPaciente="pacienteData.dni"
        @close="onClose"
      />
    </el-dialog>
    <el-dialog v-model="dialog3" width="60%" destroy-on-close>
      <view-consulta :idConsulta="idConsulta" @close="onClose" />
    </el-dialog>
  </div>
</template>
<script>
import { getAPI } from "@/api/axios";
import NewConsulta from "./components/CrearConsulta.vue";
import EditConsulta from "./components/EditConsulta.vue";
import ViewConsulta from "./components/VerConsulta.vue";
export default {
  name: "ViewPaciente",
  components: { NewConsulta, EditConsulta, ViewConsulta },
  data() {
    return {
      id: "",
      pacienteData: {
        id: "",
        consultas: [],
        nombres: "",
        apellidoP: "",
        apellidoM: "",
        dni: "",
        telefono: "",
        direccion: "",
        fechaNacimiento: "",
      },
      dialog1: false,
      dialog2: false,
      dialog3: false,
      idConsulta: 0,
      totalConsutas: 0,
      currentPage: 1,
    };
  },
  created() {
    this.id = this.$route.query.id;
    this.getPaciente();
  },
  methods: {
    getPaciente() {
      getAPI
        .get("/paciente/" + this.id, {
          headers: { Authorization: `Bearer ${this.$store.getters.token}` },
        })
        .then((response) => {
          this.pacienteData = response.data;
          this.getConsultasPaciente(1);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getConsultasPaciente() {
      ///consulta-medica/?page=2
      getAPI
        .get(
          "consulta-medica/?page=" +
            this.currentPage +
            "&search=" +
            this.pacienteData.dni,
          {
            headers: { Authorization: `Bearer ${this.$store.getters.token}` },
          }
        )
        .then((response) => {
          this.pacienteData.consultas = response.data.results;
          this.totalConsutas = response.data.count;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    calcularEdad(fecha) {
      var hoy = new Date();
      var cumpleanos = new Date(fecha);
      var edad = hoy.getFullYear() - cumpleanos.getFullYear();
      var m = hoy.getMonth() - cumpleanos.getMonth();

      if (m < 0 || (m === 0 && hoy.getDate() < cumpleanos.getDate())) {
        edad--;
      }

      return edad;
    },
    editConsulta(id) {
      this.idConsulta = id;
      this.dialog2 = true;
    },
    verConsulta(id) {
      this.idConsulta = id;
      this.dialog3 = true;
    },
    onClose() {
      this.dialog1 = false;
      this.dialog2 = false;
      this.getConsultasPaciente();
    },
    handleSizeChange() {
      this.getConsultasPaciente();
    },
    handleCurrentChange() {
      this.getConsultasPaciente();
    },
  },
};
</script>
<style>
</style>