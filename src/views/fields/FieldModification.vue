<template>
  <section>
    <el-card shadow="always">
      <h2>Modificar atributo</h2>
      <field-form :id="$route.params.id" @save-data="saveData"></field-form>
    </el-card>
  </section>
</template>

<script>
import FieldForm from '@/components/fields/FieldForm.vue';

export default {
  components: {
    FieldForm
  },
  methods: {
    saveData(data){
      this.$store.dispatch('fields/updateField', data);
      this.$router.replace('/fields');
    },
  },
};
</script>