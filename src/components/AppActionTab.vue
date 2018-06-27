
<template>
  <div class="jpn-action-tab">
    <div>
      <button @click="menuUtamaOnClick" class="btn btn-blue">Menu Utama</button>
    </div>
    <div>
      <button @click="pertanyaanOnClick" :disabled="pertanyaanDisabled" class="btn btn-blue">Pertanyaan</button>
      <button @click="kemaskiniOnClick" :disabled="kemaskiniDisabled" class="btn btn-blue">Kemaskini</button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "AppActionTab",
  props: {
    pertanyaanDisabled: {
      type: Boolean,
      default: false
    },
    kemaskiniDisabled: {
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

