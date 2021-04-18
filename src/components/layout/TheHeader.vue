<template>
  <section class="header">
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

      <el-submenu index="/kpis">

        <template #title>
          <i class="el-icon-s-marketing"></i>
          <span>Indicadores</span>
        </template>
        <el-menu-item index="/kpis/create">Nuevo KPI</el-menu-item>

        <el-submenu index="/kpis">
          <template #title>Listado KPIs</template>
          <el-menu-item index="/kpis">KPIs activos</el-menu-item>
          <el-menu-item index="/kpis/deleted">KPIs eliminados</el-menu-item>
        </el-submenu>

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
  </section>
</template>
