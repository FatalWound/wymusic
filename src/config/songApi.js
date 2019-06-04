const api = {
    banner:'/banner',
    personalized: '/personalized', // 推荐歌单
    hotArtists: '/top/artists', // 热门歌手 /top/artists?offset=0&limit=30
    songerHotSongs: '/artists?id=', // 歌手热门单曲 id=6452
    songerDesc: '/artist/desc?id=', // 歌手描述id=6452
    artistList: '/artist/list?cat=', // 获取歌手cat=1001
    songerMv: '/artist/mv?id=', // 歌手MV id=6452
    relatedSongSheet: '/related/playlist?id=', // 相关歌单推荐id=1
    albumNewest: '/album/newest', // 最新专辑
    albumTop: '/top/album', // 新碟上架 /top/album?offset=0&limit=30用于分页
    playlistDetail: '/playlist/detail?id=', // 歌单详情
    newsong:'/personalized/newsong', // 新歌推荐
    toplist: '/top/list?idx=', // 排行榜idx=6
    toplistAll:'/toplist', // 所有榜单
    toplistDetail:'/toplist?id=', // 所有榜单
    toplistAllDetail:'/toplist/detail', // 所有榜单内容摘要
    djprogram:'/personalized/djprogram', // 推荐电台
    djrecommend:'/program/recommend', // 推荐的电台节目
    lyric:'/lyric?id=', // 获取歌词
}
export default api