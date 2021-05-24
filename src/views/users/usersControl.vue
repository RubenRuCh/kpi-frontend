<template>
  <el-card shadow="always" class="main-card">
    <h1>{{$t('user-control')}}</h1>

    <section class="cards">
      <transition name="list" appear>
        <el-card
          key="register"
          shadow="hover"
          @click="$router.push('/adminpanel/user/list')"
        >
          <i class="el-icon-s-data"></i>
          <br /><br />
          <span>{{$t('user-list')}}</span>
        </el-card>
      </transition>

      <transition name="add" appear>
        <el-card key="kpis" shadow="hover" @click="$router.push('/adminpanel/user/create')">
          <i class="el-icon-circle-plus"></i>
          <br /><br />
          <span>{{$t('user-add')}}</span>
        </el-card>
      </transition>
    </section>
  </el-card>
</template>

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
  max-width: 630px;
  margin: 50px auto;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
}

.el-cards {
  width: 250px;
}

/* Animations */ 
.list-enter-from,
.add-enter-from,
.deleted-enter-from,
.fields-enter-from {
  opacity: 0;
  transform: translateX(300px);
}

.list-enter-active {
  transition: all 0.2s ease-out;
}

.add-enter-active {
  transition: all 0.3s ease-out;
}

.list-enter-to,
.add-enter-to {
  opacity: 1;
  transform: translateX(0);
}
</style>
