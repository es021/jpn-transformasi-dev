export const AlertConst = {
    ERROR: "error",
    SUCCESS: "success",
    INFO: "info",
}

// initial state
// shape: [{ id, quantity }]
const state = {
    type: "info", // ["error","success","info"]
    content: "Alert Content",
    isOpen: false,
    closeHandler: () => { }
}

// getters
const getters = {
    alertState: state => state,
}

// actions
const actions = {

}

// mutations
const mutations = {
    alertOpen(state, { type, content, closeHandler }) {
        state.type = type;
        state.content = content;
        state.isOpen = true;

        if (closeHandler) {
            state.closeHandler = closeHandler;
        } else {
            state.closeHandler = () => {};
        }
    },
    alertClose(state) {
        state.isOpen = false;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}