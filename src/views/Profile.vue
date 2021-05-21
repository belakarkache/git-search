<template>
  <div class="profile">
    <div class="profile__header">
      <div class="profile__header-user-info">
        <img :src="user.avatar_url" />
        <h2>{{ user.name }}</h2>
        <h4>
          <i class="fas fa-user"></i>
          {{ user.login }}
        </h4>
      </div>
    </div>

    <div class="profile__actions">
      <div class="profile__actions-action">
        <i class="fas fa-male"></i>
        <span>{{ user.following }}</span>
        <p>Seguindo</p>
      </div>

      <div class="profile__actions-action">
        <i class="far fa-folder-open"></i>
        <span>{{ user.public_repos }}</span>
        <p>Projetos</p>
      </div>

      <div class="profile__actions-action">
        <i class="fas fa-users"></i>
        <span>{{ user.followers }}</span>
        <p>Seguidores</p>
      </div>
    </div>

    <div class="profile__tabs">
      <div class="profile__tabs-buttons">
        <button :class="showAboutTab ? 'active' : ''" @click="showTab('about')">
          Sobre
        </button>
        <button
          :class="showProjectsTab ? 'active' : ''"
          @click="showTab('projects')"
        >
          Projetos
        </button>
      </div>

      <div class="profile__tabs-content">
        <transition name="fade">
          <div v-if="showAboutTab">
            <div class="user-information" v-if="user.bio">
              <h3>Bio</h3>
              <p>{{ user.bio }}</p>
            </div>

            <div class="extra-information">
              <span>
                <i class="fas fa-home"></i>
                <h4>{{ user.location || "Desconhecido" }}</h4>
              </span>

              <span>
                <i class="fas fa-laptop"></i>
                <h4>{{ user.blog || "Não preencheu" }}</h4>
              </span>
            </div>
          </div>
        </transition>
        <transition name="fade">
          <div v-if="showProjectsTab">
            <div v-for="project in projects" :key="project.id" class="project">
              <div class="header">
                <h3>
                  <a :href="project.html_url" target="_blank">{{
                    project.name
                  }}</a>
                </h3>
                <p>{{ project.description }}</p>
              </div>

              <div class="project__footer">
                <span class="project__footer-language">
                  <span :class="project.language" class="language-circle" />
                  <p>{{ project.language }}</p>
                </span>
                <p>Atualizado em {{ formatDate(project.updated_at) }}</p>
              </div>
            </div>
            <Message v-if="noMoreProjects" :content="content" />
          </div>
        </transition>
      </div>
    </div>
    <Spinner :loading="loading" />
    <ScrollToTop v-if="showScrollToTop" />
  </div>
</template>

<script>
import { findUser, findRepos } from "../services/index";
import { format } from "date-fns";
import Spinner from "../components/Spinner";
import Message from "../components/Message";
import ScrollToTop from "../components/ScrollToTop";

export default {
  name: "Profile",
  components: { Spinner, Message, ScrollToTop },
  data() {
    return {
      user: {},
      projects: [],
      showAboutTab: true,
      showProjectsTab: false,
      page: 1,
      loading: false,
      noMoreProjects: false,
      content: {
        title: "Fim da lista",
        message: "Não foram encontrados mais projetos",
      },
      showScrollToTop: false,
    };
  },
  mounted() {
    this.scrolled();
    this.fetchUserInfo();
  },
  beforeMount() {
    this.getInitialProjects();
  },
  methods: {
    fetchUserInfo() {
      const username = this.$route.params.user.login;
      findUser(username).then((resp) => {
        this.user = resp.data;
      });
    },
    showTab(activeTab) {
      if (activeTab === "about") {
        this.showAboutTab = true;
        this.showProjectsTab = false;
      } else if (activeTab === "projects") {
        this.showProjectsTab = true;
        this.showAboutTab = false;
      }
    },
    formatDate(date) {
      if (date) {
        return format(new Date(date), "dd/MM/yyyy");
      }
      return date;
    },
    loadMoreResults() {
      if (!this.noMoreProjects) {
        findRepos(this.$route.params.user.login, this.page++)
          .then((resp) => {
            this.loading = true;
            if (resp.data.length >= 1) {
              this.projects.push(...resp.data);
            }
            if (resp.data.length === 0 && this.showProjectsTab) {
              this.noMoreProjects = true;
            }
          })
          .finally(() => {
            this.loading = false;
          });
      }
      return;
    },
    getInitialProjects() {
      this.loadMoreResults();
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
  },
};
</script>