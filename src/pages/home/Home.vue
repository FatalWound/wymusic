<template>
  <div class="home" ref="main">
    <keep-alive include="Head">
      <mHead :title="'FW音乐站'"/>
    </keep-alive>
    <!-- <div class="scroll" ref="home" :class="[player_status ?'active':'']"> -->
    <div class="scroll" ref="home">
      <div class="scroll-wrapper" >
        <section class="search" @click="toSearch">
          <div class="item" :style="{'border-color':theme_color}">搜索
            <i class="fa fa-search" :style="{'border-color':theme_color,'background-color':theme_color}"></i>
          </div>
        </section>
       <!-- silder -->
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
        <!-- silder -->
        <!-- 热门歌手 -->
        <el-row v-if="songSheets.length>0">
          <el-col :span="24">
            <h3 class="section-title" :style="{color:theme_color}">热门歌手</h3>
              <transition-group 
                appear
                class="songer-sheet"
                tag="ul"
                name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="">
                <songerSheet 
                  v-for="(item, key) in hotSongers" 
                 :key='(item.id+1)'
                 :name="item.name" 
                 :imgUrl="item.picUrl"
                  @itemClick="songerSheet(item)"/>
              </transition-group>
          </el-col>
          <el-col :span="24">
            <div class="more-sheet" @click="moreSonger()" :style="{'border-color':theme_color,color:theme_color}">更多歌手</div>
          </el-col>
        </el-row>
        <!-- 热门歌手 -->
        <!-- 歌单 -->
        <el-row v-if="songSheets.length>0">
          <el-col :span="24">
            <h3 class="section-title" :style="{color:theme_color}">推荐歌单</h3>
              <transition-group 
                appear
                class="song-sheet"
                tag="ul"
                name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="">
                 <Sheet 
                 v-for="(item, key) in songSheets" 
                 :key='(item.id+1+key)'
                 :name="item.name" 
                 :imgUrl="item.picUrl"
                 :playCounts="item.playCount | counts"
                 @itemClick="songSheet(item)" />
              </transition-group>
          </el-col>
          <el-col :span="24">
            <div class="more-sheet" @click="moreList()" :style="{'border-color':theme_color,color:theme_color}">更多歌单</div>
          </el-col>
        </el-row>
        <!-- 歌单 -->
        <!-- 排行榜 -->
        <el-row v-if="toplistSheets.length>0">
          <el-col :span="24">
            <h3 class="section-title" :style="{color:theme_color}">榜单摘要</h3>
              <transition-group 
                appear
                class="song-sheet"
                tag="ul"
                name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="">
                <Sheet 
                v-for="(item, key) in toplistSheets" 
                :key='(item.id+1+key)'
                 :name="item.name" 
                 :imgUrl="item.coverImgUrl"
                 :playCounts="item.playCount"
                 @itemClick="songSheet(item)" />
              </transition-group>
          </el-col>
          <el-col :span="24">
            <div class="more-sheet" @click="moreTopList()" :style="{'border-color':theme_color,color:theme_color}">更多榜单</div>
          </el-col>
        </el-row>
        <!-- 排行榜 -->
        <!-- 新歌 -->
        <el-row v-if="newSongs.length>0">
          <el-col :span="24">
            <h3 class="section-title" :style="{'border-color':theme_color,color:theme_color}">云音乐赞赏榜</h3>
              <transition-group 
                appear
                class="song-list"
                tag="ul"
                name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="">
                  <listItem 
                  v-for="(item,key) in newSongs" 
                  :key='(item.id+1+key)'
                  :name="((key+1)+' '+item.name)" 
                  :desc="item.artists | conutArtist" 
                  :currentId="Number(current_song.id)"
                  :itemId="Number(item.id)"
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
import mHead from "@/components/head/Head";
import listItem from "@/components/list-item/list-item";
import Sheet from "@/components/song-sheet/song-sheet";
import songerSheet from "@/components/song-sheet/songer-sheet";
import commonApi from "@/axios/request";
import api from "@/config/songApi";
import musicUtil from "@/util/musicTool";
import { mapMutations, mapActions } from "vuex";
import BScroll from "better-scroll";
export default {
  name: "Home",
  data() {
    return {
      banners: [],
      hotSongers:[],
      songSheets: [],
      toplistSheets: [],
      newSongs: [],
      swiperOption: {
        autoplay: true,
        speed: 1000,
        loop: true,
        pagination: {
          el: ".swiper-pagination"
        }
      }
    };
  },
  components: {
    mHead,
    listItem,
    Sheet,
    songerSheet
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.swiper;
    },
    theme_color() {
      return this.$store.state.theme.theme_color
        ? this.$store.state.theme.theme_color
        : "#954dcc";
    },
    player_status() {
      return this.$store.state.player.player_status
        ? this.$store.state.player.player_status
        : false;
    },
    current_song() {
      return this.$store.state.player.current_song;
    },
    current_list() {
      return this.$store.state.player.current_list;
    }
  },
  filters:{
    counts(val){
      return (val / 10000).toFixed(2) + "万";
    },
    conutArtist(val){
      let arr = []
      val.forEach((item,key)=>{
        arr.push(item.name)
      })
      return arr.join(' / ')
    }
  },
  created() {
    const that = this;
    // this.swiper.slideTo(3, 1000, false)
    this.$axios.get(api.banner).then((response) => {
      that.banners = response.data.banners;
      that.swiper.update();
    });
    // 推荐歌单
    this.$axios.get(api.personalized).then((response) => {

      // 裁剪，只需要6条信息
      response.data.result.forEach((ele, index) => {
        if (index < 6) {
          that.songSheets.push(ele);
        }
      });
    });
    // 摘要榜单
    this.$axios.get(api.toplistAllDetail).then((response) => {
      // 裁剪，只需要15条信息
      response.data.list.forEach((ele, index) => {
        if (index < 6) {
          // that.newSongs.push(ele);
          that.toplistSheets.push(ele);
        }
      });
       that.newSongs = response.data.rewardToplist.songs
    });
    this.$axios.get(`${api.hotArtists}?offset=0&limit=8`).then((response) => {
      // 裁剪，只需要15条信息
      response.data.artists.forEach((ele, index) => {
        if (index < 15) {
          that.hotSongers.push(ele);
        }
      });
      
    });
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  mounted() {},
  methods: {
    ...mapMutations([
      "SET_CURRENT_SONG",
      "PUSH_CURRENT_LISTS",
      "SET_PLAYER_SATATUS",
      "PLAY",
      "SET_THEME_COLOR",
      "RESET"
    ]),
    ...mapActions(["A_PLAY"]),
    _initScroll() {
      this.homePage = new BScroll(this.$refs.home, {
        //开启点击事件 默认为false
        click: true
      });
    },
    swiperItem(item) {
      console.log(item);
    },
    songSheet(item) {
      this.$router.push({
        path: "/play-list-detail",
        query: { id: item.id,date: new Date().getTime() }
      });
    },
    songerSheet(item){
      this.$router.push({
        path: "/songer-detail",
        query: { id: item.id,date: new Date().getTime() }
      });
    },
    topList(item){
      this.$router.push({
        path: "/play-list-detail",
        query: { id: item.id, date: new Date().getTime() }
      });
    },
    moreTopList(){
      this.$router.push({path: "/raking"});
    },
    moreList() {
      this.$router.push({ path: "/song-sheet"});
    },
    moreSonger(){
      this.$router.push({ path: "/songer"});
    },
    songPlay(item) {
      commonApi.songPlay(item, this);
    },
    distContorl() {
      if (this.$player.paused) {
        this.$player.play();
        this.SET_PLAYER_SATATUS(!this.$player.paused);
      } else {
        this.$player.pause();
        this.SET_PLAYER_SATATUS(!this.$player.paused);
      }
    },
    toSearch() {
      this.$router.push({ path: "/search" });
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
@import url('../../assets/css/animate.css');
.home {
  width: 100%;
  margin: 0 auto;
  max-height: 100%;
  .scroll {
    width: 100%;
    margin: 0 auto;
    position: fixed;
    top: 75px;
    left: 0;
    right: 0;
    bottom: 100px;
    overflow: hidden;

    .scroll-wrapper {
      overflow: hidden;
    }
  }
}

.search {
  width: 100%;
  box-sizing: border-box;
  overflow: hidden;
  padding: 15px 18px;
  overflow: hidden;

  .item {
    height: 60px;
    line-height: 60px;
    padding: 0 20px;
    color: #333;
    font-size: 26px;
    box-sizing: border-box;
    border: 1px solid #954dcc;
    border-radius: 15px;
    position: relative;
    overflow: hidden;

    .fa-search {
      width: 100px;
      height: 60px;
      color: #ffffff;
      font-size: 30px;
      text-align: center;
      line-height: 60px;
      position: absolute;
      top: 0px;
      right: 0px;
      overflow: hidden;
    }
  }
}
// .border-radius{
//   border-radius:100%
// }

.stylus {
  color: #451378;
  font-size: 20px;
}

.home-swiper {
  width: 100%;
  margin: 0 auto;
  text-align: center;

  .swiper-slide {
    width: 100%;
    min-height: 280px;
    overflow: hidden;

    img {
      max-width: 100%;
    }
  }
}

.songer-sheet{
  width 100%
  box-sizing border-box
  list-style none
  font-size 0
  overflow hidden
  padding 5px 0
}

.section-title {
  width: 100%;
  height: 80px;
  line-height: 80px;
  font-size: 26px;
  color: #954DCC;
  text-align: left;
  text-indent: 10px;
  overflow: hidden;
}


.more-sheet {
  width: 180px;
  height: 50px;
  line-height: 50px;
  text-align: center;
  font-size: 26px;
  color: #954dcc;
  margin: 15px auto;
  border: 1px solid #954dcc;
  border-radius: 15px;
}

.song-list {
  width: 100%;
}

.homeactive {
  width: 600px;
}
</style>
