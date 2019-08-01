<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-cbc">
      <!-- Card stats -->
      <div class="row">
        <div class="col-12 d-block d-sm-none">
          <div class="card card-stats mb-4 mb-xl-0">
            <div class="card-body">
              <div class="col-lg-8">
                <base-input
                  label="Link"
                  placeholder
                  input-classes="form-control-alternative"
                  :value="this.domain + '/#/registration?parent=' + this.$store.getters.currentUser.username + '&left=' + !$store.getters.currentUser.right"
                  v-clipboard:copy="this.domain + '/#/registration?parent=' + this.$store.getters.currentUser.username + '&left=' + !$store.getters.currentUser.right"
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
        </div>
        <div class="col-xl-4 col-lg-4">
          <stats-card
            title="Pending Comissions balance"
            type="gradient-red"
            :sub-title="'$' + this.stats.amount + ' USD'"
            icon="ni ni-like-2"
            class="mb-4 mb-xl-0"
          ></stats-card>
        </div>
        <div class="col-xl-4 col-lg-4">
          <stats-card
            title="Pending Direct balance"
            type="gradient-red"
            :sub-title="'$' + this.stats.amount_fast + ' USD'"
            icon="ni ni-atom"
            class="mb-4 mb-xl-0"
          ></stats-card>
        </div>

        <div class="col-xl-4 col-lg-4">
          <stats-card
            title="Total Paid "
            type="gradient-info"
            :sub-title="'$' + this.stats.total_withdrawals + ' USD'"
            icon=" ni ni-money-coins"
            class="mb-4 mb-xl-0"
          ></stats-card>
        </div>
      </div>
    </base-header>

    <!--Charts-->
    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col-xl-8 mb-5 mb-xl-0">
          <div class id="crypto-id"></div>
        </div>

        <div class="col-xl-4">
          <card header-classes="bg-transparent">
            <div slot="header" class="row align-items-center">
              <div class="col">
                <h6 class="text-uppercase text-muted ls-1 mb-1">{{username}}</h6>
                <h5 class="h3 mb-0">Summary</h5>
              </div>
            </div>

            <table class="table">
              <tr>
                <td>Status</td>
                <td>
                  <div class="badge badge-success">{{this.user.active}}</div>
                </td>
              </tr>
              <tr>
                <td>Sponsor</td>
                <td>
                  <div
                    class="badge badge-danger"
                  >{{this.user.sponsor && this.user.sponsor.username}}</div>
                </td>
              </tr>
              <tr>
                <td>Total withdrawals</td>
                <td class="text-dark">
                  <b>${{this.user.vault && this.user.vault.total_withdrawals}} USD</b>
                </td>
              </tr>
              <tr>
                <td>Left Points</td>
                <td>{{this.user.point && this.user.point.left_points}}</td>
              </tr>
              <tr>
                <td>Right Points</td>
                <td>{{this.user.point && this.user.point.right_points}}</td>
              </tr>
            </table>
          </card>
        </div>
      </div>
      <!-- End charts-->

      <!--Tables-->
      <div class="row mt-5">
        <div class="col-xl-8 mb-5 mb-xl-0">
          <page-visits-table></page-visits-table>
        </div>
      </div>
      <!--End tables-->
    </div>
  </div>
</template>

<script>
// Charts
import * as chartConfigs from "@/components/Charts/config";
import LineChart from "@/components/Charts/LineChart";
import BarChart from "@/components/Charts/BarChart";

// Tables
import SocialTrafficTable from "./Dashboard/SocialTrafficTable";
import PageVisitsTable from "./Dashboard/PageVisitsTable";

import * as config from "@/config/settings";

export default {
  components: {
    LineChart,
    BarChart,
    PageVisitsTable,
    SocialTrafficTable
  },
  data() {
    return {
      username: "",
      stats: {},
      user: {},
      bigLineChart: {
        allData: [
          [0, 20, 10, 30, 15, 40, 20, 60, 60],
          [0, 20, 5, 25, 10, 30, 15, 40, 40]
        ],
        activeIndex: 0,
        chartData: {
          datasets: [],
          labels: []
        },
        extraOptions: chartConfigs.blueChartOptions
      },
      redBarChart: {
        chartData: {
          labels: ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
          datasets: [
            {
              label: "Sales",
              data: [25, 20, 30, 22, 17, 29]
            }
          ]
        }
      }
    };
  },

  created() {
    this.domain = config.defaultDomain;
  },

  methods: {
    onCopy() {
      this.$notify({
        type: "success",
        title: "Copied to clipboard"
      });
    },
    swapLeg(leg) {
      leg = leg === "left" ? false : true;
      this.loading = true;
      this.$http({
        method: "put",
        url: "/api/v1/client/users/" + this.$store.getters.currentUser.uuid,
        data: { right: leg },
        headers: {
          "content-type": "application/json",
          Authorization: this.$store.getters.authToken
        }
      })
        .then(response => {
          this.$store.commit("setCurrentUser", response.data);
          this.$toasted.show("Power Leg Updated!", {
            position: "top-right",
            duration: 5000,
            type: "success",
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
    },
    cryptoNews() {
      var baseUrl = "https://widgets.cryptocompare.com/";
      var scripts = document.getElementById("crypto-id");

      var embedder = scripts[scripts.length - 1];

      var cccTheme = {
        General: { background: "#333", borderColor: "#121212" },
        PoweredBy: { textColor: "#EEE", linkColor: "#ffcc66" },
        Data: {
          priceColor: "#FFF",
          infoValueColor: "#FFF",
          borderColor: "#333"
        },
        NewsItem: { color: "#FFF", borderColor: "#444" },
        Conversion: { background: "#000", color: "#CCC" }
      };
      (function() {
        var appName = encodeURIComponent(window.location.hostname);
        if (appName == "") {
          appName = "local";
        }
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.async = true;
        var theUrl = baseUrl + "serve/v1/coin/feed?fsym=BTC&tsym=USD";
        s.src =
          theUrl + (theUrl.indexOf("?") >= 0 ? "&" : "?") + "app=" + appName;
        scripts.appendChild(s);
      })();
    },

    initBigChart(index) {
      let chartData = {
        datasets: [
          {
            label: "Performance",
            data: this.bigLineChart.allData[index]
          }
        ],
        labels: ["May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
      };
      this.bigLineChart.chartData = chartData;
      this.bigLineChart.activeIndex = index;
    }
  },
  mounted() {
    let options = {
      position: "top-right",
      duration: 5000,
      type: "success",
      closeOnSwipe: true
    };
    let username = this.$store.getters.currentUser.username;
    this.stats = this.$store.getters.currentUser.vault;
    this.user = this.$store.getters.currentUser;
    this.initBigChart(0);
    if (this.$route.query.auth && JSON.parse(this.$route.query.auth))
      this.$toasted.show("Welcome back " + username, options);
    this.cryptoNews();
  }
};
</script>

