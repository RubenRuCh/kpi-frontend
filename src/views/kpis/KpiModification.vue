<template>
  <section>
    <el-card shadow="always">
      <h2>{{$t('modify-kpi')}}</h2>
      <kpi-form :id="$route.params.id" @save-data="saveData"></kpi-form>
    </el-card>
  </section>
</template>

<script>
import KpiForm from "@/components/kpis/KpiForm.vue";

export default {
  components: {
    KpiForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch("kpis/updateKpi", data);
      this.$router.replace(`/kpis/${this.$route.params.id}`);
    },
  },
};
</script>
