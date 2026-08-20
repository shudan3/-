<template>	
<view class="classify">
		<comm-title title="分类"></comm-title>
		<view class="classhead pageback">
			<comm-itembox
			 v-for="item in classifyList" 
			:key="item._id"
			:items="item"
			></comm-itembox>
		</view>
</view>

</template>
<script setup>
import {apiGetclassify} from '@/api/apis.js'
import { ref } from 'vue'
const classifyList=ref([])
const  getclassify=async()=>{
	let res=await apiGetclassify({
		select:true,
		pageSize:15
	});
	classifyList.value=res 
}
getclassify()
</script>
<style scoped lang="scss">
	.classhead {
		display: grid;
		gap:10rpx;
		grid-template-columns: repeat(3,1fr);
		padding-top: 10rpx;
	}
</style>