<template>
  <div>
    <el-form>
      <el-form-item>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="Nombres">
              <el-input v-model="pacienteForm.nombres"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Apellido Paterno">
              <el-input v-model="pacienteForm.apellidoP"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Apellido Materno">
              <el-input v-model="pacienteForm.apellidoM"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="10">
          <el-col :span="8">
            <el-form-item label="DNI">
              <el-input v-model="pacienteForm.dni"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="N° de telefono">
              <el-input v-model="pacienteForm.telefono"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="Fecha de Nacimiento">
              <el-date-picker
                value-format="YYYY-MM-DD"
                v-model="pacienteForm.fechaNacimiento"
                type="date"
                placeholder="Pick a day"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="Dirección">
        <el-input v-model="pacienteForm.direccion"></el-input>
      </el-form-item>
      <el-form-item>
        <el-row justify="center">
          <el-button @click="close"> Cancelar </el-button>
          <el-button @click="edit"> Guardar </el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getAPI } from "@/api/axios";

export default {
  name: "EditarPaciente",
  props: {
    id: Number,
  },
  data() {
    return {
      pacienteForm: {
        nombres: "",
        apellidoP: "",
        apellidoM: "",
        dni: "",
        telefono: "",
        direccion: "",
        fechaNacimiento: "",
      },
    };
  },
  created() {
    this.getPaciente();
  },
  methods: {
    edit() {
      this.$emit("changeloader");
      getAPI
        .put("/paciente/" + this.id + "/", this.pacienteForm, {
          headers: { Authorization: `Bearer ${this.$store.getters.token}` },
        })
        .then(() => {
          this.close();
        })
        .catch((error) => {
          this.$emit("changeloader");
          console.log(error);
        });
    },
    close() {
      this.$emit("close");
    },
    getPaciente() {
      getAPI
        .get("/paciente/" + this.id, {
          headers: { Authorization: `Bearer ${this.$store.getters.token}` },
        })
        .then((response) => {
          this.pacienteForm = response.data;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
<style>
</style>