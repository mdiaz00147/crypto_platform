<template>
  <nav
    class="navbar navbar-vertical fixed-left navbar-expand-md navbar-light bg-white"
    id="sidenav-main"
  >
    <div class="container-fluid">
      <!--Toggler-->
      <navbar-toggle-button @click.native="showSidebar">
        <span class="navbar-toggler-icon"></span>
      </navbar-toggle-button>
      <router-link class="navbar-brand" to="/">
        <img :src="logo" class="sidebar-logo d-none d-md-block d-lg-block d-xl-block" alt="...">
      </router-link>

      <slot name="mobile-right">
        <ul class="nav align-items-center d-md-none">
          <!-- <base-dropdown class="nav-item" position="right">
                        <a slot="title" class="nav-link nav-link-icon" href="#" role="button" data-toggle="dropdown"
                           aria-haspopup="true" aria-expanded="false">
                            <i class="ni ni-bell-55"></i>
                        </a>

                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <div class="dropdown-divider"></div>
                        <a class="dropdown-item" href="#">Something else here</a>
          </base-dropdown>-->
          <base-dropdown class="nav-item" position="right">
            <a slot="title" class="nav-link" href="#" role="button">
              <div class="media align-items-center">
                <span class="avatar avatar-sm rounded-circle">
                  <img alt="Image placeholder" :src="'/img/icons/plans/' + $store.getters.currentUser.last_subs.plan.code + '.svg'">
                </span>
              </div>
            </a>

            <div class="dropdown-header noti-title">
              <h6 class="text-overflow m-0">Welcome {{$store.getters.currentUser.username}}!</h6>
            </div>
            <router-link to="/profile" class="dropdown-item">
              <i class="ni ni-single-02"></i>
              <span>My profile</span>
            </router-link>

            <div class="dropdown-divider"></div>
            <a href="#!" class="dropdown-item">
              <i class="ni ni-user-run"></i>
              <span>Logout</span>
            </a>
          </base-dropdown>
        </ul>
      </slot>
      <slot></slot>
      <div
        v-show="$sidebar.showSidebar"
        class="navbar-collapse collapse show"
        id="sidenav-collapse-main"
      >
        <div class="navbar-collapse-header d-md-none">
          <div class="row">
            <div class="col-6 collapse-brand">
              <router-link to="/">
                <img :src="logo">
              </router-link>
            </div>
            <div class="col-6 collapse-close">
              <navbar-toggle-button @click.native="closeSidebar"></navbar-toggle-button>
            </div>
          </div>
        </div>

        <ul class="navbar-nav">
          <slot name="links"></slot>
        </ul>
        <!--Divider-->
        <hr class="my-3">
        <!--Heading-->
        <h6 class="navbar-heading text-muted">ACCOUNT</h6>
        <!--Navigation-->
        <ul class="navbar-nav mb-md-3">
          <li class="nav-item">
            <router-link to="/profile" class="nav-link">
              <i class="ni ni-single-02"></i>
              <span>My profile</span>
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/statements/list" class="nav-link">
              <i class="ni ni-bullet-list-67"></i>
              <span>Statements</span>
            </router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="mailto:support@cryptobusinesscompany.com" >
              <i class="ni ni-bulb-61"></i> Support
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.sidebar-logo {
  width: 200px;
  max-height: 120px !important;
}

.pointer-cursor {
  cursor: pointer;
}

.avatar {
  background-color: white;
  border: 1px solid #e8e8e8
}

.avatar img {
  height: 36px;
}

</style>

<script>
import NavbarToggleButton from "@/components/NavbarToggleButton";
import * as config from "@/config/settings";

export default {
  name: "sidebar",
  components: {
    NavbarToggleButton
  },
  props: {
    logo: {
      type: String,
      default: "img/brand/logo.png",
      description: "Sidebar app logo"
    },
    autoClose: {
      type: Boolean,
      default: true,
      description:
        "Whether sidebar should autoclose on mobile when clicking an item"
    }
  },

  provide() {
    return {
      autoClose: this.autoClose
    };
  },

  methods: {
    closeSidebar() {
      this.$sidebar.displaySidebar(false);
    },
    showSidebar() {
      this.$sidebar.displaySidebar(true);
    }
  },
  beforeDestroy() {
    if (this.$sidebar.showSidebar) {
      this.$sidebar.showSidebar = false;
    }
  }
};
</script>
