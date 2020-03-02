var regmail1 = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
var regmail2 = /([0-9a-zA-Z_-]+)@([0-9a-zA-Z_-]+)\.([0-9a-zA-Z_-]+)/;
//	var reghp = /^\d{3}-\d{3,4}-\d{4}$/;
var reghp1 = /^01([0|1|6|7|8|9]?)-?([0-9]{3,4})-?([0-9]{4})$/; // 앞자리 번호 검증포함
var reghp2 = /^01([0|1|6|7|8|9]?)-?([0-9]{4})-?([0-9]{3})$/;   // 앞자리 번호 검증포함
var regtel = /^\d{2,3}-\d{3,4}-\d{4}$/;
//	var regId = /^[a-z0-9_]{6,12}$/; // 아이디 정규식(영문 소문자,숫자,_, 6~12 자리)

function check_mail_input(objValue) {
    if (!regmail1.test(objValue)) {
        if (!regmail2.test(objValue)) return false;
        else                          return true;
    } else
        return true;
}

// 사업자번호 규칙체크
function check_bizNo(num) {
    var str_value = num.split("-");
    if(str_value.length != 3) return false;
    var reg = /([0-9]{3})-?([0-9]{2})-?([0-9]{5})/;
    if (!reg.test(num)) return false;
    num = RegExp.$1 + RegExp.$2 + RegExp.$3;
    var cVal = 0;
    for (var i=0; i<8; i++) {
        var cKeyNum = parseInt(((_tmp = i % 3) == 0) ? 1 : ( _tmp == 1 ) ? 3 : 7);
        cVal += (parseFloat(num.substring(i,i+1)) * cKeyNum) % 10;
    }
    var li_temp = parseFloat(num.substring(i,i+1)) * 5 + '0';
    cVal += parseFloat(li_temp.substring(0,1)) + parseFloat(li_temp.substring(1,2));
    return (parseInt(num.substring(9,10)) == 10-(cVal % 10)%10);
}


function checkBizID(bizID) {
    // bizID는 숫자만 10자리로 해서 문자열로 넘긴다.
    var checkID = new Array(1, 3, 7, 1, 3, 7, 1, 3, 5, 1);
    var tmpBizID, i, chkSum=0, c2, remander;
    bizID = bizID.replace(/-/gi,'');

    for (i=0; i<=7; i++) chkSum += checkID[i] * bizID.charAt(i);
    c2 = "0" + (checkID[8] * bizID.charAt(8));
    c2 = c2.substring(c2.length - 2, c2.length);
    chkSum += Math.floor(c2.charAt(0)) + Math.floor(c2.charAt(1));
    remander = (10 - (chkSum % 10)) % 10 ;

    if (Math.floor(bizID.charAt(9)) == remander) return true ;
    else return false;
}


function check_all(f) {
    var chk = document.getElementsByName("chk[]");
    for (i=0; i<chk.length; i++)
        chk[i].checked = f.chkall.checked;
}

function check_all2( obj ) {
    if( obj )
    {
        obj = $(obj);
        var parentObj = obj.closest('.tbl_wrap_child');
        var chk = parentObj.find('input[name="chk[]"]');

        chk.each(function() {
           var chkObj = $(this);

            chkObj.prop('checked', obj.prop('checked'));
        });
    }


}

// 이미지 팝업창
function show_image(uid,img,width,height) {
    newWin = window.open("show_image.php?image="+img+"&uid="+uid,"show","width="+width+",height="+height+",toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no");
}

function show_mall_image(uid,img,width,height) {
    newWin = window.open("show_image.php?image="+img+"&uid="+uid,"show","width="+width+",height="+height+",toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no");
}

function show_board_image(img,db,width,height) {
    newWin = window.open("/board/show_board_image.php?image="+img+"&db_name="+db,"show","width="+width+",height="+height+",toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=yes,resizable=no");
}

var p_sel_num = 0;
function select_radio(num) {
    p_sel_num =  num;
}

function submit_vote() {
    if (p_sel_num == 0) {
        alert('설문 예제중에서 1개를 선택하신후 [투표] 버튼을 눌러주세요.');
        return;
    }
    winopen("m_poll_vote.php?num="+p_sel_num,"설문조사",500,500);
}

function view_vote() {
    winopen("m_poll_view.php?","설문조사",500,500);
}

function winopen(url,title,w,h) {
    newwin = window.open(url,title,"toolbar=0,location=0,status=0,menubar=0,scrollbars=yes,resizable=1,width=" + w + ",height=" + h + ",alwaysRadised=0");
    newwin.focus();
}

// 메인 로그인 부분
function check_login() {
    var m=document.xhsop_login;

    //alert(m.ps_murl.value);
    if(m.ps_ssl.value == 1 && m.ps_murl.value)
    {
        m.action = m.ps_murl.value;
    }

    if (m.login_id.value.length == "") {
        alert("아이디를 입력하여 주세요");
        m.login_id.focus();
        return false;
    }

    if (m.login_pass.value.length == "") {
        alert("패스워드를 입력하여 주세요");
        m.login_pass.focus();
        return false;
    }

}

// 좌측 로그인 부분
function check_left_login()
{
    var m=document.xshop_left_login;

    //alert(m.ps_murl.value);
    if(m.ps_ssl.value == 1 && m.ps_murl.value)
    {
        m.action = m.ps_murl.value;
    }

    if (m.login_id.value.length == "")
    {
        alert("아이디를 입력하여 주세요");
        m.login_id.focus();
        return false;
    }

    if (m.login_pass.value.length == "")
    {
        alert("패스워드를 입력하여 주세요");
        m.login_pass.focus();
        return false;
    }
}


// 회원 아이디나 찾기 패스워드 찾기
function check_member_loss() {
    var m=document.xshop_loss;

    if (m.loss_name.value.length == "") {
        alert(" 이름을 입력하여 주십시오. ");
        m.loss_name.focus();
        return false;
    }

    if (m.loss_email.value.length == "") {
        alert(" 이름을 입력하여 주십시오. ");
        m.loss_email.focus();
        return false;
    }

}

