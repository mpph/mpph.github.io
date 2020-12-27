$( document ).ready(function() {
	/* static variable */
	var tabName= "";
	var index = 0;
	var target = "";
	var t = "";
	var c = "";
	var s = "";
	var navCheck = false;

	/* Progress */
	screenOut();

	/* close navbar-collapse when a  clicked */
	$('.navbar-toggler').click(function(e) {	
			e.preventDefault();
			updateMenuButton(e); });
	$('.navbar-nav a').click(function(e) {
        $('.navbar-nav li').removeClass('active');
		$('.navbar-collapse').removeClass('show');
		$('.navbar-collapse').removeClass('collapseOn');
		$('.navbar-toggler').removeClass('active'); }); 

	/* Scroll event */
    $(window).scroll(function() {
        var scroll = getCurrentScroll();

        if (scroll < 20) {
			$(".navbar-area").removeClass("sticky");
        } else {
			$(".navbar-area").addClass("sticky"); } 
		
		$('.content-area').each(function(i) {
			var pos_of_content = $(this).offset().top + 60;
			var bottom_of_window = scroll + ($(window).height() / 2 );
			var check = $(this).attr('id');

			if(pos_of_content < bottom_of_window) {
				$('.navbar-nav li').removeClass('active');
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
		if($('.p-click').hasClass('p-details')) {
			target = 'p-details';
		} else if ($('.p-click').hasClass('p-animations')) {
			target = 'p-animations';
		} else if ($('.p-click').hasClass('p-videos')) {
			target = 'p-videos';
		}
		$('.p-layer-container').load('https://mpph.github.io/test.html'); 
		popLayerEffect(target);
	});
	
	/* contact effect event */
	contactCardMouseEffect(); 

	/* etc */
	$('a[href="#"]').click(function(e){
		e.preventDefault(); });

});
/*======================/Init Function============================*/









/*======================ProgressLoading============================*/
function screenOut(){
	/* progress-screen Scroll oFF */
	scrollOff('.progress-screen');
	setTimeout(
		function(){
			$('.progress-screen').fadeOut(2000); 
			scrollON('.progress-screen'); }, 2000 ); }
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



/*======================Portfolio============================*/
function popLayerEffect(target){
	$('.p-Layer').css('display','block');
	$('body').css('overflow','hidden');
    


	$('.p-layer-close').click(function(e){
		$('.p-Layer').css('display','none');
		$('body').css('overflow',''); });
}
/*======================/Portfolio============================*/



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

function scrollOff(cN) {
	$(cN).on('scroll touchmove mousewheel', function(e){
			e.preventDefault();
			e.stopPropagation();
			return false; } ); }
function scrollON(cN) {
	$(cN).off('scroll touchmove mousewheel'); }

function getCurrentScroll() {
    return window.pageYOffset; }

function updateMenuButton(e) {
	$('.navbar-toggler').toggleClass('active');
	$('.navbar-collapse').toggleClass('collapseOn');

	if(!$('.navbar-toggler').hasClass('active') || !$(e.target).hasClass('.navbar-toggler')) {
		$('.navbar-toggler span:nth-child(3)').addClass('lowestbarup');
		setTimeout(function() {
			$('.navbar-toggler span:nth-child(3)').removeClass('lowestbarup'); },550); } }


function sleep(delay) {
	var start = new Date().getTime();
	while(new Date().getTime() < start + delay); }