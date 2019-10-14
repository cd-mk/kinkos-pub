
function slideInit() {
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





