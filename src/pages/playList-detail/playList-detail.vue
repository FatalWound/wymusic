<template>
  <div class="page-wrapper page-scroll" ref="pageScroll">
		<div class="playList-detail">
			<div class="player-back" @click='back()'>
				<i class="fa fa-angle-left" aria-hidden="true"></i>
			</div>
			<div class="player-home" @click='menu()'>
				<img src="../../assets/svg/menu.svg" alt="" srcset="">
			</div>
		<section class="detail-header-wrapper" v-bind:style="{background:`url(${listDatil.coverImgUrl}) center no-repeat `}">
			<div class="title">{{listDatil.name}}</div>
			<div class="song-play" @click='addToList'>
				<!-- <img class="sheet-play" src="../../assets/svg/bofang.svg" alt="" v-if="!(current_sheet === this.$route.query.id)">
				<img class="sheet-play" src="../../assets/svg/playing2.svg" alt="" v-else> -->
				<!-- 苹果6sp微信中不可直接识别svg -->
				<span v-if="!(current_sheet === this.$route.query.id)">
					<svg class="sheet-play"  viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
						<path  d="M839.164908 557.578058 240.50216 941.694459c-32.559867 21.048385-76.198502 11.69332-76.198502-19.264762L164.303659 102.006232c0-35.897581 40.684228-38.282908 76.198502-19.23304L839.164908 466.842521C863.815318 491.907383 863.815318 532.528546 839.164908 557.578058zM227.422748 865.160365l568.042125-352.942401L227.422748 159.290913C227.422748 215.621872 227.422748 850.38894 227.422748 865.160365z" />
					</svg>
				</span>
				<span v-else>
					<svg class="sheet-play-active" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
							viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
							<rect x="0" y="13" width="2" height="5" :fill="theme_color">
								<animate attributeName="height" attributeType="XML"
									values="5;21;5" 
									begin="0s" dur="0.6s" repeatCount="indefinite" />
								<animate attributeName="y" attributeType="XML"
									values="13; 5; 13"
									begin="0s" dur="0.6s" repeatCount="indefinite" />
							</rect>
							<rect x="10" y="13" width="2" height="5" :fill="theme_color">
								<animate attributeName="height" attributeType="XML"
									values="5;21;5" 
									begin="0.15s" dur="0.6s" repeatCount="indefinite" />
								<animate attributeName="y" attributeType="XML"
									values="13; 5; 13"
									begin="0.15s" dur="0.6s" repeatCount="indefinite" />
							</rect>
							<rect x="20" y="13" width="2" height="5" :fill="theme_color">
								<animate attributeName="height" attributeType="XML"
									values="5;21;5" 
									begin="0.3s" dur="0.6s" repeatCount="indefinite" />
								<animate attributeName="y" attributeType="XML"
									values="13; 5; 13"
									begin="0.3s" dur="0.6s" repeatCount="indefinite" />
							</rect>
						</svg>
				</span>
			</div>
			<div class="tags"><span v-for="(item,key) in listDatil.tags" :key="key">{{item}}</span></div>
		</section>
		<section class="song-list-wrapper">
			<section>
				<div class="desc">简介：{{listDatil.description}}</div>
			</section>
			<ul class="song-list">
				<listItem 
						v-for="(item,key) in listDatil.tracks"
						:key='key'
						:name="((key+1)+' '+item.name)" 
						:desc="(item.ar[0].name + item.al.name)" 
						:currentId="Number(current_song.id)"
						:itemId="Number(item.id)"
						:iconType="Number(1)"
						@itemClick="songPlay(item)"/>
			</ul>
		</section>
		</div>
	</div>
</template>

