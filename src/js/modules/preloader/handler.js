/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 13.06.2017
 * Time: 9:37
 */

import module from "../../lib/module";

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
		this.__registerEvents(['progress', 'start']);
	}

	initialize (params={}) {
		this.params = Object.assign({}, this.params, params);

		this.trigger('progress', this.getStatus());
		this.trigger('ready');
	}

	getStatus () {
		return {
			total: 0,
			loaded: 0,
			src: null,
		};
	}

}