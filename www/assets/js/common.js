


// GNB
var setGnb = function() {
  if ($("#wrap").is(".company") === true) {
    $(".gnb_wrap").addClass("company");
  }
  if ($("#wrap").is(".mall") === true) {
    $(".gnb_wrap").addClass("mall");
  }
  var $gnb, chkGnb;

  $('.js_gnb .link_item').on('mouseenter focusin', function() {
    $gnb = $(this).closest('.js_gnb');
    chkGnb = $gnb.attr('data-gnb');

    $('.dim').show();
    $('.js_gnb .link_item').removeClass('on');
    $(this).addClass('on');

    if (chkGnb === 'company') {
      gnbBar(true, $(this));
      moveSnbBg($(this));
    }
    
    dropSubGnb($(this), chkGnb);
  });
  
  $('#header').on('mouseleave focusout', function() {
    $('.dim').hide();
    $('.js_gnb .link_item').removeClass('on');
    $("[data-snb=" + chkGnb + "]").stop().slideUp(400);
    $('.center_list_wrap').stop().slideUp(400);
    gnbBar(false);
  });

  function dropSubGnb(target, chkGnb) {
    if (target.hasClass('js_center')) {
      $("[data-snb=" + chkGnb + "]").hide();
      $('.center_list_wrap').stop().slideDown(400);
    } else {
      $('.center_list_wrap').hide();
      $("[data-snb=" + chkGnb + "]").stop().slideDown(400);
    }
  }
  function gnbBar(flag, target) {
    if (flag) {
      var mgl = parseInt(target.css('margin-left'));
      var width = target.outerWidth();
      var move = target.position().left;
      $('.gnb_bar').addClass('active');
      $('.gnb_bar').width(width);

      $('.gnb_bar').css('left', move + mgl + 'px');
    } else {
      $('.gnb_bar').removeClass('active');
    }
  }
  function moveSnbBg(target) {
    var w = target.outerWidth();
    var left = target.offset().left;

    $('.sub_gnb_bg').width(w);
    $('.sub_gnb_bg').css('left', left + 'px');
  }
  function toggleGnb() {
    $('.btn_toggle').on('click', function() {
      var $gnbWrap = $(this).closest('.gnb_wrap');
      
      $('.sub_gnb_wrap, .center_list_wrap').stop().slideUp(400);
      $(this).toggleClass('on');
      $('.toggle_bg').toggleClass('on');
      $('.dim').hide();



      if ($gnbWrap.hasClass('company')) {
        $('.mall_gnb').toggleClass('active');
        $('.company_gnb').toggleClass('off');
      } else {
        $('.company_gnb').toggleClass('active');
        $('.mall_gnb').toggleClass('off');
      }

      
    });
  }
  toggleGnb();
}

// MOBILE GNB
var mobileGnb = function () {
  $('.btn_mo_gnb').on('click', function() {
    $('body').addClass('open');
    $('.mo_gnb_wrap').addClass('active');
  });
  $('.mo_gnb_wrap .btn_close').on('click', function() {
		$('body').removeClass('open');
    $('.mo_gnb_wrap').removeClass('active');
  });
  $('.menu_item .title').on('click', function() {
    $('.menu_item .menu_list').stop().slideUp(300);
    $(this).next('.menu_list').stop().slideDown(300);
  });
};



// input file
var inpFile = {
  inpWrap: '.file_inp_box',
  fileNameClass: '.js-file_name',
  targetLayerImg: $('#file_layer').find('.img_preview'),
  setElement: function () {
    var inpList = [];

    $('.file_inp').each(function () {
      inpList.push($(this));
    });

    return inpList;
  },
  fileChangeEvt: function () {
    var inpList = this.setElement();

    for (var i = 0; i < inpList.length; i++) {
      inpList[i].on('change', this.setChangeEvt);
    }
  },
  setChangeEvt: function () {
    var fileName = inpFile.setFileName(this);

    inpFile.insertFileName(this, fileName);
  },
  setFileName: function (target) {
    var fileName;

    if (window.FileReader) {
      fileName = $(target)[0].files[0].name;
    } else {
      fileName = $(target).val().split('/').pop().split('\\').pop();
    }

    return fileName;
  },
  insertFileName: function (target, fileName) {
    var wrap = this.inpWrap,
      targetFileName = this.fileNameClass;

    $(target).closest(wrap).find(targetFileName).attr('disabled', 'disabled').val(fileName);
    $(target).siblings('label').addClass('hide');
    $(target).siblings('.btn_delete').removeClass('hide');
  },
  setDeleteFile: function () {
    var wrap = this.inpWrap,
      targetFileName = this.fileNameClass;

    $('.btn_delete').on('click', function () {
      $(this).siblings('.file_inp').val('');
      if ($(this).closest(wrap).find(targetFileName).hasClass('has_target')) {
        $(this).closest(wrap).find(targetFileName).removeClass('has_target').removeAttr('data-img-src');
        $(this).closest(wrap).find(targetFileName).off('click');
      }
      $(this).closest(wrap).find(targetFileName).attr('disabled', false).val('');
      $(this).addClass('hide');
      $(this).siblings('label').removeClass('hide');
    });
  },
  setPopup: function () {
    var imgSrc;
    var target = this.targetLayerImg;
    $('.has_target').on('click', function () {
      imgSrc = $(this).attr('data-img-src');
      target.attr('src', imgSrc);

      $('#file_layer').addClass('open');
      $('body').addClass('open');
    });
  },
  init: function () {
    this.setDeleteFile();
    this.fileChangeEvt();
    this.setPopup();
  }
};
$(document).on('click', ".file_inp", function () {
  inpFile.init();
});
// DatePicker
var setDatePicker = function() {
  $.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd',
    dayNames: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
    dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'],
    monthNames: ['1월', '2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
    monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  });
  $('.inp_date').datepicker();
};


