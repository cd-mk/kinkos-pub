// 간이 장바구니에 넣기
$(document).ready(function () {

  // 옵션 -용지 (멀티옵션 포함) 담기
  $('.itemoption select[name="item_option"]').change(function () {
    var optCnt = $('.itemoption select[name="item_option"]').length;
    var optSel = 0;
    var itemid = $('input[name="itemid"]').val();
    var itemPrc = $('input[name="itemPrice"]').val() * 1;
    var itemCnt = $('input[name="itemea"]').val() * 1;
    var optAddPrc = 0;
    var opt_cd = [];


    $('.itemoption select[name="item_option"] option:selected').each(function () {
      opt_cd[optSel] = $(this).val();
      var opSelCd = opt_cd[optSel];
      var opSelNm = $(this).text();
      var optMSel = -1;
      var opSoldout = false;
      var opLimit = 500;

      if (opt_cd[optSel] != "" && opt_cd[optSel] != "0000") optSel++;

      //옵션이 모두 선택 됐을 때 간이바구니에 넣는다
      if (optSel == optCnt) {
        if (optCnt > 1) {
          // 이중옵션일 때 내용 접수
          for (i = 0; i < Mopt_Code.length; i++) {
            if (optCnt == 2) {
              if (Mopt_Code[i].substr(1, 1) == opt_cd[0].substr(1, 1) && Mopt_Code[i].substr(2, 1) == opt_cd[1].substr(1, 1)) {
                optMSel = i;
              }
            } else if (optCnt == 3) {
              if (Mopt_Code[i].substr(1, 1) == opt_cd[0].substr(1, 1) && Mopt_Code[i].substr(2, 1) == opt_cd[1].substr(1, 1) && Mopt_Code[i].substr(3, 1) == opt_cd[2].substr(1, 1)) {
                optMSel = i;
              }
            }
          }
          if (optMSel >= 0) {
            opSelCd = Mopt_Code[optMSel];
            opSelNm = Mopt_Name[optMSel];
            opSelNm = Mopt_Name1[optMSel];
            optAddPrc = Mopt_addprice[optMSel] * 1;
            if (optAddPrc > 0) opSelNm += "(" + plusComma(optAddPrc) + "원 추가)";
            if (Mopt_LimitEa[optMSel] > 0) opLimit = parseInt(Mopt_LimitEa[optMSel]);

            if (Mopt_S[optMSel]) opSoldout = true;
          } else {
            opSoldout = true;
          }
        } else {
          // 단일옵션일 때
          optAddPrc = $(this).attr("addPrice") * 1;
          if (!optAddPrc) optAddPrc = 0;
          if ($(this).attr("limitEa") > 0) opLimit = parseInt($(this).attr("limitEa"));
          if ($(this).attr("soldout") == "Y") opSoldout = true;
        }

        // 본상품 제한수량 계산
        if ($("#itemRamainLimit").val() > 0) {
          if ($("#itemRamainLimit").val() < opLimit) opLimit = parseInt($("#itemRamainLimit").val());
        }


        //품절처리
        if (opSoldout) {
          alert("품절된 옵션은 선택하실 수 없습니다.");
          return;
        }

        // 옵션이 없으면 추가하지 않음
        if (opSelCd == "" || opSelCd == "0000") return;

        // 중복 옵션 처리
        var chkDpl = false;
        $("#ly_bag_list").find("tr").each(function () {
          if ($(this).find("[name='opt_id']").val() == itemid && $(this).find("[name='opt_cd']").val() == opSelCd) {
            chkDpl = true;
          }
        });
        if (chkDpl) return;


        // 간이 장바구니 내용 작성
        var sAddItem = '';
        sAddItem += '<tr>';
        sAddItem += '	<td class="lt">' + opSelNm;

        if ($(".item").has("#requiredetail").length) {
          sAddItem += '<p class="tPad"><textarea name="optRequire" style="width:215px; height:35px;"></textarea></p>';
        } else {
          sAddItem += '<input type="hidden" name="optRequire" value="" />';
        }

        sAddItem += '<input type="hidden" name="opt_id" value="' + (itemid) + '" />';
        sAddItem += '<input type="hidden" name="opt_cd" value="' + opSelCd + '" />';
        sAddItem += '<input type="hidden" name="opt_prc" value="' + (itemPrc + optAddPrc) + '" />';
        sAddItem += '</td>';
        sAddItem += '	<td><input type="text" id="opt_ea" /></td>';
        sAddItem += '	<td><a href="" class="del"><span class="btn del">삭제</span></a></td>';
        sAddItem += '</tr><tr>';
        sAddItem += '	<td colspan="2" class="rt rPad">' + plusComma((itemPrc + optAddPrc) * itemCnt) + '</td>';
        sAddItem += '</tr>';


        // 간이바구니에 추가
        $("#ly_bag_list").prepend(sAddItem);

        // 스피너 변환
        $("#opt_ea").numSpinner({ min: 1, max: opLimit, step: 1, value: itemCnt });

        // 간이바구니표시
        if ($("#ly_bag_list").find("tr").length > 0) {

          // 개별삭제
          $('#ly_bag_list .del').css('cursor', 'pointer');
          $('#ly_bag_list .del').unbind("click");
          $('#ly_bag_list .del').click(function (e) {
            e.preventDefault();
            var di = $(this).closest("tr").index();
            $("#ly_bag_list").find("tr").eq(di).remove();

            //간이바구니 정리
            if ($("#ly_bag_list").find("tr").length <= 0) {
              $("#ly_bag").hide();
            } else {
              $("#ly_bag_list").find("tr").first().addClass("start");
            }


            // 총금액 합계 계산
            FnSpCalcTotalPrice();
          });

          // 간이 바구니 주문수량 변경
          $('#ly_bag input[name="opt_ea"]').keyup(function () {
            FnSpCalcTotalPrice();
          });

          // 간이 바구니 스피너 액션
          $('#ly_bag_list .spinner .buttons').click(function () {
            FnSpCalcTotalPrice();
          });

          // 총금액 합계 계산
          FnSpCalcTotalPrice();
          $("#ly_bag").show();

          // 선택창 옵션 초기화
          $('.itemoption select[name="item_option"]').val("");

        } else {
          $("#ly_bag").hide();

        }
      }
    });
  });

  // 옵션 -용지 (멀티옵션 포함) 담기
  $('.itemoption select[name="item_option1"]').change(function () {
    var optCnt = $('.itemoption select[name="item_option1"]').length;
    var optSel = 0;
    var itemid = $('input[name="itemid"]').val();
    var itemPrc = $('input[name="itemPrice"]').val() * 1;
    var itemCnt = $('input[name="itemea"]').val() * 1;
    var optAddPrc = 0;
    var opt_cd = [];


    $('.itemoption select[name="item_option1"] option:selected').each(function () {
      opt_cd[optSel] = $(this).val();
      var opSelCd = opt_cd[optSel];
      var opSelNm = $(this).text();
      var optMSel = -1;
      var opSoldout = false;
      var opLimit = 500;

      if (opt_cd[optSel] != "" && opt_cd[optSel] != "0000") optSel++;

      //옵션이 모두 선택 됐을 때 간이바구니에 넣는다
      if (optSel == optCnt) {
        if (optCnt > 1) {
          // 이중옵션일 때 내용 접수
          for (i = 0; i < Mopt_Code.length; i++) {
            if (optCnt == 2) {
              if (Mopt_Code[i].substr(1, 1) == opt_cd[0].substr(1, 1) && Mopt_Code[i].substr(2, 1) == opt_cd[1].substr(1, 1)) {
                optMSel = i;
              }
            } else if (optCnt == 3) {
              if (Mopt_Code[i].substr(1, 1) == opt_cd[0].substr(1, 1) && Mopt_Code[i].substr(2, 1) == opt_cd[1].substr(1, 1) && Mopt_Code[i].substr(3, 1) == opt_cd[2].substr(1, 1)) {
                optMSel = i;
              }
            }
          }
          if (optMSel >= 0) {
            opSelCd = Mopt_Code[optMSel];
            opSelNm = Mopt_Name[optMSel];
            optAddPrc = Mopt_addprice[optMSel] * 1;
            if (optAddPrc > 0) opSelNm += "(" + plusComma(optAddPrc) + "원 추가)";
            if (Mopt_LimitEa[optMSel] > 0) opLimit = parseInt(Mopt_LimitEa[optMSel]);

            if (Mopt_S[optMSel]) opSoldout = true;
          } else {
            opSoldout = true;
          }
        } else {
          // 단일옵션일 때
          optAddPrc = $(this).attr("addPrice") * 1;
          if (!optAddPrc) optAddPrc = 0;
          if ($(this).attr("limitEa") > 0) opLimit = parseInt($(this).attr("limitEa"));
          if ($(this).attr("soldout") == "Y") opSoldout = true;
        }

        // 본상품 제한수량 계산
        if ($("#itemRamainLimit").val() > 0) {
          if ($("#itemRamainLimit").val() < opLimit) opLimit = parseInt($("#itemRamainLimit").val());
        }


        //품절처리
        if (opSoldout) {
          alert("품절된 옵션은 선택하실 수 없습니다.");
          return;
        }

        // 옵션이 없으면 추가하지 않음
        if (opSelCd == "" || opSelCd == "0000") return;

        // 중복 옵션 처리
        var chkDpl = false;
        $("#ly_bag_list").find("tr").each(function () {
          if ($(this).find("[name='opt_id']").val() == itemid && $(this).find("[name='opt_cd']").val() == opSelCd) {
            chkDpl = true;
          }
        });
        if (chkDpl) return;


        // 간이 장바구니 내용 작성
        var sAddItem = '';
        sAddItem += '<tr>';
        sAddItem += '	<td class="lt">' + opSelNm;

        if ($(".item").has("#requiredetail").length) {
          sAddItem += '<p class="tPad"><textarea name="optRequire" style="width:215px; height:35px;"></textarea></p>';
        } else {
          sAddItem += '<input type="hidden" name="optRequire" value="" />';
        }

        sAddItem += '<input type="hidden" name="opt_id" value="' + (itemid) + '" />';
        sAddItem += '<input type="hidden" name="opt_cd" value="' + opSelCd + '" />';
        sAddItem += '<input type="hidden" name="opt_prc" value="' + (itemPrc + optAddPrc) + '" />';
        sAddItem += '</td>';
        sAddItem += '	<td><input type="text" id="opt_ea" /></td>';
        sAddItem += '	<td class="rt rPad">' + plusComma((itemPrc + optAddPrc) * itemCnt) + '</td>';
        sAddItem += '	<td><a href="" class="del"><span class="btn del">삭제</span></a></td>';
        sAddItem += '</tr>';


        // 간이바구니에 추가
        $("#ly_bag_list").prepend(sAddItem);

        // 스피너 변환
        $("#opt_ea").numSpinner({ min: 1, max: opLimit, step: 1, value: itemCnt });

        // 간이바구니표시
        if ($("#ly_bag_list").find("tr").length > 0) {

          // 개별삭제
          $('#ly_bag_list .del').css('cursor', 'pointer');
          $('#ly_bag_list .del').unbind("click");
          $('#ly_bag_list .del').click(function (e) {
            e.preventDefault();
            var di = $(this).closest("tr").index();
            $("#ly_bag_list").find("tr").eq(di).remove();

            //간이바구니 정리
            if ($("#ly_bag_list").find("tr").length <= 0) {
              $("#ly_bag").hide();
            } else {
              $("#ly_bag_list").find("tr").first().addClass("start");
            }


            // 총금액 합계 계산
            FnSpCalcTotalPrice();
          });

          // 간이 바구니 주문수량 변경
          $('#ly_bag input[name="opt_ea"]').keyup(function () {
            FnSpCalcTotalPrice();
          });

          // 간이 바구니 스피너 액션
          $('#ly_bag_list .spinner .buttons').click(function () {
            FnSpCalcTotalPrice();
          });

          // 총금액 합계 계산
          FnSpCalcTotalPrice();
          $("#ly_bag").show();

          // 선택창 옵션 초기화
          $('.itemoption select[name="item_option1"]').val("");

        } else {
          $("#ly_bag").hide();

        }
      }
    });
  });
  
});







