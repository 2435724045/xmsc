//商品列表


class Goods{
	constructor(){
		this.status="unline";
		this.cont=$("#main");
		this.f1=$(".f1,.f3,.f5,.f2,.f4,.f6");
		this.listeven=this.f1.children("div:odd");
		// this.url1="data/f1.json";
		this.url1="/api/goods";
		this.goodslist=this.cont.children("div").children("div:odd").children(".goodslist").children(".t");
		this.ajaxRequest(this.url1,this.listeven);
		this.init()
		this.getStatus()
	}

	getStatus(){
		var that=this;
					this.cont.children("div").children("div:odd").on("click",".addcar",function(){
						that.gid=$(this).parent().parent().parent().attr("goodsid");
						console.log(that.gid)
						$.ajax({
							url:"/api/user",
							data:{
								username:"node_id"
							},
							success:(res1)=>{
								if(res1.error==0){
									this.status="online";
									if(this.status=="online"){
										$.ajax({
											type:"POST",
											url:"/api/storage",
											data:{
												username:eval(getCookie("admin"))[0].who
											},
											success:function(res3){
												console.log(res3)
												alert("成功添加1个进入购物车")
												that.data=JSON.parse(res3.data[0].car);
												if(that.data[1]){
													var p=true;
													for(var i=1;i<that.data.length;i++){
														if(that.data[i].gd_id==that.gid){
															that.data[i].num++
															p=false;
															break;
														}
													}
													if(p){
														that.data.push({gd_id:that.gid,num:1})
													}
												}else{
													that.data.push({gd_id:that.gid,num:1})
													console.log(that.data)
												};
												$.ajax({
													type:"POST",
													url:"/api/cun",
													data:{username:eval(getCookie("admin"))[0].who,cardata:JSON.stringify(that.data)},
													success:function(res2){
														
														console.log(res2)
													},
													error:()=>{
														console.log("错")
													}
												})
											}
										})
										// $.ajax({
										// 	url:"http://127.0.0.1:3000/api/storage",
										// 	data:{username:eval(getCookie("admin").who)},
										// 	success:(res2)=>{}
										// })
									}else{
										alert("我知道你没登录")
									}
								}
								
							}
						})
						
					})
				
/////////////////////////////////////////
	}

	init(){
			var that=this
			$("#main").children("div").children("div:odd").on("click",".see",function(){
						//点到了这个商品把货号存到cookie中
						that.addHuohao($(this));
						location.href="detail.html"
					})
			
		this.cont.children("div").children("div:odd").on("mouseover",".t",function(){
			$(this).children("i").stop().animate({
				top:0
			},200)
		})
		
		this.cont.children("div").children("div:odd").on("mouseout",".t",function(){
			$(this).children("i").stop().animate({
				top:250
			},200)
		})
		//点击存cookie
		this.cont.children("div").children("div:odd").on("click",".addcar",function(){
			console.log($(this)[0])
			that.gid=$(this).parent().parent().parent().attr("goodsid");
			console.log(that.gid)
			
		})
	}
	
	ajaxRequest(url,where){
		var that=this;
		$.ajax({
			url:url,
			success:function(res){
				// console.log(res[0]._id);
				that.res=res;
				that.display(where,res)
			}
		})
	}
	display(na,res){
		var a;
		if(res.length>7){
			a=7
		}else{
			a=res.length;
		}
		var str="";
		for(var i=0;i<a;i++){
			str=`<div class="goodlist" goodsid=${this.res[i]._id}>
								<div class="t">
										<img src=${this.res[i].auth_icon[0]}>
										<i><b class="addcar">加入购物车</b></i>
								</div>
								<div class="c see">
										<b>${this.res[i].name}</b>
								</div>
								<div class="b see">
										<b>RMB ￥ ${this.res[i].price}</b>
								</div>
						</div>`+str; //这样写可以从下到上按添加先后顺序排列
		}
		na.html(str);
	}
	
	addHuohao(who){
				console.log(who.parent().attr("goodsid"))
				this.ck=eval(getCookie("admin"));
				if(this.ck){
					this.ck[0].detailid=who.parent().attr("goodsid");
					setCookie("admin",JSON.stringify(this.ck))
				}else{
					setCookie("admin","["+JSON.stringify({who:"",detailid:who.parent().attr("goodsid")})+"]")
				}
			}
	
	
}
new Goods();















