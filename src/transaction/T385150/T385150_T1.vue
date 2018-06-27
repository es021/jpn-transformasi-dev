
<template>
  <div>

      <!-- this is where the form field is put in our tab -->
      <div class="app-row">

        <!-- this is content of left column -->
        <div class="app-col-left">
          
          <GroupBox title="Kegunaaan Pejabat" size="">
            
            <FormField type="text" 
              name="no_kpt" 
              label="Serahan My Kid Blas Bla Blas" 
              placeholder="930718115423" 
              :validate="Validate.noKpt"></FormField>
            <FormField type="text" name="no_kpt124" label="No KPT" placeholder="930718115423"></FormField>

          </GroupBox>

          <GroupBox title="Kegunaaan Pejabat" size="">
            <FormField type="text" name="no_kpt1" label="No KPT" placeholder="930718115423"></FormField>
            <FormField type="select" name="branch2" label="Branch Code" :dataset="transactionDataset['branch']"></FormField>
            <FormField type="radiobox" name="branch3" label="Branch Code" :dataset="transactionDataset['branch']"></FormField>
            <FormField type="checkbox" name="branch4" label="Branch Code" :dataset="transactionDataset['branch']"></FormField>

          </GroupBox>
        </div> 

        <!-- this is content of right column -->
        <div class="app-col-right">
          <GroupBox title="Kegunaaan Pejabat" size="">
            <FormField type="text" name="no_kpt2" label="No KPT" placeholder="930718115423"></FormField>
            <FormField type="text" name="no_kpt3" label="No KPT" placeholder="930718115423"></FormField>
            <FormField type="text" name="no_kpt4" label="No KPT" placeholder="930718115423"></FormField>
            <FormField type="text" name="no_kpt5" label="No KPT" placeholder="930718115423"></FormField>
            <FormField type="text" name="no_kpt6" label="No KPT" placeholder="930718115423"></FormField>
          </GroupBox>
        </div>

      </div>
      
      <!-- this is action of our tab pertanyaan, kemaskini, etc -->
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
import Validate from "../../helper/validate-helper";
export default {
  name: "T385150_T1",
  data() {
    return {
      pertanyaanDisabled: false,
      kemaskiniDisabled: false,
      pertanyaanOnClick: () => {
        //TODO
        console.log("do pertanyaan");
        this.transAddEnabledTab("T385150_T2");
      },
      kemaskiniOnClick: () => {
        //TODO
        console.log("do kemaskini");
      }
    };
  },
  computed: {
    ...mapGetters(["transactionDataset"])
  },
  created() {
    // Do Not Change This
    this.Validate = Validate;
  },
  methods: {
    ...mapMutations(["transAddEnabledTab", "transRemoveEnabledTab"])
  }
};
</script>
