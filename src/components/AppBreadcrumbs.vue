
<template>
  <div class="jpn-breadcrumbs">
    <h4>{{text}}</h4>
  </div>
</template>

<script>
export default {
  name: "AppBreadcrumbs",
  props: {
    text: {
      type: String,
      default: ""
    }
  }
};
</script>
