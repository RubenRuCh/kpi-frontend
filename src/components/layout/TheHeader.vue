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

    <div class="auth">
      <i class="el-icon-user-solid"> Carlos</i>
    </div>
  </section>
</template>

<style lang="scss" scoped>
section.appinfo {
  height: 70px;
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
