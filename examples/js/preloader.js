$(function() {
	/**
	 * Создаём экземпляр приложения
	 */
	window['app'] = new Boreas.application({
		modules: [
			{
				name: 'preloader',  //  Имя модуля
				load: 'auto',       //  Способ загрузки. Модуль загрузится только на тех страницах, где задан параметр data-boreas-modules
				async: false,       //  Синхронная загрузка. Такие модули загружаются по одному, в порядке, указанном в массиве modules[]. После этого загрузятся остальные модули, уже асинхронно.
				media: true,
				css: false,
				params: {
					/*handlers: [     //  Изпользование своих обработчиков предзагрузки
						{
							name: 'test',   //  Название
							class: customPreloaderHandler   // Класс обработчика, унаследованный от Boreas.preloaderHandler
						}
					]*/
				}
			}
		]
	});

	/**
	 * Инициализируем
	 */
	app.initialize();
	app.preloader.on('progress', function(data){
		console.log(data);
	});
});