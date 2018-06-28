<!-- DO NOT CHANGE ANYTHING HERE -->
<template>
  <div class="form-field">
    <div class="ff-flex">
      <div class="ff-label">{{label}}</div>
      <div class="ff-item">
        <input  v-if="isInput()" :ref="name" @change="onChange" :disabled="disabled" :value="value" :type="type" :name="name" :placeholder="placeholder"/>

        <select v-if="isSelect()" :ref="name" @change="onChange" :disabled="disabled" :value="value" :name="name">
          <option v-for="(d,i) in dataset" :key="`${name}_${i}`" :value="d.value">
            {{d.label}}
          </option>
        </select>

         <span v-if="isRadiobox()">
           <div v-for="(d,i) in dataset" :class="{ffDisabled:disabled}" class="radiobox-container" :key="`${name}_${i}`">
             <input :disabled="disabled" @change="onChange" type="radio" :name="name" :ref="name" :value="d.value" :checked="d.value == value">
             <span>{{d.label}}</span>
           </div>
        </span>

        <span v-if="isCheckbox()">
           <div v-for="(d,i) in dataset" :class="{ffDisabled:disabled}" class="checkbox-container"  :key="`${name}_${i}`">
             <input :disabled="disabled" @change="onChange" type="checkbox" :name="name"  :ref="name" :value="d.value" 
            :checked="valueArray.indexOf(d.value) >= 0">
             <span>{{d.label}}</span>
           </div>
        </span>

        <div v-if="error !== false" class="ff-error">{{error}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";

export default {
  name: "FormField",
  props: {
    value: {
      type: String, // {value:""}
      default: null
    },
    valueArray: {
      type: Array, // {value:""}
      default: () => {
        return [];
      }
    },
    type: {
      type: String
    },
    name: {
      type: String
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    dataset: {
      // must follow this -- {value, label}
      // can be used in select, radio box, check box
      type: Array,
      default: () => {
        return [];
      }
    },
    validate: {
      type: Function,
      default: () => {
        //console.log("default validate");
        return false;
      }
    }
  },
  // watch prop change
  watch: {
    value: {
      handler: function(value, oldValue) {
        this.onPropValueChange(value, oldValue);
      }
    },
    valueArray: {
      handler: function(value, oldValue) {
        this.onPropValueChange(value, oldValue);
      }
    }
  },
  data() {
    return {
      disabled: false,
      required: true,
      error: false,
      currentValue: null
    };
  },
  created() {
    this.doValidation();
  },
  methods: {
    onPropValueChange(value, oldValue) {
      console.log("propchange", value, oldValue);
      this.currentValue = value;
      this.doValidation();
    },
    onChange() {
      console.log("onChange FormField");
      var value = this.getRefValue();
      this.currentValue = value;
      this.$emit("onChange", this.name, value);
      this.doValidation();
    },
    doValidation() {
      console.log("doValidation");
      if (this.currentValue !== null) {
        this.error = this.validate(this.currentValue);
      } else {
        this.error = false;
      }
    },
    getRefValue() {
      var ref = this.$refs[this.name];
      var val = null;
      if (this.isCheckbox()) {
        val = [];
        for (var i in ref) {
          if (ref[i].checked == true) {
            val.push(ref[i].value);
          }
        }
      } else if (this.isRadiobox()) {
        for (var i in ref) {
          if (ref[i].checked == true) {
            val = ref[i].value;
          }
        }
      } else {
        val = ref.value;
      }
      return val;
    },
    isInput() {
      return ["text", "number", "date"].indexOf(this.type) >= 0;
    },
    isSelect() {
      return this.type == "select";
    },
    isRadiobox() {
      return this.type == "radiobox";
    },
    isCheckbox() {
      return this.type == "checkbox";
    },
    ...mapMutations(["transSaveFormData"])
  },
  computed: {
    ...mapGetters(["transactionCurrentTabId", "transactionFormDataValue"])
  }
};

// getInitalValue(storeVal) {
//   var toRet = null;
//   if (this.isCheckbox()) {
//     if (storeVal == null) {
//       toRet = {};
//     } else {
//       toRet = {};
//       for (var i in storeVal) {
//         toRet[storeVal[i]] = true;
//       }
//     }
//   } else {
//     if (storeVal == null) {
//       toRet = "";
//     } else {
//       toRet = storeVal;
//     }
//   }
//   return toRet;
// },
</script>

