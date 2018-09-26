const Base = require('./base');
const Cardiction = think.service('cardiction');
const fileload = think.service('fileupload');
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

		let order = await Cardiction.cardictionlistquest(data, token);
		console.log("order0", token);
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
	async selectoneAction() {
		let data = this.get();
		let token = await this.session("token");
		let order = await Cardiction.getdiccarquest(data, token);
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
				"pageInfo": order.body.data
			});
			return this.display()
		}
	}
	//保存车辆编辑
	async editdiccarAction() {
		let data = this.post();
		console.log("data2", data);
		let token = await this.session("token");
		let order = await Cardiction.editdiccarquest(data, token);
		console.log("order0", order.body);
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
	async addoneAction() {
		return this.display()
	}
	//删除车辆
	async deletediccarAction() {
		let data = this.post();
		console.log("data2", data);
		let token = await this.session("token");
		let order = await Cardiction.deletediccarquest(data, token);
		console.log("order0", order.body);
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
	//图片上传
	async uploadimgAction() {
		let token = await this.session("token");
		let queststatus = '';
		let namedata = [];
		if(this.get("num") == "1") {
			let files = this.file('aloneimg');
			let img = await fileload.exec(files.name, files, token)
			if(img.status == 0) {
				queststatus = 0;
				namedata.push(img.body.img);
			} else if(img.status == 403) {
				queststatus = 403;
			} else if(img.status == 401) {
				await this.session(null)
				return this.redirect("/auth/login")
			} else if(img.status == 404) {
				return this.redirect('/operate/404');
			} else if(img.status == 500) {
				return this.redirect('/operate/500');
			} else {
				queststatus = -2;
			}
		}
		if(this.get("num") == "2") {
			let files = this.file('allimg');
			if(think.isArray(files)){
				for(let i = 0; i < files.length; i++) {
				let thisfile = files[i];
				let img = await fileload.exec(thisfile.name, thisfile, token)
				if(img.status == 0) {
					queststatus = 0;
					namedata.push(img.body.img);
				} else if(img.status == 403) {
					queststatus = 403;
				} else if(img.status == 401) {
					await this.session(null)
					return this.redirect("/auth/login")
				} else if(img.status == 404) {
					return this.redirect('/operate/404');
				} else if(img.status == 500) {
					return this.redirect('/operate/500');
				} else {
					queststatus = -2;
				}
			}
			}else{
				let img = await fileload.exec(files.name, files, token)
				if(img.status == 0) {
					queststatus = 0;
					namedata.push(img.body.img);
				} else if(img.status == 403) {
					queststatus = 403;
				} else if(img.status == 401) {
					await this.session(null)
					return this.redirect("/auth/login")
				} else if(img.status == 404) {
					return this.redirect('/operate/404');
				} else if(img.status == 500) {
					return this.redirect('/operate/500');
				} else {
					queststatus = -2;
				}
			}
			
		}
		return this.body = {
			namedata: namedata,
			num: this.get("num"),
			queststatus: queststatus
		}
	}
	//新增车辆
	async adddiccarAction() {
		let data = this.post();
		console.log("data2", data);
		let token = await this.session("token");
		let order = await Cardiction.adddiccarquest(data, token);
		console.log("order0", order.body);
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