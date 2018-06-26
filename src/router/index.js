import Vue from 'vue'
import Router from 'vue-router'
import AppHome from '@/components/AppHome'
import AppExit from '@/components/AppExit'

// register Router
Vue.use(Router)

const router =  new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'AppHome',
    //   component: AppHome
    // },
    //http://localhost:8081/#/transaction/T385150
    {
      path: '/transaction/:transaction_code',
      name: 'AppHome',
      component: AppHome
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
