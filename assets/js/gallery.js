$(document).ready(function() {
		var imgUrl ='';
		var index = 0;
		var length = 0;

		$('.filter').addClass('show');

		$('.filter-button').click(function(e) {
			e.preventDefault();
			$('.filter').removeClass('show');
			$('.filter-button').removeClass('filter-button-active');
			$(this).addClass('filter-button-active');

			var value = $(this).attr('data-filter');

			if (value == 'all') {
				$('.filter').show('1000');
				$('.filter').addClass('show');
			} else {
				$('.filter').not('.' + value).hide('3000');
				$('.filter').not('.' + value).removeClass('show');

				$('.filter').filter('.' + value).show('3000');
				$('.filter').filter('.' + value).addClass('show'); } });
		

		$('.gallery-grid .show').click(function(e) {
			e.preventDefault();
			history.pushState({}, 'lightbox', '');
			
			index = $('.gallery-grid .show').index(this);
			length = $('.gallery-grid .show').children().length - 1;
			imgUrl = $(this).children('img').attr("src");

			$(".lightbox").css("background-image", 'url('+ imgUrl + ')');
			
			$(".dark").fadeIn();
			$(".lightbox").fadeIn("slow");
			$(".next").fadeIn("slow");
			$(".prev").fadeIn("slow"); });


		$(".lightbox").click(function(e){
			e.preventDefault();
			window.history.go(-1); });

		$('.prev').click(function(e){
				e.preventDefault();
				
				if(index == 0 ){
					index = length; 
				} else {
					--index; }

				imgUrl = $('.show').eq(index).children('img').attr("src");;
				$(".lightbox").css("background-image", 'url('+ imgUrl + ')'); });
		
		$('.next').click(function(e){
				e.preventDefault();

				if(index == length ){
					index = 0; 
				} else {
					++index; }

				imgUrl = $('.show').eq(index).children('img').attr("src");;
				$(".lightbox").css("background-image", 'url('+ imgUrl + ')'); }); 

	
		window.onpopstate = history.onpushstate = function(e){
			if($('.lightbox').hasClass('active')){
				$('.lightbox').removeClass('active');
				$(".dark").fadeOut();
				$(".lightbox").fadeOut("slow");
				$(".next").fadeOut("slow");
				$(".prev").fadeOut("slow"); } }
				
});