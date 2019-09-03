// GNB
var setGnb = function() {
    var $gnb, chkGnb;

    $('.gnb_item .link_item').on('mouseenter focusin', function() {
        $gnb = $(this).closest('.gnb_wrap');
        chkGnb = $gnb.attr('data-gnb');

        $('.gnb_item .link_item').removeClass('on');
        $(this).addClass('on');
        gnbBar(true, $(this));
        moveSnbBg($(this));
        if ($(this).hasClass('js_center')) {
            $("[data-snb=" + chkGnb + "]").hide();
            $('.center_list_wrap').stop().slideDown(400);
        } else {
            $('.center_list_wrap').hide();
            $("[data-snb=" + chkGnb + "]").stop().slideDown(400);
        }
        
    });
    $('#header').on('mouseleave focusout', function() {
        $('.gnb_item .link_item').removeClass('on');
        $("[data-snb=" + chkGnb + "]").stop().slideUp(400);
        $('.center_list_wrap').stop().slideUp(400);
        gnbBar(false);
    });

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
        var move = idx * width + 315;

        $('.sub_gnb_bg').css('left', move);
    }
    function toggleGnb() {
        $('.btn_toggle').on('click', function() {
            $('.sub_gnb_wrap, .center_list_wrap').stop().slideUp(400);
            if ($(this).hasClass('on')) {
                $('.toggle_gnb').removeClass('on');
            } else {
                setTimeout(function(){
                    $('.toggle_gnb').addClass('on');
                },400);
            }
            $(this).toggleClass('on');
            $('.toggle_item').toggleClass('active');
            
        });
    }
    toggleGnb();
}

// MOBILE GNB
var mobileGnb = function () {
    $('.btn_toggler').on('click', function () {
        $(this).toggleClass('open');
        $('.mobile_gnb').toggleClass('open');
        $('body').toggleClass('open');
    });

    $('.mobile_gnb dt a').on('click', function () {
        $(this).closest('dt').toggleClass('on');
        $(this).closest('dl').find('dd').slideToggle();
    });
};


// TypeB Main page JS
$(document).ready(function () {
    setGnb();

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



