<template>
  <div class="jpn-nav-bar">
    <div>
      <button @click="changeIndex(i)" 
        :disabled="isTabDisabled(d.id)"
        :class="{active: i == transactionState.currentTabIndex}" 
        class="jnv-item" v-for="(d,i) in data" :key="d.id">
        <b>{{d.label}}</b>
      </button>
    </div>  
    <div>  
      <button class="jnv-item" 
        @click="changeIndex(transactionState.currentTabIndex - 1)" 
        :disabled="!isPrevNextEnabled('prev')"><b>< PREV</b>
      </button><button 
        @click="changeIndex(transactionState.currentTabIndex + 1)" 
        class="jnv-item" 
        :disabled="!isPrevNextEnabled('next')"><b>NEXT ></b></button>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";

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
    ...mapMutations({
      transChangeTab: "transChangeTab",
      transSetNextEnabled: "transSetNextEnabled",
      transSetPrevEnabled: "transSetPrevEnabled"
    }),
    changeIndex(i) {
      if (this.currentTabIndex == i) {
        return;
      }

      if (i > this.data.length - 1) {
        return;
      }

      if (i < 0) {
        return;
      }

      this.transChangeTab(i);
    },
    isTabDisabled(id) {
      return this.transactionState.tabEnabled.indexOf(id) <= -1;
    },
    isPrevNextEnabled(type) {
      try {
        var state = this.transactionState;
        var nextIndex =
          type == "next"
            ? state.currentTabIndex + 1
            : state.currentTabIndex - 1;
        var nextId = state.tabData[nextIndex].id;
        return state.tabEnabled.indexOf(nextId) >= 0;
      } catch (err) {
        return false;
      }
    }
  }
};
</script>

<style lang="scss">
.jpn-nav-bar {
  display: flex;
  margin-bottom: 10px;
  justify-content: space-between;

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

  .jnv-item[disabled="disabled"] {
    cursor: not-allowed;
    color: #4a4a4a;
    background-color: #8f8f8f;
    border-color: #545454;
  }
}
</style>

