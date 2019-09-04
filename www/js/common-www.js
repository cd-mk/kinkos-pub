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
        $('.mo_gnb_wrap').addClass('active');
    });
    $('.mo_gnb_wrap .btn_close').on('click', function() {
        $('.mo_gnb_wrap').removeClass('active');
    });
    $('.menu_item .title').on('click', function() {
        $('.menu_item .menu_list').stop().slideUp(300);
        $(this).next('.menu_list').stop().slideDown(300);
    });
};


// TypeB Main page JS
$(document).ready(function () {
    setGnb();
    mobileGnb();
    new WOW().init();

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



