const state = {
    tabEnabled: [], // store id of all tab that is enabled now
    tabData: [], // store all tab in this transaction
    currentTabIndex: 0,
    dbData: {},
    formValue: {},
    dataset: {
        branch: [
            { value: "Cawangan HQ", label: "Cawangan HQ" },
            { value: "Cawangan Lain", label: "Cawangan Lain" }
        ],
        jantina: [
            { value: "L", label: "Lelaki" },
            { value: "P", label: "Perempuan" }
        ],
    }
}

// getters
const getters = {
    transactionState: state => state,
    transactionDataset: state => state.dataset,
    transactionCurrentTabId: (state) => {
        try {
            return state.tabData[state.currentTabIndex].id
        } catch (err) {
            return null;
        }
    },
    transactionFormValue: (state) => (tab) => {
        console.log("transactionFormValue", tab, name);
        try {
            var toRet = state.formValue[tab];
            if (typeof toRet === "undefined") {
                return {};
            } else {
                return toRet;
            }
        } catch (err) {
            return {};
        }
    }
}

// actions
const actions = {

}

// mutations
const mutations = {
    transChangeTab(state, index) {
        state.currentTabIndex = index;
    },
    transSetEnabledTab(state, tabEnabled) {
        state.tabEnabled = tabEnabled;
    },
    transAddEnabledTab(state, id) {
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
    transSetDbData(state, { key, data }) {
        //var dbData = {};
        //dbData[key] = data;
        //state.dbData = Object.assign(state.dbData, dbData);

        state.dbData[key] = data;

    },

    transSaveFormValue(state, { tab, formValue }) {
        console.log("transSaveFormValue", tab, formValue);
        state.formValue[tab] = formValue

    }
}

export default {
    state,
    getters,
    actions,
    mutations
}