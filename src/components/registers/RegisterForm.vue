<template>
  <section>
    <!-- Register form -->
    <el-form
      ref="registerForm"
      :model="form"
      label-width="auto"
      class="demo-dynamic"
    >

      <!-- Columns  -->
        <el-form-item
          v-for="(column, index) in form.columns"
          :key="column.id"
          :label="column.value"
          :prop="'columns.' + index + '.value'"
          :rules="getFieldRules(column)"
        >
          <template #label>
            {{ column.value }}
          </template>

          <!-- Text and textarea -->
          <el-input
            type="text"
            v-model="column.value_label"
          ></el-input>
        </el-form-item>


      <el-form-item
        label="Valor"
        prop="value"
        class="required"
        :rules="[
          {
            required: true,
            message: 'Por favor, introduce un valor para el registro',
            trigger: 'blur',
          },
          {
            min: 4,
            max: 255,
            message: 'Por favor, introduce un valor entre 4 y 255 caracteres',
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model="form.value"></el-input>
      </el-form-item>

      <!-- Form submit / cancel -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">
          {{ submitText }}
        </el-button>
        <!-- <el-button @click="$router.replace('/registers')">Cancelar</el-button> -->
      </el-form-item>

    </el-form>
  </section>
</template>

<script>
import useNotify from "@/hooks/notify.js";

export default {
  props: ["id", "registerid", "columns"],
  emits: ["save-data"],
  setup() {
    const { notify } = useNotify();

    return { notify };
  },
  data() {
    return {
      form: {
        value: "",
        columns: [],
      },
    };
  },
  computed: {
    submitText() {
      return this.registerid ? "Actualizar registro" : "Crear registro";
    },
    notifyMessage() {
      return this.registerid
        ? "El registro ha sido modificado correctamente"
        : "Se ha creado el nuevo registro correctamente";
    },
    notifyTitle() {
      return this.registerid
        ? `Indicador actualizado: ${this.form.title}`
        : `Nuevo registro: ${this.form.title}`;
    },
  },
  methods: {
    submitForm() {
      this.$refs["registerForm"].validate((valid) => {
        if (valid) {
          this.form.kpiId = this.id;
          this.$emit("save-data", this.form);

          this.notify(this.notifyTitle, this.notifyMessage, "success");
        } else {
          this.notify(
            `Error`,
            "El formulario no es válido. Revisa que todos los campos han sido correctamente completados",
            "error"
          );

          return false;
        }
      });
    },
    getFieldRules(column) {
      const rules = [];

      // Required columns
      if (column.required) {
        rules.push({
          required: true,
          message: `Actualmente el atributo ${column.title} es obligatorio a la hora de crear un KPI`,
          trigger: ["blur", "change"],
        });
      }

      // Fields with lenght limit
      if (column.maxlength) {
        rules.push({
          max: column.maxlength,
          message: `La longitud máxima de este atributo es de ${column.maxlength}`,
          trigger: ["blur", "change"],
        });
      }

      // Fields type number
      if (column.type == "number") {
        rules.push({
          type: "number",
          max: 20,
          message: `Deber ser un número`,
          trigger: "change",
        });
      }

      return rules;
    },
  },

  async created() {
    var registerId = null;
   if (this.registerid) registerId = this.registerid;
    // First, make sure we have updated fields available and loaded in Vuex
    await this.$store.dispatch("fields/loadFields", { forceRefresh: true });

    this.form.columns = this.columns;

    // If id exist, mean this is an update or clone form
    if (registerId) {
      // Make sure id passed by url actually exist
      try {
        // Clone Register instead of editing it directly
        this.form = JSON.parse(
          JSON.stringify(
            this.$store.getters["registers/registers"].find((register) => register.id == registerId)
          )
        );
      } catch (e) {
        this.notify("Error", "El registro buscado no existe", "error");
        this.$router.replace("/registers");
      }

      // Finally, sort columns array by id
      this.form.columns.sort(function (a, b) {
        return (
          a.id - b.id 
        );
      });
      
    }
  },
};
</script>

<style scoped>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
.required {
  font-weight: bolder;
}

</style>
