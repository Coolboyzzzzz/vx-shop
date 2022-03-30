<template>
	<view>
		<view class="container-title" v-if="JSON.stringify(address) === '{}'">
			<button @click="addAddress" type="primary" size="mini">请选择收货地址+</button>
		</view>
		<view class="context" @click="addAddress" v-else>
			<view class="top">
				<view class="left">
					<text>收货人：{{address.userName}}</text>
				</view>
				<view class="right">
					<text>电话：{{address.telNumber}}</text>
					<uni-icons type="right" size="12"></uni-icons>
				</view>
			</view>
			<view class="bottom">
				收货地址：{{address.address}}
			</view>
		</view>
		
			<image class="pic" src="../../static/cart_border@2x.png" mode="widthFix"></image>
	</view>
</template>

<script>
	import { mapMutations,mapState } from 'vuex'
	export default {
		name:"my-address",
		computed:{
			...mapState('m_address',['address'])
		},
		methods: {
			...mapMutations('m_address',['addressStorage']),
			addAddress () {
			const that = this
			uni.chooseAddress({
				success(e) {
					const address = `${e.provinceName}${e.cityName}${e.countyName}${e.detailInfo}`
					e.address = address
					that.addressStorage(e)
			}
			})
		}
		}
	}
</script>

<style lang="scss">
.container-title{
	height: 50px;
	background-color: #f9f9f9;
	display: flex;
	justify-content: center;
	align-items: center;
}
.pic{
  display: block;
  width: 100%;
  height: 5px;
}
.context{
	padding: 0 5px;
	height: 50px;
	background-color: #f9f9f9;
	font-size: 12px;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	.top{
display: flex;
justify-content: space-between;
	}
}
</style>
