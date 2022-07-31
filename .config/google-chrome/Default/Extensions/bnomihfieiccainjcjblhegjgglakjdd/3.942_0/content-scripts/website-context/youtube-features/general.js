/*------------------------------------------------------------------------------
4.0 FEATURES
--------------------------------------------------------------------------------

------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------
4.1.0 GENERAL
------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------
4.1.1 YOUTUBE HOME PAGE
------------------------------------------------------------------------------*/

ImprovedTube.youtubeHomePage = function () {
	var element = this.elements.masthead.logo,
		option = this.storage.youtube_home_page;

	if (element) {
		if (this.isset(option)) {
			element.href = option;

			element.addEventListener('click', this.stopPropagation, true);
		} else {
			element.href = '/';

			element.removeEventListener('click', this.stopPropagation);
		}
	}
};


/*------------------------------------------------------------------------------
4.1.2 COLLAPSE OF SUBSCRIPTION SECTION
------------------------------------------------------------------------------*/

ImprovedTube.collapseOfSubscriptionSections = function (node) {
	if (this.isset(node) === false) {
		var sections = document.querySelectorAll('ytd-item-section-renderer');

		for (var i = 0, l = sections.length; i < l; i++) {
			this.collapseOfSubscriptionSections(sections[i]);
		}

		return;
	}

	if (this.storage.collapse_of_subscription_sections === true) {
		if (location.href.indexOf('feed/subscriptions') !== -1) {
			var h2 = node.querySelector('h2');

			if (!node.querySelector('.it-section-collapse') && h2) {
				var button = document.createElement('button'),
					svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
					path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

				button.className = 'it-button-section-collapse';
				button.section = node;
				button.content = node.querySelector('.grid-subheader + #contents');

				button.addEventListener('click', function () {
					var section = this.section;

					if (section.className.indexOf('it-section-collapsed') === -1) {
						this.content.style.height = this.content.offsetHeight + 'px';
						this.content.style.transition = 'height 150ms';
					}

					setTimeout(function () {
						section.classList.toggle('it-section-collapsed');
					});
				});

				svg.setAttributeNS(null, 'viewBox', '0 0 24 24');
				path.setAttributeNS(null, 'd', 'M7.4 15.4l4.6-4.6 4.6 4.6L18 14l-6-6-6 6z');

				svg.appendChild(path);

				button.appendChild(svg);

				h2.parentNode.insertBefore(button, h2.nextSibling);

				this.elements.collapse_of_subscription_sections.push(button);
			}
		}
	} else {
		var elements = this.elements.collapse_of_subscription_sections;

		for (var i = 0, l = elements.length; i < l; i++) {
			var element = elements[i];

			if (element.section) {
				element.section.classList.remove('it-section-collapsed');
			}

			if (element.content) {
				element.content.style.height = '';
				element.content.style.transition = '';
			}

			element.remove();
		}
	}
};


/*------------------------------------------------------------------------------
4.1.3 ADD "SCROLL TO TOP"
------------------------------------------------------------------------------*/

ImprovedTube.addScrollToTop = function () {
	if (this.storage.add_scroll_to_top === true) {
		var button = document.createElement('div'),
			svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
			path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

		button.id = 'it-scroll-to-top';

		button.addEventListener('click', function () {
			window.scrollTo(0, 0);
		});

		button.scroll = function () {
			if (window.scrollY > window.innerHeight / 2) {
				document.documentElement.setAttribute('it-show-scroll-to-top', true);
			} else {
				document.documentElement.setAttribute('it-show-scroll-to-top', false);
			}
		};

		svg.setAttributeNS(null, 'viewBox', '0 0 24 24');
		path.setAttributeNS(null, 'd', 'M13 19V7.8l4.9 5c.4.3 1 .3 1.4 0 .4-.5.4-1.1 0-1.5l-6.6-6.6a1 1 0 0 0-1.4 0l-6.6 6.6a1 1 0 1 0 1.4 1.4L11 7.8V19c0 .6.5 1 1 1s1-.5 1-1z');

		svg.appendChild(path);
		button.appendChild(svg);
		document.body.appendChild(button);

		window.addEventListener('scroll', button.scroll);

		this.elements.scroll_to_top = button;
	} else if (this.elements.scroll_to_top) {
		window.removeEventListener('scroll', this.elements.scroll_to_top.scroll);

		this.elements.scroll_to_top.remove();
	}
};


/*------------------------------------------------------------------------------
4.1.4 CONFIRMATION BEFORE CLOSING
------------------------------------------------------------------------------*/

ImprovedTube.confirmationBeforeClosing = function () {
	window.onbeforeunload = function () {
		if (ImprovedTube.storage.confirmation_before_closing === true) {
			return 'You have attempted to leave this page. Are you sure?';
		}
	};
};


/*------------------------------------------------------------------------------
4.1.5 MARK WATCHED VIDEOS
------------------------------------------------------------------------------*/

