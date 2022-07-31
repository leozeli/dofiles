"use strict";!function(){Vue.filter("getTimes",function(t){var e=new Date-t;return 31104e6<=e?parseInt(e/31104e6)+" "+infinity.i18n("y_ago"):2592e6<=e?parseInt(e/2592e6)+" "+infinity.i18n("mo_ago"):864e5<=e?parseInt(e/864e5)+" "+infinity.i18n("d_ago"):36e5<=e?parseInt(e/36e5)+" "+infinity.i18n("h_ago"):6e4<=e?parseInt(e/6e4)+" "+infinity.i18n("m_ago"):parseInt(e/1e3)+" "+infinity.i18n("s_ago")});var e,s,t=infinity.i18n("Tab_Master");document.getElementById("tt").innerHTML=t,chrome.tabs.getCurrent(function(t){e=t.windowId,s=t.id}),infinity.onMessage("tellUpdate",function(t){chrome.windows.update(e,{focused:!0,drawAttention:!0}),chrome.tabs.update(s,{active:!0}),window.location.href=window.location.origin+window.location.pathname+"#/index",window.location.reload()});var a={data:{tabs:infinity.get("tabs-master").tabs,currentTabs:infinity.get("tabs-master").currentTabs,option:infinity.get("tabs-master").option,oldTabs:infinity.get("tabs-master").oldTabs},update:function(){var t=infinity.get("tabs-master");for(var e in this.data)this.data[e]=t[e]},get:function(t){return this.data[t]},set:function(){infinity.set("tabs-master",this.data),infinity.broadcast("optionsU",{tabId:s})}};infinity.onBroadcast("optionsU",function(t){t!==s&&(window.location.href=window.location.origin+window.location.pathname+"#/index",window.location.reload())});var i=new Vuex.Store({state:{count:!0,delete:-1,addTab:""}});Vue.component("tab-option",{template:"#J-tab-option-template",data:function(){return{option:a.get("option")}},methods:{changeOption:function(t){this.option[t.name]=t.val,a.set()}}}),Vue.component("tab-option-itme",{template:"#J-tab-option-itme-template",props:{message:{type:Array},itemTrue:{type:Boolean},info:{type:String}},data:function(){return{itemTrues:this.itemTrue}},methods:{change:function(t){this.itemTrues=t,this.$emit("change-status",{name:this.info,val:this.itemTrues})}}}),Vue.component("tabs-item",{template:"#J-tabs-item-template",props:{tabItem:{type:Object,required:!0},tid:{type:Number},serchContent:{type:String,default:""}},data:function(){return{inputContent:"",popupWin:!1,option:a.get("option"),isOption:!1}},watch:{tid:function(t){t==this.tabItem.tid?this.isOption=!0:this.isOption=!1}},updated:function(){this.tabItem.isCurrent&&this.$refs.input.focus()},mounted:function(){this.tabItem.isCurrent&&this.$refs.input.focus()},methods:{tabNameSubmit:function(){this.inputContent?(this.tabItem.isCurrent=!1,this.tabItem.name=this.inputContent):this.tabItem.isCurrent=!1,this.$emit("save-all")},goto:function(t){this.isOption=!0,this.$emit("change-status",t),this.$router.push({name:"detail",params:{tid:t,isCurrent:!1}})},fixedTabs:function(e){var s=this;this.popupWin=!this.popupWin,this.$nextTick(function(){var t=document.body.clientHeight;e.clientY+s.$refs.popup.clientHeight>t-20?s.$refs.popup.style.top=t-s.$refs.popup.clientHeight-10+"px":s.$refs.popup.style.top=e.clientY+"px",s.$refs.popup.style.left=e.clientX+10+"px"})},fixedTabs_x:function(){this.popupWin=!this.popupWin},openAll:function(){for(var t=[],e=0;e<this.tabItem.content.length;e++)t.push(this.tabItem.content[e].url);if(this.option.recoverTab)chrome.windows.create({url:t});else for(e=0;e<this.tabItem.content.length;e++)chrome.tabs.create({url:this.tabItem.content[e].url,windowId:chrome.windows.WINDOW_ID_CURRENT});this.popupWin=!this.popupWin},deleteTabs:function(){this.popupWin=!this.popupWin,this.$emit("delete-tabs",this.tabItem)},modName:function(){this.tabItem.isCurrent=!0,this.inputContent=this.tabItem.name,this.popupWin=!1},moveUp:function(){this.popupWin=!1,this.$emit("move-up",this.tabItem,-1)},moveDown:function(){this.popupWin=!1,this.$emit("move-up",this.tabItem,1)},stickTop:function(){this.popupWin=!1,this.$emit("stick-top",this.tabItem)}}}),Vue.component("tabs-pack",{template:"#J-tabs-pack-template",props:{tabs:{type:Object},scrollTop:{type:Number,default:0}},data:function(){return{option:a.get("option"),tabId:void 0}},methods:{addTab:function(){var t=this.tabs.tid,e=this.tabs.isCurrent;this.$router.push({name:"add",params:{tid:t,isCurrent:e,scrollTop:this.scrollTop}})},openAllTab:function(t){for(var e=[],s=0;s<this.tabs.content.length;s++)e.push(this.tabs.content[s].url);if(this.option.recoverTab)chrome.windows.create({url:e});else for(s=0;s<this.tabs.content.length;s++)chrome.tabs.create({url:this.tabs.content[s].url,windowId:chrome.windows.WINDOW_ID_CURRENT})},saveTabs:function(){if(this.tabs.isCurrent){this.tabs.time=(new Date).getTime();var t=JSON.parse(JSON.stringify(this.tabs));t.name=function(t){for(var e=0,s=0;s<t.length;s++)if(-1!==t[s].name.indexOf(infinity.i18n("Unnamed_tab_group"))){var i=parseInt(t[s].name.substring(6));e=e<i?i:e}return infinity.i18n("Unnamed_tab_group")+ ++e}(a.get("tabs")),t.tid=function(t,e){for(var s=100,i=0;i<t.length;i++){var n=parseInt(t[i].tid);s=s<n?n:s}if(0!==e.length)for(var a=0;a<e.length;a++){var o=parseInt(e[a].tid);s=s<o?o:s}return++s}(a.get("tabs"),[]),t.stickTop=!1,this.$store.state.addTab=t}else a.set()},deleteTabs:function(){this.$emit("handle-delete",this.tabs)},deleteTab:function(t){var e=this.tabs.content.indexOf(t);this.tabs.content.splice(e,1),a.set(),0==this.tabs.content.length&&this.$emit("handle-delete",this.tabs)},openUrl:function(t){this.option.recoverTab?chrome.windows.create({url:t},function(){}):chrome.tabs.create({url:t},function(){})}}});var n=new VueRouter({routes:[{path:"/",redirect:"/option"},{path:"/option",component:{template:'<div>\n      <div class="right-main">\n        <tab-option />\n        <donate></donate>\n        <grade />\n        <share />\n        <about-us />\n      </div>\n    </div>'}},{name:"index",path:"/index",component:{template:"#J-tab-master-index-template",data:function(){return{currentTabs:a.get("currentTabs"),oldTabs:a.get("oldTabs"),tabs:a.get("tabs"),scrollTop:0}},created:function(){"scrollTop"in this.$route.params&&(this.scrollTop=this.$route.params.scrollTop-0)},mounted:function(){var t=this;this.$nextTick(function(){this.$refs.index.scrollTop=this.scrollTop}.bind(this)),this.$refs.index.onscroll=function(){this.scrollTop=this.$refs.index.scrollTop-0}.bind(this),infinity.onMessage("getSuccess",function(){a.update(),t.currentTabs=a.get("currentTabs"),t.oldTabs=a.get("oldTabs")})},methods:{saveTabs:function(t){},deleteTabs:function(t){t.isCurrent?-1===this.currentTabs.indexOf(t)?this.oldTabs.splice(this.oldTabs.indexOf(t),1):this.currentTabs.splice(this.currentTabs.indexOf(t),1):(a.set(),this.tabs.splice(this.tabs.indexOf(t),1)),a.set(),this.$router.push({path:"/index"})}}}},{name:"detail",path:"/detail:tid",component:{template:"#J-tab-master-detail-template",data:function(){return{tid:this.$route.params.tid,tabs:a.get("tabs"),tab:{}}},created:function(){this.getTab()},mounted:function(){var t=this;infinity.onMessage("getSuccess",function(){a.update(),t.tabs=a.get("tabs"),t.getTab()})},watch:{$route:["changTab"]},methods:{changTab:function(){this.tid=this.$route.params.tid;for(var t=0;t<this.tabs.length;t++)this.tabs[t].tid==this.$route.params.tid&&(this.tab=this.tabs[t])},getTab:function(){for(var t=0;t<this.tabs.length;t++)this.tabs[t].tid==this.tid&&(this.tab=this.tabs[t])},saveTabs:function(t){t.isCurrent&&(this.tabs.unshift(t),a.set("tabs"))},deleteTabs:function(t){t.isCurrent?this.currentTabs.splice(this.currentTabs.indexOf(t),1):(a.set(),this.tabs.splice(this.tabs.indexOf(t),1)),a.set(),this.$store.state.delete=t.tid,this.$router.push({path:"/index"})}}}},{name:"add",path:"/add:tid",component:{template:"#J-tabs-add-template",data:function(){return{params:this.$route.params,tid:this.$route.params.tid,isCurrent:this.$route.params.isCurrent,inputText:""}},created:function(){"isCurrent"in this.$route.params?(sessionStorage.setItem("params",JSON.stringify(this.$route.params)),this.params=this.$route.params):(this.params=JSON.parse(sessionStorage.getItem("params")),this.tid=this.params.tid,this.isCurrent=this.params.isCurrent)},methods:{verifyHttp:function(){},addTabs:function(){var t=this.inputText.split("://"),e="",s=t[1].indexOf("/"),i=t[1].indexOf("?");-1===s&&-1===i?e=t[1]:-1!==s?e=t[1].split("/")[0]:-1===s&&-1!==i&&(e=t[1].split("?")[0]);var n={favIconUrl:"chrome://favicon/size/18@1x/"+t[0]+"://"+e+"/",id:"",title:"",url:this.inputText};this.add(n),a.update(),this.isCurrent?this.$router.push({name:"index",path:"/index",params:{scrollTop:this.params.scrollTop}}):window.history.back()},add:function(t){var e=infinity.get("tabs-master");if(this.isCurrent){for(var s=e.currentTabs,i=0;i<s.length;i++)if(this.tid==s[i].tid)return s[i].content.push(t),infinity.set("tabs-master",e),void infinity.sendMessage("getUrl",{tab:s[i]});for(var n=e.oldTabs,a=0;a<n.length;a++)if(this.tid==n[a].tid)return n[a].content.push(t),infinity.set("tabs-master",e),void infinity.sendMessage("getUrl",{tab:n[a]})}for(var o=e.tabs,r=0;r<o.length;r++)if(this.tid==o[r].tid)return o[r].content.push(t),infinity.set("tabs-master",e),void infinity.sendMessage("getUrl",{tab:o[r]})},cancalTabs:function(){this.isCurrent?this.$router.push({name:"index",path:"/index",params:{scrollTop:this.$route.params.scrollTop}}):window.history.back()}}}}]});Vue.component({template:"#J-tab-maset-template"});new Vue({el:"#main",store:i,router:n,template:"#J-tab-maset-template",data:{serchDeleteKey:!1,serchContent:"",tabs:a.get("tabs"),currentTabs:a.get("currentTabs"),oldTabs:a.get("oldTabs"),tabId:a.get("tabId"),tabsNumber:0,serchTabs:a.get("tabs"),SearchGroup:infinity.i18n("Search_group"),noSerchFound:"",pages:{isIndex:!0,isOption:!1,tid:-1},scrollDistance:0,upShow:!1,downShow:!1,lHeight:0,cHeight:0},computed:{addTab:function(){return this.$store.state.addTab},delete:function(){return this.$store.state.delete}},watch:{delete:function(){if(-1!==this.delete){var t=this.$store.state.delete;this.$store.state.delete=-1;for(var e=0;e<this.serchTabs.length;e++)if(this.serchTabs[e].tid==t){this.serchTabs.splice(e,1);break}this.upDown()}},addTab:function(){this.addTab&&(this.serchContent&&(this.serchContent="",this.serchTabs=a.get("tabs")),this.serchTabs.splice(0,0,this.addTab),this.$store.state.addTab="",this.upDown())},serchContent:function(t,e){if(0<t.length){this.serchDeleteKey=!0,this.serchTabs=[];for(var s=0;s<this.tabs.length;s++)-1!==this.tabs[s].name.indexOf(t)&&this.serchTabs.push(this.tabs[s]);0==this.serchTabs.length?this.noSerchFound="No_search_results_found":this.noSerchFound=""}else this.serchDeleteKey=!1,this.serchTabs=a.get("tabs"),this.noSerchFound="";this.upDown()},currentTabs:function(){this.number()},oldTabs:function(){this.number()},scrollDistance:function(t){var e=this.$refs.list.offsetHeight,s=78*this.serchTabs.length;e<s&&(t<18?(this.upShow=!1,this.downShow=!0):18<=t&&t<=s-e-18?(this.upShow=!0,this.downShow=!0):s-e-18<t&&(this.upShow=!0,this.downShow=!1))}},created:function(){this.number(),"#/option"==window.location.hash&&(this.pages.isIndex=!1,this.pages.isOption=!0)},mounted:function(){var t=document.documentElement.clientHeight||document.body.clientHeight;document.getElementById("app").style.height=t+"px";var e=this,s=this.$refs.listContent;s.onscroll=function(){e.scrollDistance=Math.round(s.scrollTop)},window.onresize=function(){var t=document.documentElement.clientHeight||document.body.clientHeight;document.getElementById("app").style.height=t+"px"},this.upDown()},methods:{upDown:function(){this.cHeight=this.$refs.list.offsetHeight,this.lHeight=78*this.serchTabs.length,this.cHeight<this.lHeight?this.downShow=!0:(this.upShow=!1,this.downShow=!1)},clearSerchContent:function(){this.serchContent=""},deleteTabs:function(t){this.serchContent&&a.data.tabs.splice(a.data.tabs.indexOf(t),1),this.serchTabs.splice(this.serchTabs.indexOf(t),1),a.set(),this.$router.push({path:"/index"}),this.upDown()},gotoIndex:function(){this.pages.isIndex=!0,this.pages.isOption=!1,this.pages.tid=-1,this.$router.push({path:"/index"})},gotoOption:function(){this.pages.isIndex=!1,this.pages.isOption=!0,this.pages.tid=-1,this.$router.push({path:"/option"})},serchTabName:function(){},handleChangeStatus:function(t){this.pages.isIndex=!1,this.pages.isOption=!1,this.pages.tid=t},number:function(){for(var t=this.tabsNumber=0;t<this.currentTabs.length;t++)this.tabsNumber+=this.currentTabs[t].content.length;for(t=0;t<this.oldTabs.length;t++)this.tabsNumber+=this.oldTabs[t].content.length;0<this.tabsNumber?this.tabsNumber=this.tabsNumber+infinity.i18n("tabs"):this.tabsNumber=""},previousChild:function(){var t=this.$refs.listContent,e=this,s=0,i=setInterval(function(){s++,0<e.scrollDistance?(e.scrollDistance=e.scrollDistance-8,t.scrollTop=e.scrollDistance,10<=s&&clearInterval(i)):(t.scrollTop=0,clearInterval(i))},20)},nextChild:function(){var t=this.$refs.list.offsetHeight,e=78*this.serchTabs.length,s=this.$refs.listContent,i=this,n=0,a=setInterval(function(){n++,i.scrollDistance<e-t-10?(i.scrollDistance=i.scrollDistance+8,s.scrollTop=i.scrollDistance,10<=n&&clearInterval(a)):(s.scrollTop=e-t-1,clearInterval(a))},20)},saveAll:function(){for(var t=this.serchTabs.splice(0,1),e=0;e<this.serchTabs.length;e++)if(!this.serchTabs[e].stickTop){this.serchTabs.splice(e,0,t[0]);break}0===this.serchTabs.length&&this.serchTabs.push(t[0]),a.data.tabs=this.serchTabs,a.set()},stickTop:function(t){var e=this,s=this.serchTabs.indexOf(t);this.serchTabs.splice(s,1),setTimeout(function(){t.stickTop?e.serchTabs.push(t):e.serchTabs.splice(0,0,t),t.stickTop=!t.stickTop,a.data.tabs=e.serchTabs,a.set()},400)},moveUp:function(t,e){var s=this,i=this.serchTabs.indexOf(t);i+e>=this.serchTabs.length||i+e<0||t.stickTop===this.serchTabs[i+e].stickTop&&(this.serchTabs.splice(i,1),setTimeout(function(){s.serchTabs.splice(i+e,0,t),a.data.tabs=s.serchTabs,a.set()},400))}}}).$mount("#app")}();