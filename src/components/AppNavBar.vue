
<template>
  <div class="jpn-nav-bar">
    <div @click="changeIndex(i)" 
      :class="{active: i == transactionState.currentTabIndex}" 
      class="jnv-item" v-for="(d,i) in data" :key="d.id">
       <b>{{d.label}}</b>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "AppNavBar",
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      transactionState: "transactionState"
    })
  },
  methods: {
    ...mapMutations({ transChangeTab: "transChangeTab" }),
    changeIndex(i) {
      if (this.currentTabIndex == i) {
        return;
      }
      this.transChangeTab({ index: i });
    }
  }
};
</script>

<style lang="scss">
.jpn-nav-bar {
  display: flex;
  .jnv-item {
    // general
    padding: 10px;
    border-radius: 13px 13px 0px 0px;
    border: black solid 1px;
    cursor: pointer;

    // color for normal
    color: white;
    border-color: #c5660e;
    background-color: #f5871f;
  }

  .jnv-item:hover,
  .jnv-item.active {
    color: #f5871f;
    border-color: #c5660e;
    background-color: white;
    border-bottom-color: white;
  }

  .jnv-item.disabled {
    cursor: not-allowed;
    color: #4a4a4a;
    background-color: #8f8f8f;
    border-color: #545454;
  }
}
</style>

