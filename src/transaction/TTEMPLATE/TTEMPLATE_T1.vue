
<template>
<div>
    <!-- this is where the form field is put in our tab -->
<LayoutRow>
  <LayoutColFull>

      <!-- ################################################################### -->
      <!--  Maklumat Kunci Carian ############################################ -->
      <GroupBox title="Maklumat Kunci Carian">

   <!-- Example for radiobox -->
        <FormField type="radiobox" 
          name="jantina" 
          label="Jantina" 
          :value="formValue['jantina']" 
          :dataset="transactionDataset['jantina']"
          :disabled="formDisabled['jantina']"
          :required="formRequired['jantina']"
          @onChange="onChange"></FormField>
        
        <!-- Example for checkbox -->
        <FormField type="checkbox" 
          name="dokumen" 
          label="Dokumen" 
          :valueArray="formValue['dokumen']"
          :dataset="transactionDataset['jantina']"
          :disabled="formDisabled['dokumen']"
          :required="formRequired['dokumen']"
          @onChange="onChange"></FormField>

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

      <!-- ################################################################### -->
      <!--  Maklumat Pemohon ################################################ -->
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

            <LayoutRow>
              <LayoutColLeft>
                <FormField type="text" 
                  name="alamat" 
                  label="Alamat" 
                  placeholder="" 
                  count=3
                  :valueArray="formValue['alamat']"
                  :disabled="formDisabled['alamat']"
                  :required="formRequired['alamat']"
                  @onChange="onChange"></FormField>

              </LayoutColLeft>
              <LayoutColRight>
                <FormField type="number" 
                  name="poskod" 
                  label="Poskod" 
                  placeholder="" 
                  :value="formValue['poskod']"
                  :disabled="formDisabled['poskod']"
                  :required="formRequired['poskod']"
                  @onChange="onChange"></FormField>

                <FormField type="select" 
                  name="bandar" 
                  label="Bandar" 
                  :dataset="transactionRefTable('Ref009City',{value:'R009CityCd',label:'R009CityDesc'})"
                  :value="formValue['bandar']"
                  :disabled="formDisabled['bandar']"
                  :required="formRequired['bandar']"
                  @onChange="onChange"></FormField>  

                <FormField type="select" 
                  name="negeri" 
                  label="Negeri" 
                  :dataset="transactionRefTable('Ref008State',{value:'R008StateCd',label:'R008StateDesc'})"
                  :value="formValue['negeri']"
                  :disabled="formDisabled['negeri']"
                  :required="formRequired['negeri']"
                  @onChange="onChange"></FormField>  
              </LayoutColRight>
            </LayoutRow>

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
       
    </LayoutColFull>
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


    <div v-if="showLocalDebug">
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
import { SoapErr } from "../../helper/soap-helper";
import * as TabGeneralHelper from "../../helper/tab-general-helper";
const showLocalDebug = false;

