<template>
  <div class="row justify-content-center" style="    min-height: 1000px;">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent">
          <img :src="'/img/brand/logo.png'" class="login-logo" alt="..." />
        </div>

        <div class="card-body px-lg-5 py-lg-5">
          <form role="form" @submit="onSubmit">
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Username"
              addon-left-icon="ni ni-single-02"
              v-model="model.username"
              name="username"
            ></base-input>

            <base-input
              class="input-group-alternative"
              placeholder="Password"
              type="password"
              addon-left-icon="ni ni-lock-circle-open"
              v-model="model.password"
            ></base-input>

            <base-checkbox class="custom-control-alternative">
              <span class="text-muted">Remember me</span>
            </base-checkbox>
            <div class="text-center">
              <button v-if="loading" type="submit" class="btn my-4 btn-primary" disabled>
                Loading
                <i class="fa fa-spinner fa-spin"></i>
              </button>
              <button v-else type="submit" class="btn my-4 btn-primary">Sign in</button>
            </div>
          </form>
        </div>
      </div>
      <div class="row mt-3">
        <div class="col-6">
          <a href="/#/password-recovery" class="text-light">
            <small>Forgot password?</small>
          </a>
        </div>
        <div class="col-6 text-right">
          <router-link to="/registration" class="text-light">
            <small>Create new account</small>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.card-header {
  display: flex;
  justify-content: center;
  align-content: center;
}

.login-logo {
  max-width: 260px;
  height: 150px;
}
</style>

<script>
import router from "@/router";
import { HTTP } from '@/config/http-common'

export default {
  name: "login",
  data() {
    return {
      loading: false,
      model: {
        username: "",
        password: ""
      }
    };
  },

  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      this.loading = true;
        this.$http.post("/api/v1/client/sessions", this.model)
        .then(response => {
          if (response.status == 200) {
            this.$store.commit('setCurrentUser', response.data.user)
            this.$store.commit('setAuthToken', response.data.auth_token)
            this.storeLogin(response.data);
            this.loading = false;
          }
        })
        .catch(error => {
          this.$toasted.show(error.response.data.error, {
            position: "top-right",
            duration: 5000,
            type: "error",
            closeOnSwipe: true
          });
          this.loading = false;
        });
    },

    storeLogin(data) {
      let action;
      let firstPage = "dashboard?auth=true";
      if (data.user.temp_user) firstPage = "plans";
      action = async () => {
        // await localStorage.setItem("auth_token", data.auth_token);
        await router.push(firstPage);
      };
      action();
    }
  }
};
</script>
