
function slideInit() {
  var isMobile = chkViewport();

  // 디지털출력 복사  
  var servicePdt = new Swiper('.service_info_view', {
    spaceBetween: 30,
    slidesPerView: 'auto',
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

  var pdtOther = new Swiper('.pdt_slide', {
    slidesPerView: 'auto',
    spaceBetween: 30,
  });


  var detailThumb = new Swiper('.pdt_thumbs .inner', {
    slidesPerView: 'auto',
    spaceBetween: 15,
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });
  var detailPhoto = new Swiper('.photo_box', {
    slidesPerView: 1,
    thumbs: {
      swiper: detailThumb
    }
  });

  // visual section
  var visual = new Swiper('.visual_wrap', {
    slidesPerView: 1,
    loop: true,
    autoplay: true,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    }
  });


} 
$(document).ready(slideInit());


