<template>
  <nav>
    <el-menu
      :default-active="$route.path"
      class="el-menu-demo"
      mode="horizontal"
      router
    >
      <el-menu-item index="/">
        <i class="el-icon-s-home"></i>
        <template #title>Home</template>
      </el-menu-item>

      <el-menu-item index="/kpis/create">
        <i class="el-icon-circle-plus"></i>
        <template #title>Nuevo indicador</template>
      </el-menu-item>

      <el-menu-item index="/kpis">
        <i class="el-icon-s-data"></i>
        <template #title>Indicadores activos</template>
      </el-menu-item>

      <el-menu-item index="/kpis/deleted">
        <i class="el-icon-delete"></i>
        <template #title>Papelera de KPIs</template>
      </el-menu-item>

      <el-menu-item index="/fields">
        <i class="el-icon-setting"></i>
        <template #title>Administrar atributos</template>
      </el-menu-item>
    </el-menu>
  </nav>
</template>


<style lang="scss" scoped>
nav {
  overflow: hidden;
  overflow-x: auto;

  ul {
    display: flex;
  }
}
</style>
