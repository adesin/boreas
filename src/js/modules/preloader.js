/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 06.06.2017
 * Time: 17:01
 */

import module from "../lib/module";
import imagesHandler from "./preloader/imagesHandler";
import mediaHandler from "./preloader/mediaHandler";

export default class preloader extends module {

	constructor (){
		super();
		let scope = this;

		scope.__registerEvents(['progress']);
		scope.params = {
			handlers: [],   //  Дополнительные обработчики
			methods: {      //  Методы для работы с представлениям, для переопределения
				show: this.__showPreloader,
				update: this.__updateBar,
				hide: this.__hidePreloader,
			},
			media: true,    //  Обрабатывать HTML5 Media (<audio> и <video>)
			delay: 800,     //  Время ожидания перед скрытием прелодера
			timeout: 30000, //  Максимальное время загрузки (на случай зависания)
			watcher: false, // Использовать watcher для анимации прелодера. int (ms) или false
		};
		scope.__handlers = [];  // Массив обработчиков прелодера
		scope.__status = {  // Текущий статус обработчика
			total: 0,       // Общее число элементов
			loaded: 0,      // Число загруженных элементов
			src: null,      // URL последнего загруженного элементв (если есть)
			desc: null,     // Описание последнего загруженного элементв (если есть)
		};
		scope.__$preloader = null;  // jQuery-объект прелодера
		scope.__watcherTt = null;   // Timeout AnimationWatcher'а
		scope.__ready = false;      // Готовность прелодера. Используется для взаимодействия с методом __forceFinish()
	}

	initialize (params={}) {
		let scope = this;
		$.extend( true, scope.params, params );

		scope.params.methods.show();

		//  Обработчики по-умолчанию
		scope.addHandler('images', imagesHandler);
		if(scope.params.media === true){
			scope.addHandler('media', mediaHandler);
		}

		//  Пользовательские обработчики
		if(scope.params.handlers.length){
			for(let i in scope.params.handlers){
				let handler = scope.params.handlers[i];
				if(typeof handler.params == 'undefined') handler.params = {};
				this.addHandler(handler.name, handler.class, handler.params);
			}
		}
		scope.__initHandlers();
		if(scope.params.watcher !== false){
			scope.__animationWatcher();
		}

		//  На случай если загрузка длится дольше, чем указано в настройках
		if(scope.params.timeout > 0){
			setTimeout(()=>{
				if(scope.__ready === false){
					scope.__forceFinish();
					scope.__ready = true;
				}
			}, scope.params.timeout);
		}

		// Прелодер считается загруженным когда общее
		// количество элементов равно количеству загруженных
		scope.on('progress', (status) => {
			if(scope.__watcherTt === null){ // На случае если не используется __animationWatcher()
				scope.params.methods.update(status);
			}
			if(status.loaded == status.total){
				setTimeout(function(){
					if(scope.__ready === false){
						scope.trigger('ready');
						scope.__ready = true;
					}
				}, scope.params.delay);
			}
		});

		// Действие выполняется когда прелодер загружен
		scope.on('ready', () => {
			window.scrollTo(0, 0);
			scope.params.methods.hide();
			if(scope.params.watcher !== false){
				scope.__animationWatcher(false);
			}

		});
	}

	/**
	 * Добавление обработчика загрузки
	 * @param name Имя обработчика
	 * @param handlerClass Класс обработчика. Должен быть унаследован от preloader/handler.js
	 * @param params Параметры инициализации обработчика
	 */
	addHandler (name, handlerClass, params={}) {
		this.__handlers.push({
			name: name,
			class: handlerClass,
			params: params,
		});
	}

	/**
	 * Метод отвечает за плавность анимации загрузки.
	 * Прелодер обновляется через  интервал scope.params.watcher,
	 * так-же к прогресс-бару необходимо добавить transition,
	 * по длительности равный данному параметру
	 * @param (boolean) start Запустить или остановить "animationWatcher"
	 * @private
	 */
	__animationWatcher (start=true){
		if(scope.params.watcher === false) return;
		let scope = this,
			value = 0;

		if(start === false){
			clearInterval(this.__watcherTt);
			scope.__watcherTt = null;
		}else if(start === true && scope.__watcherTt === null){
			scope.__watcherTt = setInterval(() => {
				if(value < scope.__status.loaded){
					scope.params.methods.update(scope.__status);
					value = scope.__status.loaded;
				}
			}, scope.params.watcher);
		}
	}

	/**
	 * Метод отображает прелодер.
	 * Переопределяется параметром methods.show.
	 * @private
	 */
	__showPreloader (){
		$('body').addClass('boreas-preloader-opened');
		this.__$preloader = $('.boreas-preloader');
		if(!this.__$preloader.length){
			this.__$preloader = $(`<div class="boreas-preloader">
				<div class="progress">
					<div class="progress-bar" role="progressbar" style="width: 0%"></div>
				</div>
			</div>`);
			$('body').append(this.__$preloader);
		}
	}

	/**
	 * Метод обновляет прогресс-бар.
	 * Переопределяется параметром methods.update.
	 * @param status
	 * @private
	 */
	__updateBar (status=null) {
		let percent = parseInt(100 / status.total * status.loaded);

		this.__$preloader
			.find('.progress-bar')
			.css({width: percent+'%'})
			.attr('aria-valuenow', percent);
	}

	/**
	 * Метод скрывает прелодер.
	 * Переопределяется параметром methods.hide.
	 * @private
	 */
	__hidePreloader (){
		$('body').removeClass('boreas-preloader-opened');
		this.__$preloader.fadeOut();
	}

	/**
	 * Метод принудительно останавливает и скрывает прелодер.
	 * Предназначен для случаев зависания.
	 * @private
	 */
	__forceFinish (){
		let status = this.__status;
		status.loaded = status.total;
		this.params.methods.update(status);
		this.trigger('ready');
	}

	/**
	 * Инициализациф обработчиков
	 * @private
	 */
	__initHandlers () {
		let _this = this;

		for(let i in this.__handlers){
			this.__handlers[i].instance = new this.__handlers[i].class();
			this.__handlers[i].instance.on('progress', (status) => {
				_this.__updateStatus(status)
				_this.trigger('progress', _this.__status);
			});

			this.__handlers[i].instance.initialize(this.__handlers[i].params);
		}
	}

	/**
	 * Обновление статуса прелодера.
	 * Метод подсчитывает общее число всех и загруженных элементов
	 * из всех обработчиков и записывает их в scope.__status
	 * @param params
	 * @private
	 */
	__updateStatus (params={}){
		this.__status.total = 0;
		this.__status.loaded = 0;
		this.__status.src = (typeof params.src != 'undefined') ? params.src : null;
		this.__status.desc = (typeof params.desc != 'undefined') ? params.desc : null;

		for(let i in this.__handlers) {
			let handlerStatus = this.__handlers[i].instance.getStatus();
			this.__status.total += handlerStatus.total;
			this.__status.loaded += handlerStatus.loaded;
		}
	}
}