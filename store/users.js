export default {
	namespaced: true,
	state: () => ({
  // 收货地址
  // address: {}
  address: JSON.parse(uni.getStorageSync('address') || '{}'),
  // 登录成功之后的 token 字符串
  token: {},
  // 用户的基本信息
  userinfo: JSON.parse(uni.getStorageSync('userinfo') || '{}')
	}),
	mutations:{
		updateUserInfo (state,user) {
			state.userinfo = user
			this.commit('m_users/savestorage')
		},
		savestorage (state) {
			uni.setStorageSync('userinfo',JSON.stringify(state.userinfo))
		},
		updateToken (state,obj) {
			state.token = obj
		},
		updateadd (state,obj) {
			state.address = obj
		}		
	},
	getters:{}
}