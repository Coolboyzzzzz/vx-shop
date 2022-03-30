<template>
	<view class="goodslist">
		<my-address></my-address>
		<view class="container-title">
			<uni-icons type="shop"></uni-icons>
			<text>购物车</text>
		</view>
		<view v-if='JSON.stringify(cart) !== "[]"'>
		<uni-swipe-action>
		<block v-for="(item,i) in cart" :key='i' >
			<uni-swipe-action-item :right-options="options" @click="swipeActionClickHandler(item)">
		<my-goods :item='item' @upDatanumber='updatenum' @click='gotodetail(item)' @change-radio='changestate'></my-goods>
		</uni-swipe-action-item>
		</block>
			</uni-swipe-action>
				<my-settle></my-settle>
		</view>
  <view class="empty-cart" v-else>
    <image src="../../static/tab_icons/cart.png" class="empty-img"></image>
    <text class="tip-text">空空如也~</text>
  </view>
	</view>

</template>

<script>
import badgeMix from '@/mixins/tabbar-badge.js'
import { mapState,mapMutations } from 'vuex'

export default {
	
	mixins: [badgeMix],
	data() {
		return{
			    options: [{
			      text: '删除', // 显示的文本内容
			      style: {
			        backgroundColor: '#C00000' // 按钮的背景颜色
			      }
			    }]
		}
	},
	computed: {
		...mapState('m_cart',['cart'])
	},
	methods: {
		...mapMutations('m_cart',['updatacart','updatanum','deletegoods']),
		gotodetail(e) {
			uni.navigateTo({
				url: '../../subpkg/goods_detail/goods_detail?goods_id=' + e.goods_id
			})

		},
		changestate (e) {
			this.updatacart(e)
		},
		updatenum(e){
			this.updatanum(e)
			this.setBadge()
		},
		swipeActionClickHandler (e) {
			this.deletegoods(e.goods_id)
		}
			
		}

}
</script>

<style lang="scss" scoped>
.container-title{
line-height: 30px;
font-size: 12px;
border-bottom: 1px solid #cecece;
.uni-icons{
	margin:0 5px;
}
}
.goodslist{
	padding: 0 0 50px 0;
}
.empty-cart {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 150px;

  .empty-img {
    width: 90px;
    height: 90px;
  }

  .tip-text {
    font-size: 12px;
    color: gray;
    margin-top: 15px;
  }
}
</style>
