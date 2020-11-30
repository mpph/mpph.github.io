$( document ).ready(function(){
	/* static variable */
	var tabName= "";
	var index = 0;
	var target = "";
	var t = "";
	var c = "";
	var s = "";

	/* Progress */
	screenOut();

	/* close navbar-collapse when a  clicked */
	$('.navbar-toggler').click(function(e){		
			e.preventDefault();
			updateMenuButton(); });

	$(".navbar-nav a").click(function(e){
        $(".navbar-toggler").removeClass('active'); }); 

	/* Sticky event */
    $(window).scroll(function(){
        var scroll = getCurrentScroll();

        if (scroll < 20) {
			$(".navbar-area").removeClass("sticky");
        } else {
			$(".navbar-area").addClass("sticky"); } });
	
	AbilityCircle(".ability-1");
	AbilityCircle(".ability-2");
	AbilityCircle(".ability-3");
	AbilityCircle(".ability-4");


	/* Porfolio PopLayer event */
	$('.tabs .tab-pane .content-container p').click(function(e){
		e.preventDefault();

		if(	$(this).closest('#tab-1').attr('id') !== undefined){
			tabName = $(this).closest('#tab-1').attr('id');
		} else if( $(this).closest('#tab-2').attr('id') !== undefined){
			tabName = $(this).closest('#tab-2').attr('id');
		} else {
			tabName = $(this).closest('#tab-3').attr('id'); }

		index = $(this).index(); 

		t = $(this).children('.content-title').text();
		c = $(this).children('.content-context').text();
		s = $(this).children('.content-img').attr('src');

		if( t !== "" && c !== "" && s !== "" ){
			$('.layer-title').text(t);
			$('.layer-context').text(c);
			$('.layer-img').attr('src',s); 
		} else {
			$('.layer-title').text("");
			$('.layer-context').text("");
			$('.layer-img').attr('src',""); }	

		$('.popLayer').css('display','block');
		$('body').css('overflow','hidden');
		layerAutoPos();
		txtMove('.layer-title', 'left', 5);
		txtMove('.layer-context', 'right', 5); });
	/* Porfolio PopLayer Prev event */
	$('.popLayer .prev').click(function(e){
		e.preventDefault();
		
		if(index == 0 ){
			index = $('#'+ tabName +' p').children().length-1; 
		} else {
			--index; }

		target = $('#'+ tabName +' p').eq(index);

		t = $(target).children('.content-title').text();
		c = $(target).children('.content-context').text();
		s = $(target).children('.content-img').attr('src');

		if( t !== "" && c !== "" && s !== "" ){
			$('.layer-title').text(t);
			$('.layer-context').text(c);
			$('.layer-img').attr('src',s); 
		} else {
			$('.layer-title').text("");
			$('.layer-context').text("");
			$('.layer-img').attr('src',""); }
			layerAutoPos();
			txtMove('.layer-title', 'left', 5);
			txtMove('.layer-context', 'right', 5); });
	/* Porfolio PopLayer Next event */
	$('.popLayer .next').click(function(e){
		e.preventDefault();
		
		if(index == 11 ){
			index = 0
		} else {
			++index; }
		target = $('#'+ tabName +' p').eq(index);
		t = $(target).children('.content-title').text();
		c = $(target).children('.content-context').text();
		s = $(target).children('.content-img').attr('src');
		if( t !== "" && c !== "" && s !== "" ){
			$('.layer-title').text(t);
			$('.layer-context').text(c);
			$('.layer-img').attr('src',s); 
		} else {
			$('.layer-title').text("");
			$('.layer-context').text("");
			$('.layer-img').attr('src',""); }
			layerAutoPos();
			txtMove('.layer-title', 'left', 5);
			txtMove('.layer-context', 'right', 5); });	
	/* Porfolio PopLayer Close event */
	$('.layer-close').click(function(e){
		$('.popLayer').css('display','none');
		$('body').css('overflow',''); });
	
	/* contact effect event */
	contactMouseEffect(); 
	
	/* etc */
	$('a[href="#"]').click(function(e){
		e.preventDefault(); });

});

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

/*======================ProgressLoading============================*/
function screenOut(){
	/* progress-screen Scroll oFF */
	scrollOff('.progress-screen');
	setTimeout(
		function(){
			$('.progress-screen').fadeOut(2000); 
			scrollON('.progress-screen'); }, 2000 ); }
/*======================/ProgressLoading============================*/

/*======================PopupLayer============================*/
function txtMove(cN, pN, s){
	var move = setInterval(frame ,s);
	var pos = -100;
	function frame(){
		if(pos == 7){
			clearInterval(move);
		}else{
			pos++;
			$(cN).css(pN, pos +'%'); } } }

function layerAutoPos(){
	if($('.layer-img').height() > $('.popLayer').height()*0.8){
		$('.layer-container').css('height',80+'%');
	}else{
		$('.layer-container').css('height',$('.layer-img').height() + 'px'); } 

	var txtPos = ($('.popLayer').height() - $('.layer-container').height()) / 2 ;
	$('.layer-title').css('top', txtPos - ($('.layer-title').height() / 2 ) + 'px');
	$('.layer-context').css('bottom', txtPos - ($('.layer-title').height() / 2 ) + 'px'); }
