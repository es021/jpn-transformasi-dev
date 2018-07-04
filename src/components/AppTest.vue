
<template>
  <div>
    <h2>Test Page</h2>

    <h4>To Camel Case</h4>
    <input type="text" v-model="toCamelCase" @change="toCamelCaseChange"/>
    <br>
    {{camelCased}}
  </div>
</template>

<script>
export default {
  name: "AppExit",
  data() {
    return {
      toCamelCase: "",
      camelCased: ""
    };
  },
  methods: {
    toCamelCaseChange() {
      var input = this.toCamelCase;

      var arr = input.split("_");
      var res = "";
      arr.map((d, i) => {
        if (d != "") {
          d = d.toLowerCase();
          var first = d.charAt(0).toUpperCase();
          var rest = d.substring(1, d.length);
          res += first + rest;
        }
      });

      this.camelCased = res;
    }
  }
};
</script>
