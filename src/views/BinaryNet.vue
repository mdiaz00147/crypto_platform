<template>
  <div>
    <base-header class="pb-6 pb-8 pt-5 pt-md-8 bg-gradient-cbc"></base-header>

    <div class="container-fluid mt--7">
      <div class="row">
        <div class="col">
          <div class="card shadow">
            <div class="card-header bg-transparent">
              <h3 class="mb-0">
                Binary network -
                <div v-if="this.currentUser.active_binary" class="badge badge-success">ACTIVE</div>
                <div v-else class="badge badge-danger">DISABLED</div>
              </h3>
            </div>
            <div class="card-body">
              <div class="row d-flex justify-content-center align-items-center">
                <TreeChart :json="treeData" @click-node="clickNode" />
                <div class="col-12 d-flex justify-content-center align-items-center mb-4">
                  <input
                    v-model="searchString"
                    type="text"
                    placeholder="Find user node"
                    class="form-control"
                  />
                  <button class="btn btn-default" @click="getData('search')">GO</button>
                </div>
                <div class="col-12 d-flex justify-content-center align-items-center">
                  <button
                    v-if="!this.loading"
                    class="btn col-6 btn-default"
                    :disabled="this.currentUser.username === treeData.name && true"
                    @click="prevNode"
                  >
                    LEVEL UP
                    <i class="ni ni-bold-up"></i>
                  </button>
                  <button v-else class="btn col-6 btn-default" disabled>
                    LOADING
                    <i class="fa fa-spinner fa-spin"></i>
                  </button>
                  <button v-if="!loading" class="btn col-6 btn-warning" @click="firstNode">
                    FIRST USER
                    <i class="ni ni-atom"></i>
                  </button>
                  <button v-else class="btn col-6 btn-warning" disabled>
                    LOADING
                    <i class="fa fa-spinner fa-spin"></i>
                  </button>
                </div>
              </div>
              <div class="row">
                <div class="col-12">
                  <hr />
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <label class="float-left">
                    <h4>Left branch</h4>
                  </label>
                  <table class="table table-bordered">
                    <tr>
                      <td>
                        <b>AVAILABLE POINTS</b>
                      </td>
                      <td>
                        <div class="badge badge-warning">
                          <h5>{{this.currentPoint.left_points}}</h5>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>REEDEMED</td>
                      <td>
                        <div class="badge badge-primary">
                          <h5>{{this.currentPoint.left_total_points}}</h5>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
                <div class="col-xs-12 col-sm-6 col-md-6">
                  <label class="float-right">
                    <h4>Right branch</h4>
                  </label>
                  <table class="table table-bordered">
                    <tr>
                      <td>
                        <b>AVAILABLE POINTS</b>
                      </td>
                      <td>
                        <div class="badge badge-warning">
                          <h5>{{this.currentPoint.right_points}}</h5>
                        </div>
                      </td>
                    </tr>
                    <tr>
                      <td>REEDEMED</td>
                      <td>
                        <div class="badge badge-primary">
                          <h5>{{this.currentPoint.right_total_points}}</h5>
                        </div>
                      </td>
                    </tr>
                  </table>
                </div>
                <div class="col-12">
                  <hr />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.avat {
  border: none !important;
  cursor: pointer;
}
.node .person {
  width: 8em !important;
}
</style>
<script>
import TreeChart from "vue-tree-chart";

