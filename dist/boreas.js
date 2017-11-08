var Boreas =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 11);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base2 = __webpack_require__(3);

var _base3 = _interopRequireDefault(_base2);

var _event = __webpack_require__(10);

var _event2 = _interopRequireDefault(_event);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Клас описывает стандартный функционал модулей.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * От него необходимо наследовать все модули приложения.
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Anton Desin <anton.desin@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @link http://pirogov.ru/ Бюро Пирогова
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date: 08.06.2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Time: 12:10
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var _module = function (_base) {
	_inherits(module, _base);

	/**
  * Конструктор класса
  */
	function module() {
		_classCallCheck(this, module);

		var _this = _possibleConstructorReturn(this, (module.__proto__ || Object.getPrototypeOf(module)).call(this));

		_this.__events = {};
		_this.__registerEvents(['ready']);
		return _this;
	}

	/**
  * Инициализация модуля
  * @param params - Параметры модуля
  * @param container - HTML контейнер модуля, jQuery-объект или селектор
  */


	_createClass(module, [{
		key: 'initialize',
		value: function initialize() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
			var container = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'body';

			var $container = null; //  jQuery-объект
			if (typeof container == 'string') {
				$container = $(container);
			} else {
				$container = container;
			}

			//  Далее инициализируем модуль внутри контейнера $container

			this.trigger('ready');
			//this.log(`Module "${this.constructor.name}" initialized`);
		}
	}, {
		key: 'someModuleMethod',
		value: function someModuleMethod() {
			var scope = this,
			    appInstance = scope.getApplicationInstance();
		}

		/**
   * Добавление обработчика события модуля
   * @param name Имя события
   * @param callback Функция-обработчик события
   * @returns {boolean}
   */

	}, {
		key: 'on',
		value: function on() {
			var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : function (params, scope) {};

			if (!name || !callback || typeof callback != 'function') {
				this.log(this.constructor.name + '.on: \u041D\u0435 \u043F\u0435\u0440\u0435\u0434\u0430\u043D\u044B \u043E\u0431\u044F\u0437\u0430\u0442\u0435\u043B\u044C\u043D\u044B\u0435 \u043F\u0430\u0440\u0430\u043C\u0435\u0442\u0440\u044B');
				return false;
			}

			if (typeof this.__events[name] == 'undefined') {
				this.log(this.constructor.name + '.on: \u0421\u043E\u0431\u044B\u0442\u0438\u0435 "' + name + '" \u043D\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043E');
				return false;
			}

			return this.__events[name].addHandler(callback);
		}

		/**
   * Удаление обработчика события
   * @param name Имя события
   * @param callback Функция-обработчик события. Если не передана, то метод удалит все обработчики
   * @returns {boolean}
   */

	}, {
		key: 'off',
		value: function off() {
			var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			var callback = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

			if (!name) return false;

			if (typeof this.__events[name] == 'undefined') {
				this.log(this.constructor.name + '.off: \u0421\u043E\u0431\u044B\u0442\u0438\u0435 "' + name + '" \u043D\u0435 \u043E\u043F\u0440\u0435\u0434\u0435\u043B\u0435\u043D\u043E');
				return false;
			}

			if (callback && typeof callback == 'function') {
				this.__events[name].removeHandler(callback);
			} else {
				delete this.__events[name];
				return true;
			}
			//return false;
		}

		/**
   * Выполнение события модуля
   * @param name Имя события
   * @param params Параметры, которые будут переданы callback-функции
   * @return {boolean}
   */

	}, {
		key: 'trigger',
		value: function trigger() {
			var name = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
			var params = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

			if (typeof this.__events[name] != 'undefined') {
				return this.__events[name].execute(params, this);
			}
			return false;
		}

		/**
   * Регистрация событий модуля
   * @param value Имя события или массив
   * @private
   */

	}, {
		key: '__registerEvents',
		value: function __registerEvents() {
			var _this2 = this;

			var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			if (!value) return false;

			if ((typeof value === 'undefined' ? 'undefined' : _typeof(value)) == 'object') {
				value.forEach(function (name, k) {
					_this2.__events[name] = new _event2.default({
						name: name
					});
				});
			} else if (typeof value == 'string') {
				var name = value;
				this.__events[name] = new _event2.default({
					name: name
				});
			}
			return true;
		}
	}]);

	return module;
}(_base3.default);

exports.default = _module;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _module3 = __webpack_require__(0);

