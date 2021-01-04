// 전역 변수
var errmsg = "";
var errfld = null;

// 필드 검사
function check_field(fld, msg)
{
    if ((fld.value = trim(fld.value)) == "")
        error_field(fld, msg);
    else
        clear_field(fld);
    return;
}

// 필드 오류 표시
function error_field(fld, msg)
{
    if (msg != "")
        errmsg += msg + "\n";
    if (!errfld) errfld = fld;
    fld.style.background = "#BDDEF7";
}

// 필드를 깨끗하게
function clear_field(fld)
{
    fld.style.background = "#FFFFFF";
}

function trim(s)
{
    var t = "";
    var from_pos = to_pos = 0;

    for (i=0; i<s.length; i++)
    {
        if (s.charAt(i) == ' ')
            continue;
        else
        {
            from_pos = i;
            break;
        }
    }

    for (i=s.length; i>=0; i--)
    {
        if (s.charAt(i-1) == ' ')
            continue;
        else
        {
            to_pos = i;
            break;
        }
    }

    t = s.substring(from_pos, to_pos);
    //				alert(from_pos + ',' + to_pos + ',' + t+'.');
    return t;
}

// 자바스크립트로 PHP의 number_format 흉내를 냄
// 숫자에 , 를 출력
function number_format(data)
{

    var tmp = '';
    var number = '';
    var cutlen = 3;
    var comma = ',';
    var i;

    var sign = data.match(/^[\+\-]/);
    if(sign) {
        data = data.replace(/^[\+\-]/, "");
    }

    len = data.length;
    mod = (len % cutlen);
    k = cutlen - mod;
    for (i=0; i<data.length; i++)
    {
        number = number + data.charAt(i);

        if (i < data.length - 1)
        {
            k++;
            if ((k % cutlen) == 0)
            {
                number = number + comma;
                k = 0;
            }
        }
    }

    if(sign != null)
        number = sign+number;

    return number;
}

// 새 창
function popup_window(url, winname, opt)
{
    window.open(url, winname, opt);
}


// 폼메일 창
function popup_formmail(url)
{
    opt = 'scrollbars=yes,width=417,height=385,top=10,left=20';
    popup_window(url, "wformmail", opt);
}

// , 를 없앤다.
function no_comma(data)
{
    var tmp = '';
    var comma = ',';
    var i;

    for (i=0; i<data.length; i++)
    {
        if (data.charAt(i) != comma)
            tmp += data.charAt(i);
    }
    return tmp;
}

// 삭제 검사 확인
function del(href)
{
    if(confirm("한번 삭제한 자료는 복구할 방법이 없습니다.\n\n정말 삭제하시겠습니까?")) {
        var iev = -1;
        if (navigator.appName == 'Microsoft Internet Explorer') {
            var ua = navigator.userAgent;
            var re = new RegExp("MSIE ([0-9]{1,}[\.0-9]{0,})");
            if (re.exec(ua) != null)
                iev = parseFloat(RegExp.$1);
        }

        // IE6 이하에서 한글깨짐 방지
        if (iev != -1 && iev < 7) {
            document.location.href = encodeURI(href);
        } else {
            document.location.href = href;
        }
    }
}

// 쿠키 입력
function set_cookie(name, value, expirehours, domain)
{
    var today = new Date();
    today.setTime(today.getTime() + (60*60*1000*expirehours));
    document.cookie = name + "=" + escape( value ) + "; path=/; expires=" + today.toGMTString() + ";";
    if (domain) {
        document.cookie += "domain=" + domain + ";";
    }
}

// 쿠키 얻음
function get_cookie(name)
{
    var find_sw = false;
    var start, end;
    var i = 0;

    for (i=0; i<= document.cookie.length; i++)
    {
        start = i;
        end = start + name.length;

        if(document.cookie.substring(start, end) == name)
        {
            find_sw = true
            break
        }
    }

    if (find_sw == true)
    {
        start = end + 1;
        end = document.cookie.indexOf(";", start);

        if(end < start)
            end = document.cookie.length;

        return document.cookie.substring(start, end);
    }
    return "";
}

// 쿠키 지움
function delete_cookie(name)
{
    var today = new Date();

    today.setTime(today.getTime() - 1);
    var value = get_cookie(name);
    if(value != "")
        document.cookie = name + "=" + value + "; path=/; expires=" + today.toGMTString();
}

