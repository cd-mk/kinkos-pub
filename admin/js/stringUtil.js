var StringUtil = {

    /**
     * 공백제거
     * @param str
     * @returns
     */
    trim :  function(str) {
        return new String(str).replace(/^\s+/g, '').replace(/\s+$/g, '');
    },

    /**
     * 모든 문자열을 변환
     * @param str1
     * @param str2
     * @returns {String}
     */
    replaceAll : function(str, str1, str2) {
        var tempStr = "";

        if(str.trim() != "" && str1 != str2) {
            tempStr = str.trim();

            while (tempStr.indexOf(str1) > -1) {
                tempStr = new String(tempStr).replace(str1, str2);
            }
        }

        return tempStr;
    },

    /**
     * null 여부 확인
     * @param str
     * @returns {Boolean}
     */
    isNull : function (str){
        if(str == undefined || str == null || str == "null" || str == "" || str == "[]"){
            return true;
        }
        else{
            return false;
        }
    },
    /**
     * 스트링으로 변환
     * @param orgStr
     * @param defaultStr
     * @returns
     */
    getString : function (orgStr, defaultStr){
        if(isNull(orgStr)){
            return defaultStr;
        }
        else{
            return String(orgStr);
        }
    },
    /**
     * lpad
     * @param n 자릿수
     * @param c 입력 문자열
     * @returns {String}
     */
    lpad :  function(str , n, c){
        var rtn = "";
        var cnt = Number(n) - str.length;

        for(var i=0;i<cnt;i++)
            rtn += String(c);

        return rtn + str.trim();
    },
    /**
     * rpad
     * @param n 자릿수
     * @param c 입력 문자열
     * @returns {String}
     */


    rpad :  function(str, n, c){
        var rtn = "";
        var cnt = Number(n) - str.length;

        for(var i=0;i<cnt;i++)
            rtn += String(c);

        return str.trim() + rtn;
    },


    /**
     * 문자열에 ','를 추가한 문자열을 리턴한다.
     * @returns {String}
     */
    setComma : function(str){
        var str = str.trim();

        var retValue = "";
        for(i=0; i<str.length; i++){
            if(i > 0 && (i%3)==0) {
                retValue = str.charAt(str.length - i -1) + "," + retValue;
            } else {
                retValue = str.charAt(str.length - i -1) + retValue;
            }
        }
        return retValue;
    },


    /**
     * 문자열의 ','를 없앤 문자열을 리턴한다.
     * @returns
     */
    commaCut  :  function(str){
        var money = str.trim();

        if(money == "")
            return "";

        return money.split(",").join("");
    },

    charLpad : function (str, n, c){
        var rtn = "";
        var cnt = Number(n) - str.length;

        for(var i=0;i<cnt;i++)
            rtn += String(c);

        return rtn + str.trim();
    }

}