/*------------------------------------------------------------------------------
4.3.0 THEMES
------------------------------------------------------------------------------*/

/*------------------------------------------------------------------------------
4.3.1 MY COLORS
------------------------------------------------------------------------------*/

ImprovedTube.myColors = function () {
	if (
		this.storage.theme === 'my-colors' &&
		Array.isArray(this.storage.theme_primary_color) &&
		Array.isArray(this.storage.theme_text_color)
	) {
		var style = this.elements.my_colors || document.createElement('style'),
			primary_color = this.storage.theme_primary_color,
			text_color = this.storage.theme_text_color;

		if (primary_color) {
			primary_color = 'rgb(' + primary_color.join(',') + ')';
		} else {
			primary_color = 'rgb(200, 200, 200)';
		}

		if (text_color) {
			text_color = 'rgb(' + text_color.join(',') + ')';
		} else {
			text_color = 'rgb(25, 25, 25)';
		}

		style.className = 'it-theme-editor';
		style.textContent = 'html{' +
			'--yt-swatch-textbox-bg:rgba(19,19,19,1)!important;' +
			'--yt-swatch-icon-color:rgba(136,136,136,1)!important;' +
			'--yt-spec-brand-background-primary:rgba(0,0,0, 0.1) !important;' +
			'--yt-spec-brand-background-secondary:rgba(0,0,0, 0.1) !important;' +
			'--yt-spec-badge-chip-background:rgba(0, 0, 0, 0.05) !important;' +
			'--yt-spec-verified-badge-background:rgba(0, 0, 0, 0.15) !important;' +
			'--yt-spec-button-chip-background-hover:rgba(0, 0, 0, 0.10) !important;' +
			'--yt-spec-brand-button-background:rgba(136,136,136,1) !important;' +
			'--yt-spec-filled-button-focus-outline:rgba(0, 0, 0, 0.60) !important;' +
			'--yt-spec-call-to-action-button-focus-outline:rgba(0,0,0, 0.30) !important;' +
			'--yt-spec-brand-text-button-focus-outline:rgba(204, 0, 0, 0.30) !important;' +
			'--yt-spec-10-percent-layer:rgba(136,136,136,1) !important;' +
			'--yt-swatch-primary:' + primary_color + '!important;' +
			'--yt-swatch-primary-darker:' + primary_color + '!important;' +
			'--yt-spec-brand-background-solid:' + primary_color + '!important;' +
			'--yt-spec-general-background-a:' + primary_color + '!important;' +
			'--yt-spec-general-background-b:' + primary_color + '!important;' +
			'--yt-spec-general-background-c:' + primary_color + '!important;' +
			'--yt-spec-touch-response:' + primary_color + '!important;' +
			'--yt-swatch-text: ' + text_color + '!important;' +
			'--yt-swatch-important-text: ' + text_color + '!important;' +
			'--yt-swatch-input-text: ' + text_color + '!important;' +
			'--yt-swatch-logo-override: ' + text_color + '!important;' +
			'--yt-spec-text-primary:' + text_color + ' !important;' +
			'--yt-spec-text-primary-inverse:' + text_color + ' !important;' +
			'--yt-spec-text-secondary:' + text_color + ' !important;' +
			'--yt-spec-text-disabled:' + text_color + ' !important;' +
			'--yt-spec-icon-active-other:' + text_color + ' !important;' +
			'--yt-spec-icon-inactive:' + text_color + ' !important;' +
			'--yt-spec-icon-disabled:' + text_color + ' !important;' +
			'--yt-spec-filled-button-text:' + text_color + ' !important;' +
			'--yt-spec-call-to-action-inverse:' + text_color + ' !important;' +
			'--yt-spec-brand-icon-active:' + text_color + ' !important;' +
			'--yt-spec-brand-icon-inactive:' + text_color + ' !important;' +
			'--yt-spec-brand-link-text:' + text_color + '!important;' +
			'--yt-spec-brand-subscribe-button-background:' + text_color + ' !important;' +
			'--yt-spec-wordmark-text:' + text_color + ' !important;' +
			'--yt-spec-selected-nav-text:' + text_color + ' !important;' +
			'}';

		this.elements.my_colors = style;

		document.documentElement.appendChild(style);
	} else if (this.elements.my_colors) {
		this.elements.my_colors.remove();
	}
};


/*------------------------------------------------------------------------------
4.3.2 BLUELIGHT
------------------------------------------------------------------------------*/

