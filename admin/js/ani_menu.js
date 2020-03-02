$(document).ready(function(){
    $(document).on("click", ".paper li", function() {
        var tv = $(this).closest(".temp_view");
        if (tv != null && tv != undefined) {
            tv.removeClass("on");
        }
    });

    $(".scroll").click(function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop:$('html,body').offset().top}, 300);
    });
    $(".scroll02").click(function(event){
        event.preventDefault();
        $('html,body').animate({scrollTop:$(this.hash).offset().top-100}, 300);
    });

    $(".btn_gnb").click(function(){
        $('.gnb').toggleClass('on');
        $('#header').toggleClass('on')
    });
    $(".gnb>li").click(function(){
        $(this).toggleClass('on');
        $(".gnb>li").not($(this)).removeClass('on');
    });

    //tab
    $(".tabcon").hide();
    $("#tab01").show();
    $(document).on("click", "ul.tab li, ul.cate02 li", function () {
        $(this).addClass('on')
        $("ul.tab li, ul.cate02 li").not($(this)).removeClass('on')
        $(".tabcon").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn()
    });

    //준비중 탭메뉴
    $(".corp02_bkp ul.tab li").click(function () {
        $(this).removeClass('on');
        $("#tab01").show();
    });

    $("div.cate_new a").click(function () {
        $(this).addClass('on')
        $("div.cate a").not($(this)).removeClass('on')
        $(".tabcon").hide();
        var activeTab = $(this).attr("rel");
        $("#" + activeTab).fadeIn()
    });

    //팝업
    $(".btn_webhard").click(function () {
        $(".center_webhard01").addClass('on');
        $(".pop_bg").addClass('on');
        $("select[name=lcode],select[name=ocode],select[name=scode]").hide();
    });

    $(".iso").click(function () {
        $(".iso_cont").addClass('on');
        $(".pop_bg").addClass('on');
        $("select[name=lcode],select[name=ocode],select[name=scode]").hide();

        document.title = '정보보호인증(ISO/IEC27001)';
        setTracker();
    });

    $(".btn_order").click(function () {
        $(".center_order").addClass('on');
        $(".pop_bg").addClass('on');
    });

    $(".btn_login").click(function () {
        $(".login").addClass('on');
        /*$(".pop_bg").addClass('on');*/
    });
    $(document).on("click", ".btn_close, .pop_bg", function () {
        $(".kinkos_eng, .iso_cont").removeClass('on');
        $(".center_webhard").removeClass('on');
        $(".center_order").removeClass('on');
        $(".login").removeClass('on');
        $(".pop_bg").removeClass('on');
        $(".kinkos_eng div.btn_menu span.fa-chevron-left").removeClass('on');

        $("select[name=lcode],select[name=ocode],select[name=scode]").show();
    });

    /*셀렉트박스 스타일
    var select = $("select#color");

    select.change(function(){
        var select_name = $(this).children("option:selected").text();
        $(this).siblings("label").text(select_name);
    });*/

    //faq
    $(".faq tr").click(function(){
        $(this).next('.faq_con').toggleClass('faq_on');
        $(this).toggleClass('on');
    });

    if(parseInt($.browser.version) == 7){
        $(".faq tr").click(function(){
            $(this).next('.faq_con').toggleClass('faq_on_ie')
        });
    }
    //이용약관
    $("label.busi").click(function () {
        $(".join01p dl dd>div.per_cont").removeClass('on');
        $(".join01p dl dd>div.busi_cont").addClass('on');
    });
    $("label.per").click(function () {
        $(".join01p dl dd>div.per_cont").addClass('on');
        $(".join01p dl dd>div.busi_cont").removeClass('on');
    });

    // 사이앤그래픽 제작사례, 템플릿 팝업
    $("ul.gallery li>img").click(function (after) {
        var url = $(this).attr("realpath");
        if (url == '' || url == undefined || url == null) { url = $(this).prop("src"); }
        $(this).closest("li").find(".temp_view img.cont_img").prop("src", url);

        $('.temp_view').removeClass('on');
        $(this).closest("li").find(".temp_view").addClass('on');

        $("#scon").css({zIndex:'3'});
        var offset = $(".temp_view").offset();
        $(".temp_view").offset(offset);
        $(document).scroll(function(){
            $(".temp_view").css({position:'absolute'});
        });
    });

    $(".temp_view span img").click(function () {
        $(".temp_view").removeClass('on');
        $(document).scroll(function(){
            $(".temp_view").css({position:'fixed'});
        });
        $("#scon").css({zIndex:'2'});
    });

    //주변센터찾기
    $(document).on("click",".near",function() {
        alert("GPS가 켜져 있는 상태에서만 정상 작동합니다");
    });

    //고객센터 서브목록
    $("span.fa-chevron-down").click(function () {
        $(".faqp div.search_tab ul li a").not($(".faqp div.search_tab ul li.t01 a:first-child")).toggleClass('view');
        $('.cycle-slideshow').cycle('destroy');
    });

    //팝업 드래그
    $(".layerpop").draggable();

    //탑에 다다를때 픽스시키기
    $(function(){
        if ($(".gnb").length > 0) {
            var menupos = $(".gnb").offset().top;
            $(window).scroll(function(){
                if($(window).scrollTop() >= menupos) {
                    $(".gnb").css({top:'79px'});
                } else {
                    $(".gnb").css({top:'101px'});
                }
            });
        }
        var menupos = $(".topgnb").offset().top;
        $(window).scroll(function(){
            if($(window).scrollTop() >= menupos) {
                $(".topgnb").css({top:'-22px'});
            } else {
                $(".topgnb").css({top:'0px'});
            }
        });
    });

    //센터둘러보기
    $(".event0202p div.cont01 .top_order").hover(function(){
            if(!$(this).hasClass('current')){
                $(".event0202p div.cont01 .on01").addClass('on');
            }
        },
        function(){
        });
    $(".event0202p div.cont01 .binding").hover(function(){
            if(!$(this).hasClass('current')){
                $(".event0202p div.cont01 .on02").addClass('on');
            }
        },
        function(){
        });
    $(".event0202p div.cont01 .copy_print").hover(function(){
            if(!$(this).hasClass('current')){
                $(".event0202p div.cont01 .on03").addClass('on');
            }
        },
        function(){
        });
    $(".event0202p div.cont01 .d_service").hover(function(){
            if(!$(this).hasClass('current')){
                $(".event0202p div.cont01 .on04").addClass('on');
            }
        },
        function(){
        });
    $(".event0202p div.cont01 .sign").hover(function(){
            if(!$(this).hasClass('current')){
                $(".event0202p div.cont01 .on05").addClass('on');
            }
        },
        function(){
        });
    $(".event0202p div.cont01 .computer").hover(function(){
            if(!$(this).hasClass('current')){
                $(".event0202p div.cont01 .on06").addClass('on');
            }
        },
        function(){
        });
    $(".event0202p div.cont01 .btn_view").hover(function(){
            if(!$(this).hasClass('current')){
                $(".event0202p div.cont01 .img_view").addClass('on');
            }
        },
        function(){
            $(".event0202p div.cont01 .img_view_on").removeClass('on');
            $(".event0202p div.cont01 .img_view").removeClass('on');
        });

    //필수값[required] 삭제
    $("input, select").attr("required", false);

});