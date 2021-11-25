<template>
  <div>
    <el-row: :gutter="15">
      <el-col :span="16">
        <el-card>
          <el-calendar v-model="date" />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card>
          <el-timeline>
            <el-timeline-item timestamp="2021-11-16" placement="top">
              <el-card>
                <h4 style="width: 100%">Rosa Gutierrez Lopez</h4>
                <p>Fecha 2021-11-16 08:30 am</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2021-11-19" placement="top">
              <el-card>
                <h4>Luis Miguel Sanches Perez</h4>
                <p>Fecha 2021-11-19 9:15 am</p>
              </el-card>
            </el-timeline-item>
            <el-timeline-item timestamp="2021-11-24" placement="top">
              <el-card>
                <h4>Jorge Antonio Carrazco Bardales</h4>
                <p>Fecha 2021-11-24 10:00am</p>
              </el-card>
            </el-timeline-item>
          </el-timeline>
        </el-card>
      </el-col>
    </el-row:>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  data() {
    return {
      date: new Date(),
      activities: [
        {
          content: "Paciente 1",
          timestamp: "2021-11-16",
        },
        {
          content: "Paciente 2",
          timestamp: "2021-11-19",
        },
        {
          content: "Paciente 3",
          timestamp: "2021-11-24",
        },
      ],
    };
  },
};
</script>
<style>
a {
  height: 800px;
}
</style>