import Vue from 'vue'
import Router from 'vue-router'
// import Main from '../components/Main'
import Main from '../views/Main'
import Search from '../views/Search'

Vue.use(Router)

export default new Router({
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
    }
  ]
})
