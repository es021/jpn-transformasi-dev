<template>
  <div>
    <div v-if="loading">
      <br><i class="fa fa-spinner fa-pulse fa-3x"></i><br><br>Initializing Transaction...
      <br>{{refTableCompleted / refTable.length * 100}} %<br><br>
    </div>
    <div v-else>
      <AppBreadcrumbs :data="breadcrumbs"></AppBreadcrumbs>
      <AppNavBar :data="tabData"></AppNavBar>
      <component :is="transactionCurrentTabId"></component>
    </div>
    <!-- <AppDebug></AppDebug> -->
  </div>
</template>

<script>
// initialize common functions and component
// Dont Change this
import Vue from "vue";
import * as TabParentGeneralHelper from "../../helper/tab-parent-general-helper";

// intialize tab component
var tabData = [];
var tab, tabId, tabLabel;

// TODO - Please add as much tab as needed here
// Tab 1
tab = require("./TTEMPLATE_T1"); // todo - change this
tabId = "TTEMPLATE_T1"; // todo - change this
tabLabel = "Pertanyaan"; // todo - change this
Vue.component(tabId, tab.default);
tabData.push({ id: tabId, label: tabLabel });

// Tab 2
tab = require("./TTEMPLATE_T2");
tabId = "TTEMPLATE_T2";
tabLabel = "Bayaran Test Test";
Vue.component(tabId, tab.default);
tabData.push({ id: tabId, label: tabLabel });



// set which tab will be enabled initially
const initialTabEnabled = ["TTEMPLATE_T1"];

/////////////////////////////////////////////////////////////////////////////////////////////
// main component for this transaction
export default {
  name: "T385150", // TODO - change component name here
  data() {
    return {
      // TODO - change breadcrumbs text here
      // url just leave blank for now if not sure, can revisit later
      breadcrumbs: [
        { label: "Urusniaga Utama", url: "urusniaga-utama" },
        { label: "Pengangkatan eJPN", url: "pengangkatan-ejpn" },
        {
          label: "Pendaftaran Pengangkatan Mahkamah",
          url: "pengangkatan-ejpn-pendaftaran-pengangkatan-mahkamah"
        },
        { label: "Bayaran Pendaftaran Pengangkatan Mahkamah", url: null }
      ],
      // TODO - load any ref table needed here
      refTable: [
        {
          table: "Ref005Race", // TODO- set table name here using this format, dont use REF_005_RACE
          field: ["R005RaceCd", "R005RaceDesc"] // TODO set field that we want, if we want all just set to empty array, => []
        },
        {
          table: "Ref007DocumentType",
          field: ["R007DocTypeCd", "R007DocTypeDesc"]
        },
        {
          table: "Ref011Country",
          field: []
        },
        {
          table: "Ref008State",
          field: []
        },
        {
          table: "Ref009City",
          field: []
        }
      ],
      // ################################
      // Do Not Change This
      refTableCompleted: 0,
      tabData: tabData,
      loading: false,
      initialTabEnabled: initialTabEnabled
      // Do Not Change This
      // ################################
    };
  },
  created() {
    this.startCreated();
  },
  methods: {
    ...TabParentGeneralHelper.getAllMethod()
  },
  computed: {
    ...TabParentGeneralHelper.getAllComputed()
  }
};
</script>
