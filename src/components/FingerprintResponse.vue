
<template>
  <div>
    <br><br>
    Fingerprint Response From Jar<br>
    {{response}}
  </div>
</template>

<script>
import { _GET, openWindowPopup } from "../helper/util-helper";
import { STORE_FINGERPRINT } from "../config/app-config";

export default {
  name: "FingerprintResponse",
  data() {
    return {
      response: ""
    };
  },
  created() {
    this.response = _GET("name");

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
  },
  mounted() {}
};
</script>
