function goToByScroll(id) {
  // 해당메뉴 위치로 스크롤 변경 (스크롤 = 해당매뉴 위치 - 탑메뉴 높이)
  $('html,body').animate({ scrollTop: $("#item" + id).offset().top - $(".anchor .page_tab").outerHeight() - 80 }, 'slow');
}

$(function () {
  // 탑메뉴위치값 저장
  if ($(".anchor .page_tab").length) {
    menuTop = $(".anchor .page_tab").offset().top;
  }
  $("#tab01").addClass("active");

  $(window).scroll(function () {
    //메뉴표시 (스크롤 위치가 해당메뉴 위치값을 지나면 탑메뉴 선택표시)
    $('.anchor .page_tab ul li').removeClass('active');

    $('.anchor .page_tab ul li').each(function () {
      if ($(this).css("display") != "none") {
        var idnumber = $(this).attr("id");
        idnumber = idnumber.substring(3, 5);

        if ($("#item" + idnumber).length < 7) {
          // 아래 셀렉터로 엘리먼트를 찾지 못한경우를 보호
          if ($("#item" + idnumber).offset() != null) {
            if ($(window).scrollTop() >= $("#item" + idnumber).offset().top - $(".anchor .page_tab").outerHeight() - 20) {
              $('.anchor .page_tab ul li').removeClass('active');
              $("#tab" + idnumber).addClass("active");
            }
          }
        } else {
          if ($(window).scrollTop() >= $("#item07").offset().top - $(".anchor .page_tab").outerHeight() - 160 || $(window).scrollTop() >= ($(document).height() - $(window).height())) {
            $('.anchor .page_tab ul li').removeClass('active');
            if ($("#tab7").css("display") != "none") {
              $("#tab07").addClass("active");
            } else {
              $("#tab6").addClass("active");
            }
          }
        }
      }
    })

    //탑메뉴 플로팅
    if ($(window).scrollTop() >= menuTop) {
      //스크롤 위치가 탑메뉴의 위치 보다 크면 플로팅
      $(".anchor .page_tab").addClass("fixed");
    } else {
      //스크롤 위치가 탑메뉴의 위치 보다 작으면 원래위치
      $(".anchor .page_tab").removeClass("fixed");
      $("#tab1").addClass("active");
    }
  });

});
