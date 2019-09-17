
function slideInit() {
	var isMobile = chkViewport();

	// main slide
	var mainSlide = new Swiper('.visual_wrap', {
		effect: 'fade',
		speed: 500,
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
	});

	// 초스피드 즉성상품 슬라이드
	(function() {
		var pcOpt = {
			slidesPerView: 3, 
			spaceBetween: 30,
			speed: 500,
			loop: true,
			grabCursor: true,
			centeredSlides: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			scrollbar: {
				el: '.swiper-scrollbar',
				hide: false,
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'fraction',
			}
		};
		var moOpt = {
			slidesPerView: 'auto',
			spaceBetween: 15,
			speed: 500,
			grabCursor: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			scrollbar: {
				el: '.swiper-scrollbar',
				hide: false,
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'fraction',
			}
		};
		var speedSlide = isMobile
			? new Swiper('.speed_slide', moOpt)
			: new Swiper('.speed_slide', pcOpt);

		reloadSlide(speedSlide, pcOpt, moOpt);
	})();

	// cs문의 슬라이드
	(function () {
		var pcOpt = {
			slidesPerView: false,
			allowTouchMove: false
		};
		var moOpt = {
			roundLengths: true,
			slidesPerView: 1,
			allowTouchMove: true,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			scrollbar: {
				el: '.swiper-scrollbar',
				hide: false,
			},
			pagination: {
				el: '.swiper-pagination',
				type: 'fraction',
			}
		};

		var csInfo = isMobile
			? new Swiper('.info_wrap .cs', moOpt)
			: new Swiper('.info_wrap .cs', pcOpt);

		reloadSlide(csInfo, pcOpt, moOpt);
	})();

	// 상담 상품
	(function() {
		var pcOpt = {
			slidesPerView: 1,
			spaceBetween: 30,
			thumbs: {
				swiper: {
					el: '.consult_tag',
					direction: 'vertical',
					slidesPerView: 'auto',
					watchSlidesVisibility: true,
					watchSlidesProgress: true,
					freeMode: true,
					allowTouchMove: false
				}
			}
		};
		var moOpt = {
			direction: 'horizontal',
			slidesPerView: 1,
			spaceBetween: 30,
			thumbs: {
				swiper: {
					el: '.consult_tag',
					direction: 'horizontal',
					spaceBetween: 12,
					slidesPerView: 'auto',
					watchSlidesVisibility: true,
					watchSlidesProgress: true,
					allowTouchMove: true
				}
			},
			centeredSlides:true,
			roundLengths: true
		};
		
		var consultSlide = isMobile
			? new Swiper('.consult_slide', moOpt)
			: new Swiper('.consult_slide', pcOpt);

		reloadSlide(consultSlide, pcOpt, moOpt);
	})();

	// 베스트 상품
	(function() {
		var pcOpt = {
			slidesPerView: 'auto',
			spaceBetween: 30,
			thumbs: {
				swiper: {
					el: '.best_name',
					slidesPerView: 'auto',
					watchSlidesVisibility: true,
					watchSlidesProgress: true,
					freeMode: true,
					allowTouchMove: false
				}
			}
		};
		var moOpt = {
			slidesPerView: 'auto',
			spaceBetween: 30,
			allowTouchMove: false,
			thumbs: {
				swiper: {
					el: '.best_name',
					slidesPerView: 'auto',
					watchSlidesVisibility: true,
					watchSlidesProgress: true,
					freeMode: true,
					allowTouchMove: false
				}
			}
		};
		
		var bestSlide = isMobile
			? new Swiper('.best_item', moOpt)
			: new Swiper('.best_item', pcOpt);

		reloadSlide(bestSlide, pcOpt, moOpt);
	})();

	// 베스트상품 아이템1 슬라이드
	(function() {
		var pcOpt = {
			slidesPerView: false,
			allowTouchMove: false
		};
		var moOpt = {
			roundLengths: true,
			slidesPerView: 'auto',
			freeMode: true,
			spaceBetween: 20,
		};

		var bestSlideItem1 = isMobile
			? new Swiper('.best_item_con1', moOpt)
			: new Swiper('.best_item_con1', pcOpt);

		reloadSlide(bestSlideItem1, pcOpt, moOpt);
	})();
	// 베스트상품 아이템2 슬라이드
	(function() {
		var pcOpt = {
			slidesPerView: false,
			allowTouchMove: false
		};
		var moOpt = {
			roundLengths: true,
			slidesPerView: 'auto',
			freeMode: true,
			spaceBetween: 20,
		};

		var bestSlideItem2 = isMobile
			? new Swiper('.best_item_con2', moOpt)
			: new Swiper('.best_item_con2', pcOpt);

		reloadSlide(bestSlideItem2, pcOpt, moOpt);
	})();

}
$(document).ready(slideInit());