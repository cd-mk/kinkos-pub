


/// 브라우저별 스크롤바 넓이
function getScrollbarWidth() {
  return window.innerWidth - document.documentElement.clientWidth;
}
// 페이지 로드시 viewport 체크
function chkViewport() {
  var scrollW = getScrollbarWidth();
  var winW = $(window).outerWidth();
  var viewport = winW + scrollW;

  return viewport <= 980 ? true : false;
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



// GNB
var setGnb = function () {
  if ($("#wrap").is(".company") === true) {
    $(".gnb_wrap").addClass("company");
    $(".btn_toggle strong").text("온라인몰");
    $(".logo").attr('href', '/www/company/MH.00.00.00.main-www.html');
  }
  if ($("#wrap").is(".mall") === true) {
    $(".gnb_wrap").addClass("mall");
    $(".btn_toggle strong").text("Kinko's");
    $(".logo").attr('href', '/www/mall/SmH.00.00.00.main-mall.html');
  }
  var $gnb, chkGnb;

  $('.gnb_wrap .link_item').on('mouseenter focusin', function () {
    $gnb = $(this).closest('.js_gnb');
    chkGnb = $gnb.attr('data-gnb');

    $('.dim').show();
    $('.gnb_wrap .link_item').removeClass('on');
    $(this).addClass('on');

    dropSubGnb($(this), chkGnb);
  });

  $('.gnb_wrap').on('mouseleave focusout', function () {
    $('.dim').hide();
    $('.gnb_wrap .link_item').removeClass('on');
    $("[data-snb=" + chkGnb + "]").stop().slideUp(400);
    $('.center_list_wrap').stop().slideUp(400);
  });
  $('.js_gnb').on('mouseleave focusout', function () {
    $("[data-snb=" + chkGnb + "]").stop().slideUp(400);
    $('.dim').hide();
  });
  $('.sub_gnb_wrap').on('mouseenter focusin', function () {
    $("[data-snb=" + chkGnb + "]").stop().slideDown(400);
    $('.dim').show();
  });
  $('.sub_gnb_wrap').on('mouseleave focusout', function () {
    $("[data-snb=" + chkGnb + "]").stop().slideUp(400);
    $('.dim').hide();
  });

  $('.btn_search_form').on('click', function(e) {
    e.preventDefault();

    $(this).closest('.search_item').toggleClass('on');
  });

  function dropSubGnb(target, chkGnb) {
    if( target.hasClass('js_center') ) {
      $("[data-snb=" + chkGnb + "]").hide();
      $('.center_list_wrap').stop().slideDown(400);

      $('.sub_gnb_wrap').slideUp(400);
      $('.gnb_quick.mall').removeClass('active').removeClass('off');
      $('.gnb_quick.company').removeClass('off').removeClass('active');
      $('.toggle_bg').removeClass('on');
    } else {
      $('.center_list_wrap').hide();
      $("[data-snb=" + chkGnb + "]").stop().slideDown(400);
    }
  }


  function toggleGnb() {
    $('.btn_toggle').on('mouseover', function (e) {
      e.preventDefault();

      var $gnbWrap = $(this).closest('.gnb_wrap');

      $('.center_list_wrap').stop().slideUp(400);
      $(this).addClass('on');
      $('.toggle_bg').addClass('on');
      $('.dim').show();

      if( $gnbWrap.hasClass('company') ) {
        $('.gnb_quick.mall').addClass('active').removeClass('off');
        $('.gnb_quick.company').addClass('off').removeClass('active');

        $('.sub_gnb_wrap.mall').stop().slideDown(400);
      } else {
        $('.gnb_quick.company').addClass('active').removeClass('off');
        $('.gnb_quick.mall').addClass('off').removeClass('active');

        $('.sub_gnb_wrap.company').stop().slideDown(400);
      }
    });

    $('.btn_toggle').on('click', function (e) {
      e.preventDefault();

      var obj = $(this);
      var $gnbWrap = obj.closest('.gnb_wrap');
      var mainUrl = '';

      if( $gnbWrap.hasClass('company') )
      {
        mainUrl = obj.attr('data-mall-main-url');
      }
      else
      {
        mainUrl = obj.attr('data-company-main-url');
      }

      if( mainUrl )
      {
        location.href = mainUrl;
      }
    });

    $('.gnb_wrap').on('mouseleave', function (e) {
      e.preventDefault();

      var $gnbWrap = $(this);

      $('.sub_gnb_wrap, .center_list_wrap').stop().slideUp(400);
      $('.btn_toggle').removeClass('on');
      $('.toggle_bg').removeClass('on');
      $('.dim').hide();

      if ($gnbWrap.hasClass('company')) {
        $('.gnb_quick.mall').removeClass('active').removeClass('off');
        $('.gnb_quick.company').removeClass('off').removeClass('active');
      } else {
        $('.gnb_quick.company').removeClass('active').removeClass('off');
        $('.gnb_quick.mall').removeClass('off').removeClass('active');
      }
    });
  }
  toggleGnb();


  // map link (2019.11/20)
  $('ul.locat_list li').on('mouseleave focusout', function () {
    var tab_id = $(this).attr('data-tab');

    $('ul.locat_list li').removeClass('active');
    $('.map-content').removeClass('active');

    $(this).addClass('active');
    $("#" + tab_id).addClass('active');
  })


}

// MOBILE GNB
var mobileGnb = function () {
  $('.btn_mo_gnb').on('click', function(e) {
    e.preventDefault();

    var obj = $(this);
    var target = obj.attr('data-target');
    if( target )
    {
      $('body').addClass('open');
      $('.mo_gnb_wrap').addClass('active ' + target).find('.menu_box.' + target).addClass('show');
      $('.mo_gnb_wrap_back').addClass('active');
    }
  });

  $('.mo_gnb_wrap .btn_close').on('click', function () {
    $('body').removeClass('open');
    $('.mo_gnb_wrap').removeClass('active');
    $('.mo_gnb_wrap_back').removeClass('active');

    setTimeout(function() {
      $('.mo_gnb_wrap').find('.menu_box').removeClass('show');;
      $('.mo_gnb_wrap').removeClass('company').removeClass('mall');
    }, 400);
  });


  $('.menu_item .menu_item_more_btn').on('click', function () {
    $(this).toggleClass('active');
    $(this).closest('.menu_item').find('.menu_list').slideToggle();
  });
};

var setInputFile = function () {
  $('.file_inp').each(function () {
    $(this).on('change', function () {
      var filename = window.FileReader ? $(this)[0].files[0].name : $(this).val().split('/').pop().split('\\').pop();

      $(this).siblings('.js-file-name').val(filename).attr('disabled', true);
      $(this).siblings('.js-file-label').addClass('hide');
      $(this).siblings('.js-file-del').addClass('on');
    });
  });
  $('.js-file-label').on('click', function () {
    $(this).siblings('.file_inp').trigger('click');
  });
  $('.js-file-del').on('click', function () {
    $(this).siblings('.js-file-name').val('');
    $(this).siblings('.file_inp').val('');
    $(this).siblings('.js-file-label').removeClass('hide');
    $(this).removeClass('on');
  });
};

var setCustomList = function () {
  $('.js-list-add').on('click', function () {
    var listClone = $(this).closest('.file_inp_box').clone(true);

    listClone.find('.js-file-label').removeClass('hide');
    listClone.find('.js-file-del').removeClass('on');
    listClone.find('input').val('');
    listClone.find('.status').text('');
    listClone.find('.js-list-add').off('click').removeClass('js-list-add plus').addClass('js-list-del minus');
    $(this).closest('.js-list-item').append(listClone);
    setListRemove();
  });
  function setListRemove() {
    $('.js-list-del').on('click', function () {
      $(this).closest('.file_inp_box').remove();
    });
  }
};

// DatePicker
var setDatePicker = function () {
  $.datepicker.setDefaults({
    dateFormat: 'yy-mm-dd',
    dayNames: ['월요일', '화요일', '수요일', '목요일', '금요일', '토요일', '일요일'],
    dayNamesMin: ['월', '화', '수', '목', '금', '토', '일'],
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
  });
  $('.inp_date').datepicker();
};

// accordian 변경 예정
var setAccordian = function () {
  $('.accor_title label').on('click', toggleContent);
  $('.accor_title .txt_title').on('click', toggleContent);
  $('.accor_title .accor_toggle_btn').on('click', function(e) {
    e.preventDefault();

    $(this).closest('.accor_item').toggleClass('active');
  });

  function toggleContent() {
    $(this).closest('.accor_item').toggleClass('active');
  }
};

// name으로 그룹핑된 체크박스 전체 체크 기능
var setChkAll = function () {
  $('.inp_chk_all').on('change', function () {
    var name = $(this).attr('name');
    $("input[name=" + name + "").prop('checked', $(this).prop('checked'));
  });
  $('.inp_chk_del').on('click', function () {
    $('input[type=checkbox]').prop('checked', false);
  });
}

var popupSizeSetObj = null;
var popupSizeSetDelay = 100;

var popupSizeInit = function( obj ) {
  if( obj )
  {
    var inner = obj.find('.inner');
    if( inner.length )
    {
      var winHeight = parseInt( window.innerHeight, 10 );
      var titleHeight = parseInt( inner.find('.title').outerHeight( true ), 10 );
      var contentHeight = 0;

      if( inner.find('.pop_con').length )
      {
        contentHeight = parseInt( inner.find('.pop_con').outerHeight( true ), 10 );
      }
      else
      {
        if( inner.find('.popup_content').length )
        {
          contentHeight = parseInt( inner.find('.popup_content').outerHeight( true ), 10 );
        }
      }

      var innerHeight = titleHeight + contentHeight;

      inner.css({'height': '', 'overflow-y': ''});

      if( winHeight < innerHeight )
      {
        inner.css({'height': '90%', 'overflow-y': 'scroll'});
      }
    }
  }
};


// layer popup
var setPopup = function () {
  $('.btn_popup').on('click', function (e) {
    var obj = $(this);
    var targetType = obj.attr('data-target-type');

    if( targetType === 'window_popup' )
    {
      e.preventDefault();

      var href = obj.attr('href');
      var windowPopupWidth = obj.attr('data-window-width');
      var windowPopupHeight = obj.attr('data-window-height');
      var windowPopup = window.open(href, 'windowPopup', 'width=' + windowPopupWidth + ',height=' + windowPopupHeight + ',resizable=1,scrollbars=0');
    }
    else
    {
      var popupTarget = $(this).attr('href').slice(1);
      var popupTargetObj = $('#' + popupTarget);

      if( popupTargetObj.length )
      {
        $('body').addClass('open');
        $("#" + popupTarget + "").addClass('active');

        popupSizeInit( popupTargetObj );

        if( !$('.dim_layer').length )
        {
          $('#content').append('<div class="dim_layer"></div>');
        }

        $('.dim_layer').show();
      }
    }
  });

  $('.btn_pop_close').on('click', function () {
    $('body').removeClass('open');

    var popup = $(this).closest('.popup_wrap');
    popup.find('.inner').css({'height': '', 'overflow-y': ''});

    $(this).closest('.popup_wrap').removeClass('active');
    $('.dim_layer').hide();
  });

  $('.btn_pop_close_btn').on('click', function () {
    $('body').removeClass('open');

    var popup = $(this).closest('.popup_wrap');
    popup.find('.inner').css({'height': '', 'overflow-y': ''});

    popup.removeClass('active');
    $('.dim_layer').hide();
  });

  $(window).on('resize', function() {
    clearTimeout( popupSizeSetObj );

    var popupActiveObj = $('.popup_wrap.active');

    if( popupActiveObj.length )
    {
      popupSizeSetObj = setTimeout(function() {
        popupSizeInit( popupActiveObj );
      }, popupSizeSetDelay);
    }
  });
};

// faq tab
var setFaqTab = function () {

  $('.faq_tab_nav ul > li').on('click', function () {
    var idx = $(this).index();

    $('.faq_tab_nav ul > li').removeClass('on');
    $(this).addClass('on');

    $('.faq_tab_con .accor_wrap').removeClass('active');
    $('.faq_tab_con .accor_wrap').eq(idx).addClass('active');
  });
}

var mobileSetFaqTab = function() {
  if( $('select.faq_tab_nav_select').length )
  {
    $('select.faq_tab_nav_select').find('option').each(function(idx) {
      $(this).attr('data-idx', idx+1);
    });

    $('select.faq_tab_nav_select').on('change', function() {
      var select = $(this);
      var selectedOption = select.find('option:selected');
      var selectedOptionIndex = selectedOption.attr('data-idx');

      var targetObj = $('.faq_tab_con .accor_wrap').eq(selectedOptionIndex-1);
      if( targetObj.length )
      {
        $('.faq_tab_con .accor_wrap').removeClass('active');
        targetObj.addClass('active');
      }
    });
  }
};




// TypeB Main page JS
$(document).ready(function () {
  setGnb();
  mobileGnb();
  new WOW().init();
  setFaqTab();
  mobileSetFaqTab();
  // placeholder
  $('input, textarea').placeholder();
  if ($('.inp_date').length) setDatePicker();
  if ($('.btn_popup').length) setPopup();
  if ($('.inp_chk_all').length) setChkAll();
  if ($('.accor_wrap').length) setAccordian();
  if ($('.file_inp').length) setInputFile();
  if ($('.js-list-add').length) setCustomList();


  $('body').on('mousewheel DOMMouseScroll', function (e) {
    if (typeof e.originalEvent.detail == 'number' && e.originalEvent.detail !== 0) {
      if (e.originalEvent.detail > 0) {
        $('.mo_quick').removeClass('up');
        $('.mo_quick').addClass('down');
      } else if (e.originalEvent.detail < 0) {
        $('.mo_quick').removeClass('down');
        $('.mo_quick').addClass('up');
      }
    } else if (typeof e.originalEvent.wheelDelta == 'number') {
      if (e.originalEvent.wheelDelta < 0) {
        $('.mo_quick').removeClass('up');
        $('.mo_quick').addClass('down');
      } else if (e.originalEvent.wheelDelta > 0) {
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
  // search PC
  var target = $('.sch_wrap .btn_list');
  var targetLayer = $('.sch_wrap .item_box');

  target.on('click mouseleave', function () {
    $(this).next().addClass("active");
    target.not($(this)).next().removeClass("active");
  });
  targetLayer.on('mouseleave', function () {
    $('.sch_wrap .opt_list').removeClass('active');
  });

  $('.sch_wrap .opt_list > li a').on('click', function () {
    var selectText = $(this).text();
    $(this).closest('.opt_list').prev('.btn_list').text(selectText);
    $(this).closest('.opt_list').removeClass('active');
  });

  // search MOBULE

  var mo_target = $('.popup_wrap.sch .btn_list');
  var mo_targetLayer = $('.popup_wrap.sch .item_box');

  mo_target.on('click', function(e) {
    e.preventDefault();
    $(this).toggleClass('active').next().toggleClass("active");
  });
  mo_targetLayer.on('mouseleave', function () {
    $('.popup_wrap.sch .opt_list').removeClass('active');
  });

  $('.popup_wrap.sch .opt_list > li a').on('click', function (e) {
    e.preventDefault();

    var selectText = $(this).text();
    $(this).closest('.opt_list').prev('.btn_list').text(selectText);
    $(this).closest('.opt_list').removeClass('active');
  });

  function mo_sub_type_menu()
  {
    var btnObj = $('.btn_mo_sub_type');
    var parentObj = btnObj.closest('div[class*="sub_type"]');
    var parentLi = $('div[class*="sub_type"] ul li a');

    if( parentObj.length )
    {
      var targetObj = parentObj.find('>ul');
      if( targetObj.length )
      {
        btnObj.on('click', function() {
          targetObj.toggleClass('active');
        });

        parentObj.on('mouseleave', function() {
          targetObj.removeClass('active');
        });
        // 11/20 추가
        parentLi.on('click', function () {
          var parentLiText = $(this).text();
          targetObj.removeClass('active');
          btnObj.text(parentLiText);
          btnObj.addClass('active');
        });
      }
    }
  }

  if( $('.btn_mo_sub_type').length )
  {
    mo_sub_type_menu();
  }

  if( $('.window_pop_close_btn').length )
  {
    $(document).on('click', '.window_pop_close_btn', function () {
      self.window.close();
    });
  }

  function visualWrapSlide()
  {
    var visual_wrap = $('.visual_wrap');
    var visualWrapSlideCount = parseInt( visual_wrap.find('.swiper-slide').length, 10 );
    var opt = '';

    if( visualWrapSlideCount > 1 )
    {
      opt = {
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 3000,
        },
        navigation: {
          nextEl: '.service_wrap .swiper-button-next',
          prevEl: '.service_wrap .swiper-button-prev',
        },
        pagination: {
          el: '.visual_wrap .swiper-pagination',
          clickable: true,
        }
      };
    }
    else
    {
      opt = {
        slidesPerView: 1,
        loop: false
      };
    }

    var visualWrapSlide = new Swiper('.visual_wrap', opt);
  }

  if( $('.visual_wrap').length )
  {
    visualWrapSlide();
  }
})();

function clickshow(elem, ID) {
  var menu = document.getElementById(ID);
  if (elem.id != 'closed') {
    elem.id = 'closed';
    menu.className = "closed";
  } else {
    elem.id = 'opened';
    menu.className = "opened";
  }
}

// 팝업존
(function () {
  var popupZoneSlideSetObj = '';
  var popupZoneSlideSetDelay = 200;

  function popupZoneSlide()
  {
    var popupzone = $('#popupzone');
    var swiperSlideCount = parseInt( popupzone.find('.swiper-slide').length );
    var opt = '';

    if( swiperSlideCount > 1 )
    {
      opt = {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: true,
        centeredSlides: true,
        loopFillGroupWithBlank: true,
        autoplay: {
          delay: 3000,
        },
        navigation: {
          nextEl: '#popupzone .swiper-button-next',
          prevEl: '#popupzone .swiper-button-prev',
        }
      };
    }
    else
    {
      opt = {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        centeredSlides: true,
        loopFillGroupWithBlank: true
      };

      popupzone.find('.pg_nav').removeClass('pc').hide();
    }

    var popupZoneSlide = new Swiper('#popupzone', opt);

    reloadSlide(popupZoneSlide, opt, opt);
  }

  function popupZoneSlideInit()
  {
    clearTimeout( popupZoneSlideSetObj );

    if( $('#popupzone').length )
    {
      popupZoneSlide();

      popupZoneInit();
    }
    else
    {
      popupZoneSlideSetObj = setTimeout(function() { popupZoneSlideInit(); }, popupZoneSlideSetDelay);
    }
  }

  function popupZoneInit() {
    var popupzone = $('#popupzone');
    var swiperSlide = popupzone.find('.swiper-slide');

    if( swiperSlide.length )
    {
      swiperSlide.each(function() {
        var obj = $(this);
        var a = obj.find('a');
        var img = a.find('img');
        var imgSrc = img.attr('src');

        a.css({
          'background-image': 'url(' + imgSrc + ')',
          'background-repeat': 'no-repeat',
          'background-position-x': 'center',
          'background-position-y': 'center',
          'background-size': 'cover'
        });

        img.css('opacity', '0');
      });
    }
  }

  $(document).ready(function() {
    popupZoneSlideSetObj = setTimeout(function() { popupZoneSlideInit(); }, popupZoneSlideSetDelay);
  });
})(window);

// 메인 비쥬얼 배너 PC 버전
// 팝업존 PC 버전
(function () {
  function visualWrapInit() {
    var visual_wrap = $('.visual_wrap');
    var bg_img = visual_wrap.find('.bg_img');

    if( bg_img.length )
    {
      bg_img.each(function() {
        var obj = $(this);

        var pc_tablet = obj.find('.pc_tablet');

        var imgSrc = pc_tablet.attr('src');

        obj.css({
          'background-image': 'url(' + imgSrc + ')',
          'background-repeat': 'no-repeat',
          'background-position-x': '50%',
          'background-position-y': '0px',
          'background-size': 'cover'
        });

        pc_tablet.css('opacity', '0');
      });
    }
  }

  function prdListVisualWrapInit() {
    var prdList_visual_wrap = $('.prdList_visual_wrap');
    var bg_img = prdList_visual_wrap.find('.bg_img');

    if( bg_img.length )
    {
      bg_img.each(function() {
        var obj = $(this);

        var pc_tablet = obj.find('.pc_tablet');

        var imgSrc = pc_tablet.attr('src');

        obj.css({
          'background-image': 'url(' + imgSrc + ')',
          'background-repeat': 'no-repeat',
          'background-position-x': '50%',
          'background-position-y': '0px',
          'background-size': 'cover'
        });

        pc_tablet.css('opacity', '0');
      });
    }
  }

  $(document).ready(function() {
    if( $('.visual_wrap').length )
    {
      visualWrapInit();
    }

    if( $('.prdList_visual_wrap').length )
    {
      prdListVisualWrapInit();
    }
  });
})(window);

// 마이페이지 SNB HEIGHT 동기화
(function () {
  function mpgWrapHeightSyncSnb() {
    var sidebar = $('.sidebar');
    var snb = $('.snb');

    var sidebarHeight = parseInt( sidebar.outerHeight(true), 10 );
    var snbHeight = parseInt( snb.outerHeight(true), 10 );

    console.log( sidebarHeight + '__' + snbHeight );

    if( snbHeight > sidebarHeight )
    {
      sidebar.css('min-height', snbHeight + 'px');
    }

  }

  if( $('.cont_wrap.sidebar').length )
  {
    mpgWrapHeightSyncSnb();
  }
})(window);