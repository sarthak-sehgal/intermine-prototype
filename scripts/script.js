function init()
{
	function isTouchDevice() {
	    return 'ontouchstart' in document.documentElement;
	}
	if (isTouchDevice()) {
    	document.getElementsByClassName("searchButton")[0].style.display = 'inline-block';
	}
}
init();