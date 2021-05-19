<template>
  <div class="show-users">
    <div class="show-users__search">
      <i class="fas fa-search"></i>
      <input type="text" v-model="query" placeholder="Pesquisar..." />
    </div>
    <div class="show-users__wrapper">
      <div
        class="show-users__wrapper__user"
        v-for="(user, index) in results"
        :key="index"
      >
        <img :src="user.avatar_url" />
        <p>{{ user.login }}</p>
      </div>
      <p v-if="noMoreUsers">Não tem mais</p>
    </div>
    <observer @intersect="loadMoreResults" />
  </div>
</template>

<script>
import { searchUsers, allUsers } from "../services/index";
import Observer from "../components/Observer";

export default {
  name: "ShowUsers",
  components: { Observer },
  data() {
    return {
      data: {},
      results: [],
      query: "",
      page: 0,
      noMoreUsers: false,
    };
  },
  methods: {
    loadMoreResults() {
      if (this.data.isSearch && this.data.query && !this.noMoreUsers) {
        searchUsers(this.data.query, this.page++).then((resp) => {
          console.log(resp.data.items);
          if (this.page === 1) {
            this.results = resp.data.items;
          }
          this.results.push(...resp.data.items);
          if (resp.data.items.length === 0) {
            this.noMoreUsers = true;
          }
        });
      }
      if (!this.data.isSearch) {
        if (this.results.length < 1) {
          allUsers().then((resp) => {
            this.results = resp.data;
          });
        } else {
          allUsers(this.results[this.results.length - 1].id).then((resp) => {
            this.results.push(...resp.data);
          });
        }
      }
    },
  },
  mounted() {
    this.data = this.$route.params;
  },
};
</script>