var _module4 = _interopRequireDefault(_module3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Anton Desin <anton.desin@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @link http://pirogov.ru/ Бюро Пирогова
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date: 13.06.2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Time: 9:37
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

/**
 * Данный абстрактный класс используется для наследования от него обработчиков модуля preloader
 *
 * Обязатенльные методы:
 * initialize() - Производоит инициализацию обработчика
 * getStatus() - объект { total: N1, loaded: N2 }, где N1 - общее число загружаемых элементов, а N2 - число загруженных на данный момент  элементов
 *
 * Обязательно должны выполняться события:
 * progress - отдаёт прелодеру новое число загруженных элементов
 * ready - сообщает прелодеру, что обработчик загрузил все элементы
 *
 */
var handler = function (_module) {
	_inherits(handler, _module);

	function handler() {
		_classCallCheck(this, handler);

		var _this = _possibleConstructorReturn(this, (handler.__proto__ || Object.getPrototypeOf(handler)).call(this));

		_this.__registerEvents(['progress']);
		_this.params = {};
		return _this;
	}

	_createClass(handler, [{
		key: 'initialize',
		value: function initialize() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			$.extend(true, this.params, params);

			this.trigger('progress', this.getStatus());
			this.trigger('ready');
		}
	}, {
		key: 'getStatus',
		value: function getStatus() {
			return {
				total: 0,
				loaded: 0,
				src: null
			};
		}
	}]);

	return handler;
}(_module4.default);

exports.default = handler;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _module3 = __webpack_require__(0);

