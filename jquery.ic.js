(function( $ ){
	$.fn.icslide = function(e) {
		var parentOffset = $(this).offset(),
			relX = e.pageX - parentOffset.left,
			parentWidth = $(this).width(),
			percentageTravelled = (relX / parentWidth) * 100,
			perecentageRemaining = 100 - percentageTravelled,
			leftImage = $(this).find(".ic-left").data("bgi"),
			rightImage = $(this).find(".ic-right").data("bgi");

		if(percentageTravelled >= 0 && percentageTravelled <= 100) {
		  	$(this).find(".ic-handle").attr("style", "left: " + percentageTravelled + "%;");
		  	$(this).find(".ic-left").attr("style", "width: " + percentageTravelled + "%; background-image: url('" + leftImage + "')");
			$(this).find(".ic-right").attr("style", "width: " + perecentageRemaining + "%; background-image: url('" + rightImage + "')");
		}

		return this;
	}; 
})( jQuery );

$(document).ready(function() {
	$(".ic-image").each(function() {
		$(this).attr("style", "background-image: url('" + $(this).data("bgi") + "')");
	});
});

$(".image-compare").bind('move', function(e) {
	$(this).icslide(e);
});

$(".image-compare").mousemove(function(e) {
	$(this).icslide(e);
});