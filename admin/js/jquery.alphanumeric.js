(function($){

    $.fn.alphanumeric = function(p) {

        p = $.extend({
            ichars: "!@#$%^&*()+=[]\\\';,/{}|\":<>?~`.-_ ",
            nchars: "",
            allow: ""
        }, p);

        return this.each
        (
            function()
            {

                if (p.nocaps) p.nchars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
                if (p.allcaps) p.nchars += "abcdefghijklmnopqrstuvwxyz";

                s = p.allow.split('');
                for ( i=0;i<s.length;i++) if (p.ichars.indexOf(s[i]) != -1) s[i] = "\\" + s[i];
                p.allow = s.join('|');

                var reg = new RegExp(p.allow,'gi');
                var ch = p.ichars + p.nchars;
                ch = ch.replace(reg,'');

                $(this).keypress
                (
                    function (e)
                    {

                        if (!e.charCode) k = String.fromCharCode(e.which);
                        else k = String.fromCharCode(e.charCode);

                        if (ch.indexOf(k) != -1) e.preventDefault();
                        if (e.ctrlKey&&k=='v') e.preventDefault();

                    }

                );

                $(this).bind('contextmenu',function () {return false});

            }
        );

    };

    $.fn.numeric = function(p) {

        var az = "abcdefghijklmnopqrstuvwxyz";
        az += az.toUpperCase();

        p = $.extend({
            ichars: "!@#$%^&*()+=[]\\\';,/{}|\":<>?~`._ ",
            nchars: az
        }, p);

        return this.each (function()
            {
                // 한글 입력 불가능하도록 수정
                $(this).css('ime-mode', 'disabled');
                $(this).alphanumeric(p);
            }
        );

    };

    $.fn.alpha = function(p) {

        var nm = "1234567890";

        p = $.extend({
            nchars: nm
        }, p);

        return this.each (function()
            {
                // 한글 입력 불가능하도록 수정
                $(this).css('ime-mode', 'disabled');
                $(this).alphanumeric(p);
            }
        );
    };

    // 한글 영문 숫자 모두 입력 가능하고 특수문자만 입력 불가능하도록 추가함.. by bhhan..
    $.fn.includekor = function(p) {

        var nm = "!@#$%^&*()+=[]\\\';,/{}|\":<>?~`.-_ ";

        p = $.extend({
            nchars: nm
        }, p);

        return this.each (function()
            {
                $(this).alphanumeric(p);
            }
        );
    };

})(jQuery);