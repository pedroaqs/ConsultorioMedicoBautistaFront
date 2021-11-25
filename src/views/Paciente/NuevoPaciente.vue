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
          <el-button @click="create"> Guardar </el-button>
        </el-row>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import { getAPI } from "@/api/axios";

export default {
  name: "NuevoPaciente",
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
  methods: {
    create() {
      this.$emit("changeloader");
      getAPI
        .post("/paciente/", this.pacienteForm, {
          headers: { Authorization: `Bearer ${this.$store.getters.token}` },
        })
        .then((response) => {
          console.log(response);
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
  },
};
</script>
<style>
</style>