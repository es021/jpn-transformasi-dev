<template>
  <div>
    <div v-if="loading">
      <br><i class="fa fa-spinner fa-pulse fa-3x"></i><br><br>Initializing Transaction...
      <br>{{refTableCompleted / refTable.length * 100}} %<br><br>
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
import * as ApiHelper from "../../helper/api-helper";
import * as TabGeneralHelper from "../../helper/tab-general-helper";
import { mapGetters, mapMutations } from "vuex";
var tabData = [];

// intialize tab component
// TODO - Please add as much tab as needed here
// Tab 1
import T382000_T1 from "./T382000_T1";
Vue.component("T382000_T1", T382000_T1);
tabData.push({ id: "T382000_T1", label: "Tab 1 Punya Label" });

// Tab 2
import T382000_T2 from "./T382000_T2";
Vue.component("T382000_T2", T382000_T2);
tabData.push({ id: "T382000_T2", label: "Tab 2 Punya Label" });

/////////////////////////////////////////////////////////////////////////////////////////////
// main component for this transaction
export default {
  name: "T385150", // TODO - change component name here
  data() {
    return {
      // TODO - change breadcrumbs text here
      breadcrumbsText:
        "PENGANGKATAN >> BAYARAN >> 382000 >> BAYARAN PENGANGKATAN MELALUI PERINTAH MAHKAMAH",
      // TODO - load any ref table needed here
     
      refTable: [
        {
          table: "Ref005Race", // TODO- set table name here using this format, dont use REF_005_RACE
          field: ["R005RaceCd", "R005RaceDesc"] // TODO set field that we want, if we want all just set to empty array, => []
        },
        {
          table: "Ref007DocumentType", // TODO- set table name here using this format, dont use REF_005_RACE
          field: ["R007DocTypeCd", "R007DocTypeDesc"] // TODO set field that we want, if we want all just set to empty array, => []
        }
      ],
     
      refTableCompleted: 0,
      tabData: tabData,
      loading: false
    };
  },

  mounted() {
    this.init();
  },
  methods: {
    init() {
      // Do Not Change This
      this.loading = true;
      this.loadAllRefTable();
      this.transSetTabData(tabData); // Set Nav Bar Data
      this.initTabEnabled();
    },
    loadAllRefTable() {
      ApiHelper.loadRefTable(
        this.refTable,
        (key, data) => {
          //progress Handler
          this.transSetRefTable({ key: key, data: data });
          this.refTableCompleted++;
          console.log(key, data);
          if (this.refTable.length == this.refTableCompleted) {
            this.loading = false;
          }
        },
        err => {
          // error Handler
        }
      );
    },
    initTabEnabled() {
      // TODO - set which tabs are enabled on first load
      var tabEnabled = ["T382000_T1"];
      this.transSetEnabledTab(tabEnabled);
    },
    ////////////////////////////////////////////////////////////////////////////
    // Do Not Change This
    ...mapMutations(TabGeneralHelper.getMutations())
  },
  computed: {
    ...mapGetters(TabGeneralHelper.getGetters())
  }
};

/*


  
      ApiHelper.soapRequest({
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
  

*/
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
