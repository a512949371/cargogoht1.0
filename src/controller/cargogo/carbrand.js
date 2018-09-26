const Base = require('./base');
const Carbrand = think.service('carbrand');
export default class extends Base {
	async selectListAction() {
		let data = this.post();
		if(think.isEmpty(data)) {
			data = {
				current: 1,
				size: 10
			}
		} else {
			data = data;
		}
		let token = await this.session("token");
		let order = await Carbrand.carbrandlistquest(data, token);
		console.log("order0", order.body);
		if(order.status == 401) {
			await this.session(null);
			return this.redirect("/auth/login");
		} else if(order.status == 404) {
			return this.redirect('/cargogo/404');
		} else if(order.status == 500) {
			return this.redirect('/cargogo/500');
		} else {
			this.assign({
				"pageInfo": order.body.data,
				queryModel: order.body.queryModel
			});
			return this.display()
		}
	}
	async editbrandAction() {
		let data = this.post();
		let token = await this.session("token");
		let order = await Carbrand.editcarbrandquest(data, token);
		console.log("order0", order);
		if(order.status == 401) {
			await this.session(null);
			return this.redirect("/auth/login");
		} else if(order.status == 404) {
			return this.redirect('/cargogo/404');
		} else if(order.status == 500) {
			return this.redirect('/cargogo/500');
		} else {
			return this.body = order
		}
	}
	async deletecarbrandAction() {
		let data = this.get();
		let token = this.session("token");
		let order = await Carbrand.deletecarbrandquest(data, token);
		console.log("order0", order);
		if(order.status == 401) {
			await this.session(null);
			return this.redirect("/auth/login");
		} else if(order.status == 404) {
			return this.redirect('/cargogo/404');
		} else if(order.status == 500) {
			return this.redirect('/cargogo/500');
		} else {
			return this.body = order
		}
	}
}