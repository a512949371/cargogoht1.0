export default class extends think.Service{

    async selectList(e,token) {
        let result = {};
        result = await this.execGetWithAuth('escortList',e,token);
        return result;
    }

    async insert(e,token) {
        let result = {};
        result = await this.execPostWithAuth('escortAdd',e,token);
        return result;
    }

    
    async selectOne(id,token) {
        let result = {};
        result = await this.execGetWithAuth('escortSelectOne',{id:id},token);
        return result;
    }
    async update(e,token) {
        let result = {};
        result = await this.execPostWithAuth('escortUpdate',e,token);
        return result;
    }

    
}
