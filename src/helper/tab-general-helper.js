import Vue from "vue";
import { mapGetters, mapMutations } from "vuex";

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

export function beforeDestroy() {
    this.setFormObjectToStore("formValue");
    this.setFormObjectToStore("formDisabled");
    this.setFormObjectToStore("formRequired");
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
export function getAllComputed() {
    return {
        ...mapGetters(getGetters())
    }
}

export function getAllMethod() {
    return {
        ...mapMutations(getMutations()),
        setFormValue(name, value) {
            Vue.set(this.formValue, name, value);
        },
        setFormDisabled(name, bool) {
            if (bool) {
                // set required to false first
                this.setFormRequired(name, false);
            }
            Vue.set(this.formDisabled, name, bool);
        },
        setFormRequired(name, bool) {
            if (bool) {
                // set disabled to false first
                this.setFormDisabled(name, false);
            }
            Vue.set(this.formRequired, name, bool);
        },
        onChange(name, value) {
            //console.log("onChange parent", name, value);
            this.setFormValue(name, value);
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
        }
    };
}
