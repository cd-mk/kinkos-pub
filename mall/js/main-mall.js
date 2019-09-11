
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

	// 상담상품
	var galleryThumbs = new Swiper('.consult_tag.gallery-thumbs', {
		direction: 'vertical',
		slidesPerView: 'auto',
		freeMode: false,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
		breakpoints: {
			// when window width is >= ㅡ모바일 1024이하
			1024: {
				direction: 'horizontal',
				slidesPerView: 'auto', 
				slideToClickedSlide: true,
				spaceBetween: 12,
				centeredSlides:false,
				roundLengths: true,
				freeMode: false,
			}
		}
	});
	var galleryTop = new Swiper('.consult_slide.gallery-top', {
		direction: 'vertical',
		slidesPerView: 1,
		spaceBetween: 30,
		freeMode: true,
		thumbs: {
			swiper: galleryThumbs
		},
		breakpoints: {
			// when window width is >= ㅡ모바일 1024이하
			1024: {
				direction: 'horizontal',
				slidesPerView: 1, 
				loop: true,
				centeredSlides:true,
				roundLengths: true
			}
		}
	});

	// 베스트 상품
	var bestGalleryThumbs = new Swiper('.best_name.gallery-thumbs', {
		slidesPerView: 'auto',
		freeMode: false,
		watchSlidesVisibility: true,
		watchSlidesProgress: true,
	});
	var bestGalleryTop = new Swiper('.best_item.gallery-top', {
		slidesPerView: 'auto',
		spaceBetween: 30,
		freeMode: true,
		thumbs: {
			swiper: bestGalleryThumbs
		}
	});

	var mql = window.matchMedia("screen and (max-width: 1024px)");
	if (mql.matches) {
		var swiperV = new Swiper('.swiper-container-v', {
			roundLengths: true,
			slidesPerView: 'auto',
			freeMode: true,
			spaceBetween: 20
		});
	}
}
$(document).ready(slideInit());