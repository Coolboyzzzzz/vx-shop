export default {
	namespaced: true,
	state: () => ({
		address: JSON.parse(uni.getStorageSync('address') ||'{}')
	}),
	mutations: {
		addressStorage (state,ad) {
			state.address = ad
			uni.setStorageSync('address',JSON.stringify(ad))
		}
	},
	getters: {}
}