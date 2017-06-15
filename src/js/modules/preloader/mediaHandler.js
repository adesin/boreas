/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 15.06.2017
 * Time: 18:22
 */

import handler from "./handler";

export default class mediaHandler extends handler {
	constructor () {
		super();

		this.params = {
			selector: 'audio, video',
		};
		this.__total = 0;
		this.__loaded = 0;
	}

	initialize (params = {}) {
		this.params = Object.assign({}, this.params, params);

		this.__loadMedia().done(() => {
			this.trigger('ready');
		});
	}

	/**
	 * Получение статуса загрузки
	 * @return {{total: number, loaded: number}}
	 */
	getStatus (){
		return {
			total: this.__total,
			loaded: this.__loaded,
			src: null,
		};
	}

	/**
	 * Обработка загрузки медиа
	 * @private
	 */
	__loadMedia () {
		let promise = [];

		$(this.params.selector).each(function(){
			let media = this,
				defer = new $.Deferred();

			this.__total++;

			if(video.preload == 'none'){
				video.load();
			}
			video.oncanplay = () => {
				this.__itemLoaded(video.currentSrc);
				defer.resolve();
			};
			video.onerror = () => {
				this.__itemLoaded(video.currentSrc);
				defer.resolve();
			};
			promise.push(defer);
		});

		//  Если promise пуст, то создаём и резолвим пустой $.Deferred()
		if(!promise.length){
			let defer = new $.Deferred();
			defer.resolve();
			promise.push(defer);
		}

		return $.when.apply(undefined, promise).promise();
	}

	/**
	 * Говорим что был загружен один элемент
	 * @private
	 */
	__itemLoaded (src){
		this.__loaded++;
		let status = this.getStatus();
		status.src = src;
		this.trigger('progress', status);
	}
}