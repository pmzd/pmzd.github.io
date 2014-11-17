//缓存变量
var $win;
var $doc;
var $html;
var $body;
//配置自定义CSS高度的参数
var scalcNum;
//定义一个缓解resize事件优化参数
var resetJaycss = null;



//构造自定义高度CSS方法 TO:CUSTOM_CSS
function winCssHeight() {
	//配置自定义CSS高度的参数
	scalcNum = [
		["winheight",0],
		["contentheight", (function() {
			return parseInt(
					$("#app_footer").outerHeight() + 
					$("#app_head").outerHeight()
				);
			})()
		]
	];
	
	$.fn.winCssHeight($win,scalcNum,'');
	$win.resize(function() {
		resetJaycss?clearTimeout(resetJaycss):'';
		resetJaycss = setTimeout(function() {
			$.fn.winCssHeight($win,scalcNum,'');
		},200);
	});
}

//开发中！！！ 初始化菜单
//获取URL参数
function getUrlPara(paraName) {
    var sUrl = window.location.href;
    var sReg = "(?://?|&){1}" + paraName + "=([^&]*)";
    var re = new RegExp(sReg, "gi");
    re.exec(sUrl);
    return RegExp.$1;
}


var GetQueryString = function(name)
{
	var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
	var r = window.location.search.substr(1).match(reg);
	if(r!==null)return  unescape(r[2]); return null;
};
	var getstr1 = GetQueryString('cur'); //获取1级菜单的状态识标


function initNavgation() {
	var $nav = $(".app_head_nav");
	$nav.html("").load("DEV_nav.html #initnav",function() {
		if (getstr1) {
			$nav.find(".navLinks").eq(getstr1).addClass("cur").siblings().removeClass("cur");
		}
	});
}
	


//构造首页Sideshow, TO: SIDESHOW_INDEX
function sideshow(obj) {
	var objElement = obj || $(".app-slideshow");
	function initSideShow() {
		var indexBannerSwiper= new Swiper(objElement[0],{
			pagination: '.app_head_banner .pagination',
			autoplay:3000,
			mode:'horizontal',
			autoplayDisableOnInteraction: (function() {
				//可触摸设备下面，第一次触摸之后屏蔽掉AUTOPLAY
				return Modernizr.touch;
			})(),
			loop:true,
			grabCursor: false,
			paginationClickable: true
		});
		
		$('.app_head_banner').on('click',".swiper_prevbtn",function(e){
			e.preventDefault();
			indexBannerSwiper.swipePrev();
		}).on('click',".swiper_nextbtn",function(e){
			e.preventDefault();
			indexBannerSwiper.swipeNext();
		});
	}
	objElement.length?initSideShow():'';
}



//构造首页 Carousel, TO:CAROUSEL_INDEX
function carousel_index(obj) {
	var objElement = obj;
	function initCarouselShow() {
		var each =objElement.find(".wcc");
		var cshow = objElement.swiper({
			pagination: ".wcc_pagenaction",
			paginationClickable: true,
			slidesPerView:"auto",
			//slidesPerView: 5,
			//loop: true
		});
		var $ww = $win || $(window);
		if ($ww.width() <= 480 ) {
			each.css({
				width: objElement.width()
			});
		}
		$ww.on("resize.cs01", function() {
			if ($ww.width() <= 480 ) {
				each.css({
					width: objElement.width()
				})
			} else {
				each.removeAttr("style");
			}
		})
	}
	objElement.length?initCarouselShow():'';	
}



//构造首页 Carousel2, TO:CAROUSEL2_INDEX
function carousel2_index(obj) {
	var objElement = obj;
	var each =objElement.find(".cc2");
	function initCarousel2Show() {
		var cshow = new Swiper(objElement[0],{
			slidesPerView:"auto",
			scrollbar: {
				container : '.swiper-scrollbar',
				draggable : true,
				hide: false,
				snapOnRelease: true
			}
		});
		var $ww = $win || $(window);
		if ($ww.width() <= 480 ) {
			each.css({
				width: objElement.width()
			});
		}
		$ww.on("resize.cs02", function() {
			if ($ww.width() <= 480 ) {
				each.css({
					width: objElement.width()
				})
			} else {
				each.removeAttr("style");
			}
		})
	}
	objElement.length?initCarousel2Show():'';	
}

