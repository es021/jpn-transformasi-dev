import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";
import Validate from "../helper/validate-helper";

export function getGetters(unix) {
    return [
        "transactionState",
        "transactionCurrentTabId",
        "transactionFormObjectByName", // key, tab, name
        "transactionFormValueByName", // tab, name
        "transactionFormObject", // key, tab
        "transactionDataset",
        "transactionRefTable",
        "transactionCurrentTabId"
    ];
}



export function getMutations() {
    return [
        "transChangeTab",
        "transSetEnabledTab",
        "transAddEnabledTab",
        "transRemoveEnabledTab",
        "transSetTabData", // tabData
        "transSetRefTable", // { key, data }
        "transSetFormObject", // { key, tab, data }
        "transSetFormObjectByName" // { key, tab, name, data }
    ];
}


export function getExtraData() {
    return {
        formValue: {},
        formDisabled: {},
        formRequired: {},
        formError: {},
        formRef: {},
    }
}

export function getAllComputed() {
    return {
        ...mapGetters(getGetters())
    }
}

export function getAllMethod() {
    return {
        setThisData(key, name, value) {
            var tab = this.tabId;

            // first time not in store yet
            if (this.transactionFormObjectByName(key, tab, name) == null) {
                this.$set(this[key], name, value)
            }
            // recreate from store
            else {
                this.transSetFormObjectByName({ key: key, tab: tab, name: name, data: value })
            }
        },
        // #########################################################################
        // Functions For Form Value
        setFormValue(name, value) {
            this.setThisData("formValue", name, value)
        },
        getFormValue(name) {
            return this.formValue[name];
        },
        isFormValueEmpty(name) {
            var value = this.getFormValue(name);
            if (typeof value == "undefined" || value == "" || value == null) {
                return true;
            }
            return false;
        },
        // #########################################################################
        // Functions For Form Error
        setFormError(name, error) {
            this.setThisData("formError", name, error)
        },
        getFormError(name) {
            return this.formError[name];
        },
        isFormHasError(name) {
            var error = this.formError[name];
            if (error !== false) {
                return true;
            }

            return false;
        },
        // #########################################################################
        // Functions For Form Ref
        setFormRef(name, ref) {
            this.setThisData("formRef", name, ref)
        },
        getFormRef(name) {
            return this.formRef[name];
        },
        focusToFormField(name) {
            //console.log("focusToFormField")
            var ref = this.getFormRef(name);
            //console.log(ref);
            ref.focus();
        },
        // #########################################################################
        // Functions For Form Disabled
        setFormDisabled(name, bool) {
            if (bool) {
                // set required to false first
                this.setFormRequired(name, false);
            }
            this.setThisData("formDisabled", name, bool)
        },

        // #########################################################################
        // Functions For Form Required
        setFormRequired(name, bool) {
            if (bool) {
                // set disabled to false first
                this.setFormDisabled(name, false);
            }
            this.setThisData("formRequired", name, bool)
        },

        // #########################################################################
        // Other function
        onChange(name, value, error, ref) {
            //console.log("onChange parent", name, value, error);

            if (value !== null && typeof value !== "undefined") {
                this.setFormValue(name, value);
            }

            if (error !== null && typeof error !== "undefined") {
                this.setFormError(name, error);
            }

            this.setFormRef(name, ref);
        },
        getFormObjectFromStore(key) {
            return this.transactionFormObject(key, this.tabId);
        },
        setFormObjectToStore(key) {
            this.transSetFormObject({
                key: key,
                tab: this.tabId,
                data: this[key]
            });
        },

        // #########################################################################
        // Hook
        startCreated() {
            // tabId need to be set first
            this.tabId = this.transactionCurrentTabId;
            this.Validate = Validate;

            this.formValue = this.getFormObjectFromStore("formValue");
            this.formDisabled = this.getFormObjectFromStore("formDisabled");
            this.formRequired = this.getFormObjectFromStore("formRequired");
            this.formError = this.getFormObjectFromStore("formError");
        },
        startBeforeDestroy() {
            this.setFormObjectToStore("formValue");
            this.setFormObjectToStore("formDisabled");
            this.setFormObjectToStore("formRequired");
            this.setFormObjectToStore("formError");
        },

        // #########################################################################
        // From Mutations
        ...mapMutations(getMutations())
    };
}
