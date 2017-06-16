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
		let scope = this;
		$.extend( this.params, params );

		this.__loadMedia().done(() => {
			scope.trigger('ready');
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
			desc: null,
		};
	}

	/**
	 * Обработка загрузки медиа
	 * @private
	 */
	__loadMedia () {
		let scope = this,
			promise = [];

		$(this.params.selector).each(function(){
			let media = this,
				defer = new $.Deferred();

			scope.__total++;

			if(media.preload == 'none'){
				media.load();
			}
			media.oncanplay = () => {
				scope.__itemLoaded(media.currentSrc);
				defer.resolve();
				media.oncanplay = null;
			};
			media.onerror = () => {
				scope.__itemLoaded(media.currentSrc);
				defer.resolve();
				media.onerror = null;
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