const Base = require('../base.js');

module.exports = class extends Base {
  async indexAction() {
    await this.session(null);
    return this.redirect('/auth/login');
  }

};
