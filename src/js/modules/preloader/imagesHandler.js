/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 12.06.2017
 * Time: 18:53
 */

import handler from "./handler";

export default class imagesHandler extends handler {
	constructor () {
		super();

		this.params = {
			selector: 'html',
			regex: {
				file: /(?:href="(.*?)")|(?:src="(.*?)")|(?:url\((.*?)\))/ig,
				quote: /(&quot;)|(')|(")/g,
				font: /@font-face\s*{([^}]*)}/ig,
				url: /url\(([^\)]+)\)/ig,
			},
			extensions: {
				image: ["jpg", "jpeg", "png", "gif", "svg"],
				css: ['css', 'less', 'scss'],
				//js: ['js'],
			},
			searchInCss: true,
		};
		this.__found = null;
		this.__loaded = [];
	}

	initialize (params = {}) {
		$.extend( true, this.params, params );

		//  Создаём ключи объекта в который будут помещаться найденные ресурсы
		this.__found = { font:[] };
		for(let type in this.params.extensions){
			this.__found[type] = [];
		}

		//  Ищем ресурсы в области, селектора, переданного в параметрах
		let str = $(this.params.selector).html();
		let path = document.location.href.replace(/^(.*\/).*$/i, '$1');
		this.__findSources(str, path);

		//  Если в параметрах включена подгрузка CSS - то грузим их и обрабатываем
		if(this.params.searchInCss === true && this.__found.css.length){
			this.__processCss(str).done(() => {
				this.__loadFiles();
			});
		}else{
			this.__loadFiles();
		}
	}

	getStatus (){
		return {
			total: this.__found.image.length,
			loaded: this.__loaded.length,
			src: null,
			desc: null,
		};
	}

	/**
	 * Метод ищет ресурсы в строке
	 * @param str HTML или CSS
	 * @private
	 */
	__findSources (str, path='') {
		this.__findFonts(str);  // Сначала ищем в нашей строке шрифты

		let match;
		while(match = this.params.regex.file.exec(str)){
			for(let i = match.length - 1; i >= 0; i--){
				if(typeof match[i] !== 'undefined'){
					let url = path + match[i];
					url = url.replace(this.params.regex.quote, ''); //  Убираем ковычки из URL
					if(!url.length || url == '#' || url.indexOf('data:') !== -1) break; //  Отсекаем мусор
					if(this.__found.font.indexOf(url) !== -1) break;   // Отсекаем найденные шрифты

					let fileType = this.__identifyFileType(url);
					if(fileType && this.__found[fileType].indexOf(url) == -1){
						this.__found[fileType].push(url);
					}
					break;
				}
			}
		}
	}

	/**
	 * Метод ищет шрифты в строке
	 * Внимание! Данный обработчик не выполняет предзагрузку шрифтов, он их исключает
	 * @param str
	 * @private
	 */
	__findFonts (str) {
		let match, subMatch;
		while(match = this.params.regex.font.exec(str)) {
			for (let i = match.length - 1; i >= 0; i--) {
				if (typeof match[i] !== 'undefined') {
					let subStr = match[i];
					while(subMatch = this.params.regex.url.exec(subStr)) {
						for (let i = subMatch.length - 1; i >= 0; i--) {
							if (typeof subMatch[i] !== 'undefined') {
								let url = path + subMatch[i];
								url = url.replace(this.params.regex.quote, ''); //  Убираем ковычки из URL
								if(!url.length || url == '#' || url.indexOf('data:') !== -1) break; //  Отсекаем мусор

								this.__found['font'].push(url);
								break;
							}
						}
					}
					break;
				}
			}
		}
	}

	/**
	 * Определяет тип файла по URL. Соответствия расширений определены в параметрах инициализации
	 * @param url URL
	 * @return {string|false} Метод возвращает тип файла или false
	 * @private
	 */
	__identifyFileType (url) {
		let filetype = false,
			extension = (/[.]/.exec(url)) ? /[^.]+$/.exec(url).toString() : undefined;

		if(typeof extension == 'undefined') return false;
		for(let type in this.params.extensions){
			if(this.params.extensions[type].indexOf(extension) !== -1){
				filetype = type;
				break;
			}
		}
		return filetype;
	}

	/**
	 * Загрузка файлов
	 * @private
	 */
	__loadFiles () {
		let promise = [];

		if(typeof this.__found.image != 'undefined' && this.__found.image.length) {
			for (let i in this.__found.image) {
				this.__loadImageAsync(this.__found.image[i]).promise().done(() => {
					this.__updateStatus(this.__found.image[i]);
				});
			}
		}
	}

	/**
	 * Обновление статуса загрузки файла
	 * @param src
	 * @private
	 */
	__updateStatus (src) {
		if(!this.__loaded) {
			this.__loaded = [];
		}
		this.__loaded.push(src);

		let status = this.getStatus();
		status.src = src;
		this.trigger('progress', status);

		if(status.total == status.loaded){
			this.trigger('ready');
		}
	}

	/**
	 * Метод загружает изображение в асинхронном режиме
	 * @param url URL файла
	 * @return {$.Deferred} Метод возвращает Deferred's Promise object
	 * @private
	 */
	__loadImageAsync (url) {
		let defer = new $.Deferred();

		let image = new Image();
		image.src = url;
		image.onload = function () {
			defer.resolve();
		};
		image.onerror = function () {
			defer.resolve();
		};

		return defer;
	}

	/**
	 * Загрузка и обработка CSS-файлов
	 * @return {$.Deferred} Метод возвращает Deferred's Promise object
	 * @private
	 */
	__processCss (){
		let promise = [];
		for(var i in this.__found.css){
			promise.push(this.__processUrlAsync(this.__found.css[i]));
		}

		return $.when.apply(undefined, promise).promise();
	}

	/**
	 * Запрашивает URL в асинхронном режиме
	 * @param url
	 * @return {$.Deferred} Метод возвращает объект jQuery.Deferred
	 * @private
	 */
	__processUrlAsync (url){
		let scope = this,
			defer = new $.Deferred(),
			path = url.replace(/^(.*\/).*$/i, '$1');

		$.ajax({
			url: url
		}).done((response) => {
			scope.__findSources(response, path);
			defer.resolve();
		}).fail(() => {
			defer.resolve();
		});

		return defer;
	}
}