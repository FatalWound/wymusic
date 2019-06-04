<template>
    <div class="songer-page">
        <keep-alive include="Head">
            <mHead :title="'歌手'"/>
        </keep-alive>
        <aside class="side-bar" ref="siderBar">
            <nav class="nav-wrapper">
                <div class="nav-item" 
                :style="{backgroundColor:(checkSonger == item.code?theme_color:''),color:(checkSonger == item.code?'#fff':'#333')}"
                @click="getSonger(item)" v-for="(item,key) in songerCetagory" :key="key">{{item.name}}</div>
            </nav>
        </aside>
        <div class="scroll" ref="songerPage" v-loading.body="loading">
            <div class="scroll-wrapper"> 
                <section class="category-content">
                    <transition-group 
                        appear
                        class="songer-sheet"
                        tag="ul"
                        name="custom-classes-transition" enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
                        <songerSheet 
                        v-for="(item, key) in songers" 
                        :key='(item.id+1)'
                        :name="item.name" 
                        :imgUrl="item.picUrl"
                        @itemClick="songerSheet(item)"/>
                    </transition-group>
                </section>
            </div>
        </div>
    </div>
</template>
<script>
import mHead from "@/components/head/Head";
import songerSheet from "@/components/song-sheet/songer-sheet";
import api from "@/config/songApi";
import BScroll from "better-scroll";
export default {
    name:'songer',
    data(){
        return{
            songers:[],
            loading:true,
            checkSonger:8090,
            songerCetagory:[
                {name:'热门歌手',code:8090},
                {name:'华语男歌手',code:1001},
                {name:'华语女歌手',code:1002},
                {name:'华语组合/乐队',code:1003},
                {name:'欧美男歌手',code:2001},
                {name:'欧美女歌手',code:2002},
                {name:'欧美组合/乐队',code:2003},
                {name:'日本男歌手',code:6001},
                {name:'日本女歌手',code:6002},
                {name:'日本组合/乐队',code:6003},
                {name:'韩国男歌手',code:7001},
                {name:'韩国女歌手',code:7002},
                {name:'韩国组合/乐队',code:7003},
                {name:'入驻歌手',code:5001},
                {name:'其他男歌手',code:4001},
                {name:'其他女歌手',code:4002},
                {name:'其他组合/乐队',code:4003}
            ]
        }
    },
    created(){
        this.getHotSonger()
        this.$nextTick(() => {
            this._initScroll();
        });
    },
    computed:{
        theme_color() {
            return this.$store.state.theme.theme_color
                ? this.$store.state.theme.theme_color
                : "#954dcc";
        },
    },
    components: {
        mHead,songerSheet
    },
    watch:{
        checkSonger(val){
            if(val !== ""){
                this.loading = true
                if(val == 8090){
                    this.songers = []
                    this.getHotSonger()
                }else{
                    this.$axios.get(`${api.artistList}${val}`).then((response) => {
                        this.songers = []
                        this.songers = response.data.artists
                        this.loading = false
                    });
                }
            }
        }
    },
    methods:{
        _initScroll() {
            this.songerPage = new BScroll(this.$refs.songerPage, {
                //开启点击事件 默认为false
                click: true
            });
            this.siderBar = new BScroll(this.$refs.siderBar, {
                //开启点击事件 默认为false
                click: true
            });
        },
        songerSheet(item){
            this.$router.push({
                path: "/songer-detail",
                query: { id: item.id,date: new Date().getTime() }
            });
        },
        getHotSonger(){
            this.$axios.get(`${api.hotArtists}?offset=0&limit=1000`).then((response) => {
                this.songers = []
                this.songers = response.data.artists
                this.loading = false
            });
        },
        getSonger(item){
            this.checkSonger = item.code
            
        }
    }
}
</script>

<style lang="stylus" scoped>
.songer-page
    .side-bar
        width 150px
        margin 0 auto
        position fixed
        top 75px
        left 0
        bottom 100px
        border-right 1px solid #f1f1f1
        overflow hidden
        .nav-wrapper
            width 100%
            overflow hidden
            .nav-item
                padding 25px 3px
                box-sizing border-box
                font-size 18px
                line-height 26px
                text-align center
                border-bottom 1px solid #f1f1f1
    .scroll 
        margin 0 auto
        position fixed
        top 75px
        left 150px
        right 0
        bottom 100px
        overflow hidden
        .scroll-wrapper 
            overflow hidden
            .category-content
                padding 15px 5px
                box-sizing border-box
                .songer-sheet
                    width 100%
                    box-sizing border-box
                    list-style none
                    font-size 0
                    overflow hidden
                    padding 5px 0
                    .sheet-item
                        width 33.33%
</style>

