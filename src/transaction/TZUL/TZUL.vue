<template>
  <div>
    <div v-if="loading">
      <br><i class="fa fa-spinner fa-pulse fa-3x"></i><br><br>Initializing Transaction...
      <br>{{refTableCompleted / refTable.length * 100}} %<br><br>
    </div>
    <div v-else>
      <AppBreadcrumbs :text="breadcrumbsText"></AppBreadcrumbs>
      <AppNavBar :data="tabData"></AppNavBar>
      <component :is="transactionCurrentTabId"></component>
    </div>
    <AppDebug></AppDebug>
  </div>
</template>

<script>
// initialize common functions and component
// Dont Change this
import Vue from "vue";
import * as TabParentGeneralHelper from "../../helper/tab-parent-general-helper";
var tabData = [];

// intialize tab component
// TODO - Please add as much tab as needed here
// Tab 1
import TZUL_TEST from "./TZUL_TEST";
Vue.component("TZUL_TEST", TZUL_TEST);
tabData.push({ id: "TZUL_TEST", label: "Tab Test" });

// Tab 1
import TZUL_T1 from "./TZUL_T1";
Vue.component("TZUL_T1", TZUL_T1);
tabData.push({ id: "TZUL_T1", label: "Kegunaan Pejabat" });

// Tab 2
import TZUL_T2 from "./TZUL_T2";
Vue.component("TZUL_T2", TZUL_T2);
tabData.push({ id: "TZUL_T2", label: "Bayaran Semula" });

// set which tab will be enabled initially
//const initialTabEnabled = ["T382000_T1"];
const initialTabEnabled = ["TZUL_TEST", "TZUL_T1"];

/////////////////////////////////////////////////////////////////////////////////////////////
// main component for this transaction
export default {
  name: "TZUL", // TODO - change component name here
  data() {
    return {
      // TODO - change breadcrumbs text here
      breadcrumbsText:
        "PENGANGKATAN >> BAYARAN >> BAYARAN PENGANGKATAN MELALUI PERINTAH MAHKAMAH",
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
        // {
        //   table: "Ref011Country",
        //   field: []
        // },
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
