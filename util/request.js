const BASE_URL="https://tea.qingnian8.com/api/bizhi"
export function request(config={}){
	let {
		data={},
		url,
		method,
	}=config
	url=BASE_URL+url
	//resolve成功函数 reject报错函数
	return new Promise((resolve,reject)=>{
		uni.request({
			url:url,
			method:"GET",
			data,
			header:{
				'access-key':666666
			},
			success:res=>{
				 if(res.data.errCode===0){
					 resolve(res.data.data)
				 }else if(res.data.errCode===400){
					uni.showModal({
						title:"错误提示",
						//提示错误信息框中显示错误信息
						content:res.data.errMsg,
						showCancel:false
					})
					reject(res.data)
				 }else{
					 uni.showToast({
					 	title:res.data.errMsg,
						icon:'none'
					 })
					 //返回错误信息
					 reject(res.data)
				 }
			},
			fail:erro=>{
				reject(erro)
			}
		})
	})
	
}