<template>
    <li class="sheet-item">
        <div class="sheet-item2" @click="itemClick()">
            <div class="sheet-img">
                <img :src="imgUrl" alt="" srcset="">
                <span class="play-count" v-if="playCounts != 0">
                <i class="fa fa-headphones" aria-hidden="true"></i>
                {{playCounts}}次
                </span>
            </div>
            <div class="sheet-name">
                {{name}}
            </div>
        </div>
    </li>
</template>
<script>
export default {
    props:['imgUrl','name','playCounts'],
    filters:{
        counts(val){
          let str = ''
          if(val >= 10000){
            str = ((val / 10000).toFixed(2)) + "万";
          }else{
            str = val
          }
          return str
        },
        conutArtist(val){
            let arr = []
            val.forEach((item,key)=>{
                arr.push(item.name)
            })
            return arr.join(' / ')
        }
    },
    methods:{
        itemClick(item){
            this.$emit('itemClick')
        }
    }
}
</script>
<style lang="stylus" scoped>
.sheet-item{
    width: 33.33%;
    box-sizing: border-box;
    padding: 3px;
    float: left;
    .sheet-item2 {
      width: 100%;
      height: 260px;
      overflow: hidden;
      box-sizing: border-box;

      .sheet-img {
        display: block;
        width: 100%;
        height: 200px;
        overflow: hidden;
        background-color: #ddd;
        position: relative;

        .play-count {
          position: absolute;
          bottom: 5px;
          right: 5px;
          font-size: 24px;
          color: #ffffff;
        }

        img {
          max-width: 100%
          height: 100%
        }
      }
      .sheet-name {
        width: 100%;
        height: 60px;
        line-height: 28px;
        overflow: hidden;
        color: #000000;
        font-size: 20px;
        text-align: left;
        margin-top: 5px;
      }
    }
  }
</style>


