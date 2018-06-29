<!-- DO NOT CHANGE ANYTHING HERE -->
<template>
  <div class="form-field" :class="{error:hasError()}">
    <div class="ff-flex">
      <div class="ff-label" :class="{empty:label==''}">{{label}}</div>
      <div class="ff-item">
        
        <input  v-if="isInput()" :ref="name" @change="onChange" 
          :required="required" :disabled="disabled" :value="value" :type="type" :name="name" 
          :placeholder="placeholder"/>

        <!-- type we use input because we already use pickaday lib !-->
        <!-- if we use type date here will mess up state apa ntah -->
         <input  v-if="isDate()" :ref="name" @change="onChange" 
          :required="required" :disabled="disabled" :value="value" type="input" :name="name" 
          :placeholder="placeholder"/>

        <select v-if="isSelect()" :ref="name" @change="onChange" :required="required" :disabled="disabled" :value="value" :name="name">
          <option v-for="(d,i) in dataset" :key="`${name}_${i}`" :value="d.value">
            {{d.label}}
          </option>
        </select>

         <span v-if="isRadiobox()">
           <div v-for="(d,i) in dataset" :class="{ffDisabled:disabled}" class="radiobox-container" :key="`${name}_${i}`">
             <input :disabled="disabled" :required="required" @change="onChange" type="radio" :name="name" :ref="name" :value="d.value" :checked="d.value == value">
             <span>{{d.label}}</span>
           </div>
        </span>

        <span v-if="isCheckbox()">
           <div v-for="(d,i) in dataset" :class="{ffDisabled:disabled}" class="checkbox-container"  :key="`${name}_${i}`">
             <input :disabled="disabled" :required="required" @change="onChange" type="checkbox" :name="name"  :ref="name" :value="d.value" 
            :checked="valueArray.indexOf(d.value) >= 0">
             <span>{{d.label}}</span>
           </div>
        </span>

        <div v-if="hasError()" class="ff-error">{{error}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Pikaday from "pikaday";
import Validate from "../helper/validate-helper";

export default {
  name: "FormField",
  props: {
    value: {
      type: String, // {value:""}
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    required: {
      type: Boolean,
      default: false
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
      error: false,
      currentValue: null
    };
  },
  created() {
    this.doValidation();
  },
  mounted() {
    if (this.isDate()) {
      this.addCalendar(this.$refs[this.name]);
    }

    // // check error in store and initialize
    this.error = this.transactionFormErrorByName(
      this.transactionCurrentTabId,
      this.name
    );

    this.$emit("onChange", this.name, null, null, this.$refs[this.name]);
  },
  methods: {
    hasError() {
      return this.error !== false;
    },
    onPropValueChange(value, oldValue) {
      //console.log("propchange", value, oldValue);
      this.currentValue = value;
      this.doValidation();
    },
    addCalendar(el) {
      try {
        if (el != null && typeof el !== "undefined") {
          var picker = new Pikaday({
            field: el,
            format: "DD/MM/YYYY",
            onOpen: function() {},
            onSelect: function() {}
          });
        }
      } catch (err) {
        console.log("addCalendar err", err);
      }
    },

    onChange() {
      var value = this.getRefValue();
      console.log("onChange FormField", value);

      this.currentValue = value;
      this.doValidation();

      this.$emit(
        "onChange",
        this.name,
        this.currentValue,
        this.error,
        this.$refs[this.name]
      );
    },
    doValidation() {
      if (this.currentValue !== null) {
        if (this.isDate()) {
          this.error = Validate.checkDate(this.currentValue);
        } else {
          this.error = this.validate(this.currentValue);
        }
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
      return ["text", "number"].indexOf(this.type) >= 0;
    },
    isDate() {
      return this.type == "date";
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
    ...mapGetters([
      "transactionCurrentTabId",
      "transactionFormDataValue",
      "transactionFormErrorByName"
    ])
  }
};
</script>

