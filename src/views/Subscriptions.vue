<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-cbc"></base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow" :class="this.type === 'dark' ? 'bg-default': ''">
            <div class="card-header border-0" :class="this.type === 'dark' ? 'bg-transparent': ''">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0" :class="this.type === 'dark' ? 'text-white': ''">Susbcriptions</h3>
                </div>
              </div>
            </div>

            <div class="table-responsive">
              <base-table
                class="table align-items-center table-flush"
                :class="this.type === 'dark' ? 'table-dark': ''"
                :thead-classes="this.type === 'dark' ? 'thead-dark': 'thead-light'"
                tbody-classes="list"
                :data="tableData"
              >
                <template slot="columns">
                  <th>Plan name</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>2X</th>
                  <th>3X</th>
                  <th></th>
                  <!-- <th></th> -->
                </template>

                <template slot-scope="{row}">
                  <th scope="row">
                    <div class="media align-items-center">
                      <a href="#" class="avatar rounded-circle mr-3">
                        <img :src="'/img/icons/plans/'+ row.plan.code + '.svg'" />
                      </a>
                      <div class="media-body">
                        <span class="name mb-0 text-sm">{{row.plan.name}}</span>
                      </div>
                    </div>
                  </th>
                  <td class="budget">
                    <h5 class="text-white">${{row.plan.price}} USD</h5>
                  </td>
                  <td>
                    <badge
                      class="badge-dot mr-4"
                      :type="row.subscription_status === 'active' && 'success' || row.subscription_status === 'expired' && 'danger'"
                    >
                      <i
                        :class="`bg-${row.subscription_status === 'active' && 'success' || row.subscription_status === 'expired' && 'danger'}`"
                      ></i>
                      <span class="status">{{row.subscription_status}}</span>
                    </badge>
                  </td>
                  <td>
                    <div class="d-flex align-items-center">
                      <span class="completion mr-2">{{row.double_percent}}%</span>
                      <div>
                        <base-progress
                          :type="'blue'"
                          :show-percentage="false"
                          class="pt-0"
                          :value="row.double_percent"
                        />
                      </div>
                    </div>
                  </td>

                  <td>
                    <div class="d-flex align-items-center">
                      <span class="completion mr-2">{{row.triple_percent}}%</span>
                      <div>
                        <base-progress
                          :type="'warning'"
                          :show-percentage="false"
                          class="pt-0"
                          :value="row.triple_percent"
                        />
                      </div>
                    </div>
                  </td>

                  <td>
                    <div class="d-flex align-items-center">
                      <router-link :to="'/statements/' + row.id" class="btn btn-success disabled">
                        Details
                        <span class="ni ni-align-left-2"></span>
                      </router-link>
                    </div>
                  </td>
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
  background-color: #fff;
}
.avatar img {
  width: 50px;
  height: 50px;
}
</style>
<script>
export default {
  name: "projects-table",
  props: {
    title: String
  },

  data() {
    return {
      type: "dark",
      loading: false,
      tableData: [],
      last_subs: {}
    };
  },

  created() {
    this.last_subs = this.$store.getters.currentUser.last_subs;
    this.getData();
  },

  methods: {
    getData(evt) {
      this.loading = true;
      this.$http
        .get("/api/v1/client/subscriptions", {
          headers: {
            "content-type": "application/json",
            Authorization: this.$store.getters.authToken
          }
        })
        .then(response => {
          this.loading = false;
          this.tableData = response.data;
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
