<template>
 <div v-if="state.isOpen" :class="`app-alert ${state.type}`">
    <div class="aa-bg"></div> 
    <div class="aa-body">
      <div class="aa-header">
        <span v-if="state.type == AlertConst.ERROR" :key="state.type">
          Error
        </span>
        <span v-if="state.type == AlertConst.SUCCESS" :key="state.type">
          Success
        </span>
        <span v-if="state.type == AlertConst.INFO" :key="state.type">
          Info
        </span>
        <a class="btn btn-link aa-close" @click="close"><b>X</b></a>
      </div>
      <div class="aa-content" v-html="state.content">
      </div>
    </div>
</div>
</template>

<script>
import { AlertConst } from "../store/modules/alert";

import { mapGetters, mapMutations } from "vuex";
export default {
  name: "AppAlert",
  computed: {
    ...mapGetters({ state: "alertState" })
  },
  data() {
    return {
      AlertConst: AlertConst
    };
  },
  methods: {
    ...mapMutations({ alertClose: "alertClose" }),
    close() {
      this.alertClose();
      this.state.closeHandler();
    }
  }
};
</script>