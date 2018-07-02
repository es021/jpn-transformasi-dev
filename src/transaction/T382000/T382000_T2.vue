
<template>
<div>
    <!-- this is where the form field is put in our tab -->
<LayoutRow>
  <LayoutColFull>

      <!-- ################################################################### -->
      <!--  Maklumat Bayaran ############################################ -->
      <GroupBox title="Maklumat Bayaran">

        <LayoutRow>
          <LayoutColLeft>
          
            <FormField type="select" 
              name="kod_kecualian" 
              label="Kod Kecualian" 
              :dataset="transactionRefTable('Ref007DocumentType',{value:'R007DocTypeCd',label:'R007DocTypeDesc'})"
              :value="formValue['kod_kecualian']"
              :disabled="formDisabled['kod_kecualian']"
              :required="formRequired['kod_kecualian']"
              @onChange="onChange"></FormField>

            <FormField type="select" 
              name="sebab_pengecualian" 
              label="Sebab Pengecualian" 
              :dataset="transactionRefTable('Ref007DocumentType',{value:'R007DocTypeCd',label:'R007DocTypeDesc'})"
              :value="formValue['sebab_pengecualian']"
              :disabled="formDisabled['sebab_pengecualian']"
              :required="formRequired['sebab_pengecualian']"
              @onChange="onChange"></FormField>
            
            <FormField type="text" 
              name="keterangan_pengecualian" 
              label="Keterangan Pengecualian" 
              placeholder="" 
              :value="formValue['keterangan_pengecualian']"
              :disabled="formDisabled['keterangan_pengecualian']"
              :required="formRequired['keterangan_pengecualian']"
              @onChange="onChange"></FormField>

          </LayoutColLeft>

          <LayoutColRight>
            
            <FormField type="text" 
              name="bayaran_permohonan" 
              label="Bayaran Permohonan" 
              placeholder="" 
              :value="formValue['bayaran_permohonan']"
              :disabled="formDisabled['bayaran_permohonan']"
              :required="formRequired['bayaran_permohonan']"
              @onChange="onChange"></FormField>

            <FormField type="text" 
              name="jumlah_perlu_dibayar" 
              label="Jumlah Perlu Dibayar" 
              placeholder="" 
              :value="formValue['jumlah_perlu_dibayar']"
              :disabled="formDisabled['jumlah_perlu_dibayar']"
              :required="formRequired['jumlah_perlu_dibayar']"
              @onChange="onChange"></FormField>     

          </LayoutColRight>
    
        </LayoutRow>
      </GroupBox>

      
      <!-- ################################################################### -->
      <!--  Perincian Bayaran ################################################ -->
      <GroupBox title="Perincian Bayaran">
         <ListTable      
          :data="listTableData" 
          :header="listTableHeader">
        </ListTable>
      </GroupBox>


      <!-- ################################################################### -->
      <!--  Tambah Bayaran ################################################ -->
      <GroupBox title="Tambah Bayaran">
        <LayoutRow>
          <LayoutColLeft>
              
              <FormField type="select" 
                  name="cara_bayaran" 
                  label="Cara Bayaran" 
                  :dataset="dataset.cara_bayaran"
                  :value="formValue['cara_bayaran']"
                  :disabled="formDisabled['cara_bayaran']"
                  :required="formRequired['cara_bayaran']"
                  @onChange="onChange"></FormField>
            
              <div v-if="formValue['cara_bayaran'] == 'TUNAI'" :key="formValue['cara_bayaran']">
                <FormField type="number" 
                  name="tunai_perlu" 
                  label="Amaun Perlu Dibayar" 
                  :value="formValue['jumlah_perlu_dibayar']"
                  :disabled="true"
                  :step="'.01'"
                  @onChange="onChange"></FormField>

                <FormField type="number" 
                  name="tunai_diterima" 
                  label="Amaun Diterima" 
                  :value="formValue['tunai_diterima']"
                  :disabled="formDisabled['tunai_diterima']"
                  :step="'.01'"
                  @onChange="onChangeTunaiDiterima"></FormField>  

                <FormField type="number" 
                  name="tunai_baki" 
                  label="Baki" 
                  :value="formValue['tunai_baki']"
                  :disabled="true"
                  :step="'.01'"
                  @onChange="onChange"></FormField>  

                <FormField type="number" 
                  name="tunai_jumlah" 
                  label="Jumlah Dibayar" 
                  :value="formValue['tunai_jumlah']"
                  :disabled="true"
                  :step="'.01'"
                  @onChange="onChange"></FormField>  
              </div>

              <div v-if="formValue['cara_bayaran'] == 'CEK'" :key="formValue['cara_bayaran']">
                <FormField type="number" 
                  name="cek_perlu" 
                  label="Amaun Perlu Dibayar" 
                  :value="formValue['jumlah_perlu_dibayar']"
                  :disabled="true"
                  :step="'.01'"
                  @onChange="onChange"></FormField>

                <FormField type="text" 
                  name="cek_no" 
                  label="No Cek" 
                  :value="formValue['cek_no']"
                  @onChange="onChange"></FormField>  

                <FormField type="date" 
                  name="cek_tarikh" 
                  label="Tarikh Cek" 
                  :value="formValue['cek_tarikh']"
                  @onChange="onChange"></FormField>  

                <FormField type="number" 
                  name="cek_amaun" 
                  label="Amaun Cek" 
                  :value="formValue['cek_amaun']"
                  :step="'.01'"
                  @onChange="onChange"></FormField>  
              </div>

              <div v-if="formValue['cara_bayaran'] != null && formValue['cara_bayaran'] != ''">
                <button @click="simpanTambahBayaran" class="btn btn-green">Simpan</button>
                <button @click="batalTambahBayaran" class="btn btn-red">Batal</button>
              </div>

          </LayoutColLeft>
          
          <LayoutColRight></LayoutColRight>

        </LayoutRow>
        
      </GroupBox>

   
       
    </LayoutColFull>
