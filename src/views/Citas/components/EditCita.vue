<template>
  <div>
    <el-form label-width="120px">
      <el-form-item label="Paciente">
        <el-select
          v-model="citaForm.paciente"
          style="width: 240px"
          filterable
          remote
          :remote-method="searchPaciente"
          clearable
          placeholder="DNI del Paciente"
        >
          <el-option
            v-for="item in opcionesPaciente"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Medico">
        <el-select
          v-model="citaForm.medico"
          style="width: 240px"
          filterable
          remote
          :remote-method="searchMedico"
          clearable
          placeholder="Apellidos del Medico"
        >
          <el-option
            v-for="item in opcionesMedico"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="Fecha y Hora">
        <el-date-picker
          v-model="citaForm.fechayHora"
          type="datetime"
          placeholder="Seleccione Fecha y hora"
        >
        </el-date-picker>
      </el-form-item>
      <el-row justify="center">
        <el-form-item>
          <el-button @click="close">Cancelar</el-button>
          <el-button @click="edit">Guardar</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getAPI } from "@/api/axios";
export default {
  name: "EditCita",
  props: {
    id: Number,
  },
  data() {
    return {
      citaForm: {
        paciente: "",
        medico: "",
        fechayHora: "",
      },
      opcionesPaciente: [],
      opcionesMedico: [],
    };
  },
  created() {
    getAPI
      .get("/cita/" + this.id + "/", {
        headers: { Authorization: `Bearer ${this.$store.getters.token}` },
      })
      .then((response) => {
        this.citaForm.fechayHora = response.data.fechayHora;
        this.citaForm.paciente = response.data.paciente.id;
        this.opcionesPaciente = [
          {
            value: response.data.paciente.id,
            label:
              response.data.paciente.nombres +
              " " +
              response.data.paciente.apellidoP +
              " " +
              response.data.paciente.apellidoM,
          },
        ];
        this.opcionesMedico = [
          {
            value: response.data.medico.id,
            label:
              response.data.medico.first_name +
              " " +
              response.data.medico.last_name,
          },
        ];
        this.citaForm.medico = response.data.medico.id;
      })
      .catch((err) => {
        console.log(err);
      });
  },
  methods: {
    searchPaciente(query) {
      getAPI
        .get("/paciente/?search=" + query, {
          headers: { Authorization: `Bearer ${this.$store.getters.token}` },
        })
        .then((response) => {
          this.opcionesPaciente = [];
          response.data.results.map((e) => {
            this.opcionesPaciente.push({
              value: e.id,
              label: e.nombres + " " + e.apellidoP + " " + e.apellidoM,
            });
            return;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    searchMedico(query) {
      getAPI
        .get("/user-v/?search=" + query, {
          headers: { Authorization: `Bearer ${this.$store.getters.token}` },
        })
        .then((response) => {
          this.opcionesMedico = [];
          response.data.results.map((e) => {
            this.opcionesMedico.push({
              value: e.id,
              label: e.first_name + " " + e.last_name,
            });
            return;
          });
        })
        .catch((err) => {
          console.log(err);
        });
    },
    edit() {
      //this.citaForm.fechayHora = this.citaForm.fechayHora.toLocaleString();
      this.citaForm.fechayHora.setMinutes(
        this.citaForm.fechayHora.getMinutes() -
          this.citaForm.fechayHora.getTimezoneOffset()
      );
      getAPI
        .put("/cita/" + this.id + "/", this.citaForm, {
          headers: { Authorization: `Bearer ${this.$store.getters.token}` },
        })
        .then(() => {
          this.close();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    close() {
      this.$emit("close");
    },
  },
};
</script>
<style>
</style>