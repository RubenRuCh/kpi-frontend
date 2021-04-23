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
      <kpi-item
        v-if="selectedKpi"
        :id="selectedKpi.id"
        :key="selectedKpi.id"
      ></kpi-item>

    <h2>Insertar registro</h2>
    <register-form :id="id" :columns="fillableFields" @save-data="saveData"></register-form>

    <hr />

    <h2>Registros</h2>

    <!-- <table>
      <tr>
        <th>ID</th>

        
        <th v-for="field in fillableFields" :key="field.id">{{ field.title + ': ' + field.value }}</th>

        <th>Valor</th>
      </tr>
      
      <tr v-for="register in registers" :key="register.id">
        <td>{{register.id}}</td>

        <td v-for="column in register.columns" :key="column.id">{{ column.value_label}}</td>

        <td>{{register.value}}</td>
      </tr>
    </table> -->

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

      <el-table-column v-for="field in fillableFields" 
                         :key="field.id"
                         :label="field.title + ': ' + field.value"
                         sortable
                         >

        <template #default="scope">
            {{ getColumnValue(scope.row, field) }}
        </template>

      </el-table-column>

      <el-table-column label="Valor" prop="value" sortable></el-table-column>

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
            type="primary"
            icon="el-icon-edit"
            plain
            @click="$router.push('/fields/' + scope.row.id + '/edit')"
            >Modificar</el-button
          >
        </template>
      </el-table-column>


    </el-table>

    <el-empty v-else description="No se ha encontrado ningún registro"></el-empty>
  </el-card>
</template>

<script>
import useNotify from "@/hooks/notify.js";

// Components
import RegisterForm from "@/components/registers/RegisterForm.vue";
import KpiItem from '@/components/kpis/KpiItem.vue';

export default {
  props: ['id'],
  components: {
    RegisterForm,
    KpiItem
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
      if(this.selectedKpi){
        const belongsToKpi = (register) => {
          return register.kpiId == this.selectedKpi.id;
        };

        return this.$store.getters["registers/registers"].filter(belongsToKpi);
      }
      return [];
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

    getColumnValue(register, field){
      var columnValue = null;

      for (const column of register.columns) {
        if(column.label == field.value) {
          columnValue = column.value_label;
          break;
        }
      }

      return columnValue;
    }
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
        console.log(this.fillableFields);
      }
    },

    registers: function(newValue){
      console.log('Registros:', newValue)
    }
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
