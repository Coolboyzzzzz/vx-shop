export default {
	namespaced: true,
	state: () => ({
		cart: JSON.parse(uni.getStorageSync('cart') ||'[]'),
		all: true
	}),
	mutations: {
		addToCart(state, goods) {
			const findResult = state.cart.find( x => x.goods_id === goods.goods_id)
			if (!findResult) {
				state.cart.push(goods)
			} else {
				findResult.goods_count++
			}
			this.commit('m_cart/saveToStorage')
		},
		saveToStorage(state) {
			uni.setStorageSync('cart',JSON.stringify(state.cart))
		},
		updatacart (state,item) {
		const result = state.cart.find( x => x.goods_id === item.goods_id)
		result.goods_state = !result.goods_state
		this.commit('m_cart/saveToStorage')
		},
		updatanum (state,item) {
		const result = state.cart.find( x => x.goods_id === item.goods_id)
		result.goods_count = item.current
		this.commit('m_cart/saveToStorage')
		},
		deletegoods (state,id) {
			const result = state.cart.filter( x => x.goods_id !== id)
			state.cart = result
			this.commit('m_cart/saveToStorage')
		},
		checkedAll (state) {
			state.all = !state.all
			state.cart.forEach( x => {
				x.goods_state = state.all
			})
			this.commit('m_cart/saveToStorage')
		}
	},
	getters: {
		total(state) {
			let c = 0
			state.cart.forEach(goods => c += goods.goods_count)
			return c
		},
		sum (state) {
			let c = 0
			state.cart.filter( x => x.goods_state === true).forEach( price => c += price.goods_price * price.goods_count )
			return c.toFixed(2)
		},
		num (state) {
			let c = 0
			state.cart.filter( x => x.goods_state === true).forEach( x => c += x.goods_count)
			return c
		},
		status (state) {
			const result = state.cart.find( x => x.goods_state === false)
			if (result) {
				return false
			} else {
				return true
			}
		}
	}
}

 