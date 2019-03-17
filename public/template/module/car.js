//购物车


class Car{
	constructor(){
//		this.mycook=eval(getCookie("admin"))[1].info;
		this.box=$("#car .carb");
		this.init();
		this.loger=$(".loginer");
		this.start();
//		请求数据并渲染页面
		this.dataRequest();
		
	}
	start(){
		$.ajax({
			url:"/api/user",
			data:{
				username:"node_id"
			},
			success:(r)=>{
				switch(r.error){
					case 0:
							this.loger.html("注销").css("color","#f30").siblings("b").eq(0).removeClass("icon-huiyuandenglu").addClass("icon-logout");
							
					default:
							this.loger.html("登录").css("color","#fff").siblings("b").eq(0).removeClass("icon-logout").addClass("icon-huiyuandenglu");
							
							break;
				}
			}
		})
	}
	init(){
		var that=this;
		//改变numer表单的值时也去改变cookie中的数量
		this.box.on("change","#many",function(){
			that.changeNum(that,$(this));			
		})
		//点击删除按钮删DOM元素和cookie
		this.box.on("click","#del",function(){
			that.delCookie($(this));
			$(this).parent().parent().remove();
		})

		$("input#pay").on("click",function(){
			alert("您已掏钱")
		})

	}
	
	dataRequest(){
		this.mycook=eval(getCookie("admin"))[0].who;
		var that=this;
		var str="";
		this.total=0;
		console.log(this.mycook)
		$.ajax({
			type:"POST",
			url:"/api/storage",
			data:{
				username:this.mycook
			},
			success:function(res){
				console.log(res)
				that.res=eval(res.data[0].car).slice(1);
				$.ajax({
					type:"get",
					url:"/api/goods",
					success:function(res1){
						console.log(res1)
						for(var i=0;i<that.res.length;i++){
							for(var j=0;j<res1.length;j++){
								if(that.res[i].gd_id==res1[j]._id){
									// console.log(that.res[i].gd_id,res1[j]._id)
									that.total+=res1[j].price*that.res[i].num
									str+=`<div class="cont" goodsid=${res1[j]._id}>
												<div class="tu">
														<img src=${res1[j].auth_icon[0]}>
												</div>
												<div class="info">
														<div class="infot">${res1[j].name}</div>
														<div class="infob"><b class="b1">RMB  ￥</b><b class="b2">${res1[j].price}</b></div>
												</div>
												<div class="num">
														<input type="number" name="txt" id="many" value=${that.res[i].num} min="1"/>
												</div>
												<div class="del">
														<input type="button" name="del" id="del" value="删除" />
												</div>
										</div>`;
								}
							}
						}
						that.box.html(str)
						$(".qian b").html("￥"+that.total)
					}

				})
				
				
			}
		})
		
	}
	
			changeNum(that,self){
							that.total=0;
							that.ck=eval(getCookie("admin"))[0].who
							that.shuxing=self.parent().parent().attr("goodsid")
							$.ajax({
								type:"POST",
								url:"/api/storage",
								data:{
									username:that.ck
								},
								success:function(res2){
									that.res2=eval(res2.data[0].car)
									console.log(that.res2)
									for(var i=1; i<that.res2.length;i++){
										if(that.res2[i].gd_id==that.shuxing){
											that.res2[i].num=self.val()
											$.ajax({
												type:"POST",
												url:"/api/cun",
												data:{
													username:that.ck,cardata:JSON.stringify(that.res2)
												},
												success:function(res3){
													//这里不打印？？？
													console.log(res3)
												}
											})
										}
									}
								}
							})

							
							$.ajax({
								type:"get",
								url:"/api/detail",
								data:{
									dataName:"goods",
									_id:that.shuxing
								},
								success:function(res4){
									console.log(res4.page_data.price*self.val())
									// console.log(self.parent().parent().siblings())
									var l=self.parent().parent().siblings()
									var p=res4.page_data.price*self.val()
									for(var i=0;i<l.length;i++){
										// console.log(l.eq(0).children(".info").children(".infob").children(".b2"))
										// console.log(l.eq(0).children(".num").children("#many"))
										p+=l.eq(i).children(".info").children(".infob").children(".b2").html()*l.eq(0).children(".num").children("#many").val()
									}
									$(".qian b").html("￥"+p)
								}
							})



			}
	
			delCookie(me){
							var that=this
							this.total=0;
							that.ck=eval(getCookie("admin"))[0].who
							that.shuxing=me.parent().parent().attr("goodsid")
							$.ajax({
								type:"POST",
								url:"/api/storage",
								data:{
									username:that.ck
								},
								success:function(res2){
									that.res2=eval(res2.data[0].car)
									console.log(that.res2)
									for(var i=1; i<that.res2.length;i++){
										if(that.res2[i].gd_id==that.shuxing){
											that.res2.splice(i,1)
											$.ajax({
												type:"POST",
												url:"/api/cun",
												data:{
													username:that.ck,cardata:JSON.stringify(that.res2)
												},
												success:function(res3){
													//这里不打印？？？
													console.log(res3)
												}
											})
										}
									}
								}
							})
							var p=0;
							var l=me.parent().parent().siblings()
							for(var i=0;i<l.length;i++){
								p+=l.eq(i).children(".info").children(".infob").children(".b2").html()*l.eq(0).children(".num").children("#many").val()
							}
							$(".qian b").html("￥"+p)


				
				
			}
	
}
new Car();





































