
<template>
  <div>

      <!-- this is where the form field is put in our tab -->
      <div class="app-row">

        <!-- this is content of left column -->
        <div class="app-col-left">
          
          <GroupBox title="Kegunaaan Pejabat">
            
            <!-- Example for text field -->
            <FormField type="text" 
              name="no_kpt" 
              label="Serahan My Kid Daftar" 
              placeholder="930718115423" 
              :value="formValue['no_kpt']"
              :validate="Validate.noKpt"
              @onChange="onChange" ></FormField>

            <!-- Example for number field -->
            <FormField type="number" 
              name="umur" 
              label="Umur" 
              placeholder="20" 
              :value="formValue['umur']"
              :validate="Validate.umur"
              @onChange="onChange" ></FormField>

            <!-- Example for radiobox -->
            <FormField type="radiobox" 
              name="jantina" 
              label="Jantina" 
              :value="formValue['jantina']" 
              :dataset="transactionDataset['jantina']"
              @onChange="onChange"></FormField>
            
            <!-- Example for checkbox -->
            <FormField type="checkbox" 
              name="dokumen" 
              label="Dokumen" 
              :valueArray="formValue['dokumen']"
              :dataset="transactionDataset['branch']"
              @onChange="onChange"></FormField>

            <!-- Example for select dropdown list -->
            <FormField type="select" 
              name="select1" 
              label="Branch Code" 
              :dataset="transactionDataset['branch']"
              :value="formValue['select1']"
              @onChange="onChange"></FormField>
          </GroupBox>

          <GroupBox title="Kegunaaan Pejabat">
            <FormField type="text" name="no_kpt1" label="No KPT" placeholder="930718115423"></FormField>
            <FormField type="text" name="no_kpt124" label="No KPT" placeholder="930718115423"></FormField>
          </GroupBox>
        </div> 

        <!-- this is content of right column -->
        <div class="app-col-right">
          <GroupBox title="Kegunaaan Pejabat">
            <FormField type="text" name="no_kpt2" label="No KPT" placeholder="930718115423"></FormField>
            <FormField type="text" name="no_kpt3" label="No KPT" placeholder="930718115423"></FormField>
            <FormField type="text" name="no_kpt4" label="No KPT" placeholder="930718115423"></FormField>
            <FormField type="text" name="no_kpt5" label="No KPT" placeholder="930718115423"></FormField>
            <FormField type="text" name="no_kpt6" label="No KPT" placeholder="930718115423"></FormField>
          </GroupBox>
        </div>
      </div>
      
      {{this.formValue}}
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
import Vue from "vue";

import { mapGetters, mapMutations } from "vuex";
import Validate from "../../helper/validate-helper";
export default {
  name: "T385150_T1",
  data() {
    return {
      // TODO - set any dataset here if needed
      dataset: {
        dokumen: []
      },
      //TODO - set pertanyaan on click event here
      pertanyaanOnClick: () => {
        this.setFormValue("no_kpt", "aaaa");
        this.setFormValue("checkbox1", ["Cawangan HQ"]);

        this.transAddEnabledTab("T385150_T2");
      },
      //TODO - set kemaskini on click event here
      kemaskiniOnClick: () => {
        //console.log("do kemaskini");
      },

      // Do Not Change This
      formValue: {},
      pertanyaanDisabled: false,
      kemaskiniDisabled: false
    };
  },
  created() {
    // Do Not Change This
    this.tabId = this.transactionCurrentTabId;
    this.Validate = Validate;

    // tabId need to be set first
    this.formValue = this.getFormValueFromStore();
  },
  beforeDestroy() {
    this.saveFormValueToStore();
  },
  methods: {
    onChange(name, value) {
      //console.log("onChange parent", name, value);
      this.setFormValue(name, value);
    },
    getFormValueFromStore() {
      return this.transactionFormValue(this.tabId);
    },
    saveFormValueToStore() {
      this.transSaveFormValue({
        tab: this.tabId,
        formValue: this.formValue
      });
    },
    setFormValue(name, value) {
      // use this to add new props in data of type object
      // to cater prop that never initialize before
      Vue.set(this.formValue, name, value);
    },
    ...mapMutations([
      "transAddEnabledTab",
      "transRemoveEnabledTab",
      "transSaveFormValue"
    ])
  },
  computed: {
    ...mapGetters([
      "transactionDataset",
      "transactionFormValue",
      "transactionCurrentTabId"
    ])
  }
};
</script>
