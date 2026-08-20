export const getTitleBarHeight=()=>{
	//获取到顶部黑框高度，具体高度是胶囊按钮底部到最低上的距离
	if(uni.getMenuButtonBoundingClientRect){
		let {top,height}=uni.getMenuButtonBoundingClientRect()
		return height+(top-height)+6;
	}else{
		return 40;
	}
	
}
export const tipbotomm=()=>{
	let {top,height}=uni.getMenuButtonBoundingClientRect()
	return top+height;
}
