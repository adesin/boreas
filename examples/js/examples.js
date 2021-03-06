/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 06.06.2017
 * Time: 15:35
 */


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
	}
	//  Наследование от родительского класса
	Boreas.extend(customPreloaderHandler, Boreas.preloaderHandler);

	//  Остальные методы

	/**
	 *
	 * @param params
	 */
	customPreloaderHandler.prototype.initialize = function (params) {
		if (typeof params == 'undefined') params = {};
		var _this = this;

		var ti = setInterval(function(){
			_this.__loaded += 1;
			var status = _this.getStatus();

			_this.trigger('progress', status);
			if(status.loaded == status.total){
				clearInterval(ti);
				_this.trigger('ready');
			}
		}, 500);
	}

	/**
	 * Метод возвращает объект, содержащий количество загруженных эелементов, а так-же общее число загружаемых элементов
	 * @return {{total: number, loaded: number}}
	 */
	customPreloaderHandler.prototype.getStatus = function(){
		return {
			total: this.__total,
			loaded: this.__loaded
		};
	}
})();

$(function() {
	window['app'] = new Boreas.application({
		modules: [
			'loader',
			{
				name: 'customModule',
				load: 'auto',
				class: customModule
			},
			{
				name: 'customModule2',
				load: 'auto',
				class: customModule2
			},
			{
				name: 'preloader',
				load: 'auto',
				async: false,
				params: {
					handlers: [
						//{ name: 'test', class: customPreloaderHandler }
					]
				}
			}
		]
	});

	app.on('ready', function () {
		console.log('Application is ready now!');
	});

	app.customModule.on('ready', function(){
		alert("Кастомный модуль на EcmaScript 5 инициализирован!");
	});
	app.customModule2.on('ready', function(){
		alert("Кастомный модуль на EcmaScript 6 инициализирован!");
	});

	app.registerModule()

	app.initialize();
});