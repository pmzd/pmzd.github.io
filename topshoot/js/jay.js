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



//构造首页Sideshow, TO: SIDESHOW_INDEX
function sideshow(obj) {
	var objElement = obj || $(".app-slideshow");
	function initSideShow() {
		var indexBannerSwiper= new Swiper(objElement[0],{
			pagination: '.app_head_banner .pagination',
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
		var cshow = new Swiper(objElement[0],{
			pagination: ".wcc_pagenaction",
			paginationClickable: true,
			slidesPerView: 5,
			loop: true
		});
	}
	objElement.length?initCarouselShow():'';	
}



//构造首页 Carousel2, TO:CAROUSEL2_INDEX
function carousel2_index(obj) {
	var objElement = obj;
	function initCarousel2Show() {
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
	objElement.length?initCarousel2Show():'';	
}




//构造首页 关于我们的Carousel, TO:CAROUSEL3_INDEX
function carousel3_index(obj) {
	var objElement = obj;
	function initCarousel3Show() {
		var cshow = new Swiper(objElement[0],{
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
			slidesPerView: 5,
			loop: false,
			mousewheelControl:true,
			onSlideClick:function() {
				var $targetEl = $(cshow.clickedSlide);
				$targetEl.addClass("cur").siblings().removeClass("cur");
				$(".su_year_big").html($targetEl.find("a").html())
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

var jayfunction = function() {
	//定义变量
	$win = $(window);
	$doc = $(document);
	$html = $("html");
	$body = $("body");
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
};