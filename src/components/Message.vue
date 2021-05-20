<template>
  <div>
    <h2>{{ content.title }}</h2>
    <h3>{{ content.message }}</h3>
  </div>
</template>

<script>
export default {
  name: "Message",
  props: ["content"],
};
</script>

<style>
</style>