var last_id = null;
function menu(id)
{
    if (id != last_id)
    {
        if (last_id != null)
            document.getElementById(last_id).style.display = "none";
        document.getElementById(id).style.display = "block";
        last_id = id;
    }
    else
    {
        document.getElementById(id).style.display = "none";
        last_id = null;
    }
}

function textarea_decrease(id, row)
{
    if (document.getElementById(id).rows - row > 0)
        document.getElementById(id).rows -= row;
}

function textarea_original(id, row)
{
    document.getElementById(id).rows = row;
}

function textarea_increase(id, row)
{
    document.getElementById(id).rows += row;
}

// 글숫자 검사
function check_byte(content, target)
{
    var i = 0;
    var cnt = 0;
    var ch = '';
    var cont = document.getElementById(content).value;

    for (i=0; i<cont.length; i++) {
        ch = cont.charAt(i);
        if (escape(ch).length > 4) {
            cnt += 2;
        } else {
            cnt += 1;
        }
    }
    // 숫자를 출력
    document.getElementById(target).innerHTML = cnt;

    return cnt;
}

// 브라우저에서 오브젝트의 왼쪽 좌표
function get_left_pos(obj)
{
    var parentObj = null;
    var clientObj = obj;
    //var left = obj.offsetLeft + document.body.clientLeft;
    var left = obj.offsetLeft;

    while((parentObj=clientObj.offsetParent) != null)
    {
        left = left + parentObj.offsetLeft;
        clientObj = parentObj;
    }

    return left;
}

// 브라우저에서 오브젝트의 상단 좌표
function get_top_pos(obj)
{
    var parentObj = null;
    var clientObj = obj;
    //var top = obj.offsetTop + document.body.clientTop;
    var top = obj.offsetTop;

    while((parentObj=clientObj.offsetParent) != null)
    {
        top = top + parentObj.offsetTop;
        clientObj = parentObj;
    }

    return top;
}

function flash_movie(src, ids, width, height, wmode)
{
    var wh = "";
    if (parseInt(width) && parseInt(height))
        wh = " width='"+width+"' height='"+height+"' ";
    return "<object classid='clsid:d27cdb6e-ae6d-11cf-96b8-444553540000' codebase='http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=6,0,0,0' "+wh+" id="+ids+"><param name=wmode value="+wmode+"><param name=movie value="+src+"><param name=quality value=high><embed src="+src+" quality=high wmode="+wmode+" type='application/x-shockwave-flash' pluginspage='http://www.macromedia.com/shockwave/download/index.cgi?p1_prod_version=shockwaveflash' "+wh+"></embed></object>";
}

function obj_movie(src, ids, width, height, autostart)
{
    var wh = "";
    if (parseInt(width) && parseInt(height))
        wh = " width='"+width+"' height='"+height+"' ";
    if (!autostart) autostart = false;
    return "<embed src='"+src+"' "+wh+" autostart='"+autostart+"'></embed>";
}

function doc_write(cont)
{
    document.write(cont);
}

var win_password_lost = function(href) {
    window.open(href, "win_password_lost", "left=50, top=50, width=617, height=330, scrollbars=1");
}

$(document).ready(function(){
    $("#login_password_lost, #ol_password_lost").click(function(){
        win_password_lost(this.href);
        return false;
    });
});

/**
 * 포인트 창
 **/
var win_point = function(href) {
    var new_win = window.open(href, 'win_point', 'left=100,top=100,width=600, height=600, scrollbars=1');
    new_win.focus();
}

/**
 * 쪽지 창
 **/
var win_memo = function(href) {
    var new_win = window.open(href, 'win_memo', 'left=100,top=100,width=620,height=500,scrollbars=1');
    new_win.focus();
}

/**
 * 메일 창
 **/
var win_email = function(href) {
    var new_win = window.open(href, 'win_email', 'left=100,top=100,width=600,height=580,scrollbars=0');
    new_win.focus();
}

/**
 * 자기소개 창
 **/
var win_profile = function(href) {
    var new_win = window.open(href, 'win_profile', 'left=100,top=100,width=620,height=510,scrollbars=1');
    new_win.focus();
}

/**
 * 스크랩 창
 **/
