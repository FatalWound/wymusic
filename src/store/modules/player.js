import commonApi from '@/axios/request'
const state = {
    current_sheet:'',
    current_duration: 0,
    current_process:0,
    current_time:0,
    current_list: [],
    current_num: 0,
    current_song: {
        id: '',
        name: '暂无歌曲播放',
        duration: 0,
        url: '',
        author: '未知作者',
        poster:''
    },
    player_status: false
}

const mutations = {
    SET_CURRENT_LISTS:(state, songlists)=>{
        // 设置当前播放的列表
        state.current_num = 0
        state.current_list = []
        state.current_list = songlists
    },
    PUSH_CURRENT_LISTS: (state, songitem) => {
        // 向列表添加歌曲，重复的设置播放，不添加
        let same = false
        state.current_list.forEach((item, index) => {
            if (item.id === songitem.id) {
                state.current_num = index
                same = true
            }
        });
        if(!same){
            state.current_list.push(songitem)
        }
    },
    REMOVE_FORM_LISTS: (state, songitem)=>{
        state.current_list.forEach((item, index) => {
            if (item.id === songitem.id) {
                state.current_list.splice(index,1)
            }
        });
    },
    SET_CURRENT_SONG: (state, song)=>{
        // 设置当前播放的歌曲，并在标出该歌曲在列表中的位置
        state.current_song = song
        state.current_list.forEach((item,index) => {
            if (state.current_song.id === item.id){
                state.current_num = index
            }
        });
    },
    SET_CURRENT_DURATION: (state, duration) => {
        // 设置歌曲时长
        state.current_duration = duration
    },
    SET_CURRENT_TIME: (state, time) => {
        // 设置歌曲当前的播放时间，实时更新
        state.current_time = time
    },
    SET_CURRENT_PROCESS: (state, process) => {
        // 设置歌曲加载进度
        state.current_process = process
    },
    SET_CURRENT_SHEET: (state, sheetId) => {
        // 记录当前播放的表单
        state.current_sheet = sheetId
    },
    SET_PLAYER_SATATUS: (state, status) =>{
        // 记录播放器的播放状态
        state.player_status = status
    },
    RESET_LIST: (state, payload) => {
        // 重置列表
        state.current_list = []
    },
    RESET_SONG: (state, payload) => {
        // 重置当前歌曲
        state.current_song = {}
    },
    RESET_All: (state, payload) => {
        // 重置所有
        state.current_list = []
        state.current_song = {}
        state.current_sheet = ''
    },
    PREV: (state, payload) => {
        // 上一首
        let player = payload
        state.current_num -= 1
        if (state.current_num < 0) {
            state.current_num = 0
            state.current_song = state.current_list[state.current_num]
        } else {
            state.current_song = state.current_list[state.current_num]
        }
        player.autoplay = true;
        player.src = state.current_song.url
        state.player_status = player.paused
    },
    NEXT:(state, payload) => {
        // 下一首
        let player = payload
        state.current_num = ++state.current_num
        if (state.current_num > state.current_list.length -1){
            state.current_num = 0
            state.current_song = state.current_list[state.current_num]
            player.autoplay = true;
            player.src = state.current_song.url

        }else{
            state.current_song = state.current_list[state.current_num]
            player.autoplay = true;
            player.src = state.current_song.url
        }
        state.player_status = player.paused
    },
    PLAY: (state, payload)=>{
        const player = payload
        player.autoplay = true;
        player.play()
    }
}

const actions = {
}

export default {
    state,
    mutations,
    actions
}