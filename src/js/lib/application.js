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
					params: {/*
						'param1': 'value1',
						'param2': 'value2',
					*/}
				},
				/*
				 * Или так:
				 'loader',
				 */
			],
			modulesDataAttribute: 'boreas-modules',
		};
		$.extend( true, this.params, params );
		this.__includeModules(this.params.modules);
	}

	/**
	 * Инициализация приложения
	 * @param params Объект, содержащий параметры инициализации
	 */
	initialize (container='body') {
		let scope = this,
			$container = null;  //  jQuery-объект
		if(typeof container == 'string'){
			$container = $(container);
		}else{
			$container = container;
		}

		this.__loadModules($container, this.params.modules, () => {
			scope.trigger('ready');
		})
	}

	registerModule (module) {
		let __defaults = moduleDefaults;
		module = $.extend( true, __defaults, module );
		this.params.modules.push(module);
	}

	__includeModules (modules){
		let scope = this;

		for(let i in modules){
			let moduleItem = $.extend({}, moduleDefaults);
			if(typeof moduleItem == 'string'){
				moduleItem.name = modules[i];
			}else{
				moduleItem = $.extend(true, moduleItem, modules[i] );
			}

			let moduleClass = (typeof moduleItem.class != 'undefined') ? moduleItem.class : require('../modules/' + moduleItem.name).default;
			moduleClass.prototype.getApplicationInstance = function (){
				return scope;
			};
			this[moduleItem.name] = new moduleClass();
		}
	}

	/**
	 * exprerimental method not used (maybe)
	 * @param scope
	 * @returns {*}
	 * @private
	 */
	__getApplicationInstance (scope) {
		return scope;
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
	__loadModules ($container=$('body'), modules, callback=null, async=false) {
		let scope = this,
			promise = (async===false)?null:[];

		for(let i in modules){
			let moduleItem = $.extend({}, moduleDefaults);
			if(typeof moduleItem == 'string'){
				moduleItem.name = modules[i];
			}else{
				moduleItem = $.extend(true, moduleItem, modules[i] );
			}

			if(async !== moduleItem.async) continue;  //  Отсеиваем модули с другим типом загрузки
			if(!scope.__isModuleEnabled($container, moduleItem)) continue; //  Отсеиваем отключённые модули

			if(async===false){//  Синхронная загрузка модулей
				if(promise === null){
					promise = scope.__loadModule($container, moduleItem).promise();
				}else{
					promise.done(() => {
						promise = scope.__loadModule($container, moduleItem).promise();
					});
				}
			}else{//  Асинхронная загрузка модулей
				promise.push(scope.__loadModule($container, moduleItem, true));
			}
		}

		if(async===false) {  //  Загружаем оставшиеся модули синхронно
			if(promise === null){  //   Если синхронных не нашлось, то грузим всё асинхронно
				this.__loadModules($container, modules, null, true).done(callback);
			}else{
				promise.done(() => {
					this.__loadModules($container, modules, null, true).done(callback);
				});
			}
		}else{//  Асинхронная загрузка модулей
			return $.when.apply(undefined, promise).promise();
		}
	}

	__isModuleEnabled ($container=$('body'), moduleItem){
		let scope = this;

		if(moduleItem.load === true){   // Модуль включён
			return true;
		}else if(moduleItem.load === 'auto'){   // Автоматический ражим загрузки модуля
			let modules = [];

			let containerData = $container.data(this.params.modulesDataAttribute);



			if(containerData){
				let data = containerData.split(" ");
				console.log(data);

				modules = modules.concat(data);
			}

			$container.find('[data-'+this.params.modulesDataAttribute+']').each(function(){
				let data = $(this).data(scope.params.modulesDataAttribute).split(" ");
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
	__loadModule ($container=$('body'), moduleItem) {
		let scope = this,
			defer = new $.Deferred();

		this[moduleItem.name].on('ready', function(){
			defer.resolve();
		});
		this[moduleItem.name].initialize(moduleItem.params, $container);
		return defer;
	}
}