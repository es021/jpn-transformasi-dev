<template>
  <div class="jpn-nav-bar">
    <div>
      <button @click="changeIndex(i)" 
        :disabled="isTabDisabled(d.id)"
        :class="{active: i == transactionState.currentTabIndex}" 
        class="jnv-item" v-for="(d,i) in data" :key="d.id">
        {{d.label}}
      </button>
    </div>  
    <div>  
      <button class="jnv-item" 
        @click="changeIndex(transactionState.currentTabIndex - 1)" 
        :disabled="!isPrevNextEnabled('prev')">< PREV
      </button><button 
        @click="changeIndex(transactionState.currentTabIndex + 1)" 
        class="jnv-item" 
        :disabled="!isPrevNextEnabled('next')">NEXT ></button>
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

