<script setup lang="ts">
import { ref, computed } from 'vue'
import { cats, goods } from '../../stores/products'
import ProductCard from '../../components/ProductCard.vue'

const active = ref('手机数码')
const list = computed(() => goods.value.filter(g => g.cat === active.value))

function pick(cat: string) { active.value = cat }
</script>

<template>
  <view class="page">
    <!-- 头部筛选 -->
    <scroll-view scroll-x class="tabs" :show-scrollbar="false">
      <text
        v-for="c in cats" :key="c.name"
        class="tab" :class="{ on: active === c.name }"
        @tap="pick(c.name)"
      ><uni-icons :type="c.icon" size="20" color="#999" /> {{ c.name }}</text>
    </scroll-view>

    <!-- 商品列表 -->
    <view class="list">
      <ProductCard v-for="p in list" :key="p.id" :product="p" />
      <text v-if="!list.length" class="none">暂无商品</text>
    </view>
  </view>
</template>

<style scoped>
.page { min-height: 100vh; background: #f5f5f5; }

.tabs {
  white-space: nowrap; padding: 20rpx 24rpx; background: #fff;
  position: sticky; top: 0; z-index: 99;
}
.tab {
  display: inline-block; padding: 12rpx 24rpx; border-radius: 28rpx;
  font-size: 24rpx; color: #666; margin-right: 12rpx; background: #f5f5f5;
}
.tab.on { background: #ff4d4f; color: #fff; }

.list { display: flex; flex-wrap: wrap; gap: 16rpx; padding: 20rpx 24rpx; }
.none { width: 100%; text-align: center; padding: 60rpx 0; color: #ccc; font-size: 26rpx; }
</style>
