<template>
  <div>
    <div v-if="loading">
      <br><i class="fa fa-spinner fa-pulse fa-3x"></i><br><br>Initializing Transaction...
      <br>{{requestCompleted / requestCount * 100}} %<br><br>
    </div>
    <div v-else>
      <AppNavBar :data="tabData"></AppNavBar>
      <AppBreadcrumbs :text="breadcrumbsText"></AppBreadcrumbs>
      <component :is="transactionCurrentTabId"></component>
    </div>

    <AppDebug></AppDebug>

  </div>
</template>

<script>
// initialize common functions and component
// Dont Change this
import Vue from "vue";
import { soapRequest } from "../../helper/api-helper";
import { mapGetters, mapMutations } from "vuex";
var tabData = [];

// intialize tab component
// TODO - Please add as much tab as needed here
// Tab 1
import T385150_T1 from "./T385150_T1";
Vue.component("T385150_T1", T385150_T1);
tabData.push({ id: "T385150_T1", label: "Tab 1 Punya Label" });

// Tab 2
import T385150_T2 from "./T385150_T2";
Vue.component("T385150_T2", T385150_T2);
tabData.push({ id: "T385150_T2", label: "Tab 2 Punya Label" });

// Tab 2
import T385150_T3 from "./T385150_T3";
Vue.component("T385150_T3", T385150_T3);
tabData.push({ id: "T385150_T3", label: "Tab 3 Punya Label" });

/////////////////////////////////////////////////////////////////////////////////////////////
// main component for this transaction
export default {
  name: "T385150", // TODO - change component name here
  data() {
    return {
      breadcrumbsText: "Blaaa Blala Bla > T385150", // TODO - change breadcrumbs text here
      tabData: tabData,
      loading: false,
      requestCount: 2, // TODO - Set How many request will be done in 'loadDbData' function
      requestCompleted: 0
    };
  },

  mounted() {
    this.init();
  },
  methods: {
    init() {
      // Do Not Change This
      this.loading = true;
      this.loadDbData(); // load DB data
      this.transSetTabData(tabData); // Set Nav Bar Data
      this.initTabEnabled();
    },
    initTabEnabled() {
      // TODO - set which tabs are enabled on first load
      var tabEnabled = ["T385150_T1"];
      this.transSetEnabledTab(tabEnabled);
    },
    loadDbData() {
      this.loading = false;
      return;

      soapRequest({
        // TODO -- (SERVER) this is the name of the server procedure
        method: "SsoapRef005Race",
        // TODO - (IMPORT) this is parameter structure set in soap service
        param: {},
        // TODO - (EXPORT) this is response entity that we are expecting from soap service
        responseEntity: "OutRef005Race",
        success: data => {
          // TODO - set the key of this data so that we can access it later
          var dataKey = "ref_005_race";
          this.loadSuccess(dataKey, data);
        },
        error: err => {
          loadError(err);
        }
      });

      soapRequest({
        // TODO -- (SERVER) this is the name of the server procedure
        method: "SsoapTbprParent",
        // TODO - (IMPORT) this is parameter structure set in soap service
        param: {
          InTbprParent: {
            BprHscNo: "000314011256"
          }
        },
        // TODO - (EXPORT) this is response entity that we are expecting from soap service
        responseEntity: "OutTbprParent",
        success: data => {
          // TODO - set the key of this data so that we can access it later
          var dataKey = "tbpr_parent";
          this.loadSuccess(dataKey, data);
        },
        error: err => {
          loadError(err);
        }
      });
    },
    ////////////////////////////////////////////////////////////////////////////
    // Do Not Change This
    loadSuccess(key, data) {
      this.transSetDbData({ key: key, data: data });
      this.requestCompleted++;
      if (this.requestCount == this.requestCompleted) {
        this.loading = false;
      }
    },
    ...mapMutations([
      "transChangeTab",
      "transSetEnabledTab",
      "transAddEnabledTab",
      "transRemoveEnabledTab",
      "transSetTabData",
      "transSetDbData"
    ])
  },
  computed: {
    ...mapGetters(["transactionState", "transactionCurrentTabId"])
  }
};

/*
   soapRequest({
        method: "SsoapTbprParent",
        param: {
          InTbprParent: {
            BprHscNo: "000314011256"
          }
        },
        responseEntity: "OutTbprParent",
        success: data => {
          this.loading = false;
        },
        error: err => {}
      });
*/
</script>
