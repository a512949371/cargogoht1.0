module.exports = class extends think.Logic {
    doLoginAction() {
        this.allowMethods = 'post';
        let rules = {
            username: {
              string: true,       // 字段类型为 String 类型
              required: true,     // 字段必填
              trim: true,         // 字段需要trim处理
              method: 'POST'       // 指定获取数据的方式
            },
            password: {
                string: true,       // 字段类型为 String 类型
                required: true,     // 字段必填
                trim: true,         // 字段需要trim处理
                method: 'POST'       // 指定获取数据的方式
            },
        };
        let msgs = {
        username: '请输入用户名',
        password: '请输入密码',
        };
        let flag = this.validate(rules,msgs);
        if(!flag){
            let msg = {code: -1, data: this.validateErrors};
            return this.fail('validate error', msg);
        }
    }
  };
  