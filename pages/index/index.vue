<template>
	<view class="content pageback" >
		<comm-title></comm-title>
	<view class="banner">
		<swiper indicator-dots autoplay indicator-color="rgba(255, 255, 255,0.3)"
		indicator-active-color='#ffffff' circular>
		
			<swiper-item v-for="item in bannerlist" :key="item._id">
				<image
				v-if="item.target=='miniProgram'"
				:src=item.picurl mode="aspectFill" 
				:app-id="item.appid"
				@click="gotoclisslist(item.url)"
				/>
				<image v-else :src=item.picurl mode="aspectFill" @click="gotoclisslist(item.url)"/>
			</swiper-item>
		</swiper>
	</view>
	<view class="notice">
		
		<view class="left">
		<uni-icons type="vip-filled" size="20"></uni-icons>
			<text>公告</text>
		</view>
		<view class="center">
		<swiper vertical='true' autoplay interval="15000" circular>
		<swiper-item v-for="item in newsList">
				<view class="swiper-item">{{item.title}}</view>
			</swiper-item>
		</swiper>
		</view>
		<view class="right">
			<uni-icons type="right" size="17"></uni-icons>
		</view>
	</view>
	<view class="select">
		<comm-item >
			<template #name>每日精选</template>
			<template #time>
				<uni-icons type="calendar" size="20"></uni-icons>
				<uni-dateformat :date="Date.now()" format="dd号" </uni-dateformat>
			</template>
		</comm-item>
		<view class="select-conenter">
			<scroll-view scroll-x>
				<view class="box" v-for="item in smallPicurllist" :key="item._id" @click="openpreview(item._id)">
					<image :src="item.smallPicurl" mode="aspectFill"></image>
				</view>
			</scroll-view>
		</view>
	</view>
	
	<view class="theme">
		<comm-item >
			<template #name>专题精选</template>
			<template #time>
				<navigator url="" class="more">More+</navigator>
			</template>
		</comm-item>
	</view>
	
	<view class="theme_box">
		<view class="itembox">
				<comm-itembox v-for="item in classifyList" 
				:key="item._id"
				:items="item"
				></comm-itembox>
				<comm-itembox :isMort=true></comm-itembox>
		</view>
				
	</view>
	
	</view>
</template>

<script setup>
import { ref } from 'vue'
import {apiGetBnner, apiGetrandomWall,apiGETlNewsList,apiGetclassify} from '@/api/apis.js'
//onShareAppMessage分享 onShareTimeline分享到朋友圈
import {onShareAppMessage,onShareTimeline} from '@dcloudio/uni-app'
// 轮播图图片
const bannerlist=ref([])
//分类大列表图片
const smallPicurllist=ref([])
const newsList=ref([])
const classifyList=ref([])
//跳转
const openpreview=(id)=>{
	console.log(id);
	// if(!id){errtoHome()} 
	uni.setStorageSync("storgClassList",smallPicurllist.value)
	uni.navigateTo({
		url:"/pages/preview/preview?_id="+id
	})
}
// 分享主键
onShareAppMessage((e)=>{
	return{
		title:"大菠萝壁纸",
		path:"/pages/index/index"
		
	}
})
//分享到朋友圈
onShareTimeline((e)=>{
	return{
		title:"大菠萝壁纸",
		path:"/pages/index/index",
		imageUrl:"https://gd-hbimg.huaban.com/08aaeb96f1f7360a2016ab5da1d6dd2d8f9933b62f9137-uqfbvd_fw658webp"
	}
})
//向网页发送请求
const getbenner=async()=>{
	let res=await apiGetBnner();
	bannerlist.value=res
}
const getrandomWall=async()=>{
	let res=await apiGetrandomWall()
	smallPicurllist.value=res
}
const getDetail =async()=>{
	let res=await apiGETlNewsList({select:true});
	newsList.value=res
}
const getclassify =async()=>{
	let res=await apiGetclassify({select:true});
	classifyList.value=res 
}
function gotoclisslist(e){
	console.log(e);
	uni.navigateTo({
		url:'/pages/classifylist/classifylist?'+e
	})
}
getbenner();
getrandomWall();
getDetail();
getclassify();
</script>
	
<style scoped lang="scss">
@import '../../common/style/commonback.scss';
	.content {
		:deep(){
			.uni-icons {
				color: $text-font-color-1 !important;
				}
			}
		.banner{
			width: 800rpx;
			padding: 30rpx 0; 
			swiper{
			width: 750rpx;
			height: 340rpx;
				}
			swiper-item{
				width: 100%;
				height: 100%;
				padding: 0 30rpx;
				image{
					width: 100%;
					height: 100%;
				}
				}
			}
		}
		
		.notice{
			background-color: #f9f9f9;
			border-radius: 80rpx;
			width: 720rpx;
			margin: 0 auto;
			height: 50rpx;
			display: flex;
			justify-content: center;
			line-height: 50rpx;
			.left{
			
				margin-left: 5rpx;
			}
			.center{
				flex: 1;
				swiper{
					height: 100%;
					width: 100%;
					.swiper-item{
						height: 100%;
						color: #666;
						overflow: hidden;
						white-space: nowrap;
						text-overflow: ellipsis;
						margin-left: 15rpx;
					}
				}
				.right{
					width: 70rpx;
				}
			}
		}
		
		.select{
			margin-top: 45;
			.select-conenter{
				width: 720rpx;
				scroll-view{
						white-space: nowrap;
				}
			}
			.box{
				height: 400rpx;
				width: 200rpx;
				margin-left: 10rpx;
				display: inline-block;
				image{
					margin-top: 10rpx;
					border-radius: 5%;
					width: 100%;
					height: 100%;
				}
			}
			
		}
		.theme{
			padding-top: 30rpx;
		}
		.theme_box{
			.itembox{
				margin-top: 10rpx;
				display: grid;
				gap:5rpx;
				grid-template-columns: repeat(3,1fr);
				margin-left: 10rpx;
				border-radius: 20rpx;
				overflow: hidden;
			}
			
			.latbox{
				position: relative;
				border-radius: 20rpx;
				overflow: hidden;
				width: 100%;
				.pric{
					width: 100%;
					height: 100%;
					border-radius: 20rpx;
				}
				.back{
					position: absolute;
					top: 0;
					width: 100%;
					height: 100%;
					background-color: rgb(0, 0, 0,0.2);
					backdrop-filter: blur(20rpx);
				}
				.laticons{
					width: 100%;
					height: 100%;
					position: absolute;
					top: 20rpx;
					display: grid;
					grid-template-columns: repeat(1,1fr);
				}
				.laticon{
					display: flex;
					align-items: end;
					justify-content: center;
				}
				.lattext{
					display: flex;
					color: #fff;
					justify-content: center;
				}
			}
		}
</style>
