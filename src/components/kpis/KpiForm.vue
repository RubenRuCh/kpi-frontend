<template>
  <section>
    <!-- Add unrequired fields -->
    <el-card shadow="hover">
      <el-select
        v-model="choosenUnrequiredFields"
        multiple
        :placeholder="$t('add-more-fields')"
        style="margin-right: 1rem"
      >
        <el-option
          v-for="unrequiredField in availableUnrequiredFields"
          :key="unrequiredField.id"
          :label="unrequiredField.title"
          :value="unrequiredField.id"
        >
          <span style="float: left">{{ unrequiredField.title }}</span>
          <span style="float: right; color: #8492a6; font-size: 13px">
            {{ unrequiredField.id }}
          </span>
        </el-option>
      </el-select>

      <el-button
        @click="addUnrequiredFields"
        type="success"
        icon="el-icon-check"
        circle
      ></el-button>
    </el-card>
    <br />

    <!-- KPI form -->
    <el-form
      ref="kpiForm"
      :model="form"
      label-width="auto"
      class="demo-dynamic"
    >
      <el-form-item
        :label="$t('title')"
        prop="title"
        class="required"
        :rules="[
          {
            required: true,
            message: $t('kpi-title-needed'),
            trigger: 'blur',
          },
          {
            min: 4,
            max: 255,
            message: $t('kpi-title-length'),
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input v-model="form.title" role="input-kpi-title"></el-input>
      </el-form-item>

      <el-form-item
        :label="$t('description')"
        prop="description"
        class="required"
        :rules="[
          {
            required: true,
            message: $t('kpi-description-needed'),
            trigger: 'blur',
          },
          {
            min: 1,
            message:
              $t('kpi-description-length'),
            trigger: ['blur', 'change'],
          },
        ]"
      >
        <el-input type="textarea" v-model="form.description"></el-input>
      </el-form-item>

      <!-- Choosen fields  -->
      <transition-group name="field" mode="out-in">
        <el-form-item
          v-for="(field, index) in form.fields"
          :key="field.id"
          :label="field.title"
          :prop="'fields.' + index + '.value'"
          :rules="getFieldRules(field)"
          :class="field.required ? 'required' : ''"
        >
          <template #label>
            {{ field.title }}

            <el-button
              v-if="!field.required"
              @click="resetUnrequiredField(field)"
              type="danger"
              icon="el-icon-delete"
              circle
              style="margin-left: 1rem"
            ></el-button>
          </template>

          <!-- Text and textarea -->
          <el-input
            v-if="field.type != 'radio' && field.type != 'number'"
            :type="field.type"
            v-model="field.value"
          ></el-input>

          <!-- Number -->
          <el-input-number
            v-else-if="field.type == 'number'"
            v-model.number="field.value"
          ></el-input-number>

          <!-- Array / radio -->
          <el-radio-group v-else v-model="field.value">
            <el-radio
              v-for="possibleValue in field.values"
              :key="possibleValue"
              :label="possibleValue"
              >{{ possibleValue }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
      </transition-group>

      <!-- Form submit / cancel -->
      <el-form-item>
        <el-button type="primary" @click="submitForm" role="submit-kpi-form">
          {{ submitText }}
        </el-button>
        <el-button @click="$router.replace('/kpis')">{{$t('cancel')}}</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import useNotify from "@/hooks/notify.js";

export default {
  props: ["id", "clone"],
  emits: ["save-data"],
  setup() {
    const { notify } = useNotify();

    return { notify };
  },
  data() {
    return {
      numberValue: 0,
      availableUnrequiredFields: [],
      choosenUnrequiredFields: [],
      form: {
        title: "",
        description: "",
        fields: [],
      },
    };
  },
  computed: {
    submitText() {
      if (this.isClone) return `${this.$t('clone-kpi')} ${this.form.id}`;
      return this.id ? this.$t('update-kpi') : this.$t('create-kpi');
    },
    notifyMessage() {
      return this.id
        ? this.$t('update-kpi-success')
        : this.$t('create-kpi-success');
    },
    notifyTitle() {
      return this.id
        ? `${this.$t('updated-kpi')}: ${this.form.title}`
        : `${this.$t('new-kpi')}: ${this.form.title}`;
    },
    isClone() {
      return this.$route.query.clone != undefined;
    },
  },
  methods: {
    submitForm() {
      this.$refs["kpiForm"].validate((valid) => {
        if (valid) {
          this.$emit("save-data", this.form);

          this.notify(this.notifyTitle, this.notifyMessage, "success");
        } else {
          this.notify(
            this.$t('error'),
            this.$t('form-not-valid'),
            "error"
          );

          return false;
        }
      });
    },
    getFieldRules(field) {
      const rules = [];

      // Required fields
      if (field.required) {
        rules.push({
          required: true,
          message: this.$t('required-tooltip'),
          trigger: ["blur", "change"],
        });
      }

      // Fields with lenght limit
      if (field.maxlength) {
        rules.push({
          max: field.maxlength,
          message: `${this.$t('maxlength')}: ${field.maxlength}`,
          trigger: ["blur", "change"],
        });
      }

      // Fields type number
      if (field.type == "number") {
        rules.push({
          type: "number",
          max: 20,
          message: this.$t('must-be-number'),
          trigger: "change",
        });
      }

      return rules;
    },
    addUnrequiredFields() {
      for (const choosenFieldId of this.choosenUnrequiredFields) {
        // Get the index
        const choosenFieldIndex = this.availableUnrequiredFields.findIndex(
          (field) => field.id === choosenFieldId
        );

        // Remove choosen field from availableUnrequiredFields
        const choosenField = this.availableUnrequiredFields.splice(
          choosenFieldIndex,
          1
        );

        // And add it to form fields
        this.form.fields.push(...choosenField);
      }

      // Reset selection
      this.choosenUnrequiredFields = [];
    },
    resetUnrequiredField(unchoosenField) {
      // Get current index in form.fields
      const unchoosenFieldIndex = this.form.fields.findIndex(
        (field) => field.id === unchoosenField.id
      );

      this.form.fields.splice(unchoosenFieldIndex, 1);

      // Make it available again
      this.availableUnrequiredFields.push(unchoosenField);
    },
  },

  async created() {
    var kpiId = null;
    if (this.isClone) kpiId = this.$route.query.clone;
    else if (this.id) kpiId = this.id;

    // First, make sure we have updated fields available and loaded in Vuex
    await this.$store.dispatch("fields/loadFields", { forceRefresh: true });

    // Now, load all fields (required and unrequired separately)
    const requiredFields = this.$store.getters["fields/requiredFields"];
    this.form.fields = requiredFields;

    this.availableUnrequiredFields = this.$store.getters[
      "fields/unrequiredFields"
    ];

    // If id exist, mean this is an update or clone form
    if (kpiId) {
      // Make sure id passed by url actually exist
      try {
        // Clone Kpi instead of editing it directly
        this.form = JSON.parse(
          JSON.stringify(
            this.$store.getters["kpis/kpis"].find((kpi) => kpi.id == kpiId)
          )
        );
      } catch (e) {
        this.notify(this.$t('error'), this.$t('kpi-not-found'), "error");
        this.$router.replace("/kpis");
      }

      // Make sure unrequired fields are added in form and eliminated from select
      for (const field of this.form.fields) {
        if (!field.required) {
          // Get the index in availableUnrequiredFields
          const fieldIndex = this.availableUnrequiredFields.findIndex(
            (avalableField) => avalableField.id === field.id
          );

          // Remove choosen field from availableUnrequiredFields
          this.availableUnrequiredFields.splice(fieldIndex, 1);
        }
      }

      // Make sure we include all required fields in modification form, in case we are modifying an old KPI
      for (const requiredField of requiredFields) {
        if (!this.form.fields.find((field) => field.id === requiredField.id))
          this.form.fields.push(requiredField);
      }

      // Finally, sort fields array by required, id and name
      this.form.fields.sort(function (a, b) {
        return (
          (a.required && b.required) ||
          a.id - b.id ||
          a.name.localeCompare(b.name)
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

.field-enter-from {
  opacity: 0;
  transform: translateX(-30px);
}

.field-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.field-enter-active {
  transition: all 0.3s ease-out;
}

.field-leave-active {
  transition: all 0.3s ease-in;
}

.field-enter-to,
.field-leave-from {
  opacity: 1;
  transform: translateX(0);
}
</style>
