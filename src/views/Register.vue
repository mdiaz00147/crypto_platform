<template>
    <div class="row justify-content-center">
        <div class="col-lg-5 col-md-7">
            <div class="card bg-secondary shadow border-0">
                <div class="card-header bg-transparent ">
                        <img :src="'/img/brand/logo.png'" class=" login-logo " alt="...">
                    </div>
                <div class="card-body px-lg-5 py-lg-5">
                    <form role="form" @submit="onSubmit">

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Username"
                                    addon-left-icon="ni ni-single-02"
                                    v-model="model.username">
                        </base-input>

                        <base-input class="input-group-alternative mb-3"
                                    placeholder="Email"
                                    type="email"
                                    addon-left-icon="ni ni-email-83"
                                    v-model="model.email">
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="Password"
                                    type="password"
                                    addon-left-icon="ni ni-lock-circle-open"
                                    v-model="model.password">
                        </base-input>

                        <base-input class="input-group-alternative"
                                    placeholder="Sponsor"
                                    type="text"
                                    addon-left-icon="ni ni-spaceship"
                                    v-model="model.parent_uuid">
                        </base-input>
                        
                        <div class="text-muted font-italic">
                            <small>password strength: <span class="text-success font-weight-700">strong</span></small>
                        </div>

                        <div class="row my-4">
                            <div class="col-12">
                                <base-checkbox class="custom-control-alternative">
                                    <span class="text-muted">I agree with the <a href="/#/tos">Privacy Policy</a></span>
                                </base-checkbox>
                            </div>
                        </div>
                        <div class="text-center">
                          <button v-if="loading" type="submit" class="btn my-4 btn-primary" disabled>Loading <i class="fa fa-spinner fa-spin"></i></button>
                          <button v-else type="submit" class="btn my-4 btn-primary">Create account</button>
                          
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
                    <router-link to="/login" class="text-light">
                        <small>Login into your account</small>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>
<style scoped>
  .card-header{
    display: flex;
    justify-content: center;
    align-content: center
  }

  .login-logo{
      max-width: 260px;
      height: 150px;
  }
</style>
<script>
  import router from '@/router'

  export default {
    name: 'register',
    data() {
      return {
        loading:false,
        model: {
          username: '',
          email: '',
          password: '',
          parent_uuid:''
        }
      }
    },

    mounted(){
      this.model.parent_uuid = this.$route.query.parent
      this.model.left_parent_bak = this.$route.query.left
    },
  
    methods:{
      onSubmit(evt) {
        evt.preventDefault()
        this.loading = true
        this.$http.post('/api/v1/client/users', this.model)
        .then(response => {
          if (response.status == 200) this.storeLogin(response.data)
          this.loading = false
        })
        .catch((error) => {
          error.response.data && error.response.data.map((m) => {
            this.$toasted.show(m, {
              position:'top-right',
              duration: 5000,
              type: 'error',
              closeOnSwipe: true
            })
          })
          this.loading = false
        })
      },

      storeLogin(data){
        let action
        let firstPage = "dashboard?auth=true"
        if(data.user.temp_user) firstPage = "plans"

        action = async() => {
          await localStorage.setItem('auth_token', data.auth_token)
          await localStorage.setItem('user', JSON.stringify(data.user))
          await router.push(firstPage)
        }
        action()
      }
    }
  }
</script>
<style>
</style>
