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
			blob: false,
		};

		this.__total = 0;
		this.__loaded = 0;
	}

	initialize (params = {}) {
		let scope = this;
		$.extend( true, this.params, params );

		let loadMethod = (scope.params.blob)?'__loadMediaBlob':'__loadMedia';
		this[loadMethod]().done(() => {
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
			let source = this,
				defer = new $.Deferred();

			if(source.preload == 'none'){
				source.load();
			}
			scope.__total++;

			/*
			let tagName = source.tagName.toLowerCase();
			let media = document.createElement(tagName);
			media.src = source.currentSrc;
			media.load();
			*/
			//console.log('Starting load media: ' + source.currentSrc);

			source.addEventListener('canplaythrough', function(){
				scope.__updateItem(source.currentSrc);
				defer.resolve();
				//media.oncanplay = null;
				//console.log('Media loaded: ' + source.currentSrc);
			}, false);

			source.addEventListener('onerror', function(){
				scope.__updateItem(source.currentSrc);
				defer.resolve();
				//media.onerror = null;
			}, false);

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

	__loadMediaBlob () {
		let scope = this,
			promise = [];

		$(this.params.selector).each(function(){
			let media = this,
				defer = new $.Deferred();

			scope.__total++;

			var req = new XMLHttpRequest();
			req.open('GET', media.currentSrc, true);
			req.responseType = 'blob';

			req.onload = function() {
				if (this.status === 200) {
					let mediaBlob = this.response;
					let blobUrl = URL.createObjectURL(mediaBlob); // IE10+
					media.src = blobUrl;
				}

				scope.__updateItem(media.currentSrc);
				defer.resolve();
			};
			req.onerror = function() {
				scope.__updateItem(media.currentSrc);
				defer.resolve();
			};
			req.send();

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
	__updateItem (src){
		this.__loaded++;
		let status = this.getStatus();
		status.src = src;
		this.trigger('progress', status);
	}
}