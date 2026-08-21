<script setup lang="ts">
import { useCart } from '../stores/cart'
import type { Product } from '../stores/products'

defineProps<{ product: Product }>()

const { addToCart } = useCart()

function add(p: Product) {
  addToCart({ id: p.id, name: p.name, price: p.price, img: p.img })
  uni.showToast({ title: '已加入购物车', icon: 'success', duration: 1200 })
}
</script>

<template>
  <view class="card">
    <image :src="product.img" mode="aspectFill" class="card-img" />
    <view class="card-info">
      <text class="card-name">{{ product.name }}</text>
      <view class="card-row">
        <text class="price">¥{{ product.price }}</text>
      </view>
      <text class="cart-add" @tap.stop="add(product)">+</text>
    </view>
  </view>
</template>

<style scoped>
.card { width: calc(50% - 8rpx); background: #fff; border-radius: 16rpx; overflow: hidden; }
.card-img { width: 100%; height: 260rpx; display: block; }
.card-info { padding: 14rpx 16rpx 16rpx; position: relative; }
.card-name {
  font-size: 24rpx; font-weight: 500; color: #333;
  display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical;
  overflow: hidden; line-height: 1.4;
}
.card-row { display: flex; align-items: baseline; gap: 8rpx; margin-top: 8rpx; }
.price { font-size: 28rpx; font-weight: 700; color: #ff4d4f; }
.cart-add {
  position: absolute; right: 16rpx; bottom: 16rpx;
  width: 42rpx; height: 42rpx; border-radius: 50%; background: #ff4d4f;
  color: #fff; font-size: 30rpx; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
}
</style>
