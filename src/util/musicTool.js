const musicUtil = {
    songTimeChangeText:function (timedata) {
        let m = 0;
        let s = 0;
        let time = timedata;
        // 向上取整并且转换为分钟 比如3.8522s 取整为 3分钟
        m = Math.floor(time / 60);
        // 获取小数部分 比如3.8522 取数为 0.8522  0.8522*60向上换算为48s
        s = Math.floor((time / 60 - m) * 60);
        // 判断数字是否大于10，如果小于10则要添加一个前置的0,并用i标签包裹，标签用于样式控制
        m = m < 10 ? "0" + String(m) : m;
        s = s < 10 ? "0" + String(s) : s;

        var text = m + ":" + s;
        return text;
    },
    getformHour:function(val){
        let h = 0
        let m = 0;
        let s = 0;
        let time = val;
        // 向上取整并且转换为分钟 比如3.8522s 取整为 3分钟
        h = Math.floor(time / 3600);
        m = Math.floor((time / 3600 - h) * 60);
        // 获取小数部分 比如3.8522 取数为 0.8522  0.8522*60向上换算为48s
        s = Math.floor((((time / 3600 - h) * 60) - m) * 60);
        // 判断数字是否大于10，如果小于10则要添加一个前置的0,并用i标签包裹，标签用于样式控制
        h = h < 10 ? "0" + String(h) : h;
        m = m < 10 ? "0" + String(m) : m;
        s = s < 10 ? "0" + String(s) : s;

        var text = h + ":" + m + ":" + s;
        return text
    },
    processBar: function (audio) {
        // 计算进度条位置，精确到小数点后六位数
        var musicCurrentTime = ((audio.currentTime / audio.duration) * 100).toFixed(6);
        // musicCurrentTime =(100 - musicCurrentTime) +"%";
        return Number(musicCurrentTime) 
    },
    getCurrentDuration: function (audio){
        let timer = null
        timer = setInterval(() => {
            return audio.currentTime
        }, 500)
    }
}
export default musicUtil