/*------------------------------------------------------------------------------
4.5.0 PLAYLIST
------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------
4.5.1 UP NEXT AUTOPLAY
------------------------------------------------------------------------------*/

ImprovedTube.playlistUpNextAutoplay = function (event) {
	if (
		ImprovedTube.getParam(location.href, 'list') &&
		ImprovedTube.storage.playlist_up_next_autoplay === false
	) {
		event.preventDefault();
		event.stopPropagation();
	}
};


/*------------------------------------------------------------------------------
4.5.2 REVERSE
------------------------------------------------------------------------------*/

ImprovedTube.playlistReverse = function () {
	if (this.storage.playlist_reverse === true) {
		function update() {
			var results = ImprovedTube.elements.ytd_watch.data.contents.twoColumnWatchNextResults,
				playlist = results.playlist.playlist,
				autoplay = results.autoplay.autoplay;

			playlist.contents.reverse();

			playlist.currentIndex = playlist.totalVideos - playlist.currentIndex - 1;
			playlist.localCurrentIndex = playlist.contents.length - playlist.localCurrentIndex - 1;

			for (var i = 0, l = autoplay.sets.length; i < l; i++) {
				var item = autoplay.sets[i];

				item.autoplayVideo = item.previousButtonVideo;
				item.previousButtonVideo = item.nextButtonVideo;
				item.nextButtonVideo = item.autoplayVideo;
			}

			ImprovedTube.elements.ytd_watch.updatePageData_(JSON.parse(JSON.stringify(ImprovedTube.elements.ytd_watch.data)));

			setTimeout(function () {
				var playlist_manager = document.querySelector('yt-playlist-manager');

				ImprovedTube.elements.ytd_player.updatePlayerComponents(null, autoplay, null, playlist);
				playlist_manager.autoplayData = autoplay;
				playlist_manager.setPlaylistData(playlist);
				ImprovedTube.elements.ytd_player.updatePlayerPlaylist_(playlist);
			}, 100);
		}

		if (!document.querySelector('#it-reverse-playlist') && ImprovedTube.elements.playlist.actions) {
			var button = document.createElement('button'),
				svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
				path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

			button.id = 'it-reverse-playlist';
			button.className = 'style-scope yt-icon-button';
			button.addEventListener('click', function (event) {
				var playlist_manager = document.querySelector('yt-playlist-manager');

				event.preventDefault();
				event.stopPropagation();

				this.classList.toggle('active');

				ImprovedTube.playlistReversed = !ImprovedTube.playlistReversed;

				update();

				return false;
			}, true);

			svg.setAttributeNS(null, 'width', '24');
			svg.setAttributeNS(null, 'height', '24');
			svg.setAttributeNS(null, 'viewBox', '0 0 24 24');
			path.setAttributeNS(null, 'd', 'M9 3L5 6.99h3V14h2V6.99h3L9 3zm7 14.01V10h-2v7.01h-3L15 21l4-3.99h-3z');

			svg.appendChild(path);

			button.appendChild(svg);

			ImprovedTube.elements.playlist.actions.appendChild(button);
		}

		if (this.playlistReversed === true) {
			update();
		}
	}
};


/*------------------------------------------------------------------------------
4.5.3 REPEAT
------------------------------------------------------------------------------*/

ImprovedTube.playlistRepeat = function () {
	var button = ImprovedTube.elements.playlist.repeat_button,
		option = ImprovedTube.storage.playlist_repeat;

	if (button && (option === true && button.className.search('style-default-active') === -1 || option === 'disabled' && button.className.indexOf('style-default-active') !== -1)) {
		button.click();
	}
};


/*------------------------------------------------------------------------------
4.5.4 SHUFFLE
------------------------------------------------------------------------------*/

ImprovedTube.playlistShuffle = function () {
	var button = ImprovedTube.elements.playlist.shuffle_button,
		option = ImprovedTube.storage.playlist_shuffle;

	if (button && (option === true && button.className.search('style-default-active') === -1 || option === 'disabled' && button.className.indexOf('style-default-active') !== -1)) {
		button.click();
	}
};