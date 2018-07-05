
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
              :dataset="dataset.kod_kecualian"
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
        
        <LayoutRow>
          <LayoutColLeft></LayoutColLeft>
          <LayoutColRight>
            <FormField type="number" 
              name="jumlah_bayaran" 
              label="Jumlah Bayaran" 
              :value="formValue['jumlah_bayaran']"
              :disabled="true"
              :step="'.01'"
              @onChange="onChange"></FormField>
          </LayoutColRight>
        </LayoutRow>

        <LayoutRow>
          <LayoutColCenter>
              <h4>Tambah Bayaran Baru</h4>
              <FormField type="select" 
                  name="cara_bayaran" 
                  label="Cara Bayaran" 
                  :dataset="dataset.cara_bayaran"
                  :value="formValue['cara_bayaran']"
                  :disabled="formDisabled['cara_bayaran']"
                  :required="formRequired['cara_bayaran']"
                  @onChange="onChange"></FormField>
            
              <!--  TUNAI ################################################ -->
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
                  :required="true" 
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

              <!--  CEK ################################################ -->
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
                  :required="true" 
                  @onChange="onChange"></FormField>  

                <FormField type="date" 
                  name="cek_tarikh" 
                  label="Tarikh Cek" 
                  :required="true" 
                  :value="formValue['cek_tarikh']"
                  @onChange="onChange"></FormField>  

                <FormField type="number" 
                  name="cek_amaun" 
                  label="Amaun Cek" 
                  :value="formValue['cek_amaun']"
                  :step="'.01'"
                  :required="true" 
                  @onChange="onChange"></FormField>  
              </div>
              
              <!--  WANG POS ################################################ -->
              <div v-if="formValue['cara_bayaran'] == 'WANG POS'" :key="formValue['cara_bayaran']">
                <FormField type="number" 
                  name="pos_perlu" 
                  label="Amaun Perlu Dibayar" 
                  :value="formValue['jumlah_perlu_dibayar']"
                  :disabled="true"
                  :step="'.01'"
                  @onChange="onChange"></FormField>

                <FormField type="text" 
                  name="pos_no" 
                  label="No Wang Pos" 
                  :value="formValue['pos_no']"
                  :required="true" 
                  @onChange="onChange"></FormField>  

                <FormField type="date" 
                  name="pos_tarikh" 
                  label="Tarikh Wang Pos" 
                  :required="true" 
                  :value="formValue['pos_tarikh']"
                  @onChange="onChange"></FormField>  

                <FormField type="number" 
                  name="pos_amaun" 
                  label="Amaun Wang Pos" 
                  :value="formValue['pos_amaun']"
                  :step="'.01'"
                  :required="true" 
                  @onChange="onChange"></FormField>  
              </div>

              <!--  KIRIMAN WANG ################################################ -->
              <div v-if="formValue['cara_bayaran'] == 'KIRIMAN WANG'" :key="formValue['cara_bayaran']">
                <FormField type="number" 
                  name="kirim_perlu" 
                  label="Amaun Perlu Dibayar" 
                  :value="formValue['jumlah_perlu_dibayar']"
                  :disabled="true"
                  :step="'.01'"
                  @onChange="onChange"></FormField>

                <FormField type="text" 
                  name="kirim_no" 
                  label="No Kiriman Wang" 
                  :value="formValue['kirim_no']"
                  :required="true" 
                  @onChange="onChange"></FormField>  

                <FormField type="date" 
                  name="kirim_tarikh" 
                  label="Tarikh Kiriman Wang" 
                  :required="true" 
                  :value="formValue['kirim_tarikh']"
                  @onChange="onChange"></FormField>  

                <FormField type="number" 
                  name="kirim_amaun" 
                  label="Amaun Kiriman Wang" 
                  :value="formValue['kirim_amaun']"
                  :step="'.01'"
                  :required="true" 
                  @onChange="onChange"></FormField>  
              </div>

              <!--  KAD KREDIT ################################################ -->
              <div v-if="formValue['cara_bayaran'] == 'KAD KREDIT'" :key="formValue['cara_bayaran']">
                <FormField type="number" 
                  name="kk_perlu" 
                  label="Amaun Perlu Dibayar" 
                  :value="formValue['jumlah_perlu_dibayar']"
                  :disabled="true"
                  :step="'.01'"
                  @onChange="onChange"></FormField>

                <FormField type="text" 
                  name="kk_no_terminal" 
                  label="No Kiriman Wang" 
                  :value="formValue['kk_no_terminal']"
                  :required="true" 
                  @onChange="onChange"></FormField>  

              <FormField type="select" 
                  name="kk_jenis_kad" 
                  label="Jenis Kad" 
                  :dataset="dataset.jenis_kad"
                  :value="formValue['kk_jenis_kad']"
                  :required="true" 
                  @onChange="onChange"></FormField>

                <FormField type="number" 
                  name="kk_no_kad" 
                  label="No Kad (4 digit akhir)" 
                  :value="formValue['kk_no_kad']"
                  :required="true" 
                  @onChange="onChange"></FormField>  

                <FormField type="text" 
                  name="kk_no_trace" 
                  label="No Trace / No Invoice" 
                  :value="formValue['kk_no_trace']"
                  :required="true" 
                  @onChange="onChange"></FormField>  

                <FormField type="text" 
                  name="kk_kod_sah" 
                  label="Kod Pengesahan" 
                  :value="formValue['kk_kod_sah']"
                  :required="true" 
                  @onChange="onChange"></FormField>     
               
                <FormField type="number" 
                  name="kk_amaun" 
                  label="Amaun Dibayar" 
                  :step="'.01'"
                  :value="formValue['kk_amaun']"
                  :required="true" 
                  @onChange="onChange"></FormField>  

              </div>

              <!--  KAD DEBIT ################################################ -->
              <div v-if="formValue['cara_bayaran'] == 'KAD DEBIT'" :key="formValue['cara_bayaran']">
                <FormField type="number" 
                  name="kd_perlu" 
                  label="Amaun Perlu Dibayar" 
                  :value="formValue['jumlah_perlu_dibayar']"
                  :disabled="true"
                  :step="'.01'"
                  @onChange="onChange"></FormField>

                <FormField type="text" 
                  name="kd_no_terminal" 
                  label="No Kiriman Wang" 
                  :value="formValue['kd_no_terminal']"
                  :required="true" 
                  @onChange="onChange"></FormField>  

              <FormField type="select" 
                  name="kd_jenis_kad" 
                  label="Jenis Kad" 
                  :dataset="dataset.jenis_kad"
                  :value="formValue['kd_jenis_kad']"
                  :disabled="true" 
                  @onChange="onChange"></FormField>

                <FormField type="number" 
                  name="kd_no_kad" 
                  label="No Kad (4 digit akhir)" 
                  :value="formValue['kd_no_kad']"
                  :required="true" 
                  @onChange="onChange"></FormField>  

                <FormField type="text" 
                  name="kd_no_trace" 
                  label="No Trace / No Invoice" 
                  :value="formValue['kd_no_trace']"
                  :required="true" 
                  @onChange="onChange"></FormField>  

                <FormField type="text" 
                  name="kd_kod_sah" 
                  label="Kod Pengesahan" 
                  :value="formValue['kd_kod_sah']"
                  :required="true" 
                  @onChange="onChange"></FormField>     
               
                <FormField type="number" 
                  name="kd_amaun" 
                  label="Amaun Dibayar" 
                  :step="'.01'"
                  :value="formValue['kd_amaun']"
                  :required="true" 
                  @onChange="onChange"></FormField>       
              </div>

              <!-- Action for tambah bayaran #################### -->
              <div v-if="formValue['cara_bayaran'] != null && formValue['cara_bayaran'] != ''">
                <button @click="simpanTambahBayaran" class="btn btn-green">Simpan</button>
                <button @click="batalTambahBayaran" class="btn btn-red">Batal</button>
                <br><br>
              </div>

          </LayoutColCenter>
        </LayoutRow>
      </GroupBox>
       
    </LayoutColFull>
