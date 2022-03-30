<template>
	<view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,i) in goodsDetail.pics" :key='i'>
				<view class="swiper-item">
					<image :src="item.pics_big"></image>
				</view>
			</swiper-item>
		</swiper>
		<view class="container">
			<text v-if="goodsDetail.goods_price">￥{{goodsDetail.goods_price}}</text>
			<view class="inner">
				<text class='name'>{{goodsDetail.goods_name}}</text>
				<view class='right'>
					<uni-icons type="star" size="24"></uni-icons>
					<text>收藏</text>
				</view>

			</view>
			<text class="bottom">快递：免运费</text>

		</view>
		<view class="rich-text1">
			<rich-text :nodes="goodsDetail.goods_introduce"></rich-text>
		</view>
		<view class="goosnav">
			<uni-goods-nav :fill="true" :options="options" :buttonGroup="buttonGroup" @click="onClick"
				@buttonClick="buttonClick" />
		</view>

	</view>

</template>

<script>
	import {
		mapState,
		mapMutations,
		mapGetters
	} from 'vuex'
	export default {
		computed: {
			...mapState('m_cart', ['cart']),
			...mapGetters('m_cart', ['total'])
		},
		data() {
			return {
				goodsDetail: {},
				goods_id: 0,
				options: [{
					icon: 'headphones',
					text: '客服'
				}, {
					icon: 'shop',
					text: '店铺',
					infoBackgroundColor: '#007aff',
					infoColor: "red"
				}, {
					icon: 'cart',
					text: '购物车'
				}],
				buttonGroup: [{
						text: '加入购物车',
						backgroundColor: '#ff0000',
						color: '#fff'
					},
					{
						text: '立即购买',
						backgroundColor: '#ffa200',
						color: '#fff'
					}
				]
			}
		},

		methods: {
			...mapMutations('m_cart', ['addToCart']),
			async getgoodsDetail() {
				const {
					data: res
				} = await uni.$http.get(`/api/public/v1/goods/detail?goods_id=${this.goods_id}`)
				console.log(res)
				res.message.goods_introduce = res.message.goods_introduce.replace(/<img /g,
					'<img style="dispaly : block"').replace(/webp/g, 'jpg')
				this.goodsDetail = res.message
			},
			onClick(e) {
			 console.log(e)
				console.log(this.cart)
				if (e.index === 2) {

					uni.switchTab({
						url: '/pages/cart/cart'
					})
				}
			},
			buttonClick(e) {
			 if (e.content.text === '加入购物车') {
					const goods = {
						goods_id: this.goodsDetail.goods_id,
						goods_name: this.goodsDetail.goods_name,
						goods_price: this.goodsDetail.goods_price,
						goods_count: 1,
						goods_small_logo: this.goodsDetail.goods_small_logo,
						goods_state: true
					}
				 this.addToCart(goods)
				}

			}
		},
		onLoad(option) {
			this.goods_id = option.goods_id
			this.getgoodsDetail()
		},
		watch: {
			total: { 
				handler(newval) {
				const findeResult = this.options.find( x => x.text === '购物车')
				if (findeResult) {
					findeResult.info = newval
				}
			},
			immediate : true
			}
		}

	}
</script>

<style lang="scss">
	swiper,
	.swiper-item {
		height: 750rpx;
	}

	image {
		width: 100%;
		height: 100%;
	}

	.container {
		display: flex;
		flex-direction: column;
		padding: 5px;
	
	.inner {
			display: flex;
			margin: 10px 0;

			.name {
				font-size: 14px;
			}

			.right {
				width: 100px;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				border-left: 1px solid #d8dce5;
				color: #aaaa7f;
			}
		}

		.bottom {
			font-size: 12px;
			color: #aaaa7f;
		}
	}

	.goosnav {
		position: fixed;
		width: 100%;
		bottom: 0;
		left: 0;
	}

	.rich-text1 {
		padding-bottom: 25px;
	}
</style>
