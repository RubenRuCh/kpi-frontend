<template>
  <section>
    <el-card shadow="always">
      <h2>Crear un nuevo atributo para los KPI</h2>
      <field-form @save-data="saveData"></field-form>
    </el-card>
  </section>
</template>

<script>
import FieldForm from "@/components/fields/FieldForm.vue";

export default {
  components: {
    FieldForm,
  },
  methods: {
    saveData(data) {
      this.$store.dispatch("fields/registerField", data);
      this.$router.replace("/fields");
    },
  },
};
</script>
