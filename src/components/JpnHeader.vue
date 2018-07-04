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
    <div class="h-left">
      <div class="user-info">
        <div><small>OPER ID</small> <b>{{authUser["OPER_ID"]}}</b></div>
        <div><small>BRANCH CODE</small> <b>{{authUser["BRANCH_CODE"]}}</b></div>
        <div><small>PC ID</small> <b>{{authUser["PC_ID"]}}</b></div>
      </div>
    </div>
</div>
</template>

<script>
import { mapGetters } from "vuex";

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
  computed: {
    ...mapGetters(["authUser"])
  },
  mounted() {},
  methods: {}
};
</script>
