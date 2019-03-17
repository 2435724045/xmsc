		
		//详情页
		
		
		class Detail{
			constructor(){
				this.span=$("#detail .detail_l .sbox").children("span");
				this.sbox=$("#detail .detail_l .sbox");
				this.bbox=$("#detail .detail_l .bbox");
				this.list=$("#detail .detail_l .list ul li");
				this.aTag=$("#detail .detail_r .tz .tz_r b");
				// this.url="data/f1.json";
				this.url="/api/detail";
				this.detailRequest();
				this.init();
			}
			
			init(){
					var that=this;
				// $("#main").children("div").children("div:odd").on("click",".see",function(){
				// 		//点到了这个商品把货号存到cookie中
				// 		that.addHuohao($(this));
				// 		location.href="detail.html"
				// 	})
				
				$("#detail .detail_l").on("mousemove",".sbox",function(){
						that.moveSpan($(this));
						$(this).next(".bbox").css("display","block")
				})
				$("#detail .detail_l").on("mouseout",".sbox",function(){
						$(this).children("span").css("display","none")
						$(this).next(".bbox").css("display","none")
				})
				$("#detail .detail_l").on("click",".list ul li",function(){
						$("#detail .detail_l .sbox").children("img").attr("src",$(this).children("img").attr("src"));
						$("#detail .detail_l .bbox").children("img").attr("src",$(this).children("img").attr("src"));
						$(this).css("transform","scale(1.1)").siblings().css("transform","scale(1)")
				})
				$("#detail .detail_r").on("click",".tz_r b",function(){
						$(this).css({
								background:"#f30",
								color:"#fff",
								padding:"6px 21px",
								border:0
						}).siblings().css({
								background:"none",
								color:"#99f",
								padding:"5px 20px",
								border:"1px #99f solid"
						})
				})
				// $("#detail .detail_r").on("click","div.add",function(){
				// 	alert()
				// })
			}
			moveSpan(self){
					var xCha=event.offsetX-self.children("span").width()/2;
					var yCha=event.offsetY-self.children("span").height()/2;
							if(xCha<0){xCha=0}
							if(yCha<0){yCha=0}
							if(xCha>self.width()-self.children("span").width()){
								xCha=self.width()-self.children("span").width()
							}
							if(yCha>self.height()-self.children("span").height()){
								yCha=self.height()-self.children("span").height()
							}
				self.children("span").css({
					display:"block",
					left:xCha+"px",
					top:yCha+"px"
				})
				self.next(".bbox").children("img").css({
						marginLeft:-xCha/self.width()*self.next(".bbox").children("img").width()+"px",
						marginTop:-yCha/self.height()*self.next(".bbox").children("img").height()+"px"
				})
			}
			
//			addHuohao(who){
////				console.log(who.parent().attr("goodsid"))
//				this.ck=eval(getCookie("admin"));
//				if(this.k){
//					this.ck[0].detailid=who.parent().attr("goodsid");
//					setCookie("admin",JSON.stringify(this.ck),7)
//				}else{
//					setCookie("admin","[{'state':'online','detailid':'"+who.parent().attr("goodsid")+"'}]",7)
//				}
//				
//			}
		
			detailRequest(){
				var that=this;
				this.hh=eval(getCookie("admin"))[0].detailid;
				$.ajax({
					url:this.url,
					data:{
						dataName:"goods",
						_id:this.hh
					},
					success:function(res){
						// that.hh=eval(getCookie("admin"))[0].detailid;
						// for(var i=0;i<res.length;i++){
						// 	if(res[i].id==that.hh){
						// 		that.display(res[i]);
						// 		break;
						// 	}
						// }
						if(res.error==0){
							
							that.display(res.page_data)
						}else{
							alert("查无此商品")
						}
						
					},
					error:function(){
						console.log("有错")
					}
				})
			}
			
			display(rest){
				var that=this;
				var strleft=`<div class="sbox">
											<img src=${rest.auth_icon[0]}>
											<p></p>
											<span></span>
									</div>
									<div class="bbox">
											<img src=${rest.auth_icon[0]}>
									</div>
									<div class="list">
											<ul>
													<li>
														<img src=${rest.auth_icon[0]}>
													</li>
													<li>
														<img src=${rest.auth_icon[1]}>
													</li>
													<li>
														<img src=${rest.auth_icon[2]}>
													</li>
													<li>
														<img src=${rest.auth_icon[3]}>
													</li>
											</ul>
									</div>`;
				var strright=   `<div class="mz">${rest.name}</div>
										<div class="jg">￥ ${rest.price}.00</div>
										<div class="tz">
												<div class="tz_l">套装选择：</div>
												<div class="tz_r">
														<b>PNP</b>
														<b>BNP</b>
														<b>SRTF--MODE1</b>
														<b>SRTF--MODE2</b>
												</div>
										</div>
										<div class="kc">库存：<b>${rest.rest}</b>件</div>
										<div class="num">数量：<input type="text" name="sl" id="sl" value="1" /></div>
										<div class="add" gd_id=${rest._id}>加入购物车</div>`;
				
				$(".detail_l").html(strleft);
				$(".detail_r").html(strright);
				$("div.add").on("click",function(){
						that.jiancha();
				})
			}
			
// 			jiancha(){
// 				this.myC=eval(getCookie("admin"));
// 				if(this.myC.length<=1||this.myC[0].state!="online"){
// 					alert('请登录啊');
// 				}else{
// 					if(this.myC[1].info.length==0){
// //						setCookie("admin","[{'state':'online',detailid:'"+that.hh+"'},"+JSON.stringify({user:this.user.val(),pass:this.pass.val(),info:[]})+"]",7)
// 						this.myC[0].detailid=this.hh;
// 						this.myC[1].info.push({goodsid:this.hh,num:$("input#sl").val()});
// 						setCookie("admin",JSON.stringify(this.myC),7)
// 					}else{
// 						var j=true;
// 						for(var i=0;i<this.myC[1].info.length;i++){
// 							if(this.myC[1].info[i].goodsid==this.hh){
// 								this.myC[1].info[i].num=parseInt(this.myC[1].info[i].num)+parseInt($("input#sl").val());
// 								setCookie("admin",JSON.stringify(this.myC),7);
// 								j=false;
// 								break;
// 							}
// 						}
// 						if(j){
// 								this.myC[0].detailid=this.hh;
// 								this.myC[1].info.push({goodsid:this.hh,num:$("input#sl").val()});
// 								setCookie("admin",JSON.stringify(this.myC),7)
// 						}
// 					}
// 					alert("成功添加到购物车")
// 				}
// 			}
		
			jiancha(){
				var that=this;
				$.ajax({
					url:"/api/user",
					data:{
						username:"node_id"
					},
					success:(res1)=>{
						if(res1.error==0){
							// alert("加入购物车成功")
							////////////////////////
							// that.ck=eval(getCookie("admin"))[0].who
							// that.dt=eval(getCookie("admin"))[0].detailid
							// // that.shuxing=self.parent().parent().attr("goodsid")
							// $.ajax({
							// 	type:"POST",
							// 	url:"http://127.0.0.1:3000/api/storage",
							// 	data:{
							// 		username:that.ck
							// 	},
							// 	success:function(res2){
							// 		that.res2=eval(res2.data[0].car)
							// 		console.log(that.res2)
							// 		for(var i=1; i<that.res2.length;i++){
							// 			console.log(that.res2[i].gd_id,that.dt)
							// 			if(that.res2[i].gd_id==that.dt){
							// 				console.log($("input#sl"))
							// 				that.res2[i].num+=parseInt($("input#sl").val())
							// 				$.ajax({
							// 					type:"POST",
							// 					url:"http://127.0.0.1:3000/api/cun",
							// 					data:{
							// 						username:that.ck,cardata:JSON.stringify(that.res2)
							// 					},
							// 					success:function(res3){
							// 						//这里不打印？？？
							// 						console.log(res3)
							// 					}
							// 				})
							// 			}
							// 		}
							// 	}
							// })
							////////////////////////
							$.ajax({
								type:"POST",
								url:"/api/storage",
								data:{
									username:eval(getCookie("admin"))[0].who
								},
								success:function(res3){
									alert("加入购物车成功")
									that.data=JSON.parse(res3.data[0].car);
									if(that.data[1]){
										var p=true;
										for(var i=1;i<that.data.length;i++){
											console.log(that.data[i].gd_id,that.hh)
											if(that.data[i].gd_id==that.hh){

												that.data[i].num+=parseInt($("input#sl").val())
												p=false;
												break;
											}
										}
										if(p){
											that.data.push({gd_id:that.hh,num:parseInt($("input#sl").val())})
										}
										console.log(JSON.stringify(that.data))
									}else{
										that.data.push({gd_id:that.hh,num:parseInt($("input#sl").val())})
										console.log(that.data)
									};
									$.ajax({
										type:"POST",
										url:"/api/cun",
										data:{username:eval(getCookie("admin"))[0].who,cardata:JSON.stringify(that.data)},
										success:(res2)=>{
											console.log(res2)
										},
										error:()=>{
											console.log("错")
										}
									})
								}
							})
							////////////////////////
						}else{
							alert("请登录啊")
						}
					}
				})
			}
		
		}
		new Detail();
		