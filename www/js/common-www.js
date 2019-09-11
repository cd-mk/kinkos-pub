// GNB
var setGnb = function() {
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
      var idx = target.index();
      var width = target.outerWidth();
      var move = target.position().left;
      $('.gnb_bar').addClass('active');
      $('.gnb_bar').width(width);

      if (idx !== 0) {
        $('.gnb_bar').css('left', move + 110 + 'px');
      } else {
        $('.gnb_bar').css('left', move);
      }
    } else {
      $('.gnb_bar').removeClass('active');
    }
  }
  function moveSnbBg(target) {
    var width = 217;
    var idx = target.index();
    var move = idx * width + 500;

    $('.sub_gnb_bg').css('left', move);
  }
  function toggleGnb() {
    $('.btn_toggle').on('click', function() {
      var $gnbWrap = $(this).closest('.gnb_wrap');
      
      $('.sub_gnb_wrap, .center_list_wrap').stop().slideUp(400);
      $(this).toggleClass('on');
      $('.toggle_bg').toggleClass('on');

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

// input file
var setInpFile = function() {
  $('.file_box').each(function() {
    var target = $(this).find('.file_value');
    var nameTarget = $(this).find('.file_name');

    target.on('change', function() {
      var filename = window.FileReader ? $(this)[0].files[0].name : $(this).val().split('/').pop().split('\\').pop();

      nameTarget.val(filename);
    });

  });
}

// accordian 변경 예정
var setAccordian = function() {
  $('.accor_title label').on('click', function(e) {
    var $target = $(this).closest('.accor_title').next('.accor_con');

    $(this).closest('.accor_wrap').find('.accor_con').removeClass('active');
    $target.addClass('active');
  });
}

// name으로 그룹핑된 체크박스 전체 체크 기능
var setChkAll = function() {
  $('.inp_chk_all').on('change', function() {
    var name = $(this).attr('name');
    $("input[name=" + name + "").prop('checked', $(this).prop('checked'));
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

// 리사이즈 이벤트에 따른 슬라이드 리로드
function getScrollbarWidth() {
	return window.innerWidth - document.documentElement.clientWidth;
}
function reloadSlide(slideTarget, pcOpt, moOpt) {
	var flag = true;
	var viewport;
	var el = slideTarget.params.el;
	var scrollW = getScrollbarWidth();

	$(window).resize(function() {
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

// TypeB Main page JS
$(document).ready(function () {
  setGnb();
  mobileGnb();
  new WOW().init();
  
  if ($('.inp_date').length) setDatePicker();
  if ($('.file_box').length) setInpFile();
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
  $("#header").load("./include/common.html header", function () {
    // header 로드 후 header 관련 function 실행
    setGnb();
    mobileGnb();
  });
  $("#footer").load("./include/common.html .footer_inner", function () {
    
  });
});



