import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home/Home'
import Player from '@/pages/player/Player'
import playListDetail from '@/pages/playList-detail/playList-detail'
import songSheet from '@/pages/song-sheet/song-sheet'
import About from '@/pages/about/about'
import Search from '@/pages/search/search'
import Setting from '@/pages/setting/setting'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/player',
      name: 'player',
      component: Player,
      meta: {
        keepAlive: true 
      }
    },
    {
      path: '/song-sheet',
      name: 'songSheet',
      component: songSheet,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/play-list-detail',
      name: 'playListDetail',
      component: playListDetail,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/about',
      name: 'About',
      component: About,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/search',
      name: 'Search',
      component: Search,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/setting',
      name: 'Setting',
      component: Setting,
      meta: {
        keepAlive: true
      }
    }
  ]
})
