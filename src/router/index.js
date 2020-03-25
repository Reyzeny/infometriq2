import Vue from 'vue'
import Router from 'vue-router'
// import Main from '../components/Main'
import Main from '../views/Main'
import Search from '../views/Search'
import Login from '../views/Login'
import Signup from '../views/Signup'
import Profile from '../views/Profile/Profile'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Main',
      component: Main
    },
    {
      path: '/search',
      name: 'Search',
      component: Search
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/signup',
      name: 'Signup',
      component: Signup
    },
    {
      path: '/:username',
      name: 'Profile',
      component: Profile,
    }
  ]
})
