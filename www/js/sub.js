
function slideInit() {
  var isMobile = chkViewport();


  // 디지털출력 복사
  if( $('.service_info_view').length )
  {
    $('.service_info_view').each(function(idx) {
      var obj = $(this);
      var opt = {
        slidesPerView: 'auto',
        spaceBetween: 30,
        speed: 500,
        loop: false,
        grabCursor: false,
        navigation: {
          nextEl: obj.find('.swiper-button-next'),
          prevEl: obj.find('.swiper-button-prev')
        },
        scrollbar: {
          el: obj.find('.swiper-scrollbar'),
          hide: false
        },
        pagination: {
          el: obj.find('.swiper-pagination'),
          type: 'fraction'
        }
      };

      var servicePdt = new Swiper(obj, opt);

      var itemObj = obj.closest('.item_list');
      var toggleBtn = itemObj.find('.toggle_view');
      if( toggleBtn.length )
      {
        toggleBtn.on('click', function() {
          var toggle = $(this);

          setTimeout(function() {
            if( toggle.hasClass('on') )
            {
              servicePdt.destroy(true, true);

              servicePdt = new Swiper(obj, opt);
            }
          }, 10);
        });
      }
    });
  }

  //상품 리스트 슬라이드
  var pcPtList = {
    roundLengths: false,
    slidesPerView: 'auto',
    spaceBetween: 30,
    speed: 500,
    loop: false,
    grabCursor: true,
    navigation: {
      nextEl: '.product_list_wrap .swiper-button-next',
      prevEl: '.product_list_wrap .swiper-button-prev',
    },
    scrollbar: {
      el: '.product_list_wrap .swiper-scrollbar',
      hide: false,
    },
    pagination: {
      el: '.product_list_wrap .swiper-pagination',
      type: 'fraction',
    }
  };
  var moPtList = {
    slidesPerView: 'auto',
    spaceBetween: 15,
    speed: 500,
    grabCursor: true,
    navigation: {
      nextEl: '.product_list_wrap .swiper-button-next',
      prevEl: '.product_list_wrap .swiper-button-prev',
    },
    scrollbar: {
      el: '.product_list_wrap .swiper-scrollbar',
      hide: false,
    },
    pagination: {
      el: '.product_list_wrap .swiper-pagination',
      type: 'fraction',
    }
  };
  var ptList = isMobile
      ? new Swiper('.product_list_wrap .product_list', moPtList)
      : new Swiper('.product_list_wrap .product_list', pcPtList);

  //reloadSlide(speedSlide, pcPtList, moPtList);

  var detailThumb = new Swiper('.pdt_thumbs .inner', {
    slidesPerView: 'auto',
    spaceBetween: 15,
    navigation: {
      nextEl: '.pdt_thumbs .swiper-button-next',
      prevEl: '.pdt_thumbs .swiper-button-prev',
    },
  });
  var detailPhoto = new Swiper('.photo_box', {
    slidesPerView: 1,
    thumbs: {
      swiper: detailThumb
    }
  });
}

$(window).on('load', function() {
  slideInit();
});

$(document).ready(function() {
  //slideInit();
});

// layer popup
var toggleV = function () {
  $(".toggle_view").on('click', function () {
    $(this).parents(".item_list").toggleClass("on");
    $(this).toggleClass("on");
  });
};

// 상품상세 리뷰
var toggleReview = function () {
  $(".review_item").click(function () {
    $(this).toggleClass("review_view");
  });
};

function mallSubPageTitle( title )
{
  if( title )
  {
    var setObj = '';
    var setDelay = 200;

    var setFunc = function(title) {
      clearTimeout( setObj );

      var targetObj = $('.nav.mall .btn_back');
      if( targetObj.length )
      {
        targetObj.html( title );
      }
      else
      {
        setObj = setTimeout(function() { setFunc(title); }, setDelay);
      }
    };

    var targetObj = $('.nav.mall .btn_back');
    if( targetObj.length )
    {
      targetObj.html( title );
    }
    else
    {
      setObj = setTimeout(function() { setFunc(title); }, setDelay);
    }
  }
}

