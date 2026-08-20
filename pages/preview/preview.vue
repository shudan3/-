<template>
<view class="preview" >
	<!-- 轮播图纵向 vertical添加该属性后就会使轮播图变为纵向 -->
	<!-- //:duration="aniDuration"切换完全没有动画，瞬间跳转，无滑动效果 -->
	<swiper circular :current="previewindex" @change="swiperchange" v-if="boxhied"  :duration="aniDuration">
		<swiper-item v-for="(item,index) in previewList" :key="item._id">
			<image v-if="readImage.includes(index)" :src="item.picurl" mode="aspectFill" @click="gendter()"></image>
		</swiper-item>
	</swiper>
	<view class="mask" >
	<view class="goBook" @click="openpreviewicon()">
		<view class="toppreview">
		<uni-icons class="icon" type="arrow-left" size="30"></uni-icons>
		</view>
	</view>
	<view class="count">{{previewindex+1}}/{{previewList.length}}</view>
	<view class="time">
		<uni-dateformat :date="new Date()" format="hh:mm"></uni-dateformat>
	</view>
	<view class="date">
		<uni-dateformat :date="new Date()" format="MM月dd日"></uni-dateformat>
	</view>
	<view class="footer">
		
		<view class="box" @click="touch()">
		<uni-icons type="contact" size="30"></uni-icons>
				<view class="text">
					信息
				</view>
			</view>
			
		<view class="box" @click="score()">
			<uni-icons type='hand-up-filled' size="28"></uni-icons>
			<view class="text">
				{{Scorevalue}}分
			</view>
		</view>
		
		<view class="box" @click="DownloadImage()">
			<uni-icons type='download-filled' size="28"></uni-icons>
			<view class="text">
				下载
			</view>
		</view>
	</view>
	</view>	
	<!-- 信息 -->
	<uni-popup ref="popupShow">
		<view class="popupShow">
			<view class="popuHeade">
				<view></view>
				<view class="Poputitle">标题</view>
				<view class="Headicon" >
					<uni-icons type="closeempty" size="20" @click="cionclose()"></uni-icons>
				</view>
			</view>
			<scroll-view scroll-y="true" >
				<view class="content">
					<view class="row">
						<view class="labe">壁纸ID：</view>
						<text selectable class="value">{{labelist.classid}}</text>
					</view>
					<view class="row">
						<view class="labe">分类：</view>
						<text selectable class="value">{{title}}</text>
					</view>
					<view class="row">
						<view class="labe">发布者：</view>
						<text selectable class="value">{{labelist.nickname}}</text>
					</view>
					<view class="row">
						<view class="labe">评分：</view>
						<uni-rate readonly touchable :value="labelist.score"></uni-rate>
						<text selectable class="value">{{labelist.score}}</text>
					</view>
					<view class="row">
						<view class="labe">标签：</view>
						<text selectable class="textlabe" v-for="item in labelist.tabs">{{item}}</text>
					</view>
					<view class="row labefoot">
						<view class="">声明：</view>
						<text selectable class="value valuefoot">{{labelist.description}}</text>
					</view>
				</view>
				
			</scroll-view>
		</view>
	</uni-popup>
<!-- 评分弹窗 -->
		<uni-popup ref="Scorepopup" is-mask-click >
			<view class="Scorepopup">
				<view class="Scoreheade">
					<view></view>
					<view class="Scoretitle">
					{{isScore?"评分过了":"壁纸评分"}}	
					</view>
					<view class="Scoreclose" @click="Scoreclose()">
						<uni-icons type="closeempty" size="20"></uni-icons>
					</view>
				</view>
			<!-- 	评分 -->
				<view class="Scorecenter">
						<!-- 	星星禁用 -->
					<uni-rate 
					v-model="Scorevalue" 
					@click="Scorestar()" 
					:disabled="isScore"
					disabled-color="#FFCA3E"
					allowHalf/>
					<view class="text">
						<text class="text">{{Scorevalue}}分</text>
					</view>
				</view>
			<!-- 	提交评分 -->
				<view class="Scorefooter">
	<!-- 				//disabled按钮是否为可点击状态 -->
					<button type="default" size="mini"  plain  :disabled="isScore" @click="Scorebtns()">确认评分</button>
				</view>
			</view>
		</uni-popup>
