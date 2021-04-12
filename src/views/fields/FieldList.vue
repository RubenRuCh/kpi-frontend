<template>
  <el-card shadow="always">
    <div class="controls">
      <el-button type="primary" v-if="!isLoading" @click="loadFields(true)"
        >Actualizar datos</el-button
      >
      <el-button type="primary" v-else :loading="isLoading"
        >Cargando...</el-button
      >
    </div>

    <el-table
      v-if="isLoading || hasFields"
      v-loading="isLoading"
      stripe
      fit
      :data="
        fields.filter(
          (field) =>
            !search || field.title.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%; overflow: auto"
      max-height="500"
      :row-class-name="tableRowClassName"
    >
      <el-table-column label="Código" prop="id" sortable></el-table-column>
      <el-table-column label="Nombre" prop="title" sortable></el-table-column>
      <el-table-column label="Descripción" prop="description"></el-table-column>
      <el-table-column label="Requerido" prop="requiredText" sortable></el-table-column>

      <el-table-column align="right" min-width="150">
        <template #header>
          <el-input
            v-model="search"
            size="mini"
            placeholder="Buscar por nombre"
          />
        </template>
        <template #default="scope">
          <el-button
            type="info"
            plain
            @click="$router.push('/fields/' + scope.row.id)"
            >Ver detalles</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            @click="$router.push('/fields/' + scope.row.id + '/edit')"
            >Modificar</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            disabled
            @click="$router.push('/fields/' + scope.row.id + '/delete')"
            >Eliminar</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-empty
      v-else
      description="No se ha encontrado ningún atributo"
    ></el-empty>
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
    fields() {
      return this.$store.getters['fields/fields'];
    },
    hasFields() {
      return !this.isLoading && this.$store.getters['fields/hasFields'];
    },
  },
  methods: {
    async loadFields(refresh = false) {
      this.isLoading = true;

      try {
        await this.$store.dispatch('fields/loadFields', {
          forceRefresh: refresh,
        });
        if (refresh) {
          this.notify(
            'Atributos actualizados',
            'Se ha actualizado correctamente la lista de atributos',
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
    tableRowClassName({row}) {
        if (row.required) {
          return 'required-field';
        } 
        return '';
      }
  }, // methods

  created() {
    this.loadFields();
  },
};
</script>

<style>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
.el-table .required-field {
  background-color: rgba(0, 252, 0, 0.2);
  font-weight: bolder;
}
</style>
