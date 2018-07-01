
<template>
<div>

    <!-- this is where the form field is put in our tab -->
    <div class="app-row">
      <div class="app-col-full">
        <GroupBox title="Maklumat Kunci Carian">
            <!-- Example for text field -->
            <FormField type="text" 
              name="no_permohonan" 
              label="No Permohonanan" 
              placeholder="" 
              :value="formValue['no_permohonan']"
              :disabled="formDisabled['no_permohonan']"
              :required="formRequired['no_permohonan']"
              :validate="Validate.noPermohonan"
              @onChange="onChange" ></FormField>
        </GroupBox>

        <GroupBox title="Maklumat Pemohon">
          <FormField type="text" 
            name="no_kpt" 
            label="No KPT" 
            placeholder="" 
            :value="formValue['no_kpt']"
            :disabled="formDisabled['no_kpt']"
            :required="formRequired['no_kpt']"
            @onChange="onChange"></FormField>

          <FormField type="text" 
            name="no_dokumen" 
            label="No Dokumen" 
            placeholder="" 
            :value="formValue['no_dokumen']"
            :disabled="formDisabled['no_dokumen']"
            :required="formRequired['no_dokumen']"
            @onChange="onChange"></FormField>

          <FormField type="select" 
            name="jenis_dokumen" 
            label="Jenis Dokumen" 
            :dataset="transactionRefTable('Ref007DocumentType',{value:'R007DocTypeCd',label:'R007DocTypeDesc'})"
            :value="formValue['jenis_dokumen']"
            :disabled="formDisabled['jenis_dokumen']"
              :required="formRequired['jenis_dokumen']"
            @onChange="onChange"></FormField>

          <FormField type="select" 
            name="negara_pengeluar" 
            label="Negara Pengeluar" 
            :dataset="transactionRefTable('Ref011Country',{value:'R011CtryCd',label:'R011CtryDesc'})"
            :value="formValue['negara_pengeluar']"
            :disabled="formDisabled['negara_pengeluar']"
            :required="formRequired['negara_pengeluar']"
            @onChange="onChange"></FormField>

            <FormField type="text" 
              name="nama_pemohon" 
              label="Nama Pemohon" 
              placeholder="" 
              :value="formValue['nama_pemohon']"
              :disabled="formDisabled['nama_pemohon']"
              :required="formRequired['nama_pemohon']"
              @onChange="onChange"></FormField>

            <div class="app-row">
              <div class="app-col-left">

                <FormField type="text" 
                  name="alamat_1" 
                  label="Alamat" 
                  placeholder="" 
                  :value="formValue['alamat_1']"
                  :disabled="formDisabled['alamat_1']"
                  :required="formRequired['alamat_1']"
                  @onChange="onChange"></FormField>

                <FormField type="text" 
                  name="alamat_2" 
                  label="" 
                  placeholder="" 
                  :value="formValue['alamat_2']"
                  :disabled="formDisabled['alamat_2']"
                  :required="formRequired['alamat_2']"
                  @onChange="onChange"></FormField>

                <FormField type="text" 
                  name="alamat_3" 
                  label="" 
                  placeholder="" 
                  :value="formValue['alamat_3']"
                  :disabled="formDisabled['alamat_3']"
                  :required="formRequired['alamat_3']"
                  @onChange="onChange"></FormField>
              </div>

              <div class="app-col-right">
                <FormField type="number" 
                  name="poskod" 
                  label="Poskod" 
                  placeholder="" 
                  :value="formValue['poskod']"
                  :disabled="formDisabled['poskod']"
                  :required="formRequired['poskod']"
                  @onChange="onChange"></FormField>

                <FormField type="text" 
                  name="bandar" 
                  label="Bandar" 
                  placeholder="" 
                  :value="formValue['bandar']"
                  :disabled="formDisabled['bandar']"
                  :required="formRequired['bandar']"
                  @onChange="onChange"></FormField>

                <FormField type="text" 
                  name="negeri" 
                  label="Negeri" 
                  placeholder="" 
                  :value="formValue['negeri']"
                  :disabled="formDisabled['negeri']"
                  :required="formRequired['negeri']"
                  @onChange="onChange"></FormField>
              </div>

            </div>

        </GroupBox>

      <!-- ################################################################### -->
      <!--  EXAMPLESSS ####################################################### -->
      <GroupBox title="Example" v-if="false">
        <!-- Example for text -->
        <FormField type="text" 
            name="negeri" 
            label="Negeri" 
            placeholder="" 
            :value="formValue['negeri']"
            :disabled="formDisabled['negeri']"
            :required="formRequired['negeri']"
            @onChange="onChange"></FormField>

        <!-- Example for number -->
        <FormField type="number" 
            name="negeri" 
            label="Negeri"
            placeholder="" 
            :value="formValue['negeri']"
            :disabled="formDisabled['negeri']"
            :required="formRequired['negeri']"
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

        <!-- Example for date -->
        <FormField type="date" 
          name="dateTest" 
          label="Date Test" 
          placeholder="" 
          :value="formValue['dateTest']"
          :disabled="formDisabled['dateTest']"
          :required="formRequired['dateTest']"
          @onChange="onChange"></FormField>
          
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


    <div>
        <br><br>
        local formRef <br>
        {{this.formRef}}
        <br><br>

        local formValue <br>
        {{this.formValue}}
        <br><br>     

        local formDisabled <br>
        {{this.formDisabled}}
        <br><br>    

        local formRequired <br>
        {{this.formRequired}}
        <br><br>

        local formError <br>
        {{this.formError}}
        <br><br> 
    </div>

