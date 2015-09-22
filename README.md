# jQuery Background Video
Instantly improve your HTML5 background videos with a single line of jQuery

Built by the folks over at [BG Stock](https://html5backgroundvideos.com) - Premium HTML5 Background Videos

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
<div class="element-with-video-bg">
	<video class="my-background-video" loop autoplay muted poster="path/to/your/poster.jpg">
		<source src="path/to/video.mp4" type="video/mp4">
		<source src="path/to/video.webm" type="video/webm">
		<source src="path/to/video.ogv" type="video/ogg">
	</video>
</div>
```

### 4. Call the plugin on the video element
In your main JavaScript file

```javascript
$(document).ready(function(){
	$('.my-background-video').bgVideo();
});
```

*OR*

With a data attribute on the video tag

```html
<video data-bgvideo="true" [other video params]>
```

