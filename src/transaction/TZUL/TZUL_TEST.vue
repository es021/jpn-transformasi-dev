
<template>
  <div>
    <!-- 
      LayoutRow
        -LayoutColLeft
        -LayoutColRight
        -LayoutColFull
        -LayoutColCenter
    -->
    <LayoutRow>
      <LayoutColLeft>
        <GroupBox title="Kiri Punya" >
        
        <!-- Example for text -->
        <FormField type="text" 
            name="nama_pemohon" 
            label="Nama Pemohon" 
            placeholder="" 
            :value="formValue['nama_pemohon']"
            :disabled="formDisabled['nama_pemohon']"
            :required="formRequired['nama_pemohon']"
            @onChange="onChange"></FormField>

        <!-- Example for number -->
        <FormField type="number" 
            name="umur_pemohon" 
            label="Umur Pemohon"
            placeholder="" 
            :value="formValue['umur_pemohon']"
            :disabled="formDisabled['umur_pemohon']"
            :required="formRequired['umur_pemohon']"
            @onChange="onChange"></FormField>

        <!-- Example for select -->
        <FormField type="select" 
            name="jenis_dokumen" 
            label="Jenis Dokumen" 
            :dataset="transactionRefTable('Ref007DocumentType',{value:'R007DocTypeCd',label:'R007DocTypeDesc'})"
            :value="formValue['jenis_dokumen']"
            :disabled="formDisabled['jenis_dokumen']"
            :required="formRequired['jenis_dokumen']"
            @onChange="onChange"></FormField>

           <!-- Example for select -->
        <FormField type="select" 
            name="custom" 
            label="Ya / Tidak" 
            :dataset="dataset.custom"
            :value="formValue['custom']"
            :disabled="formDisabled['custom']"
            :required="formRequired['custom']"
            @onChange="onChange"></FormField>

        <FormField type="radiobox" 
          name="jantina" 
          label="Jantina" 
          :value="formValue['jantina']" 
          :dataset="dataset.custom"
          @onChange="onChange"></FormField>

                 <FormField type="checkbox" 
          name="jantina" 
          label="Jantina" 
          :value="formValue['jantina']" 
          :dataset="dataset.custom"
          @onChange="onChange"></FormField>

        </GroupBox>
      </LayoutColLeft>

      <LayoutColRight>
        <GroupBox title="kanan punya" >
          
        </GroupBox>
      </LayoutColRight>      
    </LayoutRow>

    <!-- this is action of our tab pertanyaan, kemaskini, etc -->
    <AppActionTab 
      :pertanyaanDisabled="pertanyaanDisabled"
      :pertanyaanLoading="pertanyaanLoading"
      :pertanyaanOnClick="pertanyaanOnClick" 

      :kemaskiniDisabled="kemaskiniDisabled"
      :kemaskiniLoading="kemaskiniLoading"
      :kemaskiniOnClick="kemaskiniOnClick">
    </AppActionTab>

  </div>
</template>

<script>
import Vue from "vue";
import * as ApiHelper from "../../helper/api-helper";
import { SoapErr } from "../../helper/soap-helper";
import * as TabGeneralHelper from "../../helper/tab-general-helper";
const showLocalDebug = false;

export default {
  name: "TZUL_TEST", // TODO - set name here same to this filename
  data() {
    return {
      // ######################################################################
      // INTERNAL DATASET -----------------------------------------------------
      // TODO - set any internal dataset here if needed
      dataset: {
        custom: [{ value: "1", label: "Ya" }, { value: "0", label: "Tidak" }, { value: "0", label: "Tidak" }]
      },
      // ######################################################################
      // PERTANYAAN -----------------------------------------------------------
      //TODO - set pertanyaan on click event here
      pertanyaanOnClick: () => {},
      // ################################################################################
      // KEMASKINI -----------------------------------------------------------
      //TODO - set kemaskini on click event here
      kemaskiniOnClick: () => {},
      // ################################################################################
      // OTHER STUFF -----------------------------------------------------------
      // Do Not Remove This
      ...TabGeneralHelper.getExtraData(),
      pertanyaanLoading: false,
      pertanyaanDisabled: false,
      kemaskiniLoading: false,
      kemaskiniDisabled: false,
      showLocalDebug: showLocalDebug
    };
  },
  created() {
    this.startCreated(); // Do Not Remove This Line
    // TODO
    // set initial state of the input here

    this.pertanyaanLoading = true;

    // to set as Disabled use the following
    // this.setFormDisabled("name_of_the_input", true);

    // to set as Required use the following
    // this.setFormRequired("name_of_the_input", true);

    this.setFormDisabled("nama_pemohon", true);

    this.setFormRequired("umur_pemohon", true);
  },
  beforeDestroy() {
    this.startBeforeDestroy();
  },
  methods: {
    ...TabGeneralHelper.getAllMethod()
  },
  computed: {
    ...TabGeneralHelper.getAllComputed()
  }
};
</script>
