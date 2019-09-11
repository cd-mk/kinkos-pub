
// visual section
var swiper = new Swiper('.visual_wrap', {
  slidesPerView: 1,
  loop: true,
  autoplay: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  }
});


var gallerythumb = new Swiper('.navi_thumb', {
  slidesPerView: 1,
  freeMode: true,
  loop: true,
  watchSlidesVisibility: true,
  pagination: {
    el: '.swiper-pagination',
    type: 'fraction',
  }
});
var galleryTop = new Swiper('.service_wrap .thumb', {
  slidesPerView: 'auto',
  spaceBetween: 30,
  loop: true,
  loopFillGroupWithBlank: true,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  thumb: {
    swiper: gallerythumb
  }
});

// cs문의 슬라이드
var mql = window.matchMedia("screen and (max-width: 1024px)");

if (mql.matches) {
  var swiper = new Swiper('.info_wrap .cs', {
    roundLengths: true,
    slidesPerView: 1,
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
  });
}  
  




// 리사이즈 이벤트에 따른 슬라이드 리로드
function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}

function reloadSlide(slideTarget, pcOpt, moOpt) {
  var flag = true;
  var viewport;
  var el = slideTarget.params.el;
  var scrollW = getScrollbarWidth();

  $(window).resize(function () {
    var winW = $(this).outerWidth();
    viewport = winW + scrollW;

    if (viewport < 1024 && flag) {
      slideTarget.destroy(true, true);
      slideTarget = new Swiper(el, moOpt);
      flag = false;
    } else if (viewport > 1024 && !flag) {
      slideTarget.destroy(true, true);
      slideTarget = new Swiper(el, pcOpt);
      flag = true;
    }
  });
}

// 메인 상품 슬라이드  
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

  var bestProSlide = new Swiper('.bestPro_wrap', pcOpt);
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

  var instaSlide = new Swiper('.insta_con', pcOpt);
  reloadSlide(instaSlide, pcOpt, moOpt);
})();








