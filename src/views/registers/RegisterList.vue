<template>

  <el-card shadow="always" class="main-card">
    <h1>Registros del indicador {{ id }}</h1>

    <el-button type="primary" @click="kpiDialogVisible = true"
      >Datos del KPI</el-button
    >

    <br />
    <br />

    <!-- KPI details -->
    <el-dialog v-model="kpiDialogVisible" title="Datos del KPI" width="75%">
      <kpi-item
        v-if="selectedKpi"
        :id="selectedKpi.id"
        :key="selectedKpi.id"
      ></kpi-item>
    </el-dialog>

    <!-- Create dialog -->
    <el-dialog v-model="createDialogVisible" title="Crear registro" width="50%">
      <register-form
        :id="id"
        :columns="fillableFields"
        @save-data="saveRegister"
        @close-modal="handleCloseModal"
      ></register-form>
    </el-dialog>
    <!-- End Create dialog -->

    <!-- Update dialog -->
    <el-dialog
      v-model="updateDialogVisible"
      title="Editar registro"
      width="50%"
    >
      <register-form
        :key="selectedRegisterId"
        v-if="selectedRegisterId"
        :id="id"
        :registerid="selectedRegisterId"
        :columns="fillableFields"
        @save-data="updateRegister"
        @close-modal="handleCloseModal"
      ></register-form>
    </el-dialog>
    <!-- End Update dialog -->

    <!-- Buttons -->
    <el-card shadow="always">
      <h2>Registros</h2>
      <div class="controls">
        <el-button type="primary" v-if="!isLoading" @click="loadRegisters(true)"
          >Actualizar registros</el-button
        >
        <el-button type="primary" v-else :loading="isLoading"
          >Cargando...</el-button
        >
        <el-button type="primary" @click="createDialogVisible = true"
          >Nuevo registro</el-button
        >
      </div>

      <!-- Datatable show the Registers -->
      <el-table
        v-if="isLoading || hasRegisters"
        v-loading="isLoading"
        :default-sort="{ prop: 'id', order: 'ascending' }"
        stripe
        fit
        :data="
          registers.filter(
            (register) =>
              !search ||
              register.value.toLowerCase().includes(search.toLowerCase())
          )
        "
        style="width: 100%"
        max-height="600"
      >
        <!-- Colum ID -->
        <el-table-column label="Código" prop="id" sortable></el-table-column>

        <!-- Dinamic columns -->
        <el-table-column
          v-for="field in fillableFields"
          :key="field.id"
          :label="field.value"
          sortable
        >
          <template #default="scope">
            <span :key="scope.row.id">
              {{ getColumnValue(scope.row, field) }}
            </span>
          </template>
        </el-table-column>
        <!-- Colum Value -->
        <el-table-column label="Valor" prop="value" sortable></el-table-column>

        <!-- Colum Actions , search, update, delete -->
        <el-table-column align="right" min-width="150">
          <template #header>
            <el-input
              v-model="search"
              size="mini"
              placeholder="Buscar por Valor"
            />
          </template>
          <template #default="scope">
            <el-button
              type="primary"
              icon="el-icon-edit"
              plain
              @click="handleModify(scope.row.id)"
              >Modificar</el-button
            >

            <el-popconfirm
              @confirm="deleteRegister(scope.row.id)"
              :title="$t('confirm-delete-kpi')"
            >
              <template #reference>
                <el-button type="danger" icon="el-icon-delete" plain>{{
                  $t("delete")
                }}</el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
        <!-- END Colum Actions , search, update, delete -->

      </el-table>
      <!-- End Datatable show the Registers -->
      <el-empty
        v-else
        description="No se ha encontrado ningún registro"
      ></el-empty>
    </el-card>
  </el-card>
</template>

<script>
import useNotify from "@/hooks/notify.js";

// Components
import RegisterForm from "@/components/registers/RegisterForm.vue";
import KpiItem from "@/components/kpis/KpiItem.vue";

export default {
  props: ["id"],
  components: {
    RegisterForm,
    KpiItem,
  },
  setup() {
    const { notify } = useNotify();
    return { notify };
  },
  data() {
    return {
      registers: [],
      kpiDialogVisible: false,
      updateDialogVisible: false,
      createDialogVisible: false,
      isLoading: false,
      error: null,
      search: "",
      selectedKpi: null,
      fillableFields: [],
      selectedRegisterId: null,
    };
  },
  computed: {
    hasRegisters() {
      return !this.isLoading && this.registers.length > 0;
    },
  },
  methods: {
    /* Load Registers in datatable */
    async loadRegisters(refresh = false) {
      this.isLoading = true;

      try {
        await this.$store.dispatch("registers/loadRegisters", {
          forceRefresh: refresh,
        });

        this.filterRegisters();
      } catch (error) {
        this.error =
          error.message || "Algo ha salido mal durante la carga de los datos";

        this.notify("Ups...", `Error: ${this.error}`, "error");
      } finally {
        this.isLoading = false;
      }
    },

    filterRegisters() {
      if (!this.selectedKpi) return;

      const belongsToKpi = (register) => {
        return register.kpiId == this.selectedKpi.id;
      };

      this.registers = this.$store.getters["registers/registers"].filter(
        belongsToKpi
      );
    },

    handleError() {
      this.error = null;
    },

    handleCloseModal() {
      this.createDialogVisible = false;
      this.updateDialogVisible = false;
      this.kpiDialogVisible = false;
    },

    handleModify(registerId) {
      this.selectedRegisterId = registerId;
      this.updateDialogVisible = true;
    },

    refreshRegisters() {
      return setTimeout(() => {
        this.loadRegisters(true);
      }, 150);
    },

    /* Save Registers */
    saveRegister(data) {
      this.$store.dispatch("registers/registerRegister", data);

      this.refreshRegisters();
    },

    /* Update Registers */
    updateRegister(data) {
      this.$store.dispatch("registers/updateRegister", data);

      this.refreshRegisters();
    },

    /* Delete Registers  */
    deleteRegister(id) {
      this.$store.dispatch("registers/deleteRegister", { id });

      this.notify(
        "Registro eliminado",
        "Se ha eliminado correctamente el registro nº" + id,
        "success"
      );
      this.refreshRegisters();
    },

    getColumnValue(register, field) {
      var columnValue = null;

      for (const column of register.columns) {
        if (column.value == field.value) {
          columnValue = column.value_label;
          break;
        }
      }

      return columnValue;
    },
  }, // END MEthods

  async created() {
    // Make sure we have all kpis loaded when we enter here
    await this.$store.dispatch("kpis/loadKpis", { forceRefresh: true });

    this.selectedKpi = this.$store.getters["kpis/kpis"].find(
      (kpi) => kpi.id == this.id
    );

    this.loadRegisters();
  },
  watch: {
    selectedKpi: function (newValue) {
      if (newValue) {
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
