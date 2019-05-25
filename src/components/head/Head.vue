<template>
  <div class="head-wrapper">
    <div class="head" :style="{'background-color':theme_color}">
      <div class="fw-back" v-if="hideBack" @click="commonBack()">
        <!-- <i class="fa fa-reply" aria-hidden="true"></i> -->
        <i class="fa fa-angle-left" aria-hidden="true"></i>
      </div>
      <div class="head-content">
        <!-- <i class="fa fa-html5" aria-hidden="true"></i>  -->
        <span v-html="title"></span>
      </div>
      <div class="head-menu" @click="home()" :class="[sideBarToggle?'active':'']">
         <img src="../../assets/svg/menu.svg" alt="" srcset="">
      </div>
    </div>
    <div class="top-block"></div>
  </div>
</template>

<script>
import { mapMutations } from "vuex"
export default {
  name: 'Head',
  data () {
    return {
      hideBack: true
    }
  },
  props:['title'],
  components: {
    
  },
  computed: {
    theme_color() {
      return this.$store.state.theme.theme_color ? this.$store.state.theme.theme_color : '#954dcc'
    },
    sideBarToggle() {
      return this.$store.state.sidebar.isOpen ? this.$store.state.sidebar.isOpen : false
    }
  },
  mounted() {
  },
  created(){
    if(this.$router.history.current.name === 'Home'){
      this.hideBack = false
    }else{
      this.hideBack = true
    }
  },
  methods: {
    ...mapMutations(["TOGGLE_SIDEBAR"]),
    commonBack(){
      this.$router.go(-1);
    },
    home(){
      // this.$router.push({path:'/'})
      this.TOGGLE_SIDEBAR()
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
.head
  width 100%
  margin 0 auto
  height 75px
  line-height 75px
  background-color #954DCC
  box-sizing border-box
  position fixed
  top 0
  left 0
  right 0
  box-shadow 2px 2px 12px #954DCC
  z-index 666
  .fw-back
    width 70px
    height 100%
    text-align center
    font-size 38px
    color #fff
    position absolute
    top 0
    left 0
    img 
      width 80%
      height 80%
  .head-content
    width 100%
    height 100%
    font-size 28px
    color #fff
    word-spacing 10px
    text-align center
    box-sizing border-box
    padding 0 70px
  .head-menu
    width 70px
    height 100%
    text-align center
    line-height 75px
    font-size 35px
    color #fff
    position absolute
    top 0
    right 0
    transition transform 0.5s linear
    img 
      width 50%
      height 50%
      color #ffffff
      margin-top 25%
  .active
    transform rotate3d(0,0,1,45deg)
.top-block
  width 100%
  height 75px
</style>