// 회원 탈퇴
function check_member_delete() {
    var m=document.xshop_delete;

    if (m.del_id.value.length == "") {
        alert(" 아이디를 입력하여 주십시오. ");
        m.del_id.focus();
        return false;
    }

    if (m.del_pass.value.length == "") {
        alert(" 패스워드를 입력하여 주십시오. ");
        m.del_pass.focus();
        return false;
    }

    if (m.del_name.value.length == "") {
        alert(" 이름을 입력하여 주십시오. ");
        m.del_name.focus();
        return false;
    }

    if (m.del_email.value.length == "") {
        alert(" 이메일을 입력하여 주십시오. ");
        m.del_email.focus();
        return false;
    }

}

// 간단한 서치
function check_top_search() {
    var m=document.xshop_top_search;

    if (m.ps_search.value.length == "") {
        alert("검색어를 입력하여 주십시오");
        m.ps_search.focus();
        return false;
    }
}

// 새창 열기 기본 스크립트

function open_window(name, url, left, top, width, height, toolbar, menubar, statusbar, scrollbar, resizable)
{
    toolbar_str = toolbar ? 'yes' : 'no';
    menubar_str = menubar ? 'yes' : 'no';
    statusbar_str = statusbar ? 'yes' : 'no';
    scrollbar_str = scrollbar ? 'yes' : 'no';
    resizable_str = resizable ? 'yes' : 'no';

    newWin= window.open(url, name, 'left='+left+',top='+top+',width='+width+',height='+height+',toolbar='+toolbar_str+',menubar='+menubar_str+',status='+statusbar_str+',scrollbars='+scrollbar_str+',resizable='+resizable_str);
}

// 회원 약관 확인 폼
function check_license_submit() {
    if(!document.license.accept.checked) {
        alert("[회원 약관 및 개인정보 보호정책] 을\n\n읽으시고 동의하시는 분만 회원 가입을 하실수 있습니다..\n\n모두 읽으신후 동의하시면 체크를 하신후 회원 가입하여 주세요");
        return false;
    }
    return true;
}



// 아이디 중복 검사 ( 회원 )
function open_member_overlap() {
    var m=document.xshop;

    if (m.id.value == "") {
        alert("ID는 필수 사항 입니다. 입력해 주세요.");
        m.id.focus();
        return false;
    }

    if ((m.id.value.length < 4) || (m.id.value.length > 16)) {
        alert("ID는 4글자 이상, 15글자 이하이여야 합니다.");
        m.id.focus();
        return false;
    }

    window.open("/member/search_id.php?form=xshop&focus=id&muid="+m.id.value,"overlap","width=420,height=300,toolbar=no,location=no,directories=no,status=no,menubar=no,scrollbars=no,resizable=no");
}

// 회원 가입 체크폼
function check_member_form() {
    var m=document.xshop;

//alert(m.ps_murl.value);
    if(m.ps_ssl.value == 1 && m.ps_murl.value)
    {
        m.action = m.ps_murl.value;
    }

    if ((m.id.value.length < 4) || (m.id.value.length > 16)) {
        alert("[아이디]는 4글자 이상, 15글자 이하이여야 합니다.");
        m.id.focus();
        return false;
    }

    if (m.pass1.value.length < 4 || (m.id.value.length > 16)) {
        alert("[비밀번호]는 4글자 이상, 15글자 이하이여야 합니다.");
        m.pass1.focus();
        return false;
    }

    if ((m.pass1.value) != (m.pass2.value)) {
        alert("비밀번호 같지 않습니다 정확히 입력해 주세요. ");
        m.pass1.focus();
        return false;
    }

    if (m.name.value.length == "") {
        alert("[이름]는 필수 항목입니다. 입력 하여 주세요.");
        m.name.focus();
        return false;
    }

    if (m.email.value.length < 4) {
        alert("[E-mail] 주소가 부정확합니다. 확인해 주십시오");
        m.email.focus();
        return false;
    }

    if ((m.zip1.value.length == "") || (m.zip2.value.length == "")) {
        alert("우편번호를 입력하여 주세요");
        m.zip1.focus();
        return false;
    }


    if (m.tel1.value.length == "") {
        alert("전화를 입력하여 주세요");
        m.tel1.focus();
        return false;
    }

    if (m.address1.value.length == "") {
        alert("주소를 입력하여 주세요");
        m.member_address.focus();
        return false;
    }

}



