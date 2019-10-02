
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


} 
$(document).ready(slideInit());




// anchor
function jumpto(anchor) {
  window.location.href = "#" + anchor;
}

