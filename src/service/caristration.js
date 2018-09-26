export default class extends think.Service{
	async caristrationlistquest(data,token){
		let result ={};
		result = this.execGetWithAuth('caristrationlist',data.token);
		return result;
	}
	async carinfolistquest(data,token){
		let result={};
		result = this.execGetWithAuth('carinfolist',data,token);
		return result;
	}
	//是否首页展示
	async iscarinfoindexquest(data,token){
		let result = {};
		result= this.execPostWithAuth('iscarinfoindex',data,token);
		return result;
	}
	//车辆栏目列表
	async carranklistquest(data,token){
		let result={};
		result = this.execGetWithAuth('carranklist',data,token);
		return result;
	}
	//车辆明细列表
	async carinfodataquest(data,token){
		let result={};
		result = this.execGetWithAuth('carinfodata',data,token);
		return result;
	}
	//修改车辆明细单条数据
	async updatacarinfoquest(data,token){
		let result={};
		result = this.execPostWithAuth('updatacarinfo',data,token);
		return result;
	}
	//查看车辆信息
	async lookcarinfoquest(data,token){
		let result={};
		result = this.execGetWithAuth('lookcarinfo',data,token);
		return result;
	}
	//修改车辆信息
	async editcarinfoquest(data,token){
		let result={};
		result = this.execPostWithAuth('editcarinfo',data,token);
		return result;
	}
	//删除车辆信息
	async deletecarinfoquest(data,token){
		let result={};
		result = this.execPostWithAuth('deletecarinfo',data,token);
		return result;
	}
	//车辆期数列表
	async buycarfrequencyquest(data,token){
		let result={};
		result = this.execGetWithAuth('buycarfrequency',data,token);
		return result;
	}
	//新增车辆期数
	async insertbuycarfrequencyquest(data,token){
		let result={};
		result = this.execPostWithAuth('insertbuycarfrequency',data,token);
		return result;
	}
	//删除车辆期数
	async deletebuycarfrequencyquest(data,token){
		let result={};
		result = this.execGetWithAuth('deletebuycarfrequency',data,token);
		return result;
	}
	//是否显示车辆期数
	async isbuycarfrequencyquest(data,token){
		let result={};
		result = this.execGetWithAuth('isbuycarfrequency',data,token);
		return result;
	}
	//获取车辆品牌列表
	async brandlistquest(data,token){
		let result={};
		result = this.execGetWithAuth('brandlist',data,token);
		return result;
	}
	//新增字典车辆列表
	async newcardiclistquest(data,token){
		let result={};
		result = this.execPostWithAuth('newcardiclist',data,token);
		return result;
	}
	//添加字典车辆
	async addcardiclistquest(data,token){
		let result={};
		result = this.execGetWithAuth('addcardiclist',data,token);
		return result;
	}
	
}
