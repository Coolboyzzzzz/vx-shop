import Vue from 'vue'
import Vuex from 'vuex'
import moduleCart from '@/store/cart.js'
import m_address from '@/store/m_address.js'
import users from '@/store/users.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    // 挂载购物车的 vuex 模块，模块内成员的访问路径被调整为 m_cart，例如：
    // 购物车模块中 cart 数组的访问路径是 m_cart/cart
    'm_cart': moduleCart,
	'm_address': m_address,
	'm_users': users	
  }
})

export default store
