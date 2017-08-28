/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 08.06.2017
 * Time: 11:22
 */

import application from './lib/application';
import module from './lib/module';
import handler from './modules/preloader/handler';
import extend from './lib/extend';
import network from './lib/network';
import loader from './modules/loader';

export {
	application,
	module,
	extend,
	handler as preloaderHandler,
	network,
	loader
};




