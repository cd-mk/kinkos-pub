// TypeB Main page JS
$(document).ready(function () {
    new WOW().init();

    // gnb toggle
    (function () {
        $('.btn_gnbtoggle').on('click', function () {
            $(this).toggleClass('open');
            $(this).closest('.company_gnb').toggleClass('active');
            $('.sub_gnb').stop().slideUp(500);

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
    })();

    (function() {
        $('.gnb > li > a').on('mouseenter', function() {
            var idx = $(this).parent().index();

            $('.gnb > li > a').removeClass('on');
            $(this).addClass('on');
            $('.sub_gnb').stop().slideDown(500);
            $('.dim').show();

            if (idx !== 4) {
                var left = 500;
                var width = 226;
                var move = idx * width;

                $('.sub_gnb_item').show();
                $('.location_item').hide();

                $('.point').css('left', left + move + 'px');
            } else {
                $('.sub_gnb_item').hide();
                $('.location_item').show();
            }
        });

        $('.header_top').on('mouseenter', function() {
            $('.gnb > li > a').removeClass('on');
            $('.sub_gnb').stop().slideUp(500);
            $('.dim').hide();
        });
        $('#header').on('mouseleave', function() {
            $('.gnb > li > a').removeClass('on');
            $('.sub_gnb').stop().slideUp(500);
            $('.dim').hide();
        });

        $('.gnb_links > li > a').on('mouseenter', function() {
            $('.gnb_links > li > a').addClass('not_on');
            $(this).removeClass('not_on');
            $(this).addClass('on');
        });
    })();

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
});