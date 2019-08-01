<template>
  <div>
    <base-header
      class="header pb-8 pt-5 pt-lg-8 d-flex align-items-center"
      style="min-height: 600px; background-image: url(img/theme/crypto-cover.jpg); background-size: cover; background-position: center top;"
    >
      <!-- Mask -->
      <span class="mask bg-gradient-cbc opacity-8"></span>
      <!-- Header container -->
      <div class="container-fluid d-flex align-items-center">
        <div class="row">
          <div class="col-lg-7 col-md-10">
            <h1 class="display-2 text-white">Hello {{$store.getters.currentUser.username}}</h1>
            <p
              class="text-white mt-0 mb-5"
            >This is your profile page. Here you can update your account settings and information.</p>
          </div>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-4 order-xl-2 mb-5 mb-xl-0">
          <div class="card card-profile shadow">
            <div class="row justify-content-center">
              <div class="col-lg-3 order-lg-2">
                <div class="card-profile-image">
                  <a href="#">
                    <img
                      v-if="$store.getters.currentUser.last_subs"
                      alt="Image placeholder"
                      :src="'/img/icons/plans/' + $store.getters.currentUser.last_subs.plan.code + '.svg'"
                      class="rounded-circle"
                    />
                    <img
                      v-else
                      alt="Image placeholder"
                      :src="'/img/icons/user-default-2.svg'"
                      class="rounded-circle"
                    />
                  </a>
                </div>
              </div>
            </div>
            <div class="card-header text-center border-0 pt-8 pt-md-4 pb-0 pb-md-4"></div>
            <div class="card-body pt-0 pt-md-4">
              <div class="row">
                <div class="col">
                  <div class="card-profile-stats d-flex justify-content-center mt-md-5">
                    <div>
                      <span class="heading">{{$store.getters.currentUser.direct_users}}</span>
                      <span class="description">Direct affiliates</span>
                    </div>
                    <div>
                      <span class="heading">{{$store.getters.currentUser.binary_users}}</span>
                      <span class="description">Binary affiliates</span>
                    </div>
                  </div>
                </div>
              </div>
              <div class="text-center">
                <h3>{{$store.getters.currentUser.name}} {{$store.getters.currentUser.last_name}}</h3>
                <div class="h5 font-weight-300">
                  <i class="ni location_pin mr-2"></i>
                  {{$store.getters.currentUser.city}}, {{$store.getters.currentUser.country}}
                </div>
                <div class="h5 mt-4">
                  <i class="ni business_briefcase-24 mr-2"></i>
                  Last IP - {{$store.getters.currentUser.last_ip}}
                </div>
                <div>
                  <i class="ni education_hat mr-2"></i>
                  Last login: {{$store.getters.currentUser.last_login}}
                </div>
                <hr class="my-4" />
                <p>
                  {{$store.getters.currentUser.username}} — was sponsored by
                  <b>{{$store.getters.currentUser.sponsor && $store.getters.currentUser.sponsor.username}}</b>
                </p>
                <p>
                  {{$store.getters.currentUser.username}} — was created at
                  <b>{{$store.getters.currentUser.created_at}}</b>
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-8 order-xl-1">
          <card shadow type="secondary">
            <div slot="header" class="bg-white border-0">
              <div class="row align-items-center">
                <div class="col-8">
                  <h3 class="mb-0">My account</h3>
                </div>
                <div class="col-4 text-right">
                  <a href="#!" class="btn btn-sm btn-primary">Settings</a>
                </div>
              </div>
            </div>
            <template>
              <form @submit="onSubmit">
                <h6 class="heading-small text-muted mb-4">Invitation LINK</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-8">
                      <base-input
                        label="Link"
                        placeholder
                        input-classes="form-control-alternative"
                        :value="this.domain + '/#/registration?parent=' + $store.getters.currentUser.username + '&left=' + !$store.getters.currentUser.right"
                        v-clipboard:copy="this.domain + '/#/registration?parent=' + $store.getters.currentUser.username + '&left=' + !$store.getters.currentUser.right"
                        v-clipboard:success="onCopy"
                      />
                    </div>
                    <div class="col-lg-4">
                      <div class="form-group has-label">
                        <label class="form-control-label" for>Power leg</label>
                        <div class="row">
                          <div class="col" style="display:flex">
                            <a
                              @click="swapLeg('left')"
                              class="pointer-cursor text-white btn btn-danger col-6"
                              :class="!$store.getters.currentUser.right ? 'disabled' : ''"
                            >LEFT</a>
                            <a
                              @click="swapLeg('right')"
                              class="pointer-cursor text-white btn btn-danger col-6"
                              :class="$store.getters.currentUser.right ? 'disabled' : ''"
                            >RIGHT</a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <h6 class="heading-small text-muted mb-4">User information</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Username"
                        placeholder="Username"
                        input-classes="form-control-alternative"
                        v-model="model.username"
                        readonly
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Email address"
                        placeholder="jesse@example.com"
                        input-classes="form-control-alternative"
                        v-model="model.email"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="First name"
                        placeholder="First name"
                        input-classes="form-control-alternative"
                        v-model="model.name"
                      />
                    </div>
                    <div class="col-lg-6">
                      <base-input
                        alternative
                        label="Last name"
                        placeholder="Last name"
                        input-classes="form-control-alternative"
                        v-model="model.last_name"
                      />
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <!-- Address -->
                <h6 class="heading-small text-muted mb-4">Contact information</h6>
                <div class="pl-lg-4">
                  <div class="row">
                    <div class="col-md-12">
                      <base-input
                        alternative
                        label="Address"
                        placeholder="Home Address"
                        input-classes="form-control-alternative"
                        v-model="model.address"
                      />
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-lg-4">
                      <base-input
                        alternative
                        label="City"
                        placeholder="City"
                        input-classes="form-control-alternative"
                        v-model="model.city"
                      />
                    </div>
                    <div class="col-lg-4">
                      <base-input
                        alternative
                        label="Country"
                        placeholder="Country"
                        input-classes="form-control-alternative"
                        v-model="model.country"
                      />
                    </div>
                    <div class="col-lg-4">
                      <base-input
                        alternative
                        label="Postal code"
                        placeholder="Postal code"
                        input-classes="form-control-alternative"
                        v-model="model.zip"
                      />
                    </div>
                  </div>
                </div>
                <hr class="my-4" />
                <h6 class="heading-small text-muted mb-4">Security</h6>

                <!-- Description -->
                <div class="pl-lg-4">
                  <base-input
                    alternative
                    label="PAYOUT WALLET (BTC)"
                    input-classes="form-control-alternative"
                    v-model="model.btc_wallet"
                  />

                  <base-input
                    alternative
                    label="Password"
                    input-classes="form-control-alternative"
                    v-model="model.password"
                  />

                  <base-input
                    alternative
                    label="New password confirmation"
                    input-classes="form-control-alternative"
                    v-model="model.password_confirmation"
                  />

                  <button v-if="loading" type="submit" class="btn btn-success" disabled>
                    Laoding
                    <i class="fa fa-spinner fa-spin"></i>
                  </button>

                  <button v-else type="submit" class="btn btn-success">Save changes</button>
                </div>
              </form>
            </template>
          </card>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.card-profile-image img {
  height: 180px;
  width: 180px;
}
</style>

