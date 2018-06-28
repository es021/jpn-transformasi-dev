
<template>
      <div>
      -------------------------- 
      DEBUG
      --------------------------
      <h3>Form Value In Store</h3>
      {{transactionState.formValue}}<br>

      <h3>All Data In Store</h3>
      {{transactionState}}

      <br><br>
    </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "AppDebug",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["transactionState", "transactionCurrentTabId"])
  }
};
</script>
