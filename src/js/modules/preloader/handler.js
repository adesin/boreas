/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 13.06.2017
 * Time: 9:37
 */

import module from "../../lib/module";
import handlerItem from "./handlerItem";

/**
 * Данный абстрактный класс используется для наследования от него обработчиков модуля preloader
 *
 * Обязатенльные методы:
 * initialize() - Производоит инициализацию обработчика
 * getStatus() - объект { total: N1, loaded: N2 }, где N1 - общее число загружаемых элементов, а N2 - число загруженных на данный момент  элементов
 *
 * Обязательно должны выполняться события:
 * progress - отдаёт прелодеру новое число загруженных элементов
 * ready - сообщает прелодеру, что обработчик загрузил все элементы
 *
 */
export default class handler extends module {
	constructor () {
		super();

		let scope = this;
		scope.__registerEvents(['progress']);
		scope.items = [];
		scope.params = {};
	}

	initialize (params={}) {
		let scope = this;
		$.extend( true, scope.params, params );

		scope.items.push(new handlerItem('Some Item'));
		for(let k in items){
			items[k].trigger('ready');
		}

		scope.trigger('progress', scope.getStatus());
		scope.trigger('ready');
	}

	/**
	 *
	 * @param item instance of handlerItem
	 */
	addItem (item) {
		let scope = this;

		let appInstance = scope.getApplicationInstance();
		appInstance.preloader.__items.push(item);

		console.log('adding handler item ' + item.name);

		item.on('ready', function(){
			console.log('loaded handler item ' + item.name);

			let processed = 0;
			for(let k in appInstance.preloader.__items){
				if(appInstance.preloader.__items[k].processed === true){
					processed++;
				}
			}

			appInstance.preloader.trigger('progress', {
				total: appInstance.preloader.__items.length,
				processed: processed,
				item: item,
			});
		});
	}

	getStatus () {
		let scope = this;

		return {
			total: 0,
			loaded: 0,
			src: null,
		};
	}
}