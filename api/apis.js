import {request} from "@/util/request.js"
export function apiGetBnner(){
	return request({
		url:"/homeBanner",
		method:"POST",
		});
}

export function apiGetrandomWall(){
	return  request({
		url:"/randomWall",
		})
}

export function apiGETlNewsList(data={}){
	return request({
		url:'/wallNewsList',
		data
	})
}
export function apiGetclassify(data={}){
	return request({
		url:"/classify",
		data
	})
}
export function apiGetdownloadWall(data={}){
	return request({
		url:"/downloadWall",
		data
	})
}

export function apiGetwallList(data={}){
	return request({
		url:"/wallList",
		data
	})
}
export function apiGetsetupScore(data={}){
	return request({
		url:"/setupScore",
		data
	})
}
export function apiGetdetailwall(data={}){
	return request({
		url:"/detailWall",
		data
	})
}
export function apiGetuserInfo(data={}){
	return request({
		url:"/userInfo",
		data
	})
}
export function apiGetHistorylist(data={}){
	return request({
		url:"/userWallList",
		data
	})
}
export function apiGetsearchWall(data={}){
	return request({
		url:"/searchWall",
		data
	})
}