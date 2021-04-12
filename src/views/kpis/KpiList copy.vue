<template>
  <el-card shadow="always">
    <div class="controls">
      <el-button type="primary" v-if="!isLoading" @click="loadKpis(true)"
        >Actualizar datos</el-button
      >
      <el-button type="primary" v-else :loading="isLoading"
        >Cargando...</el-button
      >
    </div>

    <ul v-if="isLoading || hasKpis" v-loading="isLoading">
      <kpi-item
        v-for="kpi in enabledKpis"
        :key="kpi.id"
        :id="kpi.id"
        :title="kpi.title"
        :description="kpi.description"
        :enabled="kpi.enabled"
      ></kpi-item>
    </ul>

    <el-empty v-else description="No se ha encontrado ningún KPI"></el-empty>
  </el-card>
</template>

<script>
import KpiItem from '@/components/kpis/KpiItem.vue';
import useNotify from '@/hooks/notify.js';

export default {
  setup() {
    const { notify } = useNotify();

    return { notify };
  },
  data() {
    return {
      isLoading: false,
      error: null,
    };
  },
  computed: {
    enabledKpis() {
      return this.$store.getters['kpis/enabledKpis'];
    },
    hasKpis() {
      return !this.isLoading && this.$store.getters['kpis/hasKpis'];
    },
  },
  components: {
    KpiItem,
  },
  methods: {
    async loadKpis(refresh = false) {
      this.isLoading = true;

      try {
        await this.$store.dispatch('kpis/loadKpis', {
          forceRefresh: refresh,
        });
        if (refresh) {
          this.notify(
            'KPIs actualizados',
            'Se ha actualizado correctamente la lista de indicadores',
            'success'
          );
        }
      } catch (error) {
        this.error =
          error.message || 'Algo ha salido mal durante la carga de los datos';

        this.notify('Ups...', `Error: ${this.error}`, 'error');
      }

      this.isLoading = false;
    },

    handleError() {
      this.error = null;
    },
  },

  created() {
    this.loadKpis();
  },
};
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>
