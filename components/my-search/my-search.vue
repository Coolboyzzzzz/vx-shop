<template>
	<view class="my-search-container">
	<view class="my-search-box" :style="{'border-radius': radius + 'px'}" @click="searchBoxhandle">
	<uni-icons type="search" size="17"></uni-icons>
<view class="placeholder">搜索</view>
	</view>
		</view>
</template>

<script>
	export default {
		name:"my-search",
		props: {
			bgcolor: {
				type: String,
				default:'#c00000'
			},
			radius: {
				type: Number,
				default: 18
			}
		},
		data() {
			return {
				
			};
		},
		methods: {
			searchBoxhandle () {
				this.$emit('click')
			}
		}
	}
</script>

<style lang="scss" scoped>
.my-search-container{
	height: 40px;
	padding:5px 0;
	display: flex;
	align-items: center;
	background-color: #c00000;
}
.my-search-box {
	height: 36px;
	background-color: #FFFFFF;
	width: 100%;
	display: flex;
	align-items: center;
	justify-content: center;
}
.placeholder{
	font-size: 15px;
	margin-left: 5px;
}
</style>
