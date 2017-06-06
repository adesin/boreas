/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 06.06.2017
 * Time: 15:35
 */
'use strict';

var App;

$(function(){
	App = new Boreas.Application();

	App.run({
		preloader: {
			onProgress: function(value){

			}
		}
	});
	/*
	App.on('ready', function(){

	});
	*/
	/**
	 * Loader Examples
	 */
	$('.loader-show').on('click', function(){
		App.Loader.show();
	});
	$('.loader-hide').on('click', function(){
		App.Loader.hide();
	});
});