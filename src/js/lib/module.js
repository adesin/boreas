/**
 * Клас описывает стандартный функционал модулей.
 * От него необходимо наследовать все модули приложения.
 *
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 08.06.2017
 * Time: 12:10
 */

import base from './base';
import event from './event';

export default class module extends base {

	/**
	 * Конструктор класса
	 */
	constructor() {
		super();
		this.__events = {};
		this.__registerEvents(['ready']);
	}

	/**
	 * Инициализация модуля
	 * @param params - Параметры модуля
	 * @param container - HTML контейнер модуля, jQuery-объект или селектор
	 */
	initialize(params = {}, container='body'){
		let $container = null;  //  jQuery-объект
		if(typeof container == 'string'){
			$container = $(container);
		}else{
			$container = container;
		}

		//  Далее инициализируем модуль внутри контейнера $container

		this.trigger('ready');
		//this.log(`Module "${this.constructor.name}" initialized`);
	}

	someModuleMethod () {
		let scope = this,
			appInstance = scope.getApplicationInstance();
	}

	/**
	 * Добавление обработчика события модуля
	 * @param name Имя события
	 * @param callback Функция-обработчик события
	 * @returns {boolean}
	 */
	on (name=null, callback=(params, scope)=>{}){
		if(!name || !callback || typeof callback != 'function'){
			this.log(`${this.constructor.name}.on: Не переданы обязательные параметры`);
			return false;
		}

		if(typeof this.__events[name] == 'undefined'){
			this.log(`${this.constructor.name}.on: Событие "${name}" не определено`);
			return false;
		}

		return this.__events[name].addHandler(callback);
	}

	/**
	 * Удаление обработчика события
	 * @param name Имя события
	 * @param callback Функция-обработчик события. Если не передана, то метод удалит все обработчики
	 * @returns {boolean}
	 */
	off (name=null, callback=null){
		if(!name) return false;

		if(typeof this.__events[name] == 'undefined'){
			this.log(`${this.constructor.name}.off: Событие "${name}" не определено`);
			return false;
		}

		if(callback && typeof callback == 'function'){
			this.__events[name].removeHandler(callback);
		}else{
			delete this.__events[name];
			return true;
		}
		//return false;
	}

	/**
	 * Выполнение события модуля
	 * @param name Имя события
	 * @param params Параметры, которые будут переданы callback-функции
	 * @return {boolean}
	 */
	trigger (name=null, params = {}) {
		if(typeof this.__events[name] != 'undefined'){
			return this.__events[name].execute(params, this);
		}
		return false;
	}

	/**
	 * Регистрация событий модуля
	 * @param value Имя события или массив
	 * @private
	 */
	__registerEvents(value=null){
		if(!value) return false;

		if(typeof value == 'object'){
			value.forEach((name, k) => {
				this.__events[name] = new event({
					name: name,
				});
			});
		}else if(typeof value == 'string'){
			let name = value;
			this.__events[name] = new event({
				name: name,
			});
		}
		return true;
	}
}
