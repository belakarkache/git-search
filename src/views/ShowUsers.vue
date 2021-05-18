<template>
  <div class="show-users">
    <h1 v-if="data.isSearch">Search Results</h1>
    <h1 v-else>All Users</h1>

    <div class="show-users__user" v-for="user in results" :key="user.id">
      <img :src="user.avatar_url" />
      <h1>{{ user.login }}</h1>
    </div>
  </div>
</template>

<script>
import { searchUsers, allUsers } from "../services/index";

export default {
  name: "ShowUsers",
  data() {
    return {
      data: {},
      results: [],
    };
  },
  mounted() {
    this.data = this.$route.params;
    if (this.data.isSearch && this.data.query) {
      searchUsers(this.data.query).then((resp) => {
        this.results = resp.data.items;
      });
    } else {
      allUsers.then((resp) => {
        this.results = resp.data;
      });
    }
  },
};
</script>