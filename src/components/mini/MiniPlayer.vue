<template>
  <div class="mini-player-wrapper">
    <div class="mini-player" :style="{'background-color':theme_color}">
      <div class="mini-img" :style="{'background-color':theme_color}" :class="[player_status ? 'mini-raote mini-running' : 'mini-raote mini-paused']" @click="playerPage()">
        <img :src="current_song.poster" v-if="current_song.poster && current_song.poster !== ''" alt="mini海报">
        <img src="./logo.jpg" v-else alt="mini海报">
      </div>
      <!-- <div class="svg-process-wrapper" @click="playerPage()">
        <svg width="100%" height="100%" class="svg-process" >
          <circle cx="35" cy="35" r="29" stroke="#dcdcdc" stroke-width="1" fill="none" />
          <circle cx="35" cy="35" r="29" stroke="#fff" stroke-width="2" fill="none" :stroke-dasharray='circle_process.end'>
              <animate attributeName="stroke-dasharray" :from="circle_process.start" :to="circle_process.end" dur="1s"/>
              <animate attributeName="stroke" from="#ff0000" to="#53d74c" dur="1s" />
          </circle>
        </svg>
      </div> -->
      <div class="mini-process" @click="playerPage()">
        <div class="mini-name">
          <div class="name">{{current_song.name}}</div>
          <div class="author">{{current_song.author}}</div>
        </div>
      </div>
      <div class="min-process-bar">
        <processBar :process="current_process" />
      </div>
      <div class="min-control">
        <div class="play-box" @click="miniplay">
          <img class="play-btn" src="../../assets/svg/bofang_1.svg" alt="" srcset="" v-if="!player_status">
          <img class="play-btn" src="../../assets/svg/mini_pause2.svg" alt="" srcset="" v-else>
          <!-- <i class="fa" :class="[player_status ? 'fa-pause' : 'fa-play']" aria-hidden="true"></i>  -->
        </div>
        <div class="next-box" @click="miniNext">
          <!-- <i class="fa fa-step-forward" aria-hidden="true"></i> -->
          <img class="next-btn" src="../../assets/svg/next.svg" alt="" srcset="">
        </div>
      </div>
    </div>
    <!-- <div class="bottom-block" ></div> -->
  </div>
</template>

<script>
import { mapMutations } from "vuex"
import musicUtil from '@/util/musicTool'
import processBar from '@/components/process-bar/process-bar'
export default {
  name: 'MiniPlayer',
  data () {
    return {
    }
  },
  computed: {
    theme_color() {
      return this.$store.state.theme.theme_color ? this.$store.state.theme.theme_color : '#954dcc'
    },
    current_song() {
      return this.$store.state.player.current_song
    },
    player_status() {
      return this.$store.state.player.player_status ? this.$store.state.player.player_status : false
    },
    circle_process:{
      get () {
        //计算周长
        let num = this.$store.state.player.current_process ? this.$store.state.player.current_process  : 0
        var line = 2 * Math.PI * 29
        return {
            //stork-dasharray有两个参数，第一个代表虚线的宽度，第二个代表虚线两两的间隔
            start: '0,' + line,//开始状态
            end: line * (num / 100) + ',' + line * ((100 - num) / 100)//结束状态
        }
      }
    },
    current_process:{
      get () {
        return this.$store.state.player.current_process ? this.$store.state.player.current_process  : 0
      },
      set (val) {
        this.SET_CURRENT_TIME(val)
        this.SET_CURRENT_PROCESS(musicUtil.processBar(this.$player))
      }
    }
  },
  components:{
    processBar
  },
  mounted() {

  },
  created(){},
  watch: {
  },
  methods: {
    ...mapMutations(["SET_PLAYER_SATATUS","NEXT","SET_CURRENT_TIME","SET_CURRENT_PROCESS"]),
    miniplay() {
      if(this.$player.paused){
        this.$player.play()
        this.SET_PLAYER_SATATUS(!this.$player.paused)
      }else{
        this.$player.pause()
        this.SET_PLAYER_SATATUS(!this.$player.paused)
      }
    },
    miniNext() {
      this.NEXT(this.$player)
    },
    playerPage() {
      this.$router.push({  //核心语句
        path:'/player',   //跳转的路径
        query:{}
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
@import url('../../assets/css/animate.styl')
.mini-player-wrapper
  width 100%
  height 100px
  margin 0 auto
  display flex
  position fixed
  bottom 0
  left 0
  right 0
  background-color #303133
  z-index 66
  .min-process-bar
    width 98%
    height 2px
    position absolute
    right 1%
    left 1%
    bottom 3px
    z-index 68
  .mini-player
    width 100%
    height 100%
    margin 0 auto
    display flex
    position relative
    left 0
    right 0
    &:before
      display block
      content ''
      width 100%
      height 1px
      transform scaleY(0.5)
      position absolute
      top 0
      left 0
      background-color #ddd
    .mini-img
      position absolute
      top -12px
      left 5px
      width 110px
      height 110px
      padding 10px
      border-radius 50%
      text-align center
      background-color #303133
      border-radius 100%
      overflow hidden
      z-index 66
      box-sizing border-box
      &.mini-raote
        animation miniroate 4s linear infinite
      &.mini-running
        animation-play-state running
      &.mini-paused
        animation-play-state paused
      img
        width 100%
        height 100%
        border-radius 100%
    .svg-process-wrapper
      position absolute
      top -14px
      left 5px
      width 120px
      height 120px
      z-index 66
      .svg-process
        transform rotate3d(0,0,1,-90deg)
        position absolute
        top 0
        left 0
    .mini-process
      flex 1
      height 100%
      padding-left 130px
      overflow hidden
      .mini-name
        width 95%
        height 70px
        line-height 32px
        margin 22px auto 0 auto
        font-size 26px
        color #fff
        text-align left 
        overflow hidden
        white-space normal
        text-overflow ellipsis
        .name
          width 100%
          height 32px
          line-height 32px
          word-wrap normal
          text-overflow ellipsis
          overflow hidden
        .author
          width 100%
          height 32px
          color #cccccc
          line-height 32px
          white-space normal
          text-overflow ellipsis
          overflow hidden
    .min-control
      flex 0 0 200px
      height 100%
      font-size 0
      position relative
      .play-box,.next-box
        position absolute
        height 100px
        line-height 100px
        text-align center
        font-size 28px
        color #f1f1f1
        overflow hidden
        -webkit-tap-highlight-color tranparent
      .play-box
        width 50%
        font-size 36px
        left 10px
        .play-btn
          width 60%
          height 60%
          margin-left 0
          margin-top 18%
      .next-box
        width 40%
        right 0
        .next-btn
          width 40%
          height 40%
          margin-left 0
          margin-top 35%
  .bottom-block
      width 100%
      height 110px
</style>

