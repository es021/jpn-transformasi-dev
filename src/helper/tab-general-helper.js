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
        "transSetTabData",
        "transSetRefTable",
        "transSetFormObject"
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

        // #########################################################################
        // Functions For Form Value
        setFormValue(name, value) {
            Vue.set(this.formValue, name, value);
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
            Vue.set(this.formError, name, error);
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
            Vue.set(this.formRef, name, ref);
        },
        getFormRef(name) {
            return this.formRef[name];
        },
        focusToFormField(name) {
            console.log("focusToFormField")
            var ref = this.getFormRef(name);
            console.log(ref);
            ref.focus();
        },
        // #########################################################################
        // Functions For Form Disabled
        setFormDisabled(name, bool) {
            if (bool) {
                // set required to false first
                this.setFormRequired(name, false);
            }
            Vue.set(this.formDisabled, name, bool);
        },

        // #########################################################################
        // Functions For Form Required
        setFormRequired(name, bool) {
            if (bool) {
                // set disabled to false first
                this.setFormDisabled(name, false);
            }
            Vue.set(this.formRequired, name, bool);
        },

        // #########################################################################
        // Other function
        onChange(name, value, error, ref) {
            console.log("onChange parent", name, value, error);

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
            this.tabId = this.transactionCurrentTabId;
            this.Validate = Validate;

            // tabId need to be set first
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
