/**
 * @param {number} timestamp 毫秒时间戳
 * @returns {string|null}
 */
export function getTimeDiff(timestamp) {
	const now = Date.now();
	const diffMs = now - timestamp;
	const oneMinute = 60 * 1000;
	const oneHour = 60 * oneMinute;
	const oneDay = 24 * oneHour;
	const oneMonth = 30 * oneDay;
	const threeMonth = 90 * oneDay;

	if (diffMs >= threeMonth) return "无法查找";
	if (diffMs < oneMinute) return "1分钟前";
	if (diffMs < oneHour) return `${Math.floor(diffMs / oneMinute)}分钟前`;
	if (diffMs < oneDay) return `${Math.floor(diffMs / oneHour)}小时前`;
	return `${Math.floor(diffMs / oneDay)}天前`;
}
export function errtoHome(){
	uni.showModal({
		title:"提示",
		content:"页面出现错误请返回首页",
		success:(res)=>{
			if(res.confirm){
				uni.reLaunch({
					url:"/pages/index/index"
				})
			}
		}
	})
}