</LayoutRow>

<!-- this is action of our tab pertanyaan, kemaskini, etc -->
<AppActionTab 
:pertanyaanDisabled="pertanyaanDisabled"
:pertanyaanLoading="pertanyaanLoading"
:kemaskiniDisabled="kemaskiniDisabled"
:kemaskiniLoading="kemaskiniLoading"
:pertanyaanOnClick="pertanyaanOnClick" 
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

const pertanyaanOnClick = () => {};

export default {
  name: "T382000_T1", // TODO - set name here same to this filename
  data() {
    return {
      // ######################################################################
      // Properties for List Table --------------------------------------------
      // TODO - set any internal dataset here if needed
      //listTableData: [["233", "!2412"], ["233", "!2412", "asdasd"]],
      listTableData: [],
      listTableHeader: [
        "Cara Bayaran",
        "No Dokumen / Maklumat Bayaran",
        "Tarikh Dokumen Bayaran",
        "Jumlah (RM)"
      ],
      // ######################################################################
      // INTERNAL DATASET -----------------------------------------------------
      // TODO - set any internal dataset here if needed
      dataset: {
        cara_bayaran: [
          { value: "", label: "-- SILA PILIH --" },
          { value: "TUNAI", label: "TUNAI" },
          { value: "CEK", label: "CEK" },
          { value: "WANG POS", label: "WANG POS" },
          { value: "KIRIMAN WANG", label: "KIRIMAN WANG" },
          { value: "KAD KREDIT", label: "KAD KREDIT" },
          { value: "KAD DEBIT", label: "KAD DEBIT" }
        ]
      },
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
            alert("No Permohonan diperlukan untuk membuat pertanyaan");
            this.focusToFormField("no_permohonan");
            return;
          }

          // check if no permohonan ad error
          if (this.isFormHasError("no_permohonan") && false) {
            alert("No Permohonan tidak valid");
            this.focusToFormField("no_permohonan");
            return;
          }

          // if all font end validation passes,
          // set pertanyaan loading to true,
          this.pertanyaanLoading = true;
          // start with whatever need to be done from specs
          checkInTgpdPymtDetail();
        };

        const endProcessPertanyaan = sucessHandler => {
          this.pertanyaanLoading = false;

          if (sucessHandler) {
            sucessHandler();
          }
        };

        //Start process pertanyaan
        startProcessPertanyaan();
      },
      // ################################################################################
      // KEMASKINI -----------------------------------------------------------
      //TODO - set kemaskini on click event here
      kemaskiniOnClick: () => {
        this.setFormRequired("sebab_pengecualian", true);
        this.setFormRequired("negeri", true);
      },
      // ################################################################################
      // OTHER STUFF -----------------------------------------------------------
      // Do Not Remove This
      ...TabGeneralHelper.getExtraData(),
      pertanyaanLoading: false,
      pertanyaanDisabled: false,
      kemaskiniLoading: false,
      kemaskiniDisabled: false,
      showLocalDebug: true
    };
  },

  created() {
    this.startCreated(); // Do Not Remove This Line

    // DEBUG
    this.setFormValue("jumlah_perlu_dibayar", 100);

    // TODO
    // set initial state of the input here
    this.setFormRequired("kod_kecualian", true);
    this.setFormDisabled("bayaran_permohonan", true);
    this.setFormDisabled("jumlah_perlu_dibayar", true);
  },
  beforeDestroy() {
    this.startBeforeDestroy();
  },
  methods: {
    // override default on change
    onChangeTunaiDiterima(name, value, error, ref) {
      var perluDibayar = this.getFormValue("jumlah_perlu_dibayar");

      if (value !== null) {
        var diterima = value;
        var baki = diterima - perluDibayar;
        this.setFormValue("tunai_baki", baki);

        var jumlahDibayar = diterima > perluDibayar ? perluDibayar : diterima;
        this.setFormValue("tunai_jumlah", jumlahDibayar);
      }

      // still need to add this on change
      this.onChange(name, value, error, ref);
    },
    simpanTambahBayaran() {
      // data nak masuk dlm listTable
      var caraBayaran = this.getFormValue("cara_bayaran");
      var jumlah = null;
      var maklumatBayaran = null;
      var tarikhDokumen = null;

      switch (caraBayaran) {
        case "TUNAI":
          jumlah = this.getFormValue("tunai_jumlah");
          break;
        case "CEK":
          jumlah = this.getFormValue("cek_amaun");
          maklumatBayaran = this.getFormValue("cek_no");
          tarikhDokumen = this.getFormValue("cek_tarikh");
          break;
      }

      this.listTableData.push([
        caraBayaran,
        maklumatBayaran,
        tarikhDokumen,
        jumlah
      ]);
      this.resetCaraBayaran();
    },
    batalTambahBayaran() {
      this.resetCaraBayaran();
    },
    resetCaraBayaran() {
      this.setFormValue("cara_bayaran", "");
    },
    ...TabGeneralHelper.getAllMethod()
  },
  computed: {
    ...TabGeneralHelper.getAllComputed()
  }
};
</script>
