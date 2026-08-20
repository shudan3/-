<template>
	<view class="layout">
		<view class="naver">
			<view class="statusBar" :style="{ height: getTitleBarHeight() + 'px' }"></view>
			<view class="titleBar" >
				<view class="title">{{title}}</view>
				<navigator url="/pages/search/search" class="search">
					<uni-icons class="icon" type="search" size="20"></uni-icons>
					<span class="span">搜索</span>
				</navigator>
			</view>
		</view>
		<view class="fill" :style="{height:tipbotomm()+'px'}"></view>
	</view>
</template>

<script setup>
import {getTitleBarHeight,tipbotomm} from '../../util/System.js'
defineProps({
	title:{
		type:String,
		default:"标题"
	}
})

</script>
<style scoped lang="scss">
.layout {
	.naver {
	position: fixed;
	top: 0rpx;
	left: 0rpx;
	width: 100%;
	z-index: 10;
	background:
	linear-gradient(to bottom,rgba(0,0,0,0),#fff 200rpx),
	linear-gradient(to right,#beecd8 20%,#F4E2D8);
		.titleBar {
			display: flex;
			align-items: center;
			.title {
				margin-left: 30rpx;
				font-size: 40rpx;
			}
			.search {
				margin-left: 20rpx;
				width: 200rpx;
				height: 3vh;
				background-color: rgba(0, 0, 0, 0.3);
				border-radius: 180rpx;
				display: flex;
				align-items: center;
				justify-content: start;
				.icon {
					margin-left: 10rpx;
				}
				.span{
					margin-left:10rpx;
				}
			}
		}
	}
}
</style>