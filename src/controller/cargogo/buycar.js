const Base = require('./base');
const buycar = think.service('buycar');
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
		let result = await buycar.selectList(pagedata, await this.getToken());
		think.logger.info('selectListAction++++++++', result.body);
		if (await this.chectStatus(result)) {
			this.assign({ 'pageInfo': result.body.data, "querymodel":result.body.queryModel });
			
			return this.display();
		}else{
			return this.display();
		}

	}


	async selectOneAction() {
		let id = this.get('id');
		let myStatus = this.get('myStatus');
		if (id != '-1') {
			console.log('id+++++++++++', id)
			let result = await buycar.selectOne(id, await this.getToken());
			think.logger.info('data++++++++', result);
			if (await this.chectStatus(result)) {
				this.assign({ 'e': result.body.data, 'myStatus': myStatus, 'id': id });
				return this.display();
			}
		}
		return this.display();
	}

	async orderListAction() {
		let id = this.get('id');
		let pageStatus = this.get('pageStatus');
		if (id != '-1') {
			console.log('id+++++++++++', id)
			let result = await buycar.selectOne(id, await this.getToken());
			think.logger.info('orderListAction++++++++', result.body.data.carBarnInfoVoList);

			if (await this.chectStatus(result)) {
				this.assign({ 'orderId': result.body.data.orderNo, 'pageStatus': pageStatus, 'id': id });
				this.assign({ 'pageInfo': result.body.data });
				return this.display();
			}
		}
		return this.display();
	}

	async orderAuditAction() {
		let params = this.post();
		think.logger.info('params++++++++', params);
		let result = await buycar.orderAudit(params, await this.getToken());
		think.logger.info('data++++++++', result);
		if (await this.chectStatus(result)) {
			return this.body = result;
		}else{
			return this.body = result;
		}
	}

	async vehicleInfoAction() {
		let params = this.post();
		think.logger.info('params++++++++', params);
		let result = await buycar.vehicleInfo(params, await this.getToken());
		think.logger.info('data++++++++', result);
		if (await this.chectStatus(result)) {
			return this.body = result;
		}else{
			return this.body = result;
		}
	}

	async addCarCodeAction() {
		let params = this.post();
		think.logger.info('params++++++++', params);
		let result = await buycar.addCarCode(params, await this.getToken());
		think.logger.info('data++++++++', result);
		if (await this.chectStatus(result)) {
			return this.body = result;
		}else{
			return this.body = result;
		}
	}

	async cancelOrderAction(){
		let id = this.post('id');
		think.logger.info('params++++++++', id);
		let result = await buycar.cancelOrder(id, await this.getToken());
		think.logger.info('data++++++++', result);
		if (await this.chectStatus(result)) {
			return this.body = result;
		}else{
			return this.body = result;
		}
	}

	async getTrueFaithAction(){
		let id=this.get('id');
		this.assign('id',id);
		think.logger.info('params++++++++', id);
		let result =await buycar.getTrueFaith(id,await this.getToken());
		console.log('data++++++++', result);
		if (await this.chectStatus(result)) {
			this.assign('pageInfo',result.body.data);
			return this.display();
		}else{
			return this.display();
		}
	}

	async uploadImgAction() {
		const file = this.file('imgfile');
		let result = await fileload.uploadImg(file.name,file,await this.getToken());
		console.log('uploadImgAction+++++++++++',result);
		let date = {};
		if(result.status ==0) {
		  date = result.body
		  return this.body = date;
		} else {
		  date = {'error':1,'message':'文件上传失败'};
		  return this.body = date;
		}
	  }

	  async addTrueFaithAction(){
		let params=this.post();
		think.logger.info('params++++++++', params);
		let result =await buycar.addTrueFaith(params,await this.getToken());
		think.logger.info('data++++++++', result);
		if (await this.chectStatus(result)) {
			return this.body=result;
		}else{
			return this.body=result;
		}
	  }


}
