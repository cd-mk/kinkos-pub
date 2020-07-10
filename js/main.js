$(function () {
	function init() {
		var self = this;

		// 회사소개
		// 베스트상품 상품 슬라이드
		if( $('.bestPro_wrap').length ) {
			var bestProSlide = $('.bestPro_wrap');

			var bestProSlideOptPc = {
				slidesPerView: 'auto',
				spaceBetween: 160,
				loop: true,
				centeredSlides: true,
				loopFillGroupWithBlank: true,
				navigation: {
					nextEl: '.bestPro_wrap .swiper-button-next',
					prevEl: '.bestPro_wrap .swiper-button-prev',
				}
			};
			var bestProSlideOptMobile = {
				slidesPerView: 'auto',
				spaceBetween: 15,
				centeredSlides: false,
				loop: false,
				loopFillGroupWithBlank: true,
				navigation: {
					nextEl: '.bestPro_wrap .swiper-button-next',
					prevEl: '.bestPro_wrap .swiper-button-prev',
				},
				scrollbar: {
					el: '.bestPro_wrap .swiper-scrollbar',
					hide: false,
				},
				pagination: {
					el: '.bestPro_wrap .swiper-pagination',
					type: 'fraction',
				}
			};

			slideInit( bestProSlide, bestProSlideOptPc, bestProSlideOptMobile, 'reload' );
		}

		// 인스타그램 슬라이드
		if( $('.insta_con').length ) {
			var instaSlide = $('.insta_con');

			var instaSlideOptPc = {
				slidesPerView: 8,
				spaceBetween: 22,
				loop: true,
				navigation: {
					nextEl: '.insta_con .swiper-button-next',
					prevEl: '.insta_con .swiper-button-prev',
				}
			};
			var instaSlideOptMobile = {
				slidesPerView: 3,
				slidesPerColumn: 2,
				spaceBetween: 0,
				loop: false,
				centeredSlides: false,
				navigation: {
					nextEl: '.insta_con .swiper-button-next',
					prevEl: '.insta_con .swiper-button-prev',
				},
				scrollbar: {
					el: '.insta_con .swiper-scrollbar',
					hide: false,
				},
				pagination: {
					el: '.insta_con .swiper-pagination',
					type: 'fraction',
				}
			};

			slideInit( instaSlide, instaSlideOptPc, instaSlideOptMobile, 'reload' );
		}

		// 서비스상품 슬라이드
		if( $('.service_wrap').length ) {
			servicePrdSlideInit();
		}
		// //회사소개

		// 온라인몰
		// 초스피드 즉성상품
		if( $('.speed_slide').length ) {
			var speedSlide = $('.speed_slide');

			var speedSlideOptPc = {
				slidesPerView: 3,
				spaceBetween: 30,
				speed: 500,
				loop: true,
				grabCursor: true,
				navigation: {
					nextEl: '.speed_slide .swiper-button-next',
					prevEl: '.speed_slide .swiper-button-prev',
				},
				scrollbar: {
					el: '.speed_slide .swiper-scrollbar',
					hide: false,
				},
				pagination: {
					el: '.speed_slide .swiper-pagination',
					type: 'fraction',
				}
			};
			var speedSlideOptMobile = {
				slidesPerView: 'auto',
				spaceBetween: 15,
				speed: 500,
				grabCursor: true,
				navigation: {
					nextEl: '.speed_slide .swiper-button-next',
					prevEl: '.speed_slide .swiper-button-prev',
				},
				scrollbar: {
					el: '.speed_slide .swiper-scrollbar',
					hide: false,
				},
				pagination: {
					el: '.speed_slide .swiper-pagination',
					type: 'fraction',
				}
			};

			slideInit( speedSlide, speedSlideOptPc, speedSlideOptMobile, 'reload' );
		}

		// 상담 상품
		if( $('.consult_slide').length ) {
			var consultSlide = $('.consult_slide');

			var consultSlideOptPc = {
				slidesPerView: 1,
				spaceBetween: 30,
				watchSlidesVisibility: true,
				watchSlidesProgress: false,
				thumbs: {
					swiper: {
						el: '.consult_tag',
						direction: 'vertical',
						slidesPerView: 'auto'
					}
				}
			};
			var consultSlideOptMobile = {
				direction: 'horizontal',
				slidesPerView: 1,
				spaceBetween: 30,
				watchSlidesVisibility: true,
				watchSlidesProgress: false,
				thumbs: {
					swiper: {
						el: '.consult_tag',
						direction: 'horizontal',
						spaceBetween: 0,
						slidesPerView: 'auto'
					}
				}
			};

			slideInit( consultSlide, consultSlideOptPc, consultSlideOptMobile, 'reload' );
		}

		// 히트상품 상품 슬라이드
		if( $('.hitPrd_wrap').length ) {
			var hitPrdSlide = $('.hitPrd_wrap .mainPrd_item');

			var hitPrdSlideOpt = {
				slidesPerView: 4,
				spaceBetween: 30,
				speed: 500,
				loop: false,
				loopFillGroupWithBlank: true,
				navigation: {
					nextEl: '.hitPrd_wrap .swiper-button-next',
					prevEl: '.hitPrd_wrap .swiper-button-prev',
				},
				scrollbar: {
					el: '.hitPrd_wrap .swiper-scrollbar',
					hide: false,
				},
				pagination: {
					el: '.hitPrd_wrap .swiper-pagination',
					type: 'fraction',
				},
				breakpoints: {
					980: {
						slidesPerView: 'auto',
						spaceBetween: 15
					}
				}
			};

			slideInit( hitPrdSlide, hitPrdSlideOpt );
		}

		// 최신상품 상품 슬라이드
		if( $('.latestPrd_wrap').length ) {
			var latestPrdSlide = $('.latestPrd_wrap .mainPrd_item');

			var latestPrdSlideOpt = {
				slidesPerView: 4,
				spaceBetween: 30,
				speed: 500,
				loop: false,
				loopFillGroupWithBlank: true,
				navigation: {
					nextEl: '.latestPrd_wrap .swiper-button-next',
					prevEl: '.latestPrd_wrap .swiper-button-prev',
				},
				scrollbar: {
					el: '.latestPrd_wrap .swiper-scrollbar',
					hide: false,
				},
				pagination: {
					el: '.latestPrd_wrap .swiper-pagination',
					type: 'fraction',
				},
				breakpoints: {
					980: {
						slidesPerView: 'auto',
						spaceBetween: 15
					}
				}
			};

			slideInit( latestPrdSlide, latestPrdSlideOpt );
		}

		// 인기상품 상품 슬라이드
		if( $('.popularPrd_wrap').length ) {
			var popularPrdSlide = $('.popularPrd_wrap .mainPrd_item');

			var popularPrdSlideOpt = {
				slidesPerView: 4,
				spaceBetween: 30,
				speed: 500,
				loop: false,
				loopFillGroupWithBlank: true,
				navigation: {
					nextEl: '.popularPrd_wrap .swiper-button-next',
					prevEl: '.popularPrd_wrap .swiper-button-prev',
				},
				breakpoints: {
					980: {
						slidesPerView: 'auto',
						spaceBetween: 15,
						loop: true,
						loopFillGroupWithBlank: true,
						scrollbar: {
							el: '.popularPrd_wrap .swiper-scrollbar',
							hide: false,
						}
					}
				}
			};

			slideInit( popularPrdSlide, popularPrdSlideOpt );
		}

		// 할인상품 상품 슬라이드
		if( $('.discountPrd_wrap').length ) {
			var discountPrdSlide = $('.discountPrd_wrap .mainPrd_item');

			var discountPrdSlideOpt = {
				slidesPerView: 4,
				spaceBetween: 30,
				speed: 500,
				loop: false,
				loopFillGroupWithBlank: true,
				navigation: {
					nextEl: '.discountPrd_wrap .swiper-button-next',
					prevEl: '.discountPrd_wrap .swiper-button-prev',
				},
				breakpoints: {
					980: {
						slidesPerView: 'auto',
						spaceBetween: 15,
						loop: true,
						loopFillGroupWithBlank: true,
						scrollbar: {
							el: '.discountPrd_wrap .swiper-scrollbar',
							hide: false,
						}
					}
				}
			};

			slideInit( discountPrdSlide, discountPrdSlideOpt );
		}

		// 추천상품 상품 슬라이드
		// 기업몰 경우 동일 클래스 여러개 사용하므로 foreach 방식으로 구현
		if( $('.recommendPrd_wrap').length ) {
			recommendPrdSlideInit();
		}
		// //온라인몰

		if( $('.is-main .banner_wrap').length ) {
			mallMainBannerWrapInit();
		}
	}

	function getScrollbarWidth() {
		return window.innerWidth - document.documentElement.clientWidth;
	}

	function chkViewport() {
		var scrollW = getScrollbarWidth();
		var winW = $(window).outerWidth();
		var viewport = winW + scrollW;

		return viewport <= 980 ? true : false;
	}

	function slideInit( target, pcOpt, moOpt, act ) {
		var isMobile = chkViewport();
		var slide = '';

		if( act === 'reload' ) {
			slide = isMobile ? new Swiper(target, moOpt) : new Swiper(target, pcOpt);

			reloadSlide(slide, pcOpt, moOpt, target);
		} else {
			slide = new Swiper(target, pcOpt);
		}
	}

	function recommendPrdSlideInit() {
		$('.recommendPrd_wrap').each(function(idx) {
			var recommendPrd_wrap = $(this);

			var opt = {
				slidesPerView: 4,
				spaceBetween: 30,
				speed: 500,
				loop: false,
				loopFillGroupWithBlank: true,
				grabCursor: true,
				navigation: {
					nextEl: recommendPrd_wrap.find('.swiper-button-next'),
					prevEl: recommendPrd_wrap.find('.swiper-button-prev'),
				},
				scrollbar: {
					el: recommendPrd_wrap.find('.swiper-scrollbar')
				},
				pagination: {
					el: recommendPrd_wrap.find('.swiper-pagination'),
					type: 'fraction',
				},
				breakpoints: {
					980: {
						slidesPerView: 'auto',
						spaceBetween: 15
					}
				}
			};

			var recommendPrd_wrap_id = 'recommendPrd_wrap_' + (idx+1);

			recommendPrd_wrap.addClass(recommendPrd_wrap_id);

			var recommendProSlide = new Swiper('.' + recommendPrd_wrap_id + ' .mainPrd_item', opt);
		});
	}

	function servicePrdSlideInit() {
		var service_navi = new Swiper('.service_wrap .service_select', {
			slidesPerView: 'auto',
			autoplay: true,
			direction: 'vertical',
			watchSlidesVisibility: true,
			watchSlidesProgress: false,
			centeredSlides: false,
			thumbs: {
				swiper: service_thumb
			}
		});

		var service_thumb = new Swiper('.service_wrap .thumb', {
			slidesPerView: 'auto',
			autoplay: true,
			loop: true,
			watchSlidesVisibility: false,
			watchSlidesProgress: false,
			centeredSlides: false,
			navigation: {
				nextEl: '.service_wrap .swiper-button-next',
				prevEl: '.service_wrap .swiper-button-prev',
			},
			pagination: {
				el: '.service_wrap .swiper-pagination',
				type: 'fraction',
			},
			thumbs: {
				swiper: service_navi
			}
		});

		if( $('.service_select').length ) {
			//service select
			$.fn.setCustomizedSelectbox = function () {
				var $selectbox = $(this),
					$optionbox = $selectbox.children("ul.selectbox-options"),
					$options = $optionbox.children("li");
				var isOpened = false;

				function _onToggleOptionBox(event) {
					event.stopPropagation();

					var target = event.target;

					if ($.inArray(target, $options) !== -1) {
						if (isOpened) return toggleOptionItem(target);
						isOpened = true;
					} else {
						if (!isOpened) return;
						isOpened = false;
					}

					$optionbox.toggleClass("opened");

				}

				function _onCloseOptionBox(event) {
					event.stopPropagation();

					var $this = $(this),
						$target = $(event.target);

					if (($.inArray(event.target, $options) !== -1 || $target.is($this)) && isOpened) {
						$optionbox.toggleClass("opened");
						isOpened = false;
					}
				}

				function toggleOptionItem(selected) {
					var $selectedItem = $(selected),
						value = $selectedItem.data();
					value = value && value.value || null;

					// 선택된 아이템의 값을 이곳에서 처리하면 됩니다.
					// form 에 적용한다면 hidden input box 를 만들어서 value 를 업데이트 하거나,
					// 페이지 이동이 필요하면 이곳에서 href relocation 을 처리하면 됩니다. :)

					if (!$selectedItem.hasClass("swiper-slide-active")) {
						$options.removeClass("swiper-slide-active");
						$selectedItem.addClass("swiper-slide-active");
						$selectedItem.trigger("onSorterSelected");
					}

					$selectbox.trigger("click");

					return;
				}

				$selectbox.on("click", _onToggleOptionBox);
				$optionbox.on("mouseleave", _onCloseOptionBox);
			};

			$(".service_select").setCustomizedSelectbox();
		}
	}

	function reloadSlide(slideTarget, pcOpt, moOpt) {
		var flag = true;
		var viewport;
		var el = slideTarget.params.el;
		var scrollW = getScrollbarWidth();

		var setObj = '';
		var setDelay = 100;

		var setFunc = function() {
			var winW = $(this).outerWidth();
			viewport = winW + scrollW;

			if (viewport <= 980 && flag) {
				slideTarget.destroy(false, true);
				slideTarget = new Swiper(el, moOpt);
				flag = false;
			} else if (viewport > 980 && !flag) {
				slideTarget.destroy(false, true);
				slideTarget = new Swiper(el, pcOpt);
				flag = true;
			}
		};

		$(window).resize(function () {
			clearTimeout( setObj );

			setObj = setTimeout(function() { setFunc(); }, setDelay);
		});
	}

	function mallMainBannerWrapInit() {
		var bannerWrap = $('.banner_wrap');
		var bannerItem = bannerWrap.find('.item');

		bannerItem.each(function() {
			var obj = $(this);
			var anchor = obj.find('>a');
			var img = anchor.find('.pc');
			var imgSrc = img.attr('src');

			anchor.css({
				'background-image': 'url("' + imgSrc + '")',
				'background-size': 'cover',
				'background-position': 'right center',
				'background-repeat': 'no-repeat'
			});
		});
	}

	$(document).ready(function() {
		init();
	});
});