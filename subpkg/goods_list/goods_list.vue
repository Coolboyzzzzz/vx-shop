<template>
	<view>
		<view class="container" v-for='(item,i) in goodsList' :key='i' @click="gotoDetail(item)">
			<view class="left">
				<image :src="item.goods_small_logo"></image>
			</view>
			<view class="right">
				<text class="top">{{item.goods_name}}</text>
				<text class="bottom">￥{{item.goods_price | tonumber}}</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				goodsList: [],
				queryobj: {
					query: '',
					cid:'',
					pagenum: 1
				},
				total : 0,
				flag: true
			};
			},
			methods: {
				async getgoodsList (cb) {
					this.flag = false
					try{
						const { data: res } = await uni.$http.get('/api/public/v1/goods/search',this.queryobj)	
						if (res.meta.status !== 200) return uni.$showMsg()
						cb && cb()
						this.goodsList = [...this.goodsList,...res.message.goods]
						this.total = res.message.total
						this.flag = true
					}catch(e){
					return e
					}
				

			},
			gotoDetail (e) {
				console.log(e)
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + e.goods_id
				})
			}
		},
		onLoad (option) {
			this.queryobj.query = option.query || ''
			this.queryobj.cid = option.cid || ''
			this.getgoodsList()
		},
		filters: {
			tonumber (e) {
				return Number(e).toFixed(2)
			}
		},
		onReachBottom () {
		if (this.flag){
			if ( this.queryobj.pagenum * 20 >= this.total) return uni.$showMsg('我是有底线的~~')
			this.queryobj.pagenum +=1
			this.getgoodsList()
			}
		},
		onPullDownRefresh() {
			this.goodsList = []
			this.queryobj.pagenum = 1
			this.total = 0
			this.flag = true
			this.getgoodsList( () => uni.stopPullDownRefresh())
		}
		
	}
</script>

<style lang="scss">
.container{
	border-bottom: 1px solid #909399;
	height: 100px;
	display: flex;
	.left{
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
</style>
