
(function () {
	$('.btn_list').on('click', function () {
		$(this).next().slideToggle(300);
	});
	$('.opt_list > li > a').on('click', function () {
		var selectText = $(this).text();
		$(this).closest('.opt_list').prev('.btn_list').text(selectText);
		$(this).closest('.opt_list').slideUp(300);
	});
})();


// mobile
(function () {
	$('.btn_menu').on('click', function () {
		$('.menu').addClass('open');
		$('body').css('overflow', 'hidden');
	});
	$('.btn_close').on('click', function () {
		$('.menu').removeClass('open');
		$('body').css('overflow', 'auto');
	});
})();

// main slide
var mainSlide = new Swiper('.visual_wrap', {
	direction: 'horizontal',
	slidesPerView: 1,
	centeredSlides: true,
	roundLengths: true
});



$(document).ready(function () {
	// 임시 header, footer영역 로드
	$("#header").load("../common/include/common.html header", function () {
    // header 로드 후 header 관련 function 실행
    setGnb();
    mobileGnb();
  });
	$("#footer").load("../common/include/common.html .footer_inner", function () {
    
  });

});








