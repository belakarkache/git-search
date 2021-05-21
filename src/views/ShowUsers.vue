<template>
  <div class="show-users">
    <span class="header">
      <h2 class="show-users__title">Search Results</h2>
      <div class="show-users__search">
        <i class="fas fa-search"></i>
        <input
          type="text"
          v-model="query"
          placeholder="Pesquisar..."
          @keypress.enter="searchInside"
        />
      </div>
    </span>
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
    </div>
    <Message v-if="noMoreUsers" :content="content" />
    <Spinner :loading="loading" />
    <ScrollToTop v-if="showScrollToTop" />
  </div>
</template>

<script>
import { searchUsers, allUsers } from "../services/index";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import ScrollToTop from "../components/ScrollToTop";

export default {
  name: "ShowUsers",
  components: { Spinner, Message, ScrollToTop },
  data() {
    return {
      results: [],
      query: "",
      page: 1,
      noMoreUsers: false,
      loading: false,
      content: {
        title: "Sem resultados",
        message: "Tente buscar novamente com outras palavras :)",
      },
      noMoreSearch: false,
      showScrollToTop: false,
    };
  },
  methods: {
    loadMoreResults() {
      if (
        this.$route.params.isSearch &&
        this.$route.params.query &&
        !this.noMoreUsers
      ) {
        this.loading = true;
        searchUsers(this.$route.params.query, this.page++)
          .then((resp) => {
            const total = resp.data.total_count;
            if (resp.data.items.length === 0) {
              this.results = resp.data.items;
            }
            if (total <= 10) {
              this.content.title = "Não encontrou o que procurava?";
              this.noMoreUsers = true;
            }
            this.results.push(...resp.data.items);
            if (resp.data.items.length === 0) {
              this.noMoreUsers = true;
            }
          })
          .finally(() => (this.loading = false));
      }
      if (!this.$route.params.isSearch) {
        this.loading = true;
        allUsers(this.results[this.results.length - 1].id)
          .then((resp) => {
            this.results.push(...resp.data);
          })
          .finally(() => (this.loading = false));
      }
    },
    searchInside() {
      this.results = [];
      this.$route.params.query = this.query;
      this.page = 0;
      this.$route.params.isSearch = true;
      this.loadMoreResults();
    },
    openProfile(user) {
      this.$router.push({ name: "Profile", params: { user } });
    },
    scrolled() {
      window.onscroll = () => {
        let windowBottom =
          document.documentElement.scrollTop + window.innerHeight ===
          document.documentElement.offsetHeight;
        if (windowBottom) {
          this.showScrollToTop = true;
          this.loadMoreResults();
        }
      };
    },
    getInitialUsers() {
      if (this.$route.params.isSearch) {
        this.loadMoreResults();
      } else {
        this.loading = true;
        allUsers()
          .then((resp) => {
            this.results = resp.data;
          })
          .finally(() => (this.loading = false));
      }
    },
  },
  beforeMount() {
    this.getInitialUsers();
  },
  mounted() {
    this.scrolled();
    this.query = localStorage.getItem("query");
    if (!this.$route.params.isSearch) {
      localStorage.removeItem("query");
      this.query = "";
    }
  },
};
</script>