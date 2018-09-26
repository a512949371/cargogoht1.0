export default class extends think.Service{
	async cardictionlistquest(data,token){
		let result={};
		result = this.execGetWithAuth('cardictionlist',data,token);
		return result
	}
	//删除字典车辆
	async deletediccarquest(data,token){
		let result={};
		result = this.execPostWithAuth('deletediccar',data,token);
		return result
	}
	//新增车辆
	async adddiccarquest(data,token){
		let result={};
		result = this.execPostWithAuth('adddiccar',data,token);
		return result
	}
	//查看车辆
	async getdiccarquest(data,token){
		let result={};
		result = this.execGetWithAuth('getdiccar',data,token);
		return result
	}
	//编辑车辆
	async editdiccarquest(data,token){
		let result={};
		result = this.execPostWithAuth('editdiccar',data,token);
		return result
	}
	
}
