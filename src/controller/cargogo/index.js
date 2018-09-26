const Base = require('./base.js');
export default class extends Base{
	async indexAction(){
		return this.display()
	}
}