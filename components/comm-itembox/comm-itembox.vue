<template>
	<view class="themeitem">
			<navigator :url="'/pages/classifylist/classifylist?id='+items._id+'&name='+items.name" class="box"  v-if="!isMort">
					<image class="pic" :src="items.picurl"></image>
					<view class="top">{{getTimeDiff(items.updateTime)}}更新</view>
					<view class="bottom">{{items.name}}</view>
			</navigator>
			<navigator url="/pages/classify/classify" open-type="reLaunch" class="box more" v-if="isMort">
					<image class="pic" src="/common/imgeas/more.png"></image>
					<view class="back">
						<uni-icons color="#fff" type="more-filled" size="50"></uni-icons>
						<view class="lattext">加载更多</view>
						</view>
			</navigator>
	</view>
	
</template>

<script setup>
import { ref } from 'vue';
import {getTimeDiff} from '@/util/common.js'
	//父类传值
const calssfiylist=ref([])
defineProps({
	isMort:{
		type:Boolean,
		default:false,
	},
	items:{
		type:Object,
		default(){
			return{
				name:"默认名称",
				picurl:"https://mp-0cb878b7-99ec-44ea-8246-12b123304b05.cdn.bspapp.com/xxmBizhi/20231010/1696900747351_2102.jpg",
				updateTime:Date.now()-1000*60*60*5
			}
		}
	}
})
</script>

<style scoped lang="scss">

		.pic{
			width: 100%;
		}
		.box{
			position: relative;
		}
		.top{
			padding-left: 10rpx;
			position: absolute;
			top:0;
			font-size: 20rpx;
			background-color: rgb(250,129,90,0.7);
			border-radius: 0 0 5rpx 0;
			overflow: hidden;
			color: #fff;
			
		}
		.bottom{
			width: 100%;
			position: absolute;
			bottom: 10rpx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 35rpx; 
			background-color: rgb(0, 0, 0,0.2);
			color: #fff;
			backdrop-filter: blur(20rpx);
		}
		.back{
				position: absolute;
				top: 0;
				left: 0;
				width: 100%;
				height: 100%;
				background-color: rgb(0, 0, 0,0.2);
				backdrop-filter: blur(20rpx);
				display: flex;
				align-items: center;
				justify-content: center;
				flex-direction: column;
			}
</style>