//构造拍摄花絮 Carousel1, TO:CAROUSEL2_ssss
function carouselsss_index(obj) {
	var objElement = obj;
	function initCarouselsssShow() {
		var cshow = new Swiper(objElement[0],{
			slidesPerView: 4,
			scrollbar: {
				container : '.swiper-scrollbar',
				draggable : true,
				hide: false,
				snapOnRelease: true
			}
		});
	}
	objElement.length?initCarouselsssShow():'';	
}


//构造首页 关于我们的Carousel, TO:CAROUSEL3_INDEX
function carousel3_index(obj) {
	var objElement = obj;
	function initCarousel3Show() {
		var cshow = new Swiper(objElement[0],{
			autoplay:3000,
			autoplayDisableOnInteraction: (function() {
				//可触摸设备下面，第一次触摸之后屏蔽掉AUTOPLAY
				return Modernizr.touch;
			})(),
			pagination: ".caic_page",
			paginationClickable: true,
			slidesPerView: 4,
			loop: true
		});
	}
	objElement.length?initCarousel3Show():'';	
}



//构造服务页 服务客户Carousel, TO:CAROUSEL1_SERVICE
function carousel_service(obj) {
	var objElement = obj;
	function initCarousel_ser_Show() {
		var cshow = new Swiper(objElement[0],{
			mode:'horizontal',
			slidesPerView: 3,
			loop: false,
			mousewheelControl:true,
			onSlideClick:function() {
				var $targetEl = $(cshow.clickedSlide);
				$targetEl.addClass("cur").siblings().removeClass("cur");
				$(".su_year_big").html($targetEl.find("a").html());
				event.preventDefault();
			}
		});
		$('.scnh_fr').on('click',".scnh_prv",function(e){
			e.preventDefault();
			cshow.swipePrev();
		}).on('click',".scnh_nex",function(e){
			e.preventDefault();
			cshow.swipeNext();
		});
	}
	objElement.length?initCarousel_ser_Show():'';	
}



//构造自定义Select把数值显示到父级元素的方法
function show_value(obj) {
	var _text = obj.options[obj.selectedIndex].text;
	obj.parentNode.querySelectorAll("EM")[0].innerHTML = _text;
}


//构造视频详情顶部 VideoBox 方法
function videoboxs(obj) {
	var $obj = $(obj);
	if ($obj.length){
		var sidebar = ".vwsidebar";
		var playlist = ".vwrightbox";
		var $sidebar = $obj.find(sidebar);
		var $playlist = $obj.find(playlist);
		
		function closeList() {
			$sidebar.addClass("changeCur");
			$playlist.css("display","none");
		}
		function openList() {
			$sidebar.removeClass("changeCur");
			$playlist.removeAttr("style");
		}
		
		$obj.on("click.vboxsidebar",sidebar,function(e) {
			$playlist.css("display")!="none"?closeList():openList();
		});
		//initScroll
		var listEL = "#vmbox_rPlayListCont";
		var $listEL = $(listEL);
		var listSwiper = new Swiper(listEL,{
			mode:'vertical',
			scrollContainer:true,
    		mousewheelControl : true,
			scrollbar: {
				container : '.swiper-scrollbar',
				draggable : true,
				hide: false,
				snapOnRelease: true
			}
		});
		
	}
}

function rflayout() {
	var lay01 = $(".highlights_title");
	lay01.length?lay01.closest(".element_block").addClass("highlights"):'';
}

