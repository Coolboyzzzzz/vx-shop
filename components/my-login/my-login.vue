<template>
	<view class="login-container">
		<!-- 提示登录的图标 -->
		<uni-icons type="contact-filled" size="100" color="#AFAFAF"></uni-icons>
		<!-- 登录按钮 -->
		<button type="primary" class="btn-login" @click="handle12">一键登录</button>
		<!-- 登录提示 -->
		<view class="tips-text">登录后尽享更多权益</view>
	</view>
</template>

<script>
	import {
		mapMutations,mapState
	} from 'vuex'
	export default {
		name: "my-login",
		computed: {
			...mapState('m_users',['token'])
		},
		data() {
			return {

			};
		},
		methods: {
			...mapMutations('m_users', ['updateUserInfo','updateToken']),
			async getToken(info) {
				const [err, res] = await uni.login().catch(err => err)
				const query = {
						code: res.code,
						encryptedData: info.encryptedData,
						iv: info.iv,
						rawData: info.rawData,
						signature: info.signature
					}
					const { data: loginResult } = await uni.$http.post('/api/public/v1/users/wxlogin', query)
					uni.$showMsg('登陆成功')
					this.updateToken(query)
					console.log(this.token)
			},
			handle12 () {
				    wx.getUserProfile({
				      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
				      success: (res) => {
						this.updateUserInfo(res.userInfo)
						this.getToken(res)
				      }
				    })
			}

		}
	}
</script>

<style lang="scss">
	.login-container {
		// 登录盒子的样式
		height: 750rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		background-color: #f8f8f8;
		position: relative;
		overflow: hidden;

		// 绘制登录盒子底部的半椭圆造型
		&::after {
			content: ' ';
			display: block;
			position: absolute;
			width: 100%;
			height: 40px;
			left: 0;
			bottom: 0;
			background-color: white;
			border-radius: 100%;
			transform: translateY(50%);
		}

		// 登录按钮的样式
		.btn-login {
			width: 90%;
			border-radius: 100px;
			margin: 15px 0;
			background-color: #c00000;
		}

		// 按钮下方提示消息的样式
		.tips-text {
			font-size: 12px;
			color: gray;
		}
	}
</style>
