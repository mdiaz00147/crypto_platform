<template>
  <div>
    <base-header  class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-cbc"></base-header>
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow "  >
            <div class="card-header bg-transparent"  >

              <h3 class="mb-0"  >
                Billing 
              </h3>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-xs-12  col-sm-12 col-md-7 d-flex align-items-center"> 
                  <div class="col" v-if="!this.invoice.price">
                    <p><h2 class="text-dark">{{this.model.name}}</h2></p>
                    <p >How would you like to pay?</p>

                    <button v-if="loading" class="btn btn-success btn-block" disabled>
                      BITCOIN <i class="fa fa-spinner fa-spin"></i>
                    </button>
                    <button v-else class="btn btn-success btn-block" @click="createInvoice(12)">
                      BITCOIN
                    </button>

                    <button v-if="loading" class="btn btn-default btn-block" disabled>
                      LITECOIN <i class="fa fa-spinner fa-spin"></i>
                    </button>
                    <button v-else class="btn btn-default btn-block" @click="createInvoice(13)">
                      LITECOIN
                    </button>
                    
                  </div>
                  <div v-else class="col">
                    <p><h2 class="text-dark">{{this.model.name}}</h2></p>
                    <p>Please send the exact amount of <span class="text-danger"><b>{{this.invoice.price}} {{this.invoice.currency && this.invoice.currency.name}}</b></span> to the following address:</p>
                    <p>
                      <input 
                        v-b-tooltip.hover.left
                        type="text" 
                        class="form-control text-dark border-success" 
                        v-model="this.invoice.wallet"
                        v-clipboard:copy="this.invoice.wallet"
                        v-clipboard:success="onCopy"
                      >
                    </p>
                    <p>Plans are activated after the confirmation number 1 on the blockchain.</p>
                    <p class="mb-5"><b>Time left for this payment:</b></p>
                    <flip-clock class="clock-custom" :options="options" />

                    <p class="text-center mt-5">Thanks for your purchase!</p>
                  </div>
                </div>
                <div class="col-xs-12  col-sm-12 col-md-5 d-flex justify-content-center align-items-center">
                  <div class="col text-center">
                    <h2>Plan price: ${{this.model.price}} USD</h2>
                    <small>Fees: ${{this.model.fees}} USD</small>
                    <qrcode :class="!this.invoice.price && 'opacity-wallet'" :value="this.wallet" :options="{ width: 350 }"></qrcode>
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
  import Vue from 'vue';
  import VueQrcode from '@chenfengyuan/vue-qrcode'
  import VueClipboard from 'vue-clipboard2'
  import BTooltipDirective from 'bootstrap-vue/es/directives/tooltip'
  import { FlipClock } from '@mvpleung/flipclock';

  Vue.use(VueClipboard)
  Vue.component(VueQrcode.name, VueQrcode)

  export default {
    name: 'billing-table',

    components: {
      FlipClock
    },

    data() {
      return {
        type: "dark",
        wallet: 'Please select a payment method',
        loading: false,
        model: {},
        invoice: {},
        options: {
          digit: 600,
          countdown: true,
          clockFace: 'MinuteCounter'
        }
      }
    },

    created(){
      this.getPlan(this.$route.query.code)
    },

    directives: {
      'b-tooltip': BTooltipDirective
    },

    methods: {
      getPlan(code) {
        this.loading = true
        this.$http.get('/api/v1/client/plans/' + code, {
          headers: {
            "content-type": "application/json",
            Authorization: this.$store.getters.authToken
          }
        })
        .then(response => {
          this.loading = false
          this.model  = response.data
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

      createInvoice(currency_id){
        this.loading = true
        this.$http({
          url: '/api/v1/client/invoices',
          method: 'post',
          data: {
            currency_id: currency_id,
            plan_id: this.model.code
          },
          headers: {
            "content-type": "application/json",
            Authorization: this.$store.getters.authToken
          }
        })
        .then(response => {
          this.loading = false
          this.invoice = response.data
          this.wallet = 'bitcoin:' + response.data.wallet + '?amount=' + response.data.price
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

      onCopy() {
        this.$notify({
          type: 'success',
          title: 'Copied to clipboard'
        })
      }
    }
  }
</script>
<style>
  .clock-custom .inn{
    background: #333 !important
  }

  .opacity-wallet{
    opacity: 0.3;
  }
</style>
