/**
 * 날짜함수  사용법 ex : DateUtil.getDateText('-');  -- >> '2019-09-27'
 */
var DateUtil = {
    /**
     * 년월을 지정하여 해당월의 말일을 구한다.
     * @param year
     * @param month
     * @returns
     */
    getMonthEndDay: function (year, month) {
        var dt = new Date(year, month, 0);
        return dt.getDate();
    },
    /**
     * 지정한 년월일의 n개월후, n개월전 날짜를 구한다.
     * @param year
     * @param month
     * @param day
     * @param addMonths
     * @returns {Date}
     */
    computeMonth: function (year, month, day, addMonths) {

        month += addMonths;
        var endDay = Hiduke.getMonthEndDay(year, month);
        if(day > endDay){
            day = endDay;
        }
        var dt = new Date(year, month - 1, day);
        var yy = dt.getFullYear();
        var mm = dt.getMonth() + 1;
        var dd = dt.getDate();

        if(mm < 10){
            mm = '0' + mm;
        }
        if(dd < 10){
            dd = '0' + dd;
        }

        var str = yy + "/" + mm + "/" + dd;

        return str;
    },
    /**
     *  지정한 년월일의 nd일후, n일전 날짜를 구한다.
     * @param year
     * @param month
     * @param day
     * @param addDays
     * @returns {String}
     */
    computeDate: function (year, month, day, addDays) {
        var dt = new Date(year, month - 1, day);
        var baseSec = dt.getTime();
        var addSec = addDays * 86400000; //일수 * 1일 밀리초수
        var targetSec = baseSec + addSec;
        dt.setTime(targetSec);

        var yy = dt.getFullYear();
        var mm = dt.getMonth() + 1;
        var dd = dt.getDate();

        if(mm < 10){
            mm = '0' + mm;
        }
        if(dd < 10){
            dd = '0' + dd;
        }

        var str = yy + "/" + mm + "/" + dd;

        return str;
    },
    /**
     * 날짜를 년월일 문자열로 반환
     * @param strDate YYYY/MM/DD 또는 YYYY-MM-DD형식의 날짜 문자열
     * @returns {String}
     */
    convDateString: function(strDate){
        return strDate.substring(0, 4) + "년 " + strDate.substring(5, 7) + "월 " + strDate.substring(8, 10) + "일";
    },
    convDateString2: function(strDate){
        return strDate.substring(0, 4) + "년 " + strDate.substring(4, 6) + "월 " + strDate.substring(6, 8) + "일";
    },
    convDateHypen: function(strDate){
        return strDate.substring(0, 4) + "- " + strDate.substring(4, 6) + "- " + strDate.substring(6, 8) + "-";
    },
    convDateHypen2: function(strDate){
        return strDate.substring(0, 4) + "-" + strDate.substring(4, 6) + "-" + strDate.substring(6, 8);
    },
    /**
     * 날짜를 YYYY/MM/DD형식으로 반환
     * @author : DongMi.Shin
     * @param year
     * @param month
     * @param day
     * @returns {String}
     * @create  : 2014. 4. 14.
     */
    DateFormat: function (year, month, day) {
        if (day < 10) {
            day = "0" + day;
        }
        if (month < 10) {
            month = "0" + month;
        }
        var date = year + "/" + month + "/" + day;

        return date;
    },
    /**
     * 두 날짜간의 개월 일수 반환
     * @author : DongMi.Shin
     * @param start
     * @param end
     * @returns {String}
     * @create  : 2014. 4. 14.
     */
    DdayFormat: function (start, end) {

        var v1 = start.split("/");
        var v2 = end.split("/");
        var a = new Date(), b = new Date(), d = new Date();

        a.setFullYear(v1[0],v1[1],v1[2]);
        b.setFullYear(v2[0],v2[1],v2[2]);

        d.setTime(b.getTime() - a.getTime());
        y=(d.getYear()<=1900)?d.getYear()-70:d.getYear()-1970;

        var gMonth = d.getMonth();
        if(y > 0){
            var sum = 12;
            for(var i = 1; i < y; i++){
                sum+=12;
            }
            gMonth = d.getMonth() + sum;
        }

        var date = gMonth+'/ '+(d.getDate()-1);

        return date;
    },
    /**
     * 오늘 날짜를 리턴한다.
     * @param gubun
     * @returns
     */
    getDateText : function(gubun){
        var date = new Date();
        var year = date.getFullYear();
        var month = (date.getMonth()+1) > 9 ? (date.getMonth()+1) : "0"+(date.getMonth()+1);
        var day = date.getDate()<10?"0"+date.getDate():date.getDate();

        return year + gubun + month + gubun + day;
    },
    /**
     * 오늘 연도를 리턴한다.
     * @param gubun
     * @returns
     */
    getYearText : function(){
        var date = new Date();
        var year = date.getFullYear();
        var month = (date.getMonth()+1) > 9 ? (date.getMonth()+1) : "0"+(date.getMonth()+1);
        var day = date.getDate()<10?"0"+date.getDate():date.getDate();

        return year;
    },
    isDate : function(control) {

        // '/'나 '-' 구분자 제거
        var val = getRemoveFormat(control);

        // 숫자, length 확인
        if (isNumber(val, msg) && val.length == 8) {
            var year = val.substring(0,4);
            var month = val.substring(4,6);
            var day = val.substring(6,8);

            // 유효날짜 확인
            if(checkDate(year,month,day,msg)){
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    },
    checkDate : function(varCk1, varCk2, varCk3) {
        if (varCk1>="0001" && varCk1<="9999" && varCk2>="01" && varCk2<="12") {
            febDays = "29";
            if ((parseInt(varCk1,10) % 4) == 0) {
                if ((parseInt(varCk1,10) % 100) == 0 && (parseInt(varCk1,10) % 400) != 0){
                    febDays = "28";
                }
            }else{
                febDays = "28";
            }
            if (varCk2=="01" && varCk3>="01" && varCk3<="31") return true;
            if (varCk2=="02" && varCk3>="01" && varCk3<=febDays) return true;
            if (varCk2=="03" && varCk3>="01" && varCk3<="31") return true;
            if (varCk2=="04" && varCk3>="01" && varCk3<="30") return true;
            if (varCk2=="05" && varCk3>="01" && varCk3<="31") return true;
            if (varCk2=="06" && varCk3>="01" && varCk3<="30") return true;
            if (varCk2=="07" && varCk3>="01" && varCk3<="31") return true;
            if (varCk2=="08" && varCk3>="01" && varCk3<="31") return true;
            if (varCk2=="09" && varCk3>="01" && varCk3<="30") return true;
            if (varCk2=="10" && varCk3>="01" && varCk3<="31") return true;
            if (varCk2=="11" && varCk3>="01" && varCk3<="30") return true;
            if (varCk2=="12" && varCk3>="01" && varCk3<="31") return true;
        }
        return false;
    },
    addDate : function(dateObj , addDate){

        var orgDay = dateObj;
        var calcDay = new Date();
        calcDay.setDate(orgDay.getDate() + Number(addDate)); //15일 더하여 setting

        return calcDay;
    }

};

Date.prototype.format = function(f) {
    if (!this.valueOf()) return " ";

    var weekName = ["일요일", "월요일", "화요일", "수요일", "목요일", "금요일", "토요일"];
    var d = this;

    return f.replace(/(yyyy|yy|MM|dd|E|hh|mm|ss|a\/p)/gi, function($1) {
        switch ($1) {
            case "yyyy": return d.getFullYear();
            case "yy": return (d.getFullYear() % 1000).zf(2);
            case "MM": return (d.getMonth() + 1).zf(2);
            case "dd": return d.getDate().zf(2);
            case "E": return weekName[d.getDay()];
            case "HH": return d.getHours().zf(2);
            case "hh": return ((h = d.getHours() % 12) ? h : 12).zf(2);
            case "mm": return d.getMinutes().zf(2);
            case "ss": return d.getSeconds().zf(2);
            case "a/p": return d.getHours() < 12 ? "오전" : "오후";
            default: return $1;
        }
    });
};

String.prototype.string = function(len){var s = '', i = 0; while (i++ < len) { s += this; } return s;};
String.prototype.zf = function(len){return "0".string(len - this.length) + this;};
Number.prototype.zf = function(len){return this.toString().zf(len);};