var win_scrap = function(href) {
    var new_win = window.open(href, 'win_scrap', 'left=100,top=100,width=600,height=600,scrollbars=1');
    new_win.focus();
}

/**
 * 홈페이지 창
 **/
var win_homepage = function(href) {
    var new_win = window.open(href, 'win_homepage', '');
    new_win.focus();
}

/**
 * 우편번호 창
 **/
var win_zip = function(frm_name, frm_zip, frm_addr1, frm_addr2, frm_addr3, frm_jibeon) {
    if(typeof daum === 'undefined'){
        alert("다음 juso.js 파일이 로드되지 않았습니다.");
        return false;
    }

    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
            // 우편번호와 주소 정보를 해당 필드에 넣고, 커서를 상세주소 필드로 이동한다.
            // 선택에 따라 지번 입력도 지원할 경우
            // userSelectedType : 'R'(도로명), 'J'(지번)
            // jibunAddress : 지번주소

            var of = document[frm_name];
            of[frm_zip].value = data.zonecode;
            of[frm_addr1].value = data.address + " ("+data.buildingName+")";
            of[frm_addr2].value = "";
            of[frm_addr3].value = "";

            if( data.addressType == "R" ){  //도로명이면
//                of[frm_addr3].value = data.autoJibunAddress;
            }
            if(of[frm_jibeon] !== undefined){
                of[frm_jibeon].value = data.addressType;
            }

            of[frm_addr2].focus();
        }
    }).open();
}

/**
 * sms5 창
 **/
var win_sms5 = function(href) {
    var new_win = window.open(href, 'win_sms5', 'width=474, height=560, scrollbars=1');
    new_win.focus();
}

/**
 * 새로운 비밀번호 분실 창 : 101123
 **/
win_password_lost = function(href)
{
    var new_win = window.open(href, 'win_password_lost', 'width=617, height=330, scrollbars=1');
    new_win.focus();
}

/**
 * 설문조사 결과
 **/
var win_poll = function(href) {
    var new_win = window.open(href, 'win_poll', 'width=616, height=500, scrollbars=1');
    new_win.focus();
}

/**
 * 스크린리더 미사용자를 위한 스크립트 - 지운아빠 2013-04-22
 * alt 값만 갖는 그래픽 링크에 마우스오버 시 title 값 부여, 마우스아웃 시 title 값 제거
 **/
$(function() {
    $('a img').mouseover(function() {
        $a_img_title = $(this).attr('alt');
        $(this).attr('title', $a_img_title);
    }).mouseout(function() {
        $(this).attr('title', '');
    });
});

/**
 * 텍스트 리사이즈
 **/
function font_resize(id, rmv_class, add_class)
{
    var $el = $("#"+id);

    $el.removeClass(rmv_class).addClass(add_class);

    set_cookie("ck_font_resize_rmv_class", rmv_class, 1, g5_cookie_domain);
    set_cookie("ck_font_resize_add_class", add_class, 1, g5_cookie_domain);
}