<script>
import listItem from "@/components/list-item/list-item"
import { mapMutations } from "vuex"
import commonApi from '@/axios/request.js'
import BScroll from "better-scroll";
export default {
  name: 'playListDetail',
  data () {
    return {
      listDatil:{}
    }
	},
	components: {
    listItem
  },
  computed: {
		theme_color() {
			return this.$store.state.theme.theme_color ? this.$store.state.theme.theme_color : '#954dcc'
		},
		current_list () {
      return this.$store.state.player.current_list
		},
		current_song () {
      return this.$store.state.player.current_song
		},
		current_sheet () {
			return this.$store.state.player.current_sheet
		},
		current_num (){
			return this.$store.state.player.current_num
		}
  },
  created(){
		var that = this
		if(this.$route.query.id){
			this.$axios.get(`/playlist/detail?id=${this.$route.query.id}`)
			.then(function (response) {
					if(response.data.code === 200){
							that.listDatil = response.data.playlist
					}
			})
		}
		this.$nextTick(()=>{
      this._initScroll()
    })
	},
	watch:{
		"$route": (nv)=>{
			console.log(nv)
		}
	},
  methods: {
		...mapMutations(["SET_CURRENT_SONG","SET_CURRENT_LISTS","SET_PLAYER_SATATUS","SET_CURRENT_SHEET","PUSH_CURRENT_LISTS","TOGGLE_SIDEBAR"]),
    back() {
      this.$router.go(-1);
		},
		menu() {
      this.TOGGLE_SIDEBAR()
		},
		_initScroll() {
      this.pageScroll = new BScroll(this.$refs.pageScroll,{
        //开启点击事件 默认为false
        click:true
      })
    },
    songPlay(item){
			commonApi.songPlay(item,this)
			// if(this.current_song.id === item.id){
      //   this.distContorl()
      // }else{
			// 	commonApi.getSongDetail(item.id).then((res)=>{
			// 		if(res.data.code === 200){
			// 			let data = {
			// 				id: res.data.songs[0].id,
			// 				name: res.data.songs[0].name,
			// 				url: `https://music.163.com/song/media/outer/url?id=${res.data.songs[0].id}`,
			// 				duration: '',
			// 				author: res.data.songs[0].ar[0].name?res.data.songs[0].ar[0].name:"",
			// 				poster: res.data.songs[0].al.picUrl ? res.data.songs[0].al.picUrl : ""
			// 			}
			// 			this.SET_CURRENT_SONG(data)
			// 			this.PUSH_CURRENT_LISTS(data)
			// 			this.$player.src = this.current_song.url
			// 			this.SET_PLAYER_SATATUS(this.$player.paused)
			// 		}else{
			// 			this.$message.error('歌曲获取失败，播放失败!')
			// 		}
			// 	}).catch(err => this.$message.error(err))
			// }
		},
		addToList(){
			if(this.current_sheet == this.$route.query.id){
				return
			}
			let songLists = []
			this.listDatil.tracks.forEach((ele,index) => {
				songLists.push({
						id: ele.id,
						name: ele.name,
						url: `https://music.163.com/song/media/outer/url?id=${ele.id}`,
						duration: '',
						author: ele.ar[0].name?ele.ar[0].name:"",
						poster: ele.al ? ele.al.picUrl : "",
					})
			});	
			// 设置当前播放的专辑
			this.SET_CURRENT_SHEET(this.$route.query.id)
			// 设置当前播放的列表
			this.SET_CURRENT_LISTS(songLists)
			// 设置当前播放的歌曲
			this.SET_CURRENT_SONG(this.current_list[this.current_num])
			this.$player.src = this.current_song.url
			// 设置播放器当前的状态
      this.SET_PLAYER_SATATUS(this.$player.paused)
		},
		distContorl(){
      if(this.$player.paused){
        this.$player.play()
        this.SET_PLAYER_SATATUS(!this.$player.paused)
      }else{
        this.$player.pause()
        this.SET_PLAYER_SATATUS(!this.$player.paused)
      }
      
    }
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='stylus'>
@import url('../../assets/css/reset.styl')
@import url('../../assets/css/animate.styl')
.page-wrapper
	position fixed
	top 0
	left 0
	right 0
	bottom 0
	width 100%
	height 100%
	overflow hidden
.playList-detail
	width 100%
	position relative
	overflow hidden
	.player-back
		width 50px
		height 50px
		line-height 50px
		text-align center
		font-size 38px
		color #fff
		position absolute
		top 15px
		left 15px
		text-shadow 2px 2px 5px #d43c33
		z-index 3
	.player-home
		width 40px
		height 40px
		line-height 40px
		text-align center
		font-size 36px
		color #fff
		position absolute
		top 15px
		right 15px
		text-shadow 2px 2px 5px #d43c33
		z-index 3
		img 
			max-width 100%
			max-height 100%
	.detail-header-wrapper
		width 100%
		height 400px
		position absolute
		top 0px
		left 0px
		right 0px
		overflow hidden
		background-color #ffffff
		&:after
			content ''
			position absolute
			top 0
			left 0
			right 0
			bottom 0
			width 100%
			height 100%
			background-color rgba(0,0,0,.25)
			z-index 1
		z-index 2
		.title
			width 70%
			font-size 26px
			color #fff
			margin 30px auto 0 auto
			text-align center
			position relative
			z-index 2
		.song-play
			position absolute
			top 150px
			left 5px
			right 5px
			text-align center
			font-size 80px
			color #fff
			z-index 2
			.sheet-play
				width 80px
				height 80px
				fill #ffffff
			.sheet-play-active
				width 80px
				height 80px
				fill #ffffff
				// fill #954dcc
		.tags
			padding 8px 0
			text-align left 
			font-size 12px
			color #fff
			overflow hidden
			position absolute
			left 10px
			right 10px
			bottom 10px
			z-index 2
			span 
				border 1px solid #fff
				border-radius 15px
				padding 5px 10px
				margin-right 10px
	.song-list-wrapper
		width 100%
		padding-top 400px
		.desc
			font-size 20px
			line-height 34px
			text-align left 
			color #111
			box-sizing border-box
			padding 15px
		.song-list
			width 100%
			& > li
				width 100%
				box-sizing border-box
				padding 0 5px
				position relative
				cursor pointer
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
						border-bottom 1px solid #ddd
						.song-name
							width 100%
							height 35px
							line-height 35px
							font-size 24px
							color #000000
							text-align left
							margin-top 12px
							overflow hidden
						.song-desc
							width 100%
							height 35px
							line-height 35px
							font-size 16px
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
