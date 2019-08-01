<template>
  <base-nav class="navbar-top navbar-dark" id="navbar-main" :show-toggle-button="false" expand>
    <form class="navbar-search navbar-search-dark form-inline mr-3 d-none d-md-flex ml-lg-auto">
      <div class="form-group mb-0 sponsor-link">
        <div class="mr-4">
          <div class="form-group has-label">
            <div class="row">
              <div class="col" style="display:flex">
                <a
                  @click="swapLeg('left')"
                  :class="'pointer-cursor text-white btn col-6 '  + (!$store.getters.currentUser.right ? ('btn-success disabled') : ('btn-danger'))"
                >LEFT</a>
                <a
                  @click="swapLeg('right')"
                  :class="'pointer-cursor text-white btn  col-6 ' + ($store.getters.currentUser.right ? ('btn-success disabled') : ('btn-danger'))"
                >RIGHT</a>
              </div>
            </div>
          </div>
        </div>
        <base-input
          v-b-tooltip.hover.left
          class="input-group-alternative"
          alternative
          addon-right-icon="fas "
          :value="this.domain + '/#/registration?parent=' + $store.getters.currentUser.username + '&left=' + !$store.getters.currentUser.right"
          v-clipboard:copy="this.domain + '/#/registration?parent=' + $store.getters.currentUser.username + '&left=' + !$store.getters.currentUser.right"
          v-clipboard:success="onCopy"
        ></base-input>
      </div>
    </form>
    <ul class="navbar-nav align-items-center d-none d-md-flex">
      <li class="nav-item dropdown">
        <base-dropdown class="nav-link pr-0">
          <div class="pointer-cursor align-items-center" slot="title" style="display:flex">
            <span class="ml-2 avatar avatar-sm rounded-circle">
              <img
                v-if="$store.getters.currentUser.last_subs"
                alt="Image placeholder"
                :src="'/img/icons/plans/' + $store.getters.currentUser.last_subs.plan.code + '.svg'"
              />
              <img v-else alt="Image placeholder" :src="'/img/icons/user-default-2.svg'" />
            </span>
            <div class="media-body ml-2 d-none d-lg-block">
              <span class="mb-0 text-sm font-weight-bold">{{$store.getters.currentUser.username}}</span>
            </div>
          </div>

          <template>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>My profile</span>
            </router-link>
            <div class="dropdown-divider"></div>
            <a href="#" @click="logout" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </a>
          </template>
        </base-dropdown>
      </li>
    </ul>
  </base-nav>
</template>
<style scoped>
.pointer-cursor {
  cursor: pointer;
}

.avatar {
  background-color: white;
}

.avatar img {
  height: 36px;
}
</style>

<script>
import Vue from "vue";
import * as config from "@/config/settings";
import VueClipboard from "vue-clipboard2";
import BTooltipDirective from "bootstrap-vue/es/directives/tooltip";

Vue.use(VueClipboard);

export default {
  data() {
    return {
      activeNotifications: false,
      showMenu: false,
      searchQuery: "",
      link: "",
      model: {},
      domain: ""
    };
  },

  directives: {
    "b-tooltip": BTooltipDirective
  },

  created() {
    this.domain = config.defaultDomain;
  },

  methods: {
    onCopy() {
      this.$notify({
        type: "success",
        title: "Copied to clipboard"
      });
    },
    toggleSidebar() {
      this.$sidebar.displaySidebar(!this.$sidebar.showSidebar);
    },
    hideSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    toggleMenu() {
      this.showMenu = !this.showMenu;
    },

    swapLeg(leg) {
      leg = leg === "left" ? false : true;
      this.loading = true;
      this.$http({
        method: "put",
        url: "/api/v1/client/users/" + this.$store.getters.uuid,
        data: { right: leg },
        headers: {
          "content-type": "application/json",
          Authorization: this.$store.getters.authToken
        }
      })
        .then(response => {
          config.setUser(response.data);
          this.$store.commit("setCurrentUser", response.data);
          this.$toasted.show("Power Leg Updated!", {
            position: "top-right",
            duration: 5000,
            type: "success",
            closeOnSwipe: true
          });
          this.loading = false;
        })
        .catch(error => {
          error.response.data &&
            error.response.data.map(m => {
              this.$toasted.show(m, {
                position: "top-right",
                duration: 5000,
                type: "error",
                closeOnSwipe: true
              });
            });
          this.loading = false;
        });
    },

    logout() {
      config.logout();
    }
  }
};
</script>