//총 합계금액 계산
function FnSpCalcTotalPrice() {
  var isSpOpt = ($("#ly_bag_list tr").length - $("#ly_bag_list .plusPdtOrder").length) > 0	// 간이바구니 옵션여부
  var isSpPls = $("#ly_bag_list .plusPdtOrder").length > 0									// 간이바구니 플러스여부

  // 총금액 합계 계산
  var spTotalPrc = 0;
  $("#ly_bag_list").find("tr").each(function () {
    spTotalPrc = spTotalPrc + ($(this).find("[name='opt_prc']").val() * $(this).find("[name='opt_ea']").val());
    $(this).find(".optPrc").html(plusComma($(this).find("[name='opt_prc']").val() * $(this).find("[name='opt_ea']").val()));
  });
  $("#spTotalPrc").html(plusComma(spTotalPrc) + "원");
}

//간이바구니 -> 장바구니
function FnAddShoppingBag(bool) {
  var frm = document.sbagfrm;
  var aFrm = document.BagArrFrm;
  var optCode = "0000";

  var isOpt = $('.itemoption').length > 0		// 옵션	여부
  var isSpOpt = ($("#ly_bag_list tr").length - $("#ly_bag_list .plusPdtOrder").length) > 0	// 간이바구니 옵션여부
  var isSpPls = $("#ly_bag_list .plusPdtOrder").length > 0									// 간이바구니 플러스여부
  var sAddBagArr = "";

  if (!isOpt) {
    //일반 상품 검사
    frm.itemoption.value = optCode;

    for (var j = 0; j < frm.itemea.value.length; j++) {
      if (((frm.itemea.value.charAt(j) * 0 == 0) == false) || (frm.itemea.value == 0)) {
        alert('수량은 숫자만 가능합니다.');
        frm.itemea.focus();
        return;
      }
    }

    if (frm.requiredetail) {
      if (frm.requiredetail.value.length < 1) {
        alert('주문 제작 상품 문구를 작성해 주세요.');
        frm.requiredetail.focus();
        return;
      }

      if (GetByteLength(frm.requiredetail.value) > 255) {
        alert('문구 입력은 한글 최대 120자 까지 가능합니다.');
        frm.requiredetail.focus();
        return;
      }
      // 꺽은괄호 치환
      frm.requiredetail.value = frm.requiredetail.value.replace(/</g, "＜").replace(/>/g, "＞");
    }
  }



  // 간이바구니 변환
  if (isSpOpt || isSpPls) {
    $("#ly_bag_list").find("tr").each(function () {
      sAddBagArr += $(this).find("[name='opt_id']").val() + ",";
      sAddBagArr += $(this).find("[name='opt_cd']").val() + ",";
      sAddBagArr += $(this).find("[name='opt_ea']").val() + ",";
      sAddBagArr += $(this).find("[name='optRequire']").val().replace(/</g, "＜").replace(/>/g, "＞").replace(/,/g, "，") + "|";
    });
  }
}




function plusComma(num) {
  if (num < 0) { num *= -1; var minus = true }
  else var minus = false

  var dotPos = (num + "").split(".")
  var dotU = dotPos[0]
  var dotD = dotPos[1]
  var commaFlag = dotU.length % 3

  if (commaFlag) {
    var out = dotU.substring(0, commaFlag)
    if (dotU.length > 3) out += ","
  }
  else var out = ""

  for (var i = commaFlag; i < dotU.length; i += 3) {
    out += dotU.substring(i, i + 3)
    if (i < dotU.length - 3) out += ","
  }

  if (minus) out = "-" + out
  if (dotD) return out + "." + dotD
  else return out
}

