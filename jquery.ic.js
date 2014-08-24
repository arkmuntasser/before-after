(function( $ ){
   $.fn.icslide = function(e) {
	  var parentOffset = $(this).offset(); 
	  var relX = e.pageX - parentOffset.left;
	  var parentWidth = $(this).width();
	  var percentageTravelled = (relX / parentWidth) * 100;
	  var perecentageRemaining = 100 - percentageTravelled;
	  
	  if(percentageTravelled >= 0 && percentageTravelled <= 100) {
	  	$(this).find(".ic-handle").attr("style", "left: " + percentageTravelled + "%;");
	  	$(this).find(".ic-left").attr("style", "width: " + percentageTravelled + "%;");
	  	$(this).find(".ic-right").attr("style", "width: " + perecentageRemaining + "%;");
	  }
	  
	  return this;
   }; 
})( jQuery );

$(".image-compare").bind('move', function(e) {
	$(this).icslide(e);
});

$(".image-compare").mousemove(function(e) {
	$(this).icslide(e);
});