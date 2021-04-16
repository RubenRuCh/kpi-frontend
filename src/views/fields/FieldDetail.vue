<template>
  <el-card shadow="always">
    <transition :name="transitionName" mode="out-in">
      <field-item
        :id="$route.params.id"
        :key="$route.params.id"
        @prev="goingPrev"
        @next="goingNext"
      ></field-item>
    </transition>
  </el-card>
</template>

<script>
import FieldItem from '@/components/fields/FieldItem.vue';
export default {
  components: {
    FieldItem,
  },
  data() {
    return {
      transitionName: '',
    };
  },
  methods: {
    goingPrev() {
      this.transitionName = 'prevfield';
    },
    goingNext() {
      this.transitionName = 'nextfield';
    },
  },
};
</script>