//TEAM
var teamRender = function($tar,data) {
	var $tar = $tar;
	var dataLength = data.length;
	var cachetempla = $("<ul>").attr("id","cacheID");
	var litempla= 
			'<li class="team_list_li">'+
			'	<span class="cait_thumb" style="background-image:url()">'+
			'	</span>'+
			'	<h2 class="cit"><font color="red" class="userSelectable">名字</font><i>职位</i></h2>'+
			'	<div class="cait_textbox">'+
			'		<p>内容</p>'+
			'	</div>'+
			'</li>';
	var showtempla = 
			'<li class="team_men_detail userSelectable hide clearfix">'+
			'	<div class="team_men_detail_box">'+
			'		<div class="teamMenDetail_head"></div>'+
			'		<div class="team_men_detail_intro">'+
			'			<h2 class="tdh"><i>名字</i><em>职位</em></h2>'+
			'			<p>内容</p>'+
			'		</div>'+
			'	</div>'+
			'	<div class="team_men_detail_ctr"></div>'+
			'</li>';
	for (var i=0; i< dataLength; i++ ){
		
		var newlitempla = litempla;
		var newtp = $("<div>").attr("id","tpsd");
		newtp.append(newlitempla);
		newtp.find("span.cait_thumb").css("background-image", "url("+ data[i].proimgURL +")");
		newtp.find(".cit font").html(data[i].proname);
		newtp.find(".cit i").html(data[i].propro);
		newtp.find(".cait_textbox p").html($.parseHTML(data[i].prodetaillite));
		data[i].promail!==null?newtp.find(".cait_textbox").append('<a href="mailTo:'+ data[i].promail +'" class="cait_mail">'+data[i].promail+'</a>'):'';

		eachLast = newtp.find(".team_list_li");
		eachLast.data({
			"name"     : data[i].proname,
			"pro"      : data[i].propro,
			"bigURL"   : (function() {if ( data[i].proimgURL2 === null) {return data[i].proimgURL;} else {return data[i].proimgURL2;}})(),
			"datatext" : (function() {if ( data[i].prodetail === null || data[i].prodetail === "") {return data[i].prodetaillite;} else {return data[i].prodetail;}})()
		});
		//.on("click", function(e) {	
			//debug
			//console.log($(this).data())
		//})
		cachetempla.append(eachLast);
	}
	
	var $thisinner,
		lidata,
		$allreciveEl,
		$sendToElAll,
		$sendToEl;
	$tar.off(".teamact");
	$tar.off(".tas");
	$tar.html("").append(cachetempla.find(".team_list_li")).on("click.teamact", ".team_list_li", function(e){
		$thisinner = $(this);
		lidata = $thisinner.data();
		$allreciveEl = $tar.find(".team_men_detail");
		$sendToElAll = $thisinner.nextAll(".team_men_detail");
		$sendToEl = $sendToElAll.eq(0);

		if ( $thisinner.hasClass("cur") ) {
			//$allreciveEl.addClass("hide");
			$allreciveEl.slideUp(120);
			$thisinner.removeClass("cur");
		} else {
			$thisinner.addClass("cur").siblings().removeClass("cur");
			//$sendToEl.removeClass("hide");
			//$allreciveEl.not( $sendToEl[0] ).addClass("hide");

			$sendToEl.slideDown(150);
			$allreciveEl.not( $sendToEl[0] ).slideUp(120);

		}
		$sendToEl
				.find(".tdh i").html( lidata.name ).end()
				.find(".tdh em").html(lidata.pro).end()
				.find(".teamMenDetail_head").css("background-image", "url("+ lidata.bigURL +")").end()
				.find(".team_men_detail_intro p").html( $.parseHTML(lidata.datatext) );
	}).on("click.tas", ".team_men_detail_ctr", function() {
		$sendToEl.slideUp(120);
		$thisinner.removeClass("cur");
	});
	var items = $tar.find(".team_list_li");
	var firstItem = items.eq(0);
	var eachWidth = firstItem.width() + parseInt(firstItem.css("margin-right")) + parseInt(firstItem.css("margin-left"));
	var eachLengh = Math.floor($tar.width()/eachWidth);
	var RowLengh = Math.ceil(dataLength/eachLengh);
	items.filter(":nth-of-type("+ eachLengh +"n)").after(showtempla);
	if ($(".team_men_detail").length < RowLengh ) {
		items.filter(":last-child").after(showtempla);
	}
//end	
}

