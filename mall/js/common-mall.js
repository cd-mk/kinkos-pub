// TypeB Mall page JS

// GNB
var setGnb = function () {
    (function () {
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
    })();

    // sub gnb show / hide
    (function () {
        $('.gnb_list > li > a').on('mouseenter', function () {
            var idx = $(this).parent().index();

            $('.gnb_list > li > a').removeClass('on');
            $('.gnb_list > li > a').addClass('not_on');
            $(this).removeClass('not_on').addClass('on');

            if (idx === 6) {
                $('.gnb_drop_item').hide();
                $('.location_item').show();
                $('.gnb_drop').stop().slideDown(500);
                $('.dim').show();
            } else {
                $('.gnb_drop_item').show();
                $('.location_item').hide();
                $('.gnb_drop').stop().slideDown(500);
                $('.dim').show();
            }
        });
        $('#header').on('mouseleave', function () {
            $('.gnb_list > li > a').removeClass('on');
            $('.gnb_list > li > a').removeClass('not_on');
            $('.gnb_drop').stop().slideUp(500);
            $('.dim').hide();
        });
        $('.lnb').on('mouseenter', function () {
            $('.gnb_list > li > a').removeClass('on');
            $('.gnb_list > li > a').removeClass('not_on');
            $('.gnb_drop').stop().slideUp(500);
            $('.dim').hide();

        });
    })();
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

(function () {
    $('.banner_item').on('mouseenter', function () {
        $(this).find('.txt').addClass('move');
    });
    $('.banner_item').on('mouseleave', function () {
        $(this).find('.txt').removeClass('move');
    });
})();

// main slide
var mainSlide = new Swiper('.main_slide', {
    effect: 'fade',
    speed: 500,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
    },
});
var speedSlide = new Swiper('.speed_slide', {
    slidesPerView: 3,
    spaceBetween: 30,
    speed: 500,
    loop: true,
    grabCursor: true,
    centeredSlides: true,
    initialSlide: 1,
    navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
    }
});
var consultSlide = new Swiper('.consult_slide', {
    direction: 'vertical',
    grabCursor: true,
    speed: 500,
    pagination: {
        el: '.swiper-pagination',
        clickable: true,
        bulletClass: 'consult_nav',
        bulletActiveClass: 'active',
        renderBullet: function (index, className) {
            var bulletNames = ['# 특수명함', '# 홍보물', '# 대형 출력', '# POP/배너', '# 책표지'];

            return '<span class="' + className + '">' + bulletNames[index] + '</span>';
        }
    },
});
(function () {
    var width = 1530;

    $('.tab_nav > li').on('click', function () {
        var idx = $(this).index();
        var move = idx * width;

        $('.tab_nav > li').removeClass('active');
        $(this).addClass('active');

        $('.tab_con .tab_item').css({ "transform": "translate3d(-" + move + "px, 0px, 0px)" });
    });
})();

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


$(document).ready(function () {
    new WOW().init();
   
    //임시 header, footer영역 로드
    $("#header").load("./include/common.html header", function () {
        // header 로드 후 header 관련 function 실행
        setGnb();
        mobileGnb();
    });
    $("#footer").load("./include/common.html footer", function () {
    });

});








