/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 15.06.2017
 * Time: 18:22
 */

import handler from "./handler";
import handlerItem from "./handlerItem";

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

		//let loadMethod = (scope.params.blob)?'__loadMediaBlob':'__loadMedia';
		let loadMethod = '__loadMedia';

		scope[loadMethod]().done(() => {
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
			promise = [],
			processed = [];

		$(this.params.selector).each(function(){
			let source = this,
				defer = new $.Deferred();

			//if(source.preload == 'none'){
				//source.load();
			//}
			//scope.__total++;

			let tagName = source.tagName.toLowerCase();
			let media = document.createElement(tagName);
			media.src = source.currentSrc;

			let item = new handlerItem(media.src, media);
			scope.addItem(item);

			media.load();

			//console.log('Starting load media: ' + source.currentSrc);

			let resolveItem = () => {
				processed.push(source.currentSrc);
				//scope.__updateItem(source.currentSrc);
				item.trigger('ready');
				defer.resolve();

			};

			media.addEventListener('canplaythrough', function(){
				if(processed.indexOf(source.currentSrc) !== -1) return;

				resolveItem();
			}, false);

			media.addEventListener('error', function(e){
				if(processed.indexOf(source.currentSrc) !== -1) return;

				resolveItem();

				let parts = source.currentSrc.split( '/' );
				item.addData(parts[parts.length-1] + ' file was resolved by event: error');
				//console.log(e);
			}, false);

			//	Test handle events
			let otherEvents = ['suspend', 'stalled'];
			for(let k in otherEvents){
				let eventName = otherEvents[k];

				media.addEventListener(eventName, function(e){
					if(processed.indexOf(source.currentSrc) !== -1) return;

					resolveItem();

					let parts = source.currentSrc.split( '/' );
					item.addData(parts[parts.length-1] + ' file was resolved by event: ' + eventName);

					//console.log(eventName + ' handled: ' + parts[parts.length-1]);
					//console.log(e);
				});
			}

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
	 *
	 * @private
	 */
	//ToDo Необходимо доработать с использованием handlerItem
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
	//ToDo Метод устарел
	/*__updateItem (src){
		this.__loaded++;
		let status = this.getStatus();
		status.src = src;
		this.trigger('progress', status);
	}*/
}