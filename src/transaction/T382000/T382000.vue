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
    <!-- <AppDebug></AppDebug> -->
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
import T382000_T1 from "./T382000_T1";
Vue.component("T382000_T1", T382000_T1);
tabData.push({ id: "T382000_T1", label: "Permohonan" });

// Tab 1
//tabData.push({ id: "T382000_T1", label: "Permohonan 2" });

// Tab 2
import T382000_T2 from "./T382000_T2";
Vue.component("T382000_T2", T382000_T2);
tabData.push({ id: "T382000_T2", label: "Bayaran" });

// set which tab will be enabled initially
//const initialTabEnabled = ["T382000_T1"];
const initialTabEnabled = ["T382000_T1", "T382000_T2"];

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
