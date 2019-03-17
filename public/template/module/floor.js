//楼层导航的js

class Floor{
	constructor(){
		this.floor=$("#floor");
		this.ft=this.floor.children(".floor_t");
		this.fb=this.floor.children(".floor_b");
		this.main=$("#main");
		this.fb.stop().slideUp(0);
		this.init();	
	}
	init(){
		var that=this;
		this.ft.on("click",function(){
			that.togg();
		})
		this.fb.children("div").hover(this.over,this.out)
		this.fb.children("div").on("click",function(){
			that.roll($(this));
		})
	}
	
	togg(){
		this.fb.stop().slideToggle(200)
	}
	
	over(){
		switch($(this).index()){
				case 0:
						$(this).html("固定机翼").css("color","#f30");
						break;
				case 1:
						$(this).html("直升机").css("color","#f30");
						break;
				case 2:
						$(this).html("无刷马达").css("color","#f30");
						break;
				case 3:
						$(this).html("电子系统").css("color","#f30");
						break;
				case 4:
						$(this).html("碳纤维桨").css("color","#f30");
						break;
				case 5:
						$(this).html("其他附件").css("color","#f30");
						break;
			}
	}
	
		out(){
			switch($(this).index()){
				case 0:
						$(this).html("1F").css("color","#99f");
						break;
				case 1:
						$(this).html("2F").css("color","#99f");
						break;
				case 2:
						$(this).html("3F").css("color","#99f");
						break;
				case 3:
						$(this).html("4F").css("color","#99f");
						break;
				case 4:
						$(this).html("5F").css("color","#99f");
						break;
				case 5:
						$(this).html("6F").css("color","#99f");
						break;
			}
		}
		
		roll(i){
//			$(document).scrollTop(this.main.children("div").eq(i.index()).offset().top)
			$("html").stop().animate({
				scrollTop:this.main.children("div").eq(i.index()).offset().top
			},1000)
		}
}
new Floor();
