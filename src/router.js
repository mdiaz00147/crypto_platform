import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'login',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/plans',
          name: 'Plans',
          component: () => import(/* webpackChunkName: "demo" */ './views/Plans.vue')
        },
        {
          path: '/reports',
          name: 'Reports',
          component: () => import(/* webpackChunkName: "demo" */ './views/Reports.vue')
        },
        {
          path: '/binary-net',
          name: 'Binary network',
          component: () => import(/* webpackChunkName: "demo" */ './views/BinaryNet.vue')
        },
        {
          path: '/subscriptions',
          name: 'Subscriptions',
          component: () => import(/* webpackChunkName: "demo" */ './views/Subscriptions.vue')
        },
        {
          path: '/profile',
          name: 'Profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        {
          path: '/statements',
          name: 'Statements',
          component: () => import(/* webpackChunkName: "demo" */ './views/Statements/Statements.vue'),
          children: [
            {
              path: 'list',
              name: 'Statements',
              component: () => import(/* webpackChunkName: "demo" */ './views/Statements/List.vue'),
            },
            {
              path: ':id',
              name: 'Show',
              component: () => import(/* webpackChunkName: "demo" */ './views/Statements/Show.vue'),
            }
          ]
        },
        {
          path: '/billing',
          name: 'Billing',
          component: () => import(/* webpackChunkName: "demo" */ './views/Billing.vue')
        }
      ]
    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/registration',
          name: 'registration',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        },
        {
          path: '/password-recovery',
          name: 'forgot-password',
          component: () => import(/* webpackChunkName: "demo" */ './views/PasswordRecovery.vue')
        },
        {
          path: '/tos',
          name: 'tos',
          component: () => import(/* webpackChunkName: "demo" */ './views/TOS.vue')
        }
      ]
    }
  ]
})
