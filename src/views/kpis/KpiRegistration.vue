<template>
  <section>
    <el-card shadow="always">
      <h2>Crear un nuevo KPI</h2>
      <kpi-form @save-data="saveData"></kpi-form>
    </el-card>
  </section>
</template>

<script>
import KpiForm from '@/components/kpis/KpiForm.vue';

export default {
  components: {
    KpiForm
  },
  methods: {
    saveData(data){
      this.$store.dispatch('kpis/registerKpi', data);
      this.$router.replace('/kpis');
    },
  },
};
</script>