$(function(){
    $(".win_point").click(function() {
        win_point(this.href);
        return false;
    });

    $(".win_memo").click(function() {
        win_memo(this.href);
        return false;
    });

    $(".win_email").click(function() {
        win_email(this.href);
        return false;
    });

    $(".win_scrap").click(function() {
        win_scrap(this.href);
        return false;
    });

    $(".win_profile").click(function() {
        win_profile(this.href);
        return false;
    });

    $(".win_homepage").click(function() {
        win_homepage(this.href);
        return false;
    });

    $(".win_password_lost").click(function() {
        win_password_lost(this.href);
        return false;
    });

    $(".win_sms5").click(function() {
        win_sms5(this.href);
        return false;
    });

    $(".win_poll").click(function() {
        win_poll(this.href);
        return false;
    });

    // 사이드뷰
    var sv_hide = false;
    $(".sv_member, .sv_guest").click(function() {
        $(".sv").removeClass("sv_on");
        $(this).closest(".sv_wrap").find(".sv").addClass("sv_on");
    });

    $(".sv, .sv_wrap").hover(
        function() {
            sv_hide = false;
        },
        function() {
            sv_hide = true;
        }
    );

    $(".sv_member, .sv_guest").focusin(function() {
        sv_hide = false;
        $(".sv").removeClass("sv_on");
        $(this).closest(".sv_wrap").find(".sv").addClass("sv_on");
    });

    $(".sv a").focusin(function() {
        sv_hide = false;
    });

    $(".sv a").focusout(function() {
        sv_hide = true;
    });

    // 셀렉트 ul
    var sel_hide = false;
    $('.sel_btn').click(function() {
        $('.sel_ul').removeClass('sel_on');
        $(this).siblings('.sel_ul').addClass('sel_on');
    });

    $(".sel_wrap").hover(
        function() {
            sel_hide = false;
        },
        function() {
            sel_hide = true;
        }
    );

    $('.sel_a').focusin(function() {
        sel_hide = false;
    });

    $('.sel_a').focusout(function() {
        sel_hide = true;
    });

    $(document).click(function() {
        if(sv_hide) { // 사이드뷰 해제
            $(".sv").removeClass("sv_on");
        }
        if (sel_hide) { // 셀렉트 ul 해제
            $('.sel_ul').removeClass('sel_on');
        }
    });

    $(document).focusin(function() {
        if(sv_hide) { // 사이드뷰 해제
            $(".sv").removeClass("sv_on");
        }
        if (sel_hide) { // 셀렉트 ul 해제
            $('.sel_ul').removeClass('sel_on');
        }
    });

    $("textarea#wr_content[maxlength]").on("keyup change", function() {
        var str = $(this).val()
        var mx = parseInt($(this).attr("maxlength"))
        if (str.length > mx) {
            $(this).val(str.substr(0, mx));
            return false;
        }
    });
});

/* 팝업호출시 사용할 함수 */
function OpenPopupPost(Url, param, width, height, scroll, resizeble, name) {
    /// <summary>팝업 호출 post 방식</summary>
    /// <param name="url" type="object">메뉴 Url</param>
    /// <param name="parm" type="String">json param ex) {'param' : 'Y'}</param>
    /// <param name="width" type="String">넓이</param>
    /// <param name="height" type="String">높이</param>
    /// <param name="scroll" type="String">스크롤여부</param>
    /// <param name="resizeble" type="String">사이즈조정</param>
    /// <param name="name" type="String">window name</param>
    /// <returns type="void"></returns>

    if (width == null)
        width = 800;
    if (height == null)
        height = 600;
    if (scroll == null)
        scroll = 'auto';
    if (resizeble == null)
        resizeble = "yes";
    if (name == null)
        name = "PopupView";

    var popup = window.open('', name, 'width=' + width + 'px,height=' + height + 'px,status=yes,menubar=no, scrollbars=' + scroll + ',resizable=' + resizeble);
    popup.focus();

    post_goto(Url, param, name);

    return popup;
};

function post_goto(url, parm, target) {
    /// <summary>페이지 이동 post 방식</summary>
    /// <param name="url" type="object">메뉴 Url</param>
    /// <param name="parm" type="String">json param ex) {'param' : 'Y'}</param>
    /// <param name="target" type="String">타겟</param>
    /// <returns type="void"></returns>

    var f = $('<form></form>');
    var objs, value;
    for (var key in parm) {
        value = parm[key];
        objs = $('<input type=hidden />');
        objs.attr('name', key);
        objs.attr('value', value);
        f.append(objs);
    }

    if (target)
        f.attr('target', target);
    f.attr('method', 'post');
    f.attr('action', url);
    var body = $('body');
    body.append(f);
    f.submit();
}

