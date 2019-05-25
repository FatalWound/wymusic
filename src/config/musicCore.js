import store from '@/store'
import musicUtil from '@/util/musicTool'
const audio = new Audio();
audio.autoplay = true;
audio.addEventListener('ended', function () {
    // 播放结束后重置
    getCurrentTime('ended')
    // 监测是否循环播放列表的歌曲
    store.commit('NEXT', audio)
    if(!audio.paused){
        getCurrentTime('play')
    }
}, false);
audio.addEventListener('play', function () {
    getCurrentTime('play')
    store.commit('SET_CURRENT_DURATION', audio.duration)
}, false);
audio.addEventListener('progress', function (e) {
    // getCurrentTime('play')
    store.commit('SET_CURRENT_DURATION', audio.duration)
}, false);
audio.addEventListener('pause', function () {
    getCurrentTime('ended')
    store.commit('SET_CURRENT_DURATION', audio.duration)
}, false);
audio.addEventListener('canplay', function () {

}, false);
audio.addEventListener('stalled', function () {
    console.log('stalled')
    // stalled: 在浏览器尝试获取媒体数据，但数据不可用时触发
}, false);
audio.addEventListener('suspend', function () {
    console.log('suspend')
    // 在音频或视频数据被阻止加载时触发(可以是完成加载后触发，或者因为被暂停)
}, false);
function getCurrentTime(status){
    let timer = null
    if (status === 'play'){
        timer = setInterval(() => {
            store.commit('SET_CURRENT_TIME', audio.currentTime)
            store.commit('SET_CURRENT_PROCESS', musicUtil.processBar(audio))
        }, 1000)
    } else if (status === 'ended'){
        clearInterval(timer)
        store.commit('SET_CURRENT_TIME', 0)
    }
}
// 0 = HAVE_NOTHING - 没有关于音频是否就绪的信息
// 1 = HAVE_METADATA - 关于音频就绪的元数据
// 2 = HAVE_CURRENT_DATA - 关于当前播放位置的数据是可用的，但没有足够的数据来播放下一帧 / 毫秒
// 3 = HAVE_FUTURE_DATA - 当前及至少下一帧的数据是可用的
// 4 = HAVE_ENOUGH_DATA - 可用数据足以开始播放
// (function(){
//     let timer = null
//     timer = setInterval(() => {
//         if(audio.readyState === 4){
//             clearInterval(timer)
//         }
//     }, 500)

// })()

export default audio
