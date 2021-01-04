var NumberUtil = {

    // 숫자체크
    isNumber: function (p_obj, msg) {

        var val = p_obj;
        var Num = "1234567890";
        for (i=0; i<val.length; i++) {
            if(Num.indexOf(val.substring(i,i+1))<0) {
                return false;
            }
        }
        return true;
    }
}

//input number에는 숫자만 입력
$(document).on('keyup','input[type="number"]',function(){
    var number = $(this).val().toString();
    $(this).val(number.replace(/[^0-9]/gi,''));
});
//float 타입 입력
$(document).on('keyup','[data-type-float]',function(){
    var number = $(this).val().toString();
    $(this).val(number.replace(/[^0-9.]/gi,''));
});
//number 타입 입력
$(document).on('keyup','[data-type-number]',function(){
    var number = $(this).val().toString();
    $(this).val(number.replace(/[^0-9]/gi,''));
});