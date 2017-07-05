/**
 * @author Anton Desin <anton.desin@gmail.com>
 * @link http://pirogov.ru/ Бюро Пирогова
 * Date: 23.06.2017
 * Time: 14:09
 */

import base from './base';

let testFile = '100kb';

export default class event extends base {

	static bandwidthTest (callback=()=>{}, url = testFile) {
		let startTime = (new Date()).getTime(),
			scope = this;

		var xhr = $.ajax({
			dataType: "text",
			url: url + '?t=' + Math.random(),
			success: function(msg){
				let endTime = (new Date()).getTime(),
					size = xhr.getResponseHeader('Content-Length'),
					duration = (endTime - startTime) / 1000,
					bits = size  * 8,
					bps = (bits / duration).toFixed(2),
					kbps = (bps / 1024).toFixed(2),
					mbps = (kbps / 1024).toFixed(2);

				if(typeof callback == 'function'){
					callback({
						"url": url,
						"size": size,
						"bps": bps,
						"kbps": kbps,
						"mbps": mbps
					});
				}else{
					scope.log("Boreas.network.bandwidthTest: callback не является функцией");
				}
			}
		});
	}
}