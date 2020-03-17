<template>
  <div id="app">
    <component :is="layout">
      <transition name="slide-faded" mode="out-in">
        <router-view />
      </transition>
    </component>
  </div>
</template>
<script>
const admin_layout = "customer";

export default {
  computed: {
    layout() {
      return (this.$route.meta.layout || admin_layout) + "-layout";
    }
  }
};
</script>
<style lang="scss">
#app {
  font-family: "Open Sans", sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  .scroll-area {
    position: relative;
    height: 100vh;
  }
}
// RESPONSIVE
@media screen and (max-width: 767px) {
  #app {
    .ps > .ps__scrollbar-y-rail > .ps__scrollbar-y,
    .ps > .ps__scrollbar-x-rail > .ps__scrollbar-x,
    .ps:hover > .ps__scrollbar-y-rail:hover,
    .ps.ps--active-x > .ps__scrollbar-x-rail,
    .ps.ps--active-y > .ps__scrollbar-y-rail {
      display: none;
    }
  }
}
</style>
