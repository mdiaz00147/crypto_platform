<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-cbc"></base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow" :class="this.type === 'dark' ? 'bg-default': ''">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">Statement - {{model.uuid}}</h3>
            </div>

            <div class="card-body">
              <div class="card-header">
                Invoice
                <strong>{{model.created_at}}</strong>
                <span class="float-right">
                  <strong>Status:</strong>
                  <span
                    :class="`text-${model.invoice_status === 'paid' && 'success' || model.invoice_status === 'pending' && 'yellow' || model.invoice_status === 'cancelled' && 'danger'}`"
                  >{{model.invoice_status}}</span>
                </span>
              </div>
              <div class="card-body">
                <div class="row mb-4">
                  <div class="col-sm-6">
                    <h6 class="mb-3">From:</h6>
                    <div>
                      <strong>Crypto Business Company</strong>
                    </div>
                  </div>

                  <div class="col-sm-6">
                    <h6 class="mb-3">To:</h6>
                    <div>
                      <strong>{{model.user.username}}t</strong>
                    </div>
                    <div v-if="model.user.name">Name: {{model.user.name}}</div>
                    <div v-if="model.user.country">{{model.user.city}}, {{model.user.city}}</div>
                    <div>Email: {{model.user.email}}</div>
                    <div v-if="model.user.phone">Phone: {{model.user.phone}}</div>
                  </div>
                </div>

                <div class="table-responsive-sm">
                  <table class="table table-striped">
                    <thead>
                      <tr>
                        <th>Plan</th>
                        <th>Wallet to pay</th>
                        <th class="left">Currency</th>
                        <th class="right">Price</th>
                        <th class="right">Fees</th>
                        <th class="right">Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td class="left strong">{{model.plan.name}}</td>
                        <td class="left">{{model.wallet}}</td>
                        <td class="left strong">{{model.currency.name }}</td>
                        <td class="right">
                          <h4 class="text-dark">{{model.price}}</h4>
                        </td>
                        <td class="right">
                          <h4 class="text-dark">{{model.fees}}</h4>
                        </td>
                        <td class="right">
                          <h4
                            class="text-primary"
                          >{{parseFloat(model.price) + parseFloat(model.fees)}}</h4>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div class="row">
                  <div class="col-lg-4 col-sm-5"></div>

                  <div class="col-lg-4 col-sm-5 ml-auto">
                    <table class="table table-clear">
                      <tbody>
                        <tr>
                          <td class="left">
                            <strong>Subtotal</strong>
                          </td>
                          <td class="right">${{model.plan.price}} USD</td>
                        </tr>
                        <tr>
                          <td class="left">
                            <strong>Fees</strong>
                          </td>
                          <td class="right">${{model.plan.fees}} USD</td>
                        </tr>

                        <tr>
                          <td class="left">
                            <strong>Total</strong>
                          </td>
                          <td class="right">
                            <strong>${{parseFloat(model.plan.price + model.plan.fees)}} USD</strong>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      type: "",
      loading: false,
      model: {
        user: {},
        currency: {},
        plan: {}
      }
    };
  },

  created() {
    this.getData(this.$route.params.id);
  },

  methods: {
    getData(id) {
      this.loading = true;
      this.$http
        .get("/api/v1/client/invoices/" + id, {
          headers: {
            "content-type": "application/json",
            Authorization: this.$store.getters.authToken
          }
        })
        .then(response => {
          this.model = response.data;
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