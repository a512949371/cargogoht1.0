const Base = require('./base');
const user = think.service('user');

export default class extends Base {
	async indexAction() {
		return this.display();
	}
	async selectListAction() {
		let pagedata = this.post()
		if (think.isEmpty(pagedata)) {
			pagedata = {
				current: 1,
				size: 10
			}
		} else {
			pagedata = pagedata
		}
		let result = await user.selectList(pagedata, await this.getToken());
		if (await this.chectStatus(result)) {
			console.log('userselectListAction',result.body.data.records);
			this.assign({ 'pageInfo': result.body.data, "querymodel": result.body.queryModel });
			return this.display();
		}else{
			return this.display();
		}

	}

	async callListAction() {
		let pagedata = this.post()
		if (think.isEmpty(pagedata)) {
			pagedata = {
				current: 1,
				size: 10
			}
		} else {
			pagedata = pagedata
		}
		think.logger.info('++++++++pagedata', pagedata);
		let result = await user.callList(pagedata, await this.getToken());
		if (await this.chectStatus(result)) {
			this.assign({ 'pageInfo': result.body.data, "querymodel": result.body.queryModel });
			return this.display();
		}else{
			return this.display();
		}

	}

	async addOrUpdataAction() {
		let id = this.get('id');
		let myStatus = this.get('myStatus');
		if (id != '-1') {
			console.log('id+++++++++++', id)
			let result = await user.selectOne(id, await this.getToken());
			if (await this.chectStatus(result)) {
				this.assign({ 'e': result.body.carUserInfo, 'myStatus': myStatus, 'id': id });
				return this.display();
			}
		}
		return this.display();
	}

	async updataAction() {
		let params = this.post();
		console.log('---------params', params)
		let token = await this.getToken();
		let result = await user.update(params, token);
		think.logger.info('+++++++++userUpdata', result);
		if (await this.chectStatus(result)) {
			return this.body = result;
		}else{
			return this.body = result;
		}
	}

	async orderListAction() {
		let id = this.get('id');
		let pageStatus = this.get('pageStatus');
		this.assign({ 'pageStatus': pageStatus, 'id': id });
		let pagedata = this.post()
		if (think.isEmpty(pagedata)) {
			pagedata = {
				current: 1,
				size: 10
			}
		} else {
			pagedata = pagedata
		}
		pagedata.userId = id;
		think.logger.info('++++++++pagedata', pagedata);
		let result = await user.selectOrderList(pagedata, await this.getToken());
		think.logger.info('++++++++orderListAction', result.body.data);
		if (await this.chectStatus(result)) {
			this.assign({ 'pageInfo': result.body.data, "querymodel": result.body.queryModel });
			return this.display();
		}else{
			return this.display();
		}
	}
	async callFinishAction() {
		let params = this.post();
		console.log('---------params', params)
		let token = await this.getToken();
		let result = await user.callFinish(params, token);
		think.logger.info('+++++++++callFinishAction', result);
		if (await this.chectStatus(result)) {
			return this.body = result;
		}else{
			return this.body = result;
		}
	}



}
