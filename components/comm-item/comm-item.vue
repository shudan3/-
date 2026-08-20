<template>
	<view class="head">
		<view class="head-name">
			<slot name="name"></slot>
		</view>
		<view class="head-time">
			<slot name="time"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		name:"comm-item",
		
	}
</script>

<style scoped>
.head{
	display: flex;
	justify-content: space-between;
	align-items: center;
}
.head-name{
	margin-left: 20rpx;
}
.head-time{
	margin-right: 20rpx;
}
</style>