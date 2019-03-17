//秒杀页

class Spike{
	constructor(){
			this.d=new Date();
			this.d1=this.d.setSeconds(this.d.getSeconds()+21)
			this.url="data/f1.json"
			this.addSpikeRequest();
//			this.auto();
//			console.log(this.d1.getTime());
	}
	
	addSpikeRequest(){
		var that=this;
			$.ajax({
				url:this.url,
				success:function(res){
					that.display(res)
				}
			})
	}
	
	display(res){
		var str="";
		for(var i=0;i<7;i++){
			str+=`<div class="list">
								<p class="meng"></p>
								<div class="tp">
										<img src=${res[i].src}>
								</div>
								<div class="xx">
										<div class="mz">${res[i].name}</div>
										<div class="jg">
												<b class="yj">￥${res[i].yj}</b>
												<b class="xj">￥${res[i].price}</b>
										</div>
								</div>
								<div class="qiang">秒</div>
								<div class="zhe"></div>
						</div>`
		}
		$(".thing").html(str);
		this.auto();
	}
	
	auto(){
		$(".thing").on("click",".qiang",function(){
				alert("抢到啦！")
		})
		console.log($(".thing").children())
		this.timer=setInterval(()=>{
			clearInterval(this.timer1)
			this.d=new Date();
			this.rem=this.d1-this.d.getTime()
//			console.log(this.rem,this.rem/1000%60)
			$(".s").html(this.addZero(parseInt(this.rem/1000)%60))
			$(".m").html(this.addZero(parseInt(this.rem/1000/60)%60))
			$(".h").html(this.addZero(parseInt(this.rem/1000/60/60)%24))
				if($(".h").html()=="00"&&$(".m").html()=="00"&&parseInt($(".s").html())<10){
					$(".h,.m,.s").css("color","red");
					var c=true;
					this.timer1=setInterval(()=>{
						if(c){
							$(".h,.m,.s").css("color","#fff");
							c=false;
						}else{
							$(".h,.m,.s").css("color","red");
							c=true;
						}
					},100)
					$(".little").css("color","#cc0");
					if(this.rem<=0){
						clearInterval(this.timer1);
					}
				}
				if(this.rem<=0){
					//能点了
					$(".list").children(".qiang").css({
						cursor:"pointer",
						background:"#f30"
					}).siblings(".xx").css({
						background:"rgba(255,0,0,.1)",
						borderTop:"1px #f30 solid",
						borderBottom:"1px #f30 solid"
					}).siblings(".tp").css({
						border:"1px #f30 solid",
						borderRight:"none"
					}).siblings(".meng").css({
						display:"none"
					})
					clearInterval(this.timer);
					
				}
		},1000)
			
	}
	
	addZero(num){
			if(num>=10){
				return num;
			}else{
				return "0"+num;
			}
	}
	
}
new Spike();



















