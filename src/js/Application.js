/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 06.06.2017
 * Time: 14:38
 */

window['Boreas'] = (function(Boreas){
	'use strict';

	Boreas.Application = (() => {
		let defaults = {
			preloader: false
		};
		let options = {};

		return class Application {
			run (params = {}){
				this.__initPreloader(params);

				options = Object.assign({}, defaults, params, options);


			}

			__initPreloader (params){
				let $body = $('body');

				if($body.length && $body.data('preloader')){
					options.preloader = true;
				}

				if(typeof params.preloader != undefined){
					options.preloader = params.preloader;
				}

				if(options.preloader !== false){
					let params = (typeof options.preloader == 'boolean')?undefined:options.preloader;
					let preloader = new Boreas.Preloader(params);
					preloader.initialize();
				}
				/*
				if(options.preloader === true){
					var preloader = new Boreas.Preloader();
				}
				*/
			}

		}
	})();

	return Boreas;
})(window['Boreas'] || {});