/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 06.06.2017
 * Time: 17:01
 */

window['Boreas'] = (function(Boreas){
	'use strict';

	Boreas.Preloader = (() => {
		return class Preloader extends Boreas.DesignModel {

		}
	})();

	return Boreas;
})(window['Boreas'] || {});