</LayoutRow>
<button @click="getStartTime">getStartTime</button>
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
import * as PaymentHelper from "../../helper/payment-helper";

const showLocalDebug = false;

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
        jenis_kad: [
          { value: "", label: "-- SILA PILIH --" },
          { value: "Visa/Master", label: "Visa/Master" },
          { value: "MyDebit", label: "MyDebit" }
        ],
        kod_kecualian: [
          { value: "", label: "-- SILA PILIH --" },
          { value: "Perlu Bayaran", label: "Perlu Bayaran" },
          { value: "Pengecualian Bayaran", label: "Pengecualian Bayaran" }
        ],
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
      pertanyaanOnClick: () => {},
      // ################################################################################
      // KEMASKINI -----------------------------------------------------------
      //TODO - set kemaskini on click event here
      kemaskiniOnClick: () => {
        var requiredField = ["kod_kecualian"];
        if (!this.isAllRequiredHasValue(requiredField)) {
          return;
        }

        //1.1.1.	Kemaskini maklumat bayaran ke table TGPD_PAYMENT_DETAIL dan PCS_DETAILS, APPLICANT_INFO
        var kodKecualian = this.getFormValue("kod_kecualian");
        switch (kodKecualian) {
          case "Perlu Bayaran":
            var jumlahBayaran = this.getFormValue("jumlah_bayaran");
            var jumlahPerlu = this.getFormValue("jumlah_perlu_dibayar");
            if (jumlahPerlu != jumlahBayaran) {
              this.alertError(
                "Jumlah Bayaran tidak sama dengan Jumlah Perlu Dibayar. Sila Tambah Bayaran Baru",
                () => {
                  this.focusToFormField("cara_bayaran");
                }
              );
            }

            // do bayaran here
            this.kemaskiniLoading = true;
            break;

          case "Pengecualian Bayaran":
            // open fingerprint verification steps
            this.startFingerprint(res => {
              console.log("Do Whatever You Want With The Response Here", res);
            });
            break;
        }
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

  created() {
    this.startCreated(); // Do Not Remove This Line

    this.pertanyaanDisabled = true;

    this.setFormValue("kd_jenis_kad", "MyDebit");
    this.setFormValue("jumlah_bayaran", 0);

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
      var requiredField = [];

      // untuk cek, wang pos and wang kiriman
      const validasiJenis1 = (no, tarikh, amaun) => {
        if (this.isFormHasError(tarikh)) {
          this.alertError("Tarikh tidak valid", () => {
            this.focusToFormField(tarikh);
          });

          return false;
        }

        maklumatBayaran = this.getFormValue(no);
        tarikhDokumen = this.getFormValue(tarikh);
        jumlah = this.getFormValue(amaun);

        requiredField.push(no);
        requiredField.push(tarikh);
        requiredField.push(amaun);

        return true;
      };

      // untuk kad kredit dan kad debit
      const validasiJenis2 = (
        no_terminal,
        jenis_kad,
        no_kad,
        no_trace,
        kod_sah,
        amaun
      ) => {
        // check 4 digit no kad
        var noKad = this.getFormValue(no_kad);

        var errorNoKad =
          typeof noKad !== "undefined" && noKad !== null && noKad.length !== 4;

        if (errorNoKad) {
          this.alertError("Sila masukkan hanya 4 digit terakhir No Kad", () => {
            this.focusToFormField(no_kad);
          });
          return false;
        }

        maklumatBayaran = "**** **** **** " + noKad;
        tarikhDokumen = "";
        jumlah = this.getFormValue(amaun);

        requiredField.push(no_terminal);
        requiredField.push(jenis_kad);
        requiredField.push(no_kad);
        requiredField.push(no_trace);
        requiredField.push(kod_sah);
        requiredField.push(amaun);

        this.alertInfo("Sila Selesaikan Bayaran Di Terminal");

        return true;
      };

      switch (caraBayaran) {
        case "TUNAI":
          jumlah = this.getFormValue("tunai_jumlah");
          requiredField.push("tunai_diterima");
          break;

        case "CEK":
          if (!validasiJenis1("cek_no", "cek_tarikh", "cek_amaun")) {
            return;
          }
          break;

        case "WANG POS":
          if (!validasiJenis1("pos_no", "pos_tarikh", "pos_amaun")) {
            return;
          }
          break;

        case "KIRIMAN WANG":
          if (!validasiJenis1("kirim_no", "kirim_tarikh", "kirim_amaun")) {
            return;
          }
          break;

        case "KAD KREDIT":
          if (
            !validasiJenis2(
              "kk_no_terminal",
              "kk_jenis_kad",
              "kk_no_kad",
              "kk_no_trace",
              "kk_kod_sah",
              "kk_amaun"
            )
          ) {
            return;
          }
          break;

        case "KAD DEBIT":
          if (
            !validasiJenis2(
              "kd_no_terminal",
              "kd_jenis_kad",
              "kd_no_kad",
              "kd_no_trace",
              "kd_kod_sah",
              "kd_amaun"
            )
          ) {
            return;
          }
          break;
      }

      if (!this.isAllRequiredHasValue(requiredField)) {
        return;
      }

      this.listTableData.push([
        caraBayaran,
        maklumatBayaran,
        tarikhDokumen,
        jumlah
      ]);

      this.resetCaraBayaran();
      this.updateJumlahBayaran(jumlah);
    },
    updateJumlahBayaran(jumlah) {
      var jumlahBayaran = this.getFormValue("jumlah_bayaran");
      jumlahBayaran = Number.parseFloat(jumlahBayaran);
      jumlah = Number.parseFloat(jumlah);
      this.setFormValue("jumlah_bayaran", jumlahBayaran + jumlah);
    },
    batalTambahBayaran() {
      this.resetCaraBayaran();
    },
    resetCaraBayaran() {
      this.setFormValue("cara_bayaran", "");
    },
    getDataForKemaskini() {
      var data = {
        InTgpdPymtDetail: {
          GpdApplid: this.getFormValue("no_permohonan"),
          GpdBrchCdJpn: this.authUser()["BRANCH_CODE"],
          GpdTxnCode: "382000",
          GpdTxnDesc: "",
          GpdTxnDt: this.getStartTime(),
          // TODO
          GpdTxnMode: PaymentHelper.getTransMode()
        }
      };
    },
    ...TabGeneralHelper.getAllMethod()
  },
  computed: {
    ...TabGeneralHelper.getAllComputed()
  }
};
</script>
