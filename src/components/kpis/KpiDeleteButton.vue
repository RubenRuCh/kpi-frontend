<template>
  <!-- Delete popconfirm -->
  <el-popconfirm
    @confirm="deleteKpi(selectedKpi.id)"
    v-if="selectedKpi.enabled"
    :title="$t('confirm-delete-kpi')"
  >
    <template #reference>
      <el-button type="danger" icon="el-icon-delete" plain>{{$t('delete')}}</el-button>
    </template>
  </el-popconfirm>

  <!-- Restore popconfirm -->
  <el-popconfirm
    @confirm="restoreKpi(selectedKpi.id)"
    v-else
    :title="$t('confirm-restore-kpi')"
  >
    <template #reference>
      <el-button type="success" icon="el-icon-refresh">{{$t('restore')}}</el-button>
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
