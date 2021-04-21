<template>
  <nav>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @click.self.prevent="toggleMenu"
      router
    >
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <template #title>Home</template>
      </el-menu-item>

      <el-submenu index="/kpis">
        <template #title>
          <i class="el-icon-s-marketing"></i>
          <span>Indicadores</span>
        </template>

        <el-menu-item-group title="Creación">
          <el-menu-item index="/kpis/create">Nuevo KPI</el-menu-item>
        </el-menu-item-group>

        <el-menu-item-group title="Listados">
          <el-menu-item index="/kpis">KPIs activos</el-menu-item>
          <el-menu-item index="/kpis/deleted">KPIs eliminados</el-menu-item>
        </el-menu-item-group>
      </el-submenu>

      <el-menu-item index="/register">
        <i class="el-icon-s-data"></i>
        <template #title>Registros (Raúl)</template>
      </el-menu-item>

      <el-menu-item index="/auth" disabled>
        <i class="el-icon-user-solid"></i>
        <template #title>Autentificación</template>
      </el-menu-item>

      <el-menu-item index="/fields">
        <i class="el-icon-setting"></i>
        <template #title>Administrar atributos</template>
      </el-menu-item>
    </el-menu>
  </nav>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isCollapse = !this.isCollapse;
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 100vh;
  cursor: pointer;
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
