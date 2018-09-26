export default class extends think.Service{

    async selectList(e,token) {
        let result = {};
        result = await this.execGetWithAuth('buycarorderList',e,token);
        return result;
    }

    async selectOne(id,token) {
        let result = {};
        result = await this.execGetWithAuth('orderSelectOne',{
            id:id,
        },token);
        return result;
    }

    async update(e,token) {
        let result = {};
        result = await this.execPostWithAuth('orderUpdate',e,token);
        return result;
    }

    async orderSelectList(e,token) {
        let result = {};
        result = await this.execGetWithAuth('orderSelectList',e,token);
        return result;
    }

    async orderAudit(e,token){
        let result = {};
        result = await this.execPostWithAuth('orderAudit',e,token);
        return result;
    }

    async vehicleInfo(e,token){
        let result = {};
        result = await this.execGetWithAuth('vehicleInfo',e,token);
        return result;
    }

    async addCarCode(e,token){
        let result = {};
        result = await this.execPostWithAuth('addCarCode',e,token);
        return result;
    }

    async cancelOrder(id,token){
        let result = {};
        result = await this.execPostWithAuth('cancelOrder',{id:id},token);
        return result;
    }

    async getTrueFaith(id,token){
        let result = {};
        result = await this.execGetWithAuth('getTrueFaith',{id:id},token);
        return result;
    }

    async uploadImg(e,token){
        let result = {};
        result = await this.execPostWithAuth('uploadImg',e,token);
        return result;
    }

    async addTrueFaith(e,token){
        let result = {};
        result = await this.execPostWithAuth('addTrueFaith',e,token);
        return result;
    }

    
}
