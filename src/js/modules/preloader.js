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

		this.__registerEvents(['progress']);
		this.params = {
			handlers: [],   //  Дополнительные обработчики
			methods: {      //  Методы для работы с представлениям, для переопределения
				show: this.__showPreloader,
				update: this.__updatePreloader,
				hide: this.__hidePreloader,
			},
			media: true,    //  Обрабатывать HTML5 Media (<audio>  и <video>)
			delay: 400,     //  Время ожидания перед скрытием прелодера
			timeout: 10000, //  Максимальное время загрузки (на случай зависания)
		};
		this.__handlers = [];
		this.__total = 0;
		this.__loaded = 0;
		this.__$preloader = null;
	}

	initialize (params={}) {
		let _this = this,
			_ready = false;
		this.params = Object.assign({}, this.params, params);
		this.params.methods.show();

		//  Обработчики по-умолчанию
		this.addHandler('images', imagesHandler);
		if(this.params.media === true){
			this.addHandler('media', mediaHandler);
		}

		//  Пользовательские обработчики
		if(this.params.handlers.length){
			for(let i in this.params.handlers){
				let handler = this.params.handlers[i];
				if(typeof handler.params == 'undefined') handler.params = {};
				this.addHandler(handler.name, handler.class, handler.params);
			}
		}
		this.__load();

		if(this.params.timeout > 0){
			setTimeout(()=>{
				if(_ready === false){
					_this.__forceFinish();
					_ready = true;
				}
			}, this.params.timeout)  //  На случай если загрузка длится дольше, чем указано в настройках
		}

		this.on('progress', (status) => {
			this.params.methods.update(status);
			if(status.loaded == status.total){
				setTimeout(function(){
					if(_ready === false){
						_this.trigger('ready');
						_ready = true;
					}
				}, _this.params.delay);
			}
		});
		this.on('ready', () => {
			window.scrollTo(0, 0);
			this.params.methods.hide();
		});
	}

	addHandler (name, handlerClass, params={}) {
		this.__handlers.push({
			name: name,
			class: handlerClass,
			params: params,
		});
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
	__updatePreloader (status=null) {
		if(!status) status = this.__getStatus();

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
		let status = this.__updateStatus();
		status.loaded = status.total;
		this.params.methods.update(status);
		this.trigger('ready');

	}

	__load () {
		let _this = this;

		for(let i in this.__handlers){
			this.__handlers[i].instance = new this.__handlers[i].class();
			this.__handlers[i].instance.on('progress', (params) => {
				_this.__updateStatus(params)
				_this.trigger('progress', _this.__updateStatus(params));
			});

			this.__handlers[i].instance.initialize(this.__handlers[i].params);
		}
	}

	__updateStatus (params={}){
		let status = {
			total: 0,
			loaded: 0,
			src: (typeof params.src != 'undefined') ? params.src : null,
			desc: (typeof params.desc != 'undefined') ? params.desc : null,
		}

		for(let i in this.__handlers) {
			let handlerStatus = this.__handlers[i].instance.getStatus();
			status.total += handlerStatus.total;
			status.loaded += handlerStatus.loaded;
		}

		return status;
	}
}