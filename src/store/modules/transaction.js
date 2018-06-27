const state = {
    tabEnabled: [], // store id of all tab that is enabled now
    navBarData: [], // store all tab in this transaction
    currentTabIndex: 0,
    dbData: {},
    formData: {},
    dataset: {
        branch: [
            { value: "01", label: "Cawangan HQ" },
            { value: "02", label: "Cawangan Lain" }
        ]
    }
}

// getters
const getters = {
    transactionState: state => state,
    transactionDataset: state => state.dataset,
    transactionCurrentTabId: (state) => {
        try {
            return state.navBarData[state.currentTabIndex].id
        } catch (err) {
            return null;
        }
    },
    transactionFormDataValue: (state) => (tab, name) => {
        //console.log("transactionFormDataValue", tab, name);
        try {
            return state.formData[tab][name];
        } catch (err) {
            return null;
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
    transSetNavBarData(state, navBarData) {
        state.navBarData = navBarData;
    },
    transSetDbData(state, { key, data }) {
        //var dbData = {};
        //dbData[key] = data;
        //state.dbData = Object.assign(state.dbData, dbData);

        state.dbData[key] = data;

    },

    transSaveFormData(state, { tab, name, value }) {
        //console.log("transSaveFormData", tab, name, value);
        if (typeof state.formData[tab] === "undefined") {
            state.formData[tab] = {}
        }

        if (typeof state.formData[tab][name] === "undefined") {
            state.formData[tab][name] = {}
        }
        state.formData[tab][name] = value;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}