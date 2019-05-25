<template>
  <div id="app">
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster" mode="out-in">
      <keep-alive>
            <router-view v-if="$route.meta.keepAlive"></router-view>
      </keep-alive>
    </transition>
    
    <transition name="custom-classes-transition" enter-active-class="animated fadeIn faster" leave-active-class="animated fadeOut faster" mode="out-in">
      <router-view v-if="!$route.meta.keepAlive"></router-view>
    </transition>

    <keep-alive include="MiniPlayer">
      <MiniPlayer v-if="!(this.$route.path === '/player')"/>
    </keep-alive>

    <transition name="custom-classes-transition" enter-active-class="animated slideInLeft" leave-active-class="animated slideOutLeft" mode="out-in">
      <keep-alive include="sideBar">
        <sideBar v-if="sideBarToggle"/>
      </keep-alive>
    </transition>

    <transition name="custom-classes-transition" enter-active-class="animated fadeIn" leave-active-class="animated fadeOut faster">
      <div class="start-page" v-if="startPage">
        <section class="about-logo-info">
          <div class="logo-wrapper" :style="{'background-color':theme_color}">
              <span class="logo-word">FW</span>
          </div>
          <div class="app-name" :style="{color:theme_color}">FW音乐站</div>
        </section>
      </div>
    </transition>
    
  </div>
</template>

<script>
import { mapMutations } from "vuex"
import MiniPlayer from '@/components/mini/MiniPlayer'
import sideBar from '@/components/sidebar/sidebar'
export default {
  name: 'App',
  data(){
    return {
      startPage: true
    }
  },
   components: {
    MiniPlayer,sideBar
  },
  computed: {
    theme_color() {
			return this.$store.state.theme.theme_color ? this.$store.state.theme.theme_color : '#954dcc'
		},
    sideBarToggle() {
      return this.$store.state.sidebar.isOpen ? this.$store.state.sidebar.isOpen : false
    }
  },
  created(){
    // let isMobile = /Android|webOS|iPhone|iPod|BlackBerry/i.test(navigator.userAgent)
    // const html = document.querySelector('html')
    // let dpr = document.querySelector('html').getAttribute('data-dpr')
    // const app = document.getElementById('app')
    // if(isMobile){
    //   html.style.width = '100%'
    // }else{
    //   html.style.width = '600px'
    // }
    this.getColor()
    let timer = setTimeout(()=>{
      this.startPage = false
      clearTimeout(timer)
    },1000)
  },
  methods:{
    ...mapMutations(["SET_THEME_COLOR","RESET"]),
    getColor(){
      if(window.localStorage){
        let color = window.localStorage.themeColor
        this.SET_THEME_COLOR(color)
      }else{
        this.SET_THEME_COLOR()
      }
    }
  }
}
</script>

<style lang="stylus">
@import url('./assets/css/reset.styl');
@import url('./assets/css/animate.css')
*{
  -webkit-tap-highlight-color:rgba(0,0,0,0);
}
html
  margin 0 auto
#app {
  margin 0 auto
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.slide-enter-active, .slide-leave
  transition: all .3s ease-in-out
  transform: translate3d(0%, 0, 0);

.slide-enter, .slide-leave-active
  transform: translate3d(100%, 0, 0);
.start-page
  width 100%
  height 100%
  position fixed
  top 0
  left 0
  right 0
  bottom 0
  z-index 9999
  background-color #ffffff
  overflow hidden
  .about-logo-info
    width 100%
    padding 30px 0
    position absolute
    top 50%
    overflow hidden
    transform translateY(-50%)
    .logo-wrapper
        width 200px
        height 200px
        margin 0 auto
        line-height 200px
        text-align center
        color #ffffff
        background-color #954dcc
        border-radius 25px
        font-size 100px
        overflow hidden
    .app-name
        width 100%
        text-align center
        font-size 34px
        color #954dcc
        padding 20px 0

</style>
