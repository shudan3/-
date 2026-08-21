<script setup lang="ts">
import { useCart } from '../../stores/cart'

const { items, totalPrice, removeFromCart, updateQuantity } = useCart()
</script>

<template>
  <view class="cart-page">
    <view class="cart-header">
      <text class="cart-title">  <uni-icons type="cart-filled" size="20" color="#B8E1FF" />购物车</text>
    </view>

    <!-- 空 -->
    <view v-if="items.length === 0" class="empty-cart">
      <text class="empty-icon"><uni-icons type="cart-filled" size="30" color="#B8E1FF" /></text>
      <text class="empty-text">购物车是空的</text>
      <text class="empty-hint">去首页逛逛吧</text>
    </view>

    <!-- 列表 -->
    <view v-else class="cart-list">
      <view v-for="item in items" :key="item.id" class="cart-item">
        <image class="cart-item-img" :src="item.img" mode="aspectFill" />
        <view class="cart-item-info">
          <text class="cart-item-name">{{ item.name }}</text>
          <text class="cart-item-price">¥{{ item.price }}</text>
        </view>
        <view class="cart-item-qty">
          <text class="qty-btn" @tap="updateQuantity(item.id, item.quantity - 1)">−</text>
          <text class="qty-num">{{ item.quantity }}</text>
          <text class="qty-btn" @tap="updateQuantity(item.id, item.quantity + 1)">+</text>
        </view>
        <text class="cart-item-del" @tap="removeFromCart(item.id)">🗑️</text>
      </view>

      <view class="cart-footer">
        <text class="total-label">合计：<text class="total-price">¥{{ totalPrice }}</text></text>
      </view>
    </view>
  </view>
</template>

<style scoped>
.cart-page { min-height: 100vh; background: #f5f5f5; }
.cart-header { padding: 24rpx 32rpx; background: #fff; }
.cart-title { font-size: 34rpx; font-weight: 600; color: #222; }

.empty-cart { display: flex; flex-direction: column; align-items: center; padding: 200rpx 0; }
.empty-icon { font-size: 120rpx; margin-bottom: 24rpx; }
.empty-text { font-size: 30rpx; color: #666; margin-bottom: 12rpx; }
.empty-hint { font-size: 24rpx; color: #bbb; }

.cart-list { padding: 16rpx 20rpx; }
.cart-item { display: flex; align-items: center; gap: 20rpx; background: #fff; border-radius: 20rpx; padding: 24rpx; margin-bottom: 14rpx; }
.cart-item-img { width: 120rpx; height: 120rpx; border-radius: 12rpx; flex-shrink: 0; background: #f5f5f5; }
.cart-item-info { flex: 1; min-width: 0; }
.cart-item-name { font-size: 26rpx; font-weight: 500; color: #333; display: block; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; margin-bottom: 8rpx; }
.cart-item-price { font-size: 28rpx; font-weight: 700; color: #ff4d4f; }
.cart-item-qty { display: flex; align-items: center; gap: 12rpx; }
.qty-btn { width: 44rpx; height: 44rpx; border: 1px solid #e0e0e0; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 28rpx; color: #666; }
.qty-num { font-size: 26rpx; font-weight: 500; min-width: 36rpx; text-align: center; }
.cart-item-del { font-size: 32rpx; padding: 8rpx; }
.cart-footer { text-align: right; padding: 32rpx 8rpx; }
.total-label { font-size: 30rpx; color: #333; }
.total-price { color: #ff4d4f; font-size: 36rpx; font-weight: 700; }
</style>
