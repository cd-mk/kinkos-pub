// 브라우저별 스크롤바 넓이
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

// clickshow 개발 수정
function clickshow(elem, ID) {
  var menu = document.getElementById(ID);
  var param;
  if (elem.id != 'closed') {
    elem.id = 'closed';
    menu.className = "closed";
    param = "closed";
  } else {
    elem.id = 'opened';
    menu.className = "opened";
    param = "opened";
  }
  $.ajax({
    url         : "/front/common/popupZoneYn.ajax",
    data        : {param : param},
    type        : "post",
    async: false,
    success: function (data) {
    },
    error: function (res) {
      alert(res.responseText)
    }
  });
}

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

// GNB
var setGnb = function () {
  if ($("#wrap").is(".company") === true) {
    $(".gnb_wrap").addClass("company");
  }

  if ($("#wrap").is(".mall") === true) {
    $(".gnb_wrap").addClass("mall");
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

      // 개발 추가
//      var	center_latitude2 ='126.8825167';
//      var	center_longitude2 ='37.4799034';
//      var	center_operating_hour2 ='월 ~ 일 24시간';
//      var	center_service_name2 ='즉석스티커 가능센터';
//      var	center_name2 ='가산디지털단지센터';
//      initMap2(center_latitude2,center_longitude2,center_name2,center_operating_hour2,center_service_name2);

      // 개발 추가
      var center = $('.locat_list > #map1');
      var center_id = center.attr('id');
      var center_name = center.attr('name');
      var center_latitude = center.attr('latitude');
      var center_longitude = center.attr('longitude');
      var center_operating_hour = center.attr('operating_hour');
      var center_service_name = center.attr('service_name');
      initMap2(center_latitude, center_longitude, center_name, center_operating_hour, center_service_name);

      // 개발 추가
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

      if($gnbWrap.hasClass('comp')){
        return false;
      }

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
  if( $('.file_inp').length ) {
    $('.file_inp').each(function () {
      $(this).on('change', function () {
        var filename = window.FileReader ? $(this)[0].files[0].name : $(this).val().split('/').pop().split('\\').pop();
        var dupChkFile = false;
        var files = this.files;
        var url = document.location.href;

        // 파일체크 (크기, 확장자)
        if(!dupChkFile) {
          for(var i = 0; i < files.length; i++){
            var lang = '';
            if(url.indexOf("enPageHTO") > 0) {
              lang = 'eng';
            }
            if(isNotUploadFile(files[i], lang)){
              dupChkFile = true;
              break;
            }
          }
        }

        if(!dupChkFile) {
          if($(".js-file-name").length) {
            $(".js-file-name").each(function () {
              if(filename == $(this).val()) {
                dupChkFile = true;

                if(url.indexOf("enPageHTO") > 0) {
                  alert("A file with the same name already exists.");
                } else {
                  alert("같은 이름의 파일이 이미 있습니다.");
                }

                return false;
              }
            });
          }
        }

        if(dupChkFile) {
          $(this).val('');
          $(this).siblings('.js-file-name').val(''); //.attr('disabled', true);
          $(this).siblings('.js-file-label').removeClass('hide');
          $(this).siblings('.js-file-del').removeClass('on');
        }else{
          $(this).siblings('.js-file-name').val(filename); //.attr('disabled', true);
          $(this).siblings('.js-file-label').addClass('hide');
          $(this).siblings('.js-file-del').addClass('on');
        }
      });
    });
  }

  if( $('.js-file-label').length ) {
    $(document).on('click', '.js-file-label', function () {
      $(this).siblings('.file_inp').trigger('click');
    });
  }

  if( $('.js-file-del').length ) {
    $(document).on('click', '.js-file-del', function () {
      $(this).siblings('.js-file-name').val('');
      $(this).siblings('.file_inp').val('');
      $(this).siblings('.js-file-label').removeClass('hide');
      $(this).removeClass('on');
    });
  }
};

var setCustomList = function () {
  var setListRemove = function() {
    $('.js-list-del').on('click', function () {
      $(this).closest('.file_inp_box').remove();
    });
  };

  if( $('.js-list-add').length ) {
    $(document).on('click', '.js-list-add', function () {
      var listClone = $(this).closest('.file_inp_box').clone(true);

      listClone.find('.js-file-label').removeClass('hide');
      listClone.find('.js-file-del').removeClass('on');
      listClone.find('input').val('');
      listClone.find('.status').text('');
      listClone.find('.js-list-add').off('click').removeClass('js-list-add plus').addClass('js-list-del minus');
      $(this).closest('.js-list-item').append(listClone);
      setListRemove();
    });
  }
};

// DatePicker
var setDatePicker = function () {
  if( $('.inp_date').length ) {
    $.datepicker.setDefaults({
      dateFormat: 'yy-mm-dd',
      dayNames: ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'],
      dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
      monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
      monthNamesShort: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12']
    });

    $('.inp_date').datepicker();
  }
};

// accordian 변경 예정
//var setAccordian = function () {
//  var toggleContent = function() {
//    $(this).closest('.accor_item').toggleClass('active');
//  };
//
//  if( $('.accor_title').length ) {
////    $(document).on('click', '.accor_title label', toggleContent);
//    $(document).on('click', '.accor_title .txt_title', toggleContent);
//    $(document).on('click', '.accor_title .accor_toggle_btn', function(e) {
//      e.preventDefault();
//
//      $(this).closest('.accor_item').toggleClass('active');
//    });
//  }
//};

// accordian
//$(document).on('click', '.accor_title label', function(e){
//	e.preventDefault();
//	console.log('label');
//	$(this).closest('.accor_item').toggleClass('active');
//});
$(document).on('click', '.accor_title .txt_title', function(e){
//	e.preventDefault();
  console.log('txt_title');
  $(this).closest('.accor_item').toggleClass('active');
});
$(document).on('click', '.accor_title .accor_toggle_btn', function(e) {
  e.preventDefault();
  console.log('accor_toggle_btn');
  $(this).closest('.accor_item').toggleClass('active');
});

// name으로 그룹핑된 체크박스 전체 체크 기능
var setChkAll = function () {
  if( $('.inp_chk_all').length ) {
    $(document).on('change', '.inp_chk_all', function () {
      var name = $(this).attr('name');
      $("input[name=" + name + "]").prop('checked', $(this).prop('checked'));
    });
  }

  if( $('.inp_chk_del').length ) {
    $(document).on('click', '.inp_chk_del', function () {
      $('input[type=checkbox]').prop('checked', false);
    });
  }
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
  if( $('.btn_popup').length ) {
    $('.btn_popup').on('click', function (e) {
      var obj = $(this);
      var targetType = obj.attr('data-target-type');

      if( targetType === 'window_popup' ) {
        e.preventDefault();

        var href = obj.attr('href');
        var windowPopupWidth = obj.attr('data-window-width');
        var windowPopupHeight = obj.attr('data-window-height');
        var windowPopup = window.open(href, 'windowPopup', 'width=' + windowPopupWidth + ',height=' + windowPopupHeight + ',resizable=1,scrollbars=1');
      } else {
        var popupTarget = $(this).attr('href');
        if(popupTarget.indexOf('#') == 0){
          var popupTargetObj = $(popupTarget);

          if( popupTargetObj.length ) {
            $('body').addClass('open');
            popupTargetObj.addClass('active');

            popupSizeInit( popupTargetObj );

            if( !$('.dim_layer').length ) {
              $('#content').append('<div class="dim_layer"></div>');
            }

            $('.dim_layer').show();
          }
        }
      }
    });
  }

  if( $('.btn_pop_close').length ) {
    $('.btn_pop_close').on('click', function () {
      $('body').removeClass('open');

      var popup = $(this).closest('.popup_wrap');
      popup.find('.inner').css({'height': '', 'overflow-y': ''});

      $(this).closest('.popup_wrap').removeClass('active');
      $('.dim_layer').hide();
    });
  }

  if( $('.btn_pop_close_btn') ) {
    $('.btn_pop_close_btn').on('click', function () {
      $('body').removeClass('open');

      var popup = $(this).closest('.popup_wrap');
      popup.find('.inner').css({'height': '', 'overflow-y': ''});

      popup.removeClass('active');
      $('.dim_layer').hide();
    });
  }

  $(window).on('resize', function() {
    clearTimeout( popupSizeSetObj );

    var popupActiveObj = $('.popup_wrap.active');

    if( popupActiveObj.length ) {
      popupSizeSetObj = setTimeout(function() {
        popupSizeInit( popupActiveObj );
      }, popupSizeSetDelay);
    }
  });
};

// faq tab
var setFaqTab = function () {
  if( $('.faq_tab_nav').length ) {
    $('.faq_tab_nav ul > li').on('click', function () {
      var idx = $(this).index();

      $('.faq_tab_nav ul > li').removeClass('on');
      $(this).addClass('on');

      $('.faq_tab_con .accor_wrap').removeClass('active');
      $('.faq_tab_con .accor_wrap').eq(idx).addClass('active');
    });
  }
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

$(function () {
  // TypeB Main page JS
  $(document).ready(function () {
    setGnb();
    mobileGnb();
    new WOW().init();
    setFaqTab();
    mobileSetFaqTab();

    // placeholder
    $('input, textarea').placeholder();

    if( $('.inp_date').length ) {
      setDatePicker();
    }

    if( $('.btn_popup').length ) {
      setPopup();
    }

    if( $('.inp_chk_all').length ) {
      setChkAll();
    }

//    if( $('.accor_wrap').length ) {
//      setAccordian();
//    }

    if( $('.file_inp').length ) {
      setInputFile();
    }

    if( $('.js-list-add').length ) {
      setCustomList();
    }

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
  });

  //tab
  tab('#tab', 0);
  tab('#tab1', 0);

  // mobile
  $('.btn_menu').on('click', function () {
    $('.menu').addClass('open');
    $('body').css('overflow', 'hidden');
  });

  $('.btn_close').on('click', function () {
    $('.menu').removeClass('open');
    $('body').css('overflow', 'auto');
  });

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

  // search MOBILE
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

  function mo_sub_type_menu() {
    var btnObj = $('.btn_mo_sub_type');
    var parentObj = btnObj.closest('div[class*="sub_type"]');
    var parentLi = $('div[class*="sub_type"] ul li a');

    if( parentObj.length ) {
      var targetObj = parentObj.find('>ul');

      if( targetObj.length ) {
        btnObj.on('click', function() {
          targetObj.toggleClass('active');
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

  if( $('.btn_mo_sub_type').length ) {
    mo_sub_type_menu();
  }

  if( $('.window_pop_close_btn').length ) {
    $(document).on('click', '.window_pop_close_btn', function () {
      self.window.close();
    });
  }

  function visualWrapSlide( className ) {
    var visual_wrap = $( className );
    var visualWrapSlideCount = parseInt( visual_wrap.find('.swiper-slide').length, 10 );
    var opt = '';

    if( visualWrapSlideCount > 1 ) {
      opt = {
        slidesPerView: 1,
        loop: true,
        autoplay: {
          delay: 3000,
        },
        navigation: {
          nextEl: className + ' .swiper-button-next',
          prevEl: className + ' .swiper-button-prev',
        },
        pagination: {
          el: className + ' .swiper-pagination',
          clickable: true,
        }
      };
    } else {
      opt = {
        slidesPerView: 1,
        loop: false
      };
    }

    var visualWrapSlide = new Swiper(className, opt);

    visualImageObjectFitForIE( className );
    visualWrapInit( className );
  }

  function visualImageObjectFitForIE( className ) {
    var visual_wrap = $( className );

    if( visual_wrap.length ) {
      var bg_img = visual_wrap.find('.bg_img');

      if( bg_img.length ) {
        bg_img.each(function() {
          var obj = $(this);
          var mobile_image = obj.find('.mo_only');
          if( mobile_image.length ) {
            var mobile_image_src = mobile_image.attr('src');

            if( mobile_image_src ) {
              var mobile_image_div = $('<div class="mo_object_fit_image"></div>');
              mobile_image_div.css('background-image', 'url(' + mobile_image_src + ')');

              obj.parent().append( mobile_image_div );
            }
          }
        });
      }
    }
  }

  function visualWrapInit( className ) {
    var visual_wrap = $( className );
    var bg_img = visual_wrap.find('.bg_img');

    if( bg_img.length ) {
      bg_img.each(function() {
        var obj = $(this);

        var pc_tablet = obj.find('.pc_tablet');
        var mo_only = obj.find('.mo_only');

        var imgSrc = pc_tablet.attr('src');

        obj.css({
          'background-image': 'url(' + imgSrc + ')',
          'background-repeat': 'no-repeat',
          'background-position-x': '50%',
          'background-position-y': '0px',
          'background-size': 'cover'
        });

        pc_tablet.css('opacity', '0');
        mo_only.css('opacity', '0');
      });
    }
  }

  if( $('.visual_wrap').length ) {
    visualWrapSlide('.visual_wrap');
  }

  if( $('.prdList_visual_wrap').length ) {
    visualWrapSlide('.prdList_visual_wrap');
  }

  // 팝업존
  var popupZoneSlideSetObj = '';
  var popupZoneSlideSetDelay = 200;

  function popupZoneSlide() {
    var popupzone = $('#popupzone');
    var swiperSlideCount = parseInt( popupzone.find('.swiper-slide').length );
    var opt = '';

    if( swiperSlideCount > 1 ) {
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

      popupzone.find('.pg_nav').addClass('show');
    } else {
      opt = {
        slidesPerView: 1,
        spaceBetween: 0,
        loop: false,
        centeredSlides: true,
        loopFillGroupWithBlank: true
      };
    }

    var popupZoneSlide = new Swiper('#popupzone', opt);

    reloadSlide(popupZoneSlide, opt, opt);
  }

  function popupZoneSlideInit() {
    clearTimeout( popupZoneSlideSetObj );

    if( $('#popupzone').length ) {
      popupZoneSlide();

      popupZoneInit();
    } else {
      popupZoneSlideSetObj = setTimeout(function() { popupZoneSlideInit(); }, popupZoneSlideSetDelay);
    }
  }

  function popupZoneInit() {
    var popupzone = $('#popupzone');
    var swiperSlide = popupzone.find('.swiper-slide');

    if( swiperSlide.length ) {
      swiperSlide.each(function() {
        var obj = $(this);
        var a = obj.find('a');
        var img = a.find('img');
        var imgSrc = img.attr('src');

        a.css('background-image', 'url(' + imgSrc + ')');
      });
    }
  }

  $(document).ready(function() {
    popupZoneSlideSetObj = setTimeout(function() { popupZoneSlideInit(); }, popupZoneSlideSetDelay);
  });

  // 마이페이지 SNB HEIGHT 동기화
  function mpgWrapHeightSyncSnb() {
    var sidebar = $('.sidebar');
    var snb = $('.snb');

    var sidebarHeight = parseInt( sidebar.outerHeight(true), 10 );
    var snbHeight = parseInt( snb.outerHeight(true), 10 );

    if( snbHeight > sidebarHeight ) {
      sidebar.css('min-height', snbHeight + 'px');
    }
  }

  if( $('.cont_wrap.sidebar').length ) {
    mpgWrapHeightSyncSnb();
  }

  var scrollTopFunc = function() {
    var setObj = '';
    var setDelay = 20;

    var setFunc = function() {
      var scrollTop = $('#scroll-top');
      var winScrollTop = parseInt( $(window).scrollTop(), 10 );

      if( winScrollTop > 100) {
        scrollTop.fadeIn();
      } else {
        scrollTop.fadeOut();
      }
    };

    if(! $('#scroll-top').length ) {
      $('body').append('<div id="scroll-top"><a href="#top">Scroll to Top</a></div>');
    }

    $(window).on('scroll', function () {
      clearTimeout( setObj );

      var winWidth = parseInt( window.innerWidth, 10 );

      if( winWidth > 980 ) {
        setObj = setTimeout(function() { setFunc(); }, setDelay);
      }
    });
  };

  // @2020.04.14 SCROLL TOP 추가
  $(document).ready(function() {
    if( $('.gnb_wrap.comp').length ) {
      scrollTopFunc();

      var scrollTopSetObj = '';
      var scrollTopSetDelay = 50;

      var scrollTopInit = function() {
        if( $('.quick_menu').length ) {
          var quickMenu = $('.quick_menu');
          var quickMenuOffset = quickMenu.offset();
          var quickMenuHeight = parseInt( quickMenu.outerHeight( true ), 10 );
          var quickMenuBottom = parseInt( quickMenuOffset.top, 10 ) + quickMenuHeight;

          var scrollTopObj = $('#scroll-top');
          var scrollTopObjOffset = scrollTopObj.offset();
          var scrollTopObjTop = parseInt( scrollTopObjOffset.top, 10 );

          var quickMenuPositionTop = 0;
          var quickMenuPositionBottom = 0;
          var winHeight = parseInt( window.innerHeight, 10 );;
          var calcScrollTopObjBottom = 0;

          if( 740 < winHeight ) {
            scrollTopObj.css({
              'bottom': '',
              'right': ''
            });
          } else {
            quickMenuPositionTop = parseInt( quickMenu.position().top, 10 );
            quickMenuPositionBottom = quickMenuPositionTop + quickMenuHeight;
            calcScrollTopObjBottom = ( winHeight - quickMenuPositionBottom ) - 50;

            scrollTopObj.css({
              'bottom': calcScrollTopObjBottom + 'px',
              'right': ''
            });
          }
        }
      };

      $(window).on('resize', function() {
        clearTimeout( scrollTopSetObj );

        scrollTopSetObj = setTimeout(function() { scrollTopInit(); }, scrollTopSetDelay);
      });

      scrollTopSetObj = setTimeout(function() { scrollTopInit(); }, scrollTopSetDelay);

      $('#scroll-top a').on('click', function(e) {
        $('body,html').animate({
          scrollTop: 0
        }, 300);
        return false;
      });
    }
  });
  // //@2020.04.14 SCROLL TOP 추가

  // @2020.05.17 모바일 사업자 정보 보기 추가
  $(document).ready(function() {
    if( $('.business_information_btn').length ) {
      $(document).on('click', '.business_information_btn', function(e) {
        e.preventDefault();

        $(this).toggleClass('active');
        $('.footer_business_information').toggleClass('active');
      });
    }
  });
  // //@2020.05.17 모바일 사업자 정보 보기 추가

  // @2020-06-11 SNB 상품배너 없을경우 2차메뉴 width 최대화
  function snbWidthInit() {
    var snbWrap = $('.sub_gnb_wrap.mall');
    var inner = snbWrap.find('.inner');
    var pdtBanner = snbWrap.find('.pdt_banner');
    var pdtBannerHtml = pdtBanner.html();

    if( pdtBannerHtml ) {
      pdtBannerHtml = pdtBannerHtml.replace(/(\s*)/g, "");
    } else {
      inner.css('padding-right', '60px');
    }
  }

  $(document).ready(function() {
    if( $('#wrap').hasClass('mall') ) {
      snbWidthInit();
    }
  });
  // //@2020-06-11 SNB 상품배너 없을경우 2차메뉴 width 최대화

  // @2020-07-23 퀵메뉴 TOP 버튼 추가
  $(document).ready(function() {
    if( $('.quick_menu_top').length ) {
      $('.quick_menu_top').on('click', function(e) {
        e.preventDefault();

        $('body,html').animate({scrollTop: 0}, 300);
      });
    }
  });
  // //@2020-07-23 퀵메뉴 TOP 버튼 추가
});