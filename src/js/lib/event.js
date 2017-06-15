/**
 * Класс для работы с событиями модуля
 *
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 07.06.2017
 * Time: 15:40
 */

import base from './base';

export default class event extends base {

	/**
	 * Конструктор класса, добавление private свойств
	 * @param params
	 */
	constructor (params = {}){
		super();
		this.name = (typeof params.name != 'undefined')?params.name:null;
		this.handlers = [];
	}

	/**
	 * Добавление обработчика события
	 * @param params Параметры обработчика
	 * @returns {boolean}
	 */
	addHandler(params = {}){
		var handler = {};
		if(typeof params == 'object' && typeof params.callback == 'function'){
			handler = params;
		}else if(typeof params == 'function'){
			handler.callback = params;
		}else{
			this.log('Неправильные параметры хэндлера');
		}

		if(typeof handler.callback == 'function'){
			this.handlers.push(handler);
			return true;
		}
		return false;
	}

	/**
	 * Удаление обработчика события
	 * @param callback Функция-обработчик, которую необходимо удалить
	 * @returns {boolean}
	 */
	removeHandler(callback){
		if(this.handlers.length){
			this.handlers.forEach((handler, index, object) => {
				if(handler.callback === callback){
					object.splice(index, 1);
				}
			});
		}
		return false;
	}

	/**
	 * Выполнение события
	 * @returns {boolean}
	 */
	execute(params={}){
		if(this.handlers.length){
			this.handlers.forEach((handler, i) => {
				handler.callback(params, handler);
				return true;
			});
		}
		return false;
	}
}