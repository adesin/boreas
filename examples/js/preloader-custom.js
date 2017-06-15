/**
 * Кастомный обработчик модуля Boreas.preloader
 */
(function () {
	'use strict';

	//  Конструктор
	window['customPreloaderHandler'] = function (arg) {
		Boreas.preloaderHandler.call(this, arg);    // Вызов конструктора класса-родителя

		this.__total = 20;
		this.__loaded = 0
	};
	//  Наследование от родительского класса
	Boreas.extend(customPreloaderHandler, Boreas.preloaderHandler);

	//  Остальные методы

	/**
	 * Инициализация обработчика
	 * @param params
	 */
	customPreloaderHandler.prototype.initialize = function (params) {
		if (typeof params == 'undefined') params = {};
		var _this = this;

		var ti = setInterval(function(){
			_this.__loaded += 1;
			var status = _this.getStatus();
			status.desc = "element #"+_this.__loaded;
			_this.trigger('progress', status);
			if(status.loaded == status.total){
				clearInterval(ti);
				_this.trigger('ready');
			}
		}, 200);
	};

	/**
	 * Метод возвращает объект, содержащий количество загруженных эелементов, а так-же общее число загружаемых элементов
	 * @return {{total: number, loaded: number}}
	 */
	customPreloaderHandler.prototype.getStatus = function(){
		return {
			total: this.__total,
			loaded: this.__loaded,
			src: null,
			desc: null,
		};
	};
})();