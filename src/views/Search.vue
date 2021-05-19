<template>
  <div class="search">
    <div class="search__wrapper">
      <img
        src="../assets/images/octocat-logo.png"
        class="search__wrapper-image"
        alt="GitHub Logo"
      />
      <h1 class="search__wrapper-title">GitSearch</h1>
      <input
        v-model="query"
        type="text"
        class="search__wrapper-input"
        placeholder="Pesquisar..."
        :class="invalid ? 'invalid__input' : ''"
      />
      <span v-if="invalid" class="invalid__label">
        Preencha o campo para buscar
      </span>
      <div class="search__wrapper-actions">
        <button class="blue-bg" @click="loadAll">Ver Todos</button>
        <button class="green-bg" @click="loadResults">Buscar</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      query: "",
      invalid: false,
    };
  },
  methods: {
    loadResults() {
      if (this.query) {
        this.$router.push({
          name: "ShowUsers",
          params: { query: this.query, isSearch: true },
        });
      } else {
        this.invalid = true;
      }
    },
    loadAll() {
      this.$router.push({ name: "ShowUsers", params: { isSearch: false } });
    },
  },
};
</script>