<script>
import * as config from "@/config/settings";

export default {
  name: "user-profile",
  data() {
    return {
      loading: false,
      model: {
        username: "",
        email: "",
        name: "",
        last_name: "",
        address: "",
        city: "",
        country: "",
        zip: "",
        about: "",
        link: ""
      }
    };
  },

  created() {
    this.model = this.$store.getters.currentUser;
    this.domain = config.defaultDomain;
  },

  methods: {
    onCopy() {
      this.$notify({
        type: "success",
        title: "Copied to clipboard"
      });
    },
    onSubmit(evt) {
      evt.preventDefault();
      this.loading = true;
      this.sendUserdata(this.model);
    },

    swapLeg(leg) {
      leg = leg === "left" ? false : true;
      this.loading = true;
      this.sendUserdata({ right: leg });
    },

    sendUserdata(object) {
      this.$http({
        method: "put",
        url: "/api/v1/client/users/" + this.$store.getters.currentUser.uuid,
        data: object,
        headers: {
          "content-type": "application/json",
          Authorization: this.$store.getters.authToken
        }
      })
        .then(response => {
          this.$store.commit("setCurrentUser", response.data);
          this.$toasted.show("Information updated!", {
            position: "top-right",
            duration: 5000,
            type: "dark",
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
    }
  }
};
</script>

