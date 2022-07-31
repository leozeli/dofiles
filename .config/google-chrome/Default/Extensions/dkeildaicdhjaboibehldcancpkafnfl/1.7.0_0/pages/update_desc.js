	var app_imgs=document.querySelectorAll(".app_img")
	if(app_imgs.length>0){
		app_imgs.forEach((img)=>{
			img.onclick=function(){
	            window.open(this.src)
	        }
		})
	}
	
	make_color_bg(window.innerWidth, window.innerHeight)
	
	function make_color_bg(canvas_w, canvas_h, callback){
		var canvas=document.querySelector("canvas")
	        canvas.width =canvas_w
	        canvas.height=canvas_h
		var ctx   =canvas.getContext('2d')
		
		var s_x, s_y, c_x, c_y, e_x, e_y
		var colors=["#ff0000", "#00ffe4", "#ff6c00", "#fcff00", "#1d90e1", "#e3007d"]
		var data_arr=[]
		
		ctx.fillStyle="rgb(200, 200, 200)"
		ctx.fillRect(0, 0, canvas_w, canvas_h)
		
	    for(var i=0;i<6;i++){
		    if(i==0){
		    	s_x=0
		    	s_y=0
		    	c_x=canvas_w/4*3+canvas_w/4*Math.random()
		    	c_y=canvas_h/4*3+canvas_h/4*Math.random()
		    	e_x=canvas_w*Math.random()
		    	e_y=0
		    }
		    else if(i==1){
		    	s_x=e_x
		    	s_y=0
		    	c_x=canvas_w/4*Math.random()
		    	c_y=canvas_h/4*3+canvas_h/4*Math.random()
		    	e_x=canvas_w
		    	e_y=0
		    }
		    else if(i==2){
		    	s_x=0
		    	s_y=canvas_h
		    	c_x=canvas_w/4*3+canvas_w/4*Math.random()
		    	c_y=canvas_h/4*Math.random()
		    	e_x=canvas_w*Math.random()
		    	e_y=canvas_h
		    }
		    else if(i==3){
		    	s_x=e_x
		    	s_y=canvas_h
		    	c_x=canvas_w/4*Math.random()
		    	c_y=canvas_h/4*Math.random()
		    	e_x=canvas_w
		    	e_y=canvas_h
		    }
		    else if(i==4){
		    	s_x=0
		    	s_y=canvas_h/4
		    	c_x=canvas_w/4*3+canvas_w/4*Math.random()
		    	c_y=canvas_h/3*Math.random()
		    	e_x=0
		    	e_y=canvas_h/4*3
		    }
		    else if(i==5){
		    	s_x=canvas_w
		    	s_y=canvas_h/4
		    	c_x=canvas_w/4
		    	c_y=canvas_h/3*2+canvas_h/3*Math.random()
		    	e_x=canvas_w
		    	e_y=canvas_h/4*3
		    }
			
			var color_idx=parseInt(colors.length*Math.random())
		    var color=colors[color_idx]
			
			data_arr.push({s_x, s_y, c_x, c_y, e_x, e_y, color})
			console.log(data_arr)
			
		    colors.splice(color_idx,1)
		    ctx.beginPath()
		    ctx.moveTo(s_x, s_y)
		    ctx.quadraticCurveTo(c_x, c_y, e_x, e_y)
		    ctx.closePath()
		    ctx.filter="blur(150px)"
		    ctx.fillStyle=color
		    ctx.fill()
	    }
		
		/* setInterval(()=>{
			ctx.clearRect(0,0,canvas_w,canvas_h)
			data_arr.forEach((item)=>{
				//item.s_x=canvas_w*Math.random()
		    	//item.s_y=canvas_h*Math.random()
		    	item.c_x+=1
		    	//item.c_y+=1
		    	//item.e_x=canvas_w*Math.random()
		    	//item.e_y=canvas_h*Math.random()
				
				ctx.beginPath()
		        ctx.moveTo(item.s_x, item.s_y)
		        ctx.quadraticCurveTo(item.c_x, item.c_y, item.e_x, item.e_y)
		        ctx.closePath()
		        ctx.filter="blur(100px)"
		        ctx.fillStyle=item.color
		        ctx.fill()
			})
		}, 10) */
		
		if(typeof callback == "function"){
			callback("finish")
		}
	}
	