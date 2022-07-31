    var main=new Vue({
		el:"#main",
		data:{
			lists_type     : "normal",
			url_lists      : [],
			url_lists_all  : [],
			search_res     : [],
			search_res_all : [],
			end_time_arr   : [],
			target_id      : 0,
			target_url     : "",
			key_word       : "",
			this_href      : location.href,
			lists_scrollTop: 0
		},
		watch:{
		    key_word:function(){
		    	this.search()
		    }
		},
		computed:{
			lists_data_obj:function(){
			    if(this.lists_type=="normal"){
			    	return {"arr_show":this.url_lists, "arr_all":this.url_lists_all}
			    }
			    else if(this.lists_type=="search_res"){
			    	return {"arr_show":this.search_res, "arr_all":this.search_res_all}
			    }
			}
		},
		methods:{
			search:function(){
				var key_word=this.key_word.toLowerCase()
				var search_res_all=[]
				
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
					//console.log(query_arr)
					//console.log(filter_arr)
					
					var lists=this.url_lists_all
					
	            	this.judge(lists, query_arr, "find", (data_arr_query)=>{
						if(filter_arr.length>0){
						    this.judge(data_arr_query, filter_arr, "filter", (data_arr_filter)=>{
						        search_res_all=data_arr_filter
					        })
						}
						else{
							search_res_all=data_arr_query
						}
					})
				}
					
				this.search_res_all=search_res_all
				this.search_res=search_res_all.slice(0, 20)
				
				if(search_res_all.length>0){
					this.lists_type="search_res"
				}
				else{
					this.lists_type="normal"
					if(this.key_word.length>0){
					    //alert("什么也没有搜到")
					}
				}
			},
			judge:function(lists, query_arr, type, callback){
				var data_arr = []
				var bool_arr = []
				
				for(var i=0, l=lists.length;i<l;i++){
	            	var item_info=lists[i]
	            	var title    =item_info.title.toLowerCase()
	            	var url      =item_info.url.toLowerCase()
					
				    //多重判断
	                for(var k=0, ll=query_arr.length;k<=ll;k++){
	                    if(k==ll){ //最终结果
	                	    if(bool_arr.indexOf(false) == -1){
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
			view_url:function(list){
				this.target_id=list.id
				this.target_url=list.url
			},
			open_tab:function(list){
				window.open(list.url)
			},
			scroll_to_top:function(){
				document.querySelector("#url_lists").scrollTo(0,0)
			},
			on_scroll:function(e){
				var el=e.target
				this.lists_scrollTop=el.scrollTop
				if(el.scrollTop>el.scrollHeight-el.clientHeight-40){
	            	this.show_more()
	            }
			},
			show_more:function(){
				var lists_show     = this.lists_data_obj.arr_show
				var lists_all      = this.lists_data_obj.arr_all
				var length_show    = lists_show.length
				var lists_show_new = lists_show.concat(lists_all.slice(length_show, length_show+20))
				
				if(this.lists_type=="normal"){
				    this.url_lists=lists_show_new
				}
				else{
				    this.search_res=lists_show_new
				}
			},
		}
	})
	
	document.addEventListener("contextmenu", function(e){
        if(["INPUT", "TEXTAREA"].indexOf(e.target.tagName) == -1){
			e.preventDefault()
		}
    })
	
	chrome.runtime.onMessage.addListener(function(request, sender, sendResponse){
		var todo=request.todo
		if(todo=="have_new_viewed_data"){
			var data=request.extra.data
			    data.id = Date.now()
			    data.time_show = get_time(data.end_time)
			main.url_lists_all.unshift(data)
		    main.url_lists.unshift(data)
			main.end_time_arr.unshift(data.end_time)
		}
		else if(todo=="delete_viewed_data"){
			var end_time=request.end_time
			var idx=main.end_time_arr.indexOf(end_time)
			
			main.end_time_arr.splice(idx, 1)
			main.url_lists_all.splice(idx, 1)
			if(typeof main.url_lists[idx] !== "undefined"){
				main.url_lists.splice(idx, 1)
				if(main.url_lists.length<10){
					main.show_more()
				}
			}
		}
	})
	
	chrome.storage.local.get("viewed_data", function(c){
		var viewed_data=c.viewed_data.data
		//console.log(viewed_data.length)
		var time=Date.now()
		var end_time_arr=[]
		
		for(var i=0;i<10;i++){
			var item=viewed_data[i]
			    item.id = time++
			    item.time_show = get_time(item.end_time)
			end_time_arr.push(item.end_time)
		}
		
		main.url_lists     = viewed_data.slice(0, 10)
		main.$nextTick(()=>{
			setTimeout(()=>{
				if(viewed_data.length>10){
			        for(var i=10, l=viewed_data.length;i<l;i++){
		            	var item=viewed_data[i]
		            	    item.id = time++
		            	    item.time_show = get_time(item.end_time)
		            	end_time_arr.push(item.end_time)
		            }
				}
				
				main.url_lists_all = viewed_data // !!!耗时
				main.end_time_arr  = end_time_arr
			}, 100)
		})
	})
	
	function get_time(timestamp){
		var date =new Date()
		var year =date.getFullYear()
		var month=date.getMonth()
		var day  =date.getDate()
		var today_start=0
		var date_desc=""
		date.setFullYear(year)
		date.setMonth(month)
		date.setDate(day)
		date.setHours(0)
		date.setMinutes(0)
		date.setSeconds(0)
		date.setMilliseconds(0)
		today_start=date.getTime()
		//console.log(today_start)
		date.setTime(timestamp)
		
		if(timestamp-today_start>=0){
			date_desc="今天"
		}
		else if(today_start-timestamp>0 && today_start-timestamp<=3600000*24){
			date_desc="昨天"
		}
		else if(today_start-timestamp>3600000*24 && today_start-timestamp<=3600000*48){
			date_desc="前天"
		}
		else{
			date_desc=formate(date.getMonth()+1)+"-"+formate(date.getDate())
		}
		return date_desc+" "+formate(date.getHours())+":"+formate(date.getMinutes())
	}
	
	function get_year(timestamp){
		var date=new Date()
		date.setTime(timestamp)
		return date.getFullYear()
	}
	
	function formate(num){
		if(num<10){
			return "0"+String(num)
		}
		else{
			return String(num)
		}
	}