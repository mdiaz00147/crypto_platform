<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-cbc"></base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow" :class="this.type === 'dark' ? 'bg-default': ''">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">Statements</h3>
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
                  <th>Plan name</th>
                  <th>Price</th>
                  <th>Status</th>
                  <th>Date</th>
                  <th></th>
                </template>

                <template slot-scope="{row}">
                  <th scope="row">{{row.id}}</th>
                  <th scope="row">
                    <div class="media align-items-center">
                      <div class="media-body">
                        <span class="name mb-0 text-sm">{{row.plan.name}}</span>
                      </div>
                    </div>
                  </th>

                  <td class="budget">
                    <h5>${{row.plan.price}} USD</h5>
                  </td>

                  <td>
                    <badge class="badge-dot mr-4">
                      <i
                        :class="`bg-${row.invoice_status === 'paid' && 'success' || row.invoice_status === 'pending' && 'yellow'}`"
                      ></i>
                      <span
                        :class="`text-${row.invoice_status === 'paid' && 'success' || row.invoice_status === 'pending' && 'yellow' || row.invoice_status === 'cancelled' && 'danger'}`"
                      >{{row.invoice_status}}</span>
                    </badge>
                  </td>

                  <td>
                    <span class="name mb-0 text-sm">{{row.created_at}}</span>
                  </td>

                  <td>
                    <div class="d-flex align-items-center">
                      <router-link :to="'/statements/' + row.id" class="btn btn-success">
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
<script>
// import { HTTP } from '@/config/http-common'

// console.log(HTTP)
export default {
  data() {
    return {
      type: "",
      loading: false,
      tableData: []
    };
  },

  created() {
    this.getData();
  },

  methods: {
    getData() {
      this.loading = true;
      this.$http
        .get("/api/v1/client/invoices", {
          headers: {
            "content-type": "application/json",
            Authorization: this.$store.getters.authToken
          }
        })
        .then(response => {
          this.tableData = response.data;
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