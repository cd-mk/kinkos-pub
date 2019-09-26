

function slideInit() {

  var eventProduct = new Swiper('.product_list',{
    roundLengths: true,
    spaceBetween:30,
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


