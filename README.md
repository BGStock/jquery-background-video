# jQuery Background Video
Instantly improve your HTML5 background videos with a single line of jQuery.

Built by the folks over at [BG Stock](https://html5backgroundvideos.com) - Premium HTML5 Background Videos.

## What does the plugin do?
The plugin does three things
 - Allows you to fade in your video when it starts playing (to avoid a sudden jump)
 - Emulates `background-size: cover;` / `object-fit: contain;`
 - Destroys the video and prevents it downloading on iOS devices (because they can't do background video)

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
	<video class="my-background-video jquery-background-video" loop autoplay muted poster="path/to/your/poster.jpg">
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
	fadeIn: 500 // Fade in duration in milliseconds. 0 for no fade in.
});
```

All options can alternatively be specified in data attributes on your video tag with a `bgvideo` prefix. Just change camel casing to hyphens and lower case. E.g. `fadeIn` becomes `data-bgvideo-fade-in`.
```html
<video data-bgvideo="true" data-bgvideo-vade-in="2000" [other video params]>
```

### Overriding default options
```javascript
$.fn.bgVideo.defaults.fadeIn = 5000;
```

## Other things to know
If you want to fade in the videos, you should add a `no-js` class to your `<html>` tag, which when combined with the plugin CSS, will set the video's opacity to `0` until it starts playing. For best results, include Modernizr in the `<head>` to update the class to `js`.