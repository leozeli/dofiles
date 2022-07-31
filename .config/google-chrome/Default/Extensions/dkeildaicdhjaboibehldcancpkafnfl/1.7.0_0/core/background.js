    var user_info = {"user_id":"", "sign":"", "nickname":"", "avatarurl":"", "cloud_end_time":0}
	var viewed_data_obj    = {"viewed_data":{"date":get_date(), "num_tabs":0, "data":[]}}
	var is_init_viewed_data_obj=false
	var deal_onCreated     = true
	var cloud_tab_info     = []
	var new_tab_arr        = []
	var all_cloud_bookmark = []
	var all_local_bookmark = []
	var bookmark_new       = null
	var folder_title_saved_to = ""
	var icon_name="icon_48"
	var ls_data=typeof localStorage.ls_data=="undefined"?{}:JSON.parse(localStorage.ls_data)
	var is_use_webpage_contextmenu = typeof ls_data.is_use_webpage_contextmenu == "undefined"?false:ls_data.is_use_webpage_contextmenu
	var is_created_add_to_read_later_menu=false
	var is_created_add_to_cloud_bookmark_menu=false
	var t_get_tab=null
	
	//common
	var is_run_ready_data   = false
	var notificationId      = null
	var notification_t      = null
	
	if(is_use_webpage_contextmenu){
		create_add_to_read_later_menu()
	}
	
	chrome.tabs.onCreated.addListener(function(tab_info){
		if(is_init_viewed_data_obj){
			record_today_viewed_num()
		}
		else{
			get_viewed_data(function(c){
				if(c=="got_data"){
					record_today_viewed_num()
				}
			})
		}
	})
	
	chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab){
		var url=tab.url
		if(/https?:\/\/[^#]+#?.*$/.test(tab.url)){
			url=/(https?:\/\/[^#]+)#?.*$/.exec(tab.url)[1]
		}
		
		if(changeInfo.status=="loading"){
			change_icon(url)
			/* chrome.tabs.insertCSS(tab.id, {
		    	code :"::-webkit-scrollbar{width:0px;height:2px}", 
		    	runAt:"document_start"
		    }, function(){
		    	
		    }) */
		}
			
		if(changeInfo.status=="complete"){
			sendMessage_to_runtime("tab_open_complete", url)
			
			if(/^https?:\/\//.test(url) || /^chrome-extension:\/\//.test(url)){
				if(is_init_viewed_data_obj){
		        	sort_viewed_data(tab.title, url)
		        }
		        else{
		        	get_viewed_data(function(c){
		        		if(c=="got_data"){
		        			sort_viewed_data(tab.title, url)
		        		}
		        	})
		        }
			}
			
			if(new_tab_arr.length>0){
			    chrome.tabs.create(new_tab_arr[0])
			    new_tab_arr.splice(0, 1)
			}
		}
	})
	
	chrome.tabs.onActivated.addListener(function(active_tab_info){
		if(t_get_tab!==null){
			clearTimeout(t_get_tab)
			t_get_tab=null
		}
		t_get_tab = setTimeout(()=>{
		    chrome.tabs.get(active_tab_info.tabId, function(tab){
		    	//console.log(tab)
		    	change_icon(tab.url)
		    })
		}, 100)
	})
	
	
	//这里对 bookmarks 的监听是全局的，在原生书签管理器里的编辑也能监听到
	chrome.bookmarks.onCreated.addListener(function(id, bookmark){
		if(deal_onCreated){
		    if(typeof bookmark.url !== "undefined"){
				//添加到本地书签网址数组
				all_local_bookmark.push(bookmark.url)
				
				check_cloud_bookmark_up_time(function(c){
					if(c){
				        if(all_cloud_bookmark.indexOf(bookmark.url) == -1){
				        	//console.log(bookmark)
				        	bookmark_new=bookmark
				        	folder_title_saved_to=""
				            upload_cloud_bookmark(bookmark_new, "create")
				        }
				        else{
				        	//console.log("这个网址已经存在云端书签中 onCreated")
				        	notify("这个网址已经存在云端书签中")
				        }
				    }
				})
		    }
			else{
				console.log("created a folder")
			}
		}
	})
	
	chrome.bookmarks.onRemoved.addListener(function(id, removeInfo){
		get_all_local_bookmark()
	})
	
	chrome.bookmarks.onChanged.addListener(function(id, changeInfo){
		get_all_local_bookmark()
	})
	
	chrome.bookmarks.onMoved.addListener(function(id, moveInfo){
		//console.log(moveInfo)
		if(bookmark_new){
			if(moveInfo.oldIndex == bookmark_new.index){ //过滤 不是由点击星星图标添加书签时的移动的情况
			    //alert("moved")
		        bookmark_new.parentId=moveInfo.parentId
		        upload_cloud_bookmark(bookmark_new, "move")
			}
			
			bookmark_new=null
		}
	})
	
	chrome.bookmarks.onChildrenReordered.addListener(function(){
		//alert("onChildrenReordered")
	})
	
	chrome.bookmarks.onImportBegan.addListener(function(){
		deal_onCreated=false
	})
	
	chrome.bookmarks.onImportEnded.addListener(function(){
		deal_onCreated=true
	})
	
	chrome.runtime.onInstalled.addListener(function(request, sender, sendResponse){ // first install || update
	    chrome.storage.local.get(null, function(c){
			var db_keys=Object.keys(c)
			var data_obj={}
			
			if(db_keys.indexOf("viewed_data") == -1){
				data_obj.viewed_data = {"date":get_date(), "num_tabs":0, "data":[]}
			}
			if(db_keys.indexOf("user_info") == -1){
				data_obj.user_info = user_info
			}
			if(db_keys.indexOf("cloud_bookmarks") == -1){
				data_obj.cloud_bookmarks = []
			}
			if(db_keys.indexOf("read_later_lists") == -1){
				data_obj.read_later_lists = []
			}
			
			
			if(db_keys.indexOf("is_cb_new_install") == -1){
				data_obj.is_cb_new_install = "yes"
				
				new_install(db_keys)
				window.open("../pages/welcome_"+(language("lang")=="zh_cn"?"zh":"en")+".html")
			}
			else{
				if(!/mobile/i.test(navigator.userAgent) && localStorage.app_version !== "1.6.9"){
		            window.open("../pages/update_desc_"+(language("lang")=="zh_cn"?"zh":"en")+".html")
		        }
				
				if(typeof localStorage.is_dev_client == "undefined"){
				    new_install(db_keys)
				}
			}
			
			//写入数据
			if(Object.keys(data_obj).length>0){
				storage_set(data_obj, ()=>{
					ready_data()
				})
			}
			else{//无需写入数据
				ready_data()
			}
			
			localStorage.app_version=chrome.app.getDetails().version
		})
	})
	
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
		var todo=request.todo
		if(todo=="update_user_info"){
			get_user_info()
		}
		else if(todo=="update_viewed_data"){
			get_viewed_data()
		}
		else if(todo=="keep_cloud_tab"){
			cloud_tab_info=request.extra
			//console.log(cloud_tab_info)
			
			var opened_tab     = []
			var opened_url_arr = []
			chrome.tabs.query({currentWindow:true}, function(c){
				opened_tab=c
			    c.forEach(function(tab){
					opened_url_arr.push(tab.url)
				})
				open_tab(opened_tab, opened_url_arr)
			})
		}
		else if(todo=="get_tab_info"){
			if(typeof sender.tab !== "undefined"){
			    var url          = request.extra.url
			    var tab_id       = sender.tab.id
			    var is_cloud_tab = false
			    var scroll_top   = 0
			    
			    if(cloud_tab_info.length>0){
			    	for(var i=0;i<cloud_tab_info.length;i++){
			    		if(cloud_tab_info[i].url==url){
			    			is_cloud_tab=true
			    			scroll_top=cloud_tab_info[i].scroll_top
			    			
			    			cloud_tab_info.splice(i, 1)
			    			break
			    		}
			    	}
			    }
			    
			    chrome.tabs.sendMessage(tab_id, {todo: "callback_scroll_top", extra:{"is_cloud_tab":is_cloud_tab, "scroll_top":scroll_top}})
			}
		}
		else if(todo=="update_all_cloud_bookmark"){
			get_all_cloud_bookmark()
		}
		else if(todo=="is_opened_popup"){
			bookmark_new=null
		}
		else if(todo=="change_is_use_webpage_contextmenu"){
			ls_data=JSON.parse(localStorage.ls_data)
	        is_use_webpage_contextmenu = ls_data.is_use_webpage_contextmenu
			
			if(is_use_webpage_contextmenu){
				create_add_to_read_later_menu()
				
				chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
					change_icon(tabs[0].url)
				})
	        }
			else{
				chrome.contextMenus.removeAll()
				is_created_add_to_read_later_menu=false
				is_created_add_to_cloud_bookmark_menu=false
			}
		}
		else if(todo=="show_notification"){
			notify(request.extra)
		}
		else if(todo=="create_bk_from_cloud_data"){
			deal_onCreated = request.extra.is_deal_onCreated
		}
	})
	
	/* window.matchMedia('(prefers-color-scheme: dark)').addListener((e)=>{
		console.log(e)
		var theme_desc = e.matches?"_for_dark":""
	}) */
	
	ready_data()
	
	function ready_data(){
		chrome.storage.local.get("user_info", function(c){
			if(typeof c.user_info !== "undefined"){
		        if(!is_run_ready_data){
		        	is_run_ready_data=true
		        	
		            get_user_info(),
	                get_viewed_data(),
	                get_all_cloud_bookmark(),
	                get_all_local_bookmark()
		        }
			}
		})
	}
	
	function get_user_info(){
		chrome.storage.local.get("user_info", function(c){
	    	if(typeof c.user_info !== "undefined"){
			    user_info=c.user_info
			}
	    })
	}
	
	function get_viewed_data(callback){
		chrome.storage.local.get("viewed_data", function(c){
			if(typeof c.viewed_data !== "undefined"){
			    is_init_viewed_data_obj=true
				viewed_data_obj = c
				if(callback){
					callback("got_data")
				}
			}
	    })
	}
	
	function get_all_cloud_bookmark(callback){
		chrome.storage.local.get("cloud_bookmarks", function(c){
	        if(typeof c.cloud_bookmarks !== "undefined"){
			    var data_arr=c.cloud_bookmarks
			    do_get_all(data_arr, function(all_url_arr){
					all_cloud_bookmark=all_url_arr
					
					chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
						change_icon(tabs[0].url)
					})
					
					if(callback){
						callback("finish")
					}
				})
			}
		})
	}
	
	function get_all_local_bookmark(){
		chrome.bookmarks.getTree(function(c){
	    	var data_arr=c[0].children
			do_get_all(data_arr, function(all_url_arr){
		    	all_local_bookmark=all_url_arr
		    })
	    })
	}
	
	function do_get_all(arr, callback){
		var groups_arr=arr.filter(function(item){
	    	return (typeof item.children !== "undefined")
	    })
		var all_url_arr=[]
		
		for(var i=0;i<groups_arr.length;i++){
		    var bks = groups_arr[i].children
			for(var k=0;k<bks.length;k++){
			    if(typeof bks[k].children == "undefined"){
					all_url_arr.push(bks[k].url)
				}
				else{
					deal_foder_in(bks[k].children)
				}
			}
		}
		
	    callback(all_url_arr)
		
		function deal_foder_in(arr){
		    for(var j=0;j<arr.length;j++){
				if(typeof arr[j].children == "undefined"){
					all_url_arr.push(arr[j].url)
				}
				else{
					deal_foder_in(arr[j].children)
				}
			}
		}
	}
	
	function record_today_viewed_num(){ //today tabs num
		var viewed_data = viewed_data_obj.viewed_data
		if(viewed_data.date == get_date()){
			viewed_data.num_tabs += 1
			storage_set(viewed_data_obj)
		}
		else{
			viewed_data.date     = get_date()
			viewed_data.num_tabs = 1
			storage_set(viewed_data_obj)
		}
	}
	
	function sort_viewed_data(title, url){
		var viewed_data=viewed_data_obj.viewed_data
		var viewed_data_data=[]
		var time_now  =Date.now()
		var start_time=time_now
		var times_num_temp =0
		var times_num      =0
		var is_same_with_prev=false
		
		if(typeof viewed_data.data == "undefined"){
		    viewed_data.data=[]
		}
		viewed_data_data=viewed_data.data
		
		for(var i=0,l=viewed_data_data.length;i<l;i++){
			var item=viewed_data_data[i]
			if(url==item.url){
				start_time=(typeof item.start_time=="undefined"?Date.now():item.start_time)
				times_num_temp=(typeof item.times_num_temp=="undefined"?1:item.times_num_temp)
				times_num=(typeof item.times_num=="undefined"?1:item.times_num)
				
				if(i==0){
				    is_same_with_prev=true
				}
				
				viewed_data_data.splice(i, 1)
				
				break
			}
		}
		
		var obj={}
		    obj.title      = title
		    obj.url        = url
		    obj.start_time = start_time
		    obj.end_time   = time_now
		    obj.times_num_temp  = times_num_temp+(is_same_with_prev?0:1)
		    obj.times_num       = times_num+(is_same_with_prev?0:1)
		
        if(all_local_bookmark.indexOf(url) == -1 && all_cloud_bookmark.indexOf(url) == -1){ //不在书签中
		    if(times_num_temp+1 > 3){
		    	var hours=(time_now-start_time)/3600000
		    	if(hours<72){
					obj.start_time=time_now
					obj.times_num_temp=-3
					if(localStorage.ls_data){
						var ls_data=JSON.parse(localStorage.ls_data)
						if(typeof ls_data.is_notify_collect !== "undefined"){
							if(ls_data.is_notify_collect){
								notify("你多次访问这个网址，建议添加到书签")
							}
						}
					}
		    	}
		    }
		}
		else{
			obj.start_time=time_now
			obj.times_num_temp=1
		}
		
		viewed_data_data.unshift(obj) //指向 viewed_data_obj
		storage_set(viewed_data_obj, ()=>{
			sendMessage_to_runtime("viewed_data_is_updated", {"data":obj})
		})
	}
	
	function add_to_read_later(info, tab){
		if(user_info.user_id && user_info.sign){
		    chrome.tabs.sendMessage(tab.id, {todo: "to_add_to_read_later"}, function(response){
		    	var icon_url   = tab.favIconUrl
		    	var title      = ""
		    	var scroll_top = 0
		    	var read_obj   = {}
		    	if(response){
		    		title      = response.read_later_title
		    		scroll_top = response.scroll_top
		    	}
		    	else{
		    		title      = tab.title
		    	}
		    	
		    	read_obj.title      = title?title:"空内容"
		        read_obj.url        = tab.url
		        read_obj.icon_url   = icon_url
		    	read_obj.time       = Date.now()
		        read_obj.scroll_top = scroll_top
		    	
		    	update_cloud_data(read_obj, "read_later", function(c){
		    		if(c.desc=="update_success"){
		    			storage_set({"read_later_lists":JSON.parse(c.data)})
		    		}
		    	})
	        })
		}
		else{
			notify("抱歉，使用此功能需要登录并激活")
		}
	}
	
	function add_to_cloud_bookmark(info, tab){
		if(user_info.user_id && user_info.sign){
		    check_cloud_bookmark_up_time(function(c){
		    	if(c){
		            if(all_cloud_bookmark.indexOf(tab.url) == -1){
		                var bookmark={}
		                    bookmark.title    = tab.title
		                    bookmark.url      = tab.url
		                    bookmark.parentId = ""
		                upload_cloud_bookmark(bookmark, "right_menu")
		            }
		            else{
						//console.log("这个网址已经存在云端书签中 add_to_cloud_bookmark")
		            	notify("这个网址已经存在云端书签中")
		            }
		    	}
		    })
		}
		else{
			notify("抱歉，使用此功能需要登录并激活")
		}
	}
	
	//add cloud bookmark
	function upload_cloud_bookmark(bookmark, type){
		if(user_info.user_id && user_info.sign){
		    var groups_arr=[]
		    var time_now=parseInt(Date.now()/1000)
		    
		    chrome.storage.local.get("cloud_bookmarks", function(c){
	        	if(typeof c.cloud_bookmarks == "undefined" || c.cloud_bookmarks.length==0){
		    		var home_page_obj={}
		    		    home_page_obj.dateAdded = time_now
                        home_page_obj.index     = 0
                        home_page_obj.title     = "书签栏"
                        home_page_obj.children  = []
						
		    		var children_obj={}
		    		    children_obj.dateAdded = time_now
                        children_obj.index     = 0
                        children_obj.title     = bookmark.title
                        children_obj.url       = bookmark.url
						
		    		home_page_obj.children.push(children_obj)
		    		groups_arr.push(home_page_obj)
					
					//上传到云端
		    	    update_cloud_data(groups_arr, "bookmark_data", function(c){
				    	if(c.desc=="update_success"){
				    	    var data_obj={}
		    	            data_obj.cloud_bookmarks=groups_arr
		    	            storage_set(data_obj)
				    		
		    	            all_cloud_bookmark.push(bookmark.url)
				    		
				    		change_icon(bookmark.url)
				    	}
				    })
	        	}
	        	else{
					if(bookmark.parentId !== ""){
					    chrome.bookmarks.get(bookmark.parentId, function(res_bookmark){
					    	var folder_title=res_bookmark[0].title;
					    	upload_cloud_bookmark_find_folder(c.cloud_bookmarks, folder_title, bookmark, type)
					    })
					}
					else{
						upload_cloud_bookmark_find_folder(c.cloud_bookmarks, "", bookmark, type)
					}
	        	}
	        })
		}
	}
	
	function upload_cloud_bookmark_find_folder(groups_arr, folder_title, bookmark, type){
		//console.log(groups_arr)
		var folder     = groups_arr[0]
		var folder_old = null
		var time_now   = parseInt(Date.now()/1000)
		
		if(folder_title !== ""){
	        for(var i=0;i<groups_arr.length;i++){
		    	var title=groups_arr[i].title
		    	var children = groups_arr[i].children
		    	if(title==folder_title){
		    		folder=groups_arr[i]
		    	}
				if(title==folder_title_saved_to){
		    		folder_old=groups_arr[i]
		    	}
		    	for(var k=0;k<children.length;k++){
		    		if(typeof children[k].children !== "undefined"){
		    			if(children[k].title==folder_title){
		    	        	folder=children[k]
		    	        }
						if(children[k].title==folder_title_saved_to){
		    	        	folder_old=children[k]
		    	        }
		    			continue_deal(children[k].children)
		    		}
		    	}
	        }
		}
		
		//result
		//console.log(folder)
		
		var children_obj={}
		    children_obj.dateAdded = time_now
            children_obj.index     = folder.children.length
            children_obj.title     = bookmark.title
            children_obj.url       = bookmark.url
		folder.children.push(children_obj)
		
		if(folder_old){
			folder_old.children.splice(folder_old.children.length-1, 1)
		}
		
		//上传到云端
		update_cloud_data(groups_arr, "bookmark_data", function(c){
			if(c.desc=="update_success"){
			    var data_obj={}
		        data_obj.cloud_bookmarks=groups_arr
		        storage_set(data_obj)
				
				folder_title_saved_to=folder.title
				
		        all_cloud_bookmark.push(bookmark.url)
				
				change_icon(bookmark.url)
			}
		})
		
		function continue_deal(array){
			for(var j=0;j<array.length;j++){
				if(typeof array[j].children !== "undefined"){
					if(array[j].title==folder_title){
			        	folder=array[j]
			        }
					if(array[j].title==folder_title_saved_to){
		    	    	folder_old=array[j]
		    	    }
			    	continue_deal(array[j].children)
				}
			}
		}
	}
	
	function check_cloud_bookmark_up_time(callback){
		if(user_info.user_id && user_info.sign){
		    var formData=new FormData()
		    formData.append("todo", "check_data_up_time")
		    //formData.append("data_type", data_type)
		    formData.append("app_name", "card_bookmark")
		    formData.append("user_id", user_info.user_id)
		    formData.append("sign", user_info.sign)
		    formData.append("data_up_time", localStorage.cloud_bookmark_up_time?localStorage.cloud_bookmark_up_time:"")
		    //formData.append("data", data)
		    post_data("https://aa-zz.cn/deal_app_data/server.php", formData, function(c){
		    	if(c){
		    		var desc=c.desc
		    		if(desc=="need_update"){
		    			localStorage.cloud_bookmark_up_time=c.up_time
		    			
		    			var data = c.data==""?[]:JSON.parse(c.data)
		    			var obj={}
		    	            obj.cloud_bookmarks=data
		    	        storage_set(obj)
		    			
		    			if(typeof c.end_time !== "undefined"){
		    		        user_info.cloud_end_time=c.end_time
		    		    }
		    		    else{
		    		    	user_info.cloud_end_time=0
		    		    }
		    			storage_set({"user_info":user_info})
		    			
		    			get_all_cloud_bookmark(function(c){
		    				if(c=="finish"){
		    					callback(desc)
		    				}
		    			})
		    		}
		    		else{
		    		    callback(desc)
		    		}
		    	}
		    	else{
		    		callback("")
		    	}
		    })
		}
		else{
			callback("")
		}
	}
	
	//执行数据上传(包括书签和稍后读)
	function update_cloud_data(arr_ok, data_type, callback){
		var action=(data_type == "bookmark_data"?"同步":"添加")
		if(user_info.user_id && user_info.sign){
			if(user_info.cloud_end_time > Date.now()){ //云服务使用中
		        var formData=new FormData()
		        formData.append("todo", "update_data")
		        formData.append("data_type", data_type)
		        formData.append("app_name", "card_bookmark")
		        formData.append("user_id", user_info.user_id)
		        formData.append("sign", user_info.sign)
		        formData.append("data", JSON.stringify(arr_ok))
		        post_data("https://aa-zz.cn/deal_app_data/server.php", formData, function(c){
		        	if(c){
		        	    if(c !== "net_error"){
		        	        if(c.desc=="update_success"){
								if(data_type=="bookmark_data"){
					            	localStorage.cloud_bookmark_up_time=c.up_time
					            }
		        	    		notify(action+"成功")
		        	    	}
							else{
		        	    	    if(c.desc=="no_activation_info"){
		        	    	    	notify("无法"+action+"，云服务未激活")
		        	    	    }
		        	    	    if(c.desc=="expired_service"){
		        	    	    	notify("无法"+action+"，云服务已到期")
		        	    	    }
		        	    	}
							
							if(callback){
			    				callback(c)
			    			}
		        	    }
		        	}
		        })
			}
			else{
				if(user_info.cloud_end_time>0){
				    notify(action+"失败，当前云服务已到期")
				}
			}
		}
		else{
			callback({"desc":"not_login"})
		}
	}
	
	function open_tab(opened_tab, opened_url_arr){
		new_tab_arr=[]
		cloud_tab_info.forEach(function(tab){
			var url    = tab.url
			var active = tab.active
			if(opened_url_arr.indexOf(url) == -1){
				new_tab_arr.push({url:url, active:active})
			}
			else{
				//之前已经打开的标签是否需要应用滚动位置？
				var tab_id=opened_tab[opened_url_arr.indexOf(url)].id
				chrome.tabs.sendMessage(tab_id, {todo: "callback_scroll_top", extra:tab.scroll_top})
			}
		})
		
		if(new_tab_arr.length>0){
			chrome.tabs.create(new_tab_arr[0])
			new_tab_arr.splice(0, 1)
			/*var i=0
			var t=setInterval(function(){
				if(i<new_tab_arr.length){
					chrome.tabs.create(new_tab_arr[i])
					i+=1
				}
				else{
					clearInterval(t)
				}
			}, 1000)*/
		}
	}
	
	function post_data(up_url, formData, callback){
	    var xhr = new XMLHttpRequest()
        xhr.open('POST', up_url, true)
	    xhr.send(formData)
	    xhr.onreadystatechange=function(response){
            if(xhr.readyState==4){
				if(xhr.status==200){
					var data=JSON.parse(xhr.responseText)
					var todo = formData.get("todo")
					
					if(todo !== "new_install"){
					    if(data.desc=="no_user"){
					    	user_info.user_id = ""
					    	user_info.sign    = ""
					    	storage_set({"user_info":user_info})
					    	
			    	    	notify("找不到用户，您需要重新登录")
			    	    }
					    else if(data.desc=="sign_error"){
					    	user_info.user_id = ""
					    	user_info.sign    = ""
					    	storage_set({"user_info":user_info})
					    	
				        	notify("签名验证失败，您需要重新登录")
				        }
					    else{
					    	user_info.cloud_end_time=data.end_time
		    		        storage_set({"user_info":user_info})
					    	
					    	if(callback){
					    		callback(data)
					    	}
					    }
					}
					else{
						if(callback){
					    	callback(data)
					    }
					}
				}
				else{
					if(callback){
				    	callback("net_error")
				    }
					notify("与服务器连接失败")
			    }
	    	}
	    }
	}
	
	function new_install(db_keys){
		if(typeof db_keys !== "undefined"){
			get_browser((browser)=>{
				var app_name=""
		        if(db_keys.indexOf("is_cb_new_install") == -1){
		        	app_name="card_bookmark_new_"+browser
		        }
		        else{
			    	var app_version=chrome.app.getDetails().version
		        	app_name="card_bookmark_keep_"+(app_version.replace(/\./g, "_"))+"_"+browser
		        }
				
		        var nonceStr=String(Date.now())
		        var more=md5(app_name+nonceStr+"Verification")
		        var formData=new FormData;
		            formData.append("todo", "new_install")
		            formData.append("app_name", app_name)
		            formData.append("nonceStr", nonceStr)
		            formData.append("more", more)
				
		        post_data("https://aa-zz.cn/apps/user_tongji.php", formData, function(c){
		        	//console.log(c)
		        })
			})
		}
	}
	
	function get_browser(callback){
		var userAgent=navigator.userAgent
		var browser="chrome"
		if(/Edg/.test(userAgent)){
			browser="edge"
		}
		else{
			browser="chrome"
		}
		
		callback(browser)
	}
	
	function get_date(){
		var date_obj=new Date()
		var month=date_obj.getMonth()+1
		var date=/(\d+) (\d+) (\d+:\d+:\d+)/g.exec(date_obj)
		return date[2]+"-"+(month<10?'0'+month:month)+"-"+date[1]
	}
	
	function change_icon(url){
		//var theme_desc=window.matchMedia('(prefers-color-scheme: dark)').matches?"_for_dark":""
		var theme_desc="";
		
		if(all_cloud_bookmark.indexOf(url) !== -1){
			icon_name="icon_48"
			
			if(is_created_add_to_cloud_bookmark_menu){
			    chrome.contextMenus.remove("separator")
			    chrome.contextMenus.remove("add_to_cloud_bookmark")
				
				is_created_add_to_cloud_bookmark_menu=false
			}
		}
		else{
			icon_name="icon_48_not_in_cloud"
			
			if(is_use_webpage_contextmenu){
				created_add_to_cloud_bookmark_menu()
			}
		}
		
		chrome.browserAction.setIcon({path:"../icons/"+icon_name+theme_desc+".png"})
	}
	
	function create_add_to_read_later_menu(){
		if(!is_created_add_to_read_later_menu){
		    is_created_add_to_read_later_menu=true
		    
	        chrome.contextMenus.create({
                type: 'normal',
                title: '添加到传送门 (支持选取文字)',
	        	id: "add_to_read_later",
	        	contexts: ['page', 'selection'],
	        	documentUrlPatterns:["http://*/*", "https://*/*"],
	        	onclick: add_to_read_later
            })
		}
	}
	
	function created_add_to_cloud_bookmark_menu(){
		if(!is_created_add_to_cloud_bookmark_menu){
		    is_created_add_to_cloud_bookmark_menu=true
		    
		    chrome.contextMenus.create({
                type: 'separator',
                id: 'separator'
            })
		    
		    chrome.contextMenus.create({
                type: 'normal',
                title: '收藏到云书签',
	        	id: "add_to_cloud_bookmark",
	        	contexts: ['page'],
	        	documentUrlPatterns:["http://*/*", "https://*/*"],
	        	onclick: add_to_cloud_bookmark
            })
		}
	}
	
	function storage_set(object, callback){
		chrome.storage.local.set(object, function(c){
            if(callback){
				callback("finish")
			}
        })
	}
	
	function notify(title){
		if(notificationId !== null){
		    chrome.notifications.clear(notificationId)
			notificationId=null
		}
		
    	chrome.notifications.create({
    		type    : "basic",
    		iconUrl : "../icons/icon_notify.png",
    		title   : title,
    	    message : "\n卡片书签"
    	}, function(id){
			notificationId=id
			
			if(notification_t !== null){
				clearTimeout(notification_t)
				notification_t=null
			}
			notification_t=setTimeout(function(){
				if(notificationId !== null){
		            chrome.notifications.clear(notificationId)
		        	notificationId=null
		        }
			}, 5000)
		})
		
		chrome.notifications.onClicked.addListener(function(){
			chrome.notifications.clear(notificationId)
			notificationId=null
		})
    }
	
	function language(name){
		return chrome.i18n.getMessage(name)
	}
	
	function sendMessage_to_runtime(todo, extra){
		chrome.runtime.sendMessage({todo:todo, extra:extra})
	}
	
	function sendMessage_to_active_tab(todo, extra, callback){
		chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
		    chrome.tabs.sendMessage(tabs[0].id,{todo: todo, extra:extra},function(response){
                if(callback){
				    callback(response)
				}
	        })
	    })
	}