// 이미지의 크기에 따라 새창의 크기가 변경
function image_window(img)
{
    var w = img.tmp_width;
    var h = img.tmp_height;
    var winl = (screen.width-w)/2;
    var wint = (screen.height-h)/3;

    if (w >= screen.width) {
        winl = 0;
        h = (parseInt)(w * (h / w));
    }

    if (h >= screen.height) {
        wint = 0;
        w = (parseInt)(h * (w / h));
    }

    var js_url = "<script type='text/javascript'> \n";
    js_url += "<!-- \n";
    js_url += "var ie=document.all; \n";
    js_url += "var nn6=document.getElementById&&!document.all; \n";
    js_url += "var isdrag=false; \n";
    js_url += "var x,y; \n";
    js_url += "var dobj; \n";
    js_url += "function movemouse(e) \n";
    js_url += "{ \n";
    js_url += "  if (isdrag) \n";
    js_url += "  { \n";
    js_url += "    dobj.style.left = nn6 ? tx + e.clientX - x : tx + event.clientX - x; \n";
    js_url += "    dobj.style.top  = nn6 ? ty + e.clientY - y : ty + event.clientY - y; \n";
    js_url += "    return false; \n";
    js_url += "  } \n";
    js_url += "} \n";
    js_url += "function selectmouse(e) \n";
    js_url += "{ \n";
    js_url += "  var fobj      = nn6 ? e.target : event.srcElement; \n";
    js_url += "  var topelement = nn6 ? 'HTML' : 'BODY'; \n";
    js_url += "  while (fobj.tagName != topelement && fobj.className != 'dragme') \n";
    js_url += "  { \n";
    js_url += "    fobj = nn6 ? fobj.parentNode : fobj.parentElement; \n";
    js_url += "  } \n";
    js_url += "  if (fobj.className=='dragme') \n";
    js_url += "  { \n";
    js_url += "    isdrag = true; \n";
    js_url += "    dobj = fobj; \n";
    js_url += "    tx = parseInt(dobj.style.left+0); \n";
    js_url += "    ty = parseInt(dobj.style.top+0); \n";
    js_url += "    x = nn6 ? e.clientX : event.clientX; \n";
    js_url += "    y = nn6 ? e.clientY : event.clientY; \n";
    js_url += "    document.onmousemove=movemouse; \n";
    js_url += "    return false; \n";
    js_url += "  } \n";
    js_url += "} \n";
    js_url += "document.onmousedown=selectmouse; \n";
    js_url += "document.onmouseup=new Function('isdrag=false'); \n";
    js_url += "//--> \n";
    js_url += "</"+"script> \n";

    var settings;

    if (g4_is_gecko) {
        settings  ='width='+(w+10)+',';
        settings +='height='+(h+10)+',';
    } else {
        settings  ='width='+w+',';
        settings +='height='+h+',';
    }
    settings +='top='+wint+',';
    settings +='left='+winl+',';
    settings +='scrollbars=no,';
    settings +='resizable=yes,';
    settings +='status=no';


    win=window.open("","image_window",settings);
    win.document.open();
    win.document.write ("<html><head> \n<meta http-equiv='imagetoolbar' CONTENT='no'> \n<meta http-equiv='content-type' content='text/html; charset="+g4_charset+"'>\n");
    var size = "이미지 사이즈 : "+w+" x "+h;
    win.document.write ("<title>"+size+"</title> \n");
    if(w >= screen.width || h >= screen.height) {
        win.document.write (js_url);
        var click = "ondblclick='window.close();' style='cursor:move' title=' "+size+" \n\n 이미지 사이즈가 화면보다 큽니다. \n 왼쪽 버튼을 클릭한 후 마우스를 움직여서 보세요. \n\n 더블 클릭하면 닫혀요. '";
    }
    else
        var click = "onclick='window.close();' style='cursor:pointer' title=' "+size+" \n\n 클릭하면 닫혀요. '";
    win.document.write ("<style>.dragme{position:relative;}</style> \n");
    win.document.write ("</head> \n\n");
    win.document.write ("<body leftmargin=0 topmargin=0 bgcolor=#dddddd style='cursor:arrow;'> \n");
    win.document.write ("<table width=100% height=100% cellpadding=0 cellspacing=0><tr><td align=center valign=middle><img src='"+img.src+"' width='"+w+"' height='"+h+"' border=0 class='dragme' "+click+"></td></tr></table>");
    win.document.write ("</body></html>");
    win.document.close();

    if(parseInt(navigator.appVersion) >= 4){win.window.focus();}
}

var datepickerOption = {
    showOn: "button",
    buttonImage: "/image/icon/iconCalenda.gif",
    buttonImageOnly: true,
    dateFormat: 'yy-mm-dd',
    prevText: '이전 달',
    nextText: '다음 달',
    monthNames: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    monthNamesShort: ['1월', '2월', '3월', '4월', '5월', '6월', '7월', '8월', '9월', '10월', '11월', '12월'],
    dayNames: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesShort: ['일', '월', '화', '수', '목', '금', '토'],
    dayNamesMin: ['일', '월', '화', '수', '목', '금', '토'],
    showMonthAfterYear: true,
    yearSuffix: ' ',
    changeYear: true,
    changeMonth: true,
    showButtonPanel: true,
    currentText: "오늘날짜",
    closeText: "닫기",
    onSelect: function (dateText, inst) {
        $(this).trigger('change');

        var selectables = $("input[type=text]");
        var current = $(this);
        var nextIndex = 0;

        if (current.length === 1) {
            var currentIndex = selectables.index(current);
            if (currentIndex + 1 < selectables.length) {
                nextIndex = currentIndex + 1;
            }
        }

        selectables.eq(nextIndex).focus();
    }
};

