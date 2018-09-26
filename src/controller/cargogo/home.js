const Base = require('./base.js');

export default class extends Base {
	async indexAction() {
		const data = await this.session('user');
		const menus = await this.session('menus');
		let userInfo = {
			adminFirm: data,
			menus:menus
		}
		console.log("home", userInfo)
		this.assign({ "userInfo": userInfo })
		return this.display()
	}
}