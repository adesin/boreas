/**
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

import module from "../lib/module";

export default class loader extends module {

	constructor () {
		super();
		let scope = this;

		scope.isLoading = 0;
	}

	/**
	 *  Метод показывает или прячет загрузчик
	 * @param show
	 */
	process(show = true){
		if(show){
			this.show();
		}else{
			this.hide();
		}
	}

	/**
	 *  Метод показывает загрузчик или прибавляет счётчик
	 */
	show (){
		let scope = this;
		scope.isLoading++;
		if(scope.isLoading === 1){
			this.__showLoader();
		}
	}

	/**
	 *  Метод скрывает загрузчик, или отнимает счётчик
	 */
	hide (){
		let scope = this;
		if(scope.isLoading > 0){
			scope.isLoading--;
		}
		if(scope.isLoading === 0){
			this.__hideLoader();
		}
	}

	/**
	 * Метод отвечает непосредственно за отображение индикатора загрузки
	 * @private
	 */
	__showLoader (){
		if(typeof BX != 'undefined'){
			BX.showWait();
		}else{
			if(console && console.log){
				console.log("Для работы данного метода должна быть загружена и инициализирована библиотека CJSCore из 1C-Битрикс");
			}
		}
	}

	/**
	 * Метод отвечает непосредственно за скрытие индикатора загрузки
	 * @private
	 */
	__hideLoader (){
		if(typeof BX != 'undefined'){
			BX.showWait();
		}else{
			if(console && console.log){
				console.log("Для работы данного метода должна быть загружена и инициализирована библиотека CJSCore из 1C-Битрикс");
			}
		}
	}
}