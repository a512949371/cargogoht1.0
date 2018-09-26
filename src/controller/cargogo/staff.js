const Base = require('./base');
const staff = think.service('staff');

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
		let result = await staff.selectList(pagedata, await this.getToken());
		think.logger.info('staffSelectList++++++++', result);
		if (await this.chectStatus(result)) {
			this.assign({ 'pageInfo': result.body.data, "querymodel":result.body.queryModel });
			return this.display();
		}else{
			return this.display();
		}
	}


	async addOrUpdataAction() {
		let id = this.get('id');
		let myStatus = this.get('myStatus');
		console.log('id+++++++++++', id)
		if (id != '-1'&&id!=null) {
			let result = await staff.selectOne(id, await this.getToken());
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
		think.logger.info('+++++++++++++++params', params);
		let token = await this.getToken();
		let result = await staff.insert(params, token);
		think.logger.info('+++++++++++++++staffInsert', result);
		if(params.id==null){
			params.id=-1;
		}
		think.logger.info('+++++++++++++++params2', params);
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
	//员工离职
	async deletestaffAction() {
		let params = this.post();
		let token = await this.getToken();
		let result = await staff.update(params, token);
		console.log("result",result);
			return this.body =result;
	}
	async updateAction() {
		let params = this.post();
		console.log('---------params', params)
		let token = await this.getToken();
		let result = await staff.update(params, token);
		think.logger.info('+++++++++staffUpdata', result);
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

}