var _module4 = _interopRequireDefault(_module3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Класс loader
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Выполняет отображение и скрытие индикатора загрузки
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Внимание! Для работы данного класса должна быть загружена и инициализирована библиотека CJSCore из 1C-Битрикс
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Anton Desin <anton.desin@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @link http://pirogov.ru/ Бюро Пирогова
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date: 06.06.2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Time: 14:49
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var loader = function (_module) {
	_inherits(loader, _module);

	function loader() {
		_classCallCheck(this, loader);

		var _this = _possibleConstructorReturn(this, (loader.__proto__ || Object.getPrototypeOf(loader)).call(this));

		var scope = _this;

		scope.isLoading = 0;
		return _this;
	}

	/**
  *  Метод показывает или прячет загрузчик
  * @param show
  */


	_createClass(loader, [{
		key: "process",
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
		key: "show",
		value: function show() {
			var scope = this;
			scope.isLoading++;
			if (scope.isLoading === 1) {
				this.__showLoader();
			}
		}

		/**
   *  Метод скрывает загрузчик, или отнимает счётчик
   */

	}, {
		key: "hide",
		value: function hide() {
			var scope = this;
			if (scope.isLoading > 0) {
				scope.isLoading--;
			}
			if (scope.isLoading === 0) {
				this.__hideLoader();
			}
		}

		/**
   * Метод отвечает непосредственно за отображение индикатора загрузки
   * @private
   */

	}, {
		key: "__showLoader",
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
		key: "__hideLoader",
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

	return loader;
}(_module4.default);

exports.default = loader;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * Базовый класс. От него наследуются все классы приложения
 *
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 09.06.2017
 * Time: 9:24
 */

var base = function () {
  function base() {
    _classCallCheck(this, base);
  }

  _createClass(base, [{
    key: "log",
    value: function log(message) {
      if (console && console.log) {
        console.log(message);
      }
    }
  }]);

  return base;
}();

exports.default = base;

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _handler2 = __webpack_require__(1);

var _handler3 = _interopRequireDefault(_handler2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Anton Desin <anton.desin@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @link http://pirogov.ru/ Бюро Пирогова
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date: 12.06.2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Time: 18:53
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var imagesHandler = function (_handler) {
	_inherits(imagesHandler, _handler);

	function imagesHandler() {
		_classCallCheck(this, imagesHandler);

		var _this = _possibleConstructorReturn(this, (imagesHandler.__proto__ || Object.getPrototypeOf(imagesHandler)).call(this));

		_this.params = {
			selector: 'html',
			regex: {
				file: /(?:href="(.*?)")|(?:src="(.*?)")|(?:url\((.*?)\))/ig,
				quote: /(&quot;)|(')|(")/g,
				font: /@font-face\s*{([^}]*)}/ig,
				url: /url\(([^\)]+)\)/ig
			},
			extensions: {
				image: ["jpg", "jpeg", "png", "gif", "svg"],
				css: ['css', 'less', 'scss']
				//js: ['js'],
			},
			searchInCss: true
		};
		_this.__found = null;
		_this.__loaded = [];
		return _this;
	}

	_createClass(imagesHandler, [{
		key: "initialize",
		value: function initialize() {
			var _this2 = this;

			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			$.extend(true, this.params, params);

			//  Создаём ключи объекта в который будут помещаться найденные ресурсы
			this.__found = { font: [] };
			for (var type in this.params.extensions) {
				this.__found[type] = [];
			}

			//  Ищем ресурсы в области, селектора, переданного в параметрах
			var str = $(this.params.selector).html();
			var path = document.location.href.replace(/^(.*\/).*$/i, '$1');
			this.__findSources(str, path);

			//  Если в параметрах включена подгрузка CSS - то грузим их и обрабатываем
			if (this.params.searchInCss === true && this.__found.css.length) {
				this.__processCss(str).done(function () {
					_this2.__loadFiles();
				});
			} else {
				this.__loadFiles();
			}
		}
	}, {
		key: "getStatus",
		value: function getStatus() {
			return {
				total: this.__found.image.length,
				loaded: this.__loaded.length,
				src: null,
				desc: null
			};
		}

		/**
   * Метод ищет ресурсы в строке
   * @param str HTML или CSS
   * @private
   */

	}, {
		key: "__findSources",
		value: function __findSources(str) {
			var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

			this.__findFonts(str); // Сначала ищем в нашей строке шрифты

			var match = void 0;
			while (match = this.params.regex.file.exec(str)) {
				for (var i = match.length - 1; i >= 0; i--) {
					if (typeof match[i] !== 'undefined') {
						var url = path + match[i];
						url = url.replace(this.params.regex.quote, ''); //  Убираем ковычки из URL
						if (!url.length || url == '#' || url.indexOf('data:') !== -1) break; //  Отсекаем мусор
						if (this.__found.font.indexOf(url) !== -1) break; // Отсекаем найденные шрифты

						var fileType = this.__identifyFileType(url);
						if (fileType && this.__found[fileType].indexOf(url) == -1) {
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

	}, {
		key: "__findFonts",
		value: function __findFonts(str) {
			var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';

			var match = void 0,
			    subMatch = void 0;
			while (match = this.params.regex.font.exec(str)) {
				for (var i = match.length - 1; i >= 0; i--) {
					if (typeof match[i] !== 'undefined') {
						var subStr = match[i];
						while (subMatch = this.params.regex.url.exec(subStr)) {
							for (var _i = subMatch.length - 1; _i >= 0; _i--) {
								if (typeof subMatch[_i] !== 'undefined') {
									var url = path + subMatch[_i];
									url = url.replace(this.params.regex.quote, ''); //  Убираем ковычки из URL
									if (!url.length || url == '#' || url.indexOf('data:') !== -1) break; //  Отсекаем мусор

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

	}, {
		key: "__identifyFileType",
		value: function __identifyFileType(url) {
			var filetype = false,
			    extension = /[.]/.exec(url) ? /[^.]+$/.exec(url).toString() : undefined;

			if (typeof extension == 'undefined') return false;
			for (var type in this.params.extensions) {
				if (this.params.extensions[type].indexOf(extension) !== -1) {
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

	}, {
		key: "__loadFiles",
		value: function __loadFiles() {
			var _this3 = this;

			var promise = [];

			if (typeof this.__found.image != 'undefined' && this.__found.image.length) {
				var _loop = function _loop(i) {
					_this3.__loadImageAsync(_this3.__found.image[i]).promise().done(function () {
						_this3.__updateStatus(_this3.__found.image[i]);
					});
				};

				for (var i in this.__found.image) {
					_loop(i);
				}
			}
		}

		/**
   * Обновление статуса загрузки файла
   * @param src
   * @private
   */

	}, {
		key: "__updateStatus",
		value: function __updateStatus(src) {
			if (!this.__loaded) {
				this.__loaded = [];
			}
			this.__loaded.push(src);

			var status = this.getStatus();
			status.src = src;
			this.trigger('progress', status);

			if (status.total == status.loaded) {
				this.trigger('ready');
			}
		}

		/**
   * Метод загружает изображение в асинхронном режиме
   * @param url URL файла
   * @return {$.Deferred} Метод возвращает Deferred's Promise object
   * @private
   */

	}, {
		key: "__loadImageAsync",
		value: function __loadImageAsync(url) {
			var defer = new $.Deferred();

			var image = new Image();
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

	}, {
		key: "__processCss",
		value: function __processCss() {
			var promise = [];
			for (var i in this.__found.css) {
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

	}, {
		key: "__processUrlAsync",
		value: function __processUrlAsync(url) {
			var scope = this,
			    defer = new $.Deferred(),
			    path = url.replace(/^(.*\/).*$/i, '$1');

			$.ajax({
				url: url
			}).done(function (response) {
				scope.__findSources(response, path);
				defer.resolve();
			}).fail(function () {
				defer.resolve();
			});

			return defer;
		}
	}]);

	return imagesHandler;
}(_handler3.default);

exports.default = imagesHandler;

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _handler2 = __webpack_require__(1);

var _handler3 = _interopRequireDefault(_handler2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Anton Desin <anton.desin@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @link http://pirogov.ru/ Бюро Пирогова
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date: 15.06.2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Time: 18:22
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var mediaHandler = function (_handler) {
	_inherits(mediaHandler, _handler);

	function mediaHandler() {
		_classCallCheck(this, mediaHandler);

		var _this = _possibleConstructorReturn(this, (mediaHandler.__proto__ || Object.getPrototypeOf(mediaHandler)).call(this));

		_this.params = {
			selector: 'audio, video',
			blob: false
		};

		_this.__total = 0;
		_this.__loaded = 0;
		return _this;
	}

	_createClass(mediaHandler, [{
		key: 'initialize',
		value: function initialize() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var scope = this;
			$.extend(true, this.params, params);

			var loadMethod = scope.params.blob ? '__loadMediaBlob' : '__loadMedia';
			this[loadMethod]().done(function () {
				scope.trigger('ready');
			});
		}

		/**
   * Получение статуса загрузки
   * @return {{total: number, loaded: number}}
   */

	}, {
		key: 'getStatus',
		value: function getStatus() {
			return {
				total: this.__total,
				loaded: this.__loaded,
				src: null,
				desc: null
			};
		}

		/**
   * Обработка загрузки медиа
   * @private
   */

	}, {
		key: '__loadMedia',
		value: function __loadMedia() {
			var scope = this,
			    promise = [],
			    processed = [];

			$(this.params.selector).each(function () {
				var source = this,
				    defer = new $.Deferred();

				//if(source.preload == 'none'){
				source.load();
				//}
				scope.__total++;

				/*
    let tagName = source.tagName.toLowerCase();
    let media = document.createElement(tagName);
    media.src = source.currentSrc;
    media.load();
    */
				//console.log('Starting load media: ' + source.currentSrc);

				source.addEventListener('canplaythrough', function () {
					if (processed.indexOf(source.currentSrc) !== -1) return;

					processed.push(source.currentSrc);
					scope.__updateItem(source.currentSrc);
					defer.resolve();

					//console.log('Media loaded: ' + source.currentSrc);
				}, false);

				source.addEventListener('error', function (e) {
					if (processed.indexOf(source.currentSrc) !== -1) return;

					processed.push(source.currentSrc);
					scope.__updateItem(source.currentSrc);
					defer.resolve();

					console.log(e);

					//console.log('Media error: ' + source.currentSrc);
				}, false);

				//	Test handle events
				var events = ['loadstart', 'progress', 'suspend', 'abort', 'emptied', 'stalled', 'loadedmetadata', 'loadeddata', 'canplay', 'playing', 'waiting', 'seeking', 'seeked', 'ended', 'durationchange', 'timeupdate', 'play, pause', 'ratechange', 'resize', 'volumechange'];

				var _loop = function _loop(k) {
					var eventName = events[k];

					source.addEventListener(eventName, function (e) {
						console.log(eventName + ' handled: ' + source.currentSrc);
						console.log(eventName);
					});
				};

				for (var k in events) {
					_loop(k);
				}

				promise.push(defer);
			});

			//  Если promise пуст, то создаём и резолвим пустой $.Deferred()
			if (!promise.length) {
				var defer = new $.Deferred();
				defer.resolve();
				promise.push(defer);
			}

			return $.when.apply(undefined, promise).promise();
		}
	}, {
		key: '__loadMediaBlob',
		value: function __loadMediaBlob() {
			var scope = this,
			    promise = [];

			$(this.params.selector).each(function () {
				var media = this,
				    defer = new $.Deferred();

				scope.__total++;

				var req = new XMLHttpRequest();
				req.open('GET', media.currentSrc, true);
				req.responseType = 'blob';

				req.onload = function () {
					if (this.status === 200) {
						var mediaBlob = this.response;
						var blobUrl = URL.createObjectURL(mediaBlob); // IE10+
						media.src = blobUrl;
					}

					scope.__updateItem(media.currentSrc);
					defer.resolve();
				};
				req.onerror = function () {
					scope.__updateItem(media.currentSrc);
					defer.resolve();
				};
				req.send();

				promise.push(defer);
			});

			//  Если promise пуст, то создаём и резолвим пустой $.Deferred()
			if (!promise.length) {
				var defer = new $.Deferred();
				defer.resolve();
				promise.push(defer);
			}

			return $.when.apply(undefined, promise).promise();
		}

		/**
   * Говорим что был загружен один элемент
   * @private
   */

	}, {
		key: '__updateItem',
		value: function __updateItem(src) {
			this.__loaded++;
			var status = this.getStatus();
			status.src = src;
			this.trigger('progress', status);
		}
	}]);

	return mediaHandler;
}(_handler3.default);

exports.default = mediaHandler;

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _module3 = __webpack_require__(0);

var _module4 = _interopRequireDefault(_module3);

var _imagesHandler = __webpack_require__(4);

var _imagesHandler2 = _interopRequireDefault(_imagesHandler);

var _mediaHandler = __webpack_require__(5);

var _mediaHandler2 = _interopRequireDefault(_mediaHandler);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Anton Desin <anton.desin@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @link http://pirogov.ru/ Бюро Пирогова
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date: 06.06.2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Time: 17:01
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var preloader = function (_module) {
	_inherits(preloader, _module);

	function preloader() {
		_classCallCheck(this, preloader);

		var _this2 = _possibleConstructorReturn(this, (preloader.__proto__ || Object.getPrototypeOf(preloader)).call(this));

		var scope = _this2;

		scope.__registerEvents(['progress']);
		scope.params = {
			handlers: [], //  Дополнительные обработчики
			methods: { //  Методы для работы с представлениям, для переопределения
				show: _this2.__showPreloader,
				update: _this2.__updateBar,
				hide: _this2.__hidePreloader
			},
			css: true, //	Обрабатывать файлы CSS
			media: true, //  Обрабатывать HTML5 Media (<audio> и <video>)
			delay: 800, //  Время ожидания перед скрытием прелодера
			timeout: 30000, //  Максимальное время загрузки (на случай зависания)
			watcher: false // Использовать watcher для анимации прелодера. int (ms) или false

		};
		scope.__handlers = []; // Массив обработчиков прелодера
		scope.__status = { // Текущий статус обработчика
			total: 0, // Общее число элементов
			loaded: 0, // Число загруженных элементов
			src: null, // URL последнего загруженного элементв (если есть)
			desc: null // Описание последнего загруженного элементв (если есть)
		};
		scope.__$preloader = null; // jQuery-объект прелодера
		scope.__watcherTt = null; // Timeout AnimationWatcher'а
		scope.__ready = false; // Готовность прелодера. Используется для взаимодействия с методом __forceFinish()
		return _this2;
	}

	_createClass(preloader, [{
		key: "initialize",
		value: function initialize() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var scope = this;
			$.extend(true, scope.params, params);

			scope.params.methods.show();

			//  Обработчики по-умолчанию
			scope.addHandler('images', _imagesHandler2.default, {
				searchInCss: scope.params.css
			});
			if (scope.params.media === true) {
				scope.addHandler('media', _mediaHandler2.default);
			}

			//  Пользовательские обработчики
			if (scope.params.handlers.length) {
				for (var i in scope.params.handlers) {
					var handler = scope.params.handlers[i];
					if (typeof handler.params == 'undefined') handler.params = {};
					this.addHandler(handler.name, handler.class, handler.params);
				}
			}
			scope.__initHandlers();
			if (scope.params.watcher !== false) {
				scope.__animationWatcher();
			}

			//  На случай если загрузка длится дольше, чем указано в настройках
			if (scope.params.timeout > 0) {
				setTimeout(function () {
					if (scope.__ready === false) {
						scope.__forceFinish();
						scope.__ready = true;
					}
				}, scope.params.timeout);
			}

			// Прелодер считается загруженным когда общее
			// количество элементов равно количеству загруженных
			scope.on('progress', function (status) {
				if (scope.__watcherTt === null) {
					// На случае если не используется __animationWatcher()
					scope.params.methods.update(status);
				}
				if (status.loaded == status.total) {
					setTimeout(function () {
						if (scope.__ready === false) {
							scope.trigger('ready');
							scope.__ready = true;
						}
					}, scope.params.delay);
				}
			});

			// Действие выполняется когда прелодер загружен
			scope.on('ready', function () {
				window.scrollTo(0, 0);
				scope.params.methods.hide();
				if (scope.params.watcher !== false) {
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

	}, {
		key: "addHandler",
		value: function addHandler(name, handlerClass) {
			var params = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

			this.__handlers.push({
				name: name,
				class: handlerClass,
				params: params
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

	}, {
		key: "__animationWatcher",
		value: function __animationWatcher() {
			var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : true;

			if (scope.params.watcher === false) return;
			var scope = this,
			    value = 0;

			if (start === false) {
				clearInterval(this.__watcherTt);
				scope.__watcherTt = null;
			} else if (start === true && scope.__watcherTt === null) {
				scope.__watcherTt = setInterval(function () {
					if (value < scope.__status.loaded) {
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

	}, {
		key: "__showPreloader",
		value: function __showPreloader() {
			$('body').addClass('boreas-preloader-opened');
			this.__$preloader = $('.boreas-preloader');
			if (!this.__$preloader.length) {
				this.__$preloader = $("<div class=\"boreas-preloader\">\n\t\t\t\t<div class=\"progress\">\n\t\t\t\t\t<div class=\"progress-bar\" role=\"progressbar\" style=\"width: 0%\"></div>\n\t\t\t\t</div>\n\t\t\t</div>");
				$('body').append(this.__$preloader);
			}
		}

		/**
   * Метод обновляет прогресс-бар.
   * Переопределяется параметром methods.update.
   * @param status
   * @private
   */

	}, {
		key: "__updateBar",
		value: function __updateBar() {
			var status = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;

			var percent = parseInt(100 / status.total * status.loaded);

			this.__$preloader.find('.progress-bar').css({ width: percent + '%' }).attr('aria-valuenow', percent);
		}

		/**
   * Метод скрывает прелодер.
   * Переопределяется параметром methods.hide.
   * @private
   */

	}, {
		key: "__hidePreloader",
		value: function __hidePreloader() {
			$('body').removeClass('boreas-preloader-opened');
			this.__$preloader.fadeOut();
		}

		/**
   * Метод принудительно останавливает и скрывает прелодер.
   * Предназначен для случаев зависания.
   * @private
   */

	}, {
		key: "__forceFinish",
		value: function __forceFinish() {
			var status = this.__status;
			status.loaded = status.total;
			this.params.methods.update(status);
			this.trigger('ready');
		}

		/**
   * Инициализациф обработчиков
   * @private
   */

	}, {
		key: "__initHandlers",
		value: function __initHandlers() {
			var _this = this;

			for (var i in this.__handlers) {
				this.__handlers[i].instance = new this.__handlers[i].class();
				this.__handlers[i].instance.on('progress', function (status) {
					_this.__updateStatus(status);
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

	}, {
		key: "__updateStatus",
		value: function __updateStatus() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			this.__status.total = 0;
			this.__status.loaded = 0;
			this.__status.src = typeof params.src != 'undefined' ? params.src : null;
			this.__status.desc = typeof params.desc != 'undefined' ? params.desc : null;

			for (var i in this.__handlers) {
				var handlerStatus = this.__handlers[i].instance.getStatus();
				this.__status.total += handlerStatus.total;
				this.__status.loaded += handlerStatus.loaded;
			}
		}
	}]);

	return preloader;
}(_module4.default);

exports.default = preloader;

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _module3 = __webpack_require__(0);

var _module4 = _interopRequireDefault(_module3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Anton Desin <anton.desin@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @link http://pirogov.ru/ Бюро Пирогова
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date: 06.06.2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Time: 14:38
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var moduleDefaults = {
	name: null,
	load: 'auto',
	async: true,
	params: undefined
};

var application = function (_module) {
	_inherits(application, _module);

	/**
  * Конструктор приложения
  */
	function application() {
		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, application);

		var _this = _possibleConstructorReturn(this, (application.__proto__ || Object.getPrototypeOf(application)).call(this));

		_this.params = {
			modules: [{
				name: 'loader', // Имя модуля
				load: true, // Загружать модуль. Возможные значения: true
				async: true,
				params: {/*
             'param1': 'value1',
             'param2': 'value2',
             */}
			}],
			modulesDataAttribute: 'boreas-modules'
		};
		$.extend(true, _this.params, params);
		_this.__includeModules(_this.params.modules);
		return _this;
	}

	/**
  * Инициализация приложения
  * @param params Объект, содержащий параметры инициализации
  */


	_createClass(application, [{
		key: 'initialize',
		value: function initialize() {
			var container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'body';

			var scope = this,
			    $container = null; //  jQuery-объект
			if (typeof container == 'string') {
				$container = $(container);
			} else {
				$container = container;
			}

			this.__loadModules($container, this.params.modules, function () {
				scope.trigger('ready');
			});
		}
	}, {
		key: 'registerModule',
		value: function registerModule(module) {
			var __defaults = moduleDefaults;
			module = $.extend(true, __defaults, module);
			this.params.modules.push(module);
		}
	}, {
		key: '__includeModules',
		value: function __includeModules(modules) {
			var scope = this;

			for (var i in modules) {
				var moduleItem = $.extend({}, moduleDefaults);
				if (typeof moduleItem == 'string') {
					moduleItem.name = modules[i];
				} else {
					moduleItem = $.extend(true, moduleItem, modules[i]);
				}

				var moduleClass = typeof moduleItem.class != 'undefined' ? moduleItem.class : __webpack_require__(12)("./" + moduleItem.name).default;
				moduleClass.prototype.getApplicationInstance = function () {
					return scope;
				};
				this[moduleItem.name] = new moduleClass();
			}
		}
	}, {
		key: '__getApplicationInstance',
		value: function __getApplicationInstance(scrope) {
			return scropt;
		}

		/**
   * Метод выполняет загрузку модулей в соответствии блоком "modules" параметров инициализации.
   * Сначала метод вызывается с async = false и по одному, синхронно загружает модули, в том порядке, который был передан в блоке "modules" параметров инициализации.
   * После окончания синхронной загрузки, метод вызывает сам себя и догружает оставшиеся модули в асинхронном режиме.
   *
   * @param modules Массив загружаемых модулей
   * @param callback Функция будет вызвана после окончания загрузки
   * @param async Асинхронная или синхронная загрузка модуля
   * @private
   */

	}, {
		key: '__loadModules',
		value: function __loadModules() {
			var $container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $('body');
			var modules = arguments[1];

			var _this2 = this;

			var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
			var async = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

			var scope = this,
			    promise = async === false ? null : [];

			var _loop = function _loop(i) {
				var moduleItem = $.extend({}, moduleDefaults);
				if (typeof moduleItem == 'string') {
					moduleItem.name = modules[i];
				} else {
					moduleItem = $.extend(true, moduleItem, modules[i]);
				}

				if (async !== moduleItem.async) return 'continue'; //  Отсеиваем модули с другим типом загрузки
				if (!scope.__isModuleEnabled($container, moduleItem)) return 'continue'; //  Отсеиваем отключённые модули

				if (async === false) {
					//  Синхронная загрузка модулей
					if (promise === null) {
						promise = scope.__loadModule($container, moduleItem).promise();
					} else {
						promise.done(function () {
							promise = scope.__loadModule($container, moduleItem).promise();
						});
					}
				} else {
					//  Асинхронная загрузка модулей
					promise.push(scope.__loadModule($container, moduleItem, true));
				}
			};

			for (var i in modules) {
				var _ret = _loop(i);

				if (_ret === 'continue') continue;
			}

			if (async === false) {
				//  Загружаем оставшиеся модули синхронно
				if (promise === null) {
					//   Если синхронных не нашлось, то грузим всё асинхронно
					this.__loadModules($container, modules, null, true).done(callback);
				} else {
					promise.done(function () {
						_this2.__loadModules($container, modules, null, true).done(callback);
					});
				}
			} else {
				//  Асинхронная загрузка модулей
				return $.when.apply(undefined, promise).promise();
			}
		}
	}, {
		key: '__isModuleEnabled',
		value: function __isModuleEnabled() {
			var $container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $('body');
			var moduleItem = arguments[1];

			var scope = this;

			if (moduleItem.load === true) {
				// Модуль включён
				return true;
			} else if (moduleItem.load === 'auto') {
				// Автоматический ражим загрузки модуля
				var modules = [];

				$container.find('[data-' + this.params.modulesDataAttribute + ']').each(function () {
					var data = $(this).data(scope.params.modulesDataAttribute).split(" ");
					modules = modules.concat(data);
				});

				if (modules.indexOf(moduleItem.name) !== -1) {
					return true;
				}
			}
			return false;
		}

		/**
   * Загрузка и инициализация модуля
   * @param moduleClass Класс модуля
   * @param moduleParams Параметры инициализации модуля
   * @returns {$.Deferred} Метод возвращает объект jQuery.Deferred или jQuery.Deferred's Promise в зависимости от типа загрузки
   * @private
   */

	}, {
		key: '__loadModule',
		value: function __loadModule() {
			var $container = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : $('body');
			var moduleItem = arguments[1];

			var scope = this,
			    defer = new $.Deferred();

			this[moduleItem.name].on('ready', function () {
				defer.resolve();
			});
			this[moduleItem.name].initialize(moduleItem.params, $container);
			return defer;
		}
	}]);

	return application;
}(_module4.default);

exports.default = application;

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

exports.default = extend;
/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 13.06.2017
 * Time: 11:40
 */

function extend(subClass, superClass) {
	if (typeof superClass !== "function" && superClass !== null) {
		throw new TypeError("Super expression must either be null or a function, not " + (typeof superClass === "undefined" ? "undefined" : _typeof(superClass)));
	}
	subClass.prototype = Object.create(superClass && superClass.prototype, {
		constructor: {
			value: subClass,
			enumerable: false,
			writable: true,
			configurable: true
		}
	});
	if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base2 = __webpack_require__(3);

var _base3 = _interopRequireDefault(_base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Anton Desin <anton.desin@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @link http://pirogov.ru/ Бюро Пирогова
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date: 23.06.2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Time: 14:09
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var testFile = '100kb';

var event = function (_base) {
	_inherits(event, _base);

	function event() {
		_classCallCheck(this, event);

		return _possibleConstructorReturn(this, (event.__proto__ || Object.getPrototypeOf(event)).apply(this, arguments));
	}

	_createClass(event, null, [{
		key: 'bandwidthTest',
		value: function bandwidthTest() {
			var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : function () {};
			var url = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : testFile;

			var startTime = new Date().getTime(),
			    scope = this;

			var xhr = $.ajax({
				dataType: "text",
				url: url + '?t=' + Math.random(),
				success: function success(msg) {
					var endTime = new Date().getTime(),
					    size = xhr.getResponseHeader('Content-Length'),
					    duration = (endTime - startTime) / 1000,
					    bits = size * 8,
					    bps = (bits / duration).toFixed(2),
					    kbps = (bps / 1024).toFixed(2),
					    mbps = (kbps / 1024).toFixed(2);

					if (typeof callback == 'function') {
						callback({
							"url": url,
							"size": size,
							"bps": bps,
							"kbps": kbps,
							"mbps": mbps
						});
					} else {
						scope.log("Boreas.network.bandwidthTest: callback не является функцией");
					}
				}
			});
		}
	}]);

	return event;
}(_base3.default);

exports.default = event;

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _base2 = __webpack_require__(3);

var _base3 = _interopRequireDefault(_base2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } /**
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Класс для работы с событиями модуля
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                *
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @author Anton Desin <anton.desin@gmail.com>
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * @link http://pirogov.ru/ Бюро Пирогова
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Date: 07.06.2017
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                * Time: 15:40
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                */

var event = function (_base) {
	_inherits(event, _base);

	/**
  * Конструктор класса, добавление private свойств
  * @param params
  */
	function event() {
		var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

		_classCallCheck(this, event);

		var _this = _possibleConstructorReturn(this, (event.__proto__ || Object.getPrototypeOf(event)).call(this));

		_this.name = typeof params.name != 'undefined' ? params.name : null;
		_this.handlers = [];
		return _this;
	}

	/**
  * Добавление обработчика события
  * @param params Параметры обработчика
  * @returns {boolean}
  */


	_createClass(event, [{
		key: 'addHandler',
		value: function addHandler() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			var handler = {};
			if ((typeof params === 'undefined' ? 'undefined' : _typeof(params)) == 'object' && typeof params.callback == 'function') {
				handler = params;
			} else if (typeof params == 'function') {
				handler.callback = params;
			} else {
				this.log('Неправильные параметры хэндлера');
			}

			if (typeof handler.callback == 'function') {
				this.handlers.push(handler);
				return true;
			}
			return false;
		}

		/**
   * Удаление обработчика события
   * @param callback Функция-обработчик, которую необходимо удалить
   * @returns {boolean}
   */

	}, {
		key: 'removeHandler',
		value: function removeHandler(callback) {
			if (this.handlers.length) {
				this.handlers.forEach(function (handler, index, object) {
					if (handler.callback === callback) {
						object.splice(index, 1);
					}
				});
			}
			return false;
		}

		/**
   * Выполнение события
   * @returns {boolean}
   */

	}, {
		key: 'execute',
		value: function execute() {
			var params = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

			if (this.handlers.length) {
				this.handlers.forEach(function (handler, i) {
					handler.callback(params, handler);
					return true;
				});
			}
			return false;
		}
	}]);

	return event;
}(_base3.default);

exports.default = event;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.loader = exports.network = exports.preloaderHandler = exports.extend = exports.module = exports.application = undefined;

var _application = __webpack_require__(7);

var _application2 = _interopRequireDefault(_application);

var _module2 = __webpack_require__(0);

var _module3 = _interopRequireDefault(_module2);

var _handler = __webpack_require__(1);

var _handler2 = _interopRequireDefault(_handler);

var _extend = __webpack_require__(8);

var _extend2 = _interopRequireDefault(_extend);

var _network = __webpack_require__(9);

var _network2 = _interopRequireDefault(_network);

var _loader = __webpack_require__(2);

var _loader2 = _interopRequireDefault(_loader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 08.06.2017
 * Time: 11:22
 */

exports.application = _application2.default;
exports.module = _module3.default;
exports.extend = _extend2.default;
exports.preloaderHandler = _handler2.default;
exports.network = _network2.default;
exports.loader = _loader2.default;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./loader": 2,
	"./loader.js": 2,
	"./preloader": 6,
	"./preloader.js": 6,
	"./preloader/handler": 1,
	"./preloader/handler.js": 1,
	"./preloader/imagesHandler": 4,
	"./preloader/imagesHandler.js": 4,
	"./preloader/mediaHandler": 5,
	"./preloader/mediaHandler.js": 5
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number or string
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 12;

/***/ })
/******/ ]);
//# sourceMappingURL=boreas.js.map