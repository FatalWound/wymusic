<template>
  <div class="player">
  <!-- <div class="player" v-bind:style="{background:'url('+current_poster+') no-repeat #333'}"> -->
    <div class="play-header">
      <div class="player-back" @click='back()'>
        <!-- <i class="fa fa-reply" aria-hidden="true"></i> -->
        <i class="fa fa-angle-left" aria-hidden="true"></i>
      </div>
      <div class="song-name-detail">
        <div class="name">{{current_song.name}}</div>
        <div class="author">{{current_song.author}}</div>
        <!-- <marquee class="marquee" direction="left" behavior="scroll" scrollamount="2" scrolldelay="0" loop="-1" width="1000" height="50" hspace="2" vspace="2">
        
        </marquee> -->
      </div>
    </div>
    <div class="play-center">
        <swiper :options="swiperOption" ref="mySwiper" class="player-swiper">
          <!-- slides -->
          <swiper-slide>
            <div class="song-dist" :class="[player_status ? 'dist-raote dist-running' : 'dist-raote dist-paused']">
              <img :src="current_song.poster" v-if="current_song.poster && current_song.poster !== ''" alt="mini海报">
              <img src="./poster.png" v-else alt="mini海报">
            </div>
          </swiper-slide>
          <!-- <swiper-slide class="song-word">
            <img :src="current_song.poster" v-if="current_song.poster && current_song.poster !== ''" style="max-width:96%;max-height:100%;" alt="">
          </swiper-slide> -->
          <!-- current-list -->
          <swiper-slide class="player-list">
            <div class="scroll-wrapper" ref="playSongList">
              <transition-group 
                appear
                class="song-list"
                tag="ul"
                name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
                <listItem 
                  v-for="(item,key) in current_list"
                  :key='item.id'
                  :name="((key+1)+' '+item.name)" 
                  :desc="item.author" 
                  :currentId="Number(current_song.id)"
                  :itemId="Number(item.id)"
                  :iconType="Number(1)"
                  @itemClick="songPlay(item)"
                  @itemdelete="deleteItem(item)"
                  />
              </transition-group>
            </div>
          </swiper-slide>
           <!-- current-list -->
          <!-- Optional controls -->
          <div class="swiper-pagination"  slot="pagination"></div>
        </swiper>
        <!-- voice-bar -->
        <div class="voice-wrapper" v-if="openVoice">
          <el-slider class="process-voice" v-model="voice" vertical :min='0' :max="1" :step="0.05" height="200px"> </el-slider>
        </div>
        <!-- voice-bar -->
    </div>
    <div class="play-control">
      <div class="song-info">
        <div class="time-current">{{current_time}}</div>
        <div class="song-process">
          <div class="process-wrapper">
            <el-slider v-model="process" class="process-slider" :max='100' @change="slideBar"></el-slider>
          </div>
        </div>
        <div class="time-all">{{current_duiation}}</div>
      </div>
      <!-- 按钮控制组 -->
      <div class="play-btn">
        <div class="loop" @click="setPlayModel">
          <!-- 0==列表循环播放 1==单曲循环 2==列表顺序播放，但是不循环 -->
          <img class="loop-btn" src="../../assets/svg/xunhuanPlay.svg" v-if="playModel === 0" alt="" />
          <img class="loop-btn" src="../../assets/svg/loop.svg" alt="" v-if="playModel === 1" />
          <!-- <img class="loop-btn" src="../../assets/svg/shunxubofang.svg" v-if="playModel === 2"/> -->
          <!-- <i class="fa fa-random" aria-hidden="true"></i> -->
        </div>
        <div class="normal-control">
          <div class="control-item" @click="Prev">
            <img class="prev-btn" src="../../assets/svg/prev.svg" alt="" srcset=""/>
          </div>
          <div class="control-item" @click="distContorl">
            <img class="p-btn" src="../../assets/svg/bofang_1.svg" alt="" srcset="" v-if="!player_status">
            <img class="p-btn" src="../../assets/svg/mini_pause2.svg" alt="" srcset="" v-else>
          </div>
          <div class="control-item" @click="Next">
            <img class="next-btn" src="../../assets/svg/next.svg" alt="" srcset="">
          </div>
        </div>
        <div class="voice-control" @click="setVoice">
          <transition name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <img class="voice-btn" src="../../assets/svg/volume.svg" v-if=" volume >= 0.5" alt="" srcset=""/>
          </transition>
          <transition name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
            <img class="voice-btn" src="../../assets/svg/volume-min.svg" alt="" srcset="" v-if=" volume < 0.5"/>
          </transition>
        </div>
      </div>
      <!-- 按钮控制组 -->
    </div>
    <!-- 背景图 -->
    <div class="bg-poater">
      <img :src="current_song.poster" v-if="current_song.poster && current_song.poster !== ''" alt="">
      <img src="./poster.png" v-else alt="">
    </div>
  </div>
