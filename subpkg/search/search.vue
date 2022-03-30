<template>
	<view>
	<view class="container">
		<uni-search-bar @input="input" radius="100" cancelButton='none' clearButton='auto' :focus='true' />
	</view>
	<view class="history" v-if="kw === ''">
		<view class="history-title">
			<text>搜索历史</text>
			<uni-icons type="trash" size="17" @click="clearhistory"></uni-icons>
		</view>
		<view class="history-list">
		<uni-tag v-for="(item,i) in historys" :text="item" @click="gotoGoodslist(item)"></uni-tag>
		</view>

	</view>
	<view v-else class='item' v-for='(item,i) in searchResult' :key='i'>
		<view class="context" @click="gotogateTo(item)">{{item.goods_name}}</view>
		<uni-icons type="arrowright" size="16"></uni-icons>
	</view>
		</view>
</template>

<script>
	export default {
		data() {
			return {
				timer: null,
				searchResult: [],
				kw: '',
				historyList: []
				
			};
		},
		methods: {
			input(e) {
				clearTimeout( this.timer )
				this.kw = e
				if (e=== '') return this.searchResult=[]
			this.timer = setTimeout( ()=>{
				//	this.searchResult = 
			console.log(this.kw)
			this.getSearchList()
				},1000)
			},
			async getSearchList () {
				const {data: res} = await uni.$http.get('/api/public/v1/goods/qsearch',{query : this.kw})
				const set = new Set(this.historyList)
				set.delete(this.kw)
				set.add(this.kw)
				this.historyList = Array.from(set)
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
				if (res.meta.status !== 200) return uni.$showMsg()
				this.searchResult = res.message
			},
			gotogateTo (e) {
				uni.navigateTo({
					url: '/subpkg/goods_detail/goods_detail?goods_id=' + 'e.goods_id'
				})
				console.log(e.goods_id)
			},
			clearhistory () {
				this.historyList = []
				uni.setStorageSync('kw',JSON.stringify(this.historyList))
				
			},
			gotoGoodslist (kw) {
				uni.navigateTo({
					url: "/subpkg/goods_list/goods_list?query=" + kw
				})
			}
		},
         computed: {
			 historys () {
				 
				 return this.historyList.reverse()
			 }
		 },
		 onLoad(){
			 this.historyList = JSON.parse(uni.getStorageSync('kw') || '[]')
		 }
	}
</script>

<style lang="scss">
	
.uni-searchbar{
	display: flex;
	position: relative;
	padding: 16px;
	background-color: #c00000;
}
.container{
	position: sticky;
	top:0;
	z-index: 999;
}
.context{
	overflow: hidden;
	white-space: nowrap;
	text-overflow:ellipsis;
	line-height: 50px;
	margin-left: 10px;
	
}
.item{
	display: flex;
	align-items: center;
		border: 1px solid #efefef;
		justify-content: space-between;
}
.history{
	padding: 0 5px;
	.history-title{
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 40px;
		font-size: 13px;
		border-bottom: 1px solid #efefef;
	}
	.history-list{
		display: flex;
		flex-wrap: wrap;
		.uni-tag {
			margin-top: 5px;
			margin-right: 5px;
		}
	}
}
</style>
