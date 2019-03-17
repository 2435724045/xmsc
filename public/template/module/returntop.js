//回到顶部的js
class returnTop{
	constructor(){
		this.btn=$("#return").children("#returntop");
		this.init();
		this.back();
	}
	init(){
		var that=this;
		$(document).scroll(function(){
//			console.log(1);
			that.c=$(document).scrollTop();
			if(that.c<=100){
				
			that.btn.parent().stop().fadeOut(200)
		}else{
			that.btn.parent().stop().fadeIn(200);
		}
		})
	}
	
	back(){
		var that=this;

		this.btn.on("click",function(){
			that.run();
		})
	}
	
	run(){
//		this.jl=null;
		this.timer=setInterval(()=>{
				this.jl=$(document).scrollTop();
			this.jl=this.jl*18/19;
			if(this.jl>0&&this.jl<1){
				this.jl=0;
				clearInterval(this.timer);
			}
			$(document).scrollTop(this.jl);
			},30)
	}
	
}
new returnTop();
