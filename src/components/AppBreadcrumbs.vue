
<template>
  <div class="jpn-breadcrumbs">
    <div class="jb-item" @click="onClick(d.url)" v-for="(d,i) in data" :key="i">
      <div v-if="i > 0" class="jbi-arrow-back"></div>
      <div class="jbi-label">{{d.label}}</div>
      <div class="jbi-arrow"></div>

    </div>
  </div>
</template>

<script>
import { HomePage } from "../config/app-config";
export default {
  name: "AppBreadcrumbs",
  props: {
    data: {
      type: Array,
      default: []
    },
    text: {
      type: String,
      default: ""
    }
  },
  methods: {
    onClick(url) {
      if (url == null || typeof url === "undefined" || url == "") {
        return;
      }
      window.location = HomePage + url;
    }
  }
};
</script>
