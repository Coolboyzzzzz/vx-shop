<template>
	<view>
		<view class="container">
			<view class="left">
				<label class="radio">
					<radio :checked='item.goods_state' @click="handle" />
				</label>
				<image @click="gotoDetail" :src="item.goods_small_logo || img" ></image>
			</view>
			<view class="right">
				<text class="top" @click="gotoDetail">{{item.goods_name}}</text>
				<view class="goos_number">
				<text class="bottom">￥{{item.goods_price | tonumber}}</text>
				<uni-number-box :min="1" @change="updata" :value='item.goods_count'></uni-number-box>
				</view>

			</view>
			</view>
	</view>
</template>

<script>
	import { mapState } from 'vuex'
	export default {
		name:"my-goods",
		computed: {
			...mapState('m_cart',['cart'])
		},
		data() {
			return {
				img: '../../static/tab_icons/123.jpg'
			};
		},
		props: {
			item: {
				type: Object,
				default: {}
			}
		},
		filters: {
			tonumber (e) {
				return Number(e).toFixed(2)
			}
		},
		methods: {
			gotoDetail () {
			this.$emit('click')
			},
		handle(){
			this.$emit('change-radio',{goods_id: this.item.goods_id,goods_state: this.item.goods_state})
		},
		updata(e){
			this.$emit('upDatanumber',{goods_id: this.item.goods_id,goods_count: this.item.goods_count,current: e})
		}
		}
	}
</script>

<style lang="scss">
.container{
	border-bottom: 1px solid #909399;
	height: 100px;
	display: flex;
	.left{
		display: flex;
		align-items: center;
		image{
			width: 100px;
			height: 100px;
			vertical-align: middle;
			
		}
	}
	.right{
		margin: 5px 0 0 5px;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		padding-bottom: 10px;
		.top{
		font-size: 12px;
		}
		.bottom{
		font-size: 13px;
		color: #c00000;
		}
	}
}
.goos_number{
	display: flex;
	justify-content: space-between;
	padding-right: 10px;
}
</style>
