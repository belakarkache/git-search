<template>
  <div class="message">
    <span class="icon-circle">
      <i class="fas fa-search"></i>
    </span>
    <span class="main-title">{{ content.title }}</span>
    <span class="description">{{ content.message }}</span>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: ["content"],
};
</script>

<style lang="scss">
@import "../assets/scss/variables.scss";

.message {
  background-color: rgba($blue, 0.1);
  border: 1px solid $blue;
  border-left: 5px solid $blue;
  padding: 10px;
  margin: 20px 0;
  border-radius: 2px;
  color: $blue;
  .icon-circle {
    width: 20px;
    height: 20px;
    background-color: $blue;
    border-radius: 50%;
    display: inline-block;
    text-align: center;
    margin-right: 5px;
    svg {
      color: white;
      width: 10px;
      height: 10px;
      vertical-align: baseline;
    }
  }
  .main-title {
    font-weight: bold;
    margin-right: 3px;
    font-size: 13px;
  }
  .description {
    font-size: 13px;
  }
}
</style>