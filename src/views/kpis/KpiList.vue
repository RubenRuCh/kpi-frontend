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

    <el-table
      v-if="isLoading || hasKpis"
      v-loading="isLoading"
      stripe
      fit
      :data="
        enabledKpis.filter(
          (kpi) =>
            !search || kpi.title.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%; overflow: auto"
      max-height="500"
    >
      <el-table-column label="Código" prop="id" sortable></el-table-column>
      <el-table-column label="Nombre" prop="title" sortable></el-table-column>
      <el-table-column label="Descripción" prop="description"></el-table-column>

      <el-table-column align="right" min-width="250">
        <template #header>
          <el-input
            v-model="search"
            size="mini"
            placeholder="Buscar por nombre"
          />
        </template>
        <template #default="scope">
          <el-button
            type="success"
            plain
            @click="$router.push('/kpis/' + scope.row.id + '/registers')"
            >Ver registros</el-button
          >
          <el-button
            type="info"
            plain
            @click="$router.push('/kpis/' + scope.row.id)"
            >Ver detalles</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            @click="$router.push('/kpis/' + scope.row.id + '/edit')"
            >Modificar</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            @click="$router.push('/kpis/' + scope.row.id + '/delete')"
            >Eliminar</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-empty v-else description="No se ha encontrado ningún KPI"></el-empty>
  </el-card>
</template>

<script>
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
      search: '',
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
