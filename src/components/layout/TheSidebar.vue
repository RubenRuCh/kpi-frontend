<template>
  <nav>
    <el-menu
      v-if="currentUser"
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @click.self.prevent="toggleMenu"
      router
    >
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <template #title>{{ $t("home") }}</template>
      </el-menu-item>

      <el-menu-item index="/kpis/create" :disabled="!isAdmin()">
        <i class="el-icon-circle-plus"></i>
        <template #title>{{ $t("new-kpi") }}</template>
      </el-menu-item>

      <el-menu-item index="/kpis">
        <i class="el-icon-s-data"></i>
        <template #title>{{ $t("active-kpis") }}</template>
      </el-menu-item>

      <el-menu-item index="/kpis/deleted" :disabled="!isAdmin()">
        <i class="el-icon-delete"></i>
        <template #title>{{ $t("deleted-kpis") }}</template>
      </el-menu-item>

      <el-menu-item index="/fields" :disabled="!isAdmin()">
        <i class="el-icon-setting"></i>
        <template #title>{{ $t("dynamic-fields") }}</template>
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
      isCollapse: false,
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
    toggleMenu() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo {
  height: calc(100vh - 70px - 20px - 1.5rem - 20px); /* 70px TheHeader' height, 20px TheSidebar' margin-top and 1.5rem TheHeader margin (1rem margin-top and 0.5rem margin-bottom). Also 20px from user icon */
  cursor: pointer;
  margin-top: 20px;

  border-top: solid 1px #e6e6e6;
  border-top-width: 1px;
  border-top-style: solid;
  border-top-color: rgb(230, 230, 230);
  border-top-right-radius: 0.2rem;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