function check_userinfo() {
    var m=document.xshop;

//alert(m.ps_murl.value);
    if(m.ps_ssl.value == 1 && m.ps_murl.value)
    {
        m.action = m.ps_murl.value;
    }

    if ( m.buyer_name1.value.length == "" ) {
        alert("[구매자 성함]는 필수 항목 입니다. 입력해 주십시오." );
        m.buyer_name1.focus();
        return false;
    }
    if ( m.buyer_tel1.value.length == "" ) {
        alert( "[전화번호]는 필수 항목 입니다. 입력해 주십시오." );
        m.buyer_tel1.focus();
        return false;
    }
    if ( m.buyer_tel2.value.length == "" ) {
        alert( "[전화번호]는 필수 항목 입니다. 입력해 주십시오." );
        m.buyer_tel2.focus();
        return false;
    }
    if ( m.buyer_tel3.value.length == "" ) {
        alert( "[전화번호]는 필수 항목 입니다. 입력해 주십시오." );
        m.buyer_tel3.focus();
        return false;
    }
    if ( m.buyer_phone1.value.length == "" ) {
        alert( "[휴대번호]는 필수 항목 입니다. 입력해 주십시오." );
        m.buyer_phone1.focus();
        return false;
    }
    if ( m.buyer_phone2.value.length == "" ) {
        alert( "[휴대번호]는 필수 항목 입니다. 입력해 주십시오." );
        m.buyer_phone2.focus();
        return false;
    }
    if ( m.buyer_phone3.value.length == "" ) {
        alert( "[휴대번호]는 필수 항목 입니다. 입력해 주십시오." );
        m.buyer_phone3.focus();
        return false;
    }
    if ( m.zip1.value.length == "" || m.zip2.value.length == "") {
        alert( "[우편번호]는 필수 항목 입니다. 입력해 주십시오." );
        m.zip1.focus();
        return false;
    }

    if ( m.address1.value.length == "" ) {
        alert( "[구매자 주소]는 필수 항목 입니다. 입력해 주십시오." );
        m.address1.focus();
        return false;
    }
    if ( m.address2.value.length == "" ) {
        alert( "[구매자 상세주소]는 필수 항목 입니다. 입력해 주십시오." );
        m.address1.focus();
        return false;
    }
    if ( m.buyer_email.value.length == "" ) {
        alert( "[구매자 메일]는 필수 항목 입니다. 입력해 주십시오." );
        m.buyer_email.focus();
        return false;
    }



    if ( m.buyer_name3.value.length == "" ) {
        alert("[수신자 성함]는 필수 항목 입니다. 입력해 주십시오." );
        m.buyer_name3.focus();
        return false;
    }

    if ( m.buyer_tel4.value.length == "" ) {
        alert( "[전화번호]는 필수 항목 입니다. 입력해 주십시오." );
        m.buyer_tel4.focus();
        return false;
    }
    if ( m.buyer_tel5.value.length == "" ) {
        alert( "[전화번호]는 필수 항목 입니다. 입력해 주십시오." );
        m.buyer_tel5.focus();
        return false;
    }
    if ( m.buyer_tel6.value.length == "" ) {
        alert( "[전화번호]는 필수 항목 입니다. 입력해 주십시오." );
        m.buyer_tel6.focus();
        return false;
    }
    if ( m.buyer_phone4.value.length == "" ) {
        alert( "[휴대번호]는 필수 항목 입니다. 입력해 주십시오." );
        m.buyer_phone4.focus();
        return false;
    }
    if ( m.buyer_phone5.value.length == "" ) {
        alert( "[휴대번호]는 필수 항목 입니다. 입력해 주십시오." );
        m.buyer_phone5.focus();
        return false;
    }
    if ( m.buyer_phone6.value.length == "" ) {
        alert( "[휴대번호]는 필수 항목 입니다. 입력해 주십시오." );
        m.buyer_phone6.focus();
        return false;
    }
    if ( m.zip3.value.length == "" || m.zip4.value.length == "") {
        alert( "[우편번호]는 필수 항목 입니다. 입력해 주십시오." );
        m.zip3.focus();
        return false;
    }

    if ( m.address3.value.length == "" ) {
        alert( "[구매자 주소]는 필수 항목 입니다. 입력해 주십시오." );
        m.address3.focus();
        return false;
    }

    if ( m.address4.value.length == "" ) {
        alert( "[구매자 상세주소]는 필수 항목 입니다. 입력해 주십시오." );
        m.address4.focus();
        return false;
    }

    if ( m.buyer_email1.value.length == "" ) {
        alert( "[구매자 메일]는 필수 항목 입니다. 입력해 주십시오." );
        m.buyer_email1.focus();
        return false;
    }

    if(m.buyer_payment[1].checked)
    {
        if ( m.buyer_name2.value.length == "" ) {
            alert( "[입금자명]은 필수 항목 입니다. 입력해 주십시오." );
            m.buyer_name2.focus();
            return false;
        }
    }
}


function check_userinfo_confirm() {
    var m=document.xshop;

//alert(m.ps_murl.value);
    if(m.ps_ssl.value == 1 && m.ps_murl.value)
    {
        m.action = m.ps_murl.value;
    }

}

// 같은 내용 카피
function accept_check(){
    var m = document.xshop;
    m.buyer_name3.value = m.buyer_name1.value;
    m.buyer_tel4.value = m.buyer_tel1.value;
    m.buyer_tel5.value = m.buyer_tel2.value;
    m.buyer_tel6.value = m.buyer_tel3.value;

    m.buyer_phone4.value = m.buyer_phone1.value;
    m.buyer_phone5.value = m.buyer_phone2.value;
    m.buyer_phone6.value = m.buyer_phone3.value;
    m.buyer_email1.value = m.buyer_email.value

    m.zip3.value = m.zip1.value;
    m.zip4.value = m.zip2.value;
    m.address3.value = m.address1.value;
    m.address4.value = m.address2.value;

}

// 에러시 체크
function error (elem,text) {
    window.alert(text);
    elem.select();
    elem.focus();
}


