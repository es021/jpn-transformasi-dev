
<template>
  <div :style="parentStyle">

    <div v-if="resStore === null">
      <h3>Masukkan ID Penyelia</h3>
      <div class="form-field">
        <div class="ff-item ff-no-label" >
          <input type="text" 
              name="penyelia_id" 
              label="Masukkan ID Penyelia" 
              v-model="penyelia_id" @change="onChange"/>  
        </div>
      </div>
      <div class="btn-group-vertical">
        <button @click="sahClick" :disabled="disabledSah || loadingSah" class="btn btn-green">
          Sahkan Pengguna
          <span v-if="loadingSah"><i class="fa fa-spinner fa-pulse"></i></span>
        </button>
        <button @click="popupClose" :disabled="disabledKembali" class="btn btn-red">
          Kembali
        </button>
      </div> 
    </div>

    <div v-else>
      <div v-if="error != null">
        Request Failed : {{error}}
      </div>
      <div v-else-if="authed">
        Authentication Succeed
      </div>
      <div v-else>
        Authentication Failed
      </div>
    </div>


  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { AppRoot, STORE_FINGERPRINT } from "../config/app-config";
import { openWindowPopup, closeWindowPopup } from "../helper/util-helper";

export default {
  name: "FingerprintPopup",
  props: {
    success: Function,
    default: res => {
      console.log("PopupFingerprint", "success", res);
    },
    error: Function,
    default: res => {
      console.log("PopupFingerprint", "error", res);
    }
  },
  data() {
    return {
      penyelia_id: "",
      disabledSah: true,
      disabledKembali: false,
      loadingSah: false,
      resStore: null,
      parentStyle: {
        padding: "0px 50px",
        paddingBottom: "40px"
      }
    };
  },
  methods: {
    onChange() {
      if (this.penyelia_id != "") {
        this.disabledSah = false;
      } else {
        this.disabledSah = true;
      }
    },
    sahClick() {
      var penyeliaId = this.penyelia_id;
      if (penyeliaId == "") {
        return;
      }

      this.initSah();

      var callbackUrl = AppRoot; // "/#/fingerprint-response";

      var apiUrl =
        location.origin +
        `/fingerprint/myDevice.jsp` +
        `?spvrid=${penyeliaId}` +
        `&path=${callbackUrl}` +
        `&codeBase=${location.origin}`;

      // open window popup for jsp fingerprint
      // the jar will open up our callback url
      // which will set response to the local storage STORE_FINGERPRINT
      var width = 200,
        height = 200,
        top = 50,
        left = 50;

      openWindowPopup(apiUrl, STORE_FINGERPRINT, width, height, top, left);

      // test je ni
      // setTimeout(() => {
      //   openWindowPopup(
      //     callbackUrl + "?name=1",
      //     STORE_FINGERPRINT,
      //     width,
      //     height,
      //     top,
      //     left
      //   );
      // }, 1000);

      // this function will keep checking if local storage STORE_FINGERPRINT
      // is updated or not
      this.checkLocalStorage();
    },
    checkLocalStorage() {
      var interval = setInterval(() => {
        var ls = localStorage.getItem(STORE_FINGERPRINT);
        console.log("check", ls);

        if (ls !== null) {
          this.resStore = JSON.parse(ls);
          clearInterval(interval);
          this.finishSah();
        }
      }, 500);
    },
    initSah() {
      localStorage.removeItem(STORE_FINGERPRINT);
      this.resStore = null;
      this.loadingSah = true;
      this.disabledKembali = true;
    },
    finishSah() {
      closeWindowPopup(STORE_FINGERPRINT);

      if (this.resStore.err !== null) {
        this.error = this.resStore.err;
      } else {
        this.error = null;
        if (this.resStore.res == "1") {
          this.authed = true;
        } else {
          this.authed = false;
        }
      }
    },
    ...mapMutations(["popupClose"])
  }
};
</script>
