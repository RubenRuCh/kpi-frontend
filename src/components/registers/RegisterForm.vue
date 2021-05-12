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
          :prop="'columns.' + index + '.value_label'"
          :rules="[
          {
            required: true,
            message: $t('register-input-value'),
            trigger: 'blur',
          },
          {
            min: 1,
            max: 255,
            message: $t('field-description-length'),
            trigger: ['blur', 'change'],
          },
        ]"

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
            message: $t('register-correct-value'),
            trigger: 'blur',
          },
          {
            min: 1,
            max: 255,
            message: $t('field-description-length'),
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model="form.value" role="input-field-value"></el-input>
      </el-form-item>

      <!-- Form submit / cancel -->
      <el-form-item>
        <el-button type="primary" @click="submitForm">
          {{ submitText }}
        </el-button>
        <el-button @click="cancelForm">{{$t('cancel')}}</el-button>
      </el-form-item>

    </el-form>
  </section>
</template>

<script>
import useNotify from "@/hooks/notify.js";

export default {
  props: ["id", "registerid", "columns"],
  emits: ["save-data", "close-modal"],
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
      return this.registerid ? this.$t('update-register') : this.$t('create-register');
    },
    notifyMessage() {
      return this.registerid
        ? this.$t('update-register-success')
        : this.$t('create-register-success');
    },
    notifyTitle() {
      return this.registerid
        ? `${this.$t('updated-register')}: ${this.registerid}`
        : `${this.$t('new-register')}`;
    },
  },
  methods: {
    async setupForm() {
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
            this.notify( `${this.$t('error')}`, `${this.$t('register-not-found')}`, "error");
            this.$router.replace("/registers");
          }

        }
    },
    submitForm() {
      this.$refs["registerForm"].validate((valid) => {
        if (valid) {
          this.form.kpiId = this.id;
          this.$emit("save-data", this.form);
          this.$emit("close-modal");

          this.notify(this.notifyTitle, this.notifyMessage, "success");
        
          // Reset form
          for (const column of this.form.columns) {
            column.value_label = '';
          }

          this.form.value = '';

        } else {
          this.notify(
            this.$t('error'),
            this.$t('form-not-valid'),
            'error'
          );

          return false;
        }
      });
    },cancelForm(){
      this.$emit("close-modal");
      // Reset form
      for (const column of this.form.columns) {
            column.value_label = '';
          }
          this.form.value = '';
    },
    /* Rules for input registers */
    getFieldRules() {
      const rules = [];

      rules.push({
        required: true,
        message: 'Este campo es obligatorio a la hora de crear un registro',
        trigger: ["blur", "change"],
      });
      

      rules.push({
        min: 1,
        max: 255,
        message: 'La longitud de este campo debe estar entre 1 y 255',
        trigger: ["blur", "change"],
      });
      
      return rules;
    },
  },

  created() {
    this.setupForm();
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
