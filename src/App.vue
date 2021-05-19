<template>
  <el-container>
    <el-header height="initial">
      <the-header></the-header>
      <the-topbar class="hidden-md-and-up"></the-topbar>
    </el-header>

    <el-container>
      <el-aside width="initial" class="hidden-sm-and-down">
        <the-sidebar></the-sidebar>
      </el-aside>

      <el-main>
        <router-view v-slot="slotProps">
          <transition name="route" mode="out-in">
            <component :is="slotProps.Component"></component>
          </transition>
        </router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import TheSidebar from './components/layout/TheSidebar.vue';
import TheTopbar from './components/layout/TheTopbar.vue';
import TheHeader from './components/layout/TheHeader.vue';

import { localStorageService } from '@/store/modules/UserStorage/actions';

export default {
  components: {
    TheSidebar,
    TheHeader,
    TheTopbar,
  },

  async created() {
    if (localStorageService.currentUserValue) {
      await this.$store.dispatch('fields/loadFields', {
        forceRefresh: true,
      });

      await this.$store.dispatch('kpis/loadKpis', {
        forceRefresh: true,
      });

    }
  },
};
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap');

* {
  box-sizing: border-box;
}

html {
  font-family: 'Roboto', sans-serif;
}

body {
  margin: 0;
}

.route-enter-from {
  opacity: 0;
  transform: translateY(-30px);
}

.route-leave-to {
  opacity: 0;
  transform: translateY(30px);
}

.route-enter-active {
  transition: all 0.3s ease-out;
}

.route-leave-active {
  transition: all 0.3s ease-in;
}

.route-enter-to,
.route-leave-from {
  opacity: 1;
  transform: translateY(0);
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.main-card {
  width: 100%;
  height: 100%;
}
</style>
