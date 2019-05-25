<template>
    <div class="search-page">
        <keep-alive include="Head">
            <mHead :title="'搜索'"/>
        </keep-alive>
        <div class="search-wrapper">
            <div class="search-main">
                <input type="text" :style="{'border-color':theme_color}" v-model="searchValue" class="search-input" placeholder="请输入关键字，多个关键字以空格隔开">
                <div class="search-btn" @click="search" :style="{'background-color':theme_color,'border-color':theme_color}"><i class="fa fa-search" aria-hidden="true"></i></div>
            </div>
        </div>
        <transition  enter-active-class="animated zoomIn" leave-active-class="animated zoomOut" mode="out-in">
            <div class="hot-search-wrapper" v-if="!isShow">
                <div class="title" :style="{color:theme_color}">热搜：</div>
                <div class="key-word-wrapper">
                    <span v-for="(item,key) in hotSearch" :key="key" class="word-item" @click="hotWordClick(item)" :style="{'border-color':theme_color}">{{item.first}}</span>
                </div>
            </div>
        </transition>
        <div class="search-result"  ref="resultList" v-if="isShow">
            <div class="scroll">
                <transition-group 
                    appear
                    class="song-list"
                    tag="ul"
                    name="custom-classes-transition" enter-active-class="animated zoomIn faster" leave-active-class="animated zoomOut faster">
                    <listItem 
                    v-for="(item,key) in lists"
                        :key='item.id'
                        :name="((key+1)+' '+item.name)" 
                        :desc="item.album.name" 
                        :currentId="Number(current_song.id)"
                        :itemId="Number(item.id)"
                        :iconType="Number(1)"
                        @itemClick="songPlay(item)"
                    />
                </transition-group>
            </div>
        </div>
    </div>
</template>
<script>
import mHead from '@/components/head/Head'
import listItem from "@/components/list-item/list-item"
import commonApi from '@/axios/request'
import { mapMutations } from "vuex"
export default {
    name:'search',
    data(){
        return{
            searchValue:'',
            hotSearch:[],
            lists:[],
            isShow:false
        }
    },
    computed:{
        theme_color() {
			return this.$store.state.theme.theme_color ? this.$store.state.theme.theme_color : '#954dcc'
		},
        current_song () {
            return this.$store.state.player.current_song
        }
    },
    components:{
        mHead,listItem
    },
    created(){
        this.$axios.get('/search/hot')
        .then((response) => {
            if(response.data.code === 200){
                this.hotSearch = response.data.result.hots
            }
        })
    },
    watch:{
        searchValue(nv){
            if(nv === ""){
                this.isShow = false
            }
        }
    },
    methods:{
        ...mapMutations(["SET_CURRENT_SONG","PUSH_CURRENT_LISTS","SET_PLAYER_SATATUS","PLAY"]),
        search(){
            var that = this
             this.$axios.get(`/search?keywords=${this.searchValue}`)
            .then((res)=>{
                if(res.data.code === 200){
                    this.lists = res.data.result.songs
                    this.isShow = true   
                }
            })
        },
        hotWordClick(item){
            this.searchValue = item.first
            this.search()
        },
        songPlay(item){
            console.log(item)
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
            
        }
    }
}
</script>
<style lang="stylus" scoped>
.search-page
    width 100%
    position fixed
    top 0px
    left 0px
    right 0px
    bottom 0px
    background-color #ffffff
    z-index 999
    overflow hidden
    .search-wrapper
        width 100%
        box-sizing border-box
        padding 25px 15px
        border-bottom 1px solid #ddd
        .search-main
            width 100%
            height 60px
            line-height 60px
            display flex
            .search-input
                flex 1
                height 100%
                border 1px solid #ddd
                border-top-left-radius 10px
                border-bottom-left-radius 10px
                padding 0 20px
                font-size 22px
                color #333
            .search-btn
                flex 100px 0 0
                height 100%
                font-size 32px
                text-align center
                border 1px solid #ddd
                color #ffffff
                border-top-right-radius 10px
                border-bottom-right-radius 10px
    .hot-search-wrapper
        box-sizing border-box
        padding 15px 25px
        margin 0 auto
        .title
            width 100%
            height 50px
            line-height 50px
            text-align left
            font-size 28px
            color #954dcc
        .key-word-wrapper
            width 100%
            line-height 32px
            padding 18px 0
            overflow hidden
            .word-item
                display inline-block
                padding 10px 20px
                font-size 24px
                color #333
                border 1px solid #ddd
                border-radius 10px
                margin 10px
    .search-result
        width 100%
        position absolute
        top 190px
        left 0px
        right 0px
        bottom 0px
        background-color #ffffff
        overflow hidden
        .scroll
            width 100%
            height 100%
            overflow auto
            .song-list
                width 100%


</style>


