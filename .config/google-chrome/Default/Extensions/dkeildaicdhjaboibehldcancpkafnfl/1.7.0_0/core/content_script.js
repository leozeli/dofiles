    var is_cloud_tab=false
    var scroll_top  =0
	
	document.addEventListener("DOMContentLoaded",function(){
		chrome.runtime.sendMessage({todo:"get_tab_info", extra:{"url":location.href}})
	})
	
	/*document.addEventListener("visibilitychange", function(){
		if(!document.hidden){ //显示
		    if(scroll_top !== -1){
		        window.scrollTo(0, scroll_top)
			    scroll_top=-1
			}
		}
	})*/
	
	window.onload=function(){
		if(is_cloud_tab){
		    if(scroll_top !== -1){
		        window.scrollTo(0, scroll_top)
		    	scroll_top=-1
		    }
		}
	}
	
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
		if(request.todo=="get_scroll_top"){
			sendResponse(window.scrollY)
		}
		if(request.todo=="callback_scroll_top"){
			var extra=request.extra
			is_cloud_tab=extra.is_cloud_tab
			if(is_cloud_tab){
			    scroll_top=extra.scroll_top
			}
		}
		if(request.todo=="to_add_to_read_later"){
			var read_later_title=""
			var select_text=window.getSelection().toString()
			if(select_text.replace(/^\s+/, "").replace(/\s+$/, "").length>0){
				read_later_title=select_text.replace(/^\s+/, "").replace(/\s+$/, "")
			}
			else{
				read_later_title=document.title
			}
			sendResponse({"read_later_title":read_later_title, "scroll_top":window.scrollY})
		}
	})
	
	
	
	