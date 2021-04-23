<template>
  <el-card shadow="always" class="main-card">
    <div class="controls">
      <el-button type="primary" v-if="!isLoading" @click="loadRegisters(true)"
        >Actualizar registros</el-button
      >
      <el-button type="primary" v-else :loading="isLoading"
        >Cargando...</el-button
      >
      <el-button type="primary" @click="$router.push($route.path + '/create')"
        >Nuevo registro</el-button
      >
    </div>
    <h1>Registros del indicador {{id}} </h1>

    <h2>Datos KPI</h2>
    <div v-if="selectedKpi">
      <div>
        {{ selectedKpi.title }}
        {{ selectedKpi.descripcion }}
      </div>
    </div>

    <hr/>

    <h2>Insertar registro</h2>
    <register-form :id="id" :columns="fillableFields" @save-data="saveData"></register-form>

    <hr />

    <h2>Registros</h2>
    <table>
      <tr v-for="register in registers" :key="register.id">
        <th>
          Valor: {{register.value}}
        </th>
      </tr>
    </table>






<!-- 
    <el-table
      v-if="isLoading || hasRegisters"
      v-loading="isLoading"
      :default-sort="{ prop: 'id', order: 'ascending' }"
      stripe
      fit
      :data="
        registers.filter(
          (register) =>
            !search || register.title.toLowerCase().includes(search.toLowerCase())
        )
      "
      style="width: 100%"
      max-height="600"
    >
      <el-table-column label="Código" prop="id" sortable></el-table-column>
      <el-table-column label="Nombre" prop="title" sortable></el-table-column>
      <el-table-column
        label="Descripción"
        prop="description"
        min-width="200"
      ></el-table-column>

      <el-table-column align="right" min-width="200">
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
            @click="$router.push('/registers/' + scope.row.id + '/registers')"
            >Ver registros</el-button
          >
          <el-button
            type="info"
            plain
            @click="$router.push('/registers/' + scope.row.id)"
            >Ver detalles</el-button
          >

          <el-button
            type="primary"
            icon="el-icon-edit"
            plain
            @click="$router.push('/registers/' + scope.row.id + '/edit')"
            >Modificar</el-button
          >
        </template>
      </el-table-column>
    </el-table>

    <el-empty v-else description="No se ha encontrado ningún Registro"></el-empty> -->
  </el-card>
</template>

<script>
import useNotify from "@/hooks/notify.js";
import RegisterForm from "@/components/registers/RegisterForm.vue";

export default {
  props: ['id'],
  components: {
    RegisterForm
  },
  setup() {
    const { notify } = useNotify();

    return { notify };
  },
  data() {
    return {
      isLoading: false,
      error: null,
      search: "",
      selectedKpi: null,
      fillableFields: [],
    };
  },
  computed: {
    registers() {
      const belongsToKpi = (register) => {
        return register.kpiId == this.selectedKpi.id;
      };

      return this.$store.getters["registers/registers"].filter(belongsToKpi);
    },
    hasRegisters() {
      return !this.isLoading && this.registers.length > 0;
    },
  },
  methods: {
    async loadRegisters(refresh = false) {
      this.isLoading = true;

      try {
        await this.$store.dispatch("registers/loadRegisters", {
          forceRefresh: refresh,
        });
        if (refresh) {
          this.notify(
            "Registros actualizados",
            "Se ha actualizado correctamente la lista de registros",
            "success"
          );
        }
      } catch (error) {
        this.error =
          error.message || "Algo ha salido mal durante la carga de los datos";

        this.notify("Ups...", `Error: ${this.error}`, "error");
      } finally {
        this.isLoading = false;
      }
    },

    handleError() {
      this.error = null;
    },

    saveData(data) {
      this.$store.dispatch("registers/registerRegister", data);
    },
  },
  created() {
    this.loadRegisters();

    this.selectedKpi = this.$store.getters["kpis/kpis"].find(
      (kpi) => kpi.id == this.id
    );
  },
  watch: {
    selectedKpi: function(newValue){
      if(newValue){
        this.fillableFields = newValue.fields.filter((field) => field.fillable);
      }
    },
  },
};
</script>

<style scoped>
.controls {
  display: flex;
  justify-content: space-between;
}
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}
</style>
