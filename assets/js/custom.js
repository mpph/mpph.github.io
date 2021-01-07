$( document ).ready(function() {
	var mainAddr = 'https://mpph.github.io';
	var designFilterArray = ['ALL', 'DETAIL', 'LOGO', 'PACKAGE'];
	var animFilterArray = ['ALL', 'CSS', 'SVG', 'CANVAS'];
	var videoFilterArray = ['ALL', 'CINEMA', 'INTRO', 'MOTION'];
	var designArray = [{filterName:'', link:''},{filterName:'', link:''}];
	var animArray =  [{filterName:'', link:''},{filterName:'', link:''}];
	var videoArray =  [{filterName:'', link:''},{filterName:'', link:''}];
	
	/* Progress */
	screenOut();

	/* close nav when a  clicked */
	$('.nav-toggler').click(function(e) {	
			e.preventDefault();
			updateMenuButton(); });
	
	$('.nav a').click(function(e) {
        $('.nav li').removeClass('active');
		$('.nav-sub').removeClass('nav-show');
		$('.nav-toggler').removeClass('active'); }); 
	
	$('body').click(function(e){
			if($('.nav-sub').hasClass('nav-show') && !$('.nav-sub').is(e.target) && !$('.nav-toggler').is(e.target) && !$('.toggler-icon').is(e.target)) {
				$('.nav-toggler span:nth-child(3)').addClass('lowestbarup');
				
				setTimeout(function() {
					$('.nav-toggler span:nth-child(3)').removeClass('lowestbarup');
					$('.nav-sub').removeClass('nav-show');
					$('.nav-toggler').removeClass('active'); },100); } });

	/* Scroll event */
    $(window).scroll(function() {
        var scroll = getCurrentScroll();

        if (scroll < 20) {
			$(".nav-area").removeClass("sticky");
        } else {
			$(".nav-area").addClass("sticky"); } 
		
		$('.content-area').each(function(i) {
			var pos_of_content = $(this).offset().top + 60;
			var bottom_of_window = scroll + ($(window).height() / 2 );
			var check = $(this).attr('id');

			if(pos_of_content < bottom_of_window) {
				$('.nav li').removeClass('active');
				$('a.page-scroll[href="#'+ check +'"]').closest('li').addClass('active'); } });

		$('.anim').each(function(i) {
			var pos_of_object = $(this).offset().top + 60;
			var bottom_of_window = scroll + $(window).height();
			var animCheck = $(this).attr('data-anim');
			var animDelay = $(this).attr('data-anim-delay');
			
			if(pos_of_object < bottom_of_window) {
					$(this).addClass('fade-in');
					$(this).css('transition-delay', animDelay);

					if($(this).children('.contact-card-bg').length > 0) {
						$('.contact-card-bg').css('background-position', '0 0');
						$('.contact-card-bg').addClass('card-bg-anim');
						$('.contact-card-bg').removeClass('card-bg-anim-hide');
					} else if($(this).children('.test').length > 0) {
						$('.test').addClass('.fade-in'); }
			} else if(pos_of_object > bottom_of_window) {
					$(this).removeClass('fade-in');
					$(this).css('transition-delay', 0);
					
					if($(this).children('.contact-card-bg').length > 0) {
						$('.contact-card-bg').css('background-position', '100% 0');
						$('.contact-card-bg').addClass('card-bg-anim-hide');
						$('.contact-card-bg').removeClass('card-bg-anim');
					} else if($(this).children('.test').length > 0) {
						$('.test').removeClass('fade-in'); } } }); });

	/* Skill event */
	AbilityCircle(".ability-1");
	AbilityCircle(".ability-2");
	AbilityCircle(".ability-3");
	AbilityCircle(".ability-4");

	/* Portfolio event */
	$('.p-click').click(function(e){
		e.preventDefault();
		var target ='';

		if($(this).hasClass('p-designs')) {
			popUpLayer(mainAddr, designArray, designFilterArray);
		} else if ($(this).hasClass('p-animations')) {
			popUpLayer(mainAddr, animArray, animFilterArray);
		} else if ($(this).hasClass('p-videos')) {
			popUpLayer(mainAddr, videoArray, videoFilterArray); } });
	galleryControll();

	/* contact effect event */
	contactCardMouseEffect(); 

	/* etc */
	$('a[href="#"]').click(function(e){
		e.preventDefault(); });

	historyControll();
});
/*======================/Init Function============================*/









/*======================ProgressLoading============================*/
function screenOut(){
	$('body').addClass('ofh');
	$('.progress-screen').fadeOut(2000); 
	$('body').removeClass('ofh'); }
/*======================/ProgressLoading============================*/



/*======================Skill============================*/
function AbilityCircle(cN){
	var r = $('.skill-area .abilites-container '+ cN +' .ability .progress').attr('r');
	var percent = $(cN + ' .center .value').text();
	var circumference = Math.PI * (r * 2);
	var progress = circumference / 100;
	var count = 0;
	
	var timer = setInterval(function(){

		if(count == percent){
			clearInterval(timer); }
		$('.skill-area .abilites-container ' + cN + ' .center .value').text(count);
		$('.skill-area .abilites-container ' + cN + ' .ability .progress').css('stroke-dasharray', count * progress + " " + circumference);
		count++;
	}, percent ); }
