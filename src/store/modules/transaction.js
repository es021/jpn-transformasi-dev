import Vue from 'vue';

export const TransMeta = {
    TIME_START: "time_start",
    TIME_END: "time_end"
}

const state = {
    tabEnabled: [], // store id of all tab that is enabled now
    tabData: [], // store all tab in this transaction
    metaData: {},
    currentTabIndex: 0,
    formValue: {},
    formDisabled: {},
    formRequired: {},
    formError: {},
    dataset: {
        branch: [
            { value: "Cawangan HQ", label: "Cawangan HQ" },
            { value: "Cawangan Lain", label: "Cawangan Lain" }
        ],
        jantina: [
            { value: "L", label: "Lelaki" },
            { value: "P", label: "Perempuan" }
        ],
    },
    refTable: {}
}


/// ########################################################
/// HELPER FUNCTION 

function refToSelectData(data, value, label) {
    var toRet = [];
    toRet.push({
        value: "",
        label: "--- SILA PILIH ---"
    });
    for (var i in data) {
        var d = data[i];
        toRet.push({
            value: d[value],
            label: d[label]
        });
    }
    return toRet;
}

function getFormObject(state, key, tab) {
    var debug = key == "formRequired" && tab == "TTEMPLATE_T2"
    if (debug) {
        console.log("getFormObjectByName", key, tab, name);
    }

    try {
        var toRet = state[key][tab];
        if (debug) {
            console.log(state[key]);
            console.log(state[key]["TTEMPLATE_T2"]);
        }
        if (typeof toRet === "undefined") {
            return {};
        }
        return toRet;
    } catch (err) {
        return {};
    }
}

function getFormObjectByName(state, key, tab, name) {

    var data = getFormObject(state, key, tab);
    try {
        var toRet = data[name];
        if (typeof toRet === "undefined") {
            return null;
        }
        return toRet;
    } catch (err) {
        return null;
    }
}

/// ########################################################
// getters

const getters = {
    transactionState: state => state,
    transactionMetaData: state => state.metaData,
    transactionDataset: state => state.dataset,
    transactionCurrentTabId: (state) => {
        try {
            return state.tabData[state.currentTabIndex].id
        } catch (err) {
            return null;
        }
    },
    transactionNextTabId: (state) => {
        try {
            return state.tabData[state.currentTabIndex + 1].id
        } catch (err) {
            return null;
        }
    },
    transactionRefTable: (state) => (name, { value, label }) => {
        try {
            var toRet = state.refTable[name];
            if (typeof toRet === "undefined") {
                return [];
            } else {
                if (typeof value !== "undefined" && typeof label !== "undefined") {
                    toRet = refToSelectData(toRet, value, label);
                }
                return toRet;
            }
        } catch (err) {
            return [];
        }
    },
    transactionFormErrorByName: (state) => (tab, name) => {
        return getFormObjectByName(state, "formError", tab, name);
    },
    transactionFormValueByName: (state) => (tab, name) => {
        return getFormObjectByName(state, "formValue", tab, name);
    },
    transactionFormObjectByName: (state) => (key, tab, name) => {
        return getFormObjectByName(state, key, tab, name);
    },
    transactionFormObject: (state) => (key, tab) => {
        return getFormObject(state, key, tab);
    }
}

/// ########################################################
// getters
const mutations = {
    transChangeTab(state, index) {
        state.currentTabIndex = index;
    },
    transSetEnabledTab(state, tabEnabled) {
        state.tabEnabled = tabEnabled;
    },
    transAddEnabledTab(state, id) {
        console.log("transAddEnabledTab")
        if (state.tabEnabled.indexOf(id) <= -1) {
            state.tabEnabled.push(id);
        }
    },
    transRemoveEnabledTab(state, id) {
        var index = state.tabEnabled.indexOf(id);
        if (index >= 0) {
            state.tabEnabled.splice(index, 1);
        }
    },
    transSetTabData(state, tabData) {
        state.tabData = tabData;
    },
    transSetRefTable(state, { key, data }) {
        state.refTable[key] = data;
    },
    transSetFormObject(state, { key, tab, data }) {
        //console.log("transSetFormValue", key, tab, data);
        state[key][tab] = data;
    },
    transSetFormObjectByName(state, { key, tab, name, data }) {
        //console.log("transSetFormValue", key, tab, data);
        if (typeof state[key] == "undefined") {
            //state[key] = {};
            Vue.set(state, key, {})
        }
        if (typeof state[key][tab] == "undefined") {
            Vue.set(state[key], tab, {})
        }

        Vue.set(state[key][tab], name, data);
        //console.log(key, tab, name, data);
    },
    transSetMetaData(state, { key, value }) {
        if (typeof state.metaData[key] == "undefined") {
            state.metaData[key] = value;
        }
    },
}

/// ########################################################
// actions
const actions = {

}

export default {
    state,
    getters,
    actions,
    mutations
}