ImprovedTube.markWatchedVideos = function (node) {
	if (this.isset(node) === false) {
		var thumbnails = document.querySelectorAll('#thumbnail.ytd-thumbnail,.thumb-link');

		for (var i = 0, l = thumbnails.length; i < l; i++) {
			this.markWatchedVideos(thumbnails[i]);
		}

		return;
	}

	if (this.storage.mark_watched_videos === true) {
		if (
			node.id === 'thumbnail' && node.className.indexOf('ytd-thumbnail') !== -1 ||
			node.className.indexOf('thumb-link') !== -1
		) {
			var button = document.createElement('button'),
				svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
				path = document.createElementNS('http://www.w3.org/2000/svg', 'path');

			button.className = 'it-mark-watched' + (this.storage.watched && this.storage.watched[this.getParam(new URL(node.href || 'https://www.youtube.com/').search.substr(1), 'v')] ? ' watched' : '');

			button.addEventListener('click', function (event) {
				var watched = !this.classList.contains('watched');

				event.preventDefault();
				event.stopPropagation();

				this.classList.toggle('watched');

				try {
					var video_id = ImprovedTube.getParam(new URL(this.parentNode.href).search.substr(1), 'v'),
						item = this.parentNode;

					while (
						item.nodeName &&
						item.nodeName !== 'YTD-RICH-ITEM-RENDERER' &&
						item.nodeName !== 'YTD-COMPACT-VIDEO-RENDERER' &&
						item.nodeName !== 'YTD-GRID-VIDEO-RENDERER' &&
						item.classList &&
						!item.classList.contains('yt-shelf-grid-item') &&
						!item.classList.contains('video-list-item')
					) {
						item = item.parentNode;
					}

					if (!ImprovedTube.storage.watched) {
						ImprovedTube.storage.watched = {};
					}

					if (watched === true) {
						ImprovedTube.storage.watched[video_id] = {
							title: item.querySelector('#video-title').innerText
						};

						ImprovedTube.messages.send({
							action: 'watched',
							type: 'add',
							id: video_id,
							title: item.querySelector('#video-title').innerText
						});
					} else if (ImprovedTube.storage.watched[video_id]) {
						delete ImprovedTube.storage.watched[video_id];

						ImprovedTube.messages.send({
							action: 'watched',
							type: 'remove',
							id: video_id
						});
					}
				} catch (err) {}
			});

			svg.setAttributeNS(null, 'viewBox', '0 0 24 24');
			path.setAttributeNS(null, 'd', 'M12 4.5C7 4.5 2.7 7.6 1 12a11.8 11.8 0 0022 0c-1.7-4.4-6-7.5-11-7.5zM12 17a5 5 0 110-10 5 5 0 010 10zm0-8a3 3 0 100 6 3 3 0 000-6z');

			svg.appendChild(path);
			button.appendChild(svg);

			node.appendChild(button);

			this.elements.mark_watched_videos.push(button);
		}
	} else {
		var buttons = this.elements.mark_watched_videos;

		for (var i = 0, l = buttons.length; i < l; i++) {
			buttons[i].remove();
		}
	}
};


/*------------------------------------------------------------------------------
4.1.6 ONLY ONE PLAYER INSTANCE PLAYING
------------------------------------------------------------------------------*/

ImprovedTube.onlyOnePlayerInstancePlaying = function () {
	var player = ImprovedTube.elements.player;

	if (this.storage.only_one_player_instance_playing === true && this.focus === true && player) {
		if (ImprovedTube.played_before_blur === true) {
			player.playVideo();
		}

		document.dispatchEvent(new CustomEvent('ImprovedTubeOnlyOnePlayer'));
	}
};

document.addEventListener('ImprovedTubeOnlyOnePlayer', function (event) {
	ImprovedTube.messages.send({
		onlyOnePlayer: true
	});
});


/*------------------------------------------------------------------------------
4.1.7 HD THUMBNAILS
------------------------------------------------------------------------------*/

ImprovedTube.thumbnailsQuality = function (node) {
	var option = this.storage.thumbnails_quality;

	if (this.isset(node) === false) {
		var thumbnails = document.querySelectorAll('img');

		for (var i = 0, l = thumbnails.length; i < l; i++) {
			this.thumbnailsQuality(thumbnails[i]);
		}

		return;
	}

	if (['default', 'mqdefault', 'hqdefault', 'sddefault', 'maxresdefault'].includes(option) === true) {
		if (!node.dataset.defaultSrc && this.regex.thumbnail_quality.test(node.src)) {
			node.dataset.defaultSrc = node.src;
			node.onload = function () {
				if (this.naturalHeight <= 90) {
					this.src = this.dataset.defaultSrc;
				}
			};
			node.src = node.src.replace(this.regex.thumbnail_quality, option + '.jpg');
			node.onerror = function () {
				this.error = "";
				this.src = node.dataset.defaultSrc;
			}
		}
	}
};