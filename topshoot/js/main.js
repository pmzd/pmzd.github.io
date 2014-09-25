//配置页面加载模块参数
require.config({
	paths: {
		"modernizr"			:"modernizr.custom",
		"jquery"			:"jquery-1.11.1.min",
		"scalcHeight"		:"jay.plugins.scalcHeight",
		"Tabs"				:"jay.plugins.tabs",
		"swiper"			:"swiper/idangerous.swiper.min",
		"swiperscrollbar"	:"swiper/idangerous.swiper.scrollbar.min",	
		"jay"				:"jay"
	},
	shim: {//模块依赖关系
		'swiperscrollbar': {deps:['swiper']},
		'swiper': {deps: ['jquery']},
		'jay'  : {deps: ['swiper','swiperscrollbar']}
	}
});

//配置页面加载模块
require(['modernizr'],function(modernizr) {
	!Modernizr.rgba?window.location="np.html":'';
});

require(
	[
		'jquery-1.11.1.min',
		'jay.plugins.scalcHeight',
		'swiper',
		'Tabs',
		'swiperscrollbar',
		'jay'		
	], 
	function (jquery,scalcHeight,swiper,swiperscrollbar,Tabs,jay){
		$(function() {
			jayfunction();
		});
	}
);