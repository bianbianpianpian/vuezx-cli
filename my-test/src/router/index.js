import Vue from 'vue'
import Router from 'vue-router'
import Demo from '@/components/Demo'

Vue.use(Router)

export default new Router({
  linkActiveClass: 'v-active',
  routes: [
    {
      path: '/',
      redirect: '/demo'
    },
    {
      path: '/demo',
      name: '1',
      component: Demo
    }
  ]
})
