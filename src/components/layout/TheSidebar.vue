<template>
  <nav>
    <el-menu
      :default-active="$route.path"
      class="el-menu-vertical-demo"
      :collapse="isCollapse"
      @click.self.prevent="toggleMenu"
      @mouseenter="cancelCloseMenu"
      @mouseleave="closeMenu"
      v-loading="isClosing"
      element-loading-text="Cerrando..."
      element-loading-spinner="el-icon-loading"
      router
    >
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

        <!-- 
          <el-submenu index="1-4">
            <template #title><span>item four</span></template>
            <el-menu-item index="1-4-1">item one</el-menu-item>
          </el-submenu> -->
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
      isCollapse: true,
      isClosing: false,
      timeout: null,
    };
  },
  methods: {
    toggleMenu() {
      if (!this.isCollapse) {
        this.isClosing = false;
      }
      this.isCollapse = !this.isCollapse;
    },
    openMenu() {
      this.isCollapse = false;
    },
    closeMenu() {
      if (!this.isCollapse) {
        this.isClosing = true;

        this.timeout = setTimeout(() => {
          if (this.isClosing) {
            this.isCollapse = true;
            this.isClosing = false;
          }
        }, 2000);
      }
    },
    cancelCloseMenu() {
      this.isClosing = false;

      clearTimeout(this.timeout);
      this.timeout = null;
    },
  },
};
</script>

<style scoped>
.el-menu-vertical-demo {
  height: 100vh;
}

@media (min-width: 993px) {
  .el-menu-vertical-demo {
    height: calc(100vh - 62px);
  }
}

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
}
</style>
