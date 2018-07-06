import Vue from 'vue'
import Router from 'vue-router'
import AppHome from '@/components/AppHome'
import FingerprintResponse from '@/components/FingerprintResponse'
import AppExit from '@/components/AppExit'
import AppTest from '@/components/AppTest'

// register Router
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'FingerprintResponse',
      component: FingerprintResponse
    },
    //http://localhost:8081/#/transaction/T385150
    {
      path: '/transaction/:transaction_code',
      name: 'AppHome',
      component: AppHome
    },
    // {
    //   path: '/fingerprint-response',
    //   name: 'FingerprintResponse',
    //   component: FingerprintResponse
    // },
    {
      path: '/test',
      name: 'AppTest',
      component: AppTest
    },
    {
      path: '/not-found',
      name: 'AppExit',
      component: AppExit
    }
  ]
})

//router.replace({ path: '*', redirect: '/not-found' })
export default router
