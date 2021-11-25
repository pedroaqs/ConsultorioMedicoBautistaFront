<template>
  <div>
    <el-row justify="center">
      <el-col :span="18">
        <h1>Detalles de la consulta</h1>
      </el-col>

      <el-col :span="6">
        <el-button @click="print" plain type="success">Imprimir</el-button>
      </el-col>
    </el-row>
    <el-descriptions :column="3" border direction="vertical">
      <el-descriptions-item
        label="Médico"
        label-align="left"
        align="center"
        :span="2"
      >
        {{ formConsulta.medico.first_name }} {{ formConsulta.medico.last_name }}
      </el-descriptions-item>
      <el-descriptions-item
        label="E-mail Médico"
        label-align="left"
        align="center"
        label-class-name="my-label"
        :span="1"
      >
        {{ formConsulta.medico.email }}
      </el-descriptions-item>
      <el-descriptions-item
        label="Paciente"
        label-align="left"
        align="center"
        label-class-name="my-label"
        :span="3"
      >
        {{ formConsulta.paciente.nombres }}
        {{ formConsulta.paciente.apellidoP }}
        {{ formConsulta.paciente.apellidoM }}
      </el-descriptions-item>

      <el-descriptions-item
        label="Temperatura"
        label-align="left"
        align="center"
      >
        {{ formConsulta.temperatura }}
      </el-descriptions-item>
      <el-descriptions-item
        label="Presion Arterial"
        label-align="left"
        align="center"
      >
        {{ formConsulta.presionArterial }}
      </el-descriptions-item>
      <el-descriptions-item label="Peso" label-align="left" align="center">
        {{ formConsulta.peso }}
      </el-descriptions-item>
      <el-descriptions-item
        label="Descripción"
        label-align="left"
        align="left"
        :span="3"
      >
        {{ formConsulta.descripcion }}
      </el-descriptions-item>
      <el-descriptions-item
        label="Prescripción"
        label-align="left"
        align="left"
        :span="3"
      >
        {{ formConsulta.prescripcion }}
      </el-descriptions-item>
    </el-descriptions>
  </div>
</template>
<script>
import { getAPI } from "@/api/axios";

import { Printd } from "printd";

const cssText = `
  button{
      display: none;
  }

`;

const d = new Printd();

export default {
  name: "ViewConsulta",
  props: {
    idConsulta: Number,
  },
  data() {
    return {
      formConsulta: {
        viaCita: false,
        fechayHora: "",
        temperatura: "",
        peso: "",
        presionArterial: "",
        motivo: "",
        descripcion: "",
        prescripcion: "",
        paciente: {
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
        medico: {
          id: "",
          is_superuser: "",
          username: "",
          first_name: "",
          last_name: "",
          email: "",
        },
        cita: "",
      },
    };
  },
  created() {
    this.getConsulta();
    //var style = document.defaultView.getComputedStyle(this.$el);
    //console.log(style);
  },
  methods: {
    getConsulta() {
      getAPI
        .get("/consulta-medica/" + this.idConsulta + "/", {
          headers: { Authorization: `Bearer ${this.$store.getters.token}` },
        })
        .then((response) => {
          this.formConsulta = response.data;
          this.getPaciente();
          this.getMedico();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPaciente() {
      getAPI
        .get("/paciente/" + this.formConsulta.paciente + "/", {
          headers: { Authorization: `Bearer ${this.$store.getters.token}` },
        })
        .then((response) => {
          response.data.consultas = null;
          this.formConsulta.paciente = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getMedico() {
      getAPI
        .get("/user-v/" + this.formConsulta.medico + "/", {
          headers: { Authorization: `Bearer ${this.$store.getters.token}` },
        })
        .then((response) => {
          this.formConsulta.medico = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    print() {
      console.log(this.$el.style);

      d.print(this.$el, [cssText]);
    },
  },
};
</script>
<style>
@media print {
  button {
    display: none;
  }
}
</style>