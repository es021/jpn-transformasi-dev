import { mapGetters, mapMutations } from "vuex";
import * as ApiHelper from "./api-helper";
import * as TimeHelper from "./time-helper";
import { TransMeta } from "../store/modules/transaction";

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
        "transactionMetaData"
    ];
}

export function getMutations() {
    return [
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
        startCreated() {
            this.loading = true;
            this.transSetTabData(this.tabData);
            this.transSetEnabledTab(this.initialTabEnabled);
            this.loadAllRefTable();
        },
        loadAllRefTable() {
            if (this.refTable.length <= 0) {
                this.loading = false;
                return;
            }

            ApiHelper.loadRefTable(
                this.refTable,
                (key, data) => {
                    //progress Handler
                    this.transSetRefTable({ key: key, data: data });
                    this.refTableCompleted++;
                    console.log(key, data);

                    // when all finished
                    if (this.refTable.length == this.refTableCompleted) {
                        // set time transaction start
                        this.transSetMetaData({ key: TransMeta.TIME_START, value: TimeHelper.getUnixTimestampNow() });
                        this.loading = false;
                    }
                },
                err => {
                    // error Handler
                }
            );
        },
        ...mapMutations(getMutations())
    };
}
