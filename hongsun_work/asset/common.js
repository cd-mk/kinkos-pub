var subGnbShow = function() {
  $('.gnb > li > a').on('mouseenter focus', function() {
    $('#header').addClass('open');
    $('.header_bg').stop().slideDown(400);

    $('.sub_gnb').hide();
    if ($(this).next('.sub_gnb').is(':hidden')) {
      $(this).next('.sub_gnb').fadeIn(800);
      $('.dim').show();
    }
  });
  $('.header_top').on('mouseenter focus', function() {
    $('#header').removeClass('open');
    $('.header_bg').stop().slideUp(400);
    $('.sub_gnb').hide();
    $('.dim').hide();
  });
  $('#header').on('mouseleave blur', function() {
    $('#header').removeClass('open');
    $('.header_bg').stop().slideUp(400);
    $('.sub_gnb').hide();
    $('.dim').hide();
  });
}
var toggleGnb = function() {
  $('.btn_direct').on('click', function() {
    $('.header_bg').stop().slideUp(400);
    $('.sub_gnb').hide();
    $('.dim').hide();

    $(this).closest('.direct_box').addClass('open');
    showDirectGnb();
  });
  $('.btn_direct_close').on('click', function() {
    $(this).closest('.direct_box').removeClass('open');
    $('.direct_gnb').removeClass('on');
  });

  function showDirectGnb() {
    setTimeout(function() {
      $('.direct_gnb').addClass('on');
    },400)
  }
}

var setPopup = function() {
  $('.js_modal').on('click', function() {
    $(this).next('.popup_wrap').addClass('open');
    $('.dim').show();
  });
  $('.btn_popupclose').on('click', function() {
    $(this).closest('.popup_wrap').removeClass('open');
    $('.dim').hide();
  });
}


var init = function() {
  subGnbShow();
  toggleGnb();
  setPopup();
}
$(document).ready(init);
