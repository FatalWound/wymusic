<template>
    <li class="li-item">
        <div class="song-item">
            <div class="item-icon" @click="itemClick()">
				<svg  t="1558494439939" class="icon" style="" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="12053" xmlns:xlink="http://www.w3.org/1999/xlink">
				<path :fill="theme_color" d="M330.057143 679.277714c-20.772571 12.013714-35.602286 30.811429-40.832 51.913143-10.587429 41.984 20.736 81.517714 70.345143 88.356572 20.297143 2.797714 38.144 3.2 53.430857 1.28 32.365714-4.114286 58.806857-19.017143 79.780571-45.513143 14.244571-18.285714 21.778286-39.862857 21.833143-61.988572l0.146286-81.225143c-91.922286 13.220571-153.965714 29.202286-184.685714 47.177143z m185.508571-482.596571c0.036571-12.763429 14.811429-18.742857 22.272-8.96l180.443429 217.691428c37.12 41.179429 48.585143 98.322286 27.666286 145.810286-16.347429 35.730286-48.530286 57.344-94.976 64.365714-8.009143 1.225143-15.853714-3.821714-17.517715-11.245714-1.645714-7.424 3.474286-14.427429 11.392-15.634286 37.193143-5.741714 61.549714-22.180571 74.368-49.846857 17.005714-37.814857 8.374857-83.328-21.046857-116.114285l-157.129143-188.233143 4.242286 479.085714c0.237714 27.501714-8.850286 54.290286-26.368 76.982857-25.6 32.493714-59.794286 51.675429-101.595429 56.868572-18.962286 2.377143-40.228571 1.865143-63.817142-1.389715-67.401143-9.289143-109.403429-62.537143-94.500572-119.04 7.332571-28.397714 27.483429-53.705143 55.424-69.906285 36.022857-21.211429 102.582857-38.4 200.393143-52.443429l0.749714-407.990857z"  p-id="12054"></path></svg>
				<!-- <img src="../../assets/svg/music_icon.svg" class="icon" alt=""> -->
			</div>
            <div class="item-desc" @click="itemClick()">
                <p class="song-name">{{name}}</p>
                <p class="song-desc" >{{desc}}</p>
				<!-- <audio :src="url" controls></audio> -->
            </div>
			<!-- v-if="this.$router.history.current.name !== 'Search'" -->
            <div class="song-play" >
				<span v-if="(currentId === itemId)">
					<svg class="active-play" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
						 viewBox="0 0 24 30"  xml:space="preserve">
						<rect x="0" y="0" width="4" height="10" :fill="theme_color">
						<animateTransform attributeType="xml"
							attributeName="transform" type="translate"
							values="0 0; 0 20; 0 0"
							begin="0" dur="0.6s" repeatCount="indefinite" />
						</rect>
						<rect x="10" y="0" width="4" height="10" :fill="theme_color">
						<animateTransform attributeType="xml"
							attributeName="transform" type="translate"
							values="0 0; 0 20; 0 0"
							begin="0.2s" dur="0.6s" repeatCount="indefinite" />
						</rect>
						<rect x="20" y="0" width="4" height="10" :fill="theme_color">
						<animateTransform attributeType="xml"
							attributeName="transform" type="translate"
							values="0 0; 0 20; 0 0"
							begin="0.4s" dur="0.6s" repeatCount="indefinite" />
						</rect>
					</svg>
				</span>
				<span v-else>
					<svg class="normal-play" width="200px" height="200.00px" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
						<path fill="#CDC1C5" d="M826.820379 900.364673a1.688226 1.688226 0 0 0 0-3.376452 1.688226 1.688226 0 0 0 0 3.376452zM512 1023.999088A512.09521 512.09521 0 0 1 312.710552 40.247307a512.122222 512.122222 0 0 1 398.590151 943.504474 508.808797 508.808797 0 0 1-199.300703 40.247307z m0-984.595894a472.703271 472.703271 0 0 0-183.949101 908.062984A472.731408 472.731408 0 0 0 695.960356 76.521656 469.6307 469.6307 0 0 0 512 39.391939zM357.651127 753.579053V270.420036l418.432434 241.573881z m39.391939-414.932179v346.70534l300.256616-173.324533z" />
					</svg>
				</span>
				<!-- <img src="../../assets/svg/bofang_2.svg" class="normal-play"  alt="" v-if="!(currentId === itemId)">
				<img src="../../assets/svg/playing1.svg" class="active-play" alt="" v-else> -->
            </div>
			<!-- <div class="song-play" @click="download(itemId)" v-if="this.$router.history.current.name === 'Search'">
				<img src="../../assets/svg/download.svg" class="normal-play" alt="">
			</div> -->
        </div>
    </li>
</template>
<script>
export default {
	name:'listItem',
	data(){
		return {
			
		}
	},
	props:{
		name:{
			type: String,
			default: ''
		},
		desc:{
			type: String,
			default: ''
		},
		currentId:{
			type: Number,
			default: undefined
		},
		itemId:{
			type: Number,
			default: undefined
		},
		iconType:{
			type: Number,
			default: 1
		}
	},
	computed:{
		url(){
			return `https://music.163.com/song/media/outer/url?id=${this.itemId}`
		},
		player_status() {
			return this.$store.state.player.player_status ? this.$store.state.player.player_status : false
		},
		theme_color() {
			return this.$store.state.theme.theme_color ? this.$store.state.theme.theme_color : '#954dcc'
		},
		active_icon(){
			return '../../assets/svg/playing1.svg'
		}
	},
	methods:{
		itemClick(){
			this.$emit('itemClick')
		},
		download(id){
			// this.$axios.get(`https://music.163.com/song/media/outer/url?id=${id}`)
			// .then((res)=>{
			// 	console.log(res)
			// })
		}
	}
}
</script>
<style lang="stylus" scoped>
.li-item
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
			fill #954DCC
			.icon
				width 80%
				height 80%
				margin-top 10%
		.item-desc
			flex 1
			height 100px
			box-sizing border-box
			padding-left 10px
			padding-right 85px
			overflow hidden
			position relative
			// border-bottom 1px solid #ddd
			&::after
				content ''
				width 100%
				height 1px
				background-color #cccccc
				position absolute
				bottom 1px
				right 0
				transform scaleY(0.5)
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
				font-size 20px
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
			.normal-play
				width 36px
				height 36px
				color #ddd
			.active-play
				width 36px
				height 36px
				color #954dcc
</style>