ImprovedTube.bluelight = function () {
	var value = this.storage.bluelight;

	if (this.schedule() === false) {
		return false;
	}

	if (this.isset(value) === false) {
		value = 0;
	}

	if (typeof value !== 'number') {
		value = Number(value);
	}

	if (value !== 0) {
		if (!this.elements.bluelight || !this.elements.feColorMatrix) {
			var div = this.elements.bluelight || document.createElement('div'),
				svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'),
				filter = document.createElementNS('http://www.w3.org/2000/svg', 'filter'),
				feColorMatrix = document.createElementNS('http://www.w3.org/2000/svg', 'feColorMatrix'),
				matrix = feColorMatrix.values.baseVal;

			div.id = 'it-bluelight';

			svg.setAttributeNS(null, 'viewBox', '0 0 1 1');
			svg.setAttributeNS(null, 'version', '1.1');
			filter.setAttributeNS(null, 'id', 'it-bluelight-filter');
			feColorMatrix.setAttributeNS(null, 'type', 'matrix');

			for (var i = 0; i < 20; i++) {
				var number = svg.createSVGNumber();

				number.value = 0;

				matrix.appendItem(number);
			}

			matrix[0].value = 1;
			matrix[6].value = 1;
			matrix[12].value = 1 - parseFloat(value) / 100;
			matrix[18].value = 1;

			filter.appendChild(feColorMatrix);
			svg.appendChild(filter);
			div.appendChild(svg);
			document.documentElement.appendChild(div);

			this.elements.feColorMatrix = feColorMatrix;
			this.elements.bluelight = div;
		} else {
			this.elements.feColorMatrix.values.baseVal[12].value = 1 - parseFloat(value) / 100;
		}
	} else if (this.elements.bluelight) {
		this.elements.bluelight.remove();

		delete this.elements.bluelight;
		delete this.elements.feColorMatrix;
	}
};


/*------------------------------------------------------------------------------
4.3.3 DIM
------------------------------------------------------------------------------*/

ImprovedTube.dim = function () {
	var value = this.storage.dim;

	if (this.schedule() === false) {
		return false;
	}

	if (this.isset(value) === false) {
		value = 0;
	}

	if (typeof value !== 'number') {
		value = Number(value);
	}

	if (value !== 0) {
		if (!this.elements.dim) {
			var div = document.createElement('div');

			div.id = 'it-dim';
			div.style.opacity = parseInt(Number(value)) / 100 || 0;

			document.documentElement.appendChild(div);

			this.elements.dim = div;
		} else {
			this.elements.dim.style.opacity = parseInt(Number(value)) / 100 || 0;
		}
	} else if (this.elements.dim) {
		this.elements.dim.remove();

		delete this.elements.dim;
	}
};


/*------------------------------------------------------------------------------
4.3.4 FONT
------------------------------------------------------------------------------*/

ImprovedTube.font = function () {
	var option = this.storage.font;

	if (option && option !== 'Default') {
		var link = this.elements.myFont || document.createElement('link'),
			style = document.createElement('style');

		link.rel = 'stylesheet';
		link.href = '//fonts.googleapis.com/css2?family=' + option;

		style.textContent = '*{font-family:"' + option.replace(/\+/g, ' ') + '" !important}';

		this.elements.myFont = link;
		this.elements.myFontStyle = style;

		document.documentElement.style.fontFamily = option.replace(/\+/g, ' ');

		document.documentElement.appendChild(link);
		document.documentElement.appendChild(style);
	} else if (this.elements.myFont) {
		document.documentElement.style.fontFamily = '';

		this.elements.myFont.remove();
		this.elements.myFontStyle.remove();
	}
};


/*------------------------------------------------------------------------------
4.3.5 THEMES
------------------------------------------------------------------------------*/

ImprovedTube.themes = function () {
	this.myColors();

	if (this.schedule() === true && this.isset(this.storage.theme)) {
		var PREF_OLD = this.getParams(this.getCookieValueByName('PREF')),
			PREF = this.getParams(this.getCookieValueByName('PREF')),
			result = '';

		if (!this.isset(PREF.f6) || this.isset(PREF.f6) && PREF.f6.length !== 3) {
			PREF.f6 = '400';
		} else if (PREF.f6.length === 3) {
			PREF.f6 = '4' + PREF.f6.substr(1);
		}

		for (var i in PREF) {
			result += i + '=' + PREF[i] + '&';
		}

		this.setCookie('PREF', result.slice(0, -1));

		document.documentElement.setAttribute('it-theme', this.storage.theme);
	} else {
		document.documentElement.removeAttribute('it-theme');
	}
};


/*------------------------------------------------------------------------------
4.3.6 SCHEDULE
------------------------------------------------------------------------------*/

ImprovedTube.schedule = function () {
	var current = new Date().getHours(),
		from = Number((this.storage.schedule_time_from || '00:00').substr(0, 2)),
		to = Number((this.storage.schedule_time_to || '00:00').substr(0, 2));

	if (to < from && current > from && current < 24) {
		times.to += 24;
	} else if (to < from && current < to) {
		from = 0;
	}

	if (this.storage.schedule !== 'sunset_to_sunrise' || current >= from && current < to) {
		return true;
	}

	return false;
};