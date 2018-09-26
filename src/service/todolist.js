export default class extends think.Service{

    async selectList(e,token) {
        let result = {};
        e.auditStatus=2;
        result = await this.execGetWithAuth('orderSelectList',e,token);
        return result;
    }

    async selectOne(id,token) {
        let result = {};
        result = await this.execGetWithAuth('todolistSelectOne',{id:id},token);
        return result;
    }

    async insert(e,token) {
        let result = {};
        result = await this.execPostWithAuth('todolistInsert',e,token);
        return result;
    }

    async update(e,token) {
        let result = {};
        result = await this.execPostWithAuth('todolistUpdate',e,token);
        return result;
    }

    async designated(id,token) {
        let result = {};
        result = await this.execGetWithAuth('designatedList',{orderId:id},token);
        return result;
    }

    async userList(e,token){
        let result = {};
        result = await this.execGetWithAuth('staffUserList',e,token);
        return result;
    }

    async designatedUser(e,token){
        let result = {};
        result = await this.execPostWithAuth('designatedUser',e,token);
        return result;
    }

    async todolistfinish(e,token){
        let result = {};
        result = await this.execGetWithAuth('todolistfinish',e,token);
        return result;
    }

}
