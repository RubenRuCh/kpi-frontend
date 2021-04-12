<template>
  <el-card shadow="always">
    <section>
      <el-card shadow="hover">
        <h2>Características del atributo</h2>

        <section class="properties">
          <h3><el-tag>Título</el-tag> {{ selectedField.title }}</h3>
          <h3><el-tag>Descripción</el-tag> {{ selectedField.description }}</h3>

          <h4 v-if="selectedField.type">
            <el-tag type="success">Tipo de atributo</el-tag>
            {{ selectedField.type }}
          </h4>

          <h4 v-if="selectedField.maxlength && selectedField.maxlength > 0">
            <el-tag type="success">Longitud máxima</el-tag>
            {{ selectedField.maxlength }} caracteres
          </h4>

          <h4 v-if="selectedField.values">
            <el-tag type="danger">Valores disponibles</el-tag>
            <el-badge v-for="value in selectedField.values" :key="value"
              ><el-button size="small">{{ value }}</el-button></el-badge
            >
          </h4>
        </section>
      </el-card>
    </section>

    <section>
      <el-card shadow="hover">
        <div class="actions">
          <el-tooltip
            v-if="selectedField.required"
            class="item"
            effect="dark"
            content="Los atributos obligatorios deberán aparecer en todos los KPI de nueva creación"
            placement="top-start"
          >
            <base-badge
              style="margin-right: auto"
              v-if="selectedField.required"
              title="Atributo obligatorio"
              type="warning"
            ></base-badge>
          </el-tooltip>

          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            @click="$router.push($route.path + '/edit')"
            >Modificar</el-button
          >
          <el-button
            type="danger"
            icon="el-icon-delete"
            plain
            disabled
            @click="$router.push($route.path + '/deleted')"
            >Eliminar</el-button
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
      selectedField: null,
    };
  },
  computed: {
    contactLink() {
      return this.$route.path;
    },
  },
  created() {
    this.selectedField = this.$store.getters['fields/fields'].find(
      (field) => field.id == this.id
    );
  },
};
</script>

<style scoped>
.actions {
  display: flex;
  justify-content: flex-end;
}
.properties {
  text-align: justify;
  margin: auto;
  width: 50%;
  padding: 1rem;
}
</style>