// accordian 변경 예정
var setAccordian = function() {
  $('.accor_title label').on('click', toggleContent);
  $('.accor_title .txt_title').on('click', toggleContent);

  function toggleContent() {
    $(this).closest('.accor_item').toggleClass('active');
  }
}

// name으로 그룹핑된 체크박스 전체 체크 기능
var setChkAll = function() {
  $('.inp_chk_all').on('change', function() {
    var name = $(this).attr('name');
    $("input[name=" + name + "").prop('checked', $(this).prop('checked'));
  });
  $('.inp_chk_del').on('click', function () {
    $('input[type=checkbox]').prop('checked', false);
  });
}


// layer popup
var setPopup = function() {
  $('.btn_popup').on('click', function() {
    var popupTarget = $(this).attr('href').slice(1);

    if ($("#" + popupTarget + "").length) {
      $('body').addClass('open');
      $("#" + popupTarget + "").addClass('active');
      $('.dim').show();
    }
  });
  $('.btn_pop_close').on('click', function() {
    $('body').removeClass('open');
    $(this).closest('.popup_wrap').removeClass('active');
    $('.dim').hide();
  });
}

// faq tab
var setFaqTab = function() {
  
  $('.faq_tab_nav > li').on('click', function() {
    var idx = $(this).index();
    
    $('.faq_tab_nav > li').removeClass('on');
    $(this).addClass('on');

    $('.faq_tab_con .accor_wrap').removeClass('active');
    $('.faq_tab_con .accor_wrap').eq(idx).addClass('active');
  });
}
setFaqTab();

/// 브라우저별 스크롤바 넓이
function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}
// 페이지 로드시 viewport 체크
function chkViewport() {
  var scrollW = getScrollbarWidth();
  var winW = $(window).outerWidth();
  var viewport = winW + scrollW;

  return viewport <= 1024 ? true : false;
}
// 리사이즈 이벤트에 따른 슬라이드 리로드
function reloadSlide(slideTarget, pcOpt, moOpt) {
  var flag = true;
  var viewport;
  var el = slideTarget.params.el;
  var scrollW = getScrollbarWidth();

  $(window).resize(function () {
    var winW = $(this).outerWidth();
    viewport = winW + scrollW;

    if (viewport <= 1024 && flag) {
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



// TypeB Main page JS
$(document).ready(function () {
  setGnb();
  mobileGnb();
  new WOW().init();
  inpFile.init();
  // placeholder
  $('input, textarea').placeholder();


  if ($('.inp_date').length) setDatePicker();
  if ($('.btn_popup').length) setPopup();
  if ($('.inp_chk_all').length) setChkAll();
  if ($('.accor_wrap').length) setAccordian();

  $('body').on('mousewheel DOMMouseScroll', function(e){
    if(typeof e.originalEvent.detail == 'number' && e.originalEvent.detail !== 0) {
      if(e.originalEvent.detail > 0) {
        $('.mo_quick').removeClass('up');
        $('.mo_quick').addClass('down');
      } else if(e.originalEvent.detail < 0){
        $('.mo_quick').removeClass('down');
        $('.mo_quick').addClass('up');
      }
    } else if (typeof e.originalEvent.wheelDelta == 'number') {
      if(e.originalEvent.wheelDelta < 0) {
        $('.mo_quick').removeClass('up');
        $('.mo_quick').addClass('down');
      } else if(e.originalEvent.wheelDelta > 0) {
        $('.mo_quick').removeClass('down');
        $('.mo_quick').addClass('up');
      }
    }
  });





  // 임시 header, footer영역 로드
  $("#header").load("../common/include/common.html header", function () {
    // header 로드 후 header 관련 function 실행
    setGnb();
    mobileGnb();
  });
  $("#footer").load("../common/include/common.html .footer_inner", function () {
    
  });
});



//tab
$(function () {
  tab('#tab', 0);
  tab('#tab1', 0);
});

function tab(e, num) {
  var num = num || 0;
  var menu = $(e).children();
  var con = $(e + '_con').children();
  var select = $(menu).eq(num);
  var i = num;

  select.addClass('active');
  con.eq(num).show();

  menu.click(function () {
    if (select !== null) {
      select.removeClass("active");
      con.eq(i).hide();
    }

    select = $(this);
    i = $(this).index();

    select.addClass('active');
    con.eq(i).show();
  });
}



// mobile
(function () {
  $('.btn_menu').on('click', function () {
    $('.menu').addClass('open');
    $('body').css('overflow', 'hidden');
  });
  $('.btn_close').on('click', function () {
    $('.menu').removeClass('open');
    $('body').css('overflow', 'auto');
  });
})();



(function () {
  $('.btn_list').on('click', function () {
    $(this).next().slideToggle(300);
  });
  $('.opt_list > li > a').on('click', function () {
    var selectText = $(this).text();
    $(this).closest('.opt_list').prev('.btn_list').text(selectText);
    $(this).closest('.opt_list').slideUp(300);
  });
})();

// main slide
var mainSlide = new Swiper('.visual_wrap', {
  direction: 'horizontal',
  slidesPerView: 1,
  centeredSlides: true,
  roundLengths: true
});


