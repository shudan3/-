<script setup lang="ts">
	import { ref, onMounted } from 'vue'
	import { useAuth } from '../../stores/auth'

	const { register } = useAuth()

	const username = ref('')
	const phone = ref('')
	const password = ref('')
	const confirmPwd = ref('')
	const code = ref('')
	const showPwd = ref(false)
	const showConfirm = ref(false)
	const err = ref('')
	const loading = ref(false)
	const captcha = ref('')

	function genCode() {
		captcha.value = Math.random().toString(36).slice(2, 6).toUpperCase()
	}
	onMounted(genCode)

	function submit() {
		err.value = ''
		if (!username.value.trim()) { err.value = '请输入用户名'; return }
		if (username.value.trim().length < 2) { err.value = '用户名至少2个字符'; return }
		if (!phone.value.trim()) { err.value = '请输入手机号'; return }
		if (!/^1[3-9]\d{9}$/.test(phone.value.trim())) { err.value = '请输入正确的手机号'; return }
		if (!password.value) { err.value = '请输入密码'; return }
		if (password.value.length < 6) { err.value = '密码不能少于6位'; return }
		if (password.value !== confirmPwd.value) { err.value = '两次输入的密码不一致'; return }
		if (code.value.toLowerCase() !== captcha.value.toLowerCase()) { err.value = '验证码错误'; genCode(); return }
		loading.value = true
		setTimeout(() => {
			if (register(username.value.trim(), password.value, phone.value.trim())) {
				uni.showToast({ title: '注册成功', icon: 'success' })
				setTimeout(() => uni.switchTab({ url: '/pages/my/my' }), 600)
			} else {
				err.value = '用户名已存在'
			}
			loading.value = false
		}, 500)
	}

	function goLogin() { uni.navigateTo({ url: '/pages/login/login' }) }
</script>

<template>
	<view class="page">
		<text class="title">注册</text>
		<text class="sub">创建账号，开启购物之旅</text>

		<view class="form">
			<input v-model="username" class="ipt" placeholder="用户名" />
			<input v-model="phone" class="ipt" type="number" placeholder="手机号" maxlength="11" />
			<view class="pwd-row">
				<input v-model="password" class="ipt" :type="showPwd ? 'text' : 'password'" placeholder="设置密码（至少6位）" />
				<text class="eye" @tap="showPwd = !showPwd">{{ showPwd ? '🙈' : '👁️' }}</text>
			</view>
			<view class="pwd-row">
				<input v-model="confirmPwd" class="ipt" :type="showConfirm ? 'text' : 'password'"
					placeholder="再次输入密码" />
				<text class="eye" @tap="showConfirm = !showConfirm">{{ showConfirm ? '🙈' : '👁️' }}</text>
			</view>
			<view class="code-row">
				<input v-model="code" class="ipt" placeholder="验证码" maxlength="4" />
				<text class="captcha" @tap="genCode">{{ captcha }}</text>
			</view>
			<text v-if="err" class="err">{{ err }}</text>
			<view class="btn" @tap="submit">{{ loading ? '注册中...' : '注 册' }}</view>
		</view>

		<view class="foot">
			已有账号？<text class="link" @tap="goLogin">立即登录</text>
		</view>
	</view>
</template>

<style scoped>
	.page {
		min-height: 100vh;
		background: #f5f5f5;
		padding: 0 40rpx;
	}

	.title {
		font-size: 44rpx;
		font-weight: 700;
		color: #222;
		display: block;
		text-align: center;
		padding-top: 100rpx;
	}

	.sub {
		font-size: 26rpx;
		color: #999;
		text-align: center;
		display: block;
		margin: 16rpx 0 52rpx;
	}

	.form {
		background: #fff;
		border-radius: 20rpx;
		padding: 28rpx 32rpx 36rpx;
	}

	.ipt {
		width: 100%;
		padding: 26rpx 0;
		border-bottom: 1px solid #f0f0f0;
		font-size: 28rpx;
		color: #333;
	}

	.pwd-row {
		position: relative;
	}

	.eye {
		position: absolute;
		right: 0;
		top: 26rpx;
		font-size: 28rpx;
	}

	.code-row {
		display: flex;
		align-items: center;
		gap: 20rpx;
	}

	.code-row .ipt {
		flex: 1;
	}

	.captcha {
		width: 160rpx;
		height: 60rpx;
		line-height: 60rpx;
		text-align: center;
		background: #f5f5f5;
		border-radius: 8rpx;
		font-size: 28rpx;
		color: #ff4d4f;
		font-weight: 700;
		letter-spacing: 4rpx;
		flex-shrink: 0;
	}

	.err {
		color: #ff4d4f;
		font-size: 24rpx;
		margin-top: 16rpx;
		display: block;
	}

	.btn {
		width: 100%;
		margin-top: 40rpx;
		padding: 26rpx;
		border-radius: 48rpx;
		background: #ff4d4f;
		color: #fff;
		font-size: 32rpx;
		font-weight: 600;
		text-align: center;
	}

	.btn:active {
		opacity: 0.85;
	}

	.foot {
		text-align: center;
		margin-top: 36rpx;
		font-size: 26rpx;
		color: #999;
	}

	.link {
		color: #ff4d4f;
		font-weight: 500;
		margin-left: 6rpx;
	}
</style>