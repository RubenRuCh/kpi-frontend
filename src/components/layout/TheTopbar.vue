<template>
  <nav>
    <el-menu
      v-if="currentUser"
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      router
    >
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <template #title>{{$t('home')}}</template>
      </el-menu-item>

      <el-menu-item index="/kpis/create" :disabled="!isAdmin()">
        <i class="el-icon-circle-plus"></i>
        <template #title>{{$t('new-kpi')}}</template>
      </el-menu-item>

      <el-menu-item index="/kpis">
        <i class="el-icon-s-data"></i>
        <template #title>{{$t('active-kpis')}}</template>
      </el-menu-item>

      <el-menu-item index="/kpis/deleted" :disabled="!isAdmin()">
        <i class="el-icon-delete"></i>
        <template #title>{{$t('deleted-kpis')}}</template>
      </el-menu-item>

      <el-menu-item index="/fields" :disabled="!isAdmin()">
        <i class="el-icon-setting"></i>
        <template #title>{{$t('dynamic-fields')}}</template>
      </el-menu-item>

      <el-menu-item index="/adminpanel" v-if="isAdmin()">
        <i class="el-icon-s-tools"></i>

        <!-- TODO poner variable traduccion-->
        <template #title>{{$t('admin-panel')}}</template>
      </el-menu-item>
    </el-menu>
  </nav>
</template>

<script>
import { localStorageService } from "@/store/modules/UserStorage/actions";
export default {
  data() {
    return {
      currentUser: null,
    };
  },
  created() {
    localStorageService.currentUser.subscribe((x) => (this.currentUser = x));
  },
  methods: {
    isAdmin() {
      return this.currentUser && this.currentUser.role === "Admin";
    },
  }
};
</script>


<style lang="scss" scoped>
nav {
  overflow: hidden;
  overflow-x: auto;

  ul {
    display: flex;
  }
}
</style>
