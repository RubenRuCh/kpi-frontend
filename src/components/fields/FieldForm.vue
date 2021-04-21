<template>
  <el-form
    ref="fieldForm"
    :model="form"
    label-width="auto"
    class="demo-dynamic"
  >
    <el-form-item
      label="Nombre"
      prop="title"
      :rules="[
        {
          required: true,
          message: 'Por favor, introduce un nombre para el atributo',
          trigger: 'blur',
        },
        {
          min: 4,
          max: 255,
          message: 'Por favor, introduce un nombre entre 4 y 255 caracteres',
          trigger: ['blur', 'change'],
        },
      ]"
    >
      <el-input v-model="form.title"></el-input>
    </el-form-item>

    <el-form-item
      label="Descripción"
      prop="description"
      :rules="[
        {
          required: true,
          message: 'Por favor, introduce una descripción para el atributo',
          trigger: 'blur',
        },
        {
          min: 1,
          message: 'Por favor, introduce una descripción con algo de contenido',
          trigger: ['blur', 'change'],
        },
      ]"
    >
      <el-input type="textarea" v-model="form.description"></el-input>
    </el-form-item>

    <el-form-item label="Obligatorio">
      <el-switch v-model="form.required"></el-switch>
    </el-form-item>

    <el-form-item label="Rellenable">
      <el-switch v-model="form.fillable"></el-switch>
    </el-form-item>

    <el-form-item
      label="Tipo de atributo"
      prop="type"
      :rules="[
        {
          required: true,
          message: 'Por favor, introduce un tipo de atributo',
          trigger: 'blur',
        },
      ]"
    >
      <el-select
        v-model="form.type"
        placeholder="Selecciona el tipo del nuevo atributo"
      >
        <el-option label="Texto con límite" value="text"></el-option>
        <el-option label="Texto sin límite" value="textarea"></el-option>
        <el-option label="Valor numérico" value="number"></el-option>
        <el-option label="Opciones predefinidas" value="radio"></el-option>
      </el-select>
    </el-form-item>

    <el-form-item v-if="form.type == 'text'" label="Límite del texto">
      <el-slider :min="min" :max="max" v-model="form.maxlength" show-input>
      </el-slider>
    </el-form-item>

    <el-form-item
      v-if="form.type == 'radio'"
      label="Posibles valores"
      prop="values"
      :rules="[
        {
          required: true,
          message: 'Por favor, introduce al menos una opción a elegir',
          trigger: 'blur',
        },
      ]"
    >
      <el-tag
        :key="value"
        v-for="value in form.values"
        closable
        :disable-transitions="false"
        @close="handleClose(value)"
      >
        {{ value }}
      </el-tag>
      <el-input
        class="input-new-tag"
        v-if="inputVisible"
        v-model="inputValue"
        ref="saveTagInput"
        size="mini"
        @keyup.enter="handleInputConfirm"
        @blur="handleInputConfirm"
      >
      </el-input>
      <el-button v-else class="button-new-tag" size="small" @click="showInput"
        >+ Nuevo valor</el-button
      >
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm">{{ submitText }}</el-button>
      <el-button @click="$router.replace('/fields')">Cancelar</el-button>
    </el-form-item>
  </el-form>
</template>

<script>
import useNotify from '@/hooks/notify.js';

export default {
  props: ['id'],
  emits: ['save-data'],
  setup() {
    const { notify } = useNotify();

    return { notify };
  },
  data() {
    return {
      min: 4,
      max: 255,
      inputVisible: false,
      inputValue: '',
      form: {
        title: '',
        description: '',
        required: false,
        fillable: false,
        type: '',
        values: [],
        maxlength: 4,
      },
    };
  },
  computed: {
    submitText() {
      return this.id ? 'Actualizar atributo' : 'Crear atributo';
    },
    notifyMessage() {
      return this.id
        ? 'El atributo ha sido modificado correctamente'
        : 'Se ha creado el nuevo atributo correctamente';
    },
    notifyTitle() {
      return this.id
        ? `Atributo actualizado: ${this.form.title}`
        : `Nuevo atributo: ${this.form.title}`;
    },
  },
  methods: {
    handleClose(tag) {
      this.form.values.splice(this.form.values.indexOf(tag), 1);
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.form.values.push(inputValue);
      }
      this.inputVisible = false;
      this.inputValue = '';
    },
    submitForm() {
      this.$refs['fieldForm'].validate((valid) => {
        if (valid) {
          if (this.form.type != 'radio') this.form.values = null; // Clear values created when type is different that radio
          if (this.form.type != 'text') this.form.maxlength = null; // Clear maxlength when type is different that text

          this.$emit('save-data', this.form);

          this.notify(this.notifyTitle, this.notifyMessage, 'success');
        } else {
          this.notify(
            `Error`,
            'El formulario no es válido. Revisa que todos los campos han sido correctamente completados',
            'error'
          );

          return false;
        }
      });
    },
  },

  created() {
    // If id exist, mean this is an update form
    if (this.id) {
      this.form = JSON.parse(
        JSON.stringify(
          this.$store.getters['fields/fields'].find(
            (field) => field.id == this.id
          )
        )
      ); // Clone Field instead of editing it directly
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
</style>
