module.exports = class extends think.Controller {
  async __before() {
 let user = await this.session('user');
 let userBotton = await this.session("userBottons");
 if (think.isEmpty(user)) {
   return this.redirect('/auth/login');
 }
 this.assign({"Btn":userBotton});
  }
};
