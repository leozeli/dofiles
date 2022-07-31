/*--------------------------------------------------------------
>>> GENERAL:
----------------------------------------------------------------
# YouTube home page
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# YOUTUBE HOME PAGE
--------------------------------------------------------------*/

extension.events.on('init', function (resolve) {
	if (/(www|m)\.youtube\.com\/?(\?|\#|$)/.test(location.href)) {

		chrome.storage.local.get('youtube_home_page', function (items) {
			var option = items.youtube_home_page;

			if (
				option === '/feed/trending' ||
				option === '/feed/subscriptions' ||
				option === '/feed/history' ||
				option === '/playlist?list=WL' ||
				option === '/playlist?list=LL' ||
				option === '/feed/library'
			) {
				location.replace(option);
			} else {
				resolve();
			}
		});
	} else {
		resolve();
	}
}, {
	async: true,
	prepend: true
});