// 주민번호 체크
function jumincheck(jumin1 ,jumin2) {

    var str_jumin1 = jumin1.value;
    var jumin1_err = jumin1;
    var str_jumin2 = jumin2.value;
    var jumin2_err = jumin2;
    var checkImg='';


    var i3=0
    for (var i=0;i<str_jumin1.length;i++)
    {
        var ch1 = str_jumin1.substring(i,i+1);
        if (ch1<'0' || ch1>'9') { i3=i3+1 }
    }
    if ((str_jumin1 == '') || ( i3 != 0 ))
    {
        error(jumin1_err,'주민등록번호가 잘못되었습니다.\n\n다시입력해주세요!');
        return false;
    }


    var i4=0
    for (var i=0;i<str_jumin2.length;i++)
    {
        var ch1 = str_jumin2.substring(i,i+1);
        if (ch1<'0' || ch1>'9') { i4=i4+1 }
    }
    if ((str_jumin2 == '') || ( i4 != 0 ))
    {
        error(jumin2_err,'주민등록번호가 잘못되었습니다.\n\n다시입력해주세요!');
        return false;
    }

//		if(str_jumin1.substring(0,1) < 4)
//		{
//   	  error(jumin2_err,'주민등록번호가 잘못되었습니다.\n\n다시입력해주세요!');
//   	  return false;
//		}

    if(str_jumin2.substring(0,1) > 2)
    {
        error(jumin2_err,'주민등록번호가 잘못되었습니다.\n\n다시입력해주세요!');
        return false;
    }

    if((str_jumin1.length > 7) || (str_jumin2.length > 8))
    {
        error(jumin2_err,'주민등록번호가 잘못되었습니다.\n\n다시입력해주세요!');
        return false;
    }

    if ((str_jumin1 == '72') || ( str_jumin2 == '18'))
    {
        error(jumin1_err,'주민등록번호가 잘못되었습니다.\n\n다시입력해주세요!');
        return false;
    }

    var f1=str_jumin1.substring(0,1)
    var f2=str_jumin1.substring(1,2)
    var f3=str_jumin1.substring(2,3)
    var f4=str_jumin1.substring(3,4)
    var f5=str_jumin1.substring(4,5)
    var f6=str_jumin1.substring(5,6)
    var hap=f1*2+f2*3+f3*4+f4*5+f5*6+f6*7
    var l1=str_jumin2.substring(0,1)
    var l2=str_jumin2.substring(1,2)
    var l3=str_jumin2.substring(2,3)
    var l4=str_jumin2.substring(3,4)
    var l5=str_jumin2.substring(4,5)
    var l6=str_jumin2.substring(5,6)
    var l7=str_jumin2.substring(6,7)
    hap=hap+l1*8+l2*9+l3*2+l4*3+l5*4+l6*5
    hap=hap%11
    hap=11-hap
    hap=hap%10
    if (hap != l7)
    {
        error(jumin1_err,'주민등록번호가 잘못되었습니다.\n\n다시입력해주세요!');
        return false;
    }


    var i9=0

    return true;

}


function check_member_modify() {
    var m=document.xshop;

//alert(m.ps_murl.value);
    if(m.ps_ssl.value == 1 && m.ps_murl.value)
    {
        m.action = m.ps_murl.value;
    }


    if (m.pass1.value.length > 0) {
        if (m.pass1.value.length < 4) {
            alert("비밀 번호는 4글자 이상이어야 합니다.");
        }

        if ((m.pass1.value) != (m.pass2.value)) {
            alert("비밀번호 같지 않습니다 정확히 입력해 주세요. ");
            m.pass1.focus();
            return false;
        }
    }

    if (m.name.value.length == "") {
        alert("[이름]는 필수 항목입니다. 입력 하여 주세요.");
        m.name.focus();
        return false;
    }

    if (m.email.value.length < 4) {
        alert("[E-mail] 주소가 부정확합니다. 확인해 주십시오");
        m.email.focus();
        return false;
    }

    if ((m.zip1.value.length == "") || (m.zip2.value.length == "")) {
        alert("우편번호를 입력하여 주세요");
        m.zip1.focus();
        return false;
    }

    if (m.address1.value.length == "") {
        alert("주소를 입력하여 주세요");
        m.address1.focus();
        return false;
    }

    if (m.tel1.value.length == "") {
        alert("전화를 입력하여 주세요");
        m.tel1.focus();
        return false;
    }


}


// 삭제시 물어보는 스크립트
function del_really(){
    if (confirm('\n삭제는 복구가 불가능합니다.\n삭제시 데이터는 완전 삭제됩니다.\n\n(정말로 삭제하시겠습니까?)\n')) return true;
    return false;
}

// 폼 메일러
function xshop_mailer_check() {
    var m=document.xshop_mailer;

    if (m.mailer_receive_email.value.length == "") {
        alert("받는분 이메일은 필수 입니다.");
        m.mailer_receive_email.focus();
        return false;
    }

    if (m.mailer_subject.value.length == "") {
        alert("메일 제목은 필수 입니다.");
        m.mailer_subject.focus();
        return false;
    }

    if (m.mailer_body.value.length == "") {
        alert("메일 내용은 필수 입니다.");
        m.mailer_body.focus();
        return false;
    }

}

// 폼 메일러
function xshop_recommend_check() {
    var m=document.xshop_mailer;

    if (m.mailer_receive_email.value.length == "") {
        alert("받는분 이메일은 필수 입니다.");
        m.mailer_receive_email.focus();
        return false;
    }
}

function really_all(){
    if (confirm('\n삭제는 복구가 불가능합니다.\n삭제시 데이터는 완전 삭제됩니다.\n\n(정말로 삭제 하시겠습니까?)\n'))
    {
        document.uid_check_form.submit();
    }
    return false;
}

if (navigator.userAgent.toLowerCase().indexOf("msie") != -1) {
    try { document.execCommand('BackgroundImageCache', false, true); } catch(e) {}
}

// Trim 함수 ##################################################
// Ex) str = "    테 스트   ".trim(); => str = "테 스트";
String.prototype.trim = function() {
    return this.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g,'');
}

// 문자열 공백제거 함수 ##################################################
// Ex) str = "    테 스   트   ".stripspace(); => str = "테스트";
String.prototype.stripspace = function() {
    return this.replace(/ /g, '');
}

// 전체 문자열 바꾸기 함수 ##################################################
// Ex) str = "a테스트bcd테스트efg".replaceAll("테스트", ""); => str = "abcdefg";
String.prototype.replaceAll = function(a, b) {
    var s = this;
    var n1, n2, s1, s2;

    while (true) {
        if ( s=="" || a=="" ) break;
        n1 = s.indexOf(a);
        if ( n1 < 0 ) break;
        n2 = n1 + a.length;
        if ( n1==0 ) {
            s1 = b;
        }
        else {
            s1 = s.substring(0, n1) + b;
        }
        if ( n2 >= s.length ) {
            s2 = "";
        }
        else {
            s2 = s.substring(n2, s.length);
        }
        s = s1 + s2;
    }
    return s;
}

