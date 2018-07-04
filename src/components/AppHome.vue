
<template>
<span>
    <div v-if="loading">
      <br>
      <i class="fa fa-spinner fa-pulse fa-2x"></i>
      <br>
      Loading App Configuration...
    <div style="color:red;" v-if="err !='' ">
      <br><b>ERROR</b><br>
      {{err}}
    </div>
    </div>
    <span v-else>
      <AppPopup></AppPopup>
      <AppAlert></AppAlert>
      <JpnHeader></JpnHeader>
      <div class="jpn-bar-content">
        <JpnContent></JpnContent>
      </div>
    </span>
</span>
</template>

<script>
export default {
  name: "AppHome",
  data() {
    return {
      loading: true,
      err: ""
    };
  },
  created() {
    this.loadConfiguration();
  },
  mounted() {},
  watch: {
    $route(to, from) {}
  },
  methods: {
    loadConfiguration() {
      setTimeout(() => {
        this.loading = false;
      }, 50);
    }
  }
};
</script>
