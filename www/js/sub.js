
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

  //상품 리스트 슬라이드
  var ptList = new Swiper('.product_list', {
    roundLengths: true,
    spaceBetween: 30,
    // clickable: true,
    // allowTouchMove: true,
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


} 
$(document).ready(slideInit());


// layer popup
var toggleV = function () {
  $(".toggle_view").click(function () {
    $(this).parents(".item_list").toggleClass("on");
    $(this).toggleClass("on");
  });
}
toggleV();

// 상품상세 리뷰
var toggleReview = function () {
  $(".review_item").click(function () {
    $(this).toggleClass("review_view");
  });
}
toggleReview();

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
            pageTabInit( obj );
          }
        });
      }

      if( $('.tab_area.anchor').length )
      {
        pageTabAnchorInit();
      }
    }

    function pageTabInit( obj ) {
      if( obj )
      {
        var objOffset = obj.offset();
        var objOffsetTop = parseInt( objOffset.top, 10 );

        var eventBind = obj.attr('data-event-bind');
        if( eventBind !== 'Y' )
        {
          obj.attr('data-event-bind', 'Y');

          $(window).on('scroll', function() {
            var windowScrollTop = parseInt( $(window).scrollTop(), 10 );

            if( objOffsetTop < windowScrollTop )
            {
              obj.addClass('fixed');
            }
            else
            {
              obj.removeClass('fixed');
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

    function pageTabAnchorActiveFunc( pageTab ) {
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

    $(document).ready(function() {
      init();
    });
  });
})(jQuery);



