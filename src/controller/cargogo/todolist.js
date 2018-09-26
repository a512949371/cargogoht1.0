const Base = require('./base');
const todolist = think.service('todolist');

export default class extends Base {
	async indexAction() {
		return this.display()
	}
	async selectListAction() {
		let pagedata = this.post();
		if (think.isEmpty(pagedata)) {
			pagedata = {
				current: 1,
				size: 10
			}
		} else {
			pagedata = pagedata;
		}
		let result = await todolist.selectList(pagedata, await this.getToken());
		think.logger.info('todolistSelectList++++++++', result.body);
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
			let result = await todolist.selectOne(id, await this.getToken());
			think.logger.info('data++++++++', result.body);

			if (await this.chectStatus(result)) {
				this.assign({ 'e': result.body.data, 'myStatus': myStatus });
				return this.display();
			}
		}
		return this.display();
	}

	// async insertAction() {
	// 	let params = this.post();
	// 	params.addtime = think.datetime(new Date(), 'YYYY-MM-DD HH:mm:ss');
	// 	let token = await this.getToken();
	// 	let result = await todolist.insert(params, token);
	// 	think.logger.info('+++++++++++++++todolistInsert', result);
	// 	if (await this.chectStatus(result)) {
	// 		if (result.status == 0) {
	// 			return this.redirect('addOrUpdata?id=' + params.id + '&myStatus=0');
	// 		} else {
	// 			return this.redirect('addOrUpdata?id=' + params.id + '&myStatus=-1');
	// 		}
	// 	}
	// }

	async updateAction() {
		let params = this.post();
		console.log('---------params', params)
		let token = await this.getToken();
		let result = await todolist.update(params, token);
		think.logger.info('+++++++++todolistUpdata', result);
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

	async userListAction() {
		let orderId=this.get('orderId');
		let id = this.get('id');
		let assignType=this.get('assignType');
		think.logger.info('id++++++++', id);
		let result = await todolist.userList({}, await this.getToken());
		think.logger.info('userListAction++++++++', result.body);
		if (await this.chectStatus(result)) {
			this.assign({ 'pageInfo': result.body.data,'orderId':orderId, 'id': id ,'assignType':assignType});
			return this.display();
		}else{
			return this.display();
		}
	}

	async designatedUserAction() {
		let pagedata = this.post();
		think.logger.info('pagedata++++++++', pagedata);
		let result = await todolist.designatedUser(pagedata, await this.getToken());
		think.logger.info('designatedUserAction++++++++', result);
		if (await this.chectStatus(result)) {
			return this.body = result;
		}else{
			return this.body = result;
		}
	}


	async designatedAction() {
		let id = this.get('id')
		let result = await todolist.designated(id, await this.getToken());
		think.logger.info('designatedAction++++++++', result.body);
		if (await this.chectStatus(result)) {
			let list = result.body.data;
			let isFirst=true;
			for (var i = 0; i<list.length; i++) {
				if (list[i].status == 1) {
					let isFirst=false;
					i++;
					if (i < 5) {
						if (i == 4) {
							list[i].designated = 2;
						} else {
							list[i].designated = 1;
						}
					}
					break;
				}
			}
			if(isFirst){
				list[0].designated=1;
			}
			for (var i = 1; i < list.length + 1; i++) {
				let itemName = '';
				switch (i) {
					case 1:
						itemName = '公司提车';
						break;
					case 2:
						itemName = '汽车合格证、发票';
						break;
					case 3:
						itemName = '缴纳保险、购置税';
						break;
					case 4:
						itemName = '落户上牌';
						break;
					case 5:
						itemName = '拍照取车';
						break;
				}
				list[i - 1].itemName = itemName;
			}

			console.log('list++++++++++++++++++++', list)
			this.assign({ 'pageInfo': list, 'id': id });
			return this.display();
		}
		return this.display();
	}

	async todolistfinishAction(){
		let pagedata = this.post();
		think.logger.info('pagedata++++++++', pagedata);
		let result = await todolist.todolistfinish(pagedata, await this.getToken());
		think.logger.info('todolistfinishAction++++++++', result);
		if (await this.chectStatus(result)) {
			return this.body = result;
		}else{
			return this.body = result;
		}
	}
}
