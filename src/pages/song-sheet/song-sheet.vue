<template>
  <div class="home">
    <keep-alive include="Head">
      <mHead :title="'更多推荐歌单'"/>
    </keep-alive>
    <!-- 歌单 -->
    <div class="scroll" ref="sheetPage" >
      <div class="scroll-wrapper">
        <el-row>
          <el-col :span="24">
            <ul class="song-sheet">
              <li  v-for="(item,key) in songSheets" :key='key'>
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
            </ul>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 歌单 -->
  </div>
</template>

<script>
import mHead from '@/components/head/Head'
import BScroll from "better-scroll"
import { mapMutations } from "vuex"
export default {
  name: 'Home',
  data () {
    return {
      songSheets:[]
    }
  },
  components: {
    mHead
  },
  computed: {
    current_song () {
      return this.$store.state.player.current_song
    },
    current_list () {
      return this.$store.state.player.current_list
    }
  },
  created() {
    const that = this;
    this.$axios.get('/personalized')
    .then(function (response) {
      response.data.result.forEach((ele,index) => {
        if(ele.playCount>10000){
          ele.playCount = (ele.playCount/10000).toFixed(2) +"万"
        }
          that.songSheets.push(ele);
          that.sheetPage.refresh()
      });
    })
    this.$nextTick(()=>{
      this._initScroll()
    })
  },
  mounted() {},
  methods: {
    ...mapMutations(["SET_CURRENT_SONG","PUSH_CURRENT_LISTS","SET_PLAYER_SATATUS"]),
    _initScroll() {
      this.sheetPage = new BScroll(this.$refs.sheetPage,{
        //开启点击事件 默认为false
        click:true
      })
    },
    songSheet(item) {
      this.$router.push({ path: '/play-list-detail', query: { id:item.id ,date:new Date().getTime()}})
    }
  },
  beforeUpdate(){}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
@import url('../../assets/css/reset.styl');
.home
  width 100%
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
  .song-sheet
      width 100%
      box-sizing border-box
      list-style none
      font-size 0
      overflow hidden
      padding 5px 0
      & li
          width 200px
          float left
          margin-left 10px
          // height 200px
          margin-bottom 10px
          .sheet-item
              width 200px
              height 260px
              overflow hidden
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
</style>
