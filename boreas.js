/**
 * Base Application on JavaScript
 * @version v1.0.0
 * @developer Anton Desin http://desin.name/
 * @site http://desin.name/
 * @email anton.desin@gmail.com
 */
'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 06.06.2017
 * Time: 14:38
 */

window['Boreas'] = function (Boreas) {
	'use strict';

	Boreas.Application = function () {
		var defaults = {
			preloader: false
		};
		var options = {};

		return function () {
			function Application() {
				_classCallCheck(this, Application);
			}

			_createClass(Application, [{
				key: 'run',
				value: function run() {
					var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

					this.__initPreloader(params);

					options = Object.assign({}, defaults, params, options);
				}
			}, {
				key: '__initPreloader',
				value: function __initPreloader(params) {
					var $body = $('body');

					if ($body.length && $body.data('preloader')) {
						options.preloader = true;
					}

					if (_typeof(params.preloader) != undefined) {
						options.preloader = params.preloader;
					}

					if (options.preloader !== false) {
						var _params = typeof options.preloader == 'boolean' ? undefined : options.preloader;
						var preloader = new Boreas.Preloader(_params);
						preloader.initialize();
					}
					/*
     if(options.preloader === true){
     	var preloader = new Boreas.Preloader();
     }
     */
				}
			}]);

			return Application;
		}();
	}();

	return Boreas;
}(window['Boreas'] || {});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 06.06.2017
 * Time: 17:54
 */

window['Boreas'] = function (Boreas) {
	'use strict';

	Boreas.DesignModel = function () {
		return function () {
			function DesignModel() {
				_classCallCheck(this, DesignModel);
			}

			_createClass(DesignModel, [{
				key: 'initialize',
				value: function initialize() {
					console.log('Initialize model');
				}
			}]);

			return DesignModel;
		}();
	}();

	return Boreas;
}(window['Boreas'] || {});
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Класс Loader
 * Выполняет отображение и скрытие индикатора загрузки
 *
 * Внимание! Для работы данного класса должна быть загружена и инициализирована библиотека CJSCore из 1C-Битрикс
 *
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 06.06.2017
 * Time: 14:49
 */

window['Boreas'] = function (Boreas) {
	'use strict';

	Boreas.Application.prototype.Loader = function () {
		var __isLoading = 0;

		return function () {
			function Loader() {
				_classCallCheck(this, Loader);
			}

			_createClass(Loader, null, [{
				key: 'process',

				/**
     *  Метод показывает или прячет загрузчик
     * @param show
     */
				value: function process() {
					var show = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

					if (show) {
						this.show();
					} else {
						this.hide();
					}
				}

				/**
     *  Метод показывает загрузчик или прибавляет счётчик
     */

			}, {
				key: 'show',
				value: function show() {
					__isLoading++;
					if (__isLoading === 1) {
						this.__showLoader();
					}
				}

				/**
     *  Метод скрывает загрузчик, или отнимает счётчик
     */

			}, {
				key: 'hide',
				value: function hide() {
					if (__isLoading > 0) {
						__isLoading--;
					}
					if (__isLoading === 0) {
						this.__hideLoader();
					}
				}

				/**
     * Метод отвечает непосредственно за отображение индикатора загрузки
     * @private
     */

			}, {
				key: '__showLoader',
				value: function __showLoader() {
					if (typeof BX != 'undefined') {
						BX.showWait();
					} else {
						if (console && console.log) {
							console.log("Для работы данного метода должна быть загружена и инициализирована библиотека CJSCore из 1C-Битрикс");
						}
					}
				}

				/**
     * Метод отвечает непосредственно за скрытие индикатора загрузки
     * @private
     */

			}, {
				key: '__hideLoader',
				value: function __hideLoader() {
					if (typeof BX != 'undefined') {
						BX.showWait();
					} else {
						if (console && console.log) {
							console.log("Для работы данного метода должна быть загружена и инициализирована библиотека CJSCore из 1C-Битрикс");
						}
					}
				}
			}]);

			return Loader;
		}();
	}();

	return Boreas;
}(window['Boreas'] || {});
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 06.06.2017
 * Time: 17:01
 */

window['Boreas'] = function (Boreas) {
	'use strict';

	Boreas.Preloader = function () {
		return function (_Boreas$DesignModel) {
			_inherits(Preloader, _Boreas$DesignModel);

			function Preloader() {
				_classCallCheck(this, Preloader);

				return _possibleConstructorReturn(this, (Preloader.__proto__ || Object.getPrototypeOf(Preloader)).apply(this, arguments));
			}

			return Preloader;
		}(Boreas.DesignModel);
	}();

	return Boreas;
}(window['Boreas'] || {});