// 이벤트 추가 ##################################################
function addEvent(obj, type, listener) {
    if (window.addEventListener) obj.addEventListener(type, listener, false);
    else obj.attachEvent('on'+type, listener);
}

// 이벤트 추가 ##################################################
function removeEvent(obj, type, listener) {
    if (window.removeEventListener) obj.removeEventListener(type, listener, false);
    else obj.detachEvent('on'+type, listener);
}

// 팝업 ##################################################
function openPopup(theURL, winName, width, height, remFeatures) {
    var features = "";
    if (typeof winName == "undefined") winName = "";
    if (typeof width != "undefined") features += ((features) ? "," : "")+"width="+width;
    if (typeof height != "undefined") features += ((features) ? "," : "")+"height="+height;
    if (typeof remFeatures != "undefined") features += ((features) ? "," : "")+remFeatures;
    if (features.indexOf("status") < 0) features += ",status=yes";

    var popup = window.open(theURL, winName, features);
    popup.focus();

    return popup;
}

// 팝업 - 팝업창 화면중앙 오픈 ##################################################
function openPopupCenter(theURL, winName, width, height, remFeatures) {
    var left = (screen.width/2) - (width/2);
    var top = (screen.availHeight/2) - (height/2);
    var features = "left="+left+",top="+top+",width="+width+",height="+height;
    if (typeof winName == "undefined") winName = "";
    if (typeof remFeatures != "undefined") features += ","+remFeatures;
    if (features.indexOf("status") < 0) features += ",status=yes";

    var popup = window.open(theURL, winName, features);
    popup.focus();

    return popup;
}

// 팝업 - 팝업창 사이즈 조정 ##################################################
function resizePopupWindow(width, height) {
    var strAgent = navigator.userAgent.toLowerCase();
    var isIE7 = (strAgent.indexOf('msie 7.0') != -1);
    var isMoz = (strAgent.indexOf('gecko') != -1);
    window.resizeTo(width+10, height+(isIE7?71:(isMoz?81:49)));
}

// 팝업 - 팝업창 위치 조정 ##################################################
function movePopupWindow(left, top) {
    window.moveTo(left, top);
}

// 모달 ##################################################
function MM_openModal(theURL, obj, features) {
    window.showModalDialog(theURL, obj, features);
}

// 키 관련 함수 ##################################################
function blockKey(e) {
    var e = window.event || e;
    if (window.event) {
        e.returnValue = false;
    }
    else {
        if (e.which != 8) e.preventDefault(); // 8 : Back Space
    }
}

function blockEnter(e) {
    var e = window.event || e;
    if (window.event) {
        if (e.keyCode == 13) e.returnValue = false;
    }
    else {
        if (e.which == 13) e.preventDefault();
    }
}

function blockNotNumber(e) {
    var e = window.event || e;
    if (window.event) {
        if (e.keyCode < 48 || e.keyCode > 57) e.returnValue = false;
    }
    else {
        if (e.which != 8 && (e.which < 48 || e.which > 57)) e.preventDefault(); // 8 : Back Space
    }
}

function onEnter(e, exec) {
    var e = window.event || e;
    var keyCode = (window.event) ? e.keyCode : e.which;
    if (keyCode == 13) eval(exec);
}

// 즐겨찾기 추가 ##################################################
// 예) <a href="javascript:;" onClick="addFavorites('홈페이지', 'http://www.homepage.com');">즐겨찾기 등록</a>
function addFavorites(title, url) {
    if (document.all) { // IE
        window.external.AddFavorite(url, title);
    }
    else if (window.sidebar) { // Firefox
        window.sidebar.addPanel(title, url, "");
    }
    else { // Opera, Safari ...
        alert("현재 브라우져에서는 이용할 수 없습니다.");
        return;
    }
}

// 시작페이지 설정 ##################################################
// 예) <a href="javascript:;" onClick="setStartPage(this, 'http://www.homepage.com');">시작페이지로</a>
function setStartPage(obj, url) {
    if (document.all && window.external) { // IE
        obj.style.behavior = "url(#default#homepage)";
        obj.setHomePage(url);
    }
    else { // Firefox, Opera, Safari ...
        alert("현재 브라우져에서는 이용할 수 없습니다.");
        return;
    }
}

// 페이지 이동 ##################################################
function gotoUrl(url) {
    if (url.stripspace() != "") {
        location.href = url;
    }
}

// 페이지 최상단으로 ##################################################
function goTop() {
    window.scrollTo(0, 0);
}

// 이미지 미리보기 ##################################################
function previewImage(obj, imgId) {
    var objImg = document.getElementById(imgId);

    if (obj.value.stripspace() == "") return;

    var ext = getFileExt(obj.value).toUpperCase();

    if (ext == 'JPG' || ext == 'GIF' || ext == 'BMP' || ext == 'PNG') objImg.src = obj.value;
}

// 이미지 사이즈 줄이기 ##################################################
function resizeImage(objImg, limitId) {
    if (typeof (objImg) != "object") objImg = document.getElementById(objImg);
    var objParent = objImg.parentNode;
    var imgWidth = parseInt(objImg.width, 10);
    var fixWidth = imgWidth;

    if (typeof limitId == 'undefined') return;

    while (objParent) {
        if (objParent && objParent.id == limitId) {
            fixWidth = objParent.clientWidth;
            break;
        }
        objParent = objParent.offsetParent;
    }

    if (imgWidth > fixWidth) {
        objImg.width = fixWidth;
    }
}

function resizeImageAll(limitId) {
    var objLimit = document.getElementById(limitId);
    if (objLimit) {
        var fixWidth = objLimit.clientWidth;
        var arrImgs = objLimit.getElementsByTagName("IMG");
        for (var i=0, len=arrImgs.length; i<len; i++) {
            if (parseInt(arrImgs[i].width, 10) > fixWidth) {
                arrImgs[i].width = fixWidth;
            }
        }
    }
}

