<template>
  <div class="home" ref="main">
    <keep-alive include="Head">
      <mHead :title="'FW音乐站'"/>
    </keep-alive>
    <!-- <div class="scroll" ref="home" :class="[player_status ?'active':'']"> -->
    <div class="scroll" ref="home" >
      <div class="scroll-wrapper" >
        <section class="search" @click="toSearch">
          <div class="item" :style="{'border-color':theme_color}">搜索
            <i class="fa fa-search" :style="{'border-color':theme_color,'background-color':theme_color}"></i>
          </div>
        </section>
       <!-- silder -->
       <transition name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" mode="out-in">
        <el-row v-if="banners.length > 0">
          <el-col :span="24">
            <swiper :options="swiperOption" ref="mySwiper" class="home-swiper">
              <!-- slides -->
              <swiper-slide v-for="(item, key) in banners" :key='key' @click="swiperItem(item)"><img :src="item.picUrl" alt="item.url" srcset=""></swiper-slide>
              <!-- Optional controls -->
              <div class="swiper-pagination"  slot="pagination"></div>
            </swiper>
          </el-col>
        </el-row>
       </transition>
        <!-- silder -->
        <!-- 歌单 -->
        <el-row>
          <el-col :span="24">
            <h3 class="section-title" :style="{color:theme_color}">推荐歌单</h3>
              <transition-group 
                appear
                class="song-sheet"
                tag="ul"
                name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="">
                <li  v-for="(item, key) in songSheets" :key='(item.id+1)'>
                  <div class="sheet-item" @click="songSheet(item)">
                    <div class="sheet-img">
                      <img :src="item.picUrl" alt="" srcset="">
                      <span class="play-count">
                        <i class="fa fa-headphones" aria-hidden="true"></i>
                        {{item.playCount}}次
                      </span>
                    </div>
                    <div class="sheet-name">
                      {{item.name}}
                    </div>
                  </div>
                </li>
              </transition-group>
          </el-col>
          <el-col :span="24">
            <div class="more-sheet" @click="moreSheet" :style="{'border-color':theme_color,color:theme_color}">更多歌单</div>
          </el-col>
        </el-row>
        <!-- 歌单 -->
        <!-- 新歌 -->
        <el-row>
          <el-col :span="24">
            <h3 class="section-title" :style="{'border-color':theme_color,color:theme_color}">最新音乐</h3>
              <transition-group 
                appear
                class="song-list"
                tag="ul"
                name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="">
                  <listItem 
                  v-for="(item,key) in newSongs" 
                  :key='(item.song.id+1)'
                  :name="((key+1)+' '+item.name)" 
                  :desc="item.song.album.name" 
                  :currentId="Number(current_song.id)"
                  :itemId="Number(item.song.id)"
                  :iconType="Number(1)"
                  @itemClick="songPlay(item)"/>
              </transition-group>
          </el-col>
        </el-row>
        <!-- 新歌 -->
      </div>
    </div>
  </div>
</template>

