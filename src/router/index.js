import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue')
  },
  {
    path: '/weather',
    name: 'Weather',
    component: () => import('@/views/Weather.vue')
  },
  {
    path: '/func',
    name: 'Func',
    component: () => import('@/views/Func.vue'),
    children: [
      {
        path: 'time',
        component: () => import('@/components/MInfo.vue')
      },
      {
        path: 'airport',
        component: () => import('@/components/AirportSearch.vue')
      }
    ]
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
