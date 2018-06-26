
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
import { mapGetters, mapMutations } from "vuex";
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
  created() {
    //TODO - Load DB Data here
  },
  methods: {
    ...mapMutations({
      transAddEnabledTab: "transAddEnabledTab",
      transRemoveEnabledTab: "transRemoveEnabledTab"
    })
  }
};
</script>
