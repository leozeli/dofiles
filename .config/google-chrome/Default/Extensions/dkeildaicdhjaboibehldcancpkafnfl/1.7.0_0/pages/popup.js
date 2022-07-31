	var is_pc         = !/mobile/i.test(navigator.userAgent)
	var is_YaBrowser  = /YaBrowser/i.test(navigator.userAgent)
	var is_zh_cn      = chrome.i18n.getUILanguage()=="zh-CN"
	var body_el       = document.body
	var screen_width  = window.screen.width
	var screen_height = window.screen.height
	
	if(typeof localStorage.ls_data !== "undefined"){
		var ls_data=JSON.parse(localStorage.ls_data)
		
		if(typeof ls_data.is_bigger == "undefined"){
			ls_data.is_bigger=false
		}
		if(typeof ls_data.default_show_cloud == "undefined"){
			ls_data.default_show_cloud=false
		}
		if(typeof ls_data.is_use_scrollbar == "undefined"){
			ls_data.is_use_scrollbar=false
		}
		if(typeof ls_data.is_default_focus_new_tab == "undefined"){
			ls_data.is_default_focus_new_tab=true
		}
		if(typeof ls_data.is_notify_collect == "undefined"){
			ls_data.is_notify_collect=false
		}
		if(typeof ls_data.is_single_row == "undefined"){
			ls_data.is_single_row=false
		}
		if(typeof ls_data.is_keep_home_scroll_posi == "undefined"){
			ls_data.is_keep_home_scroll_posi=false
		}
		if(typeof ls_data.is_use_webpage_contextmenu == "undefined"){
			ls_data.is_use_webpage_contextmenu=false
		}
	}
	else{
		var ls_data={
			"is_bigger":false,
			"default_show_cloud":false,
			"is_use_scrollbar":false,
			"is_default_focus_new_tab":true,
			"is_notify_collect":false,
			"is_single_row":false,
			"is_keep_home_scroll_posi":false,
			"is_use_webpage_contextmenu":false
		}
		
		localStorage.ls_data=JSON.stringify(ls_data)
	}
	
	var is_bigger                = ls_data.is_bigger
	var default_show_cloud       = ls_data.default_show_cloud
	var is_use_scrollbar         = ls_data.is_use_scrollbar
	var is_default_focus_new_tab = ls_data.is_default_focus_new_tab
	var is_notify_collect        = ls_data.is_notify_collect
	var is_single_row            = ls_data.is_single_row
	var is_keep_home_scroll_posi = ls_data.is_keep_home_scroll_posi
	var is_use_webpage_contextmenu = ls_data.is_use_webpage_contextmenu
	
	var transparent_img    =  "data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg=="
	var more_app_lists    = [
	    {"name":{"zh_cn":"So Tab 新搜索", "en":"So Tab"}, "icon":"../img/more_apps/so_tab.png", "is_installed":false, "desc_simple":{"zh_cn":"多引擎快速搜索", "en":"Multi-engine fast search"}, "desc":{"zh_cn":"快速发起搜索，多个引擎自由切换，网页文字和图片可透视——在其他标签查看、编辑，快速将网页图片设为新标签背景", "en":"Quickly launch search, and multiple engines can switch freely."}, "url_chrome":"https://chrome.google.com/webstore/detail/kkfdbokcmmeepkfloclnkabfijpfebdd", "url_edge":"https://microsoftedge.microsoft.com/addons/detail/ihjnciigmjhibenkchdfdbcnadfipboe"},
		{"name":{"zh_cn":"隐形滚动条", "en":"Invisible scrollbar"}, "icon":"../img/more_apps/invisible_scrollbar.png", "is_installed":false, "desc_simple":{"zh_cn":"重新实现滚动条，悬浮显示、可隐形", "en":"Re-realize scrollbar, simple design and floating display"}, "desc":{"zh_cn":"重新实现滚动条，悬浮显示、可隐形", "en":"Re-realize scrollbar, simple design and floating display"}, "url_chrome":"https://chrome.google.com/webstore/detail/invisible-scroll-bar/nphnhlhdlbonnekhjlmphinfnmekiifk", "url_edge":"https://microsoftedge.microsoft.com/addons/detail/jmopomhdbfldgbfmmkldkkeahhpbldal"},
		{"name":{"zh_cn":"Copy X 收藏集", "en":"Copy X"}, "icon":"../img/more_apps/copy_x.png", "is_installed":false, "desc_simple":{"zh_cn":"复制即收藏，有文字有链接", "en":"Copy is collection, and there are words and links"}, "desc":{"zh_cn":"在网页上复制文字时，自动保存内容及所在网页的标题和网址。通过右键菜单获取图片链接时，自动保存图片链接并显示图片。轻松生成简约美观的收藏集", "en":"When copying text on a webpage, the content and the title and URL of the webpage are automatically saved. When you get the picture link through the right-click menu, automatically save the picture link and display the picture. Easily generate a simple and beautiful collection"}, "url_chrome":"https://chrome.google.com/webstore/detail/copy-x/pljacoeopccbcpnkgpbjmcckfehjjpbb", "url_edge":"https://microsoftedge.microsoft.com/addons/detail/copy-x/lngaifjohmlfigcnelbldnaoipdakeok"},
		{"name":{"zh_cn":"卡片书签", "en":"Card Bookmarks"}, "icon":"../img/more_apps/card_bookmark.png", "is_installed":true, "desc_simple":{"zh_cn":"以新的方式（弹窗）呈现书签", "en":"Presenting a bookmark in a new way"}, "desc":{"zh_cn":"不占用网页显示空间，简约设计，随时可用，用完即走", "en":"It does not occupy the display space of the webpage, is simple in design, and can be used at any time."}, "url_chrome":"https://chrome.google.com/webstore/detail/card-bookmarks/dkeildaicdhjaboibehldcancpkafnfl", "url_edge":"https://microsoftedge.microsoft.com/addons/detail/pohdfciklomffdjobmihohbdfdpkecli"}
	]
	var is_show_template   = {"status":false}
	
	//body_el.style.width    = (is_bigger?screen_width/2:screen_width/4)+"px"
    //body_el.style.height   = parseInt(screen_width/4*1.6)+"px"
	var body_width    = is_pc?Math.min(parseInt(is_bigger?screen_width/1.9:screen_width/4), parseInt(screen_width/2)):parseInt(screen_width-(is_YaBrowser?60:0))
	var body_height   = is_pc?Math.min(parseInt(screen_width/4*1.6), parseInt(screen_height*0.8)):parseInt(screen_height-(is_YaBrowser?60:0))
	
	body_el.style.setProperty("--body_width", body_width+"px")
	body_el.style.setProperty("--body_height", body_height+"px")
	body_el.style.setProperty("--scrollbar_width", is_use_scrollbar?'8px':'0px')
	
	window.onload=function(){
	    reset_size()
		
		window.onresize=reset_size
	}
	
	/* var css_link=document.createElement("link")
	    css_link.rel="stylesheet"
	    css_link.href="dark.css"
	document.head.appendChild(css_link) */
	
	var wrap=new Vue({
        el:"#wrap",
		data:{
			is_pc               : is_pc,
			is_zh_cn            : is_zh_cn,
			data_source         : default_show_cloud?"cloud":"local",
			url_arr_opened      : "",
			user_info           : {},
			cloud_bookmarks     : [],
			home_groups_data    : [],
			groups_arr          : [],
			is_show_template    : is_show_template,
			is_show_favicon     : false,
			transparent_img     : transparent_img,
			all_bookmark_data   : {},
			id_level1_arr       : [],
			                    
			hostname_obj_arr    : [],
			history_data        : [],
			
			search_offsettop    : 0,
			is_show_search_res  : false,
			display_scrollTo_butt : is_pc,
			scrollTo_top_bottom : "bottom",
			display_children    : false,
			is_show_children    : false,
			children_page_con   : null,
			is_use_scrollbar    : is_use_scrollbar,
			is_bigger           : is_bigger,
			is_default_focus_new_tab : is_default_focus_new_tab,
			is_notify_collect   : is_notify_collect,
			is_single_row       : is_single_row,
			is_keep_home_scroll_posi : is_keep_home_scroll_posi,
			is_use_webpage_contextmenu : is_use_webpage_contextmenu,
			more_app_lists      : more_app_lists,
			is_got_tabs_permission : true,
			children_page_arr   : [],
			viewed_data         : 0, /*打开的标签数目*/
			key_word            : "",
			search_type         : "bookmarks",
			search_res          : [],
			search_res_b        : [],
			search_res_h        : [],
			display_butt        : false,
			is_show_butt        : false,
			                    
			is_right_click      : false,
			is_checked_cloud_bookmark_up_time : false,
			is_press_shift      : false,
			is_press_ctrl       : false,
			from_page           : "",
			deal_folder         : [],
			prev_selected_idx   : null,
			selected_items_data : {},
			                    
			new_folder          : {"title":"", "is_select":false},
			home_folder         : {"is_select":false},
			folder_moveTo_arr   : [],
			the_next_items      : [],
			folder_moveTo       : null,
			the_next_item       : null,
			move_type           : "",
			                    
			display_move        : false,
			is_show_move        : false,
			                    
			display_setting     : false,
			is_show_setting     : false,
			time_now            : Date.now(),
			show_zs_img         : false,
			                    
			display_edit        : false,
			is_show_edit        : false,
			show_edit_url       : false,
			edit_title          : "",
			edit_url            : "",
			edit_title_old      : "",
			edit_url_old        : "",
			
			popup_div_width     : is_pc?is_bigger?parseInt(body_width/2-20)+"px":parseInt(body_width-20)+"px":"calc(100% - 20px)",
			display_cloud_bookmark_empty_notice:false,
			is_seted_onscroll_fun : false,
		},
		watch:{
			is_show_butt:function(){
				if(!this.is_show_butt){
					var that=this
					setTimeout(function(){
						that.display_butt=false
					}, 300)
				}
			},
			is_show_children:function(){
				if(!this.is_show_children){
					var that=this
					setTimeout(function(){
						that.display_children=false
					}, 300)
				}
			},
			is_show_move:function(){
				if(!this.is_show_move){
					var that=this
					setTimeout(function(){
						that.display_move=false
					}, 300)
				}
			},
			is_show_setting:function(){
				if(!this.is_show_setting){
					var that=this
					setTimeout(function(){
						that.display_setting=false
					}, 300)
				}
			},
			is_show_edit:function(){
				if(!this.is_show_edit){
					var that=this
					setTimeout(function(){
						that.display_edit=false
					}, 300)
				}
			},
			
			children_page_arr:function(){
				if(this.children_page_arr.length>0){
					this.children_page_con=this.$el.querySelector(".children_page_con")
				    this.children_page_con.scrollTop=this.children_page_arr[this.children_page_arr.length-1].scrollTop
				}
			},
			key_word:function(){
				this.cancel_right_click()
				
				this.search_bookmarks(()=>{
					this.search_history(()=>{
						if(this.search_res_b.length>0 || this.search_res_h.length>0){
							if(this.search_type=="bookmarks"){
						    	this.search_res=this.search_res_b.slice(0, 50)
						    }
						    else{
						    	this.search_res=this.search_res_h.slice(0, 50)
						    }
							this.is_show_search_res=true
						}
						else{
							this.search_type="bookmarks"
							this.search_res=[]
							this.is_show_search_res=false
						}
					})
				})
			}
		},
		computed:{
			all_folder_name:function(){
				var name_arr=[]
				this.all_bookmark_data.folder.forEach(function(item){
					name_arr.push(item.title)
				})
				return name_arr
			}
		},
		compiled:function(){
			this.main   = this.$el.querySelector("#main")
			this.groups = main.querySelector(".groups")
			this.search_offsettop = main.querySelector(".search").offsetTop
		},
		methods:{
			switch_data:function(){
				this.cancel_right_click()
				this.search_res  =[]
				this.search_res_b=[]
				this.search_res_h=[]
				
				if(this.data_source=="local"){
					get_data("cloud", false, "")
				}
				else{
					get_data("local", false, "")
				}
			},
			show_viewed_data:function(){
				viewed_data.is_bigger=this.is_bigger
				viewed_data.url_arr_opened=this.url_arr_opened
				
				if(this.is_got_tabs_permission){
					viewed_data.show()
				}
				else{
					warning.show(language("need_get_tabs_permission"), "get_tabs_permission")
				}
			},
			show_menu:function(){
				if(this.data_source=="local"){
				    more_menu_local.show()
				}
				if(this.data_source=="cloud"){
					more_menu_cloud.show()
				}
			},
			get_search_res_style:function(item, idx){
				var style={
					border:(item.is_select?'2px solid #2196f3':(this.is_right_click && this.from_page=='search_res'?'1px dashed #888':'1px solid transparent')),
					backgroundImage:'url('+(item.children?'../img/next.png':'')+')'
				}
				
				if(idx===0){
					style.backgroundColor='#ccc'
				}
				
				return style
			},
			search_input_focus:function(){
				if(!this.is_show_search_res){
					this.cancel_right_click()
				}
			},
			renew_search:function(){
				if(typeof localStorage.key_word !== "undefined"){
					this.key_word=localStorage.key_word
				}
			},
			search_input_enter:function(){
				var item=this.search_res[0]
				
				if(this.search_type=='bookmarks'){
				    this.click_bk(this.search_res, item, 0)
				}
				else{
					this.open_webpage(item.url)
				}
			},
			change_search_type:function(type){
				this.search_type=type
				
				if(type=="bookmarks"){
					this.search_res=this.search_res_b.slice(0, 50)
				}
				else{
					this.cancel_right_click()
					
					this.search_res=this.search_res_h.slice(0, 50)
				}
			},
			search_bookmarks:function(/* is_by_click_search_type,  */callback){
				var key_word=this.key_word.toLowerCase()
				
				if(key_word.replace(/\s/g, "").length>0){
					key_word=key_word.replace(/^\s+/, "").replace(/\s+$/, "")
					
					var query_arr=key_word.split(/ +/)
					var filter_arr=[]
					if(/-/.test(key_word)){
					    var part_arr=key_word.split(/-/)
						var last_part=part_arr[part_arr.length-1].replace(/^\s+/, "").replace(/\s+$/, "")
						if(last_part.length>0){
						    query_arr=part_arr.slice(0, part_arr.length-1).join("").replace(/^\s+/, "").replace(/\s+$/, "").split(/ +/)
					        filter_arr=last_part.split(/ +/)
						}
					}
					
				    var all_bookmark_data=this.all_bookmark_data
				    
				    //this.is_show_search_res=true
				
				    if(typeof all_bookmark_data.item_info !== "undefined"){
						this.judge(all_bookmark_data.item_info, query_arr, "find", (data_arr_query)=>{
					    	if(filter_arr.length>0){
					    	    this.judge(data_arr_query, filter_arr, "filter", (data_arr_filter)=>{
					    	        this.search_res_b=data_arr_filter
					            })
					    	}
					    	else{
					    		this.search_res_b=data_arr_query
					    	}
					    })
				    	
						callback("finish")
				    }
				    else{
						this.search_res_b=[]
						callback("finish")
				    }
				}
				else{
					this.search_res_b=[]
					callback("finish")
				}
			},
			search_history:function(callback){
	            var key_word=this.key_word.toLowerCase()
				
				if(key_word.replace(/\s/g, "").length>0){
				    key_word=key_word.replace(/^\s+/, "").replace(/\s+$/, "")
					
					var query_arr=key_word.split(/ +/)
					var filter_arr=[]
					if(/-/.test(key_word)){
					    var part_arr=key_word.split(/-/)
						var last_part=part_arr[part_arr.length-1].replace(/^\s+/, "").replace(/\s+$/, "")
						if(last_part.length>0){
						    query_arr=part_arr.slice(0, part_arr.length-1).join("").replace(/^\s+/, "").replace(/\s+$/, "").split(/ +/)
					        filter_arr=last_part.split(/ +/)
						}
					}
				    
				    //this.is_show_search_res=true
	            
	            	this.judge(this.history_data, query_arr, "find", (data_arr_query)=>{
						if(filter_arr.length>0){
						    this.judge(data_arr_query, filter_arr, "filter", (data_arr_filter)=>{
						        this.search_res_h=data_arr_filter
					        })
						}
						else{
							this.search_res_h=data_arr_query
						}
					})
					
					callback("finish")
	            }
	            else{
					this.search_res_h=[]
					callback("finish")
	            }
			},
			judge:function(lists, query_arr, type, callback){
				var data_arr = []
				var bool_arr = []
				
				for(var i=0, l=lists.length;i<l;i++){
	            	var item_info=lists[i]
	            	var title    =item_info.title.toLowerCase()
	            	var url      =item_info.url?item_info.url.toLowerCase():""
					
				    //多重判断
	                for(var k=0, ll=query_arr.length;k<=ll;k++){
	                    if(k==ll){ //最终结果
	                	    if(bool_arr.indexOf(false) == -1){
				    			item_info.is_select=false
								data_arr.push(item_info)
							}
	                	}
	                	else{
				    		var condition=null
				    		if(type=="find"){
				    			condition=title.indexOf(query_arr[k]) !== -1 || url.indexOf(query_arr[k]) !== -1
				    		}
				    		else{
				    			condition=title.indexOf(query_arr[k]) == -1 && url.indexOf(query_arr[k]) == -1
				    		}
				    		
	                        if(condition){
	                			bool_arr[k]=true
	                        }
	                        else{
	                			bool_arr[k]=false
	                        }
	                	}
	                }
				}
				
				callback(data_arr)
			},
			send_to_so_tab:function(){
				var that=this
				get_browser((browser)=>{
					try{
				        chrome.runtime.sendMessage(browser=="chrome"?"jmnfljflnnmefiaimeaphopfigngmigd":"", {"todo":"keep_search_text", "extra":{"obj_keep":{"type":"text", "text":that.key_word}, "is_need_save_to_search_record":false}}, function(c){
				        	if(typeof c !== "undefined"){
				        		toast.show(language("send_to_so_tab_success"))
				        	}
				        })
					}
					catch(e){
						warning.show(language("not_install_so_tab"), "install_so_tab")
					}
				})
			},
			show_more_search_res:function(){
				if(this.search_type=="bookmarks"){
				    this.search_res=this.search_res.concat(this.search_res_b.slice(this.search_res.length, this.search_res.length+100))
				}
				else{
					this.search_res=this.search_res.concat(this.search_res_h.slice(this.search_res.length, this.search_res.length+100))
				}
			},
			show_setting_page:function(){
				this.time_now=Date.now()
				this.display_setting=true
				this.is_show_setting=true
			},
			hide_setting_page:function(){
				this.is_show_setting=false
			},
			use_cloud:function(){
				login.to_login()
			},
			use_scrollbar:function(){
				this.is_use_scrollbar = !this.is_use_scrollbar
				ls_data.is_use_scrollbar=this.is_use_scrollbar
			    localStorage.ls_data=JSON.stringify(ls_data)
				body_el.style.setProperty("--scrollbar_width", this.is_use_scrollbar?'8px':'0px')
			},
			get_time:function(timestamp){
				var date_time=more_menu_cloud.get_time(timestamp)
				return date_time
			},
			check_end_time:function(){
				if(this.user_info.user_id==""){
					warning.show(language('need_login'), "login")
				}
				else{
				    do_get_end_time()
				}
			},
			to_activate:function(){
				login.activate_desc=language('renewals_notice')
				login.display=true
				login.is_show=true
				login.show_activate=true
			},
			to_export:function(){
				//warning.show(language('export_notice'), "export") //将云端书签导出为文件
				
				console.log(wrap.cloud_bookmarks)
				
				let idx_num_all=0
				let idx_num_create=0
				
				function create_bk(arr, parentId){
					arr.forEach((item, idx)=>{
						idx_num_all+=1
						let bk_obj={
							index: idx,
							parentId: parentId,
							title: item.title,
							url: item.url?item.url:null,
						}
						
						chrome.bookmarks.create(bk_obj, (res)=>{
							idx_num_create+=1
							if(typeof item.children !== "undefined"){
								create_bk(item.children, res.id)
							}
							else{
								if(idx_num_create === idx_num_all){
									console.log("-------done--------")
									sent_to_runtime({todo:"create_bk_from_cloud_data", extra:{is_deal_onCreated:true}})
									
									toast.show(language('export_cloud_data_to_local_success'))
								}
							}
						})
					})
				}
				
				sent_to_runtime({todo:"create_bk_from_cloud_data", extra:{is_deal_onCreated:false}})
				
				setTimeout(()=>{
					more_menu_cloud.to_load_cloud_data(()=>{
						let cloud_bookmarks=JSON.parse(JSON.stringify(wrap.cloud_bookmarks))
					    
					    cloud_bookmarks[0].title="卡片书签云端导入 "+moment().format("MM-DD HH:mm")
					    create_bk(cloud_bookmarks, "1")
					})
				}, 100)
			},
			to_clear_data:function(){
				warning.show(language('clear_showed_cloud_data_notice'), "clear_data")
			},
			to_logout:function(){
				warning.show(language('logout_notice'), "logout")
			},
			show_child_page:function(title, children, item){
				var that=this
				var obj={}
				    obj.children_title=title
					obj.children      =children.length>50?children.slice(0, 50):children
				
				if(this.children_page_arr.length>0){
				    this.children_page_arr[this.children_page_arr.length-1].scrollTop=this.children_page_con.scrollTop
				}
				
				this.children_page_arr.push(obj) // children_page_arr 中的 children 数组最终指向源数据，即就是 groups_arr 中的数据
				this.display_children=true
				this.is_show_children=true
				this.$nextTick(()=>{
					if(children.length>50){
						setTimeout(()=>{
							obj.children=children
							that.$nextTick(()=>{
							    that.scroll_child_page(children, item)
							})
						}, 10)
					}
					else{
						that.scroll_child_page(children, item)
					}
				})
			},
			scroll_child_page:function(children, item){
				if(item !== null){
					if(!this.is_single_row){
				        if(!this.is_bigger){
				            this.children_page_con.scrollTop=this.children_page_con.scrollHeight/children.length*children.indexOf(item)
				        }
				        else{
				        	this.children_page_con.scrollTop=this.children_page_con.scrollHeight/Math.ceil(children.length/3)*(Math.ceil((children.indexOf(item)+1)/3)-1)
				        }
					}
					else{
						this.children_page_con.scrollTop=this.children_page_con.scrollHeight/children.length*children.indexOf(item)
					}
				    
				    item.is_select=true
				    setTimeout(function(){
				    	item.is_select=false
				    }, 1500)
				}
			},
			main_scroll:function(type){
				var el=this.is_keep_home_scroll_posi?this.is_show_search_res?this.main:this.groups:this.main
				
				if(type=="top"){
				    el.scrollTop=0
				}
				else{
					el.scrollTop=el.scrollHeight
				}
			},
			scroll_to_top:function(){
				this.children_page_con.scrollTop=0
			},
			scroll_to_bottom:function(){
				this.children_page_con.scrollTop=this.children_page_con.scrollHeight
			},
			bigger:function(){
				this.is_bigger = !this.is_bigger
				
				var body_width    = is_pc?Math.min(parseInt(this.is_bigger?screen_width/1.9:screen_width/4), parseInt(screen_width/2)):parseInt(screen_width-(is_YaBrowser?60:0))
				
				body_el.style.setProperty("--body_width", body_width+"px")
				
				is_bigger=this.is_bigger
				ls_data.is_bigger=this.is_bigger
				localStorage.ls_data=JSON.stringify(ls_data)
				
				this.display_setting=false
				this.is_show_setting=false
			},
			single_row:function(){
				this.is_single_row=!this.is_single_row
				
				ls_data.is_single_row=this.is_single_row
				localStorage.ls_data=JSON.stringify(ls_data)
			},
			set_is_default_focus_new_tab:function(){
				this.is_default_focus_new_tab=!this.is_default_focus_new_tab
				
				ls_data.is_default_focus_new_tab=this.is_default_focus_new_tab
				localStorage.ls_data=JSON.stringify(ls_data)
			},
			notify_collect:function(){
				this.is_notify_collect=!this.is_notify_collect
				
				ls_data.is_notify_collect=this.is_notify_collect
				localStorage.ls_data=JSON.stringify(ls_data)
			},
			keep_home_scroll_posi:function(){
				this.is_keep_home_scroll_posi = !this.is_keep_home_scroll_posi
				
				ls_data.is_keep_home_scroll_posi=this.is_keep_home_scroll_posi
				
				localStorage.ls_data=JSON.stringify(ls_data)
				localStorage.main_scrolltop="0"
			},
			use_webpage_contextmenu:function(){
				this.is_use_webpage_contextmenu=!this.is_use_webpage_contextmenu
				
				ls_data.is_use_webpage_contextmenu=this.is_use_webpage_contextmenu
				localStorage.ls_data=JSON.stringify(ls_data)
				sent_to_runtime({todo:"change_is_use_webpage_contextmenu"})
			},
			view_app_detail:function(list){
				get_browser((browser)=>{
					var url=""
					if(typeof list["url_"+browser] !== "undefined"){
					    url=list["url_"+browser]
					}
					else{
						url=list["url_edge"]
					}
					this.open_webpage(url)
				})
			},
			sort_local_bookmark:function(){
				warning.show(language('sort_local_bookmark_notice'), "sort_local_bookmark")
			},
			hongbao:function(){
				qr_code.show(false, "../img/hongbao.png", language('scan_hongbao'))
			},
			get_icon:function(url){
				return "chrome://favicon/"+url
			},
			check_is_opened:function(item){
				if(typeof item.url !== "undefined"){
				    return this.url_arr_opened.indexOf(item.url.replace(/^https?/, '')) !== -1
				}
				else{
					return false
				}
			},
			open_webpage:function(url){
				if(this.search_res.length>0){
				    localStorage.key_word=this.key_word
				}
				
				if(this.is_default_focus_new_tab){
					if(!this.is_press_ctrl){
				    	this.create_tab({url:url, active:true})
				    }
				    else{
						this.create_tab({url:url, active:false})
					}
				}
				else{
					if(!this.is_press_ctrl){
				    	this.create_tab({url:url, active:false})
				    }
				    else{
						this.create_tab({url:url, active:true})
					}
				}
			},
			create_tab:function({url, active}){
			    chrome.tabs.query({active:true, currentWindow: true}, function(tabs){
					console.log(tabs)
					chrome.tabs.create({url, index:tabs[0].index+1, active})
				})
			},
			hide_children_page:function(){
				if(this.is_show_children){
				    this.is_show_children=false
				    var that=this
				    setTimeout(function(){
				        that.children_page_arr.splice(0, that.children_page_arr.length)
				    }, 300)
				}
			},
			back:function(){
				if(this.children_page_arr.length==1){
					this.is_show_children=false
					var that=this
					setTimeout(function(){
						that.children_page_arr.splice(0, 1)
					}, 300)
				}
				else{
					this.children_page_arr.splice(this.children_page_arr.length-1, 1)
				}
				this.cancel_right_click()
			},
			get_title:function(item){
				return item.title+' | '+(item.url.replace(/^https?:\/\/(www\.)?/, '').replace(/\/.+/, ''))
			},
            click_bk:function(folder, item, idx){
				if(!this.is_right_click){
					if(typeof item.children !== "undefined"){
					    this.show_child_page(item.title, item.children, null)
					}
					else{
						this.open_webpage(item.url)
					}
				}
				else{
					if(folder == this.deal_folder){
					    if(!item.is_select){
					    	if(this.is_press_shift){
								this.is_press_shift=false
					    		if(this.prev_selected_idx !== null){
					    			if(idx>this.prev_selected_idx){
					    	    		var start=this.prev_selected_idx
					    	    		var end  =idx
					    	    	}
					    	    	else{
					    	    		var start=idx
					    	    		var end  =this.prev_selected_idx
					    	    	}
					    	    	for(var i=start;i<=end;i++){
					    				this.deal_folder[i].is_select=true
					    	    	}
					    		}
					    	}
					    	else{
					    		item.is_select = true
					    	}
					    	this.prev_selected_idx = idx
					    }
					    else{
					    	item.is_select = false
					    }
					}
					else{
						toast.show(language('cross_region_selection'))
					}
				}
			},
			show_its_folder:function(item){
				var all_idx=this.all_bookmark_data.item_info.indexOf(item)
				var its_folder_title=this.all_bookmark_data.item_parent_title[all_idx]
				var its_folder_children=this.all_bookmark_data.item_parent_children[all_idx]
				
				this.show_child_page(its_folder_title, its_folder_children, item)
			},
            right_click:function(folder, item, idx, from_page){
				var that=this
				this.from_page = from_page
				
				if(!this.is_right_click){
					if(this.data_source=="cloud"){
						if(!this.is_checked_cloud_bookmark_up_time){
						    check_cloud_bookmark_up_time(function(c){
						    	if(c=="need_update"){
									var next_todo=""
									if(from_page=="search_res"){
										next_todo="search"
									}
									else if(from_page=="children"){
										next_todo="show_child_page"
									}
									
									get_data("cloud", false, next_todo)
									toast.show(language("cloud_bookmarks_is_updated"))
								}
								else{
									that.action_right_click(folder, item, idx)
								}
						    })
						}
						else{
							this.action_right_click(folder, item, idx)
						}
					}
					else{
						this.action_right_click(folder, item, idx)
					}
				}
				else{
					this.cancel_right_click()
				}
			},
			action_right_click:function(folder, item, idx){
				this.deal_folder =folder
				this.prev_selected_idx = idx
				
				item.is_select=true
				this.is_right_click=true
				this.$nextTick(function(){
				    this.display_butt=true
				    this.is_show_butt=true
					//toast.show("支持多选，支持 Shift 区间选")
				})
			},
			item_keyup:function(e){
				if(e.keyCode==13){
					e.currentTarget.click()
				}
			},
			cancel_right_click:function(){
				if(this.is_right_click){
				    this.is_right_click=false
				    this.is_press_shift=false
				    this.is_show_butt  =false
					
				    this.deal_folder.forEach(function(item){
				    	item.is_select=false
				    })
				}
			},
			get_selected_data:function(callback){
				var data={}
				    data.selected_items=[]
				    data.selected_idxs =[]
				
				for(var i=0;i<this.deal_folder.length;i++){
				    var item=this.deal_folder[i]
				    if(item.is_select){
					    data.selected_items.push(item)
					    data.selected_idxs.push(i)
					}
				}
				
				if(data.selected_items.length>0){
				    callback(data)
				}
				else{
				    callback(null)
				}
			},
			edit:function(){
				var that=this
				this.get_selected_data(function(data){
					if(data){
					    if(data.selected_idxs.length==1){
							var the_bookmark=data.selected_items[0]
						    if(typeof the_bookmark.children == "undefined"){
						    	that.show_edit_url = true
						    	that.edit_url      = the_bookmark.url
						    	that.edit_url_old  = the_bookmark.url
						    }
						    else{
						    	that.show_edit_url= false
						    }
						    
							that.selected_items_data=data
						    that.edit_title     = the_bookmark.title
						    that.edit_title_old = the_bookmark.title
						    that.display_edit = true
						    that.is_show_edit = true
							that.is_show_butt = false
						}
						else{
							that.cancel_right_click()
						}
					}
					else{
						toast.show(language('no_selection'))
					}
				})
			},
			do_edit:function(){
				var that  = this
				var change_obj={}
				var bookmark_editing = this.selected_items_data.selected_items[0]
				
				if(this.edit_title.replace(/\s/g, "").length>0){
				    if(this.show_edit_url){
						if(this.edit_url.replace(/\s/g, "").length>0){
				    	    change_obj.title=this.edit_title.replace(/^\s+/, "").replace(/\s+$/, "")
				    	    change_obj.url  =this.edit_url.replace(/\s/g, "")
				    	    bookmark_editing.title=change_obj.title
				    	    bookmark_editing.url  =change_obj.url
						}
						else{
							toast.show(language('cant_be_empty'))
							return
						}
				    }
				    else{
				    	change_obj.title=this.edit_title.replace(/^\s+/, "").replace(/\s+$/, "")
				    	bookmark_editing.title=change_obj.title
				    }
					
				    //更新本地书签系统
					if(this.data_source=="local"){
				        chrome.bookmarks.update(bookmark_editing.id, change_obj, function(){
				        	//console.log(bookmark_editing)
				        	that.hide_edit()
				        })
					}
					else{
						if(this.show_edit_url){
							if(this.edit_url !== this.edit_url_old || this.edit_title !== this.edit_title_old){
								update_cloud_bookmark("for_edit")
							}
						}
						else{
							if(this.edit_title !== this.edit_title_old){
								update_cloud_bookmark("for_edit")
							}
						}
						that.hide_edit()
					}
				}
				else{
					toast.show(language('cant_be_empty'))
				}
			},
			hide_edit:function(){
				this.is_show_edit = false
				this.cancel_right_click()
			},
			fixed_to_top:function(){
				var that=this
				this.get_selected_data(function(data){
				    if(data){
						that.selected_items_data  = data
				        that.change_position("fixed_to_top", that.groups_arr[0].children, that.groups_arr[0].id, 0)
				    }
					else{
						that.cancel_right_click()
					}
				})
			},
			change_position:function(type, folder_arr, parentId, index){ //folder_arr 是当前的 children 数组
				var that=this
				var all_item_info=this.all_bookmark_data.item_info
				var all_parent_arr=this.all_bookmark_data.item_parent_children
				var idx_add=0
				var data=that.selected_items_data
				
				this.remove_from_target_position()
				
				if(type !== "fixed_to_top"){
				    idx_add=folder_arr.indexOf(that.the_next_item)
				}
				
				/* 由于书签系统的不确定性导致 move 后的顺序可能与预期的不同，所以 data_source=="local" 时改为 move 之后重新获取一遍数据
				//更新 all_parent_arr, 向 folder_arr 加入选中的书签
				//data.selected_items.reverse()
				data.selected_items.forEach(function(item){
				    item.is_select=false
					if(that.from_page=="search_res"){ //置顶
						var all_idx=all_item_info.indexOf(item)
					    all_parent_arr[all_idx]=folder_arr
					}
					
					//更新显示数据->视图
					folder_arr.splice(idx_add, 0, item)
					idx_add+=1
					
					//更新本地书签系统
					if(that.data_source=="local"){
						if(type=="fixed_to_top"){
					        chrome.bookmarks.move(item.id, {parentId:parentId, index:index})
						}
						else{
							//if(that.from_page!=="search_res"){
							    chrome.bookmarks.move(item.id, {parentId:item.parentId, index:index})
							//}
						}
					}
				}) */
				
				if(this.data_source=="local"){
					data.selected_items.forEach(function(item){
						chrome.bookmarks.move(item.id, {parentId:parentId, index:index}, ()=>{
							get_data("local", false, that.from_page=="children"?"show_child_page":"")
						})
					})
					
					this.is_right_click=false
					this.is_press_shift=false
				    this.is_show_butt  =false
				}
				else{
					//更新 all_parent_arr, 向 folder_arr 加入选中的书签
					data.selected_items.forEach(function(item){
				        item.is_select=false
					    if(that.from_page=="search_res"){ //置顶
					    	var all_idx=all_item_info.indexOf(item)
					        all_parent_arr[all_idx]=folder_arr
					    }
					    
					    //更新显示数据->视图
					    folder_arr.splice(idx_add, 0, item)
					    idx_add+=1
					})
					
					update_cloud_bookmark("for_move")
					that.cancel_right_click()
				}
				
			    if(type !== "fixed_to_top"){
					that.is_show_move=false
				}
			},
			show_delete_warning:function(){
				var that=this
				this.get_selected_data(function(data){
				    if(data){
						that.selected_items_data  = data
						that.is_show_butt         = false
						warning.show(language("delete_warning_title1")+" "+data.selected_items.length+" "+language("delete_warning_title2"), "delete_bookmark")
					}
					else{
						that.cancel_right_click()
					}
				})
			},
			do_delete:function(){
				var that=this
				var deal_folder=this.deal_folder
				var all_item_info=this.all_bookmark_data.item_info
				var all_parent_title=this.all_bookmark_data.item_parent_title
				var all_parent_arr=this.all_bookmark_data.item_parent_children
				var all_folder=this.all_bookmark_data.folder
				
				var is_have_non_empty_folder=false
				var is_have_do_delete=false //有过删除行为
				var data=this.selected_items_data
				
				//必须倒循环
				for(var i=data.selected_idxs.length-1;i>=0;i--){
					var selected_idx =data.selected_idxs[i]
					var selected_item=data.selected_items[i]
					
				    if(typeof selected_item.children !== "undefined" && selected_item.children.length>0){
						is_have_non_empty_folder=true
					}
					else{
						is_have_do_delete=true
						
						//1. 从当前列表删除
					    deal_folder.splice(selected_idx, 1)
						console.log(deal_folder)
						
						if(this.from_page=="home"){
							//groups_arr 已经更新
						}
						else if(this.from_page=="children"){
							//groups_arr 已经更新，这里要注意一下：由于 children page 的数据加载策略（大于50的先加载前50个），所以需要检查 deal_folder 是新建的数组还是源数组
						}
						else if(this.from_page=="search_res"){
							this.search_res_b.splice(selected_idx, 1)
						}
						
						//2. 从 all_bookmark_data.item_info 中删除
						var all_idx=all_item_info.indexOf(selected_item)
						
						all_item_info.splice(all_idx, 1)
						all_parent_title.splice(all_idx, 1)
						
						if(this.from_page=="children"){
							//children_page_arr 已经更新，但 groups_arr 未更新
							if(this.search_res.length>0){
								this.search_bookmarks(false)
							}
						}
						
						//3. 从 all_bookmark_data.item_parent_children 中的 parent_arr 中删除
						if(this.from_page=="home"){
							//1 已经执行了删除
						}
						else if(this.from_page=="children"){
							//1 已经执行了删除
						}
						else if(this.from_page=="search_res"){
							var parent_arr=all_parent_arr[all_idx]
						    var idx=parent_arr.indexOf(selected_item)
							
						    parent_arr.splice(idx, 1)
						}
						
						// 4.all_bookmark_data.item_parent_children 中删除对应的 parent_arr
						all_parent_arr.splice(all_idx, 1)
						
						//5.从 all_folder 中删除
						if(typeof selected_item.children !== "undefined"){
							var idx=all_folder.indexOf(selected_item)
							all_folder.splice(idx, 1)
						}
						
						console.log(this.all_bookmark_data)
						
					    //更新本地书签系统
						if(this.data_source=="local"){
					        chrome.bookmarks.remove(selected_item.id)
						}
					}
				}
				
				if(is_have_non_empty_folder){
					toast.show(language("delete_warning_desc"))
				}
				
				if(this.data_source=="cloud"){
					if(is_have_do_delete){
					    update_cloud_bookmark("for_delete")
					}
				}
				
				warning.hide()
			},
			show_move_page:function(){
				var that=this
				this.get_selected_data(function(data){
				    if(data){
						that.selected_items_data  = data
						
						that.new_folder.title     = ""
						that.new_folder.is_select = false
						that.home_folder.is_select= false
						
						that.is_show_butt         = false
				        that.move_type            = ""
						that.folder_moveTo_arr    = null
						that.the_next_items       = null
						that.folder_moveTo        = null
						that.the_next_item        = null
				        that.display_move         = true
				        that.is_show_move         = true
						
						if(that.from_page=="search_res"){
							that.check_folder_show()
							that.move_type="move_to_folder"
						}
					}
					else{
						that.cancel_right_click()
					}
				})
			},
			check_folder_show:function(){
				var that=this
				var selected_items       = this.selected_items_data.selected_items
				var folder_moveTo_arr    = []
				var folder_moveTo_arr_ok = []
				
				//1.过滤相同书签夹
				folder_moveTo_arr = this.all_bookmark_data.folder.filter(function(item_folder){
					if(selected_items.indexOf(item_folder)==-1){
						return true
					}
					else{
						return false
					}
				})
				
				//获取要移动的书签列表中可能包含的所有子书签夹
				var all_son_folders=[]
				selected_items.forEach(function(item){
					if(typeof item.children !== "undefined" && item.children.length>0){
	            	    get_all_son_folders(item.children)
	            	}
				})
				
				//2.过滤子书签夹
				folder_moveTo_arr_ok = folder_moveTo_arr.filter(function(item_folder){
					if(all_son_folders.indexOf(item_folder)==-1){
						return true
					}
					else{
						return false
					}
				})
				
				that.folder_moveTo_arr = folder_moveTo_arr_ok
				
				function get_all_son_folders(parent_arr){ //children array
	            	for(var i=0;i<parent_arr.length;i++){
	            		if(typeof parent_arr[i].children !== "undefined"){
	            			all_son_folders.push(parent_arr[i])
	            			if(parent_arr[i].children.length>0){
	            			    get_all_son_folders(parent_arr[i].children)
	            			}
	            		}
	            	}
	            }
			},
			check_the_next_items:function(data){
				var that=this
				var selected_items = this.selected_items_data.selected_items
				var idx_remove_arr=[]
				selected_items.forEach(function(item_selected){
					var idx=that.deal_folder.indexOf(item_selected)
					if(idx_remove_arr.indexOf(idx) == -1){
					    idx_remove_arr.push(idx)
					}
					if(idx_remove_arr.indexOf(idx+1) == -1){
					    idx_remove_arr.push(idx+1)
					}
				})
				
				that.the_next_items=that.deal_folder.filter(function(item, idx){
					if(idx_remove_arr.indexOf(idx) == -1){
						return true
					}
					else{
						return false
					}
				})
				
				if(that.the_next_items.length==0){
					toast.show(language('no_more_item_to_choose_from'))
				}
			},
			choose_move_type:function(type){
				if(this.from_page!=="search_res"){
				    this.move_type=type
				    if(this.move_type=='move_to_folder'){
				    	if(this.the_next_item !== null){
				        	this.the_next_item.is_select=false
				        }
				    	if(this.folder_moveTo_arr == null){
				    	    this.check_folder_show()
				    	}
				    }
				    else{
				    	if(this.folder_moveTo !== null){
				        	this.folder_moveTo.is_select=false
				        }
				    	
				    	if(this.the_next_items == null){
				    	    this.check_the_next_items()
				    	}
				    	else{
				    		if(this.the_next_items.length==0){
				            	toast.show(language('no_more_item_to_choose_from'))
				            }
				    	}
				    }
				}
			},
			hide_move_page:function(){
				this.cancel_right_click()
				if(this.folder_moveTo && this.folder_moveTo !== this.groups_arr[0]){
					this.folder_moveTo.is_select=false
				}
				this.is_show_move  = false
			},
			select_new_move_to_folder:function(){
				this.new_folder.is_select =true
				this.home_folder.is_select=false
				if(this.folder_moveTo){
					this.folder_moveTo.is_select=false
				}
				
				this.folder_moveTo = null
			},
			select_home_move_to_folder:function(){
				this.home_folder.is_select=true
				this.new_folder.is_select =false
				if(this.folder_moveTo){
					this.folder_moveTo.is_select=false
				}
				this.folder_moveTo = this.groups_arr[0]
			},
			select_move_to_folder:function(item){
				item.is_select=true
				this.new_folder.is_select=false
				this.home_folder.is_select=false
				if(this.folder_moveTo !== null && this.folder_moveTo !== item){
					this.folder_moveTo.is_select=false
				}
				
				this.folder_moveTo = item
			},
			select_the_next_item:function(item){
				item.is_select=true
				if(this.the_next_item !== null && this.the_next_item !== item){
					this.the_next_item.is_select=false
				}
				
				this.the_next_item = item
			},
			do_move:function(){
				if(this.move_type=='move_to_folder'){
				    this.do_move_to_folder()
				}
				else{
					if(this.the_next_item){
					    this.change_position("sort", this.deal_folder, this.data_source=="local"?this.deal_folder[0].parentId:"", this.the_next_item.index)
					}
					else{
						toast.show(language('cant_be_empty'))
					}
				}
			},
			do_move_to_folder:function(){
				var that=this
				var deal_folder=this.deal_folder
				var data=this.selected_items_data
				
				var all_item_info=this.all_bookmark_data.item_info
				var all_parent_title_arr=this.all_bookmark_data.item_parent_title
				var all_parent_arr=this.all_bookmark_data.item_parent_children
				var all_folder=this.all_bookmark_data.folder
				
				var home_page  =this.groups_arr[0].children
				var home_pageId=this.groups_arr[0].id
				//console.log(this.folder_moveTo)
				
				if(this.folder_moveTo){ //移动到首页或者其他存在的书签夹中
					var moveTo_children=this.folder_moveTo.children
					
					this.remove_from_target_position()
					
					//如果先 push 后删除，当移动到当前书签夹的时候，对搜索列表的操作将会导致书签最终被删除了
					
					//更新 all_parent_arr, 向新书签夹加入选中的书签
					data.selected_items.forEach(function(item){
						var all_idx=all_item_info.indexOf(item)
						
						item.is_select=false
						moveTo_children.push(item)
						
						//更新 parent_arr
						all_parent_title_arr[all_idx] = that.folder_moveTo.title
						all_parent_arr[all_idx] = moveTo_children
					})
					
					//更新本地书签系统
					if(this.data_source=="local"){
						chrome.bookmarks.getChildren(this.folder_moveTo.id, (c)=>{
							var index=c[c.length-1].index
							
					        data.selected_items.forEach(function(item){
					        	chrome.bookmarks.move(item.id, {parentId: that.folder_moveTo.id, index: ++index})
					        })
					    })
					}
					else{
						update_cloud_bookmark("for_move")
					}
				    
					this.hide_move_page()
				}
				else{
					if(this.new_folder.is_select && this.new_folder.title.replace(/\s/g, "").length>0){
						var new_folder_title=this.new_folder.title.replace(/^\s+/, "").replace(/\s+$/, "")
						if(this.all_folder_name.indexOf(new_folder_title) == -1){
						    this.remove_from_target_position()
						    
							//更新 all_parent_arr, 向新书签夹加入选中的书签
							var index_arr=[]
						    var folder_obj ={}
							
							home_page.forEach(function(item, idx){
						    	index_arr.push(item.index)
						    })
					        index_arr.sort(function(a, b){
					        	return b-a
					        })
							
						    folder_obj.title=new_folder_title
						    folder_obj.index=Number(index_arr[0])+1
						    folder_obj.children=[]
						    folder_obj.is_select=false
							
						    data.selected_items.forEach(function(item){
								var all_idx=all_item_info.indexOf(item)
								
						    	item.is_select=false
								folder_obj.children.push(item)
								
								all_parent_title_arr[all_idx] = new_folder_title
								all_parent_arr[all_idx] = folder_obj.children
						    })
						    
						    //更新本地书签系统
							if(this.data_source=="local"){
						        var folder_obj_local ={}
	                            folder_obj_local.parentId = home_pageId
	                            folder_obj_local.title    = new_folder_title
								
								chrome.bookmarks.getChildren(home_pageId, (c)=>{
									folder_obj_local.index = c[c.length-1].index+1
									
									chrome.bookmarks.create(folder_obj_local, function(c){
						            	data.selected_items.forEach(function(item){
						                	chrome.bookmarks.move(item.id, {parentId:c.id, index:0})
						                })
								    	
								    	c.is_select=false
								    	c.children=folder_obj.children
								    	home_page.push(c)
						                all_folder.push(c)
								    	console.log(c)
						            })
								})
							}
							else{
								home_page.push(folder_obj)
						        all_folder.push(folder_obj)
								
					        	update_cloud_bookmark("for_move")
					        }
						    
						    this.hide_move_page()
						}
						else{
							toast.show(language('have_same_folder'))
						}
					}
					else{
						toast.show(language('cant_be_empty'))
					}
				}
			},
			//从当前源位置移除（不删除数据，不处理搜索结果列表）
			remove_from_target_position:function(){
				var deal_folder=this.deal_folder
				var data=this.selected_items_data
				
				var all_item_info=this.all_bookmark_data.item_info
				var all_parent_arr=this.all_bookmark_data.item_parent_children
				
				if(this.from_page=="home"){
					for(var i=data.selected_idxs.length-1;i>=0;i--){
				    	deal_folder.splice(data.selected_idxs[i], 1)
				    }
				}
				else if(this.from_page=="children"){
					//从当前列表删除
					for(var i=data.selected_idxs.length-1;i>=0;i--){
				    	deal_folder.splice(data.selected_idxs[i], 1)
				    }
				}
				else if(this.from_page=="search_res"){
					//从 parent_arr 中删除
					for(var i=data.selected_items.length-1;i>=0;i--){
						var item=data.selected_items[i]
						var all_idx=all_item_info.indexOf(item)
						var parent_arr=all_parent_arr[all_idx]
						
						var idx=parent_arr.indexOf(item)
						parent_arr.splice(idx, 1)
				    }
				}
			},
			language:function(name){
	        	return chrome.i18n.getMessage(name)
	        }
		}
    })
	
	var login=new Vue({
		el:"#login",
		data:{
			is_show_template: is_show_template,
			display         : false,
			is_show         : false,
			show_scan       : false,
			show_activate   : false,
			activate_desc   : "",
			activate_way    : "order_info",
			qr_img_src      : transparent_img,
			p_text          : "",
			nonceStr_ctime  : null,
			nonceStr        : "",
			need_refresh    : false,
			t               : null,
			order_id        : "",
			phone_num       : "",
			Fcode           : "",
			host            : "https://aa-zz.cn"
		},
		methods:{
			to_login:function(){
				this.display=true
				this.is_show=true
				this.show_scan =true
				this.make_qr_code(true)
			},
			cancel:function(){
				var that=this
				if(this.t !== null){
					clearInterval(this.t)
					this.t=null
				}
				
				this.is_show = false
				setTimeout(function(){
					that.display = false
					that.show_scan     = false
				    that.show_activate = false
				}, 300)
			},
			to_make_qr_img:function(){
				var that=this
				var formData=new FormData()
		        formData.append("app_name", "card_bookmark")
		        post_data(that.host+"/wxapp_login/code.php", formData, function(c){
					if(c){
						//console.log(c)
		        	    that.nonceStr      =c.code
		        	    that.nonceStr_ctime=Date.now()
						var qr_img_src=that.host+"/wxapp_login/wxa_code.php?app_name=card_bookmark&todo=login&extra="+that.nonceStr
					    var img=new Image()
				        img.onload=function(){
							that.qr_img_src=img.src
				        	that.p_text=language("wechat_scan")
							
							if(login.t !== null){
								clearInterval(login.t)
								login.t=null
							}
							login.t=setInterval(check_logIn, 3000)
				        }
						//that.qr_img_src=qr_img_src
				        img.src=qr_img_src
					}
				})
			},
			make_qr_code:function(is_first){
				if(is_first){
				    this.to_make_qr_img()
				}
				else{
					if(this.need_refresh){
						this.need_refresh=false
						this.qr_img_src=transparent_img
						this.p_text=chrome.i18n.getMessage("ready_login")
						this.to_make_qr_img()
					}
				}
			},
			switch_activate_way:function(){
				if(this.activate_way=="order_info"){
					this.activate_way="Fcode"
				}
				else{
					this.activate_way="order_info"
				}
			},
			to_activate:function(){
				var info_check_res=false
				var activation_code=""
				
				if(wrap.user_info.user_id !== ""){
				    if(this.activate_way=="order_info"){
				    	if(/^\d+$/.test(this.order_id) && /^\d+$/.test(this.phone_num) && this.phone_num.length==11){
				    		info_check_res=true
				    		activation_code=this.order_id+"_"+this.phone_num
				    	}
				    }
				    else{
				    	if(/^F\w+/.test(this.Fcode)){
				    		info_check_res=true
				    		activation_code=this.Fcode
				    	}
				    }
				}
				
				if(info_check_res){
				    var that=this
				    var formData=new FormData()
				    formData.append("todo", "to_activate")
				    formData.append("app_name", "card_bookmark")
		            formData.append("user_id", wrap.user_info.user_id)
		            formData.append("activation_code", activation_code.replace(/[^a-zA-Z0-9_]/g, ""))
		            post_data(that.host+"/wxapp_login/server.php", formData, function(c){
						if(c){
				    	    if(c.status=="to_activate_success"){
				    	    	wrap.user_info.cloud_end_time=c.end_time
				    	    	update_user_info()
								
								login.cancel()
				    	    	warning.show(language('activate_success')+more_menu_cloud.get_time(c.end_time)+language('update_end_time_notice'), false)
				    	    }
							
							if(c.status=="invalid_order_id"){
				    	    	that.order_id  = ""
								that.phone_num = ""
				    	    	toast.show(language('invalid_order_id'))
				    	    }
							if(c.status=="invalid_activation_code"){
								that.Fcode=""
								toast.show(language('invalid_activation_code'))
							}
							if(c.status=="phone_error"){
				    	    	that.order_id  = ""
								that.phone_num = ""
				    	    	toast.show(language('phone_error'))
				    	    }
							if(c.status=="no_right_goods"){
				    	    	that.order_id  = ""
								that.phone_num = ""
				    	    	toast.show(language('no_right_goods'))
				    	    }
							if(c.status=="order_is_closed"){
				    	    	that.order_id  = ""
								that.phone_num = ""
				    	    	toast.show(language('order_is_closed'))
				    	    }
							if(c.status=="have_refund"){
				    	    	that.order_id  = ""
								that.phone_num = ""
				    	    	toast.show(language('have_refund'))
				    	    }
							if(c.status=="dont_pay"){
				    	    	that.order_id  = ""
								that.phone_num = ""
				    	    	toast.show(language('dont_pay'))
				    	    }
						    if(c.status=="is_used_order_id"){
								that.order_id  = ""
								that.phone_num = ""
								toast.show(language('is_used_order_id'))
						    }
							if(c.status=="is_used_activation_code"){
								that.Fcode=""
								toast.show(language('is_used_activation_code'))
							}
						}
				    })
				}
				else{
					toast.show(language('input_is_not_ok'))
				}
			},
			go_buy:function(){
				//warning.show(language('go_buy_notice'), "go_buy")
				qr_code.show(false, "../img/shop.png", language('visit_shop'))
			},
			language:function(name){
	        	return chrome.i18n.getMessage(name)
	        }
		}
	})
	
	var viewed_data=new Vue({
		el:"#viewed_data",
		data:{
			is_show_template: is_show_template,
			display      : false,
			is_show      : false,
			viewed_data_con: null,
			is_bigger    : null,
			url_arr_opened:"",
			data_source  : {},
			is_made_data : false,
			is_show_sort : false,
			is_show_search_res : false,
			data_arr_all : [],
			data_arr_all_sort : null,
			data_arr_search_all : [],
			data_arr     : [],
			key_word     :"",
			display_show_more:false,
			is_deleting  : false
		},
		watch:{
			key_word:function(){
				this.search()
			}
		},
		methods:{
			show:function(){
				this.make_data((c)=>{
					this.display=true
				    this.is_show=true
					
				    this.$nextTick(()=>{
				        this.$el.querySelector("input").focus()
				    })
				})
			},
			hide:function(){
				this.is_show=false
				this.display=false
				this.$nextTick(()=>{
					if(wrap.search_res.length>0 && wrap.search_type=="history"){
						wrap.search_history()
					}
				})
			},
			make_data:function(callback){
				if(!this.is_made_data){
				    if(typeof this.data_source.data !== "undefined"){
				        var that=this
				        var data_arr=this.data_source.data
				        var data_arr_ok=[]
		                data_arr.forEach(function(item, idx){
		                	var obj={}
				        	    obj.title    = item.title
				        	    obj.url      = item.url
				        	    obj.times_num= typeof item.times_num=="undefined"?1:item.times_num
				        	    obj.end_time=item.end_time
				        	    obj.is_show_del_butt=false
				        	data_arr_ok.push(obj)
		                })
				        
				        this.data_arr_all = data_arr_ok
				        this.data_arr     = data_arr_ok.slice(0, 20)
				        this.is_made_data = true
				    	this.viewed_data_con=this.$el.querySelector(".block_con")
				        
				        if(callback){
				            callback("make_ok")
				        }
				    }
				}
				else{
					if(callback){
				        callback("make_ok")
				    }
				}
			},
			renew_search:function(){
				if(typeof localStorage.key_word !== "undefined"){
					this.key_word=localStorage.key_word
				}
			},
			search_input_enter:function(){
				this.open_webpage(this.data_arr[0].url)
			},
			search:function(){
				var key_word=this.key_word.toLowerCase()
				var data_arr_all=this.is_show_sort?this.data_arr_all_sort:this.data_arr_all
				
				if(key_word.replace(/\s/g, "").length>0){
					key_word=key_word.replace(/^\s+/, "").replace(/\s+$/, "")
					
					var query_arr=key_word.split(/ +/)
					var filter_arr=[]
					if(/-/.test(key_word)){
					    var part_arr=key_word.split(/-/)
						var last_part=part_arr[part_arr.length-1].replace(/^\s+/, "").replace(/\s+$/, "")
						if(last_part.length>0){
						    query_arr=part_arr.slice(0, part_arr.length-1).join("").replace(/^\s+/, "").replace(/\s+$/, "").split(/ +/)
					        filter_arr=last_part.split(/ +/)
						}
					}
				    
					this.judge(data_arr_all, query_arr, "find", (data_arr_query)=>{
						if(filter_arr.length>0){
						    this.judge(data_arr_query, filter_arr, "filter", (data_arr_filter)=>{
						        this.data_arr_search_all=data_arr_filter
					        })
						}
						else{
							this.data_arr_search_all=data_arr_query
						}
					})
				    
					if(this.data_arr_search_all.length>0){
						this.is_show_search_res=true
				        this.data_arr=this.data_arr_search_all.slice(0, 50)
					}
					else{
						//搜索结果为空
						this.is_show_search_res=false
						this.data_arr=data_arr_all.slice(0, 20)
						toast.show("搜索结果为空")
					}
				}
				else{
					this.data_arr_search_all=[]
					this.is_show_search_res=false
					if(this.is_deleting){
					    this.show_del_butt()
					}
					this.data_arr=data_arr_all.slice(0, 20)
				}
			},
			judge:function(lists, query_arr, type, callback){
				var data_arr = []
				var bool_arr = []
				
				for(var i=0, l=lists.length;i<l;i++){
	            	var list=lists[i]
	            	var title    =list.title.toLowerCase()
	            	var url      =list.url.toLowerCase()
					
				    //多重判断
	                for(var k=0, ll=query_arr.length;k<=ll;k++){
	                    if(k==ll){ //最终结果
	                	    if(bool_arr.indexOf(false) == -1){
								data_arr.push(list)
							}
	                	}
	                	else{
				    		var condition=null
				    		if(type=="find"){
				    			condition=title.indexOf(query_arr[k]) !== -1 || url.indexOf(query_arr[k]) !== -1
				    		}
				    		else{
				    			condition=title.indexOf(query_arr[k]) == -1 && url.indexOf(query_arr[k]) == -1
				    		}
				    		
	                        if(condition){
	                			bool_arr[k]=true
	                        }
	                        else{
	                			bool_arr[k]=false
	                        }
	                	}
	                }
				}
				
				callback(data_arr)
			},
			on_scroll:function(e){
				var el=e.target
				if(el.scrollTop>el.scrollHeight-el.clientHeight-40){
	            	this.show_more()
	            }
			},
			show_more:function(){
				var lists_show=this.data_arr
				var lists_all =this.is_show_search_res?this.data_arr_search_all:this.is_show_sort?this.data_arr_all_sort:this.data_arr_all
				var length_show=lists_show.length
				
				if(length_show<lists_all.length){
					this.data_arr=lists_all.slice(0, length_show+50)
				}
			},
			check_is_opened:function(item){
				if(typeof item.url !== "undefined"){
				    return this.url_arr_opened.indexOf(item.url.replace(/^https?/, '')) !== -1
				}
				else{
					return false
				}
			},
			open_webpage:function(url){
				if(!this.is_deleting){
				    if(this.is_show_search_res){
				        localStorage.key_word=this.key_word
				    }
					wrap.open_webpage(url)
				}
			},
			show_del_butt:function(idx){
				this.is_deleting = !this.is_deleting
				this.data_arr_all.forEach((item)=>{
					item.is_show_del_butt = this.is_deleting
				})
			},
			delete_item:function(idx, the_url, the_item){
				var data=this.data_source.data
				var data_arr_all       =this.data_arr_all
				var data_arr_all_sort  =this.data_arr_all_sort
				var data_arr_search_all=this.data_arr_search_all
				
				var idx_all =data_arr_all.indexOf(the_item)
				
				this.data_arr.splice(idx, 1)
				
				data_arr_all.splice(idx_all, 1)
				if(data_arr_all_sort !== null){
					var idx_sort=data_arr_all_sort.indexOf(the_item)
					data_arr_all_sort.splice(idx_sort, 1)
				}
				
				if(this.is_show_search_res){
					data_arr_search_all.splice(idx, 1)
				}
				
				data.forEach(function(item, idx_source){
					if(item.url==the_url){
						data.splice(idx_source, 1)
					}
				})
				
				set_storage({"viewed_data":this.data_source}, ()=>{
					sent_to_runtime({todo:"update_viewed_data"})
					wrap.history_data=this.data_source.data
				})
			},
			clear_viewed_data:function(){
				if(this.is_deleting){
				    warning.show(language('clear_notice'), "clear_viewed_data")
				}
				else{
					window.open("quick_view.html")
				}
			},
			show_most_viewed:function(){
				this.is_show_sort = !this.is_show_sort
				
				if(this.is_show_sort){
					if(this.data_arr_all_sort==null){
						this.data_arr_all_sort=this.data_arr_all.slice(0)
						this.data_arr_all_sort.sort(function(a, b){
					    	return b.times_num-a.times_num
					    })
					}
					this.data_arr=this.data_arr_all_sort.slice(0, 20)
				}
				else{
					this.data_arr=this.data_arr_all.slice(0, 20)
				}
			},
			go_scroll:function(type){
				var scroll_top = (type=="top"?0:this.viewed_data_con.scrollHeight)
				this.viewed_data_con.scrollTop=scroll_top
			},
			language:function(name){
	        	return chrome.i18n.getMessage(name)
	        }
		}
	})
	
	var more_menu_local=new Vue({
		el:"#more_menu_local",
		data:{
			is_show_template: is_show_template,
			display    : false,
			is_show    : false
		},
		methods:{
			show:function(){
				this.display=true
				this.is_show=true
				wrap.cancel_right_click()
			},
			hide:function(){
				var that=this
				this.is_show=false
				setTimeout(function(){
					that.display=false
				}, 300)
			},
			to_upload_to_cloud:function(){
				chrome.storage.local.get("cloud_bookmarks", function(c){
	        	    if(c.cloud_bookmarks.length==0){
				    	update_cloud_bookmark("for_upload_local")
				    }
					else{
						warning.show(language("upload_local_notice"), "update_cloud_bookmark")
					}
				})
			},
			open_webpage:function(url){
				wrap.open_webpage(url)
			},
			language:function(name){
	        	return chrome.i18n.getMessage(name)
	        }
		}
	})
	
	//is_working 的意义是防止一个按钮在短时间内被连续点击
	var more_menu_cloud=new Vue({
		el:"#more_menu_cloud",
		data:{
			is_show_template: is_show_template,
			display              : false,
			is_show              : false,
			is_show_to_top       : false,
			is_working           : false,
			default_show_cloud   : default_show_cloud,
			recovery_tab_data    : [],
			display_tab_lists    : false,
			read_later_lists     : [],
			read_later_lists_all : [],
			is_init_read_later   : false,
			display_show_more    : false,
			last_list_idx        : null,
			display_selector     : false,
			is_press_shift       : false,
			display_todo_butt    : false,
			is_show_todo_butt    : false
		},
		watch:{
			display:function(){
				if(!this.display){
					this.display_todo_butt = false
					this.is_show_todo_butt = false
				    input_text.display     = false
				    input_text.is_show     = false
				}
			}
		},
		methods:{
			show:function(){
				var that=this
				if(!this.is_init_read_later){
					this.is_init_read_later=true
				    chrome.storage.local.get("read_later_lists", function(c){
				    	if(Array.isArray(c.read_later_lists)){
				    	    var lists=c.read_later_lists
				    	    lists.forEach(function(item){
				    	    	item.is_selected=false
				    	    })
				    	    that.read_later_lists_all=lists
				    	    that.read_later_lists    =lists.slice(0, 10)
				    		if(lists.length>10){
				    			that.display_show_more=true
				    		}
				    	}
				    	
				    	that.display=true
				        that.is_show=true
				    })
			    }
				else{
					that.display=true
				    that.is_show=true
				}
			},
			hide:function(){
				var that=this
				this.is_show=false
				this.display_input=false
				this.display_selector =false
				this.display_todo_butt=false
				this.is_show_todo_butt=false
				setTimeout(function(){
					that.display=false
				}, 300)
			},
			on_scroll:function(){
				var scroll_top=this.$el.querySelector(".block_con").scrollTop
				this.is_show_to_top=scroll_top>100?true:false
			},
			to_top:function(){
				this.$el.querySelector(".block_con").scrollTo(0, 0)
			},
			show_pwa_qr:function(){
				var qr_img_el=qr_code.$el.querySelector(".canvas")
				qr_img_el.innerHTML=""
				var qrcode = new QRCode(qr_img_el,{
	                width  : 300,
	                height : 300
                })
	    	    qrcode.makeCode("https://aa-zz.cn/card_bookmark/index.html#"+wrap.user_info.user_id+"&"+wrap.user_info.sign)
				qr_code.show(true, "", language('qrcode_desc'))
			},
			set_default_show_cloud:function(value){
				if(value == ""){
				    this.default_show_cloud = !this.default_show_cloud
				}
				else{
					this.default_show_cloud = value
				}
				
				ls_data.default_show_cloud=this.default_show_cloud
				localStorage.ls_data=JSON.stringify(ls_data)
			},
			to_load_cloud_data:function(callback){
				if(!this.is_working){
					var that=this
					
					that.is_working=true
				    go_load_data("bookmark_data", function(data){
				    	if(data){
				    	    var obj={}
			                    obj.cloud_bookmarks=data
							
							if(data.length>0){
								more_menu_cloud.set_default_show_cloud(true)
							}
							
			                set_storage(obj, ()=>{
								wrap.cloud_bookmarks=data
							    wrap.is_checked_cloud_bookmark_up_time=true
								
								sent_to_runtime({todo:"update_all_cloud_bookmark"})
				                get_data("cloud", false, "")
								
								if(typeof callback !== "function"){
									toast.show(language('load_success'))
								}
								else{
									callback("finish")
								}
							})
				    	}
						
						that.is_working=false
				    })
				}
			},
			to_export_cloud_data_to_local:function(){
				wrap.to_export()
			},
			to_upload_cloud_data:function(){
				update_cloud_bookmark("for_reset")
			},
			to_clear_cloud_data:function(){
				warning.show(language('clear_cloud_bookmark_notice'), "clear_cloud_bookmark")
			},
			do_clear_cloud_bookmark:function(){
				go_post_data("bookmark_data", "", function(c){
			        if(c.desc=="update_success"){
			    	    var obj={}
		                    obj.cloud_bookmarks=[]
		                set_storage(obj)
						
			    		wrap.cloud_bookmarks=[]
						wrap.switch_data()
						more_menu_cloud.set_default_show_cloud(false)
			    		
		                sent_to_runtime({todo:"update_all_cloud_bookmark"})
			    	}
			    })
			},
			save_tab_info:function(){
				if(wrap.is_got_tabs_permission){
				    if(!this.is_working){
				    	this.is_working=true
		                var open_tabs  = []
		                var tab_arr_ok = []
		                chrome.tabs.query({currentWindow:true}, function(c){
		                	open_tabs=c
				    		//console.log(open_tabs)
		                	add_scrollTop(0)
		                })
		                
		                function add_scrollTop(i){
		                	var tab=open_tabs[i]
		                	var obj={}
		                	    obj.title    = tab.title
		                	    obj.url      = tab.url
				    			obj.icon_url = tab.favIconUrl
		                	    //obj.active   = tab.active
		                	    obj.active   = false
		                	chrome.tabs.sendMessage(tab.id, {todo: "get_scroll_top"}, function(response){
		                		obj.scroll_top = response?response:0
		                		tab_arr_ok.push(obj)
		                		
		                		if(i < open_tabs.length-1){
		                			add_scrollTop(i+1)
		                		}
		                		else{
				    				//console.log(tab_arr_ok)
		                			go_post_data("tab_data", JSON.stringify(tab_arr_ok))
		                		}
		                	})
		                }
		            }
				}
				else{
					warning.show(language("need_get_tabs_permission"), "get_tabs_permission")
				}
			},
			recovery_tab:function(){
				if(wrap.is_got_tabs_permission){
				    if(!this.is_working){
				    	var that=this
				    	this.is_working=true
				        go_load_data("tab_data", function(data){
				        	if(data){
				    			if(data.length>0){
				    				data.forEach(function(item){
				    					item.is_opened=false
				    				})
				    			    that.recovery_tab_data=data
				    				that.display_tab_lists=true
				    			    warning.show(language('will_recovery_tab')+" "+data.length+" "+language('ask_recovery_tab'), "recovery_tab")
				    			}
				        	}
				    		that.is_working=false
				        })
				    }
				}
				else{
					warning.show(language("need_get_tabs_permission"), "get_tabs_permission")
				}
			},
			add_new:function(){
				input_text.show("add", "")
			},
			to_load_read_later:function(){
				if(!this.is_working){
					var that=this
					this.is_working=true
				    go_load_data("read_later", function(data){
				    	if(data){
							update_read_later_lists(data)
							
							if(data.length>0){
				                toast.show(language('load_success'))
							}
				    	}
						that.is_working=false
				    })
				}
			},
			get_p_arr:function(text_con){
				var arr=text_con.split(/\n/)
				return arr
			},
			get_time:function(timestamp){
				var date=new Date()
	            date.setTime(timestamp)
		        return date.getFullYear()+"-"+formate(date.getMonth()+1)+"-"+formate(date.getDate())+" "+formate(date.getHours())+":"+formate(date.getMinutes())
			},
			open_tab:function(url){
			    chrome.tabs.create({url:url, active:false})
			},
			click_list:function(idx, list){
				if(!this.display_selector){
					this.open_webpage(list)
				}
				else{
					if(!list.is_selected){
						if(this.is_press_shift){
							this.is_press_shift=false
							if(this.last_list_idx !== null){
								if(idx>this.last_list_idx){
						    		var start=this.last_list_idx
						    		var end  =idx
						    	}
						    	else{
						    		var start=idx
						    		var end  =this.last_list_idx
						    	}
						    	for(var i=start;i<=end;i++){
									this.read_later_lists[i].is_selected=true
						    	}
							}
						}
						else{
							list.is_selected = true
						}
						
						this.last_list_idx = idx
					}
					else{
						list.is_selected = false
					}
				}
			},
			open_webpage:function(list){
				if(list.url){
					wrap.open_webpage(list.url)
					//sent_to_runtime({todo:"keep_cloud_tab", extra:[list]})
				}
				else{
					var title=list.title.replace(/^\s+/, "").replace(/\s+$/, "")
					if(/^https?:\/\//.test(title)){
						window.open(title)
					}
					else{
					    this.do_copy(list.title)
					}
				}
			},
			to_show_selector:function(idx, list){
				var that=this
				this.read_later_lists.forEach(function(item){
					item.is_selected=false
				})
					
				if(!this.display_selector){
				    list.is_selected= true
					this.display_selector =true
					this.display_todo_butt=true
					this.is_show_todo_butt=true
				    this.last_list_idx    =idx
				}
				else{
					this.cancel_select()
				}
			},
			cancel_select:function(){
				var that=this
				this.display_selector =false
				this.is_press_shift   =false
				this.is_show_todo_butt=false
				setTimeout(function(){
					that.display_todo_butt=false
				}, 300)
			},
			get_selected_list:function(callback){
				var arr=[]
				for(var i=this.read_later_lists.length-1;i>=0;i--){
					var list=this.read_later_lists[i]
					if(list.is_selected){
					    arr.push(list)
					}
				}
				callback(arr)
			},
			copy_text:function(){
				var that=this
				this.get_selected_list(function(data){
					if(data.length>0){
						var copy_text=""
						data.forEach(function(item, idx){
							copy_text+=item.title+(idx==data.length-1?"":"\n\n")
						})
						that.do_copy(copy_text)
					}
					
					that.cancel_select()
				})
			},
			do_copy:function(copy_text){
				var for_copy=document.querySelector("#for_copy")
				for_copy.value=copy_text
				for_copy.select(),
				document.execCommand("Copy")
				toast.show(language("copy_success"))
			},
			edit_text:function(){
				var that=this
				this.get_selected_list(function(data){
					if(data.length==1){
						input_text.show("edit", data[0])
					}
					
					that.cancel_select()
				})
			},
			chuansong:function(){
				this.show_pwa_qr()
			},
			delete_item_notice:function(){
				var that=this
				this.get_selected_list(function(data){
				    if(data.length>0){
				        warning.show(language("delete_warning_title1")+" "+data.length+" "+language("delete_warning_title2"), "delete_read_later_item")
					}
					else{
						//没有选中的列表
						that.cancel_select()
					}
				})
			},
			delete_item:function(){
				var that=this
				if(!this.is_working){
				    this.is_working=true
				    this.get_selected_list(function(data){
				    	if(data.length>0){
				    		var time_arr=[]
				    		data.forEach(function(item, idx){
				    			time_arr.push(item.time)
				    		})
							
							delete_data("read_later", JSON.stringify(time_arr), function(c){
				            	if(c){
				            		update_read_later_lists(JSON.parse(c.data))
									toast.show(language('delete_success'))
				            	}
								that.cancel_select()
				            })
				    	}
						else{
							that.is_working=false
							that.cancel_select()
						}
				    })
				}
			},
			show_more:function(){
				this.display_show_more=false
				this.read_later_lists=this.read_later_lists.concat(this.read_later_lists_all.slice(10))
			},
			language:function(name){
	        	return chrome.i18n.getMessage(name)
	        }
		}
	})
	
	var input_text=new Vue({
		el:"#input_text",
		data:{
			is_show_template: is_show_template,
			display    : false,
			is_show    : false,
			todo       : "",
			text_value : "",
			edit_obj   : {},
			is_saving  : false
		},
	    computed:{
			title:function(){
				return language(this.todo)
			}
		},
		methods:{
			show:function(todo, source_obj){
				this.todo       = todo
				this.display    = true
				this.is_show    = true
				
				if(todo=="add"){
					if(localStorage.text_add){
						this.text_value = localStorage.text_add
						toast.show(language("restored_input_text"))
					}
					else{
						this.text_value = ""
					}
				    this.$nextTick(function(){
				    	this.$el.querySelector(".input_add_text").focus()
				    })
				}
				else{
					if(localStorage.time_edit){
						if(source_obj.time==localStorage.time_edit){
							if(localStorage.text_edit){
							    this.text_value=localStorage.text_edit
							    toast.show(language("restored_input_text"))
							}
							else{
								this.text_value=source_obj.title
							}
						}
						else{
							this.text_value = source_obj.title
						}
					}
					else{
					    this.text_value = source_obj.title
					}
					
					this.edit_obj = source_obj
				}
			},
			hide:function(){
				var that=this
				this.is_show = false
				setTimeout(function(){
					that.display = false
				}, 300)
			},
			on_input:function(){
				if(this.todo=="add"){
					localStorage.text_add=this.text_value
				}
				else{
					localStorage.time_edit=this.edit_obj.time
					localStorage.text_edit=this.text_value
				}
			},
			save_value:function(){
				this.hide()
				if(!this.is_saving){
					this.is_saving=true
					do_save_value(this.todo, this.text_value, this.edit_obj)
				}
			},
			language:function(name){
	        	return chrome.i18n.getMessage(name)
	        }
		}
	})
	
	var qr_code = new Vue({
		el:"#qr_code",
		data:{
			is_show_template: is_show_template,
			display   : false,
			is_show   : false,
			is_canvas : false,
			img_src   : "",
			qr_desc   : "",
			width     : is_pc?is_bigger?parseInt(body_width/2-20)+"px":parseInt(body_width-20)+"px":"calc(100% - 20px)"
		},
		watch:{
			is_show:function(){
				var that=this
				if(!this.is_show){
					setTimeout(function(){
						that.display=false
					}, 300)
				}
			}
		},
		methods:{
			show:function(is_canvas, img_src, qr_desc){
				this.is_canvas = is_canvas
				this.img_src   = img_src
				this.qr_desc   = qr_desc
				this.display   = true
				this.is_show   = true
			},
			hide:function(){
				this.is_show=false
			},
			language:function(name){
	        	return chrome.i18n.getMessage(name)
	        }
		}
	})
	
	var warning=new Vue({
		el:"#warning",
		data:{
			is_show_template: is_show_template,
			display    : false,
			is_show    : false,
			title      : "",
			wait_to_do : null,
			width      : is_pc?is_bigger?parseInt(body_width/2-20)+"px":parseInt(body_width-20)+"px":"calc(100% - 20px)"
		},
		watch:{
			is_show:function(){
				if(!this.is_show){
					setTimeout(function(){
						warning.display=false
					}, 300)
				}
			}
		},
		methods:{
			show:function(title, wait_to_do){
				this.title      = title
				this.wait_to_do = wait_to_do
				this.display    = true
			    this.is_show    = true
			},
			hide:function(){
				if(this.wait_to_do=="delete_bookmark"){
				    wrap.cancel_right_click()
				}
				if(this.wait_to_do=="delete_read_later_item"){
					more_menu_cloud.cancel_select()
				}
				this.is_show=false
			},
			to_do:function(){
				if(this.wait_to_do=="get_tabs_permission"){
					chrome.permissions.request({
                        permissions: ['tabs'],
                    }, function(granted){
                        if(granted){
                            sent_to_runtime({todo:"show_notification", extra:language("get_tabs_permission_success")})
                        }
						else{
                            sent_to_runtime({todo:"show_notification", extra:language("get_tabs_permission_fail")})
                        }
                    })
				}
				else if(this.wait_to_do=="delete_bookmark"){
				    wrap.do_delete()
				}
				else if(this.wait_to_do=="clear_cloud_bookmark"){
				    more_menu_cloud.do_clear_cloud_bookmark()
				}
				else if(this.wait_to_do=="delete_read_later_item"){
				    more_menu_cloud.delete_item()
				}
				else if(this.wait_to_do=="update_cloud_bookmark"){
					update_cloud_bookmark("for_upload_local")
				}
				else if(this.wait_to_do=="clear_viewed_data"){
				    viewed_data.data_source.data=[]
				    set_storage({"viewed_data":viewed_data.data_source})
					sent_to_runtime({todo:"update_viewed_data"})
					
				    viewed_data.data_arr_all = []
				    viewed_data.data_arr     = []
					wrap.history_data        = []
				    viewed_data.display_show_more = false
				}
				else if(this.wait_to_do=="recovery_tab"){
					sent_to_runtime({todo:"keep_cloud_tab", extra:more_menu_cloud.recovery_tab_data})
				}
				else if(this.wait_to_do=="login"){
					login.to_login()
				}
				else if(this.wait_to_do=="sort_local_bookmark"){
					sort_local_bookmark()
				}
				else if(this.wait_to_do=="export"){
					toast.show(language("exporting"))
					chrome.storage.local.get("cloud_bookmarks", function(c){
				    	var data_arr=c.cloud_bookmarks
						if(data_arr.length==0){
							toast.show(language('no_data_to_export'))
						}
						else{
							export_bookmark(data_arr)
						}
				    })
				}
				else if(this.wait_to_do=="clear_data"){
					set_storage({"cloud_bookmarks":[]})
					sent_to_runtime({todo:"update_all_cloud_bookmark"})
					ls_data.default_show_cloud=false
				    localStorage.ls_data=JSON.stringify(ls_data)
					
					set_storage({"read_later_lists":[]})
					
					get_data("local", false, "")
					
					toast.show(language('clear_data_success'))
				}
				else if(this.wait_to_do=="logout"){
					wrap.user_info.user_id        = ""
					wrap.user_info.sign           = ""
			        wrap.user_info.nickname       = ""
			        wrap.user_info.avatarurl      = ""
			        wrap.user_info.cloud_end_time = 0
					wrap.data_source              = "local"
					more_menu_cloud.is_init_read_later = false
					
				    update_user_info()
					
					set_storage({"cloud_bookmarks":[]})
					sent_to_runtime({todo:"update_all_cloud_bookmark"})
					
					set_storage({"read_later_lists":[]})
					
					more_menu_cloud.default_show_cloud=false
					ls_data.default_show_cloud=false
				    localStorage.ls_data=JSON.stringify(ls_data)
					
					get_data("local", false, "")
					
					toast.show(language('logout_success'))
				}
				else if(this.wait_to_do=="install_so_tab"){
					wrap.view_app_detail(wrap.more_app_lists[2])
				}
				
				this.hide()
			},
			language:function(name){
	        	return chrome.i18n.getMessage(name)
	        }
		}
	})
	
    var toast=new Vue({
		el:"#toast",
		data:{
			is_show_template: is_show_template,
			display  : false,
			is_show  : false,
			text_con : "",
			t1       : null,
			t2       : null,
		},
		methods:{
			show:function(text_con){
				var that=this
				this.text_con = text_con
				this.display  = true
				this.is_show  = true
				
				if(this.t1 !== null || this.t2 !== null){
					clearInterval(this.t1)
					clearInterval(this.t2)
					this.t1=null
					this.t2=null
				}
				this.t1=setTimeout(()=>{
			        that.is_show=false
			        that.t2=setTimeout(()=>{
			        	that.display=false
						that.t2=null
			        }, 261)
					that.t1=null
			    }, 2200)
			}
		}
	})
	
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
		var todo=request.todo
		
		if(todo=="tab_open_complete"){
			var url=request.extra
			var recovery_tab_data=more_menu_cloud.recovery_tab_data
			if(recovery_tab_data.length>0){
				for(var i=0, l=recovery_tab_data.length;i<l;i++){
					var the_tab_data=recovery_tab_data[i]
					if(the_tab_data.url==url){
						the_tab_data.is_opened=true
						break
					}
				}
			}
		}
		
		else if(todo=="viewed_data_is_updated"){
			get_viewed_data(()=>{
				viewed_data.is_made_data=false
				viewed_data.make_data()
			})
		}
	})
	
	document.addEventListener("contextmenu", function(e){
        if(["INPUT", "TEXTAREA"].indexOf(e.target.tagName) == -1){
			e.preventDefault()
		}
    })
	
	document.addEventListener("keydown", function(e){
		if(e.keyCode==16){ //Shift
		    if(wrap.is_right_click){
		    	wrap.is_press_shift=true
		    }
			if(more_menu_cloud.display_selector){
				more_menu_cloud.is_press_shift=true
			}
		}
		else if(e.keyCode==17){ //Ctrl
			wrap.is_press_ctrl=true
		}
	})
	
	document.addEventListener("keyup", function(e){
		if(e.keyCode==16){
		    wrap.is_press_shift=false
			more_menu_cloud.is_press_shift=false
		}
		else if(e.keyCode==17){ //Ctrl
			wrap.is_press_ctrl=false
		}
	})
	
	setTimeout(get_first_db_data, 100)
	
	function get_first_db_data(){
		//避免多次分别执行 chrome.storage.local.get
		//但如果有些数据太大，则会严重拖慢查询速度，比如 viewed_data
	    chrome.storage.local.get(default_show_cloud?["user_info", "cloud_bookmarks"]:["user_info"], function(c){
	    	wrap.user_info=c.user_info
	    	
	    	if(typeof c.cloud_bookmarks !== "undefined"){
	    		wrap.cloud_bookmarks=c.cloud_bookmarks  //云书签的根对象（指向地址）
	    	}
	    	
	    	get_data(default_show_cloud?"cloud":"local", true, "")
	    })
	}
	
	function get_data(data_source, is_need_wait, next_todo){
		var data_arr=[]
		if(data_source=="local"){
			wrap.display_cloud_bookmark_empty_notice=false
	        chrome.bookmarks.getTree(function(c){
		    	console.log("local_bk", c)
	        	data_arr=c[0].children
				
				wrap.data_source=data_source
				make_data_first(data_arr, is_need_wait, next_todo)
	        })
		}
		else{
			if(wrap.user_info.user_id == ""){
				is_show_template.status=true
				warning.show(language('need_login'), "login")
			}
			else{
				data_arr=wrap.cloud_bookmarks
				if(data_arr.length>0){
					make_data_first(data_arr, is_need_wait, next_todo)
				}
				else{
					chrome.storage.local.get("cloud_bookmarks", function(c){
						wrap.cloud_bookmarks=c.cloud_bookmarks
						data_arr=wrap.cloud_bookmarks
						if(data_arr.length>0){
							make_data_first(data_arr, is_need_wait, next_todo)
						}
						else{
							is_show_template.status=true
							wrap.groups_arr = []
							wrap.all_bookmark_data = {}
							wrap.display_cloud_bookmark_empty_notice = true
						}
					})
				}
				
				wrap.data_source=data_source
			}
		}
	}
	
	function make_data_first(arr, is_need_wait, next_todo){
		var groups_arr=arr.filter(function(item){
	    	return (typeof item.children !== "undefined" && item.children.length>0)
	    })
		
		/*groups_arr.forEach(function(item){
		    var item_children=item.children
		    item_children.sort(function(a, b){
			    var a_is_item = a.children?9999:0
			    var a_idx     = a.index
			    var b_is_item = b.children?9999:0
			    var b_idx     = b.index
				return (a_is_item+a_idx)-(b_is_item+b_idx)
			})
		})*/
		
		var groups_arr_copy=JSON.parse(JSON.stringify(groups_arr))
		var main_scrolltop=Number(localStorage.main_scrolltop)
		var idx_scroll=wrap.is_keep_home_scroll_posi?(parseInt(main_scrolltop/54)+(main_scrolltop%54>20?1:0))*(wrap.is_bigger?4:2):0
		
		if(is_need_wait){
			if(groups_arr.length===0){
		    	is_show_template.status=true
		    	return
		    }
			
			groups_arr_copy.splice(1)
			groups_arr_copy[0].children=groups_arr_copy[0].children.slice(idx_scroll, idx_scroll+30)
			wrap.groups_arr = groups_arr_copy //书签树数组
		}
		else{
			wrap.groups_arr = groups_arr //书签树数组
		}
		
		wrap.$nextTick(function(){
			//滚动到之前滚动的位置
			/* group=main.querySelector(".group")
			if(localStorage.main_scrolltop){
				var value=localStorage.main_scrolltop-150+43
				group.scrollTo(0, value>=0?value:0)
				setTimeout(()=>{
			    	group.addEventListener("scroll", function(e){
	                	var scroll_top=this.scrollTop
			    		group.style.height  ="auto"
	                	group.style.overflow="visible"
			    		main.style.overflow ="auto"
			    		main.scrollTo(0, scroll_top)
	                })
			    }, 100)
			}
			else{
				group.style.height  ="auto"
	            group.style.overflow="visible"
			    main.style.overflow ="auto"
			} */
			
			wrap.is_show_favicon=true
		    if(is_need_wait){
		    	setTimeout(function(){
					wrap.groups_arr = groups_arr
					wrap.$nextTick(function(){
						if(wrap.is_keep_home_scroll_posi){
						    wrap.groups.scrollTo(0, idx_scroll/(wrap.is_bigger?4:2)*54)
						}
					})
		        	make_data(wrap.groups_arr, next_todo),
		    		is_show_template.status=true
		        }, 100) //50
		    }
		    else{
		    	make_data(wrap.groups_arr, next_todo)
		    }
		})
	}
	
	function make_data(groups_arr, next_todo){
		var hostname_arr     = []
		var hostname_obj_arr = []
		var a_tag            = document.createElement("a")
		var all_bookmark_obj           = {}
		    all_bookmark_obj.item_info = []
		    all_bookmark_obj.item_parent_children = []
		    all_bookmark_obj.item_parent_title    = []
		    all_bookmark_obj.folder    = []
		
		//添加属性
		for(var i=0;i<groups_arr.length;i++){
			wrap.id_level1_arr.push(groups_arr[i].id)
		    var bks = groups_arr[i].children
			for(var k=0;k<bks.length;k++){
			    //bks[k].is_select=false
				Vue.set(bks[k], "is_select", false)
				all_bookmark_obj.item_parent_children.push(bks)
				all_bookmark_obj.item_parent_title.push(groups_arr[i].title)
				
			    if(typeof bks[k].children == "undefined"){
					a_tag.href=bks[k].url
					var hostname=a_tag.hostname
					
					//bks[k].hostname = hostname
					Vue.set(bks[k], "hostname", hostname)
					all_bookmark_obj.item_info.push(bks[k])
					/*
					if(hostname_arr.indexOf(hostname) == -1){
						var obj={}
						    obj.hostname=hostname
						    obj.items_arr=[bks[k]]
						hostname_arr.push(hostname)
						hostname_obj_arr.push(obj)
					}
					else{
						var idx=hostname_arr.indexOf(hostname)
						hostname_obj_arr[idx].items_arr.push(bks[k])
					}*/
				}
				else{
					//bks[k].hostname = ""
					Vue.set(bks[k], "hostname", "")
					all_bookmark_obj.item_info.push(bks[k])
					all_bookmark_obj.folder.push(bks[k])
					//特别耗时
					deal_foder_in(bks[k].children, bks[k].title)
				}
			}
		}
		
	    wrap.display_cloud_bookmark_empty_notice=false
		wrap.all_bookmark_data = all_bookmark_obj
		wrap.hostname_obj_arr  = hostname_obj_arr
		wrap.$nextTick(()=>{
			wrap.$el.querySelectorAll("input")[0].focus()
			
			if(!wrap.is_seted_onscroll_fun){
				wrap.is_seted_onscroll_fun=true
				
			    wrap.groups.onscroll=function(){
			    	localStorage.main_scrolltop=this.scrollTop
			    }
				
			    wrap.main.addEventListener("scroll", function(e){
	            	if(this.scrollTop >= wrap.search_offsettop){
	            		body_el.style.setProperty("--search_margin", "0")
	            		body_el.style.setProperty("--search_border_width", "0px")
	            		body_el.style.setProperty("--search_box_shadow", "0 0 10px rgba(0,0,0,.7)")
	            		body_el.style.setProperty("--search_color", wrap.data_source=="local"?"#f91562":"#2196f3")
	            	}
	            	else{
	            		body_el.style.setProperty("--search_margin", "10")
	            		body_el.style.setProperty("--search_border_width", "1px")
	            		body_el.style.setProperty("--search_box_shadow", "none")
	            		body_el.style.setProperty("--search_color", "#aaa")
	            	}
	            	
	            	/* if(this.scrollTop>0){
	            		wrap.display_scrollTo_butt="block"
	            	    if(this.scrollTop > (this.scrollHeight-window.innerHeight)/2){
	            	    	wrap.scrollTo_top_bottom="top"
	            	    }
	            	    else{
	            	    	wrap.scrollTo_top_bottom="bottom"
	            	    }
	            	}
	            	else{
	            		wrap.display_scrollTo_butt="none"
	            	} */
	            })
			}
			
			sent_to_runtime({todo:"is_opened_popup"})
			get_viewed_data()
		})
		
		chrome.tabs.query({currentWindow: true},function (tabs){
			var url_arr_opened=[]
			tabs.forEach((tab)=>{
				if(typeof tab.url !== "undefined"){
				    url_arr_opened.push(tab.url.replace(/^https?/, ""))
				}
			})
			wrap.url_arr_opened=url_arr_opened
		})
		
		if(next_todo=="search"){
			wrap.search_bookmarks(false)
		}
		else if(next_todo=="show_child_page"){
			var is_find_same_folder=false
			
			for(var i=all_bookmark_obj.folder.length-1;i>=0;i--){
				var folder=all_bookmark_obj.folder[i]
				if(folder.title==wrap.children_page_arr[wrap.children_page_arr.length-1].children_title){
					is_find_same_folder=true
					wrap.children_page_arr=[]
					wrap.show_child_page(folder.title, folder.children, null)
					break
				}
			}
			
			if(!is_find_same_folder){
				wrap.is_show_children=false
				wrap.children_page_arr=[]
			}
		}
		
		function deal_foder_in(arr, title){
		    for(var j=0;j<arr.length;j++){
			    //arr[j].is_select=false
				Vue.set(arr[j], "is_select", false)
				all_bookmark_obj.item_parent_children.push(arr)
				all_bookmark_obj.item_parent_title.push(title)
				
				if(typeof arr[j].children == "undefined"){
					a_tag.href=arr[j].url
					var hostname=a_tag.hostname
					
					//arr[j].hostname = hostname
					Vue.set(arr[j], "hostname", hostname)
					all_bookmark_obj.item_info.push(arr[j])
					/*
					if(hostname_arr.indexOf(hostname) == -1){
						var obj={}
						    obj.hostname=hostname
						    obj.items_arr=[arr[j]]
						hostname_arr.push(hostname)
						hostname_obj_arr.push(obj)
					}
					else{
						var idx=hostname_arr.indexOf(hostname)
						hostname_obj_arr[idx].items_arr.push(arr[j])
					}*/
				}
				else{
					//arr[j].hostname = ""
					Vue.set(arr[j], "hostname", "")
					all_bookmark_obj.item_info.push(arr[j])
					all_bookmark_obj.folder.push(arr[j])
					deal_foder_in(arr[j].children, arr[j].title)
				}
			}
		}
	}
	
	function deal_data(arr, callback){
		var item_keys   = ["dateAdded", "index", "title", "url"]
		var folder_keys = ["dateAdded", "index", "title", "children"]
		
	    continue_deal(arr)
		
		//result
		//console.log(JSON.stringify(arr))
		if(callback){
			callback(arr)
		}
		
		function continue_deal(array){
			for(var j=0;j<array.length;j++){
				array[j].index=j
				
				if(typeof array[j].children == "undefined"){
					for(var o_k in array[j]){
						if(item_keys.indexOf(o_k) == -1){
							delete array[j][o_k]
						}
					}
				}
				else{
					for(var o_k in array[j]){
						if(folder_keys.indexOf(o_k) == -1){
							delete array[j][o_k]
						}
					}
					
					continue_deal(array[j].children)
				}
			}
		}
	}
	
	function sort_local_bookmark(){
		chrome.bookmarks.getTree(function(c){
	    	var data_arr=c[0].children
		    var groups_arr=data_arr.filter(function(item){
	        	return (typeof item.children !== "undefined" && item.children.length>0)
	        })
		    
		    groups_arr.forEach(function(item){
				var group_id=item.id
		        var item_children=item.children
		        item_children.sort(function(a, b){
		    	    var a_is_item = a.children?9999:0
		    	    var a_idx     = a.index
		    	    var b_is_item = b.children?9999:0
		    	    var b_idx     = b.index
					
		    		return (a_is_item+a_idx)-(b_is_item+b_idx)
		    	})
				
				item_children.forEach(function(item, idx){
					chrome.bookmarks.move(item.id, {parentId:group_id, index:idx})
				})
		    })
			
			toast.show(language("sort_local_bookmark_success"))
			
			get_data("local", false, "")
	    })
	}
	
	function get_viewed_data(callback){
		chrome.permissions.contains({
            permissions: ['tabs'],
        }, function(result){
            if(result){
				wrap.is_got_tabs_permission=true
                chrome.storage.local.get("viewed_data", function(c){
		            var viewed_data_obj=c.viewed_data
	            	if(typeof viewed_data_obj.data == "undefined"){
	            		viewed_data_obj.data=[]
	            	}
	            	
	            	if(viewed_data_obj.date == get_date()){
	            		wrap.viewed_data=viewed_data_obj.num_tabs
	            	}
	            	else{
	            		wrap.viewed_data=0
	            	}
	            	
	            	wrap.history_data=viewed_data_obj.data
	            	viewed_data.data_source=viewed_data_obj
		        	body_el.style.setProperty("--item_img_bg", 'transpsrent')
					
					if(callback){
						callback("finish")
					}
		        })
            }
			else{
                wrap.is_got_tabs_permission=false
				
				if(callback){
					callback("finish")
				}
            }
        })
	}
	
	function check_cloud_bookmark_up_time(callback){
		var formData=new FormData()
		formData.append("todo", "check_data_up_time")
		//formData.append("data_type", data_type)
		formData.append("app_name", "card_bookmark")
		formData.append("user_id", wrap.user_info.user_id)
		formData.append("sign", wrap.user_info.sign)
		formData.append("data_up_time", localStorage.cloud_bookmark_up_time?localStorage.cloud_bookmark_up_time:"")
		//formData.append("data", data)
		
		post_data(login.host+"/deal_app_data/server.php", formData, function(c){
			if(c){
				wrap.is_checked_cloud_bookmark_up_time=true
				
				if(typeof c.end_time !== "undefined"){
				    wrap.user_info.cloud_end_time=c.end_time
				}
				else{
					wrap.user_info.cloud_end_time=0
				}
				update_user_info()
				
				if(c.desc=="need_update"){
					localStorage.cloud_bookmark_up_time=c.up_time
					
					var data = c.data==""?[]:JSON.parse(c.data)
					var obj={}
			            obj.cloud_bookmarks=data
					
			        set_storage(obj, ()=>{
						wrap.cloud_bookmarks=data
						sent_to_runtime({todo:"update_all_cloud_bookmark"})
						
						callback(c.desc)
					})
				}
				else{
					callback(c.desc)
				}
			}
			else{
				callback("")
			}
		})
	}
	
	//上传书签数据（更新云端书签）
	function update_cloud_bookmark(for_why){
		var data_arr =JSON.parse(JSON.stringify(wrap.groups_arr))
		
		deal_data(data_arr, function(arr_ok){
			go_post_data("bookmark_data", JSON.stringify(arr_ok), function(c){
			    if(c.desc=="update_success"){
				    var obj={}
		                obj.cloud_bookmarks=arr_ok
		            set_storage(obj)
					wrap.cloud_bookmarks=arr_ok
					
		            sent_to_runtime({todo:"update_all_cloud_bookmark"})
				}
			})
		})
	}
	
	function go_post_data(data_type, data, callback){
		if(wrap.user_info.user_id == ""){
			warning.show(language('need_login'), "login")
			
			more_menu_cloud.is_working=false
			input_text.is_saving=false
		}
		else{
			if(wrap.user_info.cloud_end_time < Date.now()){
				login.activate_desc=language('expired_notice')
				login.display=true
				login.is_show=true
				login.show_activate=true
				
			    more_menu_cloud.is_working=false
				input_text.is_saving=false
			}
		    else{
			    if(wrap.user_info.sign == ""){
			    	toast.show(language('fail_sign_error'))
					
			        more_menu_cloud.is_working=false
					input_text.is_saving=false
			    }
			    else{
			        do_post_data(data_type, data, function(c){
						if(c){
			    		    if(callback){
						    	callback(c)
			    		    }
			    		}
			    	})
			    }
			}
		}
	}
	
	function do_post_data(data_type, data, callback){
		var formData=new FormData()
		formData.append("todo", "update_data")
		formData.append("data_type", data_type)
		formData.append("app_name", "card_bookmark")
		formData.append("user_id", wrap.user_info.user_id)
		formData.append("sign", wrap.user_info.sign)
		formData.append("data", data)
		post_data(login.host+"/deal_app_data/server.php", formData, function(c){
			if(c){
				if(typeof c.end_time !== "undefined"){
				    wrap.user_info.cloud_end_time=c.end_time
				}
				else{
					wrap.user_info.cloud_end_time=0
				}
				update_user_info()
				
			    if(c.desc=="update_success"){
					if(data_type=="bookmark_data"){
						localStorage.cloud_bookmark_up_time=c.up_time
					}
					
					toast.show(language(data==""?'clear_success':'upload_success'))
					
					if(callback){
						callback(c)
					}
				}
				else{
				    if(c.desc=="no_activation_info" || c.desc=="expired_service"){
                        login.activate_desc=language('activate_notice')
						login.display=true
						login.is_show=true
						login.show_activate=true
				    }
					
					if(callback){
						callback({"desc":"fail"})
					}
				}
			}
			more_menu_cloud.is_working=false
			input_text.is_saving=false
		})
	}
	
	function go_load_data(data_type, callback){
		if(wrap.user_info.user_id == ""){
			warning.show(language('need_login'), "login")
			
			more_menu_cloud.is_working=false
		}
		else{
			if(wrap.user_info.sign == ""){
				toast.show(language('fail_sign_error'))
				
				more_menu_cloud.is_working=false
			}
			else{
				do_load_data(data_type, function(c){
					if(c){
					    if(callback){
					    	callback(c)
					    }
					}
				})
			}
		}
	}
	
	function do_load_data(data_type, callback){
		var formData=new FormData()
		formData.append("todo", "get_data")
		formData.append("data_type", data_type)
		formData.append("app_name", "card_bookmark")
		formData.append("user_id", wrap.user_info.user_id)
		formData.append("sign", wrap.user_info.sign)
		post_data(login.host+"/deal_app_data/server.php", formData, function(c){
			if(c){
				if(typeof c.end_time !== "undefined"){
				    wrap.user_info.cloud_end_time=c.end_time
				}
				else{
					wrap.user_info.cloud_end_time=0
				}
				update_user_info()
				
			    if(c.desc=="got_data"){
					if(data_type=="bookmark_data"){
						localStorage.cloud_bookmark_up_time=c.up_time
					}
					
					if(callback){
						var data=JSON.parse(c.data)
						if(data.length==0){
							toast.show(language('no_data'))
						}
						callback(data)
					}
				}
				else{
				    if(c.desc=="no_any_data"){
						if(callback){
					    	var data=[]
					    	callback(data)
					    }
				    	toast.show(language('no_data'))
				    }
				}
			}
			more_menu_cloud.is_working=false
		})
	}
	
	function do_save_value(todo, text_value, edit_obj){
		if(todo=="add"){
			var read_obj        = {}
		    read_obj.title      = text_value
            read_obj.url        = ""
            read_obj.icon_url   = ""
            read_obj.time       = Date.now()
            read_obj.scroll_top = 0
			
			if(text_value.replace(/\s/g, "").length>0){
			    go_post_data("read_later", JSON.stringify(read_obj), function(c){
			    	if(c.desc=="update_success"){
						localStorage.text_add=""
			    		update_read_later_lists(JSON.parse(c.data))
						toast.show(language('save_success'))
			    	}
			    	input_text.is_saving=false
			    })
			}
			else{
				input_text.is_saving=false
				toast.show(language('content_cant_be_null'))
			}
		}
		else{
			if(text_value !== edit_obj.title){
			    save_edit_data("read_later", edit_obj.time, text_value, function(c){
			    	if(c){
			    		localStorage.time_edit=""
			    		localStorage.text_edit=""
			    	    update_read_later_lists(JSON.parse(c.data))
						toast.show(language('save_success'))
			    	}
			    })
			}
			else{
				toast.show(language("dont_modify"))
			}
		}
	}
	
	//需要判断云服务是否已经到期
	function save_edit_data(data_type, data_time, new_value, callback){
		if(wrap.user_info.user_id !== "" && wrap.user_info.sign !== ""){
			if(wrap.user_info.cloud_end_time < Date.now()){
				login.activate_desc=language('expired_notice')
				login.display=true
				login.is_show=true
				login.show_activate=true
			}
			else{
		        var formData=new FormData()
		        formData.append("todo", "edit_data")
		        formData.append("data_type", data_type)
		        formData.append("data_time", data_time)
		        formData.append("new_value", new_value)
		        formData.append("app_name", "card_bookmark")
		        formData.append("user_id", wrap.user_info.user_id)
		        formData.append("sign", wrap.user_info.sign)
		        post_data(login.host+"/deal_app_data/server.php", formData, function(c){
		        	if(c){
		        		if(c.desc=="success"){
			    			if(callback){
			    			    callback(c)
			    			}
			    		}
			    		if(c.desc=="no_activation_info" || c.desc=="expired_service"){
                            login.activate_desc=language('activate_notice')
			    			login.display=true
							login.is_show=true
			    			login.show_activate=true
			    	    }
		        	}
			    	input_text.is_saving=false
		        })
			}
		}
		else{
			input_text.is_saving=false
			warning.show(language('need_login'), "login")
		}
	}
	
	function delete_data(data_type, data_time, callback){
		if(wrap.user_info.user_id !== "" && wrap.user_info.sign !== ""){
		    var formData=new FormData()
		    formData.append("todo", "delete_data")
		    formData.append("data_type", data_type)
		    formData.append("data_time", data_time)
		    formData.append("app_name", "card_bookmark")
		    formData.append("user_id", wrap.user_info.user_id)
		    formData.append("sign", wrap.user_info.sign)
		    post_data(login.host+"/deal_app_data/server.php", formData, function(c){
		    	if(c){
		    		if(c.desc=="success"){
						if(callback){
						    callback(c)
						}
					}
		    	}
				more_menu_cloud.is_working=false
		    })
		}
		else{
			more_menu_cloud.is_working=false
			warning.show(language('need_login'), "login")
		}
	}
	
	function update_user_info(){
		set_storage({"user_info":wrap.user_info})
		sent_to_runtime({todo:"update_user_info"})
		
		if(wrap.user_info.user_id=="" || wrap.user_info.sign==""){
			set_storage({"cloud_bookmarks":[]})
			sent_to_runtime({todo:"update_all_cloud_bookmark"})
			
			set_storage({"read_later_lists":[]})
			
			more_menu_cloud.hide()
			more_menu_cloud.default_show_cloud=false
			ls_data.default_show_cloud=false
			localStorage.ls_data=JSON.stringify(ls_data)
			
			get_data("local", false, "")
		}
	}
	
	function update_read_later_lists(data){
		var obj={}
		    obj.read_later_lists=data
		set_storage(obj)
		data.forEach(function(item){
			item.is_selected=false
		})
		more_menu_cloud.read_later_lists=data
		more_menu_cloud.display_show_more=false
	}
	
	function check_logIn(){
		var formData=new FormData()
		formData.append("todo", "check_login")
		formData.append("app_name", "card_bookmark")
		formData.append("nonceStr", login.nonceStr)
		post_data(login.host+"/wxapp_login/server.php", formData, function(c){
			if(c){
			    if(c.status=="no_scan"){ //未扫描
			    	if(Date.now()-login.nonceStr_ctime>60000){ //二维码失效
			    		clearInterval(login.t)
						login.t=null
						
						login.p_text=language("refresh_qrCode")
			    		login.qr_img_src="../img/refresh.png"
			    		login.need_refresh=true
			    		write_time_out_code()
			    	}
			    }
			    if(c.status=="scan_success"){ //scan success
			    	//console.log("scan_success")
					login.p_text=chrome.i18n.getMessage("scan_success")
			    }
			    if(c.status=="login_success"){ //login success
			    	clearInterval(login.t)
					login.t=null
					
			    	login.show_scan=false
			    	
			    	if(c.user_id && c.sign && c.nickname && c.avatarurl){
						var login_success=language('login_success')
						var use_cloud_notice=language('use_cloud_notice')
			    	    wrap.user_info.user_id   = c.user_id
			    	    wrap.user_info.sign      = c.sign
			    	    wrap.user_info.nickname  = c.nickname
			    	    wrap.user_info.avatarurl = c.avatarurl
						wrap.user_info.cloud_end_time=c.end_time
						
						if(c.desc=="can_use_cloud"){
							login.cancel()
							warning.show(login_success+language('the_end_time_is')+more_menu_cloud.get_time(c.end_time)+use_cloud_notice, false)
						}
						else{
						    if(c.desc=="dont_use_cloud"){
						    	login.activate_desc=login_success+language('activate_notice')
						    }
							if(c.desc=="cant_use_cloud"){
						    	login.activate_desc=login_success+language('expired_notice')
						    }
							
						    login.display = true
							login.is_show = true
						    login.show_scan     = false
							login.show_activate = true
						}
						
						if(c.data !== ""){
							var data=JSON.parse(c.data)
							var obj ={}
							    obj.cloud_bookmarks=data
			                set_storage(obj)
							localStorage.cloud_bookmark_up_time=c.data_up_time
							
							more_menu_cloud.default_show_cloud=true
						    ls_data.default_show_cloud=true
			                localStorage.ls_data=JSON.stringify(ls_data)
							
							sent_to_runtime({todo:"update_all_cloud_bookmark"})
						}
						
						if(c.read_later !== ""){
							var read_later=JSON.parse(c.read_later)
						    var obj={}
			                    obj.read_later_lists=read_later
			                set_storage(obj)
							more_menu_cloud.is_init_read_later = false
						}
						
						wrap.data_source="cloud"
						get_data("cloud", false, "")
						update_user_info()
			    	}
			    }
			}
		})
	}
	
	function write_time_out_code(){
		var formData=new FormData()
		formData.append("todo", "write_time_out_code")
		formData.append("app_name", "card_bookmark")
		formData.append("nonceStr", login.nonceStr)
		post_data(login.host+"/wxapp_login/server.php", formData, function(c){
			// write success
		})
	}
	
	function do_get_end_time(){
		var that=this
		var formData=new FormData()
		formData.append("todo", "get_end_time")
		formData.append("app_name", "card_bookmark")
		formData.append("user_id", wrap.user_info.user_id)
		post_data(login.host+"/wxapp_login/server.php", formData, function(c){
			if(c){
				if(c.status=="success"){
					var the_text=""
					
			        wrap.user_info.cloud_end_time=c.end_time
		    	    update_user_info()
					
					if(c.end_time==0){
						the_text=language('no_end_time')
					}
					else{
						the_text=language('the_end_time_is')+more_menu_cloud.get_time(c.end_time)
					}
					warning.show(the_text, false)
				}
			}
		})
	}
	
	function save_data_to_file(text, fileName){
        var b = new Blob([text], {type: 'text/plain; charset=utf-8'})
		var url=URL.createObjectURL(b)
		/*chrome.downloads.download({
			"url":url,
			"filename":fileName,
			"saveAs":!!0
		})*/
		
        var a_tag = document.createElement("a")
        a_tag.href     = url
        a_tag.download = fileName
		URL.revokeObjectURL(b)
        a_tag.click()
    }
	
	function export_bookmark(data_arr){
		var bookmark_html=""
		for(var i=0;i<data_arr.length;i++){
			var each_group_data=data_arr[i]
			//console.log(each_group_data)
			var children_arr=each_group_data.children
			
			bookmark_html+='\n\t<DT><H3 ADD_DATE="'+parseInt(each_group_data.dateAdded/1000)+'" LAST_MODIFIED="'+parseInt(each_group_data.dateAdded/1000)+'"'+(i==0?' PERSONAL_TOOLBAR_FOLDER="true"':'')+'>'+each_group_data.title+'</H3>\n\t<DL><p>'
			
			for(var k=0;k<children_arr.length;k++){
				if(typeof children_arr[k].children == "undefined"){
					bookmark_html+='\n\t<DT><A HREF="'+children_arr[k].url+'" ADD_DATE="'+parseInt(children_arr[k].dateAdded/1000)+'" ICON="">'+children_arr[k].title+'</A>'
				}
				else{
					bookmark_html+='\n\n\t<DT><H3 ADD_DATE="'+parseInt(children_arr[k].dateAdded/1000)+'" LAST_MODIFIED="0">'+children_arr[k].title+'</H3>\n\t<DL><p>'
					deal_foder_in(children_arr[k].children)
				}
			}
			bookmark_html+='\n\t</DL><p>\n\t'
		}
		
		bookmark_html='<!DOCTYPE NETSCAPE-Bookmark-file-1>\n<META HTTP-EQUIV="Content-Type" CONTENT="text/html; charset=UTF-8">\n<TITLE>Bookmarks</TITLE>\n<H1>Bookmarks</H1>\n\n<!--请不要作任何修改-->\n\n<DL><p>\n'+bookmark_html+'\n</DL><p>'
		save_data_to_file(bookmark_html, "card_bookmarks_"+get_date()+".html")
		
		function deal_foder_in(arr){
			for(var j=0;j<arr.length;j++){
			    if(typeof arr[j].children == "undefined"){
			    	bookmark_html+='\n\t<DT><A HREF="'+arr[j].url+'" ADD_DATE="'+parseInt(arr[j].dateAdded/1000)+'" ICON="">'+arr[j].title+'</A>'
			    }
			    else{
			    	bookmark_html+='\n\n\t<DT><H3 ADD_DATE="'+parseInt(arr[j].dateAdded/1000)+'" LAST_MODIFIED="0">'+arr[j].title+'</H3>\n\t<DL><p>'
					deal_foder_in(arr[j].children)
			    }
			}
			bookmark_html+='\n\t</DL><p>\n\t'
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
					if(data.desc=="no_user" || data.desc=="sign_error"){
						wrap.user_info.user_id = ""
						wrap.user_info.sign    = ""
						update_user_info()
						
				    	warning.show(language(data.desc=="no_user"?'fail_no_user':'fail_sign_error'), false)
				    }
					
	    	        if(callback){
				    	callback(data)
				    }
				}
				else{
					if(callback){
				    	callback(null)
				    }
			    	toast.show(language('network_err'))
			    }
	    	}
	    }
	}
	
	function reset_size(){
	    console.log(window.innerWidth)
		body_width =window.innerWidth
		body_height=window.innerHeight
		body_el.style.setProperty("--body_width", body_width+"px")
		body_el.style.setProperty("--body_height", body_height+"px")
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
	
	function set_storage(obj, callback){
	    chrome.storage.local.set(obj, ()=>{
			if(typeof callback === "function"){
				callback("finish")
			}
		})
	}
	
	function sent_to_runtime(obj){
		chrome.runtime.sendMessage(obj)
	}
	
	function sent_to_contentScript(todo, extra){
    	chrome.tabs.query({active: true,currentWindow: true},function (tabs){
            chrome.tabs.sendMessage(tabs[0].id,{todo: todo, extra: extra})
        })
    }
	
	function formate(num){
		if(num<10){
			return "0"+String(num)
		}
		else{
			return String(num)
		}
	}
	
	function language(name){
		return chrome.i18n.getMessage(name)
	}