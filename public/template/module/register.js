
//注册页
class Register{
	constructor(){
		this.regist=$(".register");
		this.register=$("#register");
		this.close=this.register.children(".cont").children(".close");
		this.sub=this.register.children(".cont").children(".reg").children("form").children(".s").children("#sub")
		this.tel=$(".reg").children("form").children(".u").children("#user");
		this.pass=$(".reg").children("form").children(".p").children("#pass");
		this.info=$(".reg").children("form").children(".i");
		this.erro=$(".reg").children("form").children(".e");
		this.init();
	}
	
	init(){
		var that=this;
		var a=1;
		this.regist.on("click",function(){
				that.register.fadeIn(1000).children(".cont").slideDown(1000)
			})
		this.close.on("click",function(){
				$(this).parent().parent().fadeToggle(1000);
			})
		this.sub.on("click",function(){
			that.reg(that);
		})
	}
	
	reg(that){
		
		$.ajax({
					type:"POST",
					// url:"http://www.liyangyf.com/ctrl/register.php",
					url:"/api/reg",
					data:{
						username:that.tel.val(),
						password:that.pass.val(),
						nikename:that.tel.val()
					},
					success:function(a){
						console.log(a);
						switch (a.error){
							case 1:
								that.info.css("color","#f30").html("您输入的用户名已被注册，请换一个！");
								that.sub.val("注     册");
								break;
							case 0:
								that.info.css("color","#6f6").html("注册成功！");
								that.sub.val("注     册");
								var t=3;
								var timer=setInterval(function(){
									that.erro.html(t+"秒后跳转到登录页......");
									if(t<=0){
//										console.log("tiao");
										$(".close").parent().parent().fadeToggle(1000); //close同时选中了登录和注册的关闭页面，
										clearInterval(timer);                           //并间接选择到了它们的父级
//										that.erro.children(".e").html("");
										that.erro.html("");
										that.info.html("");
									}
									t--;
								},1000)
								break;
							default:
								that.info.css("color","#f30").html("网络错误!");
								that.sub.val("注     册");
								break;
						}
					},
					beforeSend:function(){
						that.sub.val(" 注 册 中  .  .  .")
				}
				});
		
		
		
	}
	
	
	
}
new Register();





//注册界面
//$("#register").children(".cont").children(".close").on("click",function(){
//	$(this).parent().parent().fadeToggle(1000);
//})



//$("#register").children(".cont").children(".reg").children("form").children(".s").children("#sub").click(function(){
//				$.ajax({
//					type:"POST",
//					url:"http://www.liyangyf.com/ctrl/register.php",
//					data:{
//						tel:$(".reg").children("form").children(".u").children("#user").val(),
//						pass:$(".reg").children("form").children(".p").children("#pass").val()
//					},
//					success:function(a){
//						switch (a){
//							case "0":
//								$(".reg").children("form").children(".i").css("color","#f30").html("您输入的用户名已被注册，请换一个！");
//								$(".reg").children("form").children(".s").children("#sub").val("注     册");
//								break;
//							case "1":
//								$(".reg").children("form").children(".i").css("color","#6f6").html("注册成功！");
//								$(".reg").children("form").children(".s").children("#sub").val("注     册");
//								var t=3;
//								var timer=setInterval(function(){
//									$(".reg").children("form").children(".e").html(t+"秒后跳转到登录页......");
//									if(t<=0){
//										console.log("tiao");
//										clearInterval(timer);
//										$(".reg").children("form").children(".e").html("");
//										$(".reg").children("form").children(".i").html("");
//									}
//									t--;
//								},1000)
//								break;
//							default:
//								$(".reg").children("form").children(".i").css("color","#f30").html("数据不全！");
//								$(".reg").children("form").children(".s").children("#sub").val("注     册");
//								break;
//						}
//					},
//					beforeSend:function(){
//						$(".reg").children("form").children(".s").children("#sub").val(" 注 册 中  .  .  .")
//				}
//
//				});
//			})
