const Base = require('./base');
const escort = think.service('escort');

export default class extends Base {
	async indexAction() {
		return this.display()
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
		let result = await escort.selectList(pagedata, await this.getToken());
		think.logger.info('escortListAction++++++++', result.body.data);
		if (await this.chectStatus(result)) {
			this.assign({ 'pageInfo': result.body.data, "querymodel":result.body.queryModel });
			return this.display();
		}
	}

	async insertAction() {
		return this.display();
	}

	async addOrUpdataAction() {
		let id = this.get('id');
		let myStatus = this.get('myStatus');
		if (id != '-1') {
			console.log('id+++++++++++', id)
			let result = await escort.selectOne(id, await this.getToken());
			think.logger.info('data++++++++', result.body.data);
			if (await this.chectStatus(result)) {
				this.assign({ 'e': result.body.data, 'myStatus': myStatus });
				return this.display();
			}
		}
		this.assign({ 'myStatus': myStatus });
		return this.display();
	}

	async insertAction() {
		let params = this.post();
		think.logger.info('+++++++++++++++escortInsert', params);
		let token = await this.getToken();
		let result = await escort.insert(params, token);
		think.logger.info('+++++++++++++++escortInsert', result);
		if(params.id==null){
			params.id=-1;
		}
		if (await this.chectStatus(result)) {
			if (result.status == 0) {
				return this.redirect('addOrUpdata?id=' + params.id + '&myStatus=0');
			} else {
				return this.redirect('addOrUpdata?id=' + params.id + '&myStatus=-1');
			}
		}else{
			return this.redirect('addOrUpdata?id=' + params.id + '&myStatus=-1');
		}
	}

	async updateAction() {
		let params = this.post();
		console.log('---------params', params)
		let token = await this.getToken();
		let result = await escort.update(params, token);
		think.logger.info('+++++++++escortUpdata', result);
		if (await this.chectStatus(result)) {
			if (params.status != null) {
				return this.body = result;
			} else {
				if (result.status == 0) {
					return this.redirect('addOrUpdata?id=' + params.id + '&myStatus=0');
				} else {
					return this.redirect('addOrUpdata?id=' + params.id + '&myStatus=-1');
				}
			}
		}
		
	}


}