export default {
  name: "binaryTree",

  components: {
    TreeChart
  },

  created() {
    this.getData();
    this.currentUser = this.$store.getters.currentUser;
  },

  data() {
    return {
      loading: false,
      serverTree: {},
      treeData: this.initTreeData(),
      currentPoint: {},
      currentUser: {},
      searchString: ""
    };
  },

  methods: {
    clickNode(node) {
      this.getData(node.uuid);
    },

    getData(uuid) {
      this.loading = true;
      this.treeData = this.initTreeData();
      let url = "/api/v1/client/trees/1";
      let search = uuid === "search" ? ("&username=" + this.searchString) : ('')

      if (uuid) url = "/api/v1/client/trees/1?uuid=" + uuid + search;
      this.$http({
        url: url,
        method: "get",
        headers: {
          "content-type": "application/json",
          Authorization: this.$store.getters.authToken
        }
      })
        .then(response => {
          this.loading = false;
          this.serverTree = this.updateTree(response.data);
        })
        .catch((error) => {
          this.loading = false;
          this.getData()
          error.response.data &&
            this.$toasted.show(error.response.data.error, {
              position: "top-right",
              duration: 5000,
              type: "error",
              closeOnSwipe: true
            });
        });
    },

    updateTree(data) {
      this.currentPoint = data.point;
      this.treeData.name = data.name;
      this.treeData.image_url = data.image_url;
      this.treeData.parent_binary_uuid = data.parent_binary_uuid;
      this.treeData.uuid = data.uuid;

      if (data.children.length === 1) {
        if (!data.children[0].left_son) {
          this.treeData.children[1].uuid = data.children[0].uuid;
          this.treeData.children[1].name = data.children[0].name;
          this.treeData.children[1].image_url = data.children[0].image_url;
          this.treeData.children[1].left_son = data.children[0].left_son;

          if (data.children[0].children.length === 1) {
            if (!data.children[0].children[0].left_son) {
              this.treeData.children[1].children[1].uuid =
                data.children[0].children[0].uuid;
              this.treeData.children[1].children[1].name =
                data.children[0].children[0].name;
              this.treeData.children[1].children[1].image_url =
                data.children[0].children[0].image_url;
              this.treeData.children[1].children[1].left_son =
                data.children[0].children[0].left_son;
            } else {
              this.treeData.children[1].children[0].uuid =
                data.children[0].children[0].uuid;
              this.treeData.children[1].children[0].name =
                data.children[0].children[0].name;
              this.treeData.children[1].children[0].image_url =
                data.children[0].children[0].image_url;
              this.treeData.children[1].children[0].left_son =
                data.children[0].children[0].left_son;
            }
          } else if (data.children[0].children.length === 2) {
            this.treeData.children[1].children = data.children[0].children;
          }
        } else if (data.children[0].left_son) {
          this.treeData.children[0].uuid = data.children[0].uuid;
          this.treeData.children[0].name = data.children[0].name;
          this.treeData.children[0].image_url = data.children[0].image_url;
          this.treeData.children[0].left_son = data.children[0].left_son;

          if (data.children[0].children.length === 1) {
            if (data.children[0].children[0].left_son) {
              this.treeData.children[0].children[0].uuid =
                data.children[0].children[0].uuid;
              this.treeData.children[0].children[0].name =
                data.children[0].children[0].name;
              this.treeData.children[0].children[0].image_url =
                data.children[0].children[0].image_url;
              this.treeData.children[0].children[0].left_son =
                data.children[0].children[0].left_son;
            } else {
              this.treeData.children[0].children[1].uuid =
                data.children[0].children[0].uuid;
              this.treeData.children[0].children[1].name =
                data.children[0].children[0].name;
              this.treeData.children[0].children[1].image_url =
                data.children[0].children[0].image_url;
              this.treeData.children[0].children[1].left_son =
                data.children[0].children[0].left_son;
            }
          } else if (data.children[0].children.length === 2) {
            this.treeData.children[0].children = data.children[0].children;
          }
        }
      } else if (data.children.length === 2) {
        // left node
        this.treeData.children[0].uuid = data.children[0].uuid;
        this.treeData.children[0].name = data.children[0].name;
        this.treeData.children[0].image_url = data.children[0].image_url;
        this.treeData.children[0].left_son = data.children[0].left_son;

        if (data.children[0].children.length === 1) {
          if (data.children[0].children[0].left_son)
            this.treeData.children[0].children[0] =
              data.children[0].children[0];
          if (!data.children[0].children[0].left_son)
            this.treeData.children[0].children[1] =
              data.children[0].children[0];
        } else if (data.children[0].children.length === 2) {
          this.treeData.children[0].children = data.children[0].children;
        }

        // right node
        this.treeData.children[1].uuid = data.children[1].uuid;
        this.treeData.children[1].name = data.children[1].name;
        this.treeData.children[1].image_url = data.children[1].image_url;
        this.treeData.children[1].left_son = data.children[1].left_son;

        if (data.children[1].children.length === 1) {
          if (data.children[1].children[0].left_son)
            this.treeData.children[1].children[0] =
              data.children[1].children[0];
          if (!data.children[1].children[0].left_son)
            this.treeData.children[1].children[1] =
              data.children[1].children[0];
        } else if (data.children[1].children.length === 2) {
          this.treeData.children[1].children = data.children[1].children;
        }
      }
    },

    initTreeData() {
      return {
        name: "root",
        image_url: "/img/icons/user-default.svg",
        parent_binary_uuid: null,
        uuid: null,
        children: [
          {
            name: "user",
            image_url: "/img/icons/user-default.svg",
            children: [
              {
                name: "user",
                image_url: "/img/icons/user-default.svg"
              },
              {
                name: "user",
                image_url: "/img/icons/user-default.svg"
              }
            ]
          },
          {
            name: "user",
            image_url: "/img/icons/user-default.svg",
            children: [
              {
                name: "user",
                image_url: "/img/icons/user-default.svg"
              },
              {
                name: "user",
                image_url: "/img/icons/user-default.svg"
              }
            ]
          }
        ]
      };
    },

    firstNode() {
      this.getData(this.$store.getters.currentUser.uuid);
    },

    prevNode() {
      this.getData(this.treeData.parent_binary_uuid);
    }
  }
};
</script>