function callCalendar( obj )
{
    if( obj )
    {
        var callback = obj.attr('data-callback');
        var minViewMode = obj.attr('data-min-view-mode') ? obj.attr('data-min-view-mode') : 0;
        var maxViewMode = obj.attr('data-max-view-mode') ? obj.attr('data-max-view-mode') : 0;

        obj.datepicker({
          format: 'yyyy-mm-dd',
          container: 'body',
          orientation: 'bottom left',
          autoclose: true,
          toggleActive: true,
          language: 'ko',
          todayHighlight: true,
          minViewMode: minViewMode,
        }).on('show', {type: 'default'}, function(e) {
          var data = e.data;
          if( data )
          {
            if( data.type === 'default' )
            {
              $('body').addClass('calendarDefault');
            }
          }
        }).on('changeDate', {callback: callback}, function(e) {
          var data = e.data;
          if( data )
          {
            var getDate = new Date( e.date );
            var selectDate = {
              'year': parseInt( getDate.getFullYear(), 10 ),
              'month': parseInt( getDate.getMonth(), 10 ) + 1,
              'day': parseInt( getDate.getDate(), 10 )
            };

            var callback = data.callback;
            var callbackTypeOf = typeof(eval(callback));

            if( callbackTypeOf.toLowerCase() === 'function' )
            {
              eval(callback + '(' + selectDate.year + ',' + selectDate.month + ',' + selectDate.day + ')');
            }
          }
        });
    }
}

$(document).ready(function() {
  toggleV();

  toggleReview();

  if( $('.callCalendarBtn').length )
  {
      $('.callCalendarBtn').each(function() {
          var obj = $(this);

          callCalendar( obj );
      });
  }
});

