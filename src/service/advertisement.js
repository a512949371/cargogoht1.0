export default class extends think.Service{

    async selectList(e,token) {
        let result = {};
        result = await this.execGetWithAuth('advertisementSelectList',e,token);
        return result;
    }

    async selectOne(id,token) {
        let result = {};
        result = await this.execGetWithAuth('advertisementSelectOne',{id:id},token);
        return result;
    }

    async insert(e,token) {
        let result = {};
        result = await this.execPostWithAuth('advertisementInsert',e,token);
        return result;
    }

    async update(e,token) {
        let result = {};
        result = await this.execPostWithAuth('advertisementUpdate',e,token);
        return result;
    }

    async delete(e,token){
        let result = {};
        result = await this.execPostWithAuth('advertisementDelete',e,token);
        return result;
    }


}