function validate_date(checkDate) {
    if (checkDate != null && checkDate != undefined) {
        checkDate = checkDate.split("-");

        var tempDate = new Date(checkDate[0], parseInt(checkDate[1], 10) - 1, checkDate[2]);

        if (tempDate == "NaN" || tempDate == "Invalid Date") {
            return false;
        } else if (checkDate[0] != tempDate.getFullYear()) {
            return false;
        } else if (checkDate[1] != tempDate.getMonth() + 1) {
            return false;
        } else if (checkDate[2] != tempDate.getDate()) {
            return false;
        } else {
            return true;
        }
    }
    else
        return false;
}

function popINIReceipt(tid){
    var receiptUrl = "https://iniweb.inicis.com/DefaultWebApp/mall/cr/cm/mCmReceipt_head.jsp?noTid=" + tid + "&noMethod=1";
    var popReceipt = window.open(receiptUrl,"receipt","width=430,height=700");
    popReceipt.focus();
}

function setTracker() {
    _paq.push ([ 'trackEvent', document.domain, document.title]);

    post_goto('/blank.html?title='+document.title, null, 'hiddenframe');
}

function get_Subway(select, lcode, ocode){
    select.empty();
    select.append('<option value="">지하철역명으로 찾기</option>');

    $.ajax({
        url: '/svchandler/Common.php',
        data: {
            action: 'get_subway',
            lcode: lcode,
            security: function() { return $("#token").val(); }
        },
        async: false,
        success: function (res) {
            if (res != "") {
                var r = JSON.parse(res);
                $.each(r.data, function() {
                    select.append('<option value="'+this['swidx']+'"'+(ocode == this['swidx']? ' selected':'')+'>'+this['data']+'</option>');
                });
            }
        }
    });
}

function get_Paperlist(code, btn, view, txt) {
    if (txt == null || txt == '') {
        txt = "종류보기";
    }

    var regEx = /temp_view_([0-9])/gi;
    var matStr = $(view).prop('class').match(regEx).toString();
    var dn = matStr.replace(/[^0-9]/g, '');

    $.ajax({
        url: '/svchandler/Common.php',
        data: {
            action: 'get_paperlist',
            code: code,
            security: function() { return $("#token").val(); }
        },
        success: function (res) {
            if (res != "") {
                var r = JSON.parse(res);

                if (r.data.length > 0) {
                    $(btn).html(txt+'<img src="/img/service/07btn02.gif" class="btn_prod_down" alt=""/><img src="/img/service/07btn01.gif" class="btn_prod_up" alt=""/>');

                    var p = 0;
                    var html = '';
                    $(view).empty();
                    $(view).append('<img src="/img/service/07con_arrow.gif" alt=""/>');
                    $.each(r.data, function() {
                        if (p%2 == 0) { html += "<ul class='paper'>"; }
                        html += "<li><span class='zoom' realpath='/data/paper/"+this['savename']+"'><img src='"+this['src']+"'/></span>"+this['name'];

                        var arr_data = this['data'].split('||');
                        html += '<ul class="paper_cont">';
                        for(i=0; i < arr_data.length; i++) {
                            if (arr_data[i] != '') { html += "<li>"+arr_data[i]+"</li>"; }
                        }
                        html += "</ul>";
                        html += "</li>";
                        if ((p-1)%2 == 0) html += "</ul>";
                        p++;
                    });
                    if (p > 1 && p%2 != 0) html += "</ul>";
                    $(view).append(html);
                    $(view).append('<div class="btn_close_list fa fa-times" data-n="'+dn+'"></div>');

                    $('.zoom').each(function() {
                        var src = $(this).attr('realpath');
                        if (src != null && src != undefined) {
                            $(this).zoom({url: src});
                        }
                    });
                } else {
                    $(btn).html('서비스 준비중<img src="/img/service/07btn02.gif" class="btn_prod_down" alt=""/><img src="/img/service/07btn01.gif" class="btn_prod_up" alt=""/>');
                }
            }
        }
    });
}

