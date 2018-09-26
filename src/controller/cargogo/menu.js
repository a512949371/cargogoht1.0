const Base = require('./base.js');
const menu = think.service('menu');

module.exports = class extends Base {
    indexAction() {
      return this.display();
    }
  
    async getMenusByPidAction() {
      let param = this.post()
      param.pid = this.get('pid');
      console.log('+++++++++++getMenusByPidAction',param);
      let token = await this.session('token');
      let result = await menu.getMenusByPid(param,token);
      console.log("'+++++++++++getMenusByPidAction'",result);
      if (await this.chectStatus(result)) {
        return this.body = result;
      }
    }

    async toAddOrUpdateAction() {
      let id = this.get('id');
      console.log('+++++++++++toAddOrUpdateAction',id);
      let token = await this.session('token');
      let result = await menu.getMenuById(id,token);
      console.log('+++++++++++toAddOrUpdateAction',result);
      if (await this.chectStatus(result)) {
        if(result.status==0) {
          this.assign('e',result.body.data);
        }
        return this.display();
      }
    }

    async addOrUpdateAction() {
      let params = this.post();
      console.log('+++++++++++addOrUpdateAction',params);
      let token = await this.session('token');
      let result = await menu.addOrUpdate(params,token);
      console.log("'+++++++++++addOrUpdateAction'",result);
      if (await this.chectStatus(result)) {
        if(result.status==0) {
          return this.body = 'ok';
        }
        return this.body = 'fail';
      }
    }

    async deletessAction() {
      let params = this.post();
      console.log('+++++++++++deletessAction',params);
      let token = await this.session('token');
      let result = await menu.deletess(params,token);
      console.log('+++++++++++deletessAction',result);
      if (await this.chectStatus(result)) {
        if(result.status==0) {
          return this.body = 1;
        }
        return this.body = -1;
      }
    }
  };