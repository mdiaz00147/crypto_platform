<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-cbc">
      <!-- Card stats -->
      <div class="row">
        <div class="col-12">
          <h3 class="text-white">TOTAL EARNINGS BY BONUS</h3>
        </div>

        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Daily comissions "
            type="gradient-red"
            :sub-title="'$'+ this.stats.incentive + ' USD'"
            class="mb-4 mb-xl-0"
          ></stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Direct comissions"
            type="gradient-orange"
            :sub-title="'$'+ this.stats.direct + ' USD'"
            class="mb-4 mb-xl-0"
          ></stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Binary comissions"
            type="gradient-green"
            :sub-title="'$'+ this.stats.binary + ' USD'"
            class="mb-4 mb-xl-0"
          ></stats-card>
        </div>
        <div class="col-xl-3 col-lg-6">
          <stats-card
            title="Residual comissions"
            type="gradient-info"
            :sub-title="'$'+ this.stats.residual + ' USD'"
            class="mb-4 mb-xl-0"
          ></stats-card>
        </div>

        <div class="col-12">
          <hr>
        </div>
      </div>
    </base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow" :class="this.type === 'dark' ? 'bg-default': ''">
            <div class="card-header border-0" :class="this.type === 'dark' ? 'bg-transparent': ''">
              <div class="row align-items-center">
                <div class="col">
                  <h3 class="mb-0" :class="this.type === 'dark' ? 'text-white': ''">Reports</h3>
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
                  <th>ID</th>
                  <th>Plan Name</th>
                  <th>Value</th>
                  <th>Status</th>
                  <th>Type</th>
                  <th>Date</th>
                  <!-- <th></th> -->
                </template>

                <template slot-scope="{row}">
                  <td>{{row.id}}</td>
                  <td>
                    <div class="media align-items-center">
                      <div class="media-body">
                        <span
                          class="name mb-0 text-sm"
                        >{{(row.subscription && row.subscription.plan.name) || 'Binary reward'}}</span>
                        <span  v-if="row.referred_user">
                           - <span class="badge badge-warning">{{row.referred_user}}</span>
                        </span>
                      </div>
                    </div>
                  </td>
                  <td class="budget">
                    <h5>${{row.value}} USD</h5>
                  </td>

                  <td>
                    <badge
                      class="badge-dot mr-4"
                      :type="row.reward_status === 'paid' && 'success' || row.reward_status === 'pending' && 'danger'"
                    >
                      <i
                        :class="`bg-${row.reward_status === 'paid' && 'success' || row.reward_status === 'pending' && 'danger'}`"
                      ></i>
                      <span class="status">{{row.reward_status}}</span>
                    </badge>
                  </td>

                  <td class="budget">
                    <badge :type="row.reward_type === 'incentive' && 'default' ||
                    row.reward_type === 'binary' && 'success' || 
                    row.reward_type === 'direct' && 'primary' ||
                    row.reward_type === 'residual' && 'info'
                    ">{{row.reward_type}}</badge>
                  </td>

                  <td scope="row">
                    <span class="name mb-0 text-sm">{{row.created_at}}</span>
                  </td>
                </template>
              </base-table>
            </div>

            <div class="card-footer d-flex justify-content-end"
                :class="type === 'dark' ? 'bg-transparent': ''">
              <base-pagination :total="1"></base-pagination>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  name: "reports-table",
  props: {
    title: String
  },

  data() {
    return {
      type: "",
      loading: false,
      tableData: [],
      stats: {
        incentive:0,
        residual: 0,
        direct:0,
        binary:0
      },
      per_page: 50,
      page: 1
    };
  },

  created() {
    this.last_subs = this.$store.getters.currentUser.last_subs;
    this.getData('incentive,binary,direct,residual', false, this.per_page, this.page)
    this.getData('incentive', true)
    this.getData('direct', true)
    this.getData('binary', true)
    this.getData('residual', true)
  },

  methods: {
    getData(type, total, per_page, page) {
      this.loading = true;
      this.$http({
          url: "/api/v1/client/rewards?type=" + type +"&per_page=" + per_page + "&page=" + page + '&total=' + total,
          method: 'get',
          headers: {
            "content-type": "application/json",
            Authorization: this.$store.getters.authToken
          }
        },
      )
      .then(response => {
        this.loading   = false;
        if (total){
          this.stats[type] = response.data
        } else {
          this.tableData = response.data;
        }
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

<style>
</style>
