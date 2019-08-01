<template>
  <div class="wrapper" :class="{ 'nav-open': $sidebar.showSidebar }">
    <side-bar
      :background-color="sidebarBackground"
      short-title="Argon"
      title="Argon"
    >
      <template slot="links">
        <sidebar-item :link="this.$store.getters.currentUser.temp_user && {name: 'Dashboard', icon: 'ni ni-tv-2 text-orange', path: '/plans'} || !this.$store.getters.currentUser.temp_user && {name: 'Dashboard', icon: 'ni ni-tv-2 text-orange', path: '/dashboard' } "/>
        <sidebar-item :link="{name: 'Plans', icon: 'ni ni-shop text-orange', path: '/plans'}"/>
        <sidebar-item :link="this.$store.getters.currentUser.temp_user && {name: 'Reports', icon: 'ni ni-chart-bar-32 text-orange', path: '/plans'} || !this.$store.getters.currentUser.temp_user && {name: 'Reports', icon: 'ni ni-chart-bar-32 text-orange', path: '/reports'}"/>
        <sidebar-item :link="this.$store.getters.currentUser.temp_user && {name: 'Binary Network', icon: 'ni ni-building text-orange', path: '/plans'} || !this.$store.getters.currentUser.temp_user && {name: 'Binary Network', icon: 'ni ni-building text-orange', path: '/binary-net'}"/>
        <sidebar-item :link="this.$store.getters.currentUser.temp_user && {name: 'Subscriptions', icon: 'ni ni-money-coins text-orange', path: '/plans'} || !this.$store.getters.currentUser.temp_user && {name: 'Subscriptions', icon: 'ni ni-money-coins text-orange', path: '/subscriptions'}"/>
      </template>
    </side-bar>
    <div class="main-content" :data="sidebarBackground">
      <dashboard-navbar></dashboard-navbar>

      <div @click="toggleSidebar">
        <fade-transition :duration="200" origin="center top" mode="out-in">
          <!-- your content here -->
          <router-view></router-view>
        </fade-transition>
        <content-footer v-if="!$route.meta.hideFooter"></content-footer>
      </div>
    </div>
  </div>
</template>
<script>
  import DashboardNavbar from './DashboardNavbar.vue';
  import ContentFooter from './ContentFooter.vue';
  import { FadeTransition } from 'vue2-transitions';

  export default {
    components: {
      DashboardNavbar,
      ContentFooter,
      FadeTransition
    },

    data() {
      return {
        sidebarBackground: 'vue', //vue|blue|orange|green|red|primary
        model: {}
      }
    },

    methods: {
      toggleSidebar() {
        if (this.$sidebar.showSidebar) {
          this.$sidebar.displaySidebar(false);
        }
      }
    }
  };
</script>
<style lang="scss">
</style>
