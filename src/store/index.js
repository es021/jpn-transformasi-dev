import popup from './modules/popup'
//import server from './modules/server'
import transaction from './modules/transaction'
import auth from './modules/auth'
import alert from './modules/alert'
// Vue.use(Vuex)
//import Vuex from 'vuex';

const debug = process.env.NODE_ENV !== 'production'

// export default new Vuex.Store({
//   modules: {
//     popup
//   },
//   strict: debug
// })

export default {
    modules: {
        popup,
        transaction,
        auth,
        alert
    },
    strict: debug
};