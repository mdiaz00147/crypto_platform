<template>
  <div class="card bg-dark text-white">
    <div class="card-header border-0">
      <div class="row align-items-center">
        <div class="col">
          <h3 class="mb-0">Top Markets</h3>
        </div>
      </div>
    </div>

    <iframe src="https://coin360.com/widget/map.html" frameborder="0" title="Coin360.com: Cryptocurrency Market State" width="100%" height="600"></iframe>

    <div class="table-responsive" v-show="false">
      <base-table thead-classes="thead-light" :data="tableData">
        <template slot="columns">
          <th>Username</th>
          <!-- <th>Country</th> -->
          <!-- <th>Total rewards</th> -->
          <th>Started date</th>
        </template>

        <template slot-scope="{row}">
          <th scope="row">{{row.username}}</th>
          <!-- <td>{{row.country || !row.country && "United States"}} <img class="ml-2" :src="'https://raw.githubusercontent.com/hjnilsson/country-flags/master/png100px/' + (row.country_iso || !row.country_iso && 'us') + '.png'" width='40px' /></td> -->
          <!-- <td>
            <h5>${{row.vault.total_rewards}} USD</h5>
          </td> -->
          <td>
            <i class="fas fa-thumbs-up text-success mr-3"></i>
            {{row.created_at}}
          </td>
        </template>
      </base-table>
    </div>
  </div>
</template>
<script>
export default {
  name: "page-visits-table",
  data() {
    return {
      tableData: []
    };
  },

  created() {
    this.getPlan();
  },

  methods: {
    getPlan() {
      this.loading = true;
      this.$http
        .get("/api/v1/client/users", {
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
<style>
</style>
