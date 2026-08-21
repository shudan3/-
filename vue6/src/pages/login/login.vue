<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuth } from '../../stores/auth'

const { login } = useAuth()

const username = ref('')
const password = ref('')
const code = ref('')
const showPwd = ref(false)
const err = ref('')
const loading = ref(false)
const captcha = ref('')

// 生成验证码
function genCode() {
  captcha.value = Math.random().toString(36).slice(2, 6).toUpperCase()
}
onMounted(genCode)

function submit() {
  err.value = ''
  if (!username.value.trim()) { err.value = '请输入用户名'; return }
  if (!password.value) { err.value = '请输入密码'; return }
  if (password.value.length < 6) { err.value = '密码不能少于6位'; return }
  if (code.value.toLowerCase() !== captcha.value.toLowerCase()) { err.value = '验证码错误'; genCode(); return }
  loading.value = true
  setTimeout(() => {
    if (login(username.value.trim(), password.value)) {
      uni.showToast({ title: '登录成功', icon: 'success' })
      setTimeout(() => uni.switchTab({ url: '/pages/my/my' }), 600)
    } else {
      err.value = '用户名或密码错误'
    }
    loading.value = false
  }, 500)
}

function goReg() { uni.navigateTo({ url: '/pages/register/register' }) }
</script>

<template>
  <view class="page">
    <text class="title">登录</text>
    <text class="sub">欢迎回来，请登录你的账号</text>

    <view class="form">
      <input v-model="username" class="ipt" placeholder="用户名" />
      <view class="pwd-row">
        <input v-model="password" class="ipt" :type="showPwd ? 'text' : 'password'" placeholder="密码" />
        <text class="eye" @tap="showPwd = !showPwd">{{ showPwd ? '😶‍🌫️' : '👁‍🗨' }}</text>
      </view>
      <!-- 验证码 -->
      <view class="code-row">
        <input v-model="code" class="ipt" placeholder="验证码" maxlength="4" />
        <text class="captcha" @tap="genCode">{{ captcha }}</text>
      </view>
      <text v-if="err" class="err">{{ err }}</text>
      <view class="btn" @tap="submit">{{ loading ? '登录中...' : '登 录' }}</view>
    </view>

    <view class="foot">
      还没有账号？<text class="link" @tap="goReg">立即注册</text>
    </view>
  </view>
</template>

<style scoped>
.page { min-height: 100vh; background: #f5f5f5; padding: 0 40rpx; }
.title { font-size: 44rpx; font-weight: 700; color: #222; display: block; text-align: center; padding-top: 120rpx; }
.sub { font-size: 26rpx; color: #999; text-align: center; display: block; margin: 16rpx 0 60rpx; }

.form { background: #fff; border-radius: 20rpx; padding: 36rpx 32rpx; }
.ipt { width: 100%; padding: 28rpx 0; border-bottom: 1px solid #f0f0f0; font-size: 28rpx; color: #333; }
.pwd-row { position: relative; }
.eye { position: absolute; right: 0; top: 28rpx; font-size: 28rpx; }
.code-row { display: flex; align-items: center; gap: 20rpx; }
.code-row .ipt { flex: 1; }
.captcha {
  width: 160rpx; height: 64rpx; line-height: 64rpx; text-align: center;
  background: #f5f5f5; border-radius: 8rpx; font-size: 28rpx; color: #ff4d4f;
  font-weight: 700; letter-spacing: 4rpx; flex-shrink: 0;
}
.err { color: #ff4d4f; font-size: 24rpx; margin-top: 16rpx; display: block; }
.btn {
  width: 100%; margin-top: 44rpx; padding: 26rpx; border-radius: 48rpx;
  background: #ff4d4f; color: #fff; font-size: 32rpx; font-weight: 600; text-align: center;
}
.btn:active { opacity: 0.85; }

.foot { text-align: center; margin-top: 40rpx; font-size: 26rpx; color: #999; }
.link { color: #ff4d4f; font-weight: 500; margin-left: 6rpx; }
</style>
