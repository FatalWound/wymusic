<template>
    <li class="li-item">
        <div class="song-item">
            <div class="item-icon" @click="itemClick()">
				<span  v-if="(currentId === itemId)">
					<svg class="icon-play" version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
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
					<svg  class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg">
						<path fill="#ffffff" d="M826.820379 900.364673a1.688226 1.688226 0 0 0 0-3.376452 1.688226 1.688226 0 0 0 0 3.376452zM512 1023.999088A512.09521 512.09521 0 0 1 312.710552 40.247307a512.122222 512.122222 0 0 1 398.590151 943.504474 508.808797 508.808797 0 0 1-199.300703 40.247307z m0-984.595894a472.703271 472.703271 0 0 0-183.949101 908.062984A472.731408 472.731408 0 0 0 695.960356 76.521656 469.6307 469.6307 0 0 0 512 39.391939zM357.651127 753.579053V270.420036l418.432434 241.573881z m39.391939-414.932179v346.70534l300.256616-173.324533z" />
					</svg>
				</span>
				<!-- <img src="../../assets/svg/bofang_2.svg" class="icon" alt="" v-if="!(currentId === itemId)">
				<img src="../../assets/svg/playing1.svg" class="active-play" alt="" v-else> -->
			</div>
            <div class="item-desc" @click="itemClick()">
                <p class="song-name">{{name}}</p>
                <p class="song-desc" >{{desc}}</p>
            </div>
            <div class="song-delete" @click="itemdelete">
				<img src="../../assets/svg/delete.svg" class="normal" alt="" > 
            </div>
        </div>
    </li>
</template>
<script>
export default {
	name:'listItem2',
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
			return `https://music.163.com/song/media/outer/url?id=${itemId}`
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
		itemdelete(){
			this.$emit('itemdelete')
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
			color #954DCC
			.icon
				width 70%
				height 70%
				margin-top 15%
				fill #ffffff
			.icon-play
				width 50%
				height 80%
				margin-top 10%
				fill #954dcc
		.item-desc
			flex 1
			height 100px
			box-sizing border-box
			padding-left 10px
			padding-right 85px
			overflow hidden
			position relative
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
				color #ffffff
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
		.song-delete
			width 80px
			line-height 100px
			text-align center 
			font-size 42px
			color #ddd
			position absolute
			top 0
			right 0
			bottom 0
			.normal
				width 36px
				height 36px
				color #ddd
</style>

