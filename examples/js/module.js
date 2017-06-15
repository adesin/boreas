$(function() {
	/**
	 * Созданём экземпляр приложения
	 */
	window['app'] = new Boreas.application({
		modules: [  //  Подключение кастомных модулей
			{
				name: 'customModule',   //  Имя модуля
				load: 'auto',           //  Способ загрузки. Модуль загрузится только на тех страницах, где задан параметр data-boreas-modules
				class: customModule     //  Класс модуля, унаследованный от Boreas.module
			},
			{
				name: 'customModule2',
				load: 'auto',
				class: customModule2
			}
		]
	});

	app.customModule.on('ready', function(){
		app.log("Кастомный модуль на EcmaScript 5 инициализирован!");
	});
	app.customModule2.on('ready', function(){
		app.log("Кастомный модуль на EcmaScript 6 инициализирован!");
	});

	app.initialize();
});