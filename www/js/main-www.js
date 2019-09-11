

function slideInit(){
  var isMobile = chkViewport();


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


}
$(document).ready(slideInit());