// IFRAME RESIZE 함수 ##################################################
function resizeFrame(iframeWindow, minWidth, minHeight, fixWidth, fixHeight) {
    if (!iframeWindow.name) return false;

    var iframeElement = document.getElementById(iframeWindow.name);
    var resizeWidth = 0;
    var resizeHeight = 0;

    minWidth = (minWidth ? parseInt(minWidth, 10) : 0);
    minHeight = (minHeight ? parseInt(minHeight, 10) : 0);
    fixWidth = (fixWidth ? parseInt(fixWidth, 10) : 0);
    fixHeight = (fixHeight ? parseInt(fixHeight, 10) : 0);

    if (document.all) { // ie
        if (iframeWindow.document.compatMode && iframeWindow.document.compatMode != 'BackCompat') {
            resizeWidth = iframeWindow.document.documentElement.scrollWidth;
            resizeHeight = iframeWindow.document.documentElement.scrollHeight;
        }
        else {
            resizeWidth = iframeWindow.document.body.scrollWidth;
            resizeHeight = iframeWindow.document.body.scrollHeight;
        }
    }
    else {
        resizeWidth = iframeWindow.document.body.scrollWidth;
        resizeHeight = iframeWindow.document.body.scrollHeight;
    }

    if (minWidth > 0 && resizeWidth < minWidth) resizeWidth = minWidth;			// 최소 폭
    if (minHeight > 0 && resizeHeight < minHeight) resizeHeight = minHeight;		// 최소 높이

    if (fixWidth > 0) resizeWidth = fixWidth;		// 고정 폭
    if (fixHeight > 0) resizeHeight = fixHeight;	// 고정 높이

    if (fixWidth > -1) iframeElement.style.width = resizeWidth + 'px';
    if (fixHeight > -1) iframeElement.style.height = resizeHeight + 'px';
}

// 현재 이벤트객체 Index 가져오기 ##################################################
function getDisObjIdx(obj) {
    var i = 0;
    var result = 0;

    var arrTag = document.getElementsByTagName(obj.tagName);

    if (obj.sourceIndex) {
        while (arrTag[i].sourceIndex < obj.sourceIndex) {
            if (arrTag[i].id == obj.id) ++result;
            ++i;
        }
    }
    else if (obj.compareDocumentPosition) {
        while ((arrTag[i].compareDocumentPosition(obj) & 6) - 3 > 0) {
            if (arrTag[i].id == obj.id) ++result;
            ++i;
        }
    }

    return result;
}

// 체크박스 전체선택 ##################################################
function checkCbAll(cbList, isChecked) {
    if (cbList) {
        if (typeof(cbList.length) == "undefined") {
            if (!cbList.disabled) cbList.checked = isChecked;
        }
        else {
            for (var i=0; i<cbList.length; i++) {
                if (cbList[i].type.toUpperCase() == 'CHECKBOX') {
                    if (cbList[i].value.stripspace() != "" && !cbList[i].disabled) {
                        cbList[i].checked = isChecked;
                    }
                }
            }
        }
    }
}

// 텍스트 길이 확인 (일반) ##################################################
function checkTextLen(obj, mLen) {
    if (obj.value.length > mLen){
        alert("1~"+mLen+"자까지 입력이 가능합니다.");
        obj.value = obj.value.substring(0, mLen);
        obj.focus();
        return false;
    }

    return true;
}

// 텍스트 길이 확인 (Byte) ##################################################
function checkTextLenByte(obj, mLen) {
    var i, len;
    var byteLen = 0;
    var value = obj.value;

    for (i=0, len=value.length; i<len; i++) {
        ++byteLen;

        if ((value.charCodeAt(i) < 0) || (value.charCodeAt(i) > 127)) ++byteLen;

        if (byteLen > mLen) {
            alert("1~"+(mLen / 2)+"자의 한글, 또는 2~"+mLen+"자의 영문, 숫자, 문장기호로 입력이 가능합니다.");
            obj.value = value.substring(0, i);
            obj.focus();
            return false;
        }
    }

    return true;
}

// 객체 Offset 가져오기 ##################################################
function getOffset(obj) {
    var offset = { left : 0, top : 0 };
    var parent = obj.offsetParent;

    offset.left = parseInt(obj.offsetLeft, 10);
    offset.top = parseInt(obj.offsetTop, 10);

    while (parent) {
        if (navigator.userAgent.toLowerCase().indexOf("msie") != -1) {
            offset.left += parseInt(parent.offsetLeft, 10)+(isNaN(parseInt(parent.currentStyle.borderLeftWidth, 10))?0:parseInt(parent.currentStyle.borderLeftWidth, 10));
            offset.top += parseInt(parent.offsetTop, 10)+(isNaN(parseInt(parent.currentStyle.borderTopWidth, 10))?0:parseInt(parent.currentStyle.borderTopWidth, 10));
        }
        else {
            offset.left += parseInt(parent.offsetLeft, 10);
            offset.top += parseInt(parent.offsetTop, 10);
        }
        parent = parent.offsetParent;
    }

    return offset;
}

// 텍스트 Byte 길이 가져오기 ##################################################
function getTextByte(value) {
    var i, len;
    var byteLen = 0;

    for (i=0, len=value.length; i<len; i++) {
        if (escape(value.charAt(i)).length >= 4) {
            byteLen += 2;
        }
        else if (escape(value.charAt(i)) != "%0D") {
            ++byteLen;
        }
    }

    return byteLen;
}

// 입력 문자길이 확인후 다음항목으로 포커스 옮기기 ##################################################
function goNextFocus(obj, len, next_item) {
    if (obj.value.stripspace().length == len){
        next_item.focus();
    }
}

