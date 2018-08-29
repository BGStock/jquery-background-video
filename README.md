# jQuery Background Video
Instantly improve your HTML5 background videos with a single line of jQuery.

Built by the folks over at [BG Stock](https://html5backgroundvideos.com) - Premium HTML5 Background Videos.

## What does the plugin do?
The plugin allows you to enhance your background videos in a few ways
 - Allows you to fade in your video when it starts playing (to avoid a sudden jump)
 - Emulates `background-size: cover;` / `object-fit: cover;`
 - Destroys the video and prevents it downloading on iOS devices (because they can't do background video)
 - Optionally auto-pause video after X seconds (easier on your users' power consumption)
 - Optionally add and position a pause/play button

Example: [http://codepen.io/GusRuss89/pen/bVwNrE](http://codepen.io/GusRuss89/pen/bVwNrE)

## Installation
With bower
```
bower install jquery-background-video
```
With npm
```
npm install --save jquery-background-video
```
With git
```
git clone https://github.com/BGStock/jquery-background-video
```
Or just download the zip

## How do I use it?
### 1. Include the latest version of jQuery. E.g.
```javascript
<script src="https://code.jquery.com/jquery-2.1.4.min.js"></script>
```
### 2. Include jquery.background-video.js
```javascript
<script src="path/to/jquery.background-video.js"></script>
```
### 3. Add a `<video>` as the first child of the element that you want it to be the background for

```html
<div class="element-with-video-bg jquery-background-video-wrapper">
	<video class="my-background-video jquery-background-video" loop autoplay muted playsinline poster="path/to/your/poster.jpg">
		<source src="path/to/video.mp4" type="video/mp4">
		<source src="path/to/video.webm" type="video/webm">
		<source src="path/to/video.ogv" type="video/ogg">
	</video>
</div>
```
Note: the class names `jquery-background-video` and `jquery-background-video-wrapper` are only used in the CSS, just remember to update them there if you want to change them. The class name `my-background-video` is for demo purposes, this can be whatever you like.

If you're using the fade-in option you should also set the poster image as a `background-image` for your wrapper element.
```css
.element-with-video-bg {
	background-image: url(path/to/your/poster.jpg);
}
```
It's important to use `background-image` instead of the shorthand `background` because the plugin CSS sets `background-position`, `background-repeat` and `background-size`, which would be overwritten by the shorthand `background`.

iOS Support: Automatic playing of videos is supported as of iOS 10+, but requires the `playsinline` attribute on the `<video>` tag.

### 4. Call the plugin on the video element
In your main JavaScript file

```javascript
$(document).ready(function(){
	$('.my-background-video').bgVideo();
});
```

_*OR*_

With a data attribute on the video tag

```html
<video data-bgvideo="true" [other video params]>
```

### 5. (Recommended) include or copy/paste the CSS into your project
```html
<link rel="stylesheet" type="text/css" href="path/to/jquery.background-video.css">
```

## Options
### Default options
```javascript
$('.my-background-video').bgVideo({
	fullScreen: false, // Sets the video to be fixed to the full window - your <video> and it's container should be direct descendents of the <body> tag
	fadeIn: 500, // Milliseconds to fade video in/out (0 for no fade)
	pauseAfter: 120, // Seconds to play before pausing (0 for forever)
	fadeOnPause: false, // For all (including manual) pauses
	fadeOnEnd: true, // When we've reached the pauseAfter time
	showPausePlay: true, // Show pause/play button
	pausePlayXPos: 'right', // left|right|center
	pausePlayYPos: 'top', // top|bottom|center
	pausePlayXOffset: '15px', // pixels or percent from side - ignored if positioned center
	pausePlayYOffset: '15px' // pixels or percent from top/bottom - ignored if positioned center
});
```

All options can alternatively be specified in data attributes on your video tag with a `bgvideo` prefix. Just change camel casing to hyphens and lower case. E.g. `fadeIn` becomes `data-bgvideo-fade-in`.
```html
<video data-bgvideo="true" data-bgvideo-fade-in="2000" [other video params]>
```

### Overriding default options
Example
```javascript
$.fn.bgVideo.defaults.fadeIn = 5000;
$.fn.bgVideo.defaults.showPausePlay = false;
```
