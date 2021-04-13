<template>
  <el-card shadow="always">
    <section>
      <el-card shadow="hover">
        <h2>Características del indicador</h2>

        <section class="properties">
          <h3><el-tag>Nombre</el-tag> {{ selectedKpi.title }}</h3>
          <h3><el-tag>Descripción</el-tag> {{ selectedKpi.description }}</h3>
        </section>

        <h2>Atributos</h2>
        <section class="fields">
          <el-table
            v-if="selectedKpi.fields"
            :default-sort="{ prop: 'id', order: 'ascending' }"
            stripe
            fit
            :row-class-name="tableRowClassName"
            :data="
              selectedKpi.fields.filter(
                (field) =>
                  !search ||
                  field.title.toLowerCase().includes(search.toLowerCase())
              )
            "
            style="width: 100%;"
            max-height="600"
          >
            <el-table-column
              label="Código"
              prop="id"
              sortable
            ></el-table-column>
            <el-table-column
              label="Nombre"
              prop="title"
              sortable
            ></el-table-column>
            <el-table-column
              label="Descripción"
              prop="description"
              min-width="200"
            ></el-table-column>
            <el-table-column
              label="Valor"
              prop="value"
              sortable
            ></el-table-column>
            <el-table-column
              label="Requerido"
              prop="requiredText"
              sortable
            ></el-table-column>

            <el-table-column align="right">
              <template #header>
                <el-input
                  v-model="search"
                  size="mini"
                  placeholder="Buscar por nombre"
                />
              </template>
            </el-table-column>
          </el-table>

          <el-empty
            v-else
            description="No se ha encontrado ningún atributo para el indicador"
          ></el-empty>
        </section>
      </el-card>
    </section>

    <section>
      <el-card shadow="hover">
        <div class="actions">
          <base-badge
            v-if="selectedKpi.enabled"
            style="margin-right: auto"
            title="Activo"
            type="success"
          ></base-badge>

          <base-badge
            v-else
            style="margin-right: auto"
            title="Eliminado"
            type="info"
          ></base-badge>

          <el-button
            type="success"
            plain
            @click="$router.push($route.path + '/registers')"
            >Ver registros</el-button
          >
          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            @click="$router.push($route.path + '/edit')"
            >Modificar</el-button
          >
          <!-- TODO Click para mostrar modal y confirmar eliminacion / restauracion -->
          <el-button
            v-if="selectedKpi.enabled"
            type="danger"
            icon="el-icon-delete"
            plain
            @click="$router.push($route.path)"
            >Eliminar</el-button
          >
          <el-button
            v-else
            type="success"
            icon="el-icon-refresh"
            @click="$router.push($route.path)"
            >Restaurar</el-button
          >
        </div>
      </el-card>
    </section>
  </el-card>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {
      selectedKpi: null,
      search: '',
    };
  },
  methods: {
    tableRowClassName({ row }) {
      if (row.required) {
        return 'required-field';
      }
      return '';
    },
  },
  created() {
    this.selectedKpi = this.$store.getters['kpis/kpis'].find(
      (kpi) => kpi.id == this.id
    );
  },
};
</script>

<style>
.actions {
  display: flex;
  justify-content: flex-end;
}
.properties, .fields {
  text-align: justify;
  margin: auto;
  width: 50%;
  padding: 1rem;
}

.fields {
  width: 100%;
}

.el-table__row .required-field, .el-table .required-field {
  font-weight: bolder;
}
</style>