// 영문 문자열 확인 ##################################################
function strEngCheck(value){
    var i;

    for(i=0;i<value.length-1;i++){
        // 한글 체크 (한글 ASCII코드 : 12593부터)
        if (value.charCodeAt(i) > 12592) return false;
        // 공백 체크
        if (value.charAt(i) == " ") return false;
    }
    return true;
}

// 파일명 확인 ##################################################
function checkFileName(obj) {
    var result = false;

    if (obj.value.stripspace() != "") {
        var fidx = obj.value.lastIndexOf("\\")+1;
        var filename = obj.value.substr(fidx, obj.value.length);
        result = strEngCheck(filename);
    }

    if (!result) {
        alert("파일명을 반드시 영문 또는 숫자로 해주세요.");
        obj.focus();
        return false;
    }
    return true;
}

// 파일 확장자 ##################################################
function getFileExt(value) {
    if (value != "") {
        var fidx = value.lastIndexOf("\\")+1;
        var filename = value.substr(fidx, value.length);
        var eidx = filename.lastIndexOf(".")+1;

        return filename.substr(eidx, filename.length);
    }
}

// 파일확장자 확인 ##################################################
function checkFileExt(obj, exts, errMsg) {
    var arrExt = exts.toLowerCase().split(",");
    var result = false;

    if (obj.value.stripspace() != "") {
        var ext = getFileExt(obj.value).toLowerCase();

        for (var i=0; i<arrExt.length; i++) {
            if (arrExt[i].trim() == ext) result = true;
        }
    }

    if (!result) {
        alert(errMsg);
        obj.focus();
        return false;
    }
    return true;
}

// 영문/숫자 혼용 확인 ##################################################
function checkEngNum(str) {
    var RegExpE = /[a-zA-Z]/i;
    var RegExpN = /[0-9]/;

    return (RegExpE.test(str) && RegExpN.test(str)) ? true : false;
}

// 특수문자 확인 ##################################################
function checkSpecialChar(value) {
    var specialChar = "`~!@#$%^&*_+=|\\[]{}:;,<.>/?'\"";
    for (var i=0, len=specialChar.length; i<len; i++) {
        if (value.indexOf(specialChar.substr(i, 1)) != -1) return true;
    }
    return false;
}

// 아이디 확인 ##################################################
function checkID(value, min, max) {
    var RegExp = /^[a-zA-Z0-9_]*$/i;
    var returnVal = RegExp.test(value) ? true : false;
    if (typeof(min) != "undefined" && value.length < min) returnVal = false;
    if (typeof(max) != "undefined" && value.length > max) returnVal = false;
    return returnVal;
}

// 비밀번호 확인 ##################################################
function checkPass(value, min, max) {
    var RegExp = /^[a-zA-Z0-9]*$/i;
    var returnVal = RegExp.test(value) ? true : false;
    if (typeof(min) != "undefined" && value.length < min) returnVal = false;
    if (typeof(max) != "undefined" && value.length > max) returnVal = false;
    return returnVal;
}

// 숫자 확인 ##################################################
function checkNum(value, isDec) {
    var RegExp;

    if (!isDec) isDec = false;
    RegExp = (isDec) ? /^-?[\d\.]*$/ : /^-?[\d]*$/;

    return RegExp.test(value)? true : false;
}

// 이메일 확인 ##################################################
function checkEmail(email) {
    if (email.search(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/) != -1) {
        return true;
    }
    else {
        return false;
    }
}

// URL 확인 ##################################################
function checkUrl(url) {
    var exp = new RegExp("^(http|https)\:\/\/");
    if (exp.test(url.toLowerCase())) {
        return true;
    }
    else {
        return false;
    }
}

// 공백 확인 ##################################################
function checkEmpty(obj) {
    if (obj.value.stripspace() == "") {
        return true;
    }
    else {
        return false;
    }
}

// Radio(CheckBox) 설정값 가져오기 ##################################################
function getRadioVal(obj) {
    var i, value = "";

    if (obj) {
        if (typeof(obj.length) == "undefined") {
            if (obj.checked) {
                value = obj.value;
            }
        }
        else {
            for (i=0; i<obj.length; i++) {
                if (obj[i].checked) {
                    value = obj[i].value;
                    break;
                }
            }
        }
    }
    return value;
}

// Radio 설정하기 ##################################################
function setRadioVal(obj, value) {
    var i;

    if (obj) {
        if (typeof(obj.length) == "undefined") {
            if (obj.value == value) {
                obj.checked = true;
            }
        }
        else {
            for(i=0; i<obj.length; i++) {
                if (obj[i].value == value) {
                    obj[i].checked = true;
                    break;
                }
            }
        }
    }
}

// Radio Disabled 설정하기 ##################################################
function setRadioDisabled(obj, value, disabled) {
    var i;

    if (obj) {
        if (typeof(obj.length) == "undefined") {
            if (obj.value == value) {
                obj.disabled = disabled;
            }
        }
        else {
            for(i=0; i<obj.length; i++) {
                if (obj[i].value == value) {
                    obj[i].disabled = disabled;
                    break;
                }
            }
        }
    }
}

// Form Disabled 전체 설정하기 ##################################################
function setRadioDisabledAll(obj, disabled) {
    var i;

    if (obj) {
        if (typeof(obj.length) == "undefined") {
            obj.disabled = disabled;
        }
        else {
            for(i=0; i<obj.length; i++) {
                obj[i].disabled = disabled;
            }
        }
    }
}

// Select 설정값 가져오기 ##################################################
function getSelectVal(obj) {
    var value = "";
    var idx = obj.selectedIndex;

    if (idx >= 0){
        value = obj.options[idx].value;
    }

    return value;
}

// Select Option 추가 ##################################################
function selectAddList(obj, text, value) {
    var newOpt = document.createElement("OPTION");
    newOpt.text = text;
    newOpt.value = value;
    newOpt.defaultSelected = true;
    newOpt.selected = true;
    obj.options.add(newOpt);
}

