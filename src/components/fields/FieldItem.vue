<template>
  <li>
    <el-card shadow="hover">
      <h3>{{ title }}</h3>
      <h4>{{ description }}</h4>
      <div class="actions">
        <el-tooltip
          v-if="required"
          class="item"
          effect="dark"
          content="Los atributos obligatorios deberán aparecer en todos los KPI de nueva creación"
          placement="top-start"
        >
          <base-badge
            style="margin-right: auto"
            v-if="required"
            title="Atributo obligatorio"
            type="warning"
          ></base-badge>
        </el-tooltip>

        <el-button type="info" plain @click="$router.push(detailUrl)"
          >Ver detalles</el-button
        >
        <el-button
          type="primary"
          icon="el-icon-edit"
          plain
          @click="$router.push(editUrl)"
          >Modificar</el-button
        >
        <el-button
          type="danger"
          icon="el-icon-delete"
          plain
          disabled
          @click="$router.push(deleteUrl)"
          >Eliminar</el-button
        >
      </div>
    </el-card>
  </li>
</template>

<script>
export default {
  props: ["id", "title", "description", "required"],
  computed: {
    deleteUrl() {
      return `/fields/${this.id}/delete`;
    },
    editUrl() {
      return `/fields/${this.id}/edit`;
    },
    detailUrl() {
      return `/fields/${this.id}`;
    },
  },
};
</script>

<style scoped>
li {
  margin: 1rem 0;
  /* border: 1px solid #424242; */
  border-radius: 12px;
  padding: 0.5rem;
}

h3 {
  font-size: 1.5rem;
}

h3,
h4 {
  margin: 0.5rem 0;
}

div {
  margin: 0.5rem 0;
  background-color: rgb(248, 248, 248);
}

.actions {
  display: flex;
  justify-content: flex-end;
}
</style>
