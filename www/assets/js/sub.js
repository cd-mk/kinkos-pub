
function slideInit() {
  var isMobile = chkViewport();

  // 디지털출력 복사  
  (function () {
    var pcOpt = {
      slidesPerView: 'auto',
      roundLengths: true,
      spaceBetween: 30,
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
    var moOpt = {
      slidesPerView: 'auto',
      spaceBetween: 15,
      roundLengths: true,
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

    var service_info_view = isMobile
      ? new Swiper('.service_info_view', moOpt)
      : new Swiper('.service_info_view', pcOpt);
    reloadSlide(service_info_view, pcOpt, moOpt);
  })();


  var aa = new Swiper('.product_list', {
    roundLengths: true,
    spaceBetween: 30,
    clickable: true,
    allowTouchMove: false,
    slidesPerView: 'auto',
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    pagination: {
      el: '.swiper-pagination',
      type: 'fraction',
    }
  });

  //상품 상세보기 슬라이드
  var isMobile = chkViewport();

  var pdtOther = new Swiper('.pdt_slide', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    loopFillGroupWithBlank: true,
    slideToClickedSlide: true,
    nextButton: '.swiper-button-next',
    prevButton: '.swiper-button-prev',
  });


  var detailThumb = new Swiper('.pdt_thumbs', {
    spaceBetween: 15,
    slidesPerView: 6,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });
  var detailPhoto = new Swiper('.photo_box', {
    slidesPerView: 1,
    thumbs: {
      swiper: detailThumb
    }
  });



} 
$(document).ready(slideInit());








