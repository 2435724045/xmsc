;(function($){
	
	$.fn.banner=function(options){
		
		var that=this;
		
			this.LOCAL={
				autoPlay: function(){
									if(options.autoPlay===false){
										return false;
									}else{
										return true;
									}
									},
				delayTime: options.delayTime||3000,
				moveTime: options.moveTime||500,
				    index :     0
			}
			
//			this.children(".list").children("span").on("click",function(){
				if(options.list){
					
					
					options.list.on("click",function(){
				$(this).css("background","#99f").siblings("span").css("background","none")
				if($(this).index()>that.LOCAL.index){
//					console.log(that)
					that.children(".imgbox").children("img").eq($(this).index()).css("left",$(".imgbox img:first").width()).stop().animate({
						left:0
					},options.moveTime).end().eq(that.LOCAL.index).stop().animate({
						left:-$(".imgbox img:first").width()
					},options.moveTime)
					that.LOCAL.index=$(this).index();
				}
				if($(this).index()<that.LOCAL.index){
//					console.log(that)
					that.children(".imgbox").children("img").eq($(this).index()).css("left",-$(".imgbox img:first").width()).stop().animate({
						left:0
					},options.moveTime).end().eq(that.LOCAL.index).stop().animate({
						left:$(".imgbox img:first").width()
					},options.moveTime)
					that.LOCAL.index=$(this).index();
				}
				
			})
					
					
				}
//				options.list.on("click",function(){
//				$(this).css("background","blue").siblings("span").css("background","none")
//				if($(this).index()>that.LOCAL.index){
////					console.log(that)
//					that.children(".imgbox").children("img").eq($(this).index()).css("left",$(".imgbox img:first").width()).stop().animate({
//						left:0
//					},options.moveTime).end().eq(that.LOCAL.index).stop().animate({
//						left:-$(".imgbox img:first").width()
//					},options.moveTime)
//					that.LOCAL.index=$(this).index();
//				}
//				if($(this).index()<that.LOCAL.index){
////					console.log(that)
//					that.children(".imgbox").children("img").eq($(this).index()).css("left",-$(".imgbox img:first").width()).stop().animate({
//						left:0
//					},options.moveTime).end().eq(that.LOCAL.index).stop().animate({
//						left:$(".imgbox img:first").width()
//					},options.moveTime)
//					that.LOCAL.index=$(this).index();
//				}
//				
//			})
			
			if(options.left&&options.right){
					
//			this.children(".btns").children(".left").on("click",function(){
			options.left.on("click",function(){
				that.LOCAL.btnMove(-1)
			})
//			this.children(".btns").children(".right").on("click",function(){
			options.right.on("click",function(){
				that.LOCAL.btnMove(1)
			})
			
		}
			
			
			
			this.LOCAL.btnMove=function(b){
				that.children(".imgbox").children("img").eq(that.LOCAL.index).stop().animate({
					left:$(".imgbox img:first").width()*(-b)
				},options.moveTime)
				that.LOCAL.index+=b
				if(that.LOCAL.index<0) that.LOCAL.index=that.children(".imgbox").children("img").length-1;
				if(that.LOCAL.index>that.children(".imgbox").children("img").length-1)  that.LOCAL.index=0;
				that.children(".imgbox").children("img").eq(that.LOCAL.index).css("left",$(".imgbox img:first").width()*b).stop().animate({
					left:0
				},options.moveTime)
				
				if(options.list){
					options.list.eq(that.LOCAL.index).css("background","#99f").siblings("span").css("background","none")
				}
//				a.parent().next(".list").children("span").eq(that.LOCAL.index).css("background","blue").siblings("span").css("background","none")
//				console.log(a[0])
			}
			


			
			if(that.LOCAL.autoPlay()){
					if(!options.right){
						that.timer=setInterval(function(){
							that.LOCAL.btnMove(1)
						},options.delayTime)
						
					this.hover(function(){
							clearInterval(that.timer);
						},function(){
							clearInterval(that.timer)
							that.timer=setInterval(function(){
							that.LOCAL.btnMove(1)
						},options.delayTime)
						})
						
					}else{
						that.timer=setInterval(function(){
								options.right.trigger("click")
							},options.delayTime)
						
						this.hover(function(){
								
								options.left.stop().animate({
								left:0
							},200).next().stop().animate({
								right:0
							},200)
								
								clearInterval(that.timer);
							},function(){
								
								options.left.stop().animate({
								left:-100
							},200).next().stop().animate({
								right:-100
							},200)
								
								clearInterval(that.timer)
								that.timer=setInterval(function(){
										options.right.trigger("click")
									},options.delayTime)
							})
						
					}
					
					
					
//					this.hover(function(){
//						clearInterval(that.timer);
//					},function(){
//						clearInterval(that.timer)
//						that.timer=setInterval(function(){
//								options.right.trigger("click")
//							},options.delayTime)
//					})
					
					
					
			}
			
			

			
			
			
			
	}
	
	
})(jQuery);
