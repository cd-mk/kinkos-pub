// TypeB Mall page JS

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

// sub gnb show / hide
(function () {
    $('.gnb > li > a').on('mouseenter', function () {
        var idx = $(this).parent().index();

        $('.gnb > li > a').removeClass('on');
        $('.gnb > li > a').addClass('not_on');
        $(this).removeClass('not_on').addClass('on');

        if (idx === 6) {
            $('.sub_gnb_item').hide();
            $('.location_item').show();
            $('.sub_gnb').stop().slideDown(500);
            $('.dim').show();
        } else {
            $('.sub_gnb_item').show();
            $('.location_item').hide();
            $('.sub_gnb').stop().slideDown(500);
            $('.dim').show();
        }
    });
    $('#header').on('mouseleave', function () {
        $('.gnb > li > a').removeClass('on');
        $('.gnb > li > a').removeClass('not_on');
        $('.sub_gnb').stop().slideUp(500);
        $('.dim').hide();
    });
    $('.header_top').on('mouseenter', function () {
        $('.gnb > li > a').removeClass('on');
        $('.gnb > li > a').removeClass('not_on');
        $('.sub_gnb').stop().slideUp(500);
        $('.dim').hide();

    });
})();

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