<template>
  <el-card shadow="always">
    <transition :name="transitionName" mode="out-in">
      <kpi-item
        :id="$route.params.id"
        :key="$route.params.id"
        @prev="goingPrev"
        @next="goingNext"
      ></kpi-item>
    </transition>
  </el-card>
</template>

<script>
import KpiItem from "@/components/kpis/KpiItem.vue";
export default {
  components: {
    KpiItem,
  },
  data() {
    return {
      transitionName: "",
    };
  },
  methods: {
    goingPrev() {
      this.transitionName = "prevkpi";
    },
    goingNext() {
      this.transitionName = "nextkpi";
    },
  },
};
</script>
