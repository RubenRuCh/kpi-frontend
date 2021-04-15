<template>
  <el-container>
    <el-header class="hidden-sm-and-down" height="initial">
      <the-header></the-header>
    </el-header>

    <el-container>
      <el-aside width="initial">
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
import TheHeader from './components/layout/TheHeader.vue';

export default {
  components: {
    TheSidebar,
    TheHeader,
  },

  created() {
    // Load some data on created
    this.$store.dispatch('kpis/loadKpis', {
      forceRefresh: true,
    });
    this.$store.dispatch('fields/loadFields', {
      forceRefresh: true,
    });
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
</style>