// Select Option 전체삭제 ##################################################
function selectRemoveAll(obj) {
    for (var i=obj.length-1; i>=0; i--) {
        selectRemoveList(obj, i);
    }
}

// Select Option 삭제 ##################################################
function selectRemoveList(obj, i) {
    obj.remove(i);
}

// Hidden 추가 ##################################################
function addHidden(f, name, value) {
    var input = document.createElement('INPUT');
    input.type = 'HIDDEN';
    input.name = name;
    input.value = value;
    f.appendChild(input);
}

// 숫자 문자열에서 문자열 제거 ##################################################
function stripCharFromNum(value, isDec) {
    var i;
    var minus = "-";
    var nums = "1234567890"+((isDec) ? "." : "");
    var result = "";

    for(i=0; i<value.length; i++) {
        numChk = value.charAt(i);
        if (i == 0 && numChk == minus) {
            result += minus;
        }
        else {
            for(j=0; j<nums.length; j++) {
                if(numChk == nums.charAt(j)) {
                    result += nums.charAt(j);
                    break;
                }
            }
        }
    }
    return result;
}

// 콤마(,) 제거 ##################################################
function stripComma(str) {
    var re = /,/g;
    return str.replace(re, "");
}

// 숫자 3자리수마다 콤마(,) 찍기 ##################################################
function formatComma(num, pos) {
    if (!pos) pos = 0;  //소숫점 이하 자리수
    var re = /(-?\d+)(\d{3}[,.])/;

    var strNum = stripComma(num.toString());
    var arrNum = strNum.split(".");

    arrNum[0] += ".";

    while (re.test(arrNum[0])) {
        arrNum[0] = arrNum[0].replace(re, "$1,$2");
    }

    if (arrNum.length > 1) {
        if (arrNum[1].length > pos) {
            arrNum[1] = arrNum[1].substr(0, pos);
        }
        return arrNum.join("");
    }
    else {
        return arrNum[0].split(".")[0];
    }
}

// 내림 ##################################################
// num: 대상 숫자, pos: 대상 자리수
function setFloor(num, pos) {
    if(!pos) pos = 0;
    return Math.floor(num * Math.pow(10, pos)) / Math.pow(10, pos);
}

// 반올림 ##################################################
// num: 대상 숫자, pos: 대상 자리수
function setRound(num, pos) {
    if(!pos) pos = 0;
    return Math.round(num * Math.pow(10, pos)) / Math.pow(10, pos);
}

// 올림 ##################################################
// num: 대상 숫자, pos: 대상 자리수
function setCeil(num, pos) {
    if(!pos) pos = 0;
    return Math.ceil(num * Math.pow(10, pos)) / Math.pow(10, pos);
}

// 강제 소수점 이하 0채우기 ##################################################
// num: 대상 숫자, pos: 출력을 원하는 소수점자리수
function setRoundZero(num, pos) {
    var strNum = stripComma(num.toString());
    var arrNum = strNum.split(".");

    if (arrNum.length <= 1) {
        num = arrNum[0]+".";
        for (var i=0; i<pos; i++) {
            num += "0";
        }
    }
    else {
        num = setRound(num, pos);
    }
    return num;
}

// 소수점 이하 자리수 확인 ##################################################
// num: 대상 숫자, pos: 희망 소수점 이하자리수
function checkRound(num, len) {
    var strNum = stripComma(num.toString());
    var arrNum = strNum.split(".");

    if (arrNum.length > 1 && arrNum[1].length > len) return false;
    else return true;
}

// 숫자 문자열에서 "0" 시작문자 제거 ##################################################
function removePreZero(str) {
    var i, result;

    if (str == "0") return str;

    for (i = 0; i<str.length; i++) {
        if (str.substr(i,1) != "0") break;
    }

    result = str.substr(i, str.length-i);
    return result;
}

// 통화형태로 변환 ##################################################
function toCurrency(obj) {
    if (obj.disabled) return false;

    var num = obj.value.stripspace();
    if (num == "") return false;

    if (!checkNum(stripComma(num))) {
        //alert ("숫자만 입력해주세요.");
        num = stripCharFromNum(num, false);
        obj.blur(); obj.focus();
    }
    num = stripCharFromNum(stripComma(num), false);
    num = removePreZero(num);
    obj.value = formatComma(num);
}

// 숫자입력 확인 ##################################################
function numberOnly(obj, isDec) {
    if (!isDec) isDec = false;
    if (obj.disabled) return false;

    var num = obj.value.stripspace();
    if (num == "") return false;

    if (!checkNum(num, isDec)) {
        //alert ("숫자만 입력해주세요.");
        num = stripCharFromNum(num, isDec);
        obj.blur(); obj.focus();
    }
    num = stripCharFromNum(stripComma(num), isDec);

    var arrNum = num.split(".");
    if (arrNum.length > 1) {
        obj.value = arrNum[0]+"."+arrNum[1];
    }
    else {
        obj.value = arrNum[0];
    }
}

function explode (delimiter, string, limit) {

    if ( arguments.length < 2 || typeof delimiter == 'undefined' || typeof string == 'undefined' ) return null;
    if ( delimiter === '' || delimiter === false || delimiter === null) return false;
    if ( typeof delimiter == 'function' || typeof delimiter == 'object' || typeof string == 'function' || typeof string == 'object'){
        return { 0: '' };
    }
    if ( delimiter === true ) delimiter = '1';

    // Here we go...
    delimiter += '';
    string += '';

    var s = string.split( delimiter );


    if ( typeof limit === 'undefined' ) return s;

    // Support for limit
    if ( limit === 0 ) limit = 1;

    // Positive limit
    if ( limit > 0 ){
        if ( limit >= s.length ) return s;
        return s.slice( 0, limit - 1 ).concat( [ s.slice( limit - 1 ).join( delimiter ) ] );
    }

    // Negative limit
    if ( -limit >= s.length ) return [];

    s.splice( s.length + limit );
    return s;
}