function bodyClass(addClassName) {
    $('body').addClass(addClassName);
}

function decodeURL(str)
{
    var s0, i, j, s, ss, u, n, f;
    s0 = "";                // decoded str

    for (i = 0; i < str.length; i++){ // scan the source str
        s = str.charAt(i);
        if (s == "+"){s0 += " ";} // "+" should be changed to SP
        else {
            if (s != "%"){s0 += s;} // add an unescaped char
            else{ // escape sequence decoding
                u = 0;// unicode of the character
                f = 1;// escape flag, zero means end of this sequence
                while (true) {
                    ss = "";// local str to parse as int
                    for (j = 0; j < 2; j++ ) {// get two maximum hex characters for parse
                        sss = str.charAt(++i);
                        if (((sss >= "0") && (sss <= "9")) || ((sss >= "a") && (sss <= "f"))|| ((sss >= "A") && (sss <= "F"))) {
                            ss += sss;// if hex, add the hex character
                        } else {--i; break;}// not a hex char., exit the loop
                    }
                    n = parseInt(ss, 16); // parse the hex str as byte
                    if (n <= 0x7f){u = n; f = 1;} // single byte format
                    if ((n >= 0xc0) && (n <= 0xdf)){u = n & 0x1f; f = 2;} // double byte format
                    if ((n >= 0xe0) && (n <= 0xef)){u = n & 0x0f; f = 3;} // triple byte format
                    if ((n >= 0xf0) && (n <= 0xf7)){u = n & 0x07; f = 4;} // quaternary byte format (extended)
                    if ((n >= 0x80) && (n <= 0xbf)){u = (u << 6) + (n & 0x3f); --f;} // not a first, shift and add 6 lower bits
                    if (f <= 1){break;} // end of the utf byte sequence
                    if (str.charAt(i + 1) == "%"){ i++ ;} // test for the next shift byte
                    else {break;} // abnormal, format error
                }
                s0 += String.fromCharCode(u); // add the escaped character
            }
        }
    }
    return s0;
}

