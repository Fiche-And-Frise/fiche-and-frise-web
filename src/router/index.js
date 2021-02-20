import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../views/Login.vue'
import Home from '../views/Home.vue'
import Fiches from '../views/Fiches.vue'
import Frises from '../views/Frises.vue'
import Themes from '../views/Themes.vue'
import store from '../store'

Vue.use(VueRouter)


const ifNotAuthenticated = (to, from, next) => {
  if (!store.getters.isAuthenticated) {
    next()
    return
  }
  next('/')
}

const ifAuthenticated = (to, from, next) => {
  if (store.getters.isAuthenticated) {
    next()
    return
  }
  next('/login')
}

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    beforeEnter: ifNotAuthenticated
  },
  {
    path: '/',
    name: 'Home',
    component: Home,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/fiches',
    name: 'Fiches',
    component: Fiches,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/frises',
    name: 'Frises',
    component: Frises,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/themes',
    name: 'Themes',
    component: Themes,
    beforeEnter: ifAuthenticated
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
