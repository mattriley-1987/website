//fixIE6flicker
// turns on background (CSS) Image Caching in IE6
	try {
	document.execCommand("BackgroundImageCache", false, true);
	} catch(e) {}