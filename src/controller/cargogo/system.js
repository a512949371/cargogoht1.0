const Base = require('./base');
const system = think.service('system');
let userdata=async function(ctx,data){
	let token = await ctx.session("token");
	let result = await system.systemuserlistquest(data,token);
	return result;
}
export default class extends Base{
	async selectListAction(){
		let pagedata=this.post();
		if(think.isEmpty(pagedata)){
			pagedata={
				pageNo:1,
				pageSize:10
			}
		}else{
			pagedata=pagedata
		}
		let userlist= await userdata(this,pagedata);
		console.log("userlist",userlist.body)
		if(userlist.status==401){
			await this.session(null);
			return this.redirect("/auth/login");
        } else if (userlist.status == 404) {
            return this.redirect('/cargogo/404');
        } else if (userlist.status == 500) {
            return this.redirect('/cargogo/500');
        } else {
			this.assign({"pageInfo":userlist.body.data,"queryModel":userlist.body.queryModel});
			return this.display();
		}
	}
	//查看用户信息
	async selectoneAction(){
		let token = await this.session("token");
		let data ={
			id:this.get("id")
		};
		let infodata= await system.systemuseronequest(data,token);
		let rolelist = await system.systemrolelistquest('',token);
		console.log("infodata",infodata.body,rolelist.body)
		if(infodata.status==401 || rolelist.status == 401){
			await this.session(null);
			return this.redirect("/auth/login");
        } else if (infodata.status == 404 || rolelist.status == 404) {
            return this.redirect('/cargogo/404');
        } else if (infodata.status == 500 || rolelist.status == 500) {
            return this.redirect('/cargogo/500');
        } else {
			this.assign({"infodata":infodata.body.data,"rolelist":rolelist.body.data});
			return this.display();
		}
	}
	//修改用户信息
	async edituserAction(){
		let token = await this.session("token");
		let data =this.post();
		let userinfo = await system.updatesystemuseronequest(data,token);
		console.log("userinfo",userinfo);
		if(userinfo.status==401){
			await this.session(null);
			return this.redirect("/auth/login");
        } else if (userinfo.status == 404) {
            return this.redirect('/cargogo/404');
        } else if (userinfo.status == 500) {
            return this.redirect('/cargogo/500');
        } else {
			return this.body=userinfo
		}
	}	
	//新建用户页面
	async adduserAction(){
		let token = await this.session("token");
		let rolelist = await system.systemrolelistquest('',token);
		console.log("rolelist",rolelist);
		if(rolelist.status==401){
			await this.session(null);
			return this.redirect("/auth/login");
        } else if (rolelist.status == 404) {
            return this.redirect('/cargogo/404');
        } else if (rolelist.status == 500) {
            return this.redirect('/cargogo/500');
        } else {
			this.assign({"rolelist":rolelist.body.data});
			return this.display();
		}
	}
	//新建用户
	async adduseroneAction(){
		let token = await this.session("token");
		let data = this.post();
		let newuser= await system.addsystemuseronequest(data,token);
		console.log("newuser",newuser)
		if(newuser.status==401){
			await this.session(null);
			return this.redirect("/auth/login");
        } else if (newuser.status == 404) {
            return this.redirect('/cargogo/404');
        } else if (newuser.status == 500) {
            return this.redirect('/cargogo/500');
        } else {
			return this.body=newuser;
		}
	}
	//删除用户
	async removeuseroneAction(){
		let token = await this.session("token");
		let data ={
			id:this.get('id')
		};
		let deluser= await system.removesystemuseronequest(data,token);
		console.log("deluser",deluser)
		if(deluser.status==401){
			await this.session(null);
			return this.redirect("/auth/login");
        } else if (deluser.status == 404) {
            return this.redirect('/cargogo/404');
        } else if (deluser.status == 500) {
            return this.redirect('/cargogo/500');
        } else {
			return this.body=deluser;
		}
	}
	//改变用户状态
	async changeuseroneAction(){
		let token = await this.session("token");
		let data ={
			id:this.get('id')
		};
		let deluser= await system.changeuseronequest(data,token);
		console.log("deluser",deluser)
		if(deluser.status==401){
			await this.session(null);
			return this.redirect("/auth/login");
        } else if (deluser.status == 404) {
            return this.redirect('/cargogo/404');
        } else if (deluser.status == 500) {
            return this.redirect('/cargogo/500');
        } else {
			return this.body=deluser;
		}
	}
}
