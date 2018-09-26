const Base = require('./base');
const Caristra = think.service('caristration');
let caristradata = async function(ctx, data) {
	let token = await ctx.session("token");
	let order = Caristra.brandlistquest(data, token);
	return order
}
let buycarfrequencydata = async function(ctx, data) {
	let token = await ctx.session("token");
	let order = Caristra.buycarfrequencyquest(data, token);
	return order
}
let diccarlist = async function(ctx, data) {
	let token = await ctx.session("token");
	let order = Caristra.newcardiclistquest(data, token);
	return order
}
export default class extends Base {
	//车辆列表
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
		let ranklist = await Caristra.carranklistquest('', token);
		let order = await Caristra.carinfolistquest(data, token);
		console.log("order0", token);
		if(order.status == 401 || ranklist.status == 401) {
			await this.session(null);
			return this.redirect("/auth/login");
		} else if(order.status == 404 || ranklist.status == 404) {
			return this.redirect('/cargogo/404');
		} else if(order.status == 500 || ranklist.status == 500) {
			return this.redirect('/cargogo/500');
		} else {
			this.assign({
				"pageInfo": order.body.data,
				queryModel: order.body.queryModel,
				"rankdata": ranklist.body.data
			});
			return this.display()
		}
	}
	//新增销售车辆
	async sellcarAction() {
		let data = this.get();
		let dicdata = {
			current: 1,
			size: 8
		}
		let brandlist = await caristradata(this, data);
		let diccardata = await diccarlist(this, dicdata);
		console.log("order1", diccardata.body.data.records);
		if(brandlist.status == 401 || diccardata.status == 401) {
			await this.session(null);
			return this.redirect("/auth/login");
		} else if(brandlist.status == 404 || diccardata.status == 401) {
			return this.redirect('/cargogo/404');
		} else if(brandlist.status == 500 || diccardata.status == 401) {
			return this.redirect('/cargogo/500');
		} else {
			this.assign({
				"brandlist": brandlist.body.data,
				"pageInfo": diccardata.body.data
			});
			return this.display()
		}
	}
	//品牌列表选择
	async changebrandletterAction() {
		let data = this.get();
		let brandlist = await caristradata(this, data);
		console.log("order1", brandlist);
		if(brandlist.status == 401) {
			await this.session(null);
			return this.redirect("/auth/login");
		} else if(brandlist.status == 404) {
			return this.redirect('/cargogo/404');
		} else if(brandlist.status == 500) {
			return this.redirect('/cargogo/500');
		} else {
			return this.body = brandlist.body.data
		}
	}
	//新增字典车辆列表
	async newcardiclistAction() {
		let data = this.post();
		if(think.isEmpty(data)) {
			data = {
				current: 1,
				size: 8
			}
		} else {
			data = data;
		}
		console.log("data", data)
		let order = await diccarlist(this, data);
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
	//添加字典车辆
	async addcardiclistAction() {
		let data = {
			modelId: this.get("id")
		};
		let token = await this.session("token");
		console.log("data", data)
		let order = await Caristra.addcardiclistquest(data, token);
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
	//车辆信息
	async selectoneAction() {
		let data = {};
		if(think.isEmpty(this.get())) {
			console.log("kon")
			data = this.post()
		} else {
			data = this.get()
		}
		console.log(this.get(), this.post(), data);
		let token = await this.session("token");
		let order = await Caristra.carinfodataquest(data, token);
		console.log("order1",order.body)
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
	//修改车辆详细单条信息
	async updatacarinfoAction() {
		let data = this.post();
		let token = await this.session("token");
		let order = await Caristra.updatacarinfoquest(data, token);
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
	//编辑车辆
	async editcarAction() {
		let data = this.post();
		let token = await this.session("token");
		console.log('data', data);
		let order = await Caristra.editcarinfoquest(data, token);
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
	//删除车辆
	async deletecarAction() {
		let data = this.post();
		let token = await this.session("token");
		let order = await Caristra.deletecarinfoquest(data, token);
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
	//是否首页展示
	async iscarinfoindexAction() {
		let data = this.post();
		let token = await this.session("token");
		let order = await Caristra.iscarinfoindexquest(data, token);
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
	//查看车辆信息
	async lookcarinfoAction() {
		let data = this.get();
		let token = await this.session("token");
		let ranklist = await Caristra.carranklistquest('', token);
		let buycarfrequency = await buycarfrequencydata(this, data);
		let order = await Caristra.lookcarinfoquest(data, token);
		console.log("order2", order)
		if(order.status == 401 || ranklist.status == 401 || buycarfrequency.status == 401) {
			await this.session(null);
			return this.redirect("/auth/login");
		} else if(order.status == 404 || ranklist.status == 404 || buycarfrequency.status == 404) {
			return this.redirect('/cargogo/404');
		} else if(order.status == 500 || ranklist.status == 500 || buycarfrequency.status == 500) {
			return this.redirect('/cargogo/500');
		} else {
			this.assign({
				"pageInfo": order.body.data,
				queryModel: order.body.queryModel,
				"rankdata": ranklist.body.data,
				"buycarfrequency": buycarfrequency.body.data
			});
			return this.display()
		}
	}
	//新增车辆期数
	async insertbuycarfrequencyAction() {
		let data = this.get();
		let token = await this.session("token");
		let order = await Caristra.insertbuycarfrequencyquest(data, token);
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
	//删除车辆期数
	async deletebuycarfrequencyAction() {
		let data = this.get();
		let token = await this.session("token");
		let order = await Caristra.deletebuycarfrequencyquest(data, token);
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
	//是否显示车辆期数
	async isbuycarfrequencyAction() {
		let data = this.post();
		let token = await this.session("token");
		let order = await Caristra.isbuycarfrequencyquest(data, token);
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