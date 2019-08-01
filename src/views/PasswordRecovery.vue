<template>
  <div class="row justify-content-center" style="    min-height: 1000px;">
    <div class="col-lg-5 col-md-7">
      <div class="card bg-secondary shadow border-0">
        <div class="card-header bg-transparent">
          <img :src="'/img/brand/logo.png'" class="login-logo" alt="...">
        </div>
        <div class="card-body px-lg-5 py-lg-5">
          <form role="form" @submit="onSubmit">
            <p class="text-center">
              <h4>Recover your password</h4>
              <br>
              Enter your username and we will send a new one
            </p>
            <base-input
              class="input-group-alternative mb-3"
              placeholder="Username"
              addon-left-icon="ni ni-single-02"
              v-model="model.username"
            ></base-input>

            <div class="text-center">
              <button v-if="loading" type="submit" class="btn my-4 btn-primary" disabled>
                Loading
                <i class="fa fa-spinner fa-spin"></i>
              </button>
              <button v-else type="submit" class="btn my-4 btn-primary">Recover now</button>
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
      this.loading = true;
      evt.preventDefault();
      this.$http.post("/api/v1/client/pass_recoveries", this.model)
        .then(response => {
          this.$toasted.show('Please check your email to get your new password', {
            position: "top-center",
            duration: 5000,
            type: "default",
            closeOnSwipe: true
          });
          this.loading = false
          this.model = {}
        })
        .catch(error => {
          this.$toasted.show(error.response.data.status, {
            position: "top-center",
            theme:'toasted-primary',
            duration: 5000,
            type: "default",
            closeOnSwipe: true
          });
          this.loading = false;
        })
    },

    storeLogin(data) {
      let action;
      let firstPage = "dashboard?auth=true";
      action = async () => {
        await localStorage.setItem("auth_token", data.auth_token);
        await localStorage.setItem("user", JSON.stringify(data.user));
        await router.push(firstPage);
      };
      action();
    }
  }
};
</script>
