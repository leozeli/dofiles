/**
 * ImageAssistant
 * Project Home: http://www.pullywood.com/ImageAssistant/
 * Author: Joey
 * Copyright (C) 2013-2022 普利坞(Pullywood.com)
**/
"use strict";$((function(){document.title=_w_tango("_w_lumber");$("#pop_main").append($("<ul />",{class:"nav nav-pills nav-stacked"}).append($("<li />").append($("<a />",{class:"extBtn",href:"#","data-level":0,text:_w_tango("_w_burial")}).prepend($("<span />",{class:"glyphicon glyphicon-flash"})))).append($("<li />").append($("<a />",{class:"extBtn",href:"#","data-level":1,text:_w_tango("_w_pilot")}).prepend($("<span />",{class:"glyphicon glyphicon-warning-sign"})))).append($("<li />").append($("<a />",{class:"extBtn",href:"#","data-level":2,text:_w_tango("_w_assay")}).prepend($("<span />",{class:"fa fa-bomb"})))).append($("<li />").append($("<a />",{id:"multiUrlExtractor",class:"multiExtBtn font-weight-bold info",target:"_blank",href:"./multiUrlExtractor.html",text:_w_tango("_w_smudge")}).prepend($("<span />",{class:"glyphicon glyphicon-list-alt"})))).append($("<li />",{class:"divider"})).append($("<li />").append($("<a />",{id:"_imageAssistant_qrcode_",class:"optionBtn",href:"#",text:_w_tango("_w_sonnet")}).prepend($("<span />",{class:"glyphicon glyphicon-qrcode"})))).append($("<li />").append($("<a />",{id:"_imageAssistant_editor_",class:"optionBtn",target:"_imageAssistant_editor_",href:"./imageEditor.html",text:_w_tango("_w_cereal")}).prepend($("<span />",{class:"glyphicon glyphicon-edit"})))).append($("<li />",{class:"divider"})).append($("<li />").append($("<a />",{class:"optionBtn",target:"_ImageAssistant_Plus_",href:"https://www.pullywood.com/ImageAssistant_Plus/",text:_w_tango("_w_truism")}).prepend($("<span />",{class:"fab fa-app-store"})))).append($("<li />",{class:"divider"})).append($("<li />").append($("<a />",{class:"optionBtn",target:"_imageAssistant_options",href:"./options.html",text:_w_tango("_w_hassle")}).prepend($("<span />",{class:"glyphicon glyphicon-wrench"})))).append($("<li />").append($("<a />",{class:"optionBtn",target:"_imageAssistant_options",href:"./options.html?showMsg=about",text:_w_tango("_w_scion")}).append($("<span />",{id:"newVersion",text:"new"})).prepend($("<span />",{class:"glyphicon glyphicon-copyright-mark"})))));$(".extBtn").click((function(){let _w_morale=$(this).attr("data-level");_w_genre()._w_willow(_w_morale);window.close()}));if(localStorage["version"]&&localStorage["version"]>chrome.runtime.getManifest().version){$("#newVersion").show()}$.getJSON(_w_hack,(function(data){let $_w_turret=$("#_cxyz_fav_");if(data.shortName){let _w_stitch=DOMPurify.sanitize(data.icon,{WHOLE_DOCUMENT:true});let $_w_dome=$("<div />",{id:"popup_user_info"});let $_w_rookie=$("<img />",{src:_w_stitch,id:"popup_avatar"});let $_w_gale=$("<span />",{text:" "+data.shortName});$_w_dome.append($_w_rookie);$_w_dome.append($_w_gale);$_w_turret.attr("href",_w_hack);$_w_turret.append($_w_dome)}else{}}));$("#multiUrlExtractor").on("click",(function(){_w_genre()._w_mime();return false}));$("#_imageAssistant_qrcode_").on("click",(function(){chrome.tabs.query({active:true,currentWindow:true},(function(_w_fret){if(!_w_fret||_w_fret.length===0)return;let _w_fluke=_w_fret[0];let _w_crust=_w_fluke.url;if(_w_crust.indexOf("#")>0){_w_crust=_w_crust.substring(0,_w_crust.indexOf("#"))}_w_nymph(_w_crust,false)}));return false}))}));