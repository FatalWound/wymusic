<template>
<div class="sidebar-wrapper">
    <div class="cover" @click="closeBar"></div>
    <div class="sidebar" ref="sidebar">
        <ul class="sider-nav">
            <li class="item" @click="itemClick(0)">
                <div class="item-icon"><i class="fa fa-home" aria-hidden="true"></i></div>
                <div class="item-content">首页</div>
                <!-- <div class="item-arrow"><i class="fa fa-angle-right" aria-hidden="true"></i></div> -->
            </li>
            <li class="item" @click="itemClick(17)">
                <div class="item-icon"><i class="fa fa-search" aria-hidden="true"></i></div>
                <div class="item-content">搜索</div>
                <div class="item-arrow"></div>
            </li>
            <li class="item" @click="itemClick(18)">
                <div class="item-icon"><i class="fa fa-cog" aria-hidden="true"></i></div>
                <div class="item-content">设置</div>
                <div class="item-arrow"></div>
            </li>
            <li class="item" @click="itemClick(19)">
                <div class="item-icon"><i class="fa fa-cube" aria-hidden="true"></i></div>
                <div class="item-content">关于app</div>
                <div class="item-arrow"></div>
            </li>
            <li class="item" @click="itemClick(20)">
                <div class="item-icon"><i class="fa fa-bell-slash" aria-hidden="true"></i></div>
                <div class="item-content">静音</div>
                <div class="item-arrow">
                    <i class="fa fa-toggle-on" v-if="muted" aria-hidden="true"></i>
                    <i class="fa fa-toggle-off" v-if="!muted" aria-hidden="true"></i>
                </div>
            </li>
        </ul>
    </div>
</div>
</template>
<script>
import { mapMutations } from "vuex"
import BScroll from "better-scroll"
export default {
    name:'sideBar',
    data(){
        return {
            muted: false
        }
    },
    created(){
        this.$nextTick(()=>{
            this._initScroll()
        })
    },
    computed:{
    },
    methods:{
        ...mapMutations(["TOGGLE_SIDEBAR"]),
        _initScroll() {
            this.sidebar = new BScroll(this.$refs.sidebar,{
                //开启点击事件 默认为false
                click:true
            })
        },
        closeBar(){
            this.TOGGLE_SIDEBAR(false)
        },
        itemClick(num){
            switch (num) {
                case 0:
                    this.$router.push({path:'/'});
                    this.TOGGLE_SIDEBAR(false)
                    break;
                case 17:
                    this.$router.push({path:'/search'});
                    this.TOGGLE_SIDEBAR(false)
                    break;
                case 18:
                    this.$router.push({path:'/setting'});
                    this.TOGGLE_SIDEBAR(false)
                    break;
                case 19:
                    this.$router.push({path:'/about'});
                    this.TOGGLE_SIDEBAR(false)
                    break;
                case 20:
                    this.$player.muted = !this.$player.muted
                    this.muted = this.$player.muted
                    break;
                default:
                    break;
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.sidebar-wrapper
    position fixed
    top 0
    left 0
    bottom 0
    width 100%
    z-index 1024
    box-sizing border-box
    padding 5px 0
    overflow hidden
    .sidebar
        position absolute
        top 0
        left 0
        bottom 0
        width 60%
        height 100%
        background-color #333
        overflow hidden
        z-index 34
        .sider-nav
            & .item
                width 95%
                margin 0 auto
                position relative
                overflow hidden
                font-size 22px
                color #fff
                height 80px
                line-height 80px
                text-align left 
                box-sizing border-box
                padding 0 60px
                &:last-child
                    border none
                &::after
                    content ''
                    width 100%
                    height 1px
                    background-color #111111
                    position absolute
                    bottom 1px
                    right 0
                    transform scaleY(0.5)
                .item-icon
                    width 60px
                    height 100%
                    text-align center
                    overflow hidden
                    position absolute
                    top 0
                    left 0
                .item-arrow
                    width 60px
                    height 100%
                    text-align center
                    overflow hidden
                    position absolute
                    top 0
                    right 0
.cover
    position absolute
    top 0
    left 0
    right 0
    bottom 0
    z-index 25
</style>


