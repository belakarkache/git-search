<template>
  <div id="app">
    <div id="nav" v-if="$route.path !== '/'">
      <router-link to="/">
        <span class="nav">
          <img
            src="./assets/images/octocat-logo.png"
            alt="GitHub Logo"
            class="nav__logo"
          />
          <h2 class="nav__title">GitSearch</h2>
        </span>
      </router-link>

      <router-link to="/">
        <span class="nav-mobile">
          <img src="./assets/images/arrow-icon.png" />
          <p class="nav-mobile__title">Lista de Usuários</p>
        </span>
      </router-link>

      <router-link to="/show-users" v-if="$route.path === 'profile'">
        <span class="nav-mobile">
          <img src="./assets/images/arrow-icon.png" />
          <p class="nav-mobile__title">Perfil</p>
        </span>
      </router-link>
    </div>
    <transition name="fade">
      <router-view />
    </transition>
  </div>
</template>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition-duration: 0.2s;
  transition-property: opacity;
  transition-timing-function: ease;
}

.fade-enter,
.fade-leave-active {
  opacity: 0;
}
</style>