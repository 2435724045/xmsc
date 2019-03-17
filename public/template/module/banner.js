
define(["../module/jQuery.banner.1.0.0"],function(){


$(".cont").banner({
			items:$(".cont .imgbox img"),
			left:$(".cont .btns .left"),
			right:$(".cont .btns .right"),
			list:$(".list span"),
			moveTime:500,
			autoPlay:true,
			delayTime:2000
		})


})