(function($) {
  "use strict";

  $(function() {
    function init() {
      if( $('.page_tab').length )
      {
        $('.page_tab').each(function() {
          var obj = $(this);

          if( obj.is('[class*="sub_type"]') === false )
          {
            $(window).on('load', function() {
              pageTabInit( obj );
            });
          }
        });
      }

      if( $('.tab_area.anchor').length )
      {
        pageTabAnchorInit();
      }

      if( $('.question_tooltip').length )
      {
        $(document).on('click', function(e) {
          var obj = $(e.target);

          if( obj.hasClass('question_tooltip') )
          {
            e.preventDefault();

            questionTooltipToggle( obj );
          }
          else
          {
            var closeExec = questionTooltipHasClassSearch( obj );

            if( closeExec === 'Y' )
            {
              questionTooltipClose();
            }
          }
        });
      }

      if( $('.input-group.date').length )
      {
        datePickerInit();
      }
    }

    function pageTabInit( obj )
    {
      if( obj )
      {
        var eventBind = obj.attr('data-event-bind');
        if( eventBind !== 'Y' )
        {
          obj.attr('data-event-bind', 'Y').attr('data-first-offset-top', parseInt( obj.offset().top, 10 ));

          $(window).on('scroll', function() {
            var winWidth = parseInt( window.innerWidth, 10 );

            if( winWidth < 1025 )
            {
              var windowScrollTop = parseInt( $(window).scrollTop(), 10 );
              var objOffsetTop = parseInt( obj.attr('data-first-offset-top'), 10 );

              if( objOffsetTop < windowScrollTop )
              {
                obj.addClass('fixed');
              }
              else
              {
                obj.removeClass('fixed');
              }
            }
          });

          pageTabAnchorActiveFunc( obj );
        }
      }
    }

    function pageTabAnchorInit()
    {
      var tabArea = $('.tab_area');
      var pageTab = $('.anchor .page_tab');

      pageTab.attr('data-current-id', '1').find('#tab01').addClass('active');

      var pageTabItems = tabArea.find('.center_view_wrap .item_box');
      if( pageTabItems.length )
      {
        var pageTabItemCount = parseInt( pageTabItems.length, 10 );
        pageTab.attr('data-max-count', pageTabItemCount);

        pageTabItems.each(function(idx) {
          var currentObj = $(this);

          currentObj.attr('data-target', (idx+1));

          currentObj=null;
        });
      }

      var pageTabItemCalc = function() {
        var windowScrollTop = parseInt( $(window).scrollTop(), 10 );

        pageTabItems.each(function() {
          var currentObj = $(this);
          var currentObjTop = parseInt( currentObj.offset().top, 10 );
          var currentObjHeight = parseInt( currentObj.height(), 10 );
          var currentObjOuterHeight = parseInt( currentObj.outerHeight(true), 10 );
          var currentObjHeightCalc = currentObjOuterHeight > currentObjHeight ? currentObjOuterHeight - currentObjHeight : 0;
          var currentObjBottom = currentObjTop + (currentObjHeight - currentObjHeightCalc);

          if( windowScrollTop < currentObjBottom )
          {
            var prevTarget = pageTab.attr('data-current-id');
            var target = currentObj.attr('data-target');

            if( prevTarget !== target )
            {
              var targetObj = pageTab.find('#tab' + target);
              if( targetObj.length )
              {
                pageTab.attr('data-current-id', target).find('ul li').removeClass('active');
                targetObj.addClass('active');

                pageTabAnchorActiveFunc( pageTab );
              }

              targetObj=null;
            }

            prevTarget=null;
            target=null;

            return false;
          }

          currentObj=null;
          currentObjTop=null;
          currentObjHeight=null;
          currentObjOuterHeight=null;
          currentObjHeightCalc=null;
          currentObjBottom=null;
        });

        windowScrollTop=null;
      };

      $(window).scroll(function () {
        pageTabItemCalc();
      });
    }

    function pageTabAnchorActiveFunc( pageTab )
    {
      if( pageTab )
      {
        var pageTabAnchors = pageTab.find('ul li');
        var scrollSpeed = 200;

        if( pageTabAnchors.length )
        {
          pageTabAnchors.each(function() {
            var currentObj = $(this);

            if( currentObj.hasClass('active') === true )
            {
              var parentObj = currentObj.closest('ul');
              var windownWidth = parseInt( window.innerWidth, 10 );
              var currentObjWidth = parseInt( currentObj.outerWidth( true ), 10 );
              var currentObjPosition = currentObj.position();
              var currentObjLeft = parseInt( currentObjPosition.left, 10 );

              parentObj.stop();

              if( currentObjLeft < 1 )
              {
                currentObjLeft = Math.abs(currentObjLeft);
                var scrollLeft = parseInt( parentObj.scrollLeft(), 10 ) - currentObjLeft;

                parentObj.stop().animate({
                  'scrollLeft': scrollLeft + 'px'
                }, scrollSpeed);
              }
              else
              {
                var currentObjRight = currentObjWidth + currentObjLeft;
                if( currentObjRight > windownWidth ) {
                  var scrollLeft = currentObjWidth + (currentObjRight - windownWidth);

                  parentObj.stop().animate({
                    'scrollLeft': scrollLeft + 'px'
                  }, scrollSpeed);
                }
              }

              return false;
            }
          });
        }
      }
    }

    function questionTooltipToggle( obj )
    {
      if( obj )
      {
        var target = obj.attr('data-target');
        if( target )
        {
          var targetObj = $('#' + target);
          if( targetObj.length )
          {
            if( targetObj.hasClass('show') )
            {
              questionTooltipClose();
            }
            else
            {
              questionTooltipFunc( obj, targetObj );
            }
          }
        }
      }
    }

    function questionTooltipFunc( obj, targetObj )
    {
      if( obj && targetObj )
      {
        var objOffset = obj.offset();
        var objLeft = parseInt( objOffset.left, 10 );
        var objTop = parseInt( objOffset.top, 10 );
        var objHeight = parseInt( obj.outerHeight( true ), 10 );
        objTop = ( objTop + objHeight ) + 5;

        targetObj.addClass('show').css({
          'left': objLeft + 'px',
          'top': objTop + 'px',
        });
      }
    }

    function questionTooltipHasClassSearch( obj )
    {
      var closeExec = 'Y';

      if( obj )
      {
        var findClassArray = [
          'question_tooltip',
          'question_tooltip_layer_popup',
          'question_tooltip_layer_popup_content',
        ];

        findClassArray.some(function(findClass) {
          if( obj.hasClass( findClass ) )
          {
            closeExec = 'N';
            return closeExec;
          }
        });
      }

      return closeExec;
    }

    function questionTooltipClose()
    {
      $('.question_tooltip_layer_popup').removeClass('show');
    }

    function datePickerInit()
    {
      /*$('.input-daterange').datepicker({
        format: 'yyyy-mm-dd',
        container: 'body',
        orientation: 'bottom left',
        autoclose: true,
        toggleActive: true,
        language: 'ko',
        todayHighlight: true,
        beforeShowMonth: function(date){
          if (date.getMonth() == 8) {
            return false;
          }
        }
      });*/

      $('.input-group.date').each(function() {
        var obj = $(this);

        obj.datepicker({
          format: 'yyyy-mm-dd',
          container: 'body',
          orientation: 'bottom left',
          autoclose: true,
          toggleActive: true,
          language: 'ko',
          todayHighlight: true,
        });
      });
    }

    $(document).ready(function() {
      init();
    });
  });
})(jQuery);