<script>
import mHead from '@/components/head/Head'
import listItem from "@/components/list-item/list-item"
import commonApi from '@/axios/request'
import musicUtil from '@/util/musicTool'
import { mapMutations, mapActions } from "vuex"
import BScroll from "better-scroll"
export default {
  name: 'Home',
  data () {
    return {
      banners:[],
      songSheets:[],
      newSongs:[],
      swiperOption: {
        autoplay: true,
        speed: 1000,
        loop:true,
        pagination: {
          el: '.swiper-pagination',
        },
      }
    }
  },
  components: {
    mHead,listItem
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper
    },
    theme_color() {
      return this.$store.state.theme.theme_color ? this.$store.state.theme.theme_color : '#954dcc'
    },
    player_status() {
      return this.$store.state.player.player_status ? this.$store.state.player.player_status : false
    },
    current_song () {
      return this.$store.state.player.current_song
    },
    current_list () {
      return this.$store.state.player.current_list
    }
  },
  created() {
    const that = this;
    // this.swiper.slideTo(3, 1000, false)
    this.$axios.get('/banner')
    .then(function (response) {
      that.banners =  response.data.banners;
      that.swiper.update()
    })
    this.$axios.get('/personalized')
    .then(function (response) {
      // 裁剪，只需要6条信息
      response.data.result.forEach((ele,index) => {
        if(index < 6){
          if(ele.playCount>10000){
             ele.playCount = (ele.playCount/10000).toFixed(2) +"万"
          }
           that.songSheets.push(ele);
        }
      });
    })
    this.$axios.get('/personalized/newsong')
    .then(function (response) {
      // 裁剪，只需要15条信息
      response.data.result.forEach((ele,index) => {
        if(index < 15){
          that.newSongs.push(ele);
        }
      });
    })
    this.$nextTick(()=>{
      this._initScroll()
    })
  },
  mounted() {
    
  },
  methods: {
    ...mapMutations(["SET_CURRENT_SONG","PUSH_CURRENT_LISTS","SET_PLAYER_SATATUS","PLAY","SET_THEME_COLOR","RESET"]),
    ...mapActions(['A_PLAY']),
    _initScroll() {
      this.homePage = new BScroll(this.$refs.home,{
        //开启点击事件 默认为false
        click:true
      })
    },
    swiperItem(item){
      console.log(item)
    },
    songSheet(item) {
      this.$router.push({ path: '/play-list-detail', query: { id:item.id ,date:new Date().getTime()}})
    },
    moreSheet(){
      this.$router.push({ path: '/song-sheet'})
    },
    songPlay(item){
      commonApi.songPlay(item,this)
    },
    distContorl(){
      if(this.$player.paused){
        this.$player.play()
        this.SET_PLAYER_SATATUS(!this.$player.paused)
      }else{
        this.$player.pause()
        this.SET_PLAYER_SATATUS(!this.$player.paused)
      }
      
    },
    toSearch(){
      this.$router.push({path:'/search'})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
@import url('../../assets/css/animate.css')
.home
  width 100%
  margin 0 auto
  max-height 100%
  .scroll
    width 100%
    margin 0 auto
    position fixed
    top 75px
    left 0
    right 0
    bottom 100px
    overflow hidden
    .scroll-wrapper
      overflow hidden 
.search
  width 100%
  box-sizing border-box
  overflow hidden
  padding 15px 18px
  overflow hidden
  .item
    height 60px
    line-height 60px
    padding 0 20px
    color #333
    font-size 26px
    box-sizing border-box
    border 1px solid #954dcc
    border-radius 15px
    position relative
    overflow hidden
    .fa-search
      width 100px
      height 60px
      color #ffffff
      font-size 30px
      text-align center
      line-height 60px
      position absolute
      top 0px
      right 0px
      overflow hidden
.stylus
  color #451378
  font-size 20px
.home-swiper
  width 100%
  margin 0 auto
  text-align center
  .swiper-slide
    width 100%
    min-height 280px
    overflow hidden
    img 
      max-width 100%
.section-title
  width 100%
  height 80px
  line-height 80px
  font-size 26px
  color #954DCC
  text-align left 
  text-indent 10px
  overflow hidden
.song-sheet
  width 100%
  box-sizing border-box
  list-style none
  font-size 0
  overflow hidden
  box-sizing border-box
  & li
    width 33.33%
    box-sizing border-box
    padding 5px
    float left
    .sheet-item
      width 100%
      height 260px
      overflow hidden
      box-sizing border-box
      .sheet-img
        display block
        width 100%
        height 200px
        overflow hidden
        background-color #ddd
        position relative
        .play-count
          position absolute
          bottom 5px
          right 5px
          font-size 24px
          color #ffffff
        img 
          max-width 100%
      .sheet-name
        width 100%
        height 60px
        line-height 28px
        overflow hidden
        color #000000
        font-size 20px
        text-align left 
        margin-top 5px
.more-sheet
  width 180px
  height 50px
  line-height 50px
  text-align center 
  font-size 26px
  color #954dcc
  margin 15px auto 
  border 1px solid #954dcc
  border-radius 15px
.song-list
  width 100%
  & > li
    width 100%
    box-sizing border-box
    padding 0 5px
    position relative
    .song-item
      width 100%
      height 100px
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
        border-bottom 1px solid #ddd
        // &:before
        //   display block
        //   content ''
        //   width 100%
        //   height 1px
        //   transform scaleY(0.5)
        //   position absolute
        //   top 0
        //   left 0
        //   background-color #ddd
        .song-name
          width 100%
          height 35px
          line-height 35px
          font-size 26px
          color #000000
          text-align left
          margin-top 12px
          overflow hidden
        .song-desc
          width 100%
          height 35px
          line-height 35px
          font-size 18px
          color #ccc
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
.homeactive
  width 600px
</style>