/*======================/PopupLayer============================*/

/*======================Contact============================*/
function contactMouseEffect(){
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

/*00000000000000000000000000000000000000000000000000000000000000000000*/
function contactBgEffect() {
let max_particles    = 2500;
let particles        = [];
let frequency        = 10;
let init_num         = max_particles;
let max_time         = frequency*max_particles;
let time_to_recreate = false;

// Enable repopolate
setTimeout(function(){
  time_to_recreate = true;
}.bind(this), max_time);

// Popolate particles
popolate(max_particles);

var tela = document.createElement('canvas');
    tela.width = $(".footer-area .footer-contact").width();
    tela.height = $(".footer-area .footer-contact").height();
    $(".footer-area .footer-contact").append(tela);

var canvas = tela.getContext('2d');

class Particle{
  constructor(canvas){
    let random = Math.random()
    this.progress = 0;
    this.canvas = canvas;
    this.center = {
      x: $(".footer-area .footer-contact").width()/2,
      y: $(".footer-area .footer-contact").height()/2
    }
    this.point_of_attraction = {
      x: $(".footer-area .footer-contact").width()/2,
      y: $(".footer-area .footer-contact").height()/2
    }



    if( Math.random() > 0.5){
      this.x = $(".footer-area .footer-contact").width()*Math.random()
      this.y = Math.random() > 0.5 ? -Math.random() - 100 : $(".footer-area .footer-contact").height() + Math.random() + 100
    }else{
      this.x = Math.random() > 0.5 ? -Math.random() - 100 : $(".footer-area .footer-contact").width() + Math.random() + 100
      this.y = $(".footer-area .footer-contact").height()*Math.random()

    }

    this.s = Math.random() * 2;
    this.a = 0
    this.w = $(".footer-area .footer-contact").width()
    this.h = $(".footer-area .footer-contact").height()
    this.radius = random > .2 ? Math.random()*1 : Math.random()*3
    this.color  = random > .2 ? "#694FB9" : "#9B0127"
    this.radius = random > .8 ? Math.random()*2.2 : this.radius
    this.color  = random > .8 ? "#3CFBFF" : this.color
  }

  calculateDistance(v1, v2){
    let x = Math.abs(v1.x - v2.x);
    let y = Math.abs(v1.y - v2.y);
    return Math.sqrt((x * x) + (y * y));
  }

  render(){
    this.canvas.beginPath();
    this.canvas.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    this.canvas.lineWidth = 2;
    this.canvas.fillStyle = this.color;
    this.canvas.fill();
    this.canvas.closePath();
  }

  move(){

    let p1 = {
      x: this.x,
      y: this.y
    }

    let distance = this.calculateDistance(p1, this.point_of_attraction)
    let force = Math.max(100, (1 + distance));

    let attr_x = (this.point_of_attraction.x - this.x)/force;
    let attr_y = (this.point_of_attraction.y - this.y)/force;

    this.x += (Math.cos(this.a) * (this.s)) + attr_x;
    this.y += (Math.sin(this.a) * (this.s)) + attr_y;
    this.a += (Math.random() > 0.5 ? Math.random() * 0.9 - 0.45 : Math.random() * 0.4 - 0.2);

    if( distance < (30 + Math.random()*100) ){
      return false;
    }

    this.render();
    this.progress++;
    return true;
  }
}

function popolate(num){
  for (var i = 0; i < num; i++) {
    setTimeout(
      function(x){
        return function(){
          // Add particle
          particles.push(new Particle(canvas))
        };
      }(i)
      ,frequency*i);
  }
  return particles.length
}

function createSphera(){
  let radius = 180
  let center = {
    x: $(".footer-area .footer-contact").width()/2,
    y: $(".footer-area .footer-contact").height()/2
  }
}

function clear(){
  canvas.globalAlpha=0.08;
  canvas.fillStyle='#110031';
  canvas.fillRect(0, 0, tela.width, tela.height);
  canvas.globalAlpha=1;
}
}
/*
 * Function to update particles in canvas
 */
function update(){
  particles = particles.filter(function(p) { return p.move() })
  // Recreate particles
  if(time_to_recreate){
    if(particles.length < init_num){ popolate(1); console.log("Ricreo") }
  }
  clear();
  requestAnimationFrame(update.bind(this))
}
update()
/*======================/Contact============================*/

/* */
function layerImgEffect(src){
	$('.layer-img').css('-weblit-mask','url('+ src +')');
}

function scrollOff(cN){
	$(cN).on('scroll touchmove mousewheel', function(e){
			e.preventDefault();
			e.stopPropagation();
			return false; } ); }
function scrollON(cN){
	$(cN).off('scroll touchmove mousewheel'); }

function getCurrentScroll(){
    return window.pageYOffset; }

function updateMenuButton(){
	$('.navbar-toggler').toggleClass('active'); }

function sleep(delay){
	var start = new Date().getTime();
	while(new Date().getTime() < start + delay); }