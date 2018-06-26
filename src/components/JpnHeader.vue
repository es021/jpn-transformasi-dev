<template>
  <div id="jpn-header" class="jpn-header">
    <div class="h-left">
        <router-link to="/">
          <img class="logo"
            :src="require('../image/jpn-logo-sm.jpg')" 
            style="height: 60px; margin:0 10px;" />
        </router-link>
        <div class="detail">
            <router-link class="title" to="/">
                Jabatan Pendaftaran Negara
            </router-link>
            <div class="subtitle">
                Kementerian Dalam Negeri
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
  name: "JpnHeader",
  props: {
    loggedIn: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {};
  },
  mounted() {},
  methods: {}
};
</script>
