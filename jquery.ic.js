(function($){
	$.fn.icslide = function(e) {
		var root = $(this);
			parentOffset = root.offset(),
			relX = e.pageX - parentOffset.left,
			parentWidth = root.width(),
			percentageTravelled = (relX / parentWidth) * 100,
			perecentageRemaining = 100 - percentageTravelled,
			leftImage = root.find(".ic-left").data("bgi"),
			rightImage = root.find(".ic-right").data("bgi");

		if(percentageTravelled >= 0 && percentageTravelled <= 100) {
		  	root.find(".ic-handle").attr("style", "left: " + percentageTravelled + "%;");
		  	root.find(".ic-left").attr("style", "width: " + percentageTravelled + "%; background-image: url('" + leftImage + "')");
			root.find(".ic-right").attr("style", "width: " + perecentageRemaining + "%; background-image: url('" + rightImage + "')");
		}

		return this;
	}; 
})(jQuery);

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