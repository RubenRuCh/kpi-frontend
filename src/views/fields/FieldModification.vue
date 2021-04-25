<template>
  <section>
    <el-card shadow="always">
      <h2>{{ $t('modify-field') }}</h2>
      <field-form :id="$route.params.id" @save-data="saveData"></field-form>
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
    async saveData(data) {
      await this.$store.dispatch("fields/updateField", data);

      // Load Kpis again to make sure changes in fields propagate through app
      await this.$store.dispatch("kpis/loadKpis", {
        forceRefresh: true,
      });
      this.$router.replace(`/fields/${this.$route.params.id}`);
    },
  },
};
</script>