var teamaction = function($target,jsonURL,eachpageNUM) {
	var $tar = $target;
	if ($tar.length) {
		$.ajax({
			type: "get",
			url: jsonURL,
			dataType: "jsonp",
			jsonpCallback:"callback"
		}).done(function(data) {
		//$.getJSON(jsonURL).always(function(data) {
			var dataLength = data.length;
			var paging = false;
			var pagese;
			var temparry;
			if (dataLength > eachpageNUM) {
				paging = true;
				pagese = Math.ceil(dataLength/eachpageNUM);
				/*
				console.log(paging);
				console.log(dataLength);
				console.log(eachpageNUM);
				console.log(pagese);
				*/
			}
			if (paging) {
				$(".case_pagination").show();
				var dataTarget = $(".cp_number").find(".pageses");
				var dataTargetIn = $(".case_pagination").find(".cpc_prv");
				var cacheDataPage = dataTarget.eq(0).clone().removeData().removeClass("cur");
				var temps = $("<div>");
				dataTarget.remove();
				for (var n = 0; n<pagese; n++) {
					temps.append(cacheDataPage.clone().html("0"+(n+1)))
				}
				temps.find("a").eq(0).addClass("cur");
				dataTargetIn.after(temps.html());
				dataTarget =  $(".cp_number").find(".pageses");
				temparry = [];
				for (var k=0; k< pagese; k++) {
					temparry[k] = data.slice(eachpageNUM*k,eachpageNUM*(k + 1));
					dataTarget.eq(k).data("arrys", temparry[k]).attr("id", "page_"+k)
				}
				dataTarget.on("click", function(e) {
					var $this = $(this);
					if( $this.data("arrys") ) {
						var kdata = $this.data("arrys");
						$this.addClass("cur").siblings().removeClass("cur");
						teamRender($tar,kdata);
					} else {
						console.log("noData")
					}
				})
				
				console.log(temparry)
			} else {
				temparry = [];
				temparry[0] = data;
				$(".case_pagination").hide();
			}
			//进行加载完数据之后第一次渲染DOM元素
			teamRender($tar,temparry[0]);
		//get_JSON_End
		}).error(function() {
			alert("加载数据失败，请联系网站管理员。")
		});
	}
	
};

//构造响应式判断菜单
function resmenu() {
	var $ww = $win || $(window); //cache
	function initmenu() {
		if (device.mobile()) {
			$doc.on("click.pso", ".online_consulting", function(e) {
				e.stopPropagation();
				$(document.getElementsByClassName("app_head_nav")).stop(true).slideToggle(120);
			})
		} else {
			$doc.off("click.pso");
		}
	}
	initmenu();
	$ww.on("resize", function() {
		initmenu();
	});
}
//右侧漂浮动作
function rightside () {
	var obj = $(".pageFlortEl");
	var clsbtn = ".clsbtn";
	var scrtop = ".qbarrow-u";
	var scrbot = ".qbarrow-d";
	var obj_cls_btn = obj.find(clsbtn);
	var obj_scroll_top = obj.find(scrtop);
	var obj_scroll_bot = obj.find(scrbot);
	obj.on("click", clsbtn, function() {
		obj.remove();
	}).on("click", scrtop,function() {
		document.body.scrollTop = 0
	}).on("click", scrbot,function() {
		document.body.scrollTop =document.body.scrollHeight
	});
}


var jayfunction = function() {
	//定义变量
	$win = $(window);
	$doc = $(document);
	$html = $("html");
	$body = $("body");
	//
	initNavgation();
	//CUSTOM_CSS
	winCssHeight();
	//SIDESHOW_INDEX
	sideshow($("#app_slideshow"));
	//CAROUSEL_INDEX
	carousel_index($("#index_carousel_1"));
	//CAROUSEL2_INDEX
	carousel2_index($("#index_carousel_2"));
	//CAROUSEL3_INDEX
	carousel3_index($("#carousel_aboutus_wrap"));
	//CAROUSEL1_SERVICE
	carousel_service($("#scnh_carousel"));
	//sssssss
	carouselsss_index($("#sssssss"));
	//VideoBox
	videoboxs("#vedioWrap");
	//teamwork eg: teamaction(目标的JQ对象, JSON的地址, 每页显示的数目)
	//teamaction($(".team_list_ul"), "data/prolist.txt", 8);
	teamaction($(".team_list_ul"), "http://topshoot.skychf.com/teamjson", 8);
	//响应式页面需求添加样式。
	rflayout();
	resmenu();
	//右侧
	rightside();
};
