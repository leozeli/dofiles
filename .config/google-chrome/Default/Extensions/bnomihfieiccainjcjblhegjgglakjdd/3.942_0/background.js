/*--------------------------------------------------------------
>>> BACKGROUND
----------------------------------------------------------------
# Google Analytics
# Uninstall URL
# Context menu
# Tab focus/blur
# Message listener
--------------------------------------------------------------*/

/*--------------------------------------------------------------
# GOOGLE ANALYTICS
--------------------------------------------------------------*/

var _gaq = [];

function googleAnalytics(previous_time) {
    var version = chrome.runtime.getManifest().version,
        script = document.createElement('script'),
        current_time = new Date().getTime();

    _gaq.push(['_setAccount', 'UA-88354155-1']);
    _gaq.push(['_setSessionCookieTimeout', 14400000]);

    if (current_time - (previous_time || 0) >= 86400000) {
        _gaq.push([
            '_trackPageview',
            '/improvedtube-' + version + '/background',
            'page-loaded'
        ]);

        chrome.storage.local.set({
            ga: current_time
        });
    }

    script.src = 'https://ssl.google-analytics.com/ga.js';

    document.body.appendChild(script);
}

chrome.storage.local.get(function (items) {
    googleAnalytics(items.ga);
});

/*--------------------------------------------------------------
# UNINSTALL URL
--------------------------------------------------------------*/

chrome.runtime.setUninstallURL('https://improvedtube.com/uninstalled');


/*--------------------------------------------------------------
# CONTEXT MENU
--------------------------------------------------------------*/

function updateContextMenu(locale) {
	var items = [
		'donate',
		'rateMe',
		'GitHub'
	];

	chrome.contextMenus.removeAll();

	for (var i = 0; i < 3; i++) {
		var item = items[i];

		chrome.contextMenus.create({
			id: String(i),
			title: locale[item] || item,
			contexts: ['browser_action']
		});
	}

	chrome.contextMenus.onClicked.addListener(function (info) {
		var links = [
			'https://www.improvedtube.com/donate',
			'https://chrome.google.com/webstore/detail/improve-youtube-video-you/bnomihfieiccainjcjblhegjgglakjdd',
			'https://github.com/code4charity/YouTube-Extension'
		];

		window.open(links[info.menuItemId]);
	});
}


/*--------------------------------------------------------------
# TAB FOCUS/BLUR
--------------------------------------------------------------*/

chrome.tabs.onActivated.addListener(function (activeInfo) {
	chrome.tabs.sendMessage(activeInfo.tabId, {
		action: 'focus'
	});

	chrome.tabs.query({
		windowId: activeInfo.windowId
	}, function (tabs) {
		if (tabs) {
			for (var i = 0, l = tabs.length; i < l; i++) {
				if (tabs[i].id !== activeInfo.tabId) {
					chrome.tabs.sendMessage(tabs[i].id, {
						action: 'blur'
					});
				}
			}
		}
	});
});

chrome.windows.onFocusChanged.addListener(function (windowId) {
	chrome.windows.getAll(function (windows) {
		for (var i = 0, l = windows.length; i < l; i++) {
			if (windows[i].focused === true) {
				chrome.tabs.query({
					windowId: windows[i].id
				}, function (tabs) {
					if (tabs) {
						for (var j = 0, k = tabs.length; j < k; j++) {
							var tab = tabs[j];

							if (tab.active) {
								chrome.tabs.sendMessage(tab.id, {
									action: 'focus'
								});
							}
						}
					}
				});
			} else {
				chrome.tabs.query({
					windowId: windows[i].id
				}, function (tabs) {
					if (tabs) {
						for (var j = 0, k = tabs.length; j < k; j++) {
							var tab = tabs[j];

							chrome.tabs.sendMessage(tab.id, {
								action: 'blur'
							});
						}
					}
				});
			}
		}
	});
});


/*--------------------------------------------------------------
# MESSAGE LISTENER
--------------------------------------------------------------*/

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	var name = request.name;

	if (name === 'only-one-player') {
		chrome.tabs.query({}, function (tabs) {
			for (var i = 0, l = tabs.length; i < l; i++) {
				var tab = tabs[i];

				if (sender.tab.id !== tab.id) {
					chrome.tabs.sendMessage(tab.id, {
						action: 'pause'
					});
				}
			}
		});
	} else if (name === 'download') {
		chrome.permissions.request({
			permissions: ['downloads'],
			origins: ['https://www.youtube.com/*']
		}, function (granted) {
			if (granted) {
				try {
					var blob = new Blob([JSON.stringify(request.value)], {
						type: 'application/json;charset=utf-8'
					});

					chrome.downloads.download({
						url: URL.createObjectURL(blob),
						filename: request.filename,
						saveAs: true
					});
				} catch (error) {
					console.error(error);
				}
			} else {
				console.error('Permission is not granted.');
			}
		});
	} else if (name === 'export') {
		chrome.storage.local.get(function (data) {
			chrome.permissions.request({
				permissions: ['downloads'],
				origins: ['https://www.youtube.com/*']
			}, function (granted) {
				if (granted) {
					var blob = new Blob([JSON.stringify(data)], {
							type: 'application/octet-stream'
						}),
						date = new Date();

					chrome.downloads.download({
						url: URL.createObjectURL(blob),
						filename: 'improvedtube-' + (date.getMonth() + 1) + '-' + date.getDate() + '-' + date.getFullYear() + '.txt',
						saveAs: true
					});
				}
			});
		});
	}
});

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
	var action = message.action || message;

	if (action === 'options-page-connected') {
		sendResponse({
			isTab: sender.hasOwnProperty('tab')
		});
	} else if (action === 'tab-connected') {
		sendResponse({
			hostname: new URL(sender.url).hostname,
			tabId: sender.tab.id
		});
	}
});