<template>
	<view>
<my-search @click='gotosearch'></my-search>
	<view class="container1">
<scroll-view scroll-y="true" class="leftscroll" :style="{height: wh + 'px'}">
	<block v-for="(item,i) in CateList" :key='i'>
	<view :class="['item',active === i ? 'active' : '']" @click="activeCurrent(item,i)">{{item.cat_name}}</view>
	</block>
</scroll-view>
<scroll-view scroll-y="true" class="rightscroll"  :style="{height: wh + 'px'}" :scroll-top="scrollTop">
	<block v-for="(item ,i) in text" :key='i'>
	<view class="title">/{{item.cat_name}}/</view>
	<view class="container">
	<view class="container-text" v-for="(item2,i2) in item.children" :key='i2' @click="gotogoodlist(item2)">
		<image class="innerpicture" :src="item2.cat_icon" mode=""></image>
		<view>{{item2.cat_name}}</view>
	</view>
	</view>
	</block>
	
</scroll-view>
		</view>
	</view>
		</view>
</template>

<script>
	import mix from '../../mixins/tabbar-badge.js'
	export default {
		mixins:[mix],
		data() {
			return {
				wh: 0,
				CateList: [],
				active: 0,
				text: [],
				scrollTop: 0
			};
		},
		methods: {
			async getCateList() {
				const {data: res} = await uni.$http.get('/api/public/v1/categories')
				console.log(res)
				if(res.meta.status !== 200) return uni.$showMsg()
				this.CateList = res.message
				this.text = res.message[0].children
			},
			activeCurrent(item,e){
				this.active = e
				this.text = item.children
				this.scrollTop = this.scrollTop === 1 ? 0 : 1
			},
			gotogoodlist(e) {
				uni.navigateTo({
					url: '/subpkg/goods_list/goods_list?cid=' + e.cat_id
				})
			},
			gotosearch () {
				uni.navigateTo({
					url: '/subpkg/search/search'
				})
			}

		},
		onLoad () {
			const sysinfo = uni.getSystemInfoSync()
			this.wh = sysinfo.windowHeight - 50
			this.getCateList()
		}
	}
</script>

<style lang="scss" scoped>
	.container1{
		display: flex;
	}
.leftscroll{
width: 120px;
 .item{
line-height: 60px;
background-color: #f7f7f7;
text-align: center;
font-size: 12px;
 &.active{
	 background-color: #FFFFFF;
	 position: relative;
	  &::before {
		  content: '';
		  display: block;
		  width: 3px;
		  height: 30px;
		  background-color: #c00000;
		  position: absolute;
		  left: 0;
		  top: 50%;
		  transform: translateY(-50%);
	  }
 }
}
	
}
.rightscroll{
.title{
	font-weight: bold;
display: flex;
justify-content: center;
font-size: 12px;
}
.container{
	display: flex;
	flex-wrap: wrap;
margin: 0 20px;
.container-text{
	display: flex;
	width: 33%;
	flex-direction: column;
	margin-bottom: 10px;
	align-items: center;
	font-size: 10px;
	.innerpicture{
		 height: 50px;
		 width: 50px;
	}
}
}
}
</style>
