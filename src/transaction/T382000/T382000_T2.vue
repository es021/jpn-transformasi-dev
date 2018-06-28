
<template>
  <div>
      This is Tab 2
      
      <AppActionTab 
        :pertanyaanDisabled="pertanyaanDisabled"
        :kemaskiniDisabled="kemaskiniDisabled"
        :pertanyaanOnClick="pertanyaanOnClick" 
        :kemaskiniOnClick="kemaskiniOnClick">
      </AppActionTab>
  </div>
</template>

<script>
import Vue from "vue";
import * as ApiHelper from "../../helper/api-helper";
import * as TabGeneralHelper from "../../helper/tab-general-helper";
import Validate from "../../helper/validate-helper";

export default {
  name: "T385150_T2",
  data() {
    return {
      pertanyaanDisabled: false,
      kemaskiniDisabled: false,
      pertanyaanOnClick: () => {
        //TODO
        console.log("do pertanyaan");
        this.transAddEnabledTab("T385150_T3");
      },
      kemaskiniOnClick: () => {
        //TODO
        console.log("do kemaskini");
      }
    };
  },
  // to access form value via transactionFormValueByName has to be done in mounted
  mounted() {
    // this will get no_permohonana from first tab, T382000_T1
    var noPermohonan = this.transactionFormValueByName(
      "T382000_T1",
      "no_permohonan"
    );

    console.log(noPermohonan);
  },
  methods: {
    ...TabGeneralHelper.getAllMethod()
  },
  computed: {
    ...TabGeneralHelper.getAllComputed()
  }
};
</script>
