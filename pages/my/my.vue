<template>
	<view class="my-container">
		<my-login v-if='JSON.stringify(token) === "{}"'></my-login>
		<my-userinfo v-else></my-userinfo>
	</view>
</template>

<script>
	import mix from '../../mixins/tabbar-badge.js'
	import { mapState } from 'vuex'
	export default {
		mixins:[mix],
		data() {
			return {
			};
		},
		computed: {
			...mapState('m_users',['token'])
		}
	}
</script>

<style lang="scss">
page,
.my-container {
  height: 100%;
}
</style>
