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

	// The plugin
	$.fn.bgVideo = function( options ) {

		// @bool iOS
		var iOS = /iPad|iPhone|iPod/.test(navigator.platform) || /iPad|iPhone|iPod/.test(navigator.userAgent);

		// Settings
		var settings = $.extend( {}, $.fn.bgVideo.defaults, options );

		// Do the things
		return this.each(function() {

			var $video = $(this);

			// Fade in video
			if( $video[0].currentTime > 0 ) {
				// It's already started playing
				$video.fadeTo( settings.fadeIn, 1, function(){
					$video.addClass('is-playing');
				});
			} else {
				// It hasn't started yet, wait for the playing event
				$video.on('playing', function(){
					$video.fadeTo( settings.fadeIn, 1, function(){
						$video.addClass('is-playing');
					});
				});
			}


			// Remove on iOS
			if( iOS ) {
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


		});


	};


	// Default settings
	$.fn.bgVideo.defaults = {
		fadeIn: 300
	};


	// Fit video
	$.fn.bgVideo.fitVideo = function( $video ) {

		var $container = $video.parent();

		// Start by setting some CSS
		$container.css({
			'position': 'relative',
			'overflow': 'hidden'
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

		// In general we're done, unless the container is taller than the video
		var container_height = $container.height(),
			video_height = $video.height();

		if( container_height > video_height ) {
			console.log('Container height > video height');
			$video.css({
				'height': '100%',
				'width': 'auto'
			});
		}

	};


	// Auto run based on data attributes
	$(document).ready(function(){
		$('[data-bgvideo]').each(function(){
			var options = {};
			if($(this).data('bgvideo-fade-in')) {
				options.fadeIn = $(this).data('bgvideo-fade-in');
			}
			$(this).bgVideo( options );
		});
	});


}(jQuery));