</view>
</template>
<script setup>
import { ref } from 'vue';
import {getTitleBarHeight} from '../../util/System.js'
import {onLoad,onShareAppMessage,onShareTimeline} from '@dcloudio/uni-app'
import {apiGetsetupScore,apiGetdetailwall,apiGetdownloadWall} from '../../api/apis.js'
const boxhied=ref(true);
const popupShow=ref(null);
const Scorepopup=ref(null);
const Scorevalue=ref(0);
const Scorebtn = ref(true);
const previewList=ref([]);
const previewindex=ref([0])
//用于让加载图片时，只有点击或者滑动后才会加载，不会一次性加载
const readImage=ref([])
//点击预览页面详细信息
const labelist=ref([])
const isScore=ref(false)
const title=ref("")
const pageId=ref("")
//挂载
onLoad(async(e)=>{
	//当前位置所在下标
	//当id无法为undifind的时候进行一个弹窗判断让用户返回首页
	if(!e._id){errtoHome()} 
	pageId.value=e._id
	title.value=e.name
	const storgclasslist =uni.getStorageSync("storgClassList")
		previewList.value=storgclasslist.map(item=>{
			return{
				...item,
				//读取出来将图片改变成jpg格式
				picurl:item.smallPicurl.replace("_small.webp",".jpg")
			}
		})
	if(e.type=='share'){
		let res=await apiGetdetailwall({id:pageId.value});
		console.log("res6",res);
		previewList.value=res.map(item=>{
			return{
				...item,
				//读取出来将图片改变成jpg格式
				picurl:item.smallPicurl.replace("_small.webp",".jpg")
			}
		})
		
	}
	previewindex.value=previewList.value.findIndex(item=>item._id===e._id)
	readImage.value.push(
	previewindex.value<=0? previewList.value.length-1:previewindex.value-1,
	previewindex.value,
	previewindex.value>=previewList.value.length-1?0:previewindex.value+1)
	//去重
	readImage.value=[...new Set(readImage.value)]
	//将数据复制给labelist
	labelist.value=previewList.value[previewindex.value]
})
//轮播图滑动获取信息，swiperchange轮播图滑动事件
const swiperchange=(e)=>{
	previewindex.value=e.detail.current
	readImage.value.push(
	previewindex.value<=0? previewList.value.length-1:previewindex.value-1,
	previewindex.value,
	previewindex.value>=previewList.value.length-1?0:previewindex.value+1)
	//将数据复制给labelist
	labelist.value=previewList.value[previewindex.value]
}

// 获取缓存数据 将之前页面存储的数据读取出来去进行判断并赋值




const touch=()=>{
	popupShow.value.open('bottom');
}
//打开星星选择窗
const score=()=>{
	Scorepopup.value.open('center');
	
	if(labelist.value.userScore){
		isScore.value=true
		Scorevalue.value=labelist.value.userScore
	}
}
const cionclose=()=>{
	popupShow.value.close();
}
//星星选择关闭按钮
const Scoreclose=()=>{
	Scorepopup.value.close();
	isScore.value=false;
}
const gendter=()=>{
	boxhied.value=!boxhied.value
}
// 星星选择
const Scorestar=()=>{
	console.log(Scorevalue.value);
	if(Scorevalue.value!=0){
		Scorebtn.value=false
	}else{
		Scorebtn.value=true
	}
}
//确认评分
//async await异步请求
const Scorebtns=async()=>{
	//添加了以后加载框，让网络请求缓慢时提示加载中
		uni.showLoading({
			title:"加载中......"
		})
		
	let {classid,_id:wallId}=labelist.value ||{};
	let res=await apiGetsetupScore({
		classid,
		wallId,
		userScore:Scorevalue.value
	})
	//评分了但是没有存储无法拿取到评分后的数据
	//调用加载框
	uni.hideLoading();
	if(res.id){
		uni.showToast({
			title:'评分成功',
			icon:"none"
		})
		//数据中userScre的数据更新加入
		previewList.value[previewindex.value].userScore=Scorevalue.value
		//将数据更新
		uni.setStorageSync("storgClassList",previewList.value)
			Scoreclose()
	}
		console.log(res);
}
//点击下载
const DownloadImage =async () => {
	uni.showLoading({
		title:"下载中...",
		mask:true,
	})  
	let {classid,_id:wallId}=labelist.value;
		let res=await apiGetdownloadWall({
				 classid,
				 wallId,
			})
			console.log(res);
	uni.getImageInfo({
		src: labelist.value.picurl,
		success: (res) => {
			console.log("图片信息：", res);
			uni.saveImageToPhotosAlbum({
				filePath:res.path,
				success:(res)=>{
					console.log("res"+res);
				},
				fail:err=>{
					if(err.errMsg=='saveImageToPhotosAlbum:fail auth deny'){
						uni.showToast({
							title:"保存失败。请重新下载",
							icon:"none"
						})
					return ;
					}
				
					uni.showModal({
						title:"授权提示",
						content:"需要授权保存相册",
						success:res=>{
							//confim确认按钮
							if(res.confirm){
								uni.openSetting({
									success:(setting)=>{
										console.log(setting);
										if(setting.authSetting['scope.writePhotosAlbum']){
											uni.showToast({
												title:"提示",
												content:"获取授权成功"
											})
										}else{
											uni.showToast({
												title:"提示",
												content:"获取授权失败"
											})
										}
									}
								})
							}
						}
					})
				},
				complete: () => {
					uni.hideLoading();
				}
			})
		},
	})
}

