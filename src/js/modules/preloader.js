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
				update: this.__updatePercent,
				hide: this.__hidePreloader,
			},
			media: true,    //  Обрабатывать HTML5 Media (<audio>  и <video>)
			delay: 400,     //  Время ожидания перед скрытием прелодера
			timeout: 30000, //  Максимальное время загрузки (на случай зависания)
		};
		scope.__handlers = [];
		scope.__status = {
			total: 0,
			loaded: 0,
			src: null,
			desc: null,
		}
		scope.__$preloader = null;
		scope.__watcherTt = null;
		scope.__ready = false;
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
		scope.__load();
		scope.__animationWatcher();

		if(scope.params.timeout > 0){
			setTimeout(()=>{
				if(scope.__ready === false){
					scope.__forceFinish();
					scope.__ready = true;
				}
			}, scope.params.timeout)  //  На случай если загрузка длится дольше, чем указано в настройках
		}

		scope.on('progress', (status) => {
			//scope.params.methods.update(status);

			if(status.loaded == status.total){
				setTimeout(function(){
					if(scope.__ready === false){
						scope.trigger('ready');
						scope.__ready = true;
					}
				}, 1500);
			}
		});
		scope.on('ready', () => {
			window.scrollTo(0, 0);
			scope.params.methods.hide();
			scope.__animationWatcher(false);
		});
	}

	addHandler (name, handlerClass, params={}) {
		this.__handlers.push({
			name: name,
			class: handlerClass,
			params: params,
		});
	}

	__animationWatcher (start=true){
		let scope = this,
			value = 0;

		if(start === false){
			clearInterval(this.__watcherTt);
			scope.__watcherTt = null;
		}else if(start === true && scope.__watcherTt === null){
			scope.__watcherTt = setInterval(() => {
				//scope.log(scope.__status);

				if(value < scope.__status.loaded){
					scope.params.methods.update(scope.__status);
					value = scope.__status.loaded;
				}
			}, scope.params.delay);
		}
	}

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
	__updatePercent (status=null) {
		//if(!status) status = this.__getStatus();

		let percent = parseInt(100 / status.total * status.loaded);
		//this.log(percent);

		this.__$preloader
			.find('.progress-bar')
			.css({width: percent+'%'})
			.attr('aria-valuenow', percent)
			//.text(percent+'%');
	}
	__hidePreloader (){
		$('body').removeClass('boreas-preloader-opened');
		this.__$preloader.fadeOut();
	}

	__forceFinish (){
		let status = this.__status;
		status.loaded = status.total;
		this.params.methods.update(status);
		this.trigger('ready');
	}

	__load () {
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