<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useCart } from '../../stores/cart'
import { cats, goods } from '../../stores/products'
import ProductCard from '../../components/ProductCard.vue'


// 轮播
const banners = ['/static/image/banner1.jpg', '/static/image/banner2.jpg', '/static/image/banner3.jpg']

const active = ref('全部')
const keyword = ref('')

onMounted(() => console.log('首页加载完成'))
watch(keyword, (val) => console.log('搜索:', val))

const list = computed(() => {
  let g = active.value === '全部' ? [...goods.value] : goods.value.filter(g => g.cat === active.value)
  if (keyword.value.trim()) g = g.filter(g => g.name.includes(keyword.value.trim()))
  return g
})

function pick(cat: string) { active.value = cat }
function goCart() { uni.switchTab({ url: '/pages/cart/cart' }) }
</script>

<template>
  <view class="page">
    <!-- 顶栏 -->
    <view class="top">
      <text class="logo"> 二手商城</text>
      <input class="search" v-model="keyword" placeholder="搜索商品......" />
      <text class="cart" @tap="goCart">
        <uni-icons type="cart-filled" size="20" color="#B8E1FF" />
      </text>
    </view>

    <!-- 轮播 -->
    <swiper class="swiper" circular autoplay :interval="3000" duration="400">
      <swiper-item v-for="(src, i) in banners" :key="i">
        <image :src="src" mode="aspectFill" style="width:100%;height:100%" />
      </swiper-item>
    </swiper>

    <!-- 分类 -->
    <view class="cate-title">商品分类</view>
    <view class="cate-wrap">
      <view v-for="c in cats" :key="c.name" class="cate" :class="{ on: active === c.name }" @tap="pick(c.name)">
        <uni-icons :type="c.icon" size="20" color="#B8E1FF" />
        <text class="cate-name">{{ c.name }}</text>
      </view>
    </view>

    <!-- 商品 -->
    <view class="title">{{ active === '全部' ? '🔥 热门推荐' : active }}</view>
    <view class="list">
      <ProductCard v-for="p in list" :key="p.id" :product="p" />
      <text v-if="!list.length" class="none">暂无商品</text>
    </view>
  </view>
</template>

<style scoped>
.page { min-height: 100vh; background: #f5f5f5; padding-bottom: 30rpx; }

.top {
  display: flex; align-items: center; gap: 16rpx; padding: 16rpx 24rpx;
  background: #fff; position: sticky; top: 0; z-index: 99;
}
.logo { font-size: 30rpx; font-weight: 700; color: #B8E1FF; flex-shrink: 0; }
.search { flex: 1; padding: 14rpx 20rpx; background: #f5f5f5; border-radius: 40rpx; font-size: 26rpx; }
.cart { font-size: 40rpx; position: relative; }
.dot {
  position: absolute; top: -6rpx; right: -12rpx;
  width: 30rpx; height: 30rpx; background: #ff4d4f; color: #fff;
  font-size: 18rpx; border-radius: 50%; text-align: center; line-height: 30rpx;
}
.swiper { width: 100%; height: 340rpx; }

.cate-title { font-size: 30rpx; font-weight: 600; padding: 20rpx 24rpx 0; }
.cate-wrap {
  display: flex; flex-wrap: wrap; margin: 16rpx 24rpx;
  background: #fff; border-radius: 16rpx; padding: 8rpx 0;
}
.cate { width: 25%; text-align: center; padding: 18rpx 0; display: flex; flex-direction: column; align-items: center; gap: 8rpx; }
.cate.on { background: #fff0f0; border-radius: 12rpx; }
.cate.on .cate-name { color: #ff4d4f; font-weight: 600; }
.cate-name { font-size: 22rpx; color: #666; }

.title { font-size: 30rpx; font-weight: 600; padding: 24rpx 24rpx 16rpx; }
.list { display: flex; flex-wrap: wrap; gap: 16rpx; padding: 0 24rpx; }
.none { width: 100%; text-align: center; padding: 60rpx 0; color: #ccc; font-size: 26rpx; }
</style>
