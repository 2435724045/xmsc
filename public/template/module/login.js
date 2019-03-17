
//登录页


class Login{
	constructor(){
		this.loger=$(".loginer");
		this.car=$(".car");
		this.login=$("#login");
		this.close=this.login.children(".cont").children(".close");
		this.tit=this.login.children(".cont").children(".log").children(".log_t")
		this.sub=this.login.children(".cont").children(".log").children("form").children(".s").children(".sub")
		this.user=$(".log").children("form").children(".u").children(".user");
		this.pass=$(".log").children("form").children(".p").children(".pass");
		this.info=$(".log").children("form").children(".i");
//		this.erro=$(".reg").children("form").children(".e");
		this.inspect(1)  //检查一开始是不是登录状态
		this.init();
	}
	
	init(){
		var that=this;
		this.loger.on("click",function(){
				if(that.loger.html()=="注销"){
					console.log("您要注销")
					// that.arrCookie1=eval(getCookie("admin"));
					// that.arrCookie1[0].state="unline";                  
					// setCookie("admin",JSON.stringify(that.arrCookie1),7)
					$.ajax({
						url:"/api/logout",
						success:function(res){
							if(res.error==0){
								console.log(res.msg)
								var t=eval(getCookie("admin"))
								t[0].who="";
								setCookie("admin",JSON.stringify(t))
							}
						}
					})
					that.loger.html("登录").css("color","#fff").siblings("b").eq(0).removeClass("icon-logout").addClass("icon-huiyuandenglu");
					// location.href="index.html"
				}else{
					that.login.fadeIn(1000).children(".cont").slideDown(1000)
				}
			})
		this.close.on("click",function(){
				$(this).parent().parent().fadeToggle(1000);
			})
		this.sub.on("click",function(){
			
			$(this).parent().parent().fadeOut(100)
			that.tit.stop().animate({
				marginTop:"150px",
			})
			that.log(that);
			that.createDiv(that);
		})
		
		this.car.click(function(){
							that.inspect(2);
						})
	}
	
	log(that){
		
		$.ajax({
					type:"POST",
					// url:"http://www.liyangyf.com/ctrl/login.php",
					url:"/api/login",	
					data:{
						username:that.user.val(),
						password:that.pass.val()
					},
					success:function(a){
						switch (a.error){
							case 0:
								that.ele.innerHTML="登录成功";
								that.timer=setTimeout(()=>{
									that.login.stop().fadeOut(200);
									that.sub.val("登录").parent().parent().fadeIn(100)
									that.tit.stop().animate({
										marginTop:"20px",
									})
									that.ele.remove();
									that.loger.html("注销").css("color","#f30").siblings("b").eq(0).removeClass("icon-huiyuandenglu").addClass("icon-logout");
									clearTimeout(that.timer);
								},1000)
									//开始存cookie
									if(getCookie("admin")){
										var t1=eval(getCookie("admin"))
										t1[0].who=that.user.val()
										setCookie("admin",JSON.stringify(t1))
									}else{
										setCookie("admin","["+JSON.stringify({who:that.user.val(),detailid:""})+"]")
									}
									
								// that.addCookie();
								break;
							
							default:
								that.info.css("color","#f30").html("用户名密码错误！")
								that.sub.parent().parent().fadeIn(100)
								that.tit.stop().animate({
									marginTop:"20px",
								})
								that.ele.remove();
								that.sub.val("登     录");
								break;
						}
					},
					beforeSend:function(){
						that.sub.val(" 登 录 中  .  .  .")
				}
				});
		
		
		
	}
	
	createDiv(that){
		that.ele=$(document)[0].createElement("div");
		that.ele.style.cssText='width:100%;text-align:center;color:#6f6;font:16px/16px "";position:absolute;bottom:120px;'
		that.ele.innerHTML="登录中......";
		that.login.children(".cont")[0].appendChild(that.ele);
	}
	
	addCookie(){
			console.log(getCookie("node_id"))
		if(document.cookie&&eval(getCookie("admin")).length>1){
			this.jcCookie=eval(getCookie("admin"))
			for(var i=1;i<this.jcCookie.length;i++){
				var pd1=true;
				if(this.jcCookie[i].user==this.user.val()){
					var ls=this.jcCookie[i]
					this.jcCookie.splice(i,1)
					this.jcCookie.splice(1,0,ls)
					this.jcCookie[0].state="online"
					setCookie("admin",JSON.stringify(this.jcCookie),7)
					pd1=false;
					break;
				}
			}
			if(pd1){
				this.jcCookie.splice(1,0,{user:this.user.val(),pass:this.pass.val(),info:[]})
				this.jcCookie[0].state="online";
				setCookie("admin",JSON.stringify(this.jcCookie),7)
			}
		}else{
			setCookie("admin","[{'state':'online',detailid:''},"+JSON.stringify({user:this.user.val(),pass:this.pass.val(),info:[]})+"]",7)
		}
	}
	
	
	inspect(a){

		this.car[0].onclick=function(){
			this.jcCookie=getCookie("node_id")
			if(this.jcCookie=="e30"||this.jcCookie==""){
				alert("请登录1")
			}
		}

			$.ajax({
				url:"/api/user",
				data:{
					username:"node_id"
				},
				success:(r)=>{
					switch(r.error){
						case 0:
								this.loger.html("注销").css("color","#f30").siblings("b").eq(0).removeClass("icon-huiyuandenglu").addClass("icon-logout");
								if(a==2){
									location.href="car.html"
								}
								break;
						default:
								this.loger.html("登录").css("color","#fff").siblings("b").eq(0).removeClass("icon-logout").addClass("icon-huiyuandenglu");
								
								break;
					}
				}
			})
		
			// var that=this;
			// this.jcCookie=getCookie("node_id")
			// // console.log(this.jcCookie)
			// if(this.jcCookie=="e30"){
			// 	// console.log(1);
			// 	this.loger.html("登录").css("color","#fff").siblings("b").eq(0).removeClass("icon-logout").addClass("icon-huiyuandenglu");
			// 	this.car[0].onclick=function(){
			// 		this.jcCookie=getCookie("node_id")
			// 		if(this.jcCookie=="e30"){
			// 			alert("请登录1")
			// 		}  
					
			// 	}
			// }else{
			// 	console.log(this.jcCookie)
			// 	if(this.jcCookie&&this.getCookie!=="e30"){
			// 			this.loger.html("注销").css("color","#f30").siblings("b").eq(0).removeClass("icon-huiyuandenglu").addClass("icon-logout");

			// 			if(a==2){
			// 				location.href="car.html"
			// 			}
						
			// 	}else{
			// 			this.loger.html("登录").css("color","#fff").siblings("b").eq(0).removeClass("icon-logout").addClass("icon-huiyuandenglu");
						
			// 			if(a==2){
			// 				alert("请登录2")
			// 			}
			// 	}
			// }

	}
	
	
}
new Login();
