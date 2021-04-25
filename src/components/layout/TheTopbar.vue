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
        <template #title>{{$t('home')}}</template>
      </el-menu-item>

      <el-menu-item index="/kpis/create">
        <i class="el-icon-circle-plus"></i>
        <template #title>{{$t('new-kpi')}}</template>
      </el-menu-item>

      <el-menu-item index="/kpis">
        <i class="el-icon-s-data"></i>
        <template #title>{{$t('active-kpis')}}</template>
      </el-menu-item>

      <el-menu-item index="/kpis/deleted">
        <i class="el-icon-delete"></i>
        <template #title>{{$t('deleted-kpis')}}</template>
      </el-menu-item>

      <el-menu-item index="/fields">
        <i class="el-icon-setting"></i>
        <template #title>{{$t('dynamic-fields')}}</template>
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
