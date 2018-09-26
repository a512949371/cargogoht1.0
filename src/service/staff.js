export default class extends think.Service{

    async selectList(e,token) {
        let result = {};
        result = await this.execGetWithAuth('staffSelectList',e,token);
        return result;
    }

    async selectOne(id,token) {
        let result = {};
        result = await this.execGetWithAuth('staffSelectOne',{id:id},token);
        return result;
    }

    async insert(e,token) {
        let result = {};
        result = await this.execPostWithAuth('staffInsert',e,token);
        return result;
    }

    async update(e,token) {
        let result = {};
        result = await this.execPostWithAuth('staffUpdate',e,token);
        return result;
    }


}
