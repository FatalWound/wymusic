<template>
  <div class="home">
    <keep-alive include="Head">
      <mHead :title="title"/>
    </keep-alive>
    <!-- 歌单 -->
    <div class="scroll" ref="sheetPage" v-loading.body="loading">
      <div class="scroll-wrapper">
        <el-row>
          <el-col :span="24">
            <ul class="song-sheet">
                 <Sheet 
                v-for="(item, key) in songSheets" 
                :key='(item.id+1+key*2)'
                 :name="item.name" 
                 :imgUrl="item.coverImgUrl"
                 :playCounts="item.playCount"
                 @itemClick="songSheet(item)" />
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
import Sheet from "@/components/song-sheet/song-sheet"
import BScroll from "better-scroll"
import api from "@/config/songApi"
import { mapMutations } from "vuex"
export default {
  name: 'Raking',
  data () {
    return {
      loading:true,
      songSheets:[],
      title:'排行榜'
    }
  },
  components: {
    mHead,Sheet
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
    this.title = '排行榜'
      this.$axios.get(api.toplistAll)
      .then((response) => {
        response.data.list.forEach((ele,index) => {
          if(ele.playCount>10000){
            ele.playCount = (ele.playCount/10000).toFixed(2) +"万"
          }
            this.songSheets.push(ele);
            this.loading = false
        });
        this.sheetPage.refresh()
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
  }
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
</style>
