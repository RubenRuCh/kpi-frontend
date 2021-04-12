<template>
  <el-container>
    <el-col :span="2">
      <the-sidebar></the-sidebar>
    </el-col>

    <el-col :span="20">
      <el-container>
        <el-header>
          <the-header></the-header>
        </el-header>

        <el-main>
          <router-view v-slot="slotProps">
            <transition name="route" mode="out-in">
              <component :is="slotProps.Component"></component>
            </transition>
          </router-view>
        </el-main>
      </el-container>
    </el-col>
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

.el-card {
  padding: 1rem;
  margin: 2rem auto;
  max-width: 100rem;
}
</style>
