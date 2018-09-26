const Base = require('./base');
const advertisement = think.service('advertisement');
const fileload = think.service('uploadfile');

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
		let result = await advertisement.selectList(pagedata, await this.getToken());
		if (await this.chectStatus(result)) {
			this.assign({ 'pageInfo': result.body.data, "querymodel": result.body.queryModel });
			return this.display();
		}else{
			return this.display();
		}
	}


	async addOrUpdataAction() {
		let id = this.get('id');
		let myStatus=this.get('myStatus');
		console.log('myStatus+++++++++++', myStatus)
		if (id != '-1' ) {
			if(id!=null){
				let result = await advertisement.selectOne(id, await this.getToken());
				think.logger.info('data++++++++', result);
				if (await this.chectStatus(result)) {
					this.assign({ 'e': result.body.data ,'myStatus':myStatus});
					return this.display();
				}
			}else{
				this.assign({ 'e': {id:-1} ,'myStatus':myStatus});
					return this.display();
			}
			
		}
		
		return this.display();
	}

	async insertAction() {
		let params = this.post();
		think.logger.info('+++++++++++++++params', params);
		let token = await this.getToken();
		let result = await advertisement.insert(params, token);
		think.logger.info('+++++++++++++++advertisementInsert', result);
		if (await this.chectStatus(result)) {
			if (result.status == 0) {
				return this.redirect('addOrUpdata?myStatus=0');
			} else {
				return this.redirect('addOrUpdata?myStatus=-1');
			}
		}else{
			return this.redirect('addOrUpdata?myStatus=-1');
		}
	}

	async updateAction() {
		let params = this.post();
		console.log('---------params', params)
		let token = await this.getToken();
		let result = await advertisement.update(params, token);
		think.logger.info('+++++++++advertisementUpdata', result);
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

	async changePageTypeAction() {
		let params = this.post();
		console.log('---------params', params)
		let token = await this.getToken();
		let result = await advertisement.update(params, token);
		think.logger.info('+++++++++changePageTypeAction', result);
		if (await this.chectStatus(result)) {
			return this.body=result;
		}else{
			return this.body=result;
		}
	}

	async uploadImgAction() {
		const file = this.file('imgFile');
		let result = await fileload.uploadImg(file.name, file, await this.getToken());
		console.log('uploadImgAction+++++++++++', result);
		let date = {};
		if (result.status == 0) {
			date = result.body
			return this.body = date;
		} else {
			date = { 'error': 1, 'message': '文件上传失败' };
			return this.body = date;
		}
	}

	async deleteAction(){
		let params = this.post();
		console.log('---------params', params)
		let token = await this.getToken();
		let result = await advertisement.delete(params, token);
		think.logger.info('+++++++++deleteAction', result);
		if (await this.chectStatus(result)) {
			return this.body=result;
		}else{
			return this.body=result;
		}
	}

}
