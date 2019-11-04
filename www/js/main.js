

function slideInit() {
  var isMobile = chkViewport();
////////////////////
//common
////////////////////
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

////////////////////
//www
////////////////////

  // 베스트상품 상품 슬라이드
  (function () {
    var pcOpt = {
      slidesPerView: 'auto',
      spaceBetween: 160,
      loop: true,
      centeredSlides: true,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    };
    var moOpt = {
      slidesPerView: 'auto',
      spaceBetween: 15,
      centeredSlides: false,
      loop: false,
      loopFillGroupWithBlank: true,
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

    var bestProSlide = isMobile
      ? new Swiper('.bestPro_wrap', moOpt)
      : new Swiper('.bestPro_wrap', pcOpt);

    reloadSlide(bestProSlide, pcOpt, moOpt);
  })();

  // 인스타그램 슬라이드 
  (function () {
    var pcOpt = {
      slidesPerView: 8,
      spaceBetween: 22,
      loop: true
    };
    var moOpt = {
      slidesPerView: 3,
      slidesPerColumn: 2,
      spaceBetween: 0,
      loop: false,
      centeredSlides: false
    };

    var instaSlide = isMobile
      ? new Swiper('.insta_con', moOpt)
      : new Swiper('.insta_con', pcOpt);

    reloadSlide(instaSlide, pcOpt, moOpt);
  })();
  // 서비스상품 슬라이드
  var service_navi = new Swiper('.service_wrap .service_select', {
    slidesPerView: 'auto',
    autoplay: true,
    direction: 'vertical',
    thumbs: {
      swiper: service_thumb
    }
  });

  var service_thumb = new Swiper('.service_wrap .thumb', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    autoplay: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    thumbs: {
      swiper: service_navi
    }
  });
////////////////////
//mall
////////////////////
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

function slideInit() {
  var isMobile = chkViewport();
////////////////////
//common
////////////////////
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

////////////////////
//www
////////////////////

  // 베스트상품 상품 슬라이드
  (function () {
    var pcOpt = {
      slidesPerView: 'auto',
      spaceBetween: 160,
      loop: true,
      centeredSlides: true,
      loopFillGroupWithBlank: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      }
    };
    var moOpt = {
      slidesPerView: 'auto',
      spaceBetween: 15,
      centeredSlides: false,
      loop: false,
      loopFillGroupWithBlank: true,
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

    var bestProSlide = isMobile
      ? new Swiper('.bestPro_wrap', moOpt)
      : new Swiper('.bestPro_wrap', pcOpt);

    reloadSlide(bestProSlide, pcOpt, moOpt);
  })();

  // 인스타그램 슬라이드 
  (function () {
    var pcOpt = {
      slidesPerView: 8,
      spaceBetween: 22,
      loop: true
    };
    var moOpt = {
      slidesPerView: 3,
      slidesPerColumn: 2,
      spaceBetween: 0,
      loop: false,
      centeredSlides: false
    };

    var instaSlide = isMobile
      ? new Swiper('.insta_con', moOpt)
      : new Swiper('.insta_con', pcOpt);

    reloadSlide(instaSlide, pcOpt, moOpt);
  })();
  // 서비스상품 슬라이드
  var service_navi = new Swiper('.service_wrap .service_select', {
    slidesPerView: 'auto',
    autoplay: true,
    direction: 'vertical',
    thumbs: {
      swiper: service_thumb
    }
  });

  var service_thumb = new Swiper('.service_wrap .thumb', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    autoplay: true,
    loop: true,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    },
    thumbs: {
      swiper: service_navi
    }
  });
////////////////////
//mall
////////////////////
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

    console.log(value);
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
}

$(document).ready(function () {
  $(".service_select").setCustomizedSelectbox();
});








