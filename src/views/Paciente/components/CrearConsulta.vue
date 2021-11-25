<template>
  <div>
    <el-form label-position="top">
      <el-form-item label="Via cita">
        <el-radio v-model="formConsulta.viaCita" :label="true">Si</el-radio>
        <el-radio v-model="formConsulta.viaCita" :label="false">No</el-radio>
      </el-form-item>
      <el-form-item v-if="formConsulta.viaCita" label="Seleccione la cita">
        <el-select
          v-model="formConsulta.cita"
          style="width: 240px"
          filterable
          remote
          clearable
          placeholder="Seleccione"
        >
          <el-option
            v-for="item in citas"
            :key="item.id"
            :label="new Date(item.fechayHora).toLocaleString()"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="Temperatura">
              <el-input v-model="formConsulta.temperatura"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Presion Arterial">
              <el-input v-model="formConsulta.presionArterial"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Peso">
              <el-input v-model="formConsulta.peso"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="Motivo">
        <el-input v-model="formConsulta.motivo"></el-input>
      </el-form-item>
      <el-form-item label="Descripción de la consulta">
        <el-input
          v-model="formConsulta.descripcion"
          autosize
          type="textarea"
          placeholder="Descripcion y observaciones de la consulta."
        ></el-input>
      </el-form-item>
      <el-form-item label="Prescripción">
        <el-input
          v-model="formConsulta.prescripcion"
          autosize
          type="textarea"
          placeholder="Prescripción/ Receta"
        ></el-input>
      </el-form-item>
      <el-row justify="center">
        <el-form-item>
          <el-button @click="onClose">Cancelar</el-button>
          <el-button @click="createConsulta">Guardar</el-button>
        </el-form-item>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { getAPI } from "@/api/axios";

export default {
  name: "NewConsulta",
  props: {
    idPaciente: Number,
    dniPaciente: String,
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
        paciente: "",
        medico: "",
        cita: "",
      },
      citas: [],
    };
  },
  created() {
    this.getCitas();
  },
  methods: {
    getCitas() {
      getAPI
        .get("/cita/?search=" + this.dniPaciente, {
          headers: { Authorization: `Bearer ${this.$store.getters.token}` },
        })
        .then((response) => {
          this.citas = response.data.results;
        })
        .catch((err) => {
          console.log(err);
        });
    },
    createConsulta() {
      if (this.formConsulta.viaCita == false) {
        this.formConsulta.cita = null;
      }
      this.formConsulta.paciente = this.idPaciente;
      getAPI
        .post("/consulta-medica/", this.formConsulta, {
          headers: { Authorization: `Bearer ${this.$store.getters.token}` },
        })
        .then((response) => {
          console.log(response);
          this.onClose();
        })
        .catch((err) => {
          console.log(err);
        });
    },
    onClose() {
      this.$emit("close");
    },
  },
};
</script>