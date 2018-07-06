//import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";
import Validate from "../helper/validate-helper";
import { AlertConst } from "../store/modules/alert";
import { TransMeta } from "../store/modules/transaction";
import FingerprintPopup from "@/components/FingerprintPopup";

export function getGetters() {
    return [
        "authUser",
        "transactionState",
        "transactionCurrentTabId",
        "transactionFormObjectByName", // key, tab, name
        "transactionFormValueByName", // tab, name
        "transactionFormObject", // key, tab
        "transactionDataset",
        "transactionRefTable",
        "transactionCurrentTabId",
        "transactionNextTabId",
        "transactionMetaData"
    ];
}

export function getMutations() {
    return [
        "popupOpen",
        "alertOpen",
        "transChangeTab",
        "transSetEnabledTab",
        "transAddEnabledTab",
        "transRemoveEnabledTab",
        "transSetTabData", // tabData
        "transSetRefTable", // { key, data }
        "transSetFormObject", // { key, tab, data }
        "transSetFormObjectByName", // { key, tab, name, data }
        "transSetMetaData",// { key, value }
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
        // Fingerprint function 
        startFingerprint(successHandler) {
            this.openPopup("Semakan Kelulusan", FingerprintPopup, {
                succes: successHandler,
                error: (err) => {
                    console.log("getAllMethod", err);
                }
            });

        },
        // #########################################################################
        // Functions For Tab
        setNextTabEnabled() {
            this.transAddEnabledTab(this.transactionNextTabId);
        },
        // #########################################################################
        // Functions For Transaction MetaData
        getStartTime() {
            // YYYY-MM-DD-HH.MM.SS.XXXXXX
            return this.transactionMetaData[TransMeta.TIME_START];
        },
        getEndTime() {
            return this.transactionMetaData[TransMeta.TIME_END];
        },
        // #########################################################################
        // Useful functions
        // focus to the field that has no value and return false
        // return true if all has value
        isAllRequiredHasValue(nameArr) {
            for (var i in nameArr) {
                var name = nameArr[i];
                if (this.isFormValueEmpty(name)) {
                    this.alertError("Sila isi semua ruang yang diperlukan", () => {
                        this.focusToFormField(name);
                    });
                    return false;
                }
            }
            return true;
        },
        alertError(content, closeHandler) {
            this.alertOpen({ type: AlertConst.ERROR, content: content, closeHandler: closeHandler });
        },
        alertSuccess(content, closeHandler) {
            this.alertOpen({ type: AlertConst.SUCCESS, content: content, closeHandler: closeHandler });
        },
        alertInfo(content, closeHandler) {
            this.alertOpen({ type: AlertConst.INFO, content: content, closeHandler: closeHandler });
        },
        openPopup(title, content, prop) {
            this.popupOpen({ title: title, content: content, prop: prop });
        },
        // #########################################################################
        // Functions For Transaction Tab
        addEnabledTab(tabId) {
            this.transAddEnabledTab(tabId);
        },
        removeEnabledTab(tabId) {
            this.transRemoveEnabledTab(tabId);
        },
        // #########################################################################
        // Functions For Form Value
        setFormValueByTab(tab, name, value) {
            this.setOtherTabData(tab, "formValue", name, value)
        },
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
        setFormDisabledByTab(tab, name, value) {
            this.setOtherTabData(tab, "formDisabled", name, value)
        },
        setFormDisabled(name, bool) {
            if (bool) {
                // set required to false first
                this.setFormRequired(name, false);
            }
            this.setThisData("formDisabled", name, bool)
        },

        // #########################################################################
        // Functions For Form Required
        setFormRequiredByTab(tab, name, value) {
            this.setOtherTabData(tab, "formRequired", name, value)
        },
        setFormRequired(name, bool) {
            if (bool) {
                // set disabled to false first
                this.setFormDisabled(name, false);
            }
            this.setThisData("formRequired", name, bool)
        },

        // #########################################################################
        // Other function
        setThisData(key, name, value) {
            var tab = this.tabId;

            // first time not in store yet
            var fromStore = this.transactionFormObjectByName(key, tab, name);
            //console.log("fromStore", fromStore);
            //console.log("fromStore", this[key][name]);
            //this.transSetFormObjectByName({ key: key, tab: tab, name: name, data: value })

            //return;
            if (this.transactionFormObjectByName(key, tab, name) == null) {
                //console.log("fromStore", this[key], name, value);

                this.$set(this[key], name, value)
            }
            // recreate from store
            else {
                this.transSetFormObjectByName({ key: key, tab: tab, name: name, data: value })
            }
        },
        setOtherTabData(tab, key, name, value) {
            console.log("setOtherTabData", tab, key, name, value)
            // first time not in store yet
            // if (this.transactionFormObjectByName(key, tab, name) == null) {
            //     this.$set(this[key], name, value)
            // }
            // // recreate from store
            // else {
            this.transSetFormObjectByName({ key: key, tab: tab, name: name, data: value })
            //}
        },
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
            if (key == "formRequired") {
                console.log(key, this.tabId);
            }
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
        // Tab 2 created -> Tab 1 before destroy -> Tab 2 Mounted 
        startCreated() {
            //console.log("startCreated");
            // tabId need to be set first
            this.tabId = this.transactionCurrentTabId;
            this.Validate = Validate;
        },
        startMounted() {
            //console.log("startMounted");
            // need to be here sebab masa before destroy akan set value utk tab lain
            this.formValue = this.getFormObjectFromStore("formValue");
            this.formDisabled = this.getFormObjectFromStore("formDisabled");
            this.formRequired = this.getFormObjectFromStore("formRequired");
            this.formError = this.getFormObjectFromStore("formError");
        },
        startBeforeDestroy() {
            //console.log("startBeforeDestroy");
            this.nextTabValidation();
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
