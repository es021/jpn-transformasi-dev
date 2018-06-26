const state = {
    tabEnabled: [],
    currentTabIndex: 0
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
    transChangeTab(state, { index }) {
        state.currentTabIndex = index;
    },
    transAddEnabledTab(state, { id }) {
        if (state.tabEnabled.indexOf(id) <= -1) {
            state.tabEnabled.push(id);
        }
    },
    transRemoveEnabledTab(state, { id }) {
        var index = state.tabEnabled.indexOf(id);
        if (index >= 0) {
            state.tabEnabled.splice(index, 1);
        }
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}