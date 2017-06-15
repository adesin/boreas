/**
 * Базовый класс. От него наследуются все классы приложения
 *
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 09.06.2017
 * Time: 9:24
 */

export default class base {
	log (message) {
		if(console && console.log) {
			console.log(message);
		}
	}
}