</div>
</template>

<script>
import Vue from "vue";
import * as ApiHelper from "../../helper/api-helper";
import * as TabGeneralHelper from "../../helper/tab-general-helper";

export default {
  name: "T382000_T1", // TODO - set name here same to this filename
  data() {
    return {
      // TODO - set any internal dataset here if needed
      dataset: {
        dokumen: []
      },
      //TODO - set pertanyaan on click event here
      pertanyaanOnClick: () => {
        // check if no permohonan is sudah diisi
        if (this.isFormValueEmpty("no_permohonan")) {
          alert("No Permohonan diperlukan untuk membuat pertanyaan");
          return;
        }

        // check if no permohonan ad error
        if (this.isFormHasError("no_permohonan")) {
          alert("No Permohonan tidak valid");
          this.focusToFormField("no_permohonan");
          return;
        }

        // get tbaeAdoptExt by BaeAplNo
        ApiHelper.soapRequest({
          method: "SsoapTbaeAdoptExt",
          param: {
            InTbaeAdoptExt: {
              BaeAplNo: this.getFormValue("no_permohonan")
            }
          },
          responseEntity: "OutTbaeAdoptExt",
          success: data => {
            console.log(data);
            data = data[0];
            this.setFormValue("no_kpt", data["BaeCfrmHscNo"]);
            this.setFormValue("no_dokumen", "126812356279512");
            this.setFormValue("jenis_dokumen", "10");
            this.setFormValue("nama_pemohon", data["BaeCfrmName"]);
            this.setFormValue("alamat_1", data["BaeCfrmAddr1"]);
            this.setFormValue("alamat_2", data["BaeCfrmAddr2"]);
            this.setFormValue("alamat_3", data["BaeCfrmAddr3"]);
            this.setFormValue("poskod", data["BaeCfrmPostcd"]);
            this.setFormValue("bandar", data["BaeCfrmCityCd"]);
            this.setFormValue("negeri", data["BaeCfrmStateCd"]);

            this.transAddEnabledTab("T382000_T2");
          },
          error: err => {
            if (err === "NOT_FOUND") {
              alert("No Permohonan tidak wujud / tidak sah.");
            } else {
              alert(err);
            }

            this.transAddEnabledTab("T382000_T2");
          }
        });
      },
      //TODO - set kemaskini on click event here
      kemaskiniOnClick: () => {
        this.setFormRequired("no_kpt", true);
        this.setFormRequired("negeri", true);
      },

      // Do Not Remove This
      ...TabGeneralHelper.getExtraData(),
      pertanyaanDisabled: false,
      kemaskiniDisabled: false
    };
  },

  //##############################################################################################################
  // DO NOT CHANGE ANYTHING BELOW THIS LINE -----------------------------------------------------------------------

  created() {
    this.startCreated(); // Do Not Remove This Line

    // TODO
    // set initial state of the input here

    // to set as Disabled use the following
    // this.setFormDisabled("name_of_the_input", true);

    // to set as Required use the following
    // this.setFormRequired("name_of_the_input", true);

    this.setFormRequired("no_permohonan", true);

    this.setFormDisabled("no_kpt", true);
    this.setFormDisabled("no_dokumen", true);
    //this.setFormDisabled("jenis_dokumen", true);
    this.setFormDisabled("nama_pemohon", true);
    this.setFormDisabled("alamat_1", true);
    this.setFormDisabled("alamat_2", true);
    this.setFormDisabled("alamat_3", true);
    this.setFormDisabled("poskod", true);
    this.setFormDisabled("bandar", true);
    this.setFormDisabled("negeri", true);
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
