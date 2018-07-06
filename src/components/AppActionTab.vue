
<template>
  <div class="jpn-action-tab">
    <div>
      <button @click="menuUtamaOnClick" class="btn btn-blue">Menu Utama</button>
    </div>
    <div>
      <button @click="pertanyaanOnClick" :disabled="pertanyaanDisabled || pertanyaanLoading" class="btn btn-blue">
        {{pertanyaanText}}
        <span v-if="pertanyaanLoading"><i class="fa fa-spinner fa-pulse"></i></span>
      </button>
      <button @click="kemaskiniOnClick" :disabled="kemaskiniDisabled || kemaskiniLoading" class="btn btn-blue">
        {{kemaskiniText}}
        <span v-if="kemaskiniLoading"><i class="fa fa-spinner fa-pulse"></i></span>
      </button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { HomeRoot } from "../config/app-config";

export default {
  name: "AppActionTab",
  props: {
    pertanyaanText: {
      type: String,
      default: "Pertanyaan"
    },
    kemaskiniText: {
      type: String,
      default: "Kemaskini"
    },
    pertanyaanDisabled: {
      type: Boolean,
      default: false
    },
    kemaskiniDisabled: {
      type: Boolean,
      default: false
    },
    pertanyaanLoading: {
      type: Boolean,
      default: false
    },
    kemaskiniLoading: {
      type: Boolean,
      default: false
    },
    pertanyaanOnClick: {
      type: Function,
      default: () => {
        console.log("pertanyaanOnClick default");
      }
    },
    kemaskiniOnClick: {
      type: Function,
      default: () => {
        console.log("kemaskiniOnClick default");
      }
    },
    menuUtamaOnClick: {
      type: Function,
      default: () => {
        window.location = HomeRoot;
        console.log("menuUtamaOnClick default");
      }
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      transactionState: "transactionState"
    })
  }
};
</script>
<style lang="scss">
.jpn-action-tab {
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
}
</style>

