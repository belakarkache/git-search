<template>
  <div>
    <button class="scroll-to-top" @click="scrollToTop">
      <i class="fas fa-angle-up"></i>
    </button>
  </div>
</template>

<script>
export default {
  name: "ScrollToTop",
  methods: {
    scrollToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.scroll-to-top {
  background-color: $blue;
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  color: white;
  font-size: 1.2rem;
  box-shadow: $shadow;
}
</style>