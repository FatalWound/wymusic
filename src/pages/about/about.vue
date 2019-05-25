<template>
    <div class="about-wrapper">
        <mHead :title="'关于APP'"/>
        <div class="scroll" ref="abputPage" >
            <div class="scroll-wrapper">
                <section class="about-logo-info">
                    <div class="logo-wrapper" :style="{'background-color':theme_color}">
                        <span class="logo-word">FW</span>
                    </div>
                    <div class="app-name" :style="{color:theme_color}">FW音乐站</div>
                </section>
                <section class="common-title" :style="{'border-color':theme_color,color:theme_color}">
                    APP基本信息
                </section>
                <section class="app-info">
                    <ul>
                        <li>
                            <div class="title" :style="{color:theme_color}">作者:</div>
                            <div class="content">李福炜</div>
                        </li>
                        <li>
                            <div class="title" :style="{color:theme_color}">版本:</div>
                            <div class="content">1.0.0</div>
                        </li>
                        <li>
                            <div class="title" :style="{color:theme_color}">作品定位:</div>
                            <div class="content">音乐娱乐</div>
                        </li>
                        <li>
                            <div class="title" :style="{color:theme_color}">作品开发面向:</div>
                            <div class="content">移动端</div>
                        </li>
                        <li>
                            <div class="title" :style="{color:theme_color}">数据来源:</div>
                            <div class="content">NeteaseCloudMusicApi</div>
                        </li>
                        <li>
                            <div class="title" :style="{color:theme_color}">所有权:</div>
                            <div class="content">归李福炜本人所有</div>
                        </li>
                    </ul>
                </section>
                <section class="common-title" :style="{'border-color':theme_color,color:theme_color}">
                    APP技术栈
                </section>
                <section class="tc">
                    <el-row :gutter="20" >
                        <el-col :span="24"><span class="tc-item">axios => 0.18.0</span></el-col>
                        <el-col :span="24"><span class="tc-item">better-scroll => 1.15.2</span></el-col>
                        <el-col :span="24"><span class="tc-item">element-ui => 2.5.4</span></el-col>
                        <el-col :span="24"><span class="tc-item">font-awesome => 4.7.0</span></el-col>
                        <el-col :span="24"><span class="tc-item">lib-flexible => 0.3.2</span></el-col>
                        <el-col :span="24"><span class="tc-item">vue => 2.5.2</span></el-col>
                        <el-col :span="24"><span class="tc-item">vue-awesome-swiper => 3.1.3</span></el-col>
                        <el-col :span="24"><span class="tc-item">vue-router => 3.0.1</span></el-col>
                        <el-col :span="24"><span class="tc-item">vuex => 3.1.1</span></el-col>
                        <el-col :span="24"><span class="tc-item">stylus => 0.54.5</span></el-col>
                        <el-col :span="24"><span class="tc-item">webpack => 3.6.0</span></el-col>
                        <el-col :span="24"><span class="tc-item">px2rem-loader => 0.1.9</span></el-col>
                        <el-col :span="24"><span class="tc-item">autoprefixer => 7.1.2</span></el-col>
                        <el-col :span="24"><span class="tc-item">fastclick => 1.0.6</span></el-col>
                    </el-row>
                </section>
                <section class="common-title" :style="{'border-color':theme_color,color:theme_color}">
                    APP兼容运行
                </section>
                <section class="app-info">
                    <ul>
                        <li>
                            <div class="title" :style="{color:theme_color}">主流浏览器</div>
                            <div class="content">主流浏览器 chrome firefox opera 等均支持运行</div>
                        </li>
                        <li>
                            <div class="title" :style="{color:theme_color}">IE版本：</div>
                            <div class="content">建议IE10及以上</div>
                        </li>
                        <li>
                            <div class="title" :style="{color:theme_color}">Android</div>
                            <div class="content">支持Android 6.0及以上版本运行</div>
                        </li>
                        <li>
                            <div class="title" :style="{color:theme_color}">Iphone</div>
                            <div class="content">支持Iphone SE及上版本运行</div>
                        </li>
                    </ul>
                </section>
                <section class="common-title" :style="{'border-color':theme_color,color:theme_color}">
                    免责声明
                </section>
                <section class="dute" :style="{'background-color':theme_color}">
                    本APP仅供学习娱乐使用，不做任何商业盈利用途，未经允许不得利用本APP进行商业盈利用途，否则后果自负！利用该作品做其他用途导致的法律责任与本APP开发者无关！由使用者承担所有责任！
                </section>
            </div>
        </div>
    </div>
</template>
<script>
import mHead from '@/components/head/Head'
import BScroll from "better-scroll"
export default {
    name:'about',
    data(){
        return {

        }
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
    components:{
        mHead
    },
    methods:{
        _initScroll() {
            this.abputPage = new BScroll(this.$refs.abputPage,{
                //开启点击事件 默认为false
                click:true
            })
        },
    }
}
</script>
<style lang="stylus" scoped>
.about-wrapper
    width 100%
    padding-bottom 100px
    overflow hidden
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
            .about-logo-info
                width 100%
                padding 30px 0
                overflow hidden
                .logo-wrapper
                    width 200px
                    height 200px
                    margin 0 auto
                    line-height 200px
                    text-align center
                    color #ffffff
                    background-color #954dcc
                    border-radius 25px
                    font-size 100px
                    overflow hidden
                .app-name
                    width 100%
                    text-align center
                    font-size 34px
                    color #954dcc
                    padding 20px 0
            .common-title
                width 95%
                margin 5px auto
                box-sizing border-box
                padding 15px 0
                color #954dcc
                font-size 28px
                font-weight bold
                border-bottom 2px solid #954dcc
            .app-info
                width 95%
                margin 0 auto
                box-sizing border-box
                ul
                    width 100%
                    & li
                        width 100%
                        padding 10px 0
                        line-height 36px
                        display flex
                        overflow hidden
                        .title
                            flex 1
                            font-size 25px
                            color #954dcc
                            text-align left   
                        .content
                            flex 2
                            text-indent 4px
                            font-size 25px
                            color #949494
                            text-align left 
            .tc
                width 95%
                margin 0 auto
                .tc-item
                    height 60px
                    line-height 60px
                    text-align left 
                    font-size 28px
                    color #949494
            .dute
                width 100%
                box-sizing border-box
                overflow hidden
                line-height 50px
                font-size 26px
                text-align left 
                color #fff
                background-color #954dcc
                padding 20px



</style>


