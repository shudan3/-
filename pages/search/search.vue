<template>

	<view class="search">
			<uni-search-bar 
			@confirm="search" 
			@cancel="cancel"
			v-model="querParams.keyword"
			></uni-search-bar>
			<view class="" v-if="!ifSearches">
				<view class="font-title">
							<view class="title">历史搜索记录</view>
							<view class="icon" @click="clacer()">
								<uni-icons type="trash" size="20"></uni-icons>
							</view>
					</view>
					
				<view class="label" >
					<view class="label-td" v-for="item in historySearch" :key="item"  @click="serchvalue(item)">
						{{item}}
					</view>
				</view>
				<view class="font-title">
						<view class="title">热门搜索</view>
				</view>
					
				
				<view class="label" >
					<view class="label-td" v-for="item in recentSearches" :key="item" @click="serchvalue(item)">
						{{item}}
					</view>
				</view>
			</view>
	</view>
	
<view>
		
	<view class="title">显示搜索结果</view>
	<view class="serchdata" v-if="ifSearches">
		<view class="imagelist" v-for="item in serachimage" :key="item._id">
				<image class="image" :src="item.smallPicurl" mode="aspectFill"  @click="gotupreview(item._id)"></image>
		</view>
		
	</view>
		<view class="noserch" v-if="!ifSearches">
			<image class="image" src="/static/图片信息.png" mode="aspectFill"></image>
		</view>
		<view class="loadmore" v-if="noData ||serachimage.length">
				<uni-load-more :status="noData?'noMore':'loading'"></uni-load-more>
		</view>
</view>
</template>
<script setup>
import { ref } from 'vue'
import {apiGetsearchWall} from '/api/apis.js'
import {onReachBottom,onUnload} from '@dcloudio/uni-app'

const serachimage=ref([])
//让数据去读取缓存中的数据
const historySearch=ref(uni.getStorageSync("historySearch")||[])
const recentSearches=ref(['美女','宠物','卡通'])
const ifSearches=ref(false)
const noData=ref(false)
//输入数据回车后
const querParams=ref({
	pageNum:1,
	pageSize:9,
	keyword:""
	
})
function search(){
	//去重
	//新添加的数据和原始数据
	uni.showLoading()
	historySearch.value=[...new Set([querParams.value.keyword,...historySearch.value])].slice(0,10)
	console.log(querParams.value.keyword);
	uni.setStorageSync("historySearch",historySearch.value)
	if(querParams.value.keyword){
		getsearchWall()
	}else if(querParams.value.keyword===""){
		return
	}else{
		return
	}
	
}
//点击标签获取数据
function serchvalue(item){
	canceldata()
	querParams.value.keyword=item
	uni.showLoading()
	getsearchWall()
	}
	
//点击垃圾桶清楚缓存
function clacer(){
	uni.showModal({
		title:"是否清空历史记录",
		success:res=>{
			if(res.confirm){
					uni.removeStorageSync("historySearch")
					historySearch.value=[]
			}
		}
	})

}
const canceldata=()=>{
	serachimage.value=[]
	ifSearches.value=false
	querParams.value={
		pageNum:1,
		pageSize:9,
		keyword:""
	}
}
//点击取消经数据重置
function cancel(e){
	canceldata()
	}
const getsearchWall =async()=>{
	try{
		let res=await apiGetsearchWall(querParams.value)
		serachimage.value=[...serachimage.value,...res];
		uni.setStorageSync("storgClassList",serachimage.value)
		//本次返回数量小于pageSize，代表没有更多
		if(res.length < querParams.value.pageSize){
			noData.value=true;
		}else{
			noData.value=false;
		}
		//修复数组长度判断
		if(serachimage.value.length === 0){
			noData.value=false
			ifSearches.value=false
		}else{
			ifSearches.value=true
		}
	}finally{
		uni.hideLoading()
	}
	
}	
//触底加载
onReachBottom(()=>{
	if(noData.value) return;
	querParams.value.pageNum++
	getsearchWall();
})

function gotupreview(e){
uni.navigateTo({
			url:'/pages/preview/preview?_id='+e
		})
}
onUnload(()=>{
		
	})
</script>
<style lang='scss' scoped>
	.font-title{
		display: flex;
		align-items: center;
		justify-content: space-evenly;
	}
.serchdata{
		display: grid;
		grid-template-columns: repeat(3, 1fr); /* 一行固定3列，自动换行，不需要写width给子项 */
		gap:10rpx; 
	.imagelist{
		width: 200rpx;
		height: 400rpx;
	}
	.image{
		width: 100%;
		height: 100%;
	}
}
	.title{
		font-size: 20rpx;
		margin-top: 40rpx;
		width: 100%;
		height: 40rpx;
	}
	.label{
		display: grid;
		grid-template-columns: repeat(5, 1fr); /* 一行固定3列，自动换行，不需要写width给子项 */
		gap:10rpx; 
		width: 100%;
		.title{
			width: 40rpx;
			height: 40rpx;
			background-color: aqua;
		}
		.label-td{
			margin-top: 30rpx;
			width: 100rpx;
			border-radius: 50rpx;
			text-align: center;
			background-color: rgba(0,0,0,0.15);
		}
	}
	.noserch{
		margin-top: 30rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>