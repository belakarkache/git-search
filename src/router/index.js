import Vue from 'vue'
import VueRouter from 'vue-router'
import Search from '../views/Search.vue';
import ShowUsers from '../views/ShowUsers.vue';

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Search',
    component: Search,
    props: true,
  },
  {
    path: '/show-users',
    name: 'ShowUsers',
    component: ShowUsers,
  }
]

const router = new VueRouter({
  routes
})

export default router
