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
        <div v-show="showAboutTab">
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
        <div v-show="showProjectsTab">
          <div v-for="(project, index) in projects" :key="project.id">
            <h4>{{ index }}</h4>
            <p>{{ project.name }}</p>
            <p>{{ project.language }}</p>
            <p>{{ project.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { findUser, findRepos } from "../services/index";
export default {
  name: "Profile",
  data() {
    return {
      user: {},
      projects: [],
      showAboutTab: true,
      showProjectsTab: false,
    };
  },
  mounted() {
    this.fetchUserInfo();
  },
  methods: {
    fetchUserInfo() {
      const username = this.$route.params.user.login;
      findUser(username)
        .then((resp) => {
          this.user = resp.data;
        })
        .finally(() => {
          findRepos(username).then((resp) => {
            this.projects = resp.data;
          });
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
  },
};
</script>

<style>
</style>