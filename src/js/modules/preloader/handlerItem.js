/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 11.11.2017
 * Time: 21:22
 */

import module from "../../lib/module";

export default class handlerItem extends module {

	/**
	 *
	 * @param name Имя элементв
	 * @param $element Загружаемый элемент
	 */
	constructor (name, element = null) {
		super();

		let scope = this;
		scope.name = name;
		scope.element = element;
		scope.processed = false;
		scope.timeStart = null;
		scope.timeFinish = null;
		scope.timeFinish = null;
		scope.data = [];
		scope.initialize();
	}

	initialize () {
		let scope = this;

		scope.timeStart = new Date();
		scope.on('ready', function(params){
			scope.processed = true;
			scope.timeFinish = new Date();
		});
	}

	addData (data) {
		let scope = this;
		scope.data.push(data);
	}

	/**
	 * Получить время загрузки файла в милисекундах с начала загрузки до текущего момента, либо до момента завершения загрузки файла
	 */
	getTime () {
		let scope = this,
			time = null;

		if(scope.processed === true){
			time = scope.timeFinish.getTime() - scope.timeStart.getTime();
		}else{
			let now = new Date();
			time = now.getTime() - scope.timeStart.getTime();
		}
	}

}