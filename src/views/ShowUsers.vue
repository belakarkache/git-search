<template>
  <div class="show-users">
    <div class="show-users__search">
      <i class="fas fa-search"></i>
      <input
        type="text"
        v-model="query"
        placeholder="Pesquisar..."
        @keypress.enter="searchInside"
      />
    </div>
    <div class="show-users__wrapper">
      <div
        class="show-users__wrapper__user"
        v-for="(user, index) in results"
        :key="index"
        @click="openProfile(user)"
      >
        <img :src="user.avatar_url" />
        <p>{{ user.login }}</p>
      </div>
      <Message v-if="noMoreUsers" :content="content" />
    </div>
    <button class="scroll-to-top" @click="scrollToTop">
      <i class="fas fa-angle-up"></i>
    </button>
    <Spinner :loading="loading" />
    <observer @intersect="loadMoreResults" />
  </div>
</template>

<script>
import { searchUsers, allUsers } from "../services/index";
import Observer from "../components/Observer";
import Spinner from "../components/Spinner";
import Message from "../components/Message";

export default {
  name: "ShowUsers",
  components: { Observer, Spinner, Message },
  data() {
    return {
      data: {},
      results: [],
      query: "",
      page: 0,
      noMoreUsers: false,
      loading: false,
      content: {
        title: "Sem resultados",
        message: "Tente buscar novamente com outras palavras :)",
      },
      noMoreSearch: false,
    };
  },
  methods: {
    loadMoreResults() {
      if (this.data.isSearch && this.data.query && !this.noMoreUsers) {
        this.loading = true;
        searchUsers(this.data.query, this.page++)
          .then((resp) => {
            const total = resp.data.total_count;
            if (this.page === 0) {
              this.results = resp.data.items;
            }
            this.results.push(...resp.data.items);
            if (resp.data.items.length === 0) {
              this.noMoreUsers = true;
            }
            if (total <= 10) {
              this.content.title = "Não encontrou o que procurava?";
              this.noMoreUsers = true;
            }
          })
          .finally(() => (this.loading = false));
      }
      if (!this.data.isSearch) {
        if (this.results.length < 1) {
          this.loading = true;
          allUsers()
            .then((resp) => {
              this.results = resp.data;
            })
            .finally(() => (this.loading = false));
        } else {
          this.loading = true;
          allUsers(this.results[this.results.length - 1].id)
            .then((resp) => {
              this.results.push(...resp.data);
            })
            .finally(() => (this.loading = false));
        }
      }
    },
    searchInside() {
      this.results = [];
      this.data.query = this.query;
      this.page = 0;
      this.data.isSearch = true;
      this.loadMoreResults();
    },
    openProfile(user) {
      this.$router.push({ name: "Profile", params: { user } });
    },
    scrollToTop() {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    },
  },
  mounted() {
    this.data = this.$route.params;
    this.query = localStorage.getItem("query");
    if (!this.data.isSearch) {
      localStorage.removeItem("query");
      this.query = "";
    }
  },
};
</script>