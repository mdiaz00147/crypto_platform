<template>
  <div>
    <base-header  class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-cbc"></base-header>

    <div class="container-fluid mt--7">

      <div v-if="!last_subs" class="row mb-5">
        <div class="col">
          <div class="card shadow bg-default">
            <div class="card-body ">
              <h4 class="text-white text-center text-uppercase">
                Please purchase a plan to activate your account! 
              </h4>
            </div>

          </div>
        </div>
      </div>
      
      <div class="row">
        <div class="col">
          <div class="card shadow"
              :class="this.type === 'dark' ? 'bg-default': ''">
            <div class="card-header border-0"
                :class="this.type === 'dark' ? 'bg-transparent': ''">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0" :class="this.type === 'dark' ? 'text-white': ''">
                    {{title}}
                  </h3>
                </div>
              </div>
            </div>
            
            
            <div class="table-responsive">
              <base-table class="table align-items-center table-flush"
                          :class="this.type === 'dark' ? 'table-dark': ''"
                          :thead-classes="this.type === 'dark' ? 'thead-dark': 'thead-light'"
                          tbody-classes="list"
                          :data="tableData">
                          
                <template slot="columns">
                  <th>Plan name</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Benefit</th>
                  <th></th>
                  <!-- <th></th> -->
                </template>

                <template slot-scope="{row}">
                  <th scope="row">
                    <div class="media align-items-center">
                      <a href="#" class="avatar rounded-circle mr-3">
                        <img :src="'/img/icons/plans/'+ row.code + '.svg'">
                      </a>
                      <div class="media-body">
                        <span class="name mb-0 text-sm">{{row.name}}</span>
                      </div>
                    </div>
                  </th>
                  <td class="budget">
                    ${{row.price}} USD
                  </td>
                  <td>
                    <badge class="badge-dot mr-4" :type="row.active && 'success' || !row.active && 'danger'">
                      <i :class="`bg-${row.active && 'success' || !row.active && 'danger'}`"></i>
                      <span class="status">{{row.active && "Active" || !row.active && "Disabled"}}</span>
                    </badge>
                  </td>
                  <td>
                    <span class="text-yellow">Direct rewards up to: {{row.unilevel_percent_1}}%</span>
                    <br>
                    <span>Residual reward 2nd level: {{row.unilevel_percent_2}}%</span>
                    <br>
                    <span class="text-white">Residual reward 3th level: {{row.unilevel_percent_3}}%</span>
                    <br>
                    <span class="text-primary">Daily Comissions: 0.5% UP TO 1%</span>
                  </td>

                  <td>
                    <div class="d-flex align-items-center">
                      <router-link 
                        :to="'/billing?code=' + row.code" 
                        class="btn btn-success"
                        :class="last_subs && parseFloat(last_subs.plan.price) >= parseFloat(row.price) && 'disabled'" 
                      >
                        Buy Now
                      </router-link>
                    </div>
                  </td>

                  <!-- <td class="text-right">
                    <base-dropdown class="dropdown"
                                  position="right">
                      <a slot="title" class="btn btn-sm btn-icon-only text-light" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <i class="fas fa-ellipsis-v"></i>
                      </a>

                      <template>
                        <a class="dropdown-item" href="#">Action</a>
                        <a class="dropdown-item" href="#">Another action</a>
                        <a class="dropdown-item" href="#">Something else here</a>
                      </template>
                    </base-dropdown>
                  </td> -->

                </template>

              </base-table>
            </div>

          </div>

        </div>
      </div>
    </div>
            

  </div>
</template>

<style scoped>
  .avatar {
    background-color: #fff
  }
  .avatar img {
    width: 50px;
    height: 50px
  }
</style>

<script>
  export default {
    name: 'projects-table',
    props: {
      title: String
    },

    data() {
      return {
        type: "dark",
        loading: false,
        tableData: [],
        last_subs: {}
      }
    },

    created(){
      this.getData()
      this.last_subs = this.$store.getters.currentUser.last_subs
    },

    methods: {
      getData(evt) {
        this.loading = true
        this.$http.get('/api/v1/client/plans', {
          headers: {
            "content-type": "application/json",
            Authorization: this.$store.getters.authToken
          }
        })
        .then(response => {
          this.loading = false
          this.tableData = response.data
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
      }
    }
  }
</script>
