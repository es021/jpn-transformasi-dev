
<template>
  <div class="jpn-action-tab">
    <div>
      <button @click="menuUtamaOnClick" class="btn btn-blue">Menu Utama</button>
    </div>
    <div>
      <button @click="pertanyaanOnClick" class="btn btn-blue">Pertanyaan</button>
      <button @click="kemaskiniOnClick" class="btn btn-blue">Kemaskini</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "AppActionTab",
  props: {
    pertanyaanOnClick: {
      type: Function,
      default: () => {
        console.log("pertanyaanOnClick");
      }
    },
    kemaskiniOnClick: {
      type: Function,
      default: () => {
        console.log("kemaskiniOnClick");
      }
    },
    menuUtamaOnClick: {
      type: Function,
      default: () => {
        console.log("menuUtamaOnClick");
      }
    }
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">

.jpn-action-tab{
  display: flex;
  justify-content: space-between;
}

</style>

