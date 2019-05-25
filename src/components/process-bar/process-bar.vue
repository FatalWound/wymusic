<template>
    <div class="mini-process-wrapper" @click="setProcess">
        <div class="mini-step" :style="{width:process+'%','background-color':bgcolor}"></div>
    </div>
</template>

<script>
import { mapMutations } from "vuex"
import musicUtil from '@/util/musicTool'
export default {
  name: 'processBar',
  data () {
    return {
    }
  },
  props:{
    process:{
        type: Number,
        default: 0
    },
    bgcolor:{
      type:String,
      default:'#fff'
    }
  },
  computed: {
    theme_color() {
      return this.$store.state.theme.theme_color ? this.$store.state.theme.theme_color : '#954dcc'
    }
  },
  mounted() {

  },
  watch: {
  },
  methods: {
   setProcess(e){
       console.log
   }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
@import url('../../assets/css/animate.styl')
.mini-process-wrapper
    width 100%
    height 100%
    max-height 4px
    margin 0 auto
    background-color #ccc
    .mini-step
        width 0%
        height 100%
        background-color #954dcc
</style>

