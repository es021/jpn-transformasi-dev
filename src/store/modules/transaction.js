const state = {
    tabEnabled: [], // store id of all tab that is enabled now
    navBarData: [], // store all tab in this transaction
    currentTabIndex: 0,
    dbData: {}
}

// getters
const getters = {
    transactionState: state => state,
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

    }
}

export default {
    state,
    getters,
    actions,
    mutations
}