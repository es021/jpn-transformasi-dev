
<template>
  <div>
      <AppNavBar :data="navBarData"></AppNavBar>
      <AppBreadcrumbs :text="breadcrumbsText"></AppBreadcrumbs>
      <component :is="navBarData[transactionState.currentTabIndex].id"></component>
      <AppActionTab :pertanyaanOnClick="pertanyaanOnClick" :kemaskiniOnClick="kemaskiniOnClick"></AppActionTab>
  </div>
</template>

<script>
// initialize common functions and component
// Dont Change this
import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";

var navBarData = [];

// intialize tab component
// Please add as much tab as needed here
// TODO
// Tab 1
import T385150_T1 from "./T385150_T1";
Vue.component("T385150_T1", T385150_T1);
navBarData.push({ id: "T385150_T1", label: "Tab 1 Punya Label" });

// Tab 2
import T385150_T2 from "./T385150_T2";
Vue.component("T385150_T2", T385150_T2);
navBarData.push({ id: "T385150_T2", label: "Tab 2 Punya Label" });

// Tab 2
import T385150_T3 from "./T385150_T3";
Vue.component("T385150_T3", T385150_T3);
navBarData.push({ id: "T385150_T3", label: "Tab 3 Punya Label" });

/////////////////////////////////////////////////////////////////////////////////////////////
// main component for this transaction
export default {
  name: "T385150",
  data() {
    return {
      breadcrumbsText: "Blaaa Blala Bla > T385150", // init text for the breadcrumbs
      navBarData: navBarData,
      loading: false,
     
      dbData: {}
    };
  },
  computed: {
    ...mapGetters({
      transactionState: "transactionState"
    })
  },
  created() {
    //TODO - Load DB Data here
  },
  methods: {
    ...mapMutations({
      transChangeTab: "transChangeTab",
      transAddEnabledTab: "transAddEnabledTab",
      transRemoveEnabledTab: "transRemoveEnabledTab"
    }),
    pertanyaanOnClick(){
      console.log("do pertanyaan");
    },
    kemaskiniOnClick(){
      console.log("do kemaskini");
    }
  }
};
</script>