export default {
  name: "TabName",
  data() {
    return {
      // ######################################################################
      // INTERNAL DATASET -----------------------------------------------------
      // TODO - set any internal dataset here if needed
      dataset: {},
      // ######################################################################
      // PERTANYAAN -----------------------------------------------------------
      //TODO - set pertanyaan on click event here
      pertanyaanOnClick: () => {
        // Define variable and function in process pertanyaan
        var noPermohonan = this.getFormValue("no_permohonan");

        const startProcessPertanyaan = () => {
          // Do Front End Validation first
          // check if no permohonan is sudah diisi
          if (this.isFormValueEmpty("no_permohonan")) {
            this.alertError(
              "No Permohonan diperlukan untuk membuat pertanyaan",
              () => {
                this.focusToFormField("no_permohonan");
              }
            );
            return;
          }

          // check if no permohonan ad error
          if (this.isFormHasError("no_permohonan")) {
            this.alertError("No Permohonan tidak valid", () => {
              this.focusToFormField("no_permohonan");
            });
            return;
          }

          // if all font end validation passes,
          // set pertanyaan loading to true,
          this.pertanyaanLoading = true;
          // start with whatever need to be done from specs
          checkInTgpdPymtDetail();
        };

        const endProcessPertanyaan = () => {
          this.pertanyaanLoading = false;
        };

        const checkInTbaeAdoptExt = () => {
          // get tbaeAdoptExt by BaeAplNo
          ApiHelper.soapRequest({
            webService: "SoapWebService",
            method: "SsoapTbaeAdoptExt",
            param: {
              InTbaeAdoptExt: {
                BaeAplNo: noPermohonan
              }
            },
            responseEntity: "OutTbaeAdoptExt",
            success: data => {
              console.log(data);
              data = data[0];
              this.setFormValue("no_kpt", data["BaeCfrmHscNo"]);
              this.setFormValue("nama_pemohon", data["BaeCfrmName"]);
              this.setFormValue("alamat_1", data["BaeCfrmAddr1"]);
              this.setFormValue("alamat_2", data["BaeCfrmAddr2"]);
              this.setFormValue("alamat_3", data["BaeCfrmAddr3"]);
              this.setFormValue("poskod", data["BaeCfrmPostcd"]);
              this.setFormValue("bandar", data["BaeCfrmCityCd"]);
              this.setFormValue("negeri", data["BaeCfrmStateCd"]);

              // mock data
              this.setFormValue("poskod", "20050");
              this.setFormValue("bandar", "0118");
              this.setFormValue("negeri", "01");

              // end process pertanyaan,
              endProcessPertanyaan();
              this.addEnabledTab("T382000_T2");
            },
            error: err => {
              if (err === SoapErr.NOT_FOUND) {
                this.alertInfo("No Permohonan tidak wujud / tidak sah.", () => {
                  this.focusToFormField("no_permohonan");
                });
              } else {
                this.alertError(err);
              }
              endProcessPertanyaan();
            }
          });
        };

        const checkInTgpdPymtDetail = () => {
          ApiHelper.soapRequest({
            webService: "SoapWebService",
            method: "SsoapTgpdPymtDetail",
            param: {
              InTgpdPymtDetail: {
                GpdApplid: noPermohonan
              }
            },
            responseEntity: "OutTgpdPymtDetail",
            success: data => {
              // if found, show error
              alert("Bayaran permohonan telah selesai dilakukan.");
              endProcessPertanyaan();
            },
            error: err => {
              if (err === SoapErr.NOT_FOUND) {
                // not found in TgpdPymtDetail,  then we check in tbea
                checkInTbaeAdoptExt();
              } else {
                alert(err);
                endProcessPertanyaan();
              }
            }
          });
        };

        //Start process pertanyaan
        startProcessPertanyaan();
      },
      // ################################################################################
      // KEMASKINI -----------------------------------------------------------
      //TODO - set kemaskini on click event here
      kemaskiniOnClick: () => {
        this.setNextTabEnabled();
      },
      // ################################################################################
      // Next Tab Validation -----------------------------------------------------------
      //TODO - set next tab validation here
      nextTabValidation: () => {
        console.log("llalla");
        this.setFormRequiredByTab("TTEMPLATE_T2", "kod_kecualian", true);

        // set any value, disabled, required for next tab here
      },
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
  mounted() {
    this.startMounted();

    // TODO
    // set initial state of the input here

    // to set as Disabled use the following
    // this.setFormDisabled("name_of_the_input", true);
    // to set as Required use the following
    // this.setFormRequired("name_of_the_input", true);


    this.setFormValue("alamat", ["asdas","Asfsa","Asdas"]);
    this.setFormValue("dokumen",["L","P"])
    this.setFormDisabled("dokumen", true);

    
    this.setFormRequired("no_permohonan", true);
    this.setFormDisabled("no_kpt", true);
    //this.setFormDisabled("no_dokumen", true);
    //this.setFormDisabled("jenis_dokumen", true);
    this.setFormDisabled("nama_pemohon", true);
 
    this.setFormDisabled("poskod", true);
    this.setFormDisabled("bandar", true);
    this.setFormDisabled("negeri", true);
  },
  created() {
    this.startCreated(); // Do Not Remove This Line
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
