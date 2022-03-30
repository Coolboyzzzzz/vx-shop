<template>
	<view class="bottom">
		<label class="radio" @click="allCheck">
			<radio :checked="status" /><text>全选</text>
		</label>
		<text>合计:<text style="color: #c00000;">￥{{sum}}</text></text>
		<view class="jiesuan" @click="submit">
			结算({{num}})
		</view>
		<block v-if="show">
		<view class="pay">
			<view class="title">
				<text>小牛牛，请支付:</text>
			</view>
			<image class="info" src="../../static/c228359e2100a06326018fe2113219b.jpg" mode="widthFix"></image>
			<view class="butt">
				<button type="primary" size="mini" @click="pay">我已支付</button>
				<button type="warn" size="mini" @click="nopay">算子，太贵了</button>
			</view>
		</view>
		</block>
	</view>
</template>

<script>
	import { mapState,mapGetters,mapMutations } from 'vuex'
	export default {
		name:"my-settle",
		computed: {
		...mapState('m_cart',['cart']),
		...mapState('m_address',['address']),
		...mapState('m_users',['token']),
		...mapGetters('m_cart',['sum','num','status'])
		},
		data() {
			return {
				show: false
			};
		},
		methods: {
			...mapMutations('m_cart',['checkedAll']),
			submit () {
			if ( this.num === 0) {
				uni.$showMsg('请选择商品')
			} else if ( JSON.stringify(this.address) === "{}"){
				uni.$showMsg('请选择地址地址')
			} else if (JSON.stringify(this.token) === '{}'){
				uni.$showMsg('请先登录')
				let c = 3
				const timer = setInterval(()=>{
					uni.showToast({
					    icon: 'none',
					    // 提示的消息
					    title: '请登录后再结算！' + c + ' 秒后自动跳转到登录页',
					    // 为页面添加透明遮罩，防止点击穿透
					    mask: true,
					    // 1.5 秒后自动消失
					    duration: 1500
					})
					c--
					if (c < 0) {
					clearInterval(timer)
					uni.switchTab({
						url: '../../pages/my/my'
					})
					}
				},1000)
			} else {
this.show = true
			}
			
			},
		allCheck() {
			this.checkedAll()
		},
		pay() {
			uni.showModal({
				title:'警告',
				content: '我信你个鬼，赶紧去支付'
			})
		},
		async nopay () {
			const [err,succ] = await uni.showModal({
				title:'警告',
				content: '穷逼，赶紧去死吧'
			}).catch(err => err)
this.show = false
		}
		}
	}
</script>

<style lang="scss">
.bottom{
	position: fixed;
	bottom:0;
	left: 0;
	width: 100%;
	  height: 50px;
	  background-color: #FFFFFF;
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	  font-size: 14px;
}
.jiesuan{
	width: 70px;
	height: 100%;
	background-color: #c00000;
	text-align: center;
	line-height: 50px;
}
.pay{
	position: fixed;
	top: 50%;
	left: 50%;
	width: 60%;
	transform: translate(-50%,-50%);
	height: 70%;
	display: flex;
	flex-direction: column;
	justify-content: space-around;
	align-items: center;
	background-color: #f3f3f3;
	.title{
		font-size: 20px;
		color: #c00000;
	}
	.info{
		width: 80%;
	}
}
</style>
