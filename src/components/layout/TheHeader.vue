<template>
  <section class="appinfo">
    <div class="logo">
      <a href="http://smartcity.valencia.es/" target="_blank">
        <img
          class="stnd skip-lazy dark-version"
          alt="València Ciudad Inteligente"
          src="http://smartcity.valencia.es/wp-content/uploads/SmartCityValencia.png"
        />
      </a>
    </div>

    <el-menu
    mode="horizontal"
    class="user-section"
      v-if="currentUser"
      :default-active="$route.path"
      router>

    <el-submenu>
        <template #title>
          <i class="el-icon-user-solid"></i>
          <span>{{ currentUser.firstname }}</span>
        </template>
        <el-menu-item index="/profile">{{$t('user-profile')}}</el-menu-item>
        <el-menu-item @click="logout()">{{$t('session-close')}}</el-menu-item>
    </el-submenu>

    </el-menu>

    <el-menu
      v-else
      mode="horizontal"
      class="user-section"
      :default-active="$route.path"
      router
    >
      <el-menu-item 
      index="/auth">
        <i class="el-icon-user-solid"></i>
        <template #title>{{$t('login')}}</template>
      </el-menu-item>
    </el-menu>
  </section>
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
    logout() {
      localStorageService.logout();
    },
    isAdmin() {
      return this.currentUser && this.currentUser.role === "Admin";
    },
  },
};
</script>

<style lang="scss">
section.appinfo {
  height: 90px;
  margin: 1rem;
  margin-bottom: 0.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

section.appinfo div.logo img {
  height: 70px;

  @media screen and (max-width: 990px) {
    height: 3rem;
  }
}
</style>
