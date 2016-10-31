/* main.js
 *
 * Part of the jQuery.PercentageLoader demo. Just an example so "do as thou wilt".
 */

/* Do social media shiz */

$(function() {
    // Curry slide func
    function makeSlideFunc(param) {
	return function () {
	    var target = $(param);
	    if (target.length) {
		var top = target.offset().top;
		$('body').animate({scrollTop:top}, 1000);
	    }	    
	    return false;
	};
    }
    
   
    
    // Do the loaders
    (function() {	
	// Top loader - simple animating loader triggered by button
        var $topLoader = $("#main-loader").percentageLoader({width: 233, height: 233, progress : 0});
        var topLoaderRunning = false;
        $("#run-single").click(function() {
	    // Ignore the click if the animation is already in progress
            if (topLoaderRunning) {
              return false;
            }
	    
	    // Set some initial values
	    topLoaderRunning = true;
	    $topLoader.setProgress(0);	
	    
	    // We're pretending 
	    $topLoader.setValue('0kb');
	    var kb = 0;
	    // We're emulating a 'download' progress
	    var totalKb = 748;
	    
	    // A function representing a single 'frame' of our animation
	    var animateFunc = function() {
		kb += 17;	    
		if (kb > totalKb) {
		    kb = totalKb;  
		}
		$topLoader.setProgress(kb / totalKb);
		$topLoader.setValue(kb.toString() + 'kb');
		if (kb < totalKb) {
		    setTimeout(animateFunc, 1500);
		} else {
		    topLoaderRunning = false;
		}
	    }
	    
	    setTimeout(animateFunc, 1500);
	    return false;
	});
	
    })();

    
});
