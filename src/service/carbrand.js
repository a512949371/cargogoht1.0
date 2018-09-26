export default class extends think.Service{
	async carbrandlistquest(data,token){
		let result={};
		result = this.execGetWithAuth('carbrandlist',data,token);
		return result;
	}
	//编辑车辆品牌
	async editcarbrandquest(data,token){
		let result={};
		result= this.execPostWithAuth('editcarbrand',data,token);
		return result;
	}
	//删除车辆品牌
	async deletecarbrandquest(data,token){
		let result = {};
		result = this.execGetWithAuth('deletecarbrand',data,token);
		return result;
	}
}