/*======================/Skill============================*/



/*======================Portfolio-PopUpLayer-Gallery============================*/
function popUpLayer(mainAddr, array, filters){
	historyPush({}, 'openedLayer', '');
	$('.p-layer').addClass('dpb');
	$('body').addClass('ofh');

	for(var f in filters) {
		if(filters[f] == 'ALL'){
			$(".gallery-filter").append('<a class="filter-button filter-button-active" data-filter="' + filters[f].toLowerCase() + '">' + filters[f] + '</a>'); 
			continue; }
		$(".gallery-filter").append('<a class="filter-button" data-filter="' + filters[f].toLowerCase() + '">' + filters[f] + '</a>'); } 

	for(var o in array) {
		$(".p-layer-container").append('<div class="gallery-item filter ' + array[o].filterName +' show"><img src="https://mpph.github.io/assets/' + array[o].link + '"/></div>'); } }
/*======================/Portfolio-PopUpLayer-Gallery============================*/
/*======================Portfolio-PopUpLayer-Gallery-Controll-&-LightBox-Controll============================*/
function galleryControll(){
	var imgUrl ='';
	var index = 0;
	var length = 0;

	$('.filter-button').click(function(e) {
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
		history.pushState({}, 'lightbox', '');
			
		index = $('.gallery-grid .show').index(this);
		length = $('.gallery-grid .show').children().length - 1;
		imgUrl = $(this).children('img').attr("src");

		$(".lightbox").css("background-image", 'url('+ imgUrl + ')');
		$(".p-layer-lightbox").addClass('dpb'); });

	$('.prev').click(function(e){		
		if(index == 0 ){
			index = length; 
		} else {
			--index; }

		imgUrl = $('.show').eq(index).children('img').attr("src");;
		$(".lightbox").css("background-image", 'url('+ imgUrl + ')'); });
			
	$('.next').click(function(e){
		if(index == length ){
			index = 0; 
		} else {
			++index; }

		imgUrl = $('.show').eq(index).children('img').attr("src");;
		$(".lightbox").css("background-image", 'url('+ imgUrl + ')'); }); }
/*======================/Portfolio-PopUpLayer-Gallery-Controll-&-LightBox-Controll============================*/



/*======================Contact============================*/
function contactCardMouseEffect(){
	var mouse = {
      X   : 0,
      Y   : 0,
      CX  : 0,
      CY  : 0 },
    block = {
      X   : mouse.X,
      Y   : mouse.Y,
      CX  : mouse.CX,
      CY  : mouse.CY };

$('.contact-block').on('mousemove', function(e) {
	mouse.X   = (e.pageX - $(this).offset().left) - $('.contact-block').width() / 2;
	mouse.Y   = (e.pageY - $(this).offset().top) - $('.contact-block').height() / 2;

	var leave = setInterval(function(){
		block.CY   += (mouse.Y - block.CY) / 12;
		block.CX   += (mouse.X - block.CX) / 12;
		$('.contact-block .circleLight').css('background', 'radial-gradient(circle at ' + mouse.X + 'px ' + mouse.Y + 'px, #fff, transparent)');
		$('.contact-block').css({ transform : 'scale(1.03) translate(' + (block.CX * 0.05) + 'px, ' + (block.CY * 0.05) + 'px) rotateX(' + (block.CY * 0.05) + 'deg) rotateY(' + (block.CX * 0.05) + 'deg)'});
		
		if(mouse.X == 0 && mouse.Y == 0){
			clearInterval(leave); } }, 20); });

$('.contact-block').on('mouseleave', function(e) {
	mouse.X   = mouse.CX;
	mouse.Y   = mouse.CY; }); }
/*======================/Contact============================*/




/* etc function */

function getCurrentScroll() {
    return window.pageYOffset; }

function updateMenuButton() {
	$('.nav-toggler').toggleClass('active');
	$('.nav-sub').toggleClass('nav-show');

	if(!$('.nav-toggler').hasClass('active')) {
		$('.nav-toggler span:nth-child(3)').addClass('lowestbarup');
		setTimeout(function() {
			$('.nav-toggler span:nth-child(3)').removeClass('lowestbarup'); },550); } }

function sleep(delay) {
	var start = new Date().getTime();
	while(new Date().getTime() < start + delay); }

function historyPush(state, title, addr){
	history.pushState(state, title, addr); }

function historyReplace(state, title, addr){
	history.replaceState(state, title, addr); }

function historyControll(){
	$('.back').click(function(e){
		window.history.go(-1); });

	window.onpopstate = history.onpushstate = function(e){
		if($('.p-layer').hasClass('dpb') && !($('.p-layer-lightbox').hasClass('dpb'))){
			$('.p-layer-container').empty();
			$('.p-layer').removeClass('dpb');
			$('body').removeClass('ofh'); 
		}else if($('.lightbox').hasClass('dpb')){
				$('.lightbox').removeClass('dpb'); } } }