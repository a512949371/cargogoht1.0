export default class extends think.Service{
	async systemuserlistquest(data,token){
		let result ={};
		result = await this.execGetWithAuth('systemuserlist',data,token);
		return result;
	}
	async systemrolelistquest(data,token){
		let result={};
		result = await this.execPostWithAuth('systemrolelist',data,token);
		return result;
	}
	//新建用户
	async addsystemuseronequest(data,token){
		let result={};
		result = await this.execPostWithAuth('addsystemuserone',data,token);
		return result;
	}
	//查看用户信息
	async systemuseronequest(data,token){
		let result ={};
		result = await this.execGetWithAuth('systemuserone',data,token);
		return result;
	}
	//修改用户信息
	async updatesystemuseronequest(data,token){
		let result={};
		result = await this.execPostWithAuth('updatesystemuserone',data,token);
		return result;
	}
	//删除用户
	async removesystemuseronequest(data,token){
		let result={};
		result = await this.execGetWithAuth('removesystemuserone',data,token);
		return result;
	}
	//改变用户状态
	async changeuseronequest(data,token){
		let result={};
		result = await this.execPostWithAuth('changeuserone',data,token);
		return result;
	}
	
	
}
