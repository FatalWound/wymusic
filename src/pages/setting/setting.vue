<template>
    <div class="setting-page">
        <mHead :title="'音乐站设置'"/>
        <div class="scroll" ref="settingPage" >
            <div class="scroll-wrapper">
                <section class="common-title" :style="{color:theme_color,'border-color':theme_color}">
                    主题色设置
                </section>
                <div class="section-content">
                    <ul class="theme-wrapper">
                        <li class="item" v-for="(item,key) in themes" :key="key" @click="setColor(item)">
                            <div class="color" :style="{'background-color':item.color}">
                                <span style="color:#ffffff" v-if="(item.color === theme_color)">on</span>
                                <span style="color:#000000" v-else>off</span>
                            </div>
                            <div :class="[(item.color === theme_color)? 'active' : 'normal']"></div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import mHead from '@/components/head/Head'
import { mapMutations } from "vuex"
import BScroll from "better-scroll"
export default {
    name:'setting',
    data(){
        return{
            themes:[
                {color:'#954dcc'},
                {color:'#6B8E23'},
                {color:'#CD0000'},
                {color:'#D15FEE'},
                {color:'#3D3D3D'},
                {color:'#0000AA'},
                {color:'#f9ddc7'},
                {color:'#3c424e'},
                {color:'#f4bac9'}
            ]
        }
    },
    components: {
        mHead
    },
    created(){
        this.$nextTick(()=>{
            this._initScroll()
        })
    },
    computed:{
        theme_color() {
			return this.$store.state.theme.theme_color ? this.$store.state.theme.theme_color : '#954dcc'
		}
    },
    methods:{
        ...mapMutations(["SET_THEME_COLOR","RESET"]),
         _initScroll() {
            this.settingPage = new BScroll(this.$refs.settingPage,{
                //开启点击事件 默认为false
                click:true
            })
        },
        setColor(item){
            this.SET_THEME_COLOR(item.color)
            if(window.localStorage){
                localStorage.setItem('themeColor',item.color)
                this.$message.success('换肤成功')
            }
        }
    }
}
</script>
<style lang="stylus" scoped>
.setting-page
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
            .common-title
                width 95%
                margin 5px auto
                box-sizing border-box
                padding 15px 0
                color #954dcc
                font-size 28px
                font-weight bold
                border-bottom 2px solid #954dcc
            .section-content
                width 100%
                padding 10px 5px
                font-size 0
                box-sizing border-box
                .theme-wrapper
                    width 100%
                    & .item
                        display inline-block
                        width 25%
                        margin 20px 0
                        .color
                            width 80px
                            height 80px
                            line-height 80px
                            font-size 24px
                            color #fff
                            text-align center
                            margin 0 auto
                            border-radius 100%
                        .normal
                            width 20px
                            height 5px
                            border-radius 30%
                            margin 0 auto
                            margin-top 10px
                            background-color #333
                        .active
                            width 20px
                            height 5px
                            border-radius 30%
                            margin 0 auto
                            margin-top 10px
                            background-color #7CFC00

</style>

