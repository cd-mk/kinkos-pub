// GNB
var setGnb = function() {
	var $gnb, chkGnb;

	$('.js_gnb .link_item').on('mouseenter focusin', function() {
		$gnb = $(this).closest('.js_gnb');
		chkGnb = $gnb.attr('data-gnb');

		$('.dim').show();
		$('.js_gnb .link_item').removeClass('on');
		$(this).addClass('on');

		if (chkGnb === 'company') {
			gnbBar(true, $(this));
			moveSnbBg($(this));
		}
		
		dropSubGnb($(this), chkGnb);
	});
	
	$('#header').on('mouseleave focusout', function() {
		$('.dim').hide();
		$('.js_gnb .link_item').removeClass('on');
		$("[data-snb=" + chkGnb + "]").stop().slideUp(400);
		$('.center_list_wrap').stop().slideUp(400);
		gnbBar(false);
	});

	function dropSubGnb(target, chkGnb) {
		if (target.hasClass('js_center')) {
			$("[data-snb=" + chkGnb + "]").hide();
			$('.center_list_wrap').stop().slideDown(400);
		} else {
			$('.center_list_wrap').hide();
			$("[data-snb=" + chkGnb + "]").stop().slideDown(400);
		}
	}
	function gnbBar(flag, target) {
		if (flag) {
			var idx = target.index();
			var width = target.outerWidth();
			var move = target.position().left;
			$('.gnb_bar').addClass('active');
			$('.gnb_bar').width(width);

			if (idx !== 0) {
				$('.gnb_bar').css('left', move + 110 + 'px');
			} else {
				$('.gnb_bar').css('left', move);
			}
		} else {
			$('.gnb_bar').removeClass('active');
		}
	}
	function moveSnbBg(target) {
		var width = 217;
		var idx = target.index();
		var move = idx * width + 427;

		$('.sub_gnb_bg').css('left', move);
	}
	function toggleGnb() {
		$('.btn_toggle').on('click', function() {
			var $gnbWrap = $(this).closest('.gnb_wrap');
			
			$('.sub_gnb_wrap, .center_list_wrap').stop().slideUp(400);
			$(this).toggleClass('on');
			$('.toggle_bg').toggleClass('on');

			if ($gnbWrap.hasClass('company')) {
				$('.mall_gnb').toggleClass('active');
				$('.company_gnb').toggleClass('off');
			} else {
				$('.company_gnb').toggleClass('active');
				$('.mall_gnb').toggleClass('off');
			}
		});
	}
	toggleGnb();
}

// MOBILE GNB
var mobileGnb = function () {
	$('.btn_mo_gnb').on('click', function() {
		$('.mo_gnb_wrap').addClass('active');
	});
	$('.mo_gnb_wrap .btn_close').on('click', function() {
		$('.mo_gnb_wrap').removeClass('active');
	});
	$('.menu_item .title').on('click', function() {
		$('.menu_item .menu_list').stop().slideUp(300);
		$(this).next('.menu_list').stop().slideDown(300);
	});
};

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

(function () {
	$('.banner_item').on('mouseenter', function () {
		$(this).find('.txt').addClass('move');
	});
	$('.banner_item').on('mouseleave', function () {
		$(this).find('.txt').removeClass('move');
	});
})();

// main slide
var mainSlide = new Swiper('.visual_wrap', {
	effect: 'fade',
	speed: 500,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
	},
});
var speedSlide = new Swiper('.speed_slide', {
	slidesPerView: 3,
	spaceBetween: 30,
	speed: 500,
	loop: true,
	grabCursor: true,
	centeredSlides: true,
	initialSlide: 1,
	navigation: {
		nextEl: '.swiper-button-next',
		prevEl: '.swiper-button-prev',
	}
});
var consultSlide = new Swiper('.consult_slide', {
	direction: 'vertical',
	grabCursor: true,
	speed: 500,
	pagination: {
		el: '.swiper-pagination',
		clickable: true,
		bulletClass: 'consult_nav',
		bulletActiveClass: 'active',
		renderBullet: function (index, className) {
			var bulletNames = ['# 특수명함', '# 홍보물', '# 대형 출력', '# POP/배너', '# 책표지'];

			return '<span class="' + className + '">' + bulletNames[index] + '</span>';
		}
	},
});
(function () {
	var width = 1530;

	$('.tab_nav > li').on('click', function () {
		var idx = $(this).index();
		var move = idx * width;

		$('.tab_nav > li').removeClass('active');
		$(this).addClass('active');

		$('.tab_con .tab_item').css({ "transform": "translate3d(-" + move + "px, 0px, 0px)" });
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


$(document).ready(function () {
	new WOW().init();
	//임시 header, footer영역 로드
	$("#header").load("./include/common.html header", function () {
		// header 로드 후 header 관련 function 실행
		setGnb();
		mobileGnb();
	});
	$("#footer").load("./include/common.html footer", function () {

	});

});








