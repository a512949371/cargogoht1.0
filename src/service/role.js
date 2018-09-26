export default class extends think.Service{

    async roleselectlistquest(e,token) {
        let result = {};
        result = await this.execPostWithAuth('roleSelectList',e,token);
        return result;
    }

    async selectoneRolequest(e,token) {
        let result = {};
        result = await this.execGetWithAuth('roleSelectOne',e,token);
        return result;
    }

    async updateRolequest(e,token) {
        let result = {};
        result = await this.execPostWithAuth('roleSave',e,token);
        return result;
    }

    async deleteRolequest(e,token) {
        let result = {};
        result = await this.execPostWithAuth('roleDelete',e,token);
        return result;
    }

    async saveRolequest(e,token) {
        let result = {};
        result = await this.execPostWithAuth('roleSave',e,token);
        return result;
    }
}
