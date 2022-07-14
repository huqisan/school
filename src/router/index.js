import { createRouter, createWebHashHistory } from 'vue-router'
import classList from '../views/classList.vue'

const routes = [
  {
    path: '/',
    name: 'classList',
    component: classList
  },
  {
    path: '/studentList',
    name: 'studentList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "studentList" */ '../views/studentList.vue')
  },
  {
    path: '/classAdd',
    name: 'classAdd',
    component: () => import(/* webpackChunkName: "classAdd" */ '../views/classAdd.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
