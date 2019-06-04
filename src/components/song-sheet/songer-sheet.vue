<template>
  <li class="sheet-item">
      <div class="sheet-item2" @click="itemClick()">
          <div class="sheet-img">
              <img class="border-radius" :src="imgUrl" alt="" srcset="">
          </div>
          <div class="sheet-name">
              {{name}}
          </div>
      </div>
  </li>
</template>
<script>
export default {
    props:['imgUrl','name'],
    methods:{
      itemClick(item){
        this.$emit('itemClick')
      }
    }
}
</script>
<style lang="stylus" scoped>
.sheet-item{
    width: 25%;
    box-sizing: border-box;
    padding: 3px 10px;
    float: left;
    .sheet-item2 {
      width: 100%;
      height: 180px;
      overflow: hidden;
      box-sizing: border-box;

      .sheet-img {
        display: block;
        width: 100%;
        height: 140px;
        overflow: hidden;
        background-color: #ddd;
        position: relative;
        border-radius 100%
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
        height: 30px;
        line-height: 30px;
        overflow: hidden;
        color: #000000;
        font-size: 20px;
        text-align: center;
        margin-top: 5px;
      }
    }
  }
</style>