</template>

<script>
import { mapMutations } from "vuex"
import listItem from "@/components/list-item/list-item2"
import musicUtil from '@/util/musicTool'
import commonApi from '@/axios/request.js'
import api from "@/config/songApi";
import BScroll from "better-scroll";
export default {
  name: 'Player',
  data () {
    return {
      isPlay: true,
      voice:0,
      openVoice: false,
      process:0,
      playModel:0,
      bgUrl:'http://pic29.photophoto.cn/20131231/0005018353077559_b.png',
      swiperOption: {
        autoplay: false,
        loop:false,
        pagination: {
          el: '.swiper-pagination',
        },
      }
    }
  },
  components: {
    listItem
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    theme_color() {
			return this.$store.state.theme.theme_color ? this.$store.state.theme.theme_color : '#954dcc'
		},
    volume(){
      return this.voice
    },
    current_list () {
      return this.$store.state.player.current_list
		},
    current_song () {
      return this.$store.state.player.current_song
    },
    player_status() {
      return this.$store.state.player.player_status ? this.$store.state.player.player_status : false
    },
    current_poster() {
      return this.current_song.poster ? this.current_song.poster : './poster.png'
    },
    current_duiation() {
      return this.$store.state.player.current_duration ? musicUtil.songTimeChangeText(this.$store.state.player.current_duration) : '00:00'
    },
    current_time() {
      return this.$store.state.player.current_time ? musicUtil.songTimeChangeText(this.$store.state.player.current_time)  : '00:00'
    },
    current_process:{
      get () {
        return this.$store.state.player.current_process ? this.$store.state.player.current_process  : 0
      },
      set (val) {
        
      }
    }
  },
  watch:{
    current_process(nv){
      this.process = nv
    },
    voice(nv){
      this.$player.volume = nv
    }
  },
  created(){
    this.voice = this.$player.volume
    this.$nextTick(()=>{
      this._initScroll()
    })
   this.getLyric()
    
  },
  watch:{
    '$route': function (to, from) {
      this.getLyric()
    }
  },
  methods: {
    ...mapMutations(["SET_PLAYER_SATATUS","SET_CURRENT_SONG","SET_CURRENT_LISTS","NEXT","PREV","SET_CURRENT_TIME","SET_CURRENT_PROCESS","SET_IS_LIST_LOOP","REMOVE_FORM_LISTS"]),
    _initScroll() {
      this.playSongList = new BScroll(this.$refs.playSongList,{
        //开启点击事件 默认为false
        click:true
      })
    },
    getLyric(){
       this.$axios.get(`${api.lyric}${this.current_song.id}`).then((response) => {
        console.log(response)
      });
    },
    setPlayModel(e){
      //  0==列表循环播放 1==单曲循环 2==列表顺序播放，但是不循环
      this.playModel  = ++this.playModel
      if(this.playModel > 1){
        this.playModel = 0
      }
      if(this.playModel === 0){
        this.$player.loop = false
        this.SET_IS_LIST_LOOP(true)
        this.$message.info("列表循环播放")
      }else if(this.playModel === 1){
        this.$player.loop = true
        this.SET_IS_LIST_LOOP(false)
        this.$message.info("单曲循环")
      }
    },
    back() {
      this.$router.go(-1);
      // alert('返回')
    },
    toCurrentList(){
      this.swiper.slideTo(3, 1000, false)
    },
    setVoice(){
      this.openVoice = !this.openVoice
    },
    slideBar(nv){
      var toCurrentTime = ((nv/100).toFixed(6)) * this.$player.duration;
      this.$player.currentTime = toCurrentTime
    },
    Prev(){
      this.PREV(this.$player)
    },
    Next() {
      this.NEXT(this.$player)
    },
    songPlay(item){
      commonApi.songPlay(item,this)
      // if(this.current_song.id === item.id){
      //   this.distContorl()
      // }else{
      //   this.SET_CURRENT_SONG(item)
      //   this.$player.src = item.url
      //   this.SET_PLAYER_SATATUS(this.$player.paused)
      // }
    },
    deleteItem(item){
      this.REMOVE_FORM_LISTS(item)
    },
    distContorl(){
      if(this.$player.paused){
        this.$player.play()
        this.SET_PLAYER_SATATUS(!this.$player.paused)
      }else{
        this.$player.pause()
        this.SET_PLAYER_SATATUS(!this.$player.paused)
      }
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
@import url('../../assets/css/reset.styl')
@import url('../../assets/css/animate.styl')
.player
  width 100%
  height 100%
  background-position center
  background-repeat no-repeat
  background-size 100% 100%
  position fixed
  overflow hidden
  &:after
    content ''
    display block
    width 100%
    height 100%
    position absolute
    top 0
    left 0
    background-color rgba(0,0,0,0.25)
  .play-header
    width 100%
    height 100px
    line-height 100px
    text-align center
    box-sizing border-box
    padding 0 70px
    position relative
    z-index 2
    .player-back
      width 80px
      height 100px
      line-height 100px
      text-align center
      font-size 38px
      color #fff
      position absolute
      top 0
      left 0
      text-shadow 2px 2px 5px #954dcc
    .song-name-detail
      width 100%
      height 100%
      line-height 0
      font-size 16px
      box-sizing border-box
      overflow hidden
      .name
        color #fff
        font-size 28px
        height 28px
        line-height 28px
        text-align center
        text-shadow 2px 2px #954dcc
        margin-top 25px
        overflow hidden
      .author
        color #dddddd
        font-size 20px
        height 24px
        line-height 24px
        text-align center
        margin-top 15px
        overflow hidden
      .marquee
        margin 0
        padding 0
        width 100%
        height 100%
  .play-center
    width 100%
    position absolute
    top 100px
    bottom 230px
    left 0
    right 0
    overflow hidden
    z-index 2
    .voice-wrapper
      width 80px
      height 100%
      position absolute
      bottom 0
      right 0
      text-align center
      overflow hidden
      z-index 20
      .process-voice
        position absolute
        right 36px
        bottom 20px
        width 30px
    .player-swiper
      width 100%
      height 100%
      & > swiper-slide
        width 100%
        height 100%
      & > .swiper-pagination-bullet-active
            width 12px
            transition width 0.5s
            background #fff
    .song-dist
      width 440px
      height 440px
      box-sizing border-box
      border-radius 50%
      margin 0 auto
      border 60px solid #000
      // border 60px solid #954dcc
      box-shadow 2px 2px 10px #954dcc
      position relative
      top 50%
      margin-top -220px
      overflow hidden
      & img 
        // max-width 100%
        max-height 100%
      &.dist-raote
        animation miniroate 4s linear infinite
      &.dist-running
        animation-play-state running
      &.dist-paused
        animation-play-state paused
    .song-word
      text-align center
      color #ddd
    .player-list
      overflow auto
      .scroll-wrapper
        width 100%
        height 100%
        overflow auto
      .song-list
        width 100%
        & > li
          width 100%
          box-sizing border-box
          padding 0 5px
          position relative
          cursor pointer
          .song-item
            width 100%
            height 100px
            // border-top 1px solid #d2d2d2
            display flex
            position relative
            .item-icon
              flex 0 0 80px
              width 80px
              height 100%
              line-height 100px
              text-align center 
              font-size 42px
              color #954DCC
            .item-desc
              flex 1
              height 100px
              box-sizing border-box
              padding-left 10px
              padding-right 85px
              overflow hidden
              position relative
              .song-name
                width 100%
                height 35px
                line-height 35px
                font-size 24px
                color #ffffff
                text-align left
                margin-top 12px
                overflow hidden
              .song-desc
                width 100%
                height 35px
                line-height 35px
                font-size 20px
                color #ddd
                text-align left
                margin-top 8px
                overflow hidden
            .song-play
                width 80px
                line-height 100px
                text-align center 
                font-size 42px
                color #ddd
                position absolute
                top 0
                right 0
                bottom 0
  .play-control
    width 100%
    height 230px
    position absolute
    bottom 0
    left 0
    right 0
    overflow hidden
    z-index 2
    .song-info
      width 90%
      margin 15px auto 0 auto
      height 50px
      line-height 50px;
      position relative
      text-shadow 2px 2px 12px #ddd
      .time-current
        width 70px
        height 100%
        position absolute
        top 0
        left 0
        font-size 24px
        word-spacing 6px
        text-align center
        color #fff
      .song-process
        width 100%
        height 100%
        box-sizing border-box
        padding 0 80px
        text-align center
        overflow hidden
        .process-wrapper
          padding 0 20px
          margin 0 auto
          text-align center
          height 100%
          overflow hidden
        .process-slider
          width 100%
          margin 0 auto
          margin-top 5px
      .time-all
        width 70px
        height 100%
        position absolute
        top 0
        right 0
        font-size 24px
        word-spacing 6px
        text-align center
        color #fff
    // 按钮控制
    .play-btn
      width 100%
      margin 0 auto
      margin-top 35px
      height 100px
      line-height 100px
      position relative
      text-shadow 2px 2px 10px #ddd
      .loop
        width 100px
        height 100%
        text-align center
        font-size 26px
        color #fff
        position absolute
        top 0
        left 0
        overflow hidden
        .loop-btn
          width 50%
          height 50%
          margin-top 20%
      .normal-control
        display flex
        width 100%
        height 100%
        box-sizing border-box
        padding 0 100px
        overflow hidden
        text-align center
        font-size 34px
        color #fff
        & .control-item
          flex 1
          text-align center 
          overflow hidden
          .p-btn
            width 90%
            height 90%
            transition all 0.5s linear
          .next-btn
            width 50%
            height 50%
            margin-top 15%
          .prev-btn
            width 50%
            height 50%
            margin-top 15%
        .play
          font-size 42px
          font-weight normal
      .voice-control
        width 100px
        height 100%
        text-align center
        font-size 26px
        color #fff
        position absolute
        top 0
        right 0
        overflow hidden
        .voice-btn
          width 50%
          height 50%
          margin-top 20%
  .bg-poater
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    width 100%
    height 100%
    filter: blur(20px)
    img 
      display block
      max-width 100%
      height 100%
</style>
<style lang="stylus">
.player
  .el-slider__runway
    .el-slider__bar
      background-color #954dcc
  .swiper-container.player-swiper
    height 100%
    box-sizing border-box
    padding-bottom 30px
    .swiper-pagination
      bottom 0px
      .swiper-pagination-bullet
        transition all 0.5s linear 
      .swiper-pagination-bullet.swiper-pagination-bullet-active
        width 14px
        
</style>
