export default class extends think.Service{

    async selectList(e,token) {
        let result = {};
        result = await this.execGetWithAuth('userSelectList',e,token);
        return result;
    }

    async callList(e,token) {
        let result = {};
        result = await this.execGetWithAuth('userCallList',e,token);
        return result;
    }

    async selectOne(id,token) {
        let result = {};
        result = await this.execGetWithAuth('userSelectOne',{
            uid:id,
            type:0
        },token);
        return result;
    }

    async selectOrderList(e,token) {
        let result = {};
        result = await this.execGetWithAuth('userselectOrder',e,token);
        return result;
    }

    async update(e,token) {
        let result = {};
        result = await this.execPostWithAuth('userUpdate',e,token);
        return result;
    }

    async callFinish(e,token){
        let result = {};
        result = await this.execPostWithAuth('callFinish',e,token);
        return result;
    }

}
