<template>
	<view>
		<view class="gotosearch"><my-search  @click="gotosearch"></my-search></view>
		<swiper :indicator-dots="true" :autoplay="true" :interval="3000" :duration="1000" :circular="true">
			<swiper-item v-for="(item,index) in swiperList" :key='index'>
				<image :src="item.image_src" mode="widthFix"></image>
			</swiper-item>
		</swiper>
		<view class="nav-list">
			<view class="nav-item" v-for="(item,i) in navList" :key='i' @click="navClickHandler(item)">
				<image :src="item.image_src"></image>
			</view>
		</view>
		<view class="FloorList">
			<view class="itemp" v-for="(item,i) in FloorList" :key='i'>
				<image :src="item.floor_title.image_src" class="floor-title"></image>
				<view class="sum">
						<navigator :url="item.product_list[0].url">
						<image :src="item.product_list[0].image_src" mode="widthFix"
							:style="{width: item.product_list[0].image_width  + 'rpx'}"></image>
							</navigator>
					<view class="right">
						<view v-for="(item,i) in item.product_list" :key='i' v-if='i !== 0'>
							<navigator :url="item.url">
							<image :src="item.image_src" mode="widthFix" :style="{width: item.image_width + 'rpx'}">
							</image>
							</navigator>
						</view>
					</view>
				</view>

			</view>

		</view>
	</view>
</template>

<script>
	import badgeMix from '../../mixins/tabbar-badge.js'
	export default {
		mixins: [badgeMix],
		data() {
			return {
				swiperList: [],
				navList: [],
				FloorList: []
			};
		},
		methods: {
			async getswiperList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/swiperdata')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.swiperList = res.message
			},
			async getnavList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/catitems')
				if (res.meta.status !== 200) return uni.$showMsg()
				this.navList = res.message
				console.log(res)
			},
			navClickHandler(e) {
				if (e.name === '分类') {
					uni.switchTab({
						url: "/pages/cate/cate"
					})
				}
			},
			async asygetFloorList() {
				const {
					data: res
				} = await uni.$http.get('/api/public/v1/home/floordata')
				console.log(res)
				if (res.meta.status !== 200) return uni.$showMsg()
				uni.$showMsg('获取成功')

				res.message.forEach(floor => {
					floor.product_list.forEach(prod => {
						prod.url = '/subpkg/goods_list/goods_list?' + prod.navigator_url.split('?')[1]
					})
				})
								this.FloorList = res.message
			},
			gotosearch () {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}
		},
		onLoad() {
			this.getswiperList()
			this.getnavList()
			this.asygetFloorList()
		}
	}
</script>

<style lang="scss">
	.gotosearch{
		position: sticky;
		top: 0;
		z-index: 999;
	}
	swiper{
		image{
		width: 100%;
		}

	}
	
	.nav-list {
		display: flex;
		justify-content: space-between;

		.nav-item {
			margin: 15px 0;
		}

		image {
			width: 128rpx;
			height: 140rpx;

		}

	}

	.FloorList {
		.itemp {
			.floor-title {
				height: 60rpx;
				width: 100%;
				display: flex;
			}

			.sum {
				display: flex;
				margin-left: 5px;

				.right {
					display: flex;
					justify-content: space-around;
					flex-wrap: wrap;
				}
			}


		}
	}
</style>
