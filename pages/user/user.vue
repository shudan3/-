<template>
	<view class="userbox pageback" v-if="resdata">
		<view class="userhead">
			<view :style="{ height: getTitleBarHeight() + 'px' }"></view>
			<view class="userImage">
				<image src="/static/xxmLogo.png" mode=""></image>
			</view>
			
			<view class="userName">
				{{resdata.IP}}
			</view>
			<view class="userAddre">
				{{resdata.address.province||resdata.address.city||resdata.address.country}}
			</view>
		</view>
		
	
		<view class="userbody">
			<view class="userbodytop" >
				<navigator url="/pages/classifylist/classifylist?name=我的下载&type=download">
				<view class="item" >
					<view class="textleft">
					    <uni-icons type="download-filled" size="20"></uni-icons>
					    我的下载
					  </view>
					  <view class="textright">
						  {{resdata.downloadSize}}
					    <uni-icons type="right" size="15"></uni-icons>
					  </view>
				</view>
				</navigator>
				<navigator url="/pages/classifylist/classifylist?name=我的评分&type=score">
				<view class="item" >
					<view class="textleft">
						<uni-icons type="notification-filled" size="15" ></uni-icons>
						我的评分
					</view>
					<view class="textright">
						{{resdata.scoreSize}}
						<uni-icons type="right" size="15"></uni-icons>
					</view>
					</view>
				</navigator>
				<navigator url="/pages/classifylist/classifylist">
				<view class="item" >
					<view class="textleft">
						<uni-icons type="download-filled" size="15" ></uni-icons>
							联系客服
							<!-- #ifdef MP -->
							<button class="button" open-type="contact">联系客服</button>
							<!-- #endif -->
							<!-- #ifdef H5 -->
							<button class="button" @click="onphomen">拨打电话</button>
							<!-- #endif -->
					</view>

					<view class="textright">
						<uni-icons type="right" size="15"></uni-icons>
					</view>
				</view>
				</navigator>
			</view>
			
			<view class="userbodyend">
				<navigator url="/pages/classifylist/classifylist">
				<view class="item" >
					<view class="textleft">
					    <uni-icons type="download-filled" size="20"></uni-icons>
					    订阅更新
					  </view>
					  <view class="textright">
						  {{resdata.downloadSize}}
					    <uni-icons type="right" size="15"></uni-icons>
					  </view>
				</view>
				</navigator>
				<navigator url="/pages/classifylist/classifylist">
				<view class="item" >
					<view class="textleft">
					    <uni-icons type="download-filled" size="20"></uni-icons>
					   常见问题
					  </view>
					  <view class="textright">
						  {{resdata.downloadSize}}
					    <uni-icons type="right" size="15"></uni-icons>
					  </view>
				</view>
				</navigator>
			</view>
		</view>
	</view>
	<view class="loding" v-else>
		<view :style="{ height: getTitleBarHeight() + 'px' }"></view>
		<uni-load-more status="loading"></uni-load-more>
	</view>
</template>

<script setup>
	import {getTitleBarHeight} from '../../util/System.js'
	import {apiGetuserInfo} from '../../api/apis.js'
	import { ref } from 'vue';
	const resdata=ref([])
	const onphomen=()=>{
		// 直接调用的uni方法
			uni.makePhoneCall({
				phoneNumber: '114' //仅为示例
			});

		}
		//获取读取到连接中的数据
	const getuserInfo=async()=>{
		 resdata.value=await apiGetuserInfo();
		 console.log(resdata.value);
	}
	getuserInfo()
</script>

<style lang="scss" scoped>
@import '../../common/style/commonback.scss';
.loding{
	padding: 30px 0;
}
	.userbox{
		.userhead{
			display: flex;
			justify-content: center;
			align-items: center;
			flex-direction: column;
			background:
			// 渐变背景
			linear-gradient(to bottom,rgba(0,0,0,0),#fff 550rpx),
			linear-gradient(to right,#beecd8 20%,#F4E2D8);
			.userImage{
				width: 200rpx;
				height:200rpx;
				border-radius: 50%;
				overflow: hidden;
				margin: 70rpx auto;
				image{
					width: 100%;
					height: 100%;
				}
			}
			.userName{
				font-size: 32rpx;
			}
			.userAddre{
				font-size: 26rpx;
				color: black;
			}
		}
	}
	.item{
		display: flex;
		justify-content: space-between;
		padding: 20rpx;
		align-items: center;
		border: 1rpx solid #e5e5e5;
	}
	.userbody{
		width:720rpx;
		margin: 50rpx auto;
		
		/* 两个模块共用样式 */
		.userbodytop,
		.userbodyend{
			box-shadow: 0 0 30rpx rgba(0, 0,0, 0.08);
			border-radius: 10rpx;
			overflow: hidden;
			margin-bottom: 50rpx;
		}

		.item:last-child{
			border-bottom: none;
		}
		.textright{
			:deep(){
				.uni-icons {
					 color: #999;
				}
			}
		}
		.textleft{
			display: flex;
			align-items: center;
			:deep(){
				.uni-icons {
					 color: $text-font-color-1 !important;
				}
			}
		}
	}
	.button{
		display: flex;
		position: absolute;
		width: 700rpx;
		left:20rpx;
		opacity: 0;
	}
</style>