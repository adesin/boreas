/**
 * Кастомный модуль на EcmaScript 5
 */
(function () {
	'use strict';

	/**
	 * Параметры модуля по-умолчанию
	 * @type {{param1: string, param2: string}}
	 */
	var defaults = {
		param1: 'value1',
		param2: 'value2',
	};

	/**
	 * Конструктор класса
	 * @param arg1
	 * @param arg2
	 */
	window['customModule'] = function (arg1, arg2) {
		/**
		 * Вызов конструктора класса-родителя и передача аргументов (при необходимости)
		 * Внимание! Данная строчка обязательна
		 */
		Boreas.module.call(this, arg1, arg2);

		/**
		 * Тут мы можем зарегистрировать используемые события модуля
		 */
		this.__registerEvents(['test_event']);

		/**
		 * Определение свойства для параметров инициализации
		 * @type {{}}
		 */
		this.params = {};

		/**
		 * Доп. свойство класса
		 * @type {string}
		 * @private
		 */
		this.__testProperty = 'Test';
	};
	/**
	 * Наследование от родительского класса
	 */
	Boreas.extend(customModule, Boreas.module);


	//  Остальные методы

	/**
	 *  Инициализация модуля
	 * @param params Параметры инициализации
	 */
	customModule.prototype.initialize = function (params) {
		$.extend( true, this.params, params );

		/**
		 *  Обязательно нужно выполнить встровенное событие "ready", чтоб сообщить приложению об окончании инициализации модуля.
		 */
		this.trigger('ready');
	};
})();