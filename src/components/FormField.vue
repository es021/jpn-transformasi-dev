<!-- DO NOT CHANGE ANYTHING HERE -->
<template>
  <div class="form-field">
    <div class="ff-flex">
      <div class="ff-label">{{label}}</div>
      <div class="ff-item">
        <input @change="onChange" :disabled="disabled" v-model="value" v-if="isInput()" :type="type" :name="name" :placeholder="placeholder"/>

        <select @change="onChange" :disabled="disabled" v-model="value" v-if="isSelect()" :name="name">
          <option v-for="(d,i) in dataset" :key="`${name}_${i}`" :value="d.value">
            {{d.label}}
          </option>
        </select>

        <span v-if="isRadiobox()">
           <div :class="{ffDisabled:disabled}" class="radiobox-container" v-for="(d,i) in dataset" :key="`${name}_${i}`">
             <input :disabled="disabled" @change="onChange" type="radio" v-model="value" :value="d.value">
             <span>{{d.label}}</span>
           </div>
        </span>

        <span v-if="isCheckbox()">
           <div :class="{ffDisabled:disabled}" class="checkbox-container" v-for="(d,i) in dataset" :key="`${name}_${i}`">
             <input :disabled="disabled" @change="onChange" type="checkbox" v-model="value[d.label]">
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
  beforeDestroy() {
    this.saveDataToStore();
  },
  data() {
    return {
      value: null,
      disabled: false,
      required: true,
      error: false
    };
  },
  created() {
    this.tabId = this.transactionCurrentTabId;

    // will return null if do not has any input yet
    var storeVal = this.getDataFromStore();

    this.value = this.getInitalValue(storeVal);

    // if already has input then do validation again
    if (storeVal !== null) {
      this.doValidation();
    }
  },
  methods: {
    onChange() {
      var value = this.getValue();
      //console.log("change", this.name, value);
      this.doValidation();
    },
    doValidation() {
      var value = this.getValue();
      this.error = this.validate(value);
    },
    getDataFromStore() {
      return this.transactionFormDataValue(this.tabId, this.name);
    },
    saveDataToStore() {
      this.transSaveFormData({
        tab: this.tabId,
        name: this.name,
        value: this.getValue()
      });
    },
    getInitalValue(storeVal) {
      var toRet = null;
      if (this.isCheckbox()) {
        if (storeVal == null) {
          toRet = {};
        } else {
          toRet = {};
          for (var i in storeVal) {
            toRet[storeVal[i]] = true;
          }
        }
      } else {
        if (storeVal == null) {
          toRet = "";
        } else {
          toRet = storeVal;
        }
      }
      return toRet;
    },
    getValue() {
      var val = null;
      if (this.isCheckbox()) {
        val = [];
        for (var key in this.value) {
          if (this.value[key] == true) {
            val.push(key);
          }
        }
      } else {
        val = this.value;
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
</script>

