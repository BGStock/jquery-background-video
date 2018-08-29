// The MIT License (MIT)

// Copyright (c) 2015 BG Stock - html5backgroundvideos.com

// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:

// The above copyright notice and this permission notice shall be included in all
// copies or substantial portions of the Software.

// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
// SOFTWARE.

(function($) {

	// Add js class to html
	$('html').addClass('js');

	// Add IE8 shim for Date.now()
	if (!Date.now) {
		Date.now = function() { return new Date().getTime(); }
	}

	// Return current time in seconds
	function currentTime() {
		return Math.floor(Date.now() / 1000);
	}

	// The plugin
	$.fn.bgVideo = function( options ) {

		// @bool iOS
		function iOSversion() {
			if (/iP(hone|od|ad)/.test(navigator.platform)) {
				var v = (navigator.appVersion).match(/OS (\d+)_(\d+)_?(\d+)?/);
				return [parseInt(v[1], 10), parseInt(v[2], 10), parseInt(v[3] || 0, 10)];
			}
		}

		var iOSVersion = iOSversion();
		var old_iOS = false;

		if (iOSVersion && (iOSVersion[0] < 10)){
			old_iOS = true;
		}

		// Settings
		var settings = $.extend({}, $.fn.bgVideo.defaults, options );

		// Do the things
		return this.each(function() {

			// Set some handy variables
			var $video = $(this); // jQuery Object
			var video = $video[0]; // DOM node
			var poster = $video.attr('poster') || '';
			var $container = $video.parent();
			var $pauseplay = $('<button class="jquery-background-video-pauseplay pause"><span>Pause</span></button>');
			var start_time; // We'll set this when it starts playing


			// Check for any data attributes that will override the settings for this particular element
			var el_settings = $.extend({}, settings);
			var data_attrs = $video.data();
			$.each( data_attrs, function( data_name, data_val ) {
				if( data_name.indexOf('bgvideo') === 0 ) {
					// It's a match! Strip the bgvideo prefix and lowercase the first letter
					data_name = data_name.replace('bgvideo', '');
					data_name = data_name.charAt(0).toLowerCase() + data_name.slice(1);
					// Then set the setting
					el_settings[data_name] = data_val;
				}
			});


			// Attach to playing event
			$video.on('playing', function(){
				if(start_time == null){
					start_time = currentTime();
				}
				$video.addClass('is-playing is-visible');
				$pauseplay.removeClass('play').addClass('pause').find('span').text('Pause');
				$.fn.bgVideo.fitVideo( $video );
			});


			// If the video is already playing before js loads
			if( video.currentTime > 0 ) {
				$video.addClass('is-playing is-visible');
			}


			// Attach to pause event
			$video.on('pause', function(){
				$video.removeClass('is-playing');
				$pauseplay.removeClass('pause').addClass('play').find('span').text('Play');
				if(el_settings.fadeOnPause) {
					$video.removeClass('is-visible');
				}
			});


			// Set default styles
			$container.css({
				'position': 'relative',
				'overflow': 'hidden',
				'background-size': 'cover',
				'background-position': 'center center',
				'background-repeat': 'no-repeat',
				'background-image': 'url(' + poster + ')'
			});
			$video.css({
				'min-width': 'auto',
				'min-height': 'auto',
				'width': '100%',
				'height': 'auto',
				'position': 'absolute',
				'left': '50%',
				'top': '50%',
				'transform': 'translate(-50%,-50%)'
			});
			if( el_settings.fullScreen ) {
				$container.css({
					'position': 'fixed',
					'top': '0',
					'bottom': '0',
					'left': '0',
					'right': '0',
					'height': 'auto',
					'margin': '0',
					'z-index': '-1'
				});
			}


			// Fade in video by setting the transition duration
			$video.css('transition-duration', el_settings.fadeIn + 'ms');


			// Remove on iOS
			if( old_iOS ) {
				// Unset sources to prevent them from continuing to download
				$video.attr('src', '');
				$video.find('source').attr('src', '');
				$video.remove();
			}


			// Mimic background-size: cover with video element
			$.fn.bgVideo.fitVideo( $video );
			$(window).resize(function(){
				$.fn.bgVideo.fitVideo( $video );
			});


			// Pause after X seconds
			el_settings.pauseAfter = parseInt( el_settings.pauseAfter, 10 );
			if( el_settings.pauseAfter > 0 ) {
				$video.on('timeupdate', function(){
					var now = currentTime();
					if( now > start_time + el_settings.pauseAfter ) {
						video.pause();
						if( el_settings.fadeOnEnd ) {
							$video.removeClass('is-visible');
						}
					}
				});
			}


			// Play / pause button
			if( el_settings.showPausePlay && !old_iOS ) {
				// Append pauseplay element created earlier
				$container.append($pauseplay);
				// Position element
				$pauseplay.css({
					'left':   'auto',
					'right':  'auto',
					'top':    'auto',
					'bottom': 'auto'
				});
				$pauseplay.css(el_settings.pausePlayXPos, el_settings.pausePlayXOffset);
				$pauseplay.css(el_settings.pausePlayYPos, el_settings.pausePlayYOffset);
				if( el_settings.pausePlayXPos === 'center' ) {
					$pauseplay.css({
						'left':        '50%',
						'margin-left': '-10px'
					});
				}
				if( el_settings.pausePlayYPos === 'center' ) {
					$pauseplay.css({
						'top':        '50%',
						'margin-top': '-10px'
					});
				}
				// Add functionality
				$pauseplay.on('click', function(){
					if(video.paused) {
						video.play();
						start_time = currentTime();
					} else {
						video.pause();
					}
				});
			}


		});


	};


	// Default settings
	$.fn.bgVideo.defaults = {
		fullScreen: false, // Sets the video to be fixed to the full window
		fadeIn: 500, // Milliseconds to fade video in/out (0 for no fade)
		pauseAfter: 120, // Seconds to play before pausing (0 for forever)
		fadeOnPause: false, // For all (including manual) pauses
		fadeOnEnd: true, // When we've reached the pauseAfter time
		showPausePlay: true, // Show pause/play button
		pausePlayXPos: 'right', // left|right|center
		pausePlayYPos: 'top', // top|bottom|center
		pausePlayXOffset: '15px', // pixels or percent from side - ignored if positioned center
		pausePlayYOffset: '15px' // pixels or percent from top/bottom - ignored if positioned center
	};


	// Fit video
	$.fn.bgVideo.fitVideo = function( $video ) {

		var $container = $video.parent(),
			container_height = $container.outerHeight(),
			container_width = $container.outerWidth();

		// Do this again every time the screen size changes
		$video.css({
			'height': 'auto',
			'width': container_width + 'px'
		});

		var video_height = $video.height();

		if( container_height > video_height ) {
			//console.log('Container height > video height');
			$video.css({
				'height': container_height + 'px',
				'width': 'auto'
			});
		}

	};


	// Auto run based on data attributes
	$(document).ready(function(){
		$('[data-bgvideo]').bgVideo();
	});


}(jQuery));