function encodeURL(str)
{
    var s0, i, s, u;
    s0 = "";// encoded str
    for (i = 0; i < str.length; i++){ // scan the source
        s = str.charAt(i);
        u = str.charCodeAt(i);// get unicode of the char
        if (s == " "){s0 += "+";} // SP should be converted to "+"
        else {
            if ( u == 0x2a || u == 0x2d || u == 0x2e || u == 0x5f || ((u >= 0x30) && (u <= 0x39)) || ((u >= 0x41) && (u <= 0x5a)) || ((u >= 0x61) && (u <= 0x7a))){ // check for escape
                s0 = s0 + s;// don't escape
            }
            else {// escape
                if ((u >= 0x0) && (u <= 0x7f)){ // single byte format
                    s = "0"+u.toString(16);
                    s0 += "%"+ s.substr(s.length-2);
                }
                else if (u > 0x1fffff){ // quaternary byte format (extended)
                    s0 += "%" + (oxf0 + ((u & 0x1c0000) >> 18)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0x3f000) >> 12)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                }
                else if (u > 0x7ff){// triple byte format
                    s0 += "%" + (0xe0 + ((u & 0xf000) >> 12)).toString(16);
                    s0 += "%" + (0x80 + ((u & 0xfc0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                }
                else {// double byte format
                    s0 += "%" + (0xc0 + ((u & 0x7c0) >> 6)).toString(16);
                    s0 += "%" + (0x80 + (u & 0x3f)).toString(16);
                }
            }
        }
    }
    return s0;
}

//템플릿 리스트
$(document).on("click", ".btn_temp", function () {
    var btn_nom = $(this).attr('data-n')
    $(".temp_view_"+btn_nom).toggleClass('on');
    $(this).toggleClass('on');
});

$(document).on("click", ".btn_close_list", function () {
    var btn_nom = $(this).attr('data-n')
    $(".temp_view_"+btn_nom).removeClass('on');
    $(".btn_temp").toggleClass('on');
});

$(".temp_view").click(function () {
    $(".temp_view").removeClass('on');
    $(".btn_temp").removeClass('on');
});

$(document).on("click", ".temp_view .arrow", function () {
    var offset = $(".temp_view").offset();
    $(".temp_view").offset(offset);
    $(".temp_view").css({position:'fixed'});
});

function set_Noti(noti) {
    var rtnVal = false;
    $.ajax({
        url: '/svchandler/Common.php',
        data: {
            action: 'set_noti',
            noti: noti,
            security: function() { return $("#token").val(); }
        },
        async: false,
        success: function (res) {
            if (res != "") {
                var r = JSON.parse(res);
                rtnVal = r.result;
            } else {
                rtnVal = false;
            }
        },
        error: function (res) {
            alert(res.responseText)
            rtnVal = false;
        }
    });
    return rtnVal;
}

function get_jobresponse(jm_seqno) {
    var rtnVal = false;
    $.ajax({
        url: '/svchandler/Konline.php',
        data: {
            action: 'get_jobresponse',
            jm_seqno: jm_seqno,
            security: function() { return $("#token").val(); }
        },
        async: false,
        success: function (res) {
            if (res != "") {
                var r = JSON.parse(res);
                xmlDoc = $.parseXML(decodeURIComponent(r.data.jm_response)),
                    $xml = $( xmlDoc ),
                    $pdf = $xml.find( "pdf" );
                window.open("https://wp.kinkos.co.kr"+$pdf.text());
            } else {
                rtnVal = false;
            }
        },
        error: function (res) {
            alert(res.responseText)
            rtnVal = false;
        }
    });
    return rtnVal;
}

function gf_isRequireValueCheck(p_form){

    var flag = true;
    var obj = $('#'+p_form).find('.required')

    obj.each(function(){

        if($(this).prop('type') == 'text'){
            if($(this).val() == ''){
                $(this).focus();
                flag = false;
                return false;
            }
        }

    });

    return flag;
}

// 업로드 파일 체크
function isNotUploadFile(file){
    // 제한 용량 MB
    var FILE_MB = 2048;
    // 허용 확장자
    var FILE_EXT = ["zip", "7z", "rar", "alz", "egg", "csv", "dbf", "dif", "doc", "docm", "docx", "dot", "dotm", "dotx", "emf", "mht", "odp", "ods", "odt", "pdf", "pot", "potm", "potx", "ppa", "ppam", "pps", "ppsm", "ppsx", "ppt", "pptm", "pptx", "prn", "rtf", "slk", "thmx", "wmf", "wmv", "wps", "xla", "xlam", "xls", "xlsb", "xlsm", "xlsx", "xlt", "xltm", "xltx", "xlw", "xml", "xps", "txt", "ai", "ait", "bmp", "cdr", "cgm", "css", "dc3", "dcm", "dib", "dic", "doc", "docx", "draw", "dwg", "dxf", "emf", "eps", "epsf", "gif", "icb", "id", "idea", "idml", "iff", "indb", "indd", "indl", "indt", "inx", "j2c", "j2k", "jp2", "jpc", "jpe", "jpeg", "jpf", "jpg", "jps", "jpx", "line", "mpo", "pam", "pbm", "pct", "pcx", "pdd", "pdf", "pdp", "pfm", "pgm", "pic", "pmd", "png", "pnm", "pns", "ppm", "ps", "psb", "psd", "psdt", "pxr", "raw", "rle", "sct", "sket", "svg", "svgz", "tdi", "tga", "tif", "tiff", "vda", "vst", "wmf", "xqx", "2b", "hwp", "hwt"];
    if(file.name != ""){
        // 확장자 체크
        var ext = file.name.split('.').pop().toLowerCase();
        if($.inArray(ext, FILE_EXT) == -1){
            alert(FILE_EXT.join(', ')+" 파일만 업로드 해주세요.");
            return true;
        }
        // 용량체크
        var fileSize = file.size;
        var maxSize = 1024 * 1024 * FILE_MB;
        if(fileSize > maxSize){
            alert("파일 업로드 크기 제한은 "+FILE_MB+"MB 입니다.");
            return true;
        }
    }
    return false;
}

//3자리 단위마다 콤마 생성
function addCommas(x) {
    if(!x) x = 0;
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}