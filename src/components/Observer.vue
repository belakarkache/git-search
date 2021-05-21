<template>
  <div class="observer" />
</template>

<script>
export default {
  name: "Observer",
  data() {
    return {
      observer: null,
    };
  },
  mounted() {
    this.observer = new IntersectionObserver(([entry]) => {
      if (entry && entry.isIntersecting) {
        this.$emit("intersect");
      }
    });
    this.observer.observe(this.$el);
  },
};
</script>

<style lang="scss">
.observer {
  height: 50px;
}
</style>