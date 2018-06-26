// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
Vue.config.productionTip = false

// register transaction here
import {registerTransaction} from './transaction/_registerTransaction';
registerTransaction(Vue);

//register all component
import JpnHeader from '@/components/JpnHeader'
import JpnContent from '@/components/JpnContent'
import ManageNavi from '@/components/ManageNavi'
import TableData from '@/components/TableData'
import AppPopup from '@/components/AppPopup'
import AppBreadcrumbs from '@/components/AppBreadcrumbs'
import AppNavBar from '@/components/AppNavBar'
import AppActionTab from '@/components/AppActionTab'
import Form from '@/components/Form'

Vue.component('JpnHeader', JpnHeader);
Vue.component('JpnContent', JpnContent);
Vue.component('ManageNavi', ManageNavi);
Vue.component('TableData', TableData);
Vue.component('AppPopup', AppPopup);
Vue.component('AppBreadcrumbs', AppBreadcrumbs);
Vue.component('AppNavBar', AppNavBar);
Vue.component('AppActionTab', AppActionTab);
Vue.component('Form', Form);

//import all style
const scss = ["app", "form", "button", "content"
  , "general", "header"
  , "table", "popup"];

scss.map((d, i) => {
  require(`./style/${d}.scss`);
})

const css = ["fontawesome-all.min"];
css.map((d, i) => {
  require(`./style/css/${d}.css`);
})

console.log(process.env.NODE_ENV);

// vuex setup
import Vuex from 'vuex';
Vue.use(Vuex);
import storeObj from './store/index';
const store = new Vuex.Store(storeObj);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  // provide the store using the "store" option.
  // this will inject the store instance to all child components.
  store,
  router,
  components: { App },
  template: '<App/>'
})
