<template>
  <span class="badge" :class="type" :title="help">
    {{ text }}
  </span>
</template>

<script>
export default {
  props: ['type', 'title'],
  computed: {
    text() {
      return this.title.toUpperCase();
    },
    help(){
      return this.type == 'warning' ? 'Los atributos obligatorios deberán aparecer en todos los nuevos KPI' : '';
    },
  },
};
</script>

<style scoped>
.badge {
  background-color: #ccc;
  color: #252525;
  border: 1px solid;
  border-radius: 30px;
  padding: 0.5rem 1.5rem;
  display: inline-block;
  margin-right: 0.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
  cursor: help;
}

.dark {
  background-color: #3d008d;
  color: white;
}

.neutral {
  background-color: #71008d;
  color: white;
}

.light {
  background-color: #8d006e;
  color: white;
}

.warning {
  color: #fff;
  background-color: #f56c6c;
  border-color: #f56c6c;
}
</style>
