    var main=new Vue({
		el:"#main",
		data:{
			user_info       : {},
			display_butt    : "flex",
			display_restore : "none",
			display_qr_code : "none",
			step_desc       : "",
			qr_url          : ""
		},
		methods:{
			to_restore_sign:function(){
				if(main.user_info.user_id !== ""){
				    warning.show('重置签名将导致其他已经登录的设备无法再获取云端数据，是否继续 ？', 'to_restore_sign')
				}
				else{
					warning.show("您还没有登录，请先进行登录", "")
				}
			}
		}
	})
	
	var warning=new Vue({
		el:".block",
		data:{
			display_warning : false,
			is_show_warning : false,
			title           : "",
			todo_desc       : "",
		},
		methods:{
			show:function(title, todo_desc){
				this.title           = title
				this.todo_desc       = todo_desc
				this.display_warning = true
				this.is_show_warning = true
			},
			hide:function(){
				var that=this
				this.is_show_warning=false
				setTimeout(function(){
					that.display_warning=false
				}, 300)
			},
			todo:function(){
				if(this.todo_desc !== ""){
					if(this.todo_desc == "to_restore_sign"){
				        if(main.user_info.user_id !== ""){
							this.hide()
				        	var qr_url="http://wxtext.sinaapp.com/wxapp_login/wxa_code.php?app_name=card_bookmark&todo=change_sign"
				        	var img=new Image()
				        	main.display_butt="none"
				        	main.display_restore="block"
				        	main.step_desc="准备中，请稍候"
				        	img.src=qr_url
				        	img.onload=function(){
				        		main.step_desc="现在，请用「"+main.user_info.nickname+"」的微信扫码并继续"
				        		main.qr_url=qr_url
				        		main.display_qr_code="block"
				        	}
				        }
				        else{
				        	this.show("您还没有登录，请先进行登录", "")
				        }
					}
				}
				else{
					this.hide()
				}
			}
		}
	})
	
	chrome.storage.local.get("user_info", function(c){
		main.user_info=c.user_info
	})