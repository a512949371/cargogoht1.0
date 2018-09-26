const md5 = require('md5');

module.exports = class extends think.Service {
    async doLogin(username,password) {
        let result = {};
        result = await this.execPost('login',{'userName':username,'passWord':password});
        console.log('server login',result);
        return result;
    }
};
