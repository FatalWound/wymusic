import axios from 'axios';
import store from '@/store'
import config from '@/config'
axios.defaults.baseURL = config.baseUrl
const request = {
    checkMusic: function(id){
       return axios.get(`/check/music?id=${id}`)
    },
    getSongDetail:function(id){
        return axios.get(`/song/detail?ids=${id}`)
    },
    songPlay(item,that){
        this.checkMusic(item.id)
        .then(res=>{
            if (res.data.success) {
                if (store.state.player.current_song.id && store.state.player.current_song.id === item.id) {
                    if (that.$player.paused) {
                        that.$player.play()
                        store.commit('SET_PLAYER_SATATUS', that.$player.paused)
                    } else {
                        this.$player.pause()
                        store.commit('SET_PLAYER_SATATUS', that.$player.paused)
                    }
                } else {
                    this.getSongDetail(item.id).then((res) => {
                        if (res.data.code === 200) {
                            let song = {
                                id: res.data.songs[0].id,
                                name: res.data.songs[0].name,
                                url: `https://music.163.com/song/media/outer/url?id=${res.data.songs[0].id}`,
                                duration: item.song? item.song.duration:0,
                                author: res.data.songs[0].ar[0].name ? res.data.songs[0].ar[0].name : "",
                                poster: res.data.songs[0].al.picUrl ? res.data.songs[0].al.picUrl : ""
                            }
                            store.commit('PUSH_CURRENT_LISTS', song)
                            store.commit('SET_CURRENT_SONG', song)
                            that.$player.src = store.state.player.current_song.url
                            store.commit('SET_PLAYER_SATATUS', that.$player.paused)
                        } else {
                            that.$message.error('歌曲获取失败，播放失败!')
                        }
                    }).catch(err => that.$message.error(err))
                }

            } else {
                that.$message.error(res.data.message)
                // 如果不能播放，并且列表里只有这首歌，则直接暂停，否则播放下一首
                if (store.state.player.current_list.length == 0 || store.state.player.current_list.length <= 1) {
                    that.$player.pause()
                } else {
                    store.commit('NEXT', that.$player)
                }
            }
        })
        
    }
}
export default request