//左上角返回
const openpreviewicon=()=>{
	uni.navigateBack({
		url:"/pages/classify/classify"
	})
}
//分享给朋友
onShareAppMessage(()=>{
	return{
		title:title.value,
		//该页面是通过_id传递数据
		path:"/pages/preview/preview?_id="+pageId.value+'&type=share'
	}
})
//分享到朋友圈
onShareTimeline(()=>{
	return{
		title:title.value,
		query:"?_id="+pageId.value+'&type=share'
	}
})

</script>
<style lang='scss' scoped>
	.preview{
		position:relative;
		width: 100%;
		height: 100vh;
		swiper{
			width: 100%;
			height: 100%;
			image{
				width: 100%;
				height: 100%;
			}
		}
		.box{
			flex-direction: column;
		}
		.mask{
			position: absolute;
			top: 0;
			width: 100%;
			text-align: center;
			color: #fff;
			padding-top: 15%;
			.goBook{
				.toppreview{
					border: solid 1px black;
					border-radius: 50%;
					width: 40px;
					height: 40px;
					display: flex;
					justify-content: center;
					align-items: center;

				}
			}
			.count{
				padding-top: 40rpx;
			}
			.time{
				font-size: 120rpx;
			}
		}
		.footer{
		  position: fixed;
		  bottom: 80rpx; /* 距离底部留一点边距，贴合效果图 */
		  left: 50%;
		  transform: translateX(-50%); /* 水平居中核心 */
		  display: flex;
		  justify-content: space-around;
		  align-items: center;
		  background-color: rgb(255,255,255,0.8);
		  border-radius: 600rpx;
		  width: 600rpx;
		  height: 10vh;
		  color: black;
			.box{
				
			}
		}
		/* 信息内部 */
		.popupShow{
			background-color: #fff;
			border-radius: 10rpx 30rpx 0 0 ;
			.popuHeade{
				width: 100%;
				display: flex;
				justify-content: space-between;
				.Headicon{
					margin-right: 10rpx;
				}
				
			}
			scroll-view{
				max-height: 60vh;
			}
		}
		scroll-view
			.content{
				padding-left: 50rpx;
				.row{
					display: flex;
					padding: 16rpx 0;
					line-height: 1.7em;
					.labe{
						width: 140rpx;
						text-align: right;
						white-space: nowrap;
						color:greenyellow;
					}
					.value{
						flex: 1;
						width: 0;
					}
					.textlabe{
						/* 设置边框根据字体大小改变 */
						/* display: inline-block; */
						border: greenyellow solid 1px;
						margin-right: 50rpx;
						border-radius:20rpx;
					}
				}
				/**/
				.labefoot{
					background-color: rgb(0,0,0,0.2);
					border-radius: 30rpx;
					 
				}
			}
		}
/* 信息结束 */
			.Scorepopup{
				padding-top: 10rpx;
				background-color:#fff;
				width: 65vw;
				height: 20vh;
				border-radius: 3vw;
				.Scoreheade{
					display: flex;
					justify-content: space-between;
				}
				.Scorecenter{
					display: flex;
					justify-content:center;
					align-items: center;
					padding-top: 30rpx;
					
				}
				.text{
				margin-left: 10rpx;
				color: #ffca3e;
				}
				.Scorefooter{
					display: flex;
					justify-content: center;
					margin-top: 30rpx;
				}
			}
</style>