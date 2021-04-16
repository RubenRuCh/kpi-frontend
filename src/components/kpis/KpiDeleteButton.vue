<template>
  <!-- Delete popconfirm -->
  <el-popconfirm
    @confirm="deleteKpi(selectedKpi.id)"
    v-if="selectedKpi.enabled"
    title="¿Estás seguro/a de querer borrar este indicador?"
  >
    <template #reference>
      <el-button type="danger" icon="el-icon-delete" plain>Eliminar</el-button>
    </template>
  </el-popconfirm>

  <!-- Restore popconfirm -->
  <el-popconfirm
    @confirm="restoreKpi(selectedKpi.id)"
    v-else
    title="¿Estás seguro/a de querer restaurar este indicador?"
  >
    <template #reference>
      <el-button type="success" icon="el-icon-refresh">Restaurar</el-button>
    </template>
  </el-popconfirm>
</template>

<script>
export default {
  props: ["id"],
  data() {
    return {
      selectedKpi: null,
    };
  },
  methods: {
    deleteKpi(id) {
      this.$store.dispatch("kpis/disableKpi", { id });
    },
    restoreKpi(id) {
      this.$store.dispatch("kpis/enableKpi", { id });
    },
  },
  created() {
    this.selectedKpi = this.$store.getters["kpis/kpis"].find(
      (kpi) => kpi.id == this.id
    );
  },
};
</script>

<style></style>
