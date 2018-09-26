
module.exports = class extends think.Service {
    async getMenusByPid(e,token) {
    	console.log("e",token)
        let result = {};
        result = await this.execPostWithAuth('getMenusByPid',e,token);
        return result;
    }

    async getMenuById(id,token) {
        let result = {};
        result = await this.execGetWithAuth('getMenuById',{'id':id},token);
        return result;
    }
    
    async addOrUpdate(e,token) {
        let result = await this.execPostWithAuth('addOrUpdateMenu',e,token);
        return result;
    }

    async deletess(e,token) {
        let result = await this.execPostWithAuth('deletessMenus',e,token);
        return result;
    }
};
