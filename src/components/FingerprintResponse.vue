
<template>
  <div>
    <div v-if="isFingerprint">
      <br><br>
      Fingerprint Response<br>
      {{response}}
    </div>
  </div>
</template>

<script>
import { _GET, openWindowPopup } from "../helper/util-helper";
import { STORE_FINGERPRINT } from "../config/app-config";

export default {
  name: "FingerprintResponse",
  data() {
    return {
      response: "",
      isFingerprint: false
    };
  },
  created() {
    var res = _GET("name");
    if (res !== null) {
      this.isFingerprint = true;
    } else {
      return;
    }
    res = res.replace("#", "");
    res = res.replace("/", "");
    this.response = res;

    var toStore = {
      err: null,
      res: null
    };

    if (this.response !== null) {
      // set to localhost as response
      toStore.res = this.response;
    } else {
      // set to localhost as error
      toStore.err = window.location.href;
    }
    localStorage.setItem(STORE_FINGERPRINT, JSON.stringify(toStore));
    console.log("here");
    window.close();
  },
  mounted() {}
};
</script>
