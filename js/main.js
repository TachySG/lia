(function($){
	$(".menu-button").click(function(){
		$(".menu-wrapper, .menu-button").toggleClass("on");
	});
	$(".dropdown").click(function(){
		$(this).find(".dd-menu").toggle();
		$(this).find(".dd-arrow").toggleClass("on");
	})
})(jQuery)