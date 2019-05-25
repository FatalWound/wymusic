<template>
<div class="compent-song-list">
    <ul class="song-list">
        <li  v-for="(item,key) in songs" :key='key'>
        <div class="song-item" @click="songPlay(item)">
            <div class="item-icon"><i class="fa fa-music" aria-hidden="true"></i></div>
            <div class="item-desc">
            <p class="song-name">{{item.name}}</p>
            <p class="song-desc" >{{item.song.artists.name}}{{item.song.album.name}}</p>
            </div>
            <div class="song-play"><i class="fa fa-play-circle-o" aria-hidden="true"></i></div>
        </div>
        </li>
    </ul>
</div>
</template>
<script>
export default {
    props:{
        songs:{
            type: Array,
            default: []
        }
    }
}
</script>
<style lang="stylus" scoped>
.compent-song-list
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
            &:before
            display block
            content ''
            width 100%
            height 1px
            transform scaleY(0.5)
            position absolute
            top 0
            left 0
            background-color #ddd
            .song-name
            width 100%
            height 35px
            line-height 35px
            font-size 32px
            color #000000
            text-align left
            margin-top 12px
            overflow hidden
            .song-desc
            width 100%
            height 35px
            line-height 35px
            font-size 26px
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
</style>


