/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 06.06.2017
 * Time: 14:38
 */

import module from "./module";

let moduleDefaults = {
		name: null,
		load: 'auto',
		async: true,
		params: undefined,
	};

export default class application extends module {

	/**
	 * Конструктор приложения
	 */
	constructor(params = {}){
		super();
		this.params = {
			modules: [
				{
					name: 'loader', // Имя модуля
					load: true,     // Загружать модуль. Возможные значения: true
					async: true,
					params: {
						'param1': 'value1',
						'param2': 'value2',
					}
				},
				/*
				 * Или так:
				 'loader',
				 */
			],
			modulesDataAttribute: 'boreas-modules',
		};
		this.params = $.extend( true, this.params, params );

		this.__includeModules(this.params.modules);
	}

	/**
	 * Инициализация приложения
	 * @param params Объект, содержащий параметры инициализации
	 */
	initialize () {
		let _this = this;

		this.__loadModules(this.params.modules, () => {
			_this.trigger('ready');
		})
	}

	registerModule (module) {
		module = $.extend( true, moduleDefaults, module );
		this.params.modules.push(module);
	}

	__includeModules (modules){
		modules.forEach((moduleItem, k) => {
			let moduleClass;

			if(typeof moduleItem == 'string'){
				moduleItem = { name: moduleItem };
			}
			moduleItem = $.extend( true, moduleDefaults, moduleItem );
			if(typeof moduleItem.class != 'undefined'){
				this[moduleItem.name] = new moduleItem.class();
			}else{
				moduleClass = require('../modules/' + moduleItem.name).default;
				this[moduleItem.name] = new moduleClass();
			}
		});
	}

	/**
	 * Метод выполняет загрузку модулей в соответствии блоком "modules" параметров инициализации.
	 * Сначала метод вызывается с async = false и по одному, синхронно загружает модули, в том порядке, который был передан в блоке "modules" параметров инициализации.
	 * После окончания синхронной загрузки, метод вызывает сам себя и догружает оставшиеся модули в асинхронном режиме.
	 *
	 * @param modules Массив загружаемых модулей
	 * @param callback Функция будет вызвана после окончания загрузки
	 * @param async Асинхронная или синхронная загрузка модуля
	 * @private
	 */
	__loadModules (modules, callback=null, async=false) {
		let _this = this,
			promise = (async===false)?null:[];

		modules.forEach((moduleItem, k) => {
			if(typeof moduleItem == 'string'){
				moduleItem = { name: moduleItem };
			}
			moduleItem = $.extend( true, moduleDefaults, moduleItem );
			if(async !== moduleItem.async) return;  //  Отсеиваем модули с другим типом загрузки
			if(!_this.__isModuleEnabled(moduleItem)) return; //  Отсеиваем отключённые модули

			if(async===false){//  Синхронная загрузка модулей
				if(promise === null){
					promise = _this.__loadModule(moduleItem).promise();
				}else{
					promise.done(() => {
						promise = _this.__loadModule(moduleItem).promise();
					});
				}
			}else{//  Асинхронная загрузка модулей
				promise.push(_this.__loadModule(moduleItem, true));
			}
		});

		if(async===false) {  //  Загружаем оставшиеся модули синхронно
			if(promise === null){  //   Если синхронных не нашлось, то грузим всё асинхронно
				this.__loadModules(modules, null, true).done(callback);
			}else{
				promise.done(() => {
					this.__loadModules(modules, null, true).done(callback);
				});
			}
		}else{//  Асинхронная загрузка модулей
			return $.when.apply(undefined, promise).promise();
		}
	}

	__isModuleEnabled (moduleItem){
		let _this = this;

		if(moduleItem.load === true){   // Модуль включён
			return true;
		}else if(moduleItem.load === 'auto'){   // Автоматический ражим загрузки модуля
			let modules = [];

			$('[data-'+this.params.modulesDataAttribute+']').each(function(){
				let data = $(this).data(_this.params.modulesDataAttribute).split(" ");
				modules = modules.concat(data);
			});

			if(modules.indexOf(moduleItem.name) !== -1){
				return true;
			}
		}
		return false;
	}

	/**
	 * Загрузка и инициализация модуля
	 * @param moduleClass Класс модуля
	 * @param moduleParams Параметры инициализации модуля
	 * @returns {$.Deferred} Метод возвращает объект jQuery.Deferred или jQuery.Deferred's Promise в зависимости от типа загрузки
	 * @private
	 */
	__loadModule (moduleItem) {
		let _this = this,
			defer = new $.Deferred();

		this[moduleItem.name].on('ready', function(){
			defer.resolve();
		});
		this[moduleItem.name].initialize(moduleItem.params);
		return defer;
	}
}