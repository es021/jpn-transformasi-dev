<!-- DO NOT CHANGE ANYTHING HERE -->
<template>
  <div class="form-field" :class="{error:hasError()}">
    <div class="ff-flex">
      <div class="ff-label" :style="labelStyle" :title="name">            
        {{label}}
      </div>
      <div class="ff-item" :style="itemStyle" :class="{'auto-height':isCheckbox() || isRadiobox()}">
        
        <input v-if="isInput() && count == 1" :ref="name" @change="onChange" 
          :class="{required:required}" :disabled="disabled" :value="value" :type="type" :name="name" 
          :step="step"
          :placeholder="placeholder"/>

        <!--for more than 1 field -->
        <input v-if="count > 1" v-for="(d,i) in arrForCount" :key="`${name}_${i+1}`" :ref="`${name}_${i+1}`" @change="onChange" 
          :class="{required:required}" class="ff-extra" :disabled="disabled" :value="valueArray[i]" :type="type" :name="`${name}_${i+1}`" 
          :step="step"
          :placeholder="placeholder"/> 

        <!-- type we use input because we already use pickaday lib !-->
        <!-- if we use type date here will mess up state apa ntah -->
         <input  v-if="isDate()" :ref="name" @change="onChange" 
          :class="{required:required}" :disabled="disabled" :value="value" type="input" :name="name" 
          :placeholder="placeholder"/>

        <select v-if="isSelect()" :ref="name" @change="onChange" :class="{required:required}" :disabled="disabled" :value="value" :name="name">
          <option v-for="(d,i) in dataset" :key="`${name}_${i}`" :value="d.value">
            {{d.label}}
          </option>
        </select>

         <div class="box-container"  :class="{'ff-disabled':disabled,'ff-required':required}" v-if="isRadiobox()">
           <div v-for="(d,i) in dataset" class="radiobox-container" :key="`${name}_${i}`">
             <input :disabled="disabled" :class="{required:required}" @change="onChange" type="radio" :name="name" :ref="name" :value="d.value" :checked="d.value == value">
             <span>{{d.label}}</span>
           </div>
        </div>

        <div class="box-container"  :class="{'ff-disabled':disabled,'ff-required':required}" v-if="isCheckbox()">
           <div v-for="(d,i) in dataset" class="checkbox-container"  :key="`${name}_${i}`">
             <input :disabled="disabled" :class="{required:required}" @change="onChange" type="checkbox" :name="name"  :ref="name" :value="d.value" 
            :checked="valueArray.indexOf(d.value) >= 0">
             <span>{{d.label}}</span>
           </div>
        </div>

      </div>
    </div>
    <div  :style="itemStyle"  v-if="hasError()" class="ff-error">{{error}}</div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import Pikaday from "pikaday";
import Validate from "../helper/validate-helper";

export default {
  name: "FormField",
  props: {
    count: {
      type: [String, Number],
      default: 1
    },
    value: {
      type: [String, Number, Array], // {value:""}
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
    step: {
      type: String,
      default: "any"
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
    },
    labelWidth: {
      type: Number,
      default: 30
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
      labelStyle: {},
      itemStyle: {},
      error: false,
      currentValue: null,
      arrForCount: []
    };
  },
  created() {
    // create arr for count
    if (this.count > 1) {
      for (var i = 0; i < this.count; i++) {
        this.arrForCount.push("");
      }
    }

    //console.log(labelWidth);
    this.labelStyle = { width: this.labelWidth + "%" };
    this.itemStyle = { width: 100 - this.labelWidth + "%" };
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
      return (
        this.error !== false &&
        this.error !== "" &&
        this.error !== null &&
        typeof this.error !== "undefined"
      );
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
      //console.log("onChange FormField", value);

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

