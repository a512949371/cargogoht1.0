const Base = require('../base.js');
const svgCaptcha = require('svg-captcha');
const auth = think.service('auth');
const Alphabet = require('alphabetjs')

let getCaptcha2 = async function(ctx) {
  var captcha = svgCaptcha.create({size: 4,ignoreChars:'0o1i',noise: 2,background: '#B0B0B0',width: 95,height: 34,fontSize: 38});
  let captchaData = captcha.text.toLocaleLowerCase();
  await ctx.session('login_valiImg',captchaData);
  return captcha.data;
}

let doLogin = async function(ctx) {
  let userInfo = await ctx.session('user');
  let result;
    if(think.isEmpty(userInfo)) {
      let username = ctx.post('username');
      let password = ctx.post('password');
      let apiResult = await auth.doLogin(username,password);
      console.log('+++++++++doLogin',apiResult);
      if(apiResult.status==0) {
          let data = apiResult.body.data;
          await ctx.session('user',data.name);
          await ctx.session('token',data.token);
          await ctx.session("menus",data.menus.userMenus);
        	await ctx.session("userBottons",data.menus.userBottons);
          result = {status:0,data:1};
      } else {
            result = apiResult;
      }
    } else {
      result = {status:1,data:1};
    }
  return result;
}
 let exit = async function(ctx){
    await ctx.session(null);
    return ctx.redirect('/auth/login');
 }
module.exports = class extends Base {
  indexAction() {
    const logcompany = Alphabet('zerocat','stereo');
    const logauth='零猫科技  参与开发人员\n\n李杰 admin@elevenstyle.com\n刘英杰 1192479992@qq.com\n赵文消 zhaowenxiao@zhsjgroup.cn\n周霞  1753275927@qq.com\n徐莲开 1395101913@qq.com\n陈云飞 chenyunfei@zhsjgroup.cn';
    // const logAdmin = '这是\n测试\n呵呵';
    this.assign({'appName':'cargogo','logcompany':logcompany,'logauth':logauth});
    return this.display();
  }

  async authImageAction() {
    let captcha = await getCaptcha2(this);
    return this.body = captcha;
  }

  async doLoginAction() {
    let body = await doLogin(this);
    return this.body = body;
  }
  
  async exitAction() {
  	return await exit(this);
  }
};
