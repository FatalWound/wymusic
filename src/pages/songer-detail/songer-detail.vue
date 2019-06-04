<template>
  <!-- v-bind:style="{background:`url(${songerInfo.artist.picUrl}) top no-repeat 100% 100%`}" -->
  <div class="songer-wrapper" >
    <keep-alive include="Head">
      <mHead :title="'FW音乐站'"/>
    </keep-alive>
    <div class="scroll" ref="songerPage" v-loading.body="loading">
      <div class="scroll-wrapper">
        <section class="songer-info-wrapper">
          <div class="songer-img">
            <img
              :src="songerList.artist.img1v1Url"
              v-if="songerList.artist.img1v1Url && songerList.artist.img1v1Url !== 'undefined'"
            >
          </div>
          <div class="songer-info">
            <div class="sogner-name">{{songerList.artist.name}}</div>
            <div class="sogner-item-desc">
              <div class="item">
                <span>歌曲数量：</span>
                {{songerList.artist.musicSize}} 首
              </div>
              <div class="item">
                <span>专辑数量：</span>
                {{songerList.artist.albumSize}} 张
              </div>
              <div class="item">
                <span>MV数量：</span>
                {{songerList.artist.mvSize}} 部
              </div>
            </div>
          </div>
          <div class="all-song-play" @click="addToList">
            <span v-if="this.$route.query.id !== current_sheet">
              <svg
                class="sheet-play"
                viewBox="0 0 1024 1024"
                version="1.1"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M839.164908 557.578058 240.50216 941.694459c-32.559867 21.048385-76.198502 11.69332-76.198502-19.264762L164.303659 102.006232c0-35.897581 40.684228-38.282908 76.198502-19.23304L839.164908 466.842521C863.815318 491.907383 863.815318 532.528546 839.164908 557.578058zM227.422748 865.160365l568.042125-352.942401L227.422748 159.290913C227.422748 215.621872 227.422748 850.38894 227.422748 865.160365z"
                ></path>
              </svg>
            </span>
            <span v-else>
              <svg
                class="sheet-play-active"
                version="1.1"
                id="Layer_1"
                xmlns="http://www.w3.org/2000/svg"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                x="0px"
                y="0px"
                viewBox="0 0 24 30"
                style="enable-background:new 0 0 50 50;"
                xml:space="preserve"
              >
                <rect x="0" y="13" width="2" height="5" :fill="theme_color">
                  <animate
                    attributeName="height"
                    attributeType="XML"
                    values="5;21;5"
                    begin="0s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  ></animate>
                  <animate
                    attributeName="y"
                    attributeType="XML"
                    values="13; 5; 13"
                    begin="0s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  ></animate>
                </rect>
                <rect x="10" y="13" width="2" height="5" :fill="theme_color">
                  <animate
                    attributeName="height"
                    attributeType="XML"
                    values="5;21;5"
                    begin="0.15s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  ></animate>
                  <animate
                    attributeName="y"
                    attributeType="XML"
                    values="13; 5; 13"
                    begin="0.15s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  ></animate>
                </rect>
                <rect x="20" y="13" width="2" height="5" :fill="theme_color">
                  <animate
                    attributeName="height"
                    attributeType="XML"
                    values="5;21;5"
                    begin="0.3s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  ></animate>
                  <animate
                    attributeName="y"
                    attributeType="XML"
                    values="13; 5; 13"
                    begin="0.3s"
                    dur="0.6s"
                    repeatCount="indefinite"
                  ></animate>
                </rect>
              </svg>
            </span>
          </div>
        </section>
        <section class="tab">
          <div
            class="tab-item"
            :style="{backgroundColor:(whichPanel === 0?theme_color:''),color:(whichPanel === 0?'#fff':'#333')}"
            @click="tab(0)"
          >热门单曲({{songerList.hotSongs.length}})</div>
          <div
            class="tab-item"
            :style="{backgroundColor:(whichPanel === 1?theme_color:''),color:(whichPanel === 1?'#fff':'#333')}"
            @click="tab(1)"
          >热门MV({{songerMv.mvs.length}})</div>
          <div
            class="tab-item"
            :style="{backgroundColor:(whichPanel === 2?theme_color:''),color:(whichPanel === 2?'#fff':'#333')}"
            @click="tab(2)"
          >歌手详情</div>
        </section>
        <section class="tab-panel">
          <div class="panel" v-if="whichPanel === 0">
            <transition-group
              appear
              class="song-list"
              tag="ul"
              name="custom-classes-transition"
              enter-active-class="animated zoomIn faster"
              leave-active-class
            >
              <listItem
                v-for="(item,key) in songerList.hotSongs"
                :key="(item.id+1)"
                :name="((key+1)+' '+item.name)"
                :desc="item.al.name+' / '+item.ar[0].name"
                :currentId="Number(current_song.id)"
                :itemId="Number(item.id)"
                :iconType="Number(1)"
                @itemClick="songPlay(item)"
              />
            </transition-group>
          </div>
          <div class="panel" v-if="whichPanel === 1">
            <ul class="mv-sheet">
              <li class="item" @click="videoPlay" v-for="(item,key) in songerMv.mvs" :key="key">
                <div class="img">
                  <img src="../../assets/svg/bofang_2.svg" class="icon" alt>
                  <img :src="item.imgurl" class="poster" alt>
                  <span class="play-count">
                    <i class="fa fa-play-circle-o" aria-hidden="true"></i>
                    {{item.playCount | counts}}
                  </span>
                </div>
                <div class="name">{{item.name}}</div>
                <div class="publish">{{item.publishTime}}</div>
                <span class="duition">{{item.duration | time}}</span>
              </li>
            </ul>
          </div>
          <div class="panel" v-if="whichPanel === 2">
            <div class="title-name">{{songerList.artist.name}}</div>
            <div class="person-img">
              <img :src="songerList.artist.img1v1Url" alt="">
              <!-- <img :src="songerList.artist.picUrl" alt=""> -->
            </div>
            <div class="songer-brief-desc">{{songerInfo.briefDesc}}</div>
            <div class="instrution">
              <ul class="info-list">
                <li class="list-item" v-for="(item,key) in songerInfo.introduction" :key="key">
                  <div class="title">{{item.ti}}</div>
                  <div class="content">{{item.txt}}</div>
                </li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>
<script>
import mHead from "@/components/head/Head";
import listItem from "@/components/list-item/list-item";
import commonApi from "@/axios/request";
import api from "@/config/songApi";
import musicUtil from "@/util/musicTool";
import BScroll from "better-scroll";
import { mapMutations } from "vuex";
export default {
  name: "songerDetail",
  data() {
    return {
      loading:true,
      songerInfo: {},
      songerList: {
        artist: {
          name: "",
          musicSize: "",
          img1v1Url: "",
          albumSize: "",
          mvSize: ""
        },
        hotSongs: []
      },
      songerMv: {
        mvs: []
      },
      whichPanel: 0
    };
  },
  components: {
    mHead,
    listItem
  },
  computed: {
    theme_color() {
      return this.$store.state.theme.theme_color
        ? this.$store.state.theme.theme_color
        : "#954dcc";
    },
    current_song() {
      return this.$store.state.player.current_song;
    },
    current_sheet() {
      return this.$store.state.player.current_sheet;
    },
    current_list () {
      return this.$store.state.player.current_list
    },
    current_num (){
			return this.$store.state.player.current_num
		}
  },
  created() {
    if (this.$route.query.id) {
      this.getSongerDetail()
    }
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  mounted() {
    this.$nextTick(() => {
      this._initScroll();
    });
  },
  filters: {
    counts(val) {
      return (val / 10000).toFixed(2) + "万";
    },
    conutArtist(val) {
      let arr = [];
      val.forEach((item, key) => {
        arr.push(item.name);
      });
      return arr.join(" / ");
    },
    time(val) {
      return musicUtil.getformHour(val);
    }
  },
  methods: {
    ...mapMutations([
      "SET_CURRENT_SONG",
      "SET_CURRENT_LISTS",
      "SET_PLAYER_SATATUS",
      "SET_CURRENT_SHEET",
      "PUSH_CURRENT_LISTS",
      "TOGGLE_SIDEBAR"
    ]),
    _initScroll() {
      this.songerPage = new BScroll(this.$refs.songerPage, {
        //开启点击事件 默认为false
        click: true,
        listenScroll: true
      });
      this.songerPage.on("scroll", e => {
        console.log(e);
      });
    },
    videoPlay(){
      this.$message.info('视频功能暂时未开通!')
    },
    getSongerDetail() {
      // 歌手描述
      this.$axios
        .get(`${api.songerDesc}${this.$route.query.id}`)
        .then(response => {
          if (response.data.code === 200) {
            this.songerInfo = response.data
          }
        });
      // 歌手热门歌曲
      this.$axios
        .get(`${api.songerHotSongs}${this.$route.query.id}`)
        .then(response => {
          if (response.data.code === 200) {
            this.songerList = response.data
            this.loading = false
          }
        });
      // 歌手mv
      this.$axios
        .get(`${api.songerMv}${this.$route.query.id}`)
        .then(response => {
          if (response.data.code === 200) {
            this.songerMv = response.data
          }
        });
    },
    tab(item) {
      this.whichPanel = item;
    },
    songPlay(item) {
      commonApi.songPlay(item, this);
    },
    addToList() {
      if (this.current_sheet == this.$route.query.id) {
        return;
      }
      let songLists = [];
      this.songerList.hotSongs.forEach((ele, index) => {
        songLists.push({
          id: ele.id,
          name: ele.name,
          url: `https://music.163.com/song/media/outer/url?id=${ele.id}`,
          duration: "",
          author: ele.ar[0].name ? ele.ar[0].name : "",
          poster: ele.al ? ele.al.picUrl : ""
        });
      });
      // 设置当前播放的专辑
      this.SET_CURRENT_SHEET(this.$route.query.id);
      // 设置当前播放的列表
      this.SET_CURRENT_LISTS(songLists);
      // 设置当前播放的歌曲
      this.SET_CURRENT_SONG(this.current_list[this.current_num]);
      this.$player.src = this.current_song.url;
      // 设置播放器当前的状态
      this.SET_PLAYER_SATATUS(this.$player.paused);
    }
  },
  watch: {}
};
</script>
<style lang="stylus" scoped>
.songer-wrapper
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
    .scroll-wrapper 
      padding-bottom 10px
      overflow hidden
      .songer-info-wrapper
        box-sizing border-box
        padding 15px 5px
        display flex
        overflow hidden
        position relative
        .songer-img 
          flex 160px 0 0
          width 160px
          height 160px
          overflow: hidden
          img 
            max-width 100%
            max-height 100%
        .songer-info 
          flex 1
          box-sizing border-box
          padding-left 20px
          font-size 16px
          color #ccc
          .sogner-name
            width 100%
            height 30px
            line-height 30px
            text-align left
            color #333
            font-size 28px
            margin-bottom 24px
            margin-top 4px
          .sogner-item-desc 
            width 100%
            line-height 30px
            text-align left
            color #666
            font-size 22px
            .item 
              margin 8px 0
        .all-song-play 
          position absolute
          top 50%
          right 30px
          text-align center
          font-size 80px
          transform translateY(-50%)
          color #fff
          z-index 2
          .sheet-play 
            width 80px
            height 80px
            fill #333
          .sheet-play-active
            width 80px
            height 80px
  .tab 
    width 100%
    box-sizing border-box
    display flex
    border-top 1px solid #f2f2f2
    border-bottom 1px solid #f2f2f2
    .tab-item 
      flex 1
      height 80px
      line-height 80px
      text-align center
      font-size 20px
      color #333
    .active 
      background-color #f2f2f2
  .tab-panel 
    box-sizing border-box
    padding 12px
    overflow hidden
  .mv-sheet 
    width 100%
    font-size 0
    overflow hidden
    .item 
      width 50%
      display inline-block
      box-sizing border-box
      padding 10px
      font-size 16px
      position relative
      .img 
        width 100%
        height 200px
        text-align center
        overflow hidden
        position relative
        .poster 
          max-width 100%
        .icon 
          width 60px
          height 60px
          position absolute
          top 50%
          left 50%
          transform translateY(-50%) translateX(-50%)
        .play-count 
          position absolute
          bottom 0
          right 0
          font-size 20px
          color #fff
      .name
        width 100%
        height 26px
        line-height 26px
        font-size 20px
        color #333
        margin 5px auto
        overflow hidden
      .publish
        width 100%
        height 20px
        line-height 20px
        font-size 18px
        color #999
      .duition
        position absolute
        top 15px
        left 15px
        font-size 20px
        color #fff
  
  
  .title-name
    font-size 26px
    color #333
    text-align center
    padding 20px 5px
    font-weight bold
    box-sizing border-box
    overflow hidden
  .person-img
    width 100%
    overflow hidden
    img
      max-width 100%
  .songer-brief-desc 
    padding 10px 5px
    box-sizing border-box
    line-height 30px
    text-indent 2em
    font-size 20px
    color #999999
    overflow: hidden
  .info-list
    .list-item
      padding 25px 0
      border-bottom 1px solid #f1f1f1
      .title  
        margin-bottom 20px
        line-height 25px
        font-size 26px
        color #000
      .content
        text-indent 2em
        font-size 24px
        color #999
        line-height 38px

</style>
