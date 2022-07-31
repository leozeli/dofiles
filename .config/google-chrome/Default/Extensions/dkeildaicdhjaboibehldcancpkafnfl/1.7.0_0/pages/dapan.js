    var main=new Vue({
		el:"#main",
		data:{
			hostname_obj_arr:[]
		},
		methods:{
			view_page:function(host){
				chrome.tabs.create({url:"http://"+host, active:true})
			},
			copy_hostname:function(copy_text){
				var for_copy=document.querySelector("#for_copy")
				for_copy.value=copy_text
				for_copy.select(),
				document.execCommand("Copy")
			}
		}
	})
	
	document.addEventListener("contextmenu", function(e){
        if(["INPUT", "TEXTAREA"].indexOf(e.target.tagName) == -1){
			e.preventDefault()
		}
    })
	
	chrome.bookmarks.getTree(function(c){
		console.log(c)
		data_arr=c[0].children
		make_data(data_arr)
	})
	
	function make_data(data_arr){
		var groups_arr=data_arr.filter(function(item){
	    	return (typeof item.children !== "undefined" && item.children.length>0)
	    })
		
		var hostname_arr     = []
		var hostname_obj_arr = []
		var a_tag            = document.createElement("a")
		
		//添加属性
		for(var i=0;i<groups_arr.length;i++){
		    var bks = groups_arr[i].children
			for(var k=0;k<bks.length;k++){
			    if(typeof bks[k].children == "undefined"){
					a_tag.href=bks[k].url
					var hostname=a_tag.hostname?a_tag.hostname:"无域名"
					
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
					}
				}
				else{
					//特别耗时
					deal_foder_in(bks[k].children, bks[k].title)
				}
			}
		}
		
		hostname_obj_arr.sort(function(a, b){
			return b.items_arr.length-a.items_arr.length
		})
		
		main.hostname_obj_arr  = hostname_obj_arr.filter(function(item){
			return item.items_arr.length>1
		})
		
		function deal_foder_in(arr, title){
		    for(var j=0;j<arr.length;j++){
				if(typeof arr[j].children == "undefined"){
					a_tag.href=arr[j].url
					var hostname=a_tag.hostname?a_tag.hostname:"无域名"
					
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
					}
				}
				else{
					deal_foder_in(arr[j].children, arr[j].title)
				}
			}
		}
	}