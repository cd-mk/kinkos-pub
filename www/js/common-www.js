// GNB
var setGnb = function () {
    $('.gnb_list > li > a').on('mouseenter', function () {
        var idx = $(this).parent().index();

        $('.gnb_list > li > a').removeClass('on');
        $(this).addClass('on');
        $('.gnb_drop').stop().slideDown(500);
        $('.dim').show();

        if (idx !== 4) {
            var left = 500;
            var width = 226;
            var move = idx * width;

            $('.gnb_drop_item').show();
            $('.location_item').hide();

            $('.point').css('left', left + move + 'px');
        } else {
            $('.gnb_drop_item').hide();
            $('.location_item').show();
        }
    });

    $('.lnb').on('mouseenter', function () {
        $('.gnb_list > li > a').removeClass('on');
        $('.gnb_drop').stop().slideUp(500);
        $('.dim').hide();
    });
    $('#header').on('mouseleave', function () {
        $('.gnb_list > li > a').removeClass('on');
        $('.gnb_drop').stop().slideUp(500);
        $('.dim').hide();
    });

    $('.gnb_links > li > a').on('mouseenter', function () {
        $('.gnb_links > li > a').addClass('not_on');
        $(this).removeClass('not_on');
        $(this).addClass('on');
    });

    // gnb toggle

    $('.btn_gnbtoggle').on('click', function () {
        $(this).toggleClass('open');
        $(this).closest('.company_gnb').toggleClass('active');
        $('.gnb_drop').stop().slideUp(500);

        if ($('.company_gnb').hasClass('active')) {
            showMainGnb();
        } else {
            $('.gnb_links').removeClass('on');
        }
    });
    function showMainGnb() {
        setTimeout(function () {
            $('.gnb_links').addClass('on');
        }, 400);
    }

};

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




    //임시 header, footer영역 로드
    $("#header").load("./include/common.html header", function () {
        // header 로드 후 header 관련 function 실행
        setGnb();
        mobileGnb();
    });
    $("#footer").load("./include/common.html .footer_inner", function () {
    });
});



