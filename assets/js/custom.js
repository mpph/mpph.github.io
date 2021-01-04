$( document ).ready(function() {

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
			target = 'designs';
		} else if ($(this).hasClass('p-animations')) {
			target = 'animations';
		} else if ($(this).hasClass('p-videos')) {
			target = 'videos'; }
			
		popLayerEffect(target); });
	
	/* contact effect event */
	contactCardMouseEffect(); 

	/* etc */
	$('a[href="#"]').click(function(e){
		e.preventDefault(); });
historyPop();
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
	addr = target == 'designs' || 'animations' || 'videos' ? target + '-gallery' : target ;
	historyPush(target , 'openedLayer', '/' + addr);

	$('.p-layer').addClass('active');
	$('.p-layer').css('display','block');
	$('body').css('overflow','hidden');

	$('.p-layer-container').load('https://mpph.github.io/' + target + '.html');

	$('.p-layer-bg').click(function(e){
		$('.p-layer').removeClass('active');
		$('.p-layer-container').empty();
		$('.p-layer').css('display','none');
		$('body').css('overflow','');
		window.history.back();
		historyDelLastEntry(window.location.href); }); }
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
	window.history.pushState(state, title, location.replace(addr)); }

function historyDelLastEntry(addr){
	alert(window.history.length);
	window.location.replace(addr);
	alert(window.history.length);
}
function historyPop(){
	window.onpopstate = history.onpushstate = function() {
		if($('.p-layer').hasClass('active')){
			$('.p-layer').removeClass('active');
			$('.p-layer-container').empty();
			$('.p-layer').css('display','none');
			$('body').css('overflow',''); } } } 