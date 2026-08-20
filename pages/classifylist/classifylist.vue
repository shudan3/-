<template>
	<view class="loadmore">
	<!--判断数据是否为0，为0 则显示 if需要通过取反实现判断或使用 walllist.length===0-->
		<uni-load-more status="loading" v-if="!walllist.length && !ReachBottom"></uni-load-more>
	</view>
<view class="classiflist">
	<navigator :url="'/pages/preview/preview?_id='+item._id+'&name='+item.tabs[0]"  
	v-for="item in walllist" 
	:key="item._id" >
	<view class="classimg">
		<image :src="item.smallPicurl" mode="aspectFill" ></image>
	</view>
	</navigator>
</view>
<view class="loadmore" v-if="walllist.length ||ReachBottom">
		<uni-load-more :status="walllist.length > datalist.pageNum &&ReachBottom? 'loading' : 'no-more'"></uni-load-more>
	</view>
</template>
<script setup>
import { ref } from 'vue';
import {apiGetwallList,apiGetHistorylist} from '@/api/apis.js'
import {onLoad,onReachBottom,onShareAppMessage,onShareTimeline} from '@dcloudio/uni-app'
const walllist=ref([])
const ReachBottom=ref(false)
const datalist={
	pageNum:1,
	pageSize:9
}
let pageName;

//获取接收页面跳转传递的参数（路由参数）
onLoad((e)=>{
	let {id=null,name=null,type=null,score=null}=e;
	if(id){	datalist.classid=id}
	if(type){datalist.type=type}
	if(score){datalist.score=score}
	pageName=name
	//获取名字放在标题上
	uni.setNavigationBarTitle({
		title:pageName
	})
	
	getwalllist()
})
// 实现下拉加载框显示数据，需要判断数据是否还有，判断先页面显示
	onReachBottom(()=>{
		if(ReachBottom.value) return;
		datalist.pageNum++;
		getwalllist()
	})
const getwalllist=async()=>{
	let res;
	console.log('请求页码',datalist.pageNum) //打印当前请求第几页
	if(datalist.classid){
		res=await apiGetwallList(datalist);
	}
	if(datalist.type ||datalist.score){
		res=await apiGetHistorylist(datalist)
	}
	console.log('接口返回本页数据',res) //打印本页拿到多少条
	walllist.value=[...walllist.value,...res];
	console.log('合并之后总数据',walllist.value.length) //看总条数是不是变成18
	
	if(datalist.pageSize>res.length){
		ReachBottom.value=true
	}
	console.log('ReachBottom状态',ReachBottom.value)
}
//发送给朋友
onShareAppMessage(()=>{
	console.log(datalist.classid);
	return{
		title:pageName,
		path:"pages/classifylist/classifylist?id="+datalist.classid+'&name='+pageName
	}
	
})
</script>
<style scoped lang="scss">
	.classiflist{
		display: grid;
		grid-template-columns: repeat(3,1fr);
		gap: 10rpx;
			.classimg{
					height:600rpx; 
					image{
						width:100%;
						height:100%;
					}
				}
		
	}
</style>