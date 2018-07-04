
<template>
  <div>
      <div class="list-table">
        <table>
          <thead>
            <tr>
              <th v-for="h in header">{{h}}</th>
            </tr>
          </thead>
          <tbody>
              <tr :class="{clickable: onRowClick !== null}" @click="onRowClick(d)" v-for="d in data" v-bind:key="d[dataKey]">
                <!-- <td><a class="btn btn-link" @click="editRow(d)"><i class="fa fa-edit"></i></a></td>
                <td><a class="btn btn-link" @click="deleteRow(d)"><i class="fa fa-trash"></i></a></td> -->
                <td v-for="(col,key) in arrangeData(d)">{{col}}</td>
              </tr>
          </tbody>
        </table>
        <br><br>
      </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array
    },
    header: {
      type: Array
    },
    dataKey: {
      type: String
    },
    arrangeData: {
      type: Function,
      default: d => {
        console.log(d);
        return d;
      }
    },
    onRowClick: {
      type: Function,
      default: null
    },
    renderColumn: {
      type: Function,
      default: (d, key, col) => {
        return col;
      }
    },
    validRow: {
      type: Function,
      default: d => {
        return true;
      }
    },
    editRow: {
      type: Function,
      default: d => {
        console.log("edit", d);
      }
    },
    deleteRow: {
      type: Function,
      default: d => {
        console.log("delete", d);
      }
    }
  },
  name: "ListTable",
  created() {
    this.init();
  },
  methods: {
    init() {}
    // validRow(d) {
    //   if (this.validRowCustom) {
    //     return this.validRowCustom(d);
    //   } else {
    //     return true;
    //   }
    // },
    // arrangeData(d) {
    //   if (this.arrangeDataCustom) {
    //     return this.arrangeDataCustom(d);
    //   } else {
    //     return d;
    //   }
    // },
    // renderColumn(key, col) {
    //   if (this.renderColumnCustom) {
    //     return this.renderColumnCustom(key, col);
    //   } else {
    //     return key;
    //   }
    // }
  }
};
</script>



