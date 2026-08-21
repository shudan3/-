<script setup lang="ts">
import { ref, watch } from 'vue'
import { useAuth } from '../../stores/auth'

const { isLoggedIn, user, logout, updateProfile } = useAuth()

const form = ref({ username: '', phone: '', email: '', signature: '' })
const isEditing = ref(false)
const saved = ref(false)

watch(user, (u) => {
  if (u) {
    form.value = { username: u.username, phone: u.phone, email: u.email || '', signature: u.signature || '' }
  }
}, { immediate: true })

function goLogin() { uni.navigateTo({ url: '/pages/login/login' }) }

function startEdit() { isEditing.value = true; saved.value = false }
function cancelEdit() {
  if (user.value) {
    form.value = { username: user.value.username, phone: user.value.phone, email: user.value.email || '', signature: user.value.signature || '' }
  }
  isEditing.value = false
}
function saveProfile() {
  if (!form.value.username.trim()) return
  updateProfile({ username: form.value.username.trim(), phone: form.value.phone.trim(), email: form.value.email.trim(), signature: form.value.signature.trim() })
  isEditing.value = false
  saved.value = true
  setTimeout(() => { saved.value = false }, 2000)
}
function handleLogout() { logout() }
</script>

<template>
  <view class="my-page">
    <!-- 未登录 -->
    <view v-if="!isLoggedIn" class="unlogin">
      <view class="unlogin-avatar">👤</view>
      <text class="unlogin-text">登录后管理你的个人信息</text>
      <view class="login-btn" @tap="goLogin">立即登录 / 注册</view>
    </view>

    <!-- 已登录 -->
    <view v-else class="logined">
      <view class="avatar-section">
        <view class="avatar-circle">👤</view>
        <text class="display-name">{{ user?.username }}</text>
      </view>

      <view class="form-card">
        <view class="form-header">
          <text class="form-title">个人信息</text>
          <text v-if="!isEditing" class="edit-toggle" @tap="startEdit">编辑</text>
        </view>

        <text v-if="saved" class="save-tip">✅ 保存成功</text>

        <!-- 用户名 -->
        <view class="field-row">
          <text class="field-label">用户名</text>
          <input v-if="isEditing" v-model="form.username" class="field-input" placeholder="请输入用户名" />
          <text v-else class="field-value">{{ form.username }}</text>
        </view>

        <!-- 手机号 -->
        <view class="field-row">
          <text class="field-label">手机号</text>
          <input v-if="isEditing" v-model="form.phone" class="field-input" type="number" placeholder="请输入手机号" maxlength="11" />
          <text v-else class="field-value">{{ form.phone || '未设置' }}</text>
        </view>

        <!-- 邮箱 -->
        <view class="field-row">
          <text class="field-label">邮 箱</text>
          <input v-if="isEditing" v-model="form.email" class="field-input" type="text" placeholder="请输入邮箱地址" />
          <text v-else class="field-value">{{ form.email || '未设置' }}</text>
        </view>

        <!-- 签名 -->
        <view class="field-row signature-row">
          <text class="field-label">个性签名</text>
          <textarea v-if="isEditing" v-model="form.signature" class="field-textarea" placeholder="写一句你的个性签名..." maxlength="100" />
          <text v-else class="field-value signature-text">{{ form.signature || '未设置' }}</text>
        </view>

        <view v-if="isEditing" class="edit-actions">
          <view class="save-btn" @tap="saveProfile">保存</view>
          <view class="cancel-btn" @tap="cancelEdit">取消</view>
        </view>
      </view>

      <view class="logout-section">
        <view class="logout-btn" @tap="handleLogout">退出登录</view>
      </view>
    </view>
  </view>
</template>

<style scoped>
.my-page { min-height: 100vh; display: flex; flex-direction: column; align-items: center; padding: 0 24rpx 80rpx; background: #f5f5f5; }

.unlogin { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 70vh; }
.unlogin-avatar { width: 160rpx; height: 160rpx; border-radius: 50%; background: #fff; display: flex; align-items: center; justify-content: center; font-size: 80rpx; margin-bottom: 36rpx; box-shadow: 0 4rpx 24rpx rgba(0,0,0,0.06); }
.unlogin-text { font-size: 26rpx; color: #999; margin-bottom: 50rpx; }
.login-btn { padding: 22rpx 88rpx; border-radius: 44rpx; background: linear-gradient(135deg, #ff4d4f, #ff6b6b); color: #fff; font-size: 30rpx; font-weight: 500; }

.logined { width: 100%; padding-top: 50rpx; }
.avatar-section { display: flex; flex-direction: column; align-items: center; padding: 50rpx 0 40rpx; }
.avatar-circle { width: 150rpx; height: 150rpx; border-radius: 50%; background: linear-gradient(135deg, #ff4d4f, #ff6b6b); display: flex; align-items: center; justify-content: center; font-size: 74rpx; margin-bottom: 24rpx; box-shadow: 0 8rpx 32rpx rgba(255,77,79,0.25); }
.display-name { font-size: 38rpx; font-weight: 600; color: #222; }

.form-card { width: 100%; background: #fff; border-radius: 24rpx; padding: 32rpx 30rpx; box-shadow: 0 2rpx 16rpx rgba(0,0,0,0.04); }
.form-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 28rpx; padding-bottom: 24rpx; border-bottom: 1px solid #f0f0f0; }
.form-title { font-size: 30rpx; font-weight: 600; color: #222; }
.edit-toggle { padding: 8rpx 28rpx; border: 1px solid #ff4d4f; border-radius: 26rpx; color: #ff4d4f; font-size: 24rpx; }
.save-tip { text-align: center; font-size: 26rpx; color: #52c41a; margin-bottom: 20rpx; display: block; }

.field-row { display: flex; align-items: center; padding: 26rpx 0; border-bottom: 1px solid #f7f7f7; }
.field-row:last-of-type { border-bottom: none; }
.field-label { width: 130rpx; font-size: 26rpx; color: #999; flex-shrink: 0; }
.field-value { font-size: 26rpx; color: #333; }
.field-input { flex: 1; border: 1px solid #e8e8e8; border-radius: 14rpx; padding: 14rpx 20rpx; font-size: 26rpx; color: #333; background: #fafafa; }
.field-textarea { flex: 1; border: 1px solid #e8e8e8; border-radius: 14rpx; padding: 14rpx 20rpx; font-size: 26rpx; color: #333; background: #fafafa; min-height: 120rpx; }
.signature-row { align-items: flex-start; }
.signature-text { flex: 1; line-height: 1.6; }

.edit-actions { display: flex; gap: 20rpx; margin-top: 36rpx; padding-top: 28rpx; border-top: 1px solid #f0f0f0; }
.save-btn { flex: 1; padding: 20rpx; border-radius: 40rpx; background: #ff4d4f; color: #fff; font-size: 28rpx; font-weight: 500; text-align: center; }
.cancel-btn { flex: 1; padding: 20rpx; border: 1px solid #e0e0e0; border-radius: 40rpx; background: #fff; color: #666; font-size: 28rpx; text-align: center; }

.logout-section { margin-top: 60rpx; text-align: center; }
.logout-btn { display: inline-block; padding: 20rpx 72rpx; border: 1px solid #e0e0e0; border-radius: 40rpx; background: #fff; font-size: 26rpx; color: #999; }
</style>
