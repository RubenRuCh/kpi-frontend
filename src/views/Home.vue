<template>
  <el-card shadow="always" class="main-card">
    <h1>Gestión de indicadores</h1>

    <section class="cards">
      <transition name="register" appear>
        <el-card
          key="register"
          shadow="hover"
          @click="$router.push('/register')"
        >
          <i class="el-icon-s-data"></i>
          <br /><br />
          <span>Registros de valores</span>
        </el-card>
      </transition>

      <transition name="kpis" appear>
        <el-card key="kpis" shadow="hover" @click="$router.push('/kpis')">
          <i class="el-icon-s-marketing"></i>
          <br /><br />
          <span>Indicadores</span>
        </el-card>
      </transition>

      <transition name="deleted" appear>
        <el-card
          key="deletedKpis"
          shadow="hover"
          @click="$router.push('/kpis/deleted')"
        >
          <i class="el-icon-delete"></i>
          <br /><br />
          <span>Papelera de KPIs</span>
        </el-card>
      </transition>

      <transition name="fields" appear>
        <el-card key="fields" shadow="hover" @click="$router.push('/fields')">
          <i class="el-icon-setting"></i>
          <br /><br />
          <span>Atributos dinámicos</span>
        </el-card>
      </transition>
    </section>
  </el-card>
</template>

<script>
export default {};
</script>

<style scoped>
h1 {
  font-size: 2rem;
}

.main-card .el-card {
  cursor: pointer;
  margin: 10px auto;
  width: 100%;
  background-color: #e7f6f6;
  border: 1px solid #99cccc;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
}

i {
  font-size: 5rem;
}

span {
  width: 100%;
}

.cards {
  max-width: 1200px;
  margin: 0 auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

/* Animations */
.register-enter-from,
.kpis-enter-from,
.deleted-enter-from,
.fields-enter-from {
  opacity: 0;
  transform: translateX(300px);
}

.register-enter-active {
  transition: all 0.2s ease-out;
}

.kpis-enter-active {
  transition: all 0.3s ease-out;
}

.deleted-enter-active {
  transition: all 0.4s ease-out;
}

.fields-enter-active {
  transition: all 0.5s ease-out;
}

.register-enter-to,
.kpis-enter-to,
.deleted-enter-to,
.fields-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>
