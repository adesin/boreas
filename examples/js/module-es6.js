/**
 * Кастомный модуль на EcmaScript 6
 */
class customModule2 extends Boreas.module {
	/**
	 * Конструктор класса
	 * @param arg1
	 * @param arg2
	 */
	constructor (arg1, arg2) {
		/**
		 * Вызов конструктора класса-родителя и передача аргументов (при необходимости)
		 * Внимание! Данная строчка обязательна
		 */
		super(arg1, arg2);

		/**
		 * Параметры модуля по-умолчанию
		 * @type {{param1: string, param2: string}}
		 * @private
		 */
		this.__defaults = {
			param1: 'value1',
			param2: 'value2',
		};

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
	}

	/**
	 *  Инициализация модуля
	 * @param params Параметры инициализации
	 */
	initialize (params = {}) {
		this.params = Object.assign({}, this.__defaults, params);

		/**
		 *  Обязательно нужно выполнить встровенное событие "ready", чтоб сообщить приложению об окончании инициализации модуля.
		 */
		this.trigger('ready');
	}
}