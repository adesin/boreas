/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 06.06.2017
 * Time: 17:54
 */

window['Boreas'] = (function(Boreas){
	'use strict';

	Boreas.DesignModel = (() => {
		return class DesignModel {
			initialize () {
				console.log('Initialize model');
			}
		}
	})();

	return Boreas;
})(window['Boreas'] || {});