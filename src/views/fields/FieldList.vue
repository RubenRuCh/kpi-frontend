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

    <ul v-if="isLoading || hasFields" v-loading="isLoading">
      <field-item
        v-for="field in requiredFields"
        :key="field.id"
        :id="field.id"
        :title="field.title"
        :description="field.description"
        :required="field.required"
      ></field-item>
    </ul>

    <h3 v-else>No se ha encontrado ningún atributo</h3>
  </el-card>
</template>

<script>
import FieldItem from '@/components/fields/FieldItem.vue';
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
    requiredFields() {
      return this.$store.getters['fields/fields'];
    },
    hasFields() {
      return !this.isLoading && this.$store.getters['fields/hasFields'];
    },
  },
  components: {
    FieldItem,
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
  },

  created() {
    this.loadFields();
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
