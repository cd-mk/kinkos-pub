$(".g_code_page").each(function(){
	$(this).find(".g_codebox").append("<div class=\"g_code_veiw\"/>");
	var codeCopy = $(this).find(".g_code_temp").clone().html().replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/\n/g,"<br />").replace(/\t/g,"&nbsp;&nbsp;&nbsp;&nbsp;");
	$(this).find(".g_code_veiw").html(codeCopy);
});
$(".g_main_description").hide();

$(".g_main_description_btn").hover(function(){
	$(".g_main_description").toggle();
});
$(".g_main_description_btn").focusin(function(){
	$(".g_main_description").show();
});
$(".g_main_description_btn").focusout(function(){
	$(".g_main_description").hide	();
});

$(".g_status_board").each(function(){
	var date=new Date();
	var yy = date.getFullYear();
	var mm=""+((date.getMonth()+1)<10)?'0'+(date.getMonth()+1):(date.getMonth()+1);
	var dd=(date.getDate()<10)?'0'+date.getDate():date.getDate();
	var today=(yy+'-'+mm+'-'+dd);
	
	$('td.g_due_date').each(function(){
		var vars=$(this).text();
		if(vars==today){
			$(this).parent('tr').addClass('g_today');
		}
	});
	$('td.g_status').each(function(){
		var vars=$(this).text();
		var txt01 ="완료";
		var txt02 ="수정완료";
		var txt03 ="진행";
		var txt04 ="수정";
		if(vars==txt01){
			$(this).parent('tr').addClass('g_fin2');
		} else if(vars==txt02){
			$(this).parent('tr').addClass('g_fin2');
		} else if(vars==txt03){
			$(this).parent('tr').addClass('g_ing');
		} else if(vars==txt04){
			$(this).parent('tr').addClass('g_ing');
		}
	});
	var lengthtatal =$('.g_status_board tbody tr').length;
	$('.g_num').text(lengthtatal);

	var nbi = $(".g_status_board tbody tr.g_fin2").length;
	$('.g_finto').text(nbi);
});


$.fn.g_widthC = function(){
	var thisWidth = $(this).width()/2;
	var parentWidth = $(this).parent().width()/2;
	$(this).css("left",parentWidth-thisWidth);
};
$("#g_navi").g_widthC();
$(window).resize(function(e){
	e.preventDefault();
	$("#g_navi").g_widthC();
});

// function gTab(){
// 	$("#gTabBox").load("status-common.html #gTab", function(){
// 		var caption_txt = $(".g_status_board > table >caption").text();
// 		$("#gTab li").each(function(){
// 			var thisTxt = $(this).text();
// 			if(thisTxt== caption_txt){
// 				$(this).addClass("g_on");
// 			}
// 		});
// 	});
// }
function gTabCode(){
	$("#gTabBox").load("status-common.html #gCode", function(){
		var caption_txt = $(".g_m_tit").text();
		$("#gCode li").each(function(){
			var thisTxt = $(this).text();
			if(thisTxt== caption_txt){
				$(this).addClass("g_on");
			}
		});
	});
}
$(document).ready(function(){
	$("#g_navi").append("<p />");
	$("#g_navi p").load("status-common.html #gTit");
});

/*ie7*/
$(".g_tab li:first").addClass("g_first");