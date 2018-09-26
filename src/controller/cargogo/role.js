const Base = require('./base.js');
const role = think.service('role');

let updateRole = async function(ctx,data){
    let token = await ctx.session('token');
    let result = {};
    result = await role.selectoneRolequest(data,token);
    return result;
}

export default class extends Base{
    //角色管理
    async selectListAction() {
    	let data = this.post();
    	console.log("data",data);
        let roledata =await role.roleselectlistquest(data,await this.getToken())
        think.logger.info('roledata+++++++',roledata.body);

        if(roledata.status==401){
            await this.session(null);
            return this.redirect('/auth/login');
        } else if (roledata.status == 404) {
            return this.redirect('/cargogo/404');
        } else if (roledata.status == 500) {
            return this.redirect('/cargogo/500');
        } else {
            
            this.assign({"pageInfo":roledata.body.data,"querymodel":roledata.body.queryModel})
            return this.display()
        }

      }
    
      async toAddAction() {
        console.log("+++++++++++toAddAction",'toAddAction');
        return this.display();
      }
    
      //编辑
      async toEditAction() {
        let data  ={
            id:this.get("id"),
        }
        console.log("+++++++++++data",data);
        let singlequery = await updateRole(this,data);
        console.log("+++++++++++singlequery",singlequery);
        if(singlequery.status==401){
            await this.session(null);
            return this.redirect('/auth/login');
        }
        if (singlequery.status == 0) {
          this.assign({'e': singlequery.body.data});
        }
        return this.display("cargogo/role_toAdd");
      }
    
      //新增或更新
      async saveAction() {
        let token = await this.session("token");
        let params = this.post();
        params.roleTime=think.datetime(new Date(),'YYYY-MM-DD HH:mm:ss') ;
        console.log("bbb",params);
        let result= await role.saveRolequest(params,token);
        console.log("result",result.body);
        if(result.status==401){
            await this.session(null);
            return this.redirect('/auth/login');
        } else if (result.status == 404) {
            return this.redirect('/cargogo/404');
        } else if (result.status == 500) {
            return this.redirect('/cargogo/500');
        } else {
          return this.body = result;
        }
      }
    
      async updateAction() {
        let data  ={
            id:this.get("id"),
        }
        let result = await updateRole(this,data);
        if(result.status==401){
            await this.session(null);
            return this.redirect('/auth/login');
        } else if (result.status == 404) {
            return this.redirect('/cargogo/404');
        } else if (result.status == 500) {
            return this.redirect('/cargogo/500');
        } else {
            this.assign({"e":result.body});
            return this.display();
        }
      }
    
      async deleteAction() {
        let token = await this.session("token");
        let params = this.post();
        console.log('+++++++++++deleteAction', params);
        let result= await role.deleteRolequest(params,token);
        console.log("+++++++++++deleteAction",result.body);
        if(result.status==401){
            await this.session(null);
            return this.redirect('/auth/login');
        } else if (result.status == 404) {
            return this.redirect('/cargogo/404');
        } else if (result.status == 500) {
            return this.redirect('/cargogo/500');
        } else {
          return this.body = -1;
        }
      }
    
    
}