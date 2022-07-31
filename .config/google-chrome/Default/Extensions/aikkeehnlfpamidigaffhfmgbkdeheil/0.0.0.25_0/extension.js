if (window.contentScriptInjected !== true) {
    window.contentScriptInjected = true; // global scope

    var current_url = "";
    var paper_domains_regex = /(arxiv\.org\/(abs|pdf)|arxiv-vanity\.com\/papers\/\d+|aclweb\.org|ieee\.org|openreview\.net|emnlp\.org|semanticscholar\.org|paperswithcode\.com|dl\.acm\.org|papers\.nips\.cc|openaccess\.thecvf\.com)/

    var request_code_domains_regex = /https:\/\/www\.google\.[a-z]{2,3}(\.[a-z]{2,3})?\/search|https:\/\/duckduckgo\.[a-z]{2,3}(\.[a-z]{2,3})?\/|https:\/\/www\.reddit\.[a-z]{2,3}(\.[a-z]{2,3})?\//

    function runExtension() {

        current_url = document.location.origin + document.location.pathname + document.location.search;

        switch (true) {
            case /https:\/\/www\.catalyzex\.com/.test(current_url):
                function pollDOM1 () {
                        const el = document.querySelector("#hellobar-bar");
                        if (el == null) {
                            setTimeout(pollDOM1, 20);
                        }   else {
                            el.remove();
                        }
                }
                pollDOM1();
                break;

            case /https:\/\/scholar\.google\.[a-z]{2,3}(\.[a-z]{2,3})?\/scholar/.test(current_url):
                var paper_title_node_list = document.querySelectorAll("h3.gs_rt");
                var i;
                for(i=0;i<paper_title_node_list.length;i++){
                    let paper_title_node = paper_title_node_list[i];
                    let paper_title_node_anchor = paper_title_node.querySelectorAll("a")[0];
                    let paper_url = paper_title_node_anchor.href;

                    // z-index clash fix
                    paper_title_node.style.zIndex = 99;

                    if (paper_url.match(/(arxiv\.org\/(abs|pdf)|arxiv-vanity\.com\/papers)/) != null) {
                            paper_url = paper_url.split('?')[0];
                            if (paper_url.endsWith('/')) paper_url = paper_url.substring(0, paper_url.length-1);
                            let paper_arxiv_id = paper_url.split('/').pop().replace( /\.pdf.*$/, '' );
                            fetchCode(paper_title_node, title = null, arxiv_id = paper_arxiv_id);
                    }  else {
                        let title = paper_title_node_anchor.textContent.trim();
                        fetchCode(paper_title_node, title = title, arxiv_id = null, url = paper_url);
                    }
                }

                //code for Cx logo button for optional permissions dropdown and sign up dropdown on scholar search
                function cxlogopollDOM_scholar_search () {
                    var selection = document.querySelector('.dropdown_parent') !== null;

                    if (selection) 
                    {   //for scholar search page only
                        var list = document.querySelectorAll('span');
                        var element_articles = Array.prototype.find.call(list, function(el) {
                            return el.innerText.includes("Articles");
                        });
                        element_articles.parentElement.parentElement.parentElement.style.zIndex = "40"; //for scholar search page only

                        // where CX logo button will be placed on Scholar search page
                        var scholar_search_icons_parent_element_node = document.querySelectorAll('[aria-label="Search"]')[1].parentElement.parentElement.parentElement.parentElement.parentElement;
                        
                        var scholar_search_icons_reference_element_node= document.querySelectorAll('[aria-label="Search"]')[1].parentElement.parentElement.parentElement.parentElement.parentElement.lastChild;

                        var dropdown_cx_div = document.createElement('div');
                        dropdown_cx_div.setAttribute('class', "dropdown_cx");
                        
                        var dropdown_cx_toggle_div = document.createElement('div');
                        dropdown_cx_toggle_div.setAttribute('class', "dropdown_cx__toggle");
                        dropdown_cx_toggle_div.style.marginTop = "8px"; //for scholar citation and search page only
                        
                        var dropdown_cx_items_ul = document.createElement('ul');
                        dropdown_cx_items_ul.setAttribute('class', "dropdown_cx__items");
                        dropdown_cx_items_ul.style.backgroundColor = "rgb(247 247 247)"; //alternate color: rgb(238 239 243)
                        dropdown_cx_items_ul.style.borderRadius = "20px";
                        dropdown_cx_items_ul.style.zIndex = "90";

                        var dropdown_cx_content_li = document.createElement('li');
                        dropdown_cx_content_li.setAttribute('class', "dropdown_cx-content");
                        dropdown_cx_content_li.innerHTML = 'To see code for AI/ML papers on more websites, please enable additional permissions<br>(highly recommended)<br><br><button class="enable_all" style="font-size: 15px;">✨Enable✨</button><br><br><a href="https://docs.google.com/document/d/e/2PACX-1vRcpN2kHoGSsWXllkHtszDf2KZwYcoqEnjN5vYMEjauAwPxSVnLkWIX_ExuNQVogRnIOdIf5vlWnVso/pub" style="font-size: 11px;color: #1a0dab;" target="_blank">Your privacy is our priority</a><br><br>';

                        var cx_logo_btn_img_url = chrome.extension.getURL("/icons/cxlogoicon_btn.png");
                        
                        var cx_logo_btn = document.createElement('a');
                        cx_logo_btn.setAttribute('title',"Enable all permissions - CatalyzeX");
                        cx_logo_btn.setAttribute('target', "_blank");
                        cx_logo_btn.setAttribute('class',"cx_logo_btn_a_tag");
                        cx_logo_btn.innerHTML = '<img class = "cx_logo_btn" style="height: 30px;width: 30px;" src="' + cx_logo_btn_img_url + '" /><span class="button__badge"></span>';

                        dropdown_cx_items_ul.appendChild(dropdown_cx_content_li);

                        dropdown_cx_toggle_div.appendChild(cx_logo_btn);
                        dropdown_cx_div.appendChild(dropdown_cx_toggle_div);
                        dropdown_cx_div.appendChild(dropdown_cx_items_ul);

                        scholar_search_icons_parent_element_node.insertBefore(dropdown_cx_div, scholar_search_icons_reference_element_node);

                        var dropdown = document.querySelector(".dropdown_cx");
                        var toggle = document.querySelector(".dropdown_cx__toggle");
                        var items = document.querySelector(".dropdown_cx__items");

                        toggle.addEventListener("click", () => {
                            //red badge disappears when cx logo clicked
                            document.querySelector('.button__badge').style.display = "none";
                            items.classList.toggle("dropdown_cx__items_active");
                        });

                        //TODO: see whats happening and if can be removed
                        window.addEventListener("click", (e) => {
                          if (dropdown.contains(e.target)) {
                            return;
                          }
                          items.classList.remove("dropdown_cx__items_active");
                        });

                        //if browser == chrome OR edge
                        var isIE = /*@cc_on!@*/ false || !!document.documentMode;
                        var isEdge = !isIE && (navigator.userAgent.indexOf("Edg") != -1)
                        var isChrome = !isEdge && !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
                        if (isEdge || isChrome) {
                            document.querySelector('.enable_all').addEventListener('click', function(event) {
                                chrome.runtime.sendMessage({type: "runchromepermissionsrequest"});
                            });
                        } else {
                            //click enable button and open permissions_dropdown.html in new tab (using href?)
                            document.querySelector('.enable_all').onclick = function () {
                                window.open(chrome.extension.getURL("permissions_dropdown.html"));
                            };
                        }
                    }
                    else {
                       setTimeout(cxlogopollDOM_scholar_search, 20); 
                    } 
                }            

                if (document.readyState == "complete") {
                        //check if cx logo button exists: true or false
                        var cx_logo_btn_exists = document.querySelector('.dropdown_cx') !== null;

                        chrome.runtime.onMessage.addListener(
                            function(request, sender, sendResponse) {
                              if (request.message === "haspermission") {
                                sendResponse({status: "done"});
                                return true;
                              }
                              else if ((request.message === "doesnthavepermission")&&(cx_logo_btn_exists==false)){
                                sendResponse({status: "notdone"});
                                cxlogopollDOM_scholar_search();
                              }
                            }
                        );
                        chrome.runtime.sendMessage({type: "checkchromepermissions"});
                }
                break;

            case /https:\/\/scholar\.google\.[a-z]{2,3}(\.[a-z]{2,3})?\/citations/.test(current_url):
                var paper_title_node_list = document.querySelectorAll("td.gsc_a_t");
                var i;
                for(i=0;i<paper_title_node_list.length;i++){
                    let paper_title_node = paper_title_node_list[i];
                    let paper_title_node_anchor = paper_title_node.querySelectorAll("a")[0];
                    let paper_url = paper_title_node_anchor.href;

                    if (paper_url.match(/(arxiv\.org\/(abs|pdf)|arxiv-vanity\.com\/papers)/) != null) {
                            paper_url = paper_url.split('?')[0];
                            if (paper_url.endsWith('/')) paper_url = paper_url.substring(0, paper_url.length-1);
                            let paper_arxiv_id = paper_url.split('/').pop().replace( /\.pdf.*$/, '' );
                            fetchCode(paper_title_node, title = null, arxiv_id = paper_arxiv_id);

                    }  else {
                        let title = paper_title_node_anchor.textContent.trim();
                        fetchCode(paper_title_node, title = title);
                    }
                }

                //code for Cx logo button for optional permissions dropdown and sign up dropdown
                function cxlogopollDOM_scholar () {
                    var selection = document.querySelector('.dropdown_parent') !== null;

                    if (selection) 
                    {   // where CX logo button will be placed on Scholar citations page
                        var scholar_citations_icons_parent_element_node = document.querySelectorAll('[aria-label="Search"]')[2].parentElement;
                        var scholar_citations_icons_reference_element_node= document.querySelectorAll('[aria-label="Search"]')[2];

                        var dropdown_cx_div = document.createElement('div');
                        dropdown_cx_div.setAttribute('class', "dropdown_cx");

                        var dropdown_cx_toggle_div = document.createElement('div');
                        dropdown_cx_toggle_div.setAttribute('class', "dropdown_cx__toggle");

                        dropdown_cx_toggle_div.style.marginTop = "8px"; //for scholar citation page only

                        var dropdown_cx_items_ul = document.createElement('ul');
                        dropdown_cx_items_ul.setAttribute('class', "dropdown_cx__items");
                        dropdown_cx_items_ul.style.backgroundColor = "rgb(247 247 247)"; 
                        dropdown_cx_items_ul.style.borderRadius = "20px";

                        var dropdown_cx_content_li = document.createElement('li');
                        dropdown_cx_content_li.setAttribute('class', "dropdown_cx-content");
                        
                        dropdown_cx_content_li.innerHTML = 'To see code for AI/ML papers on more websites, please enable additional permissions<br>(highly recommended)<br><br><button class="enable_all" style="font-size: 15px;">✨Enable✨</button><br><br><a href="https://docs.google.com/document/d/e/2PACX-1vRcpN2kHoGSsWXllkHtszDf2KZwYcoqEnjN5vYMEjauAwPxSVnLkWIX_ExuNQVogRnIOdIf5vlWnVso/pub" style="font-size: 11px;color: #1a0dab;" target="_blank">Your privacy is our priority</a><br><br>';

                        var cx_logo_btn_img_url = chrome.extension.getURL("/icons/cxlogoicon_btn.png");
                        var cx_logo_btn = document.createElement('a');
                        
                        cx_logo_btn.setAttribute('title',"Enable all permissions - CatalyzeX");
                        cx_logo_btn.setAttribute('target', "_blank");
                        cx_logo_btn.setAttribute('class',"cx_logo_btn_a_tag");

                        cx_logo_btn.innerHTML = '<img class = "cx_logo_btn" style="height: 30px;width: 30px;" src="' + cx_logo_btn_img_url + '" /><span class="button__badge"></span>';
                        
                        dropdown_cx_items_ul.appendChild(dropdown_cx_content_li);
                        dropdown_cx_toggle_div.appendChild(cx_logo_btn);
                        dropdown_cx_div.appendChild(dropdown_cx_toggle_div);
                        dropdown_cx_div.appendChild(dropdown_cx_items_ul);
                        
                        scholar_citations_icons_parent_element_node.insertBefore(dropdown_cx_div, scholar_citations_icons_reference_element_node);

                        var dropdown = document.querySelector(".dropdown_cx");
                        var toggle = document.querySelector(".dropdown_cx__toggle");
                        var items = document.querySelector(".dropdown_cx__items");

                        toggle.addEventListener("click", () => {
                            //red badge disappears when cx logo clicked
                            document.querySelector('.button__badge').style.display = "none";
                            items.classList.toggle("dropdown_cx__items_active");
                        });

                        //TODO: see whats happening and if can be removed
                        window.addEventListener("click", (e) => {
                          if (dropdown.contains(e.target)) {
                            return;
                          }
                          items.classList.remove("dropdown_cx__items_active");
                        });

                        //if browser == chrome OR edge
                        var isIE = /*@cc_on!@*/ false || !!document.documentMode;
                        var isEdge = !isIE && (navigator.userAgent.indexOf("Edg") != -1)
                        var isChrome = !isEdge && !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
                        if (isEdge || isChrome) {
                            document.querySelector('.enable_all').addEventListener('click', function(event) {
                                chrome.runtime.sendMessage({type: "runchromepermissionsrequest"});
                            });
                        } else {
                            //click enable button and open permissions_dropdown.html in new tab (using href?)
                            document.querySelector('.enable_all').onclick = function () {
                                window.open(chrome.extension.getURL("permissions_dropdown.html"));
                            };
                        }
                    }
                    else {
                        setTimeout(cxlogopollDOM_scholar, 20);
                    } 
                }            

                if (document.readyState == "complete") {
                        //check if cx logo button exists: true or false
                        var cx_logo_btn_exists = document.querySelector('.dropdown_cx') !== null;
                        chrome.runtime.onMessage.addListener(
                            function(request, sender, sendResponse) {
                              if (request.message === "haspermission") {
                                sendResponse({status: "done"});
                                return true;
                              }

                              else if ((request.message === "doesnthavepermission")&&(cx_logo_btn_exists==false)){
                                sendResponse({status: "notdone"});
                                cxlogopollDOM_scholar();
                              }
                            }
                        );
                        chrome.runtime.sendMessage({type: "checkchromepermissions"});
                }
                break;

            case /https:\/\/www\.google\.[a-z]{2,3}(\.[a-z]{2,3})?\/search/.test(current_url):
                let flag = false;
                try {
                    let scholar_node = document.querySelector("div > div > div > table > tbody > tr > td > h3 > a");
                    let paper_title_node = scholar_node.parentElement;
                    let title = paper_title_node.querySelector("em").textContent;
                    
                    flag = (scholar_node.href.match(/scholar\.google\.[a-z]{2,3}(\.[a-z]{2,3})?\/scholar/) != null);
                } catch(err){}

                var paper_title_node_list = document.querySelectorAll("div.g > div > div a > h3");

                // Check if scholar results shown or urls from any relevant domain present
                flag = flag || Array.from(paper_title_node_list).map(function(x) {return paper_domains_regex.test(x.parentElement.href) }).includes(true);

                if (flag){
                    let search_title = document.querySelector("input[name='q'][type='text']").value;
                    let search_overview_node = document.querySelector("div#result-stats");
                    //only title is being passed to fetchCode currently, arxiv id ain't being passed. So the see all button won't pop up for code button underneath search bar given no arxiv id.
                    fetchCode(search_overview_node, title = search_title);

                    search_overview_node.style.overflow = 'visible';

                    var i;
                    for(i=0;i<paper_title_node_list.length;i++){
                        var cx_div = document.createElement('div');
                        cx_div.setAttribute('class', "cx_div");
                        paper_title_node_list[i].parentElement.parentElement.appendChild(cx_div);
                        let paper_title_node = paper_title_node_list[i].parentElement.parentElement.querySelector("div.cx_div");

                        let paper_url = paper_title_node_list[i].parentElement.href;

                        if (paper_url.match(/(arxiv\.org\/(abs|pdf)|arxiv-vanity\.com\/papers\/\d+)/) != null) {
                            paper_url = paper_url.split('?')[0];
                            paper_url = paper_url.split('#')[0];
                            if (paper_url.endsWith('/')) paper_url = paper_url.substring(0, paper_url.length-1);
                            let paper_arxiv_id = paper_url.split('/').pop().replace( /\.pdf.*$/, '' );
                            fetchCode(paper_title_node, title = null, arxiv_id = paper_arxiv_id);
                        } else {
                            let title = paper_title_node_list[i].parentElement.querySelector("h3").textContent.trim();
                            fetchCode(paper_title_node, title = title, arxiv_id = null, url = paper_url);
                        }

                        // to make sure that see all button goes on top of text caption under search link 
                        let search_result_top_section = paper_title_node_list[i].parentElement.parentElement.parentElement;
                        search_result_top_section.style.overflow = "visible";
                        search_result_top_section.style.zIndex = "99";
                        search_result_top_section.style.contain = "unset";

                        /*for overflow of social icons on a google search*/
                        let entire_search_list_node = document.querySelector("#center_col");
                        entire_search_list_node.style.overflow = "visible";
                        entire_search_list_node.style.zIndex = "99";
                    }
                }

                //code for Cx logo button for optional permissions dropdown and later sign up dropdown
                function cxlogopollDOM () {
                    var selection = document.querySelector('.dropdown_parent') !== null;

                    if (selection) {
                        // where CX logo button will be placed on Google search -- agnostic of banner
                        var google_icons_node = document.querySelectorAll('[aria-label="Settings"]')[0].parentElement;

                        var dropdown_cx_div = document.createElement('div');
                        dropdown_cx_div.setAttribute('class', "dropdown_cx");

                        var dropdown_cx_toggle_div = document.createElement('div');
                        dropdown_cx_toggle_div.setAttribute('class', "dropdown_cx__toggle");

                        var dropdown_cx_items_ul = document.createElement('ul');
                        dropdown_cx_items_ul.setAttribute('class', "dropdown_cx__items");
                        dropdown_cx_items_ul.style.backgroundColor = "rgb(247 247 247)";
                        dropdown_cx_items_ul.style.borderRadius = "20px";

                        var dropdown_cx_content_li = document.createElement('li');
                        dropdown_cx_content_li.setAttribute('class', "dropdown_cx-content");
                        dropdown_cx_content_li.innerHTML = 'To see code for AI/ML papers on more websites, please enable additional permissions<br>(highly recommended)<br><br><button class="enable_all" style="font-size: 15px;">✨Enable✨</button><br><br><a href="https://docs.google.com/document/d/e/2PACX-1vRcpN2kHoGSsWXllkHtszDf2KZwYcoqEnjN5vYMEjauAwPxSVnLkWIX_ExuNQVogRnIOdIf5vlWnVso/pub" style="font-size: 11px;color: #1a0dab;" target="_blank">Your privacy is our priority</a><br><br>';


                        var cx_logo_btn_img_url = chrome.extension.getURL("/icons/cxlogoicon_btn.png");
                        var cx_logo_btn = document.createElement('a');
                        
                        cx_logo_btn.setAttribute('title',"Enable all permissions - CatalyzeX");
                        cx_logo_btn.setAttribute('target', "_blank");
                        cx_logo_btn.setAttribute('class',"cx_logo_btn_a_tag");

                        cx_logo_btn.innerHTML = '<img class = "cx_logo_btn" style="height: 30px;width: 30px;" src="' + cx_logo_btn_img_url + '" /><span class="button__badge"></span>';
                        
                        dropdown_cx_items_ul.appendChild(dropdown_cx_content_li);
                        dropdown_cx_toggle_div.appendChild(cx_logo_btn);
                        dropdown_cx_div.appendChild(dropdown_cx_toggle_div);
                        dropdown_cx_div.appendChild(dropdown_cx_items_ul);
                        google_icons_node.prepend(dropdown_cx_div);

                        var dropdown = document.querySelector(".dropdown_cx");
                        var toggle = document.querySelector(".dropdown_cx__toggle");
                        var items = document.querySelector(".dropdown_cx__items");

                        toggle.addEventListener("click", () => {
                            //red badge disappears when cx logo clicked
                            document.querySelector('.button__badge').style.display = "none";
                            items.classList.toggle("dropdown_cx__items_active");
                        });

                        //TODO: see whats happening and if can be removed
                        window.addEventListener("click", (e) => {
                          if (dropdown.contains(e.target)) {
                            return;
                          }
                          items.classList.remove("dropdown_cx__items_active");
                        });

                        //if browser == chrome OR edge
                        var isIE = /*@cc_on!@*/ false || !!document.documentMode;
                        var isEdge = !isIE && (navigator.userAgent.indexOf("Edg") != -1)
                        var isChrome = !isEdge && !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
                        if (isEdge || isChrome) {
                            document.querySelector('.enable_all').addEventListener('click', function(event) {
                                chrome.runtime.sendMessage({type: "runchromepermissionsrequest"});
                            });
                        } else {
                            //click enable button and open permissions_dropdown.html in new tab (using href?)
                            document.querySelector('.enable_all').onclick = function () {
                                window.open(chrome.extension.getURL("permissions_dropdown.html"));
                            };
                        }
                    }
                    else {
                        setTimeout(cxlogopollDOM, 20);    
                    } 
                }            

                if (document.readyState == "complete") {
                        //check if cx logo button exists: true or false
                        var cx_logo_btn_exists = document.querySelector('.dropdown_cx') !== null;

                        chrome.runtime.onMessage.addListener(
                            function(request, sender, sendResponse) {
                              if (request.message === "haspermission") {
                                sendResponse({status: "done"});
                                return true;
                              }
                              else if ((request.message === "doesnthavepermission")&&(cx_logo_btn_exists==false)){
                                sendResponse({status: "notdone"});
                                cxlogopollDOM();
                              }
                            }
                        );
                        chrome.runtime.sendMessage({type: "checkchromepermissions"});
                }
                break;

            case /https:\/\/arxiv\.org\/(abs|pdf)/.test(current_url):
                var paper_title_node = document.querySelectorAll("h1.title")[0];
                var title = paper_title_node.childNodes[1].nodeValue.trim();
                current_url = current_url.split('?')[0];
                current_url = current_url.split('#')[0];
                var paper_arxiv_id = current_url.split('/').pop().replace( /\.pdf.*$/, '' );
                fetchCode(paper_title_node, title = title, arxiv_id = paper_arxiv_id);

                if (document.querySelectorAll(".bib-ds-select")[0] !== undefined) {

                    function pollDOM2 () {
                            const el = document.querySelectorAll(".bib-paper-container > .bib-paper-overhang > .bib-paper-links")[0];

                            if (el == null) {
                                setTimeout(pollDOM2, 200);
                            } else {
                                var paper_title_node_list = document.querySelectorAll(".bib-paper-container > .bib-paper-overhang > .bib-paper-links");
                                var i;
                                for(i=0;i<paper_title_node_list.length;i++){
                                    let paper_title_node = paper_title_node_list[i];
                                    let title = paper_title_node.parentElement.querySelector(".bib-paper > a").textContent.trim();

                                    var arxiv_bib_section_node = document.createElement('div');
                                    arxiv_bib_section_node.addEventListener('click', function(event) {
                                        event.stopPropagation();
                                    });
                                    paper_title_node.appendChild(arxiv_bib_section_node);

                                    fetchCode(arxiv_bib_section_node, title = title);
                                }
                            }
                    }
                    if (document.readyState == "complete") {
                        pollDOM2();
                    }
                }

                //code for Cx logo button for optional permissions dropdown and sign up dropdown
                function cxlogopollDOM_arxiv_abs_pdf () {
                    var selection = document.querySelector('.dropdown_parent') !== null;

                    if (selection) 
                    {   // where CX logo button will be placed on arxiv pdf abs page -- agnostic of banner
                        var arxiv_search_bar_node = document.querySelectorAll('.control')[0].parentElement.parentElement.parentElement;

                        var dropdown_cx_div = document.createElement('div');
                        dropdown_cx_div.setAttribute('class', "dropdown_cx");
                        dropdown_cx_div.style.bottom = "6px"; //for arxiv only

                        var dropdown_cx_toggle_div = document.createElement('div');
                        dropdown_cx_toggle_div.setAttribute('class', "dropdown_cx__toggle");

                        var dropdown_cx_items_ul = document.createElement('ul');
                        dropdown_cx_items_ul.setAttribute('class', "dropdown_cx__items");
                        dropdown_cx_items_ul.style.backgroundColor = "rgb(247 247 247)"; //alternate color: rgb(238 239 243)
                        dropdown_cx_items_ul.style.borderRadius = "20px";
                        dropdown_cx_items_ul.style.paddingLeft = "0px";

                        var dropdown_cx_content_li = document.createElement('li');
                        dropdown_cx_content_li.setAttribute('class', "dropdown_cx-content");

                        document.querySelector('#header').style.overflow = "inherit"; //only for arxiv abstract page

                        dropdown_cx_content_li.innerHTML = 'To see code for AI/ML papers on more websites, please enable additional permissions<br>(highly recommended)<br><br><button class="enable_all" style="font-size: 15px;">✨Enable✨</button><br><br><a href="https://docs.google.com/document/d/e/2PACX-1vRcpN2kHoGSsWXllkHtszDf2KZwYcoqEnjN5vYMEjauAwPxSVnLkWIX_ExuNQVogRnIOdIf5vlWnVso/pub" style="font-size: 11px;color: #1a0dab;" target="_blank">Your privacy is our priority</a><br><br>';

                        var cx_logo_btn_img_url = chrome.extension.getURL("/icons/cxlogoicon_btn.png");
                        var cx_logo_btn = document.createElement('a');
                        
                        cx_logo_btn.setAttribute('title',"Enable all permissions - CatalyzeX");
                        cx_logo_btn.setAttribute('target', "_blank");
                        cx_logo_btn.setAttribute('class',"cx_logo_btn_a_tag");

                        cx_logo_btn.style.height = "29px"; //for arxiv pages only

                        cx_logo_btn.innerHTML = '<img class = "cx_logo_btn" style="height: 25px;width: 25px;" src="' + cx_logo_btn_img_url + '" /><span class="button__badge" style="background-color: #ffc107;"></span>';  //height, width set to 25px instead of 30 for arxiv only
                        
                        dropdown_cx_items_ul.appendChild(dropdown_cx_content_li);
                        dropdown_cx_toggle_div.appendChild(cx_logo_btn);
                        dropdown_cx_div.appendChild(dropdown_cx_toggle_div);
                        dropdown_cx_div.appendChild(dropdown_cx_items_ul);
                        
                        arxiv_search_bar_node.prepend(dropdown_cx_div);

                        var dropdown = document.querySelector(".dropdown_cx");
                        var toggle = document.querySelector(".dropdown_cx__toggle");
                        var items = document.querySelector(".dropdown_cx__items");

                        toggle.addEventListener("click", () => {
                            //red badge disappears when cx logo clicked
                            document.querySelector('.button__badge').style.display = "none";
                            items.classList.toggle("dropdown_cx__items_active");
                        });

                        //TODO: see whats happening and if can be removed
                        window.addEventListener("click", (e) => {
                          if (dropdown.contains(e.target)) {
                            return;
                          }
                          items.classList.remove("dropdown_cx__items_active");
                        });

                        //if browser == chrome OR edge
                        var isIE = /*@cc_on!@*/ false || !!document.documentMode;
                        var isEdge = !isIE && (navigator.userAgent.indexOf("Edg") != -1)
                        var isChrome = !isEdge && !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
                        if (isEdge || isChrome) {
                            document.querySelector('.enable_all').addEventListener('click', function(event) {
                                chrome.runtime.sendMessage({type: "runchromepermissionsrequest"});
                            });
                        } else {
                            //click enable button and open permissions_dropdown.html in new tab (using href?)
                            document.querySelector('.enable_all').onclick = function () {
                                window.open(chrome.extension.getURL("permissions_dropdown.html"));
                            };
                        }
                    }
                    else {
                        setTimeout(cxlogopollDOM_arxiv_abs_pdf, 20);
                    } 
                }            

                if (document.readyState == "complete") {
                        //check if cx logo button exists: true or false
                        var cx_logo_btn_exists = document.querySelector('.dropdown_cx') !== null;

                        chrome.runtime.onMessage.addListener(
                            function(request, sender, sendResponse) {
                             
                              if (request.message === "haspermission") {
                                sendResponse({status: "done"});
                                return true;
                              }

                              else if ((request.message === "doesnthavepermission")&&(cx_logo_btn_exists==false)){
                                sendResponse({status: "notdone"});
                                cxlogopollDOM_arxiv_abs_pdf();
                              }
                            }
                        );
                        chrome.runtime.sendMessage({type: "checkchromepermissions"});
                }
                break;

            // TODO:
            // case /https:\/\/ieeeexplore\.org\//.test(current_url):
            //     break;

            // case /https:\/\/semanticscholar\.org\//.test(current_url):
            //     break;

            // case /https:\/\/bing\.com\//.test(current_url):
            //     break;

            case /https:\/\/arxiv\.org\/search/.test(current_url):
                var paper_title_node_list = document.querySelectorAll("li.arxiv-result p.title");
                var i;
                for(i=0;i<paper_title_node_list.length;i++){
                    let paper_title_node = paper_title_node_list[i];
                    let title = paper_title_node.textContent.trim();
                    let paper_url = paper_title_node.parentElement.querySelector("div > p > a").href;
                    let paper_arxiv_id = paper_url.split('/').pop();

                    fetchCode(paper_title_node, title = title, arxiv_id = paper_arxiv_id, url = paper_url);
                }

                //code for Cx logo button for optional permissions dropdown and sign up dropdown
                function cxlogopollDOM_arxiv_search () {
                    var selection = document.querySelector('.dropdown_parent') !== null;

                    if (selection)
                    {   // where CX logo button will be placed on arxiv pdf abs page -- agnostic of banner
                        var arxiv_search_bar_node= document.querySelectorAll('.control')[0].parentElement.parentElement.parentElement;

                        var arxiv_header = document.querySelectorAll('.control')[0].parentElement.parentElement.parentElement.parentElement;

                        var dropdown_cx_div = document.createElement('div');
                        dropdown_cx_div.setAttribute('class', "dropdown_cx");
                        //TODO: these styles should ideally be in the CSS file not JS
                        dropdown_cx_div.style.bottom = "13px"; //for arxiv only

                        var dropdown_cx_toggle_div = document.createElement('div');
                        dropdown_cx_toggle_div.setAttribute('class', "dropdown_cx__toggle");

                        var dropdown_cx_items_ul = document.createElement('ul');
                        dropdown_cx_items_ul.setAttribute('class', "dropdown_cx__items");
                        dropdown_cx_items_ul.style.backgroundColor = "rgb(247 247 247)"; //alternate color: rgb(238 239 243)
                        dropdown_cx_items_ul.style.borderRadius = "20px";

                        var dropdown_cx_content_li = document.createElement('li');
                        dropdown_cx_content_li.setAttribute('class', "dropdown_cx-content");

                        arxiv_header.style.overflow = "inherit"; //for arxiv only

                        dropdown_cx_content_li.innerHTML = 'To see code for AI/ML papers on more websites, please enable additional permissions<br>(highly recommended)<br><br><button class="enable_all" style="font-size: 15px;">✨Enable✨</button><br><br><a href="https://docs.google.com/document/d/e/2PACX-1vRcpN2kHoGSsWXllkHtszDf2KZwYcoqEnjN5vYMEjauAwPxSVnLkWIX_ExuNQVogRnIOdIf5vlWnVso/pub" style="font-size: 11px;color: #1a0dab;" target="_blank">Your privacy is our priority</a><br><br>';

                        var cx_logo_btn_img_url = chrome.extension.getURL("/icons/cxlogoicon_btn.png");
                        var cx_logo_btn = document.createElement('a');
                        
                        cx_logo_btn.setAttribute('title',"Enable all permissions - CatalyzeX");
                        cx_logo_btn.setAttribute('target', "_blank");
                        cx_logo_btn.setAttribute('class',"cx_logo_btn_a_tag");

                        cx_logo_btn.style.height = "29px"; //only for arxiv search page

                        cx_logo_btn.innerHTML = '<img class = "cx_logo_btn" style="height: 25px;width: 25px;" src="' + cx_logo_btn_img_url + '" /><span class="button__badge" style="background-color: #ffc107;"></span>';  //height, width set to 25px instead of 30 for arxiv only
                        
                        dropdown_cx_items_ul.appendChild(dropdown_cx_content_li);
                        dropdown_cx_toggle_div.appendChild(cx_logo_btn);
                        dropdown_cx_div.appendChild(dropdown_cx_toggle_div);
                        dropdown_cx_div.appendChild(dropdown_cx_items_ul);
                        
                        arxiv_search_bar_node.prepend(dropdown_cx_div);

                        var dropdown = document.querySelector(".dropdown_cx");
                        var toggle = document.querySelector(".dropdown_cx__toggle");
                        var items = document.querySelector(".dropdown_cx__items");

                        toggle.addEventListener("click", () => {
                            //red badge disappears when cx logo clicked
                            document.querySelector('.button__badge').style.display = "none";
                            items.classList.toggle("dropdown_cx__items_active");
                        });

                        //TODO: see whats happening and if can be removed
                        window.addEventListener("click", (e) => {
                          if (dropdown.contains(e.target)) {
                            return;
                          }
                          items.classList.remove("dropdown_cx__items_active");
                        });

                        //if browser == chrome OR edge
                        var isIE = /*@cc_on!@*/ false || !!document.documentMode;
                        var isEdge = !isIE && (navigator.userAgent.indexOf("Edg") != -1)
                        var isChrome = !isEdge && !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
                        if (isEdge || isChrome) {
                            document.querySelector('.enable_all').addEventListener('click', function(event) {
                                chrome.runtime.sendMessage({type: "runchromepermissionsrequest"});
                            });
                        } else {
                            //click enable button and open permissions_dropdown.html in new tab (using href?)
                            document.querySelector('.enable_all').onclick = function () {
                                window.open(chrome.extension.getURL("permissions_dropdown.html"));
                            };
                        }
                    }
                    else {
                        setTimeout(cxlogopollDOM_arxiv_search, 20);
                    } 
                }            

                if (document.readyState == "complete") {
                        //check if cx logo button exists: true or false
                        var cx_logo_btn_exists = document.querySelector('.dropdown_cx') !== null;
                        chrome.runtime.onMessage.addListener(
                            function(request, sender, sendResponse) {
                             
                              if (request.message === "haspermission") {
                                sendResponse({status: "done"});
                                return true;
                              }

                              else if ((request.message === "doesnthavepermission")&&(cx_logo_btn_exists==false)){
                                sendResponse({status: "notdone"});
                                cxlogopollDOM_arxiv_search();
                              }
                            }
                        );
                        chrome.runtime.sendMessage({type: "checkchromepermissions"});
                }
                break;

            case /twitter\.com\/(\w)*\/status\//.test(current_url):

                function pollDOM () {
                    const el = document.querySelectorAll("article span+a")[0];
                    if (el == null) {
                        setTimeout(pollDOM, 200);
                    } else {
                        var tweet_node = el.parentElement;
                        var tweet_text = tweet_node.querySelectorAll("span")[0].textContent.trim();

                        var link;
                        var paper_id_matcher;

                        var link_nodes = tweet_node.querySelectorAll("a");

                        var tweet_date_time_node = el.parentElement.parentElement.parentElement.parentElement.children[2];
                        
                        //when code btn appears for current focused tweet
                        var tweet_like_retweet_reaction_node = el.parentElement.parentElement.parentElement.parentElement.children[3];

                        // when code btn appears for parent tweet of current focused tweet
                        var tweet_like_retweet_reaction_node_two = el.parentElement.parentElement.parentElement.parentElement.children[1].children[2];

                        var paper_arxiv_id;
                        let papers_found = new Set();
                        var i;
                        for(i=0;i<link_nodes.length;i++){

                            var link_node = link_nodes[i];
                            if (link_node !== undefined && (link = link_node.textContent.trim()) && paper_domains_regex.test(link)) {
                                paper_arxiv_id = link.split('/').pop().replace( /\.pdf.*$/, '' );
                                // Prevent duplicates, for e.g. when abs and pdf both linked for a paper
                                if (!papers_found.has(paper_arxiv_id)){
                                    papers_found.add(paper_arxiv_id);
                                
                                    fetchCode(tweet_node, title = null, arxiv_id = paper_arxiv_id);
                                    var article_node = tweet_node.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                                    article_node.style.overflow = "visible";
                                }
                            }
                        }

                        if ((paper_id_matcher = tweet_text.match(/arxiv:(\d+\.\d+)/i)) && paper_id_matcher != null) {
                            paper_arxiv_id = paper_id_matcher[1];
                            fetchCode(tweet_node, title = null, arxiv_id = paper_arxiv_id);
                            var article_node = tweet_node.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                            article_node.style.overflow = "visible";  
                        }

                        //only make changes incase arxiv id is present--to ensure that any random unrelated tweets with multiple images/media don't go crazy wide all over screen
                        if (paper_arxiv_id !== undefined) {

                            var article_node = el.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement.parentElement;
                            article_node.style.overflow = "visible";

                            //this changes z-index of tweet so the see all dropdown comes above image media, link media
                            tweet_node.parentElement.parentElement.style.zIndex = "5";
                            
                            if (tweet_date_time_node !== undefined) {
                                 tweet_date_time_node.style.zIndex = "-1"; //makes sure that see all button is accessible and doesn't go under date time node in tweet
                            }

                            if (tweet_like_retweet_reaction_node !== undefined) {
                            tweet_like_retweet_reaction_node.style.zIndex = "-1"; //makes sure that see all button is accessible and doesn't go under reply, love, retweet, reaction node in tweet
                            }

                            if (tweet_like_retweet_reaction_node_two !== undefined) {
                            tweet_like_retweet_reaction_node_two.style.zIndex = "-1"; //makes sure that see all button is accessible and doesn't go under reply, love, retweet, reaction node in tweet
                            }
                        }
                    }
                }

                if (document.readyState == "complete") {
                    pollDOM();
                }

                //code for Cx logo button for optional permissions dropdown and sign up dropdown on twitter status
                function cxlogopollDOM_twitter_status () {
                   
                    var selection = document.querySelector('.dropdown_parent') !== null;

                    if (selection)
                    {   // where CX logo button will be placed on twitter status page
                        var twitter_icons_parent_element_node = document.querySelectorAll('[aria-label="Timeline: Conversation"]')[0].parentElement.parentElement.parentElement.children[0].children[0].children[0].children[0].children[0].children[0].children[0];

                        var dropdown_cx_div = document.createElement('div');
                        dropdown_cx_div.setAttribute('class', "dropdown_cx");

                        var dropdown_cx_toggle_div = document.createElement('div');
                        dropdown_cx_toggle_div.setAttribute('class', "dropdown_cx__toggle");

                        dropdown_cx_toggle_div.style.marginTop = "8px"; //for scholar citation and search page only

                        var dropdown_cx_items_ul = document.createElement('ul');
                        dropdown_cx_items_ul.setAttribute('class', "dropdown_cx__items");
                        dropdown_cx_items_ul.style.backgroundColor = "rgb(247 247 247)"; //alternate color: rgb(238 239 243)
                        dropdown_cx_items_ul.style.borderRadius = "20px";
                        dropdown_cx_items_ul.style.zIndex = "90";
                        dropdown_cx_items_ul.style.paddingLeft = "0px";

                        var dropdown_cx_content_li = document.createElement('li');
                        dropdown_cx_content_li.setAttribute('class', "dropdown_cx-content");

                        dropdown_cx_content_li.innerHTML = 'To see code for AI/ML papers on more websites, please enable additional permissions<br>(highly recommended)<br><br><button class="enable_all" style="font-size: 15px;">✨Enable✨</button><br><br><a href="https://docs.google.com/document/d/e/2PACX-1vRcpN2kHoGSsWXllkHtszDf2KZwYcoqEnjN5vYMEjauAwPxSVnLkWIX_ExuNQVogRnIOdIf5vlWnVso/pub" style="font-size: 11px;color: #1a0dab;" target="_blank">Your privacy is our priority</a><br><br>';

                        var cx_logo_btn_img_url = chrome.extension.getURL("/icons/cxlogoicon_btn.png");
                        var cx_logo_btn = document.createElement('a');
                        cx_logo_btn.setAttribute('title',"Enable all permissions - CatalyzeX");
                        cx_logo_btn.setAttribute('target', "_blank");
                        cx_logo_btn.setAttribute('class',"cx_logo_btn_a_tag");

                        cx_logo_btn.innerHTML = '<img class = "cx_logo_btn" style="height: 30px;width: 30px;" src="' + cx_logo_btn_img_url + '" /><span class="button__badge"></span>';
                        dropdown_cx_items_ul.appendChild(dropdown_cx_content_li);
                        dropdown_cx_toggle_div.appendChild(cx_logo_btn);
                        dropdown_cx_div.appendChild(dropdown_cx_toggle_div);
                        dropdown_cx_div.appendChild(dropdown_cx_items_ul);

                        twitter_icons_parent_element_node.appendChild(dropdown_cx_div);

                        var dropdown = document.querySelector(".dropdown_cx");
                        var toggle = document.querySelector(".dropdown_cx__toggle");
                        var items = document.querySelector(".dropdown_cx__items");

                        toggle.addEventListener("click", () => {
                            //red badge disappears when cx logo clicked
                            document.querySelector('.button__badge').style.display = "none";
                            items.classList.toggle("dropdown_cx__items_active");
                        });

                        //TODO: see whats happening and if can be removed
                        window.addEventListener("click", (e) => {
                          if (dropdown.contains(e.target)) {
                            return;
                          }
                          items.classList.remove("dropdown_cx__items_active");
                        });

                        //if browser == chrome OR edge
                        var isIE = /*@cc_on!@*/ false || !!document.documentMode;
                        var isEdge = !isIE && (navigator.userAgent.indexOf("Edg") != -1)
                        var isChrome = !isEdge && !!window.chrome && (!!window.chrome.webstore || !!window.chrome.runtime);
                        if (isEdge || isChrome) {
                            document.querySelector('.enable_all').addEventListener('click', function(event) {
                                chrome.runtime.sendMessage({type: "runchromepermissionsrequest"});
                            });
                        } else {
                            //click enable button and open permissions_dropdown.html in new tab (using href?)
                            document.querySelector('.enable_all').onclick = function () {
                                window.open(chrome.extension.getURL("permissions_dropdown.html"));
                            };
                        }
                    }

                    else {
                        setTimeout(cxlogopollDOM_twitter_status, 20);
                    } 
                }            

                if (document.readyState == "complete") {
                    //check if cx logo button exists: true or false
                    var cx_logo_btn_exists = document.querySelector('.dropdown_cx') !== null;

                    chrome.runtime.onMessage.addListener(
                        function(request, sender, sendResponse) {

                          if (request.message === "haspermission") {
                            sendResponse({status: "done"});
                            return true;
                          }
                          else if ((request.message === "doesnthavepermission")&&(cx_logo_btn_exists==false)){
                            sendResponse({status: "notdone"});
                            cxlogopollDOM_twitter_status();
                          }
                        }
                    );
                    chrome.runtime.sendMessage({type: "checkchromepermissions"});
                }
                break;

            default:
                if (document.readyState == "complete") {
                        chrome.runtime.onMessage.addListener(
                            function(request, sender, sendResponse) {
                                if (request.message === "haspermission") {
                                    switch (true) {
                                            case /https:\/\/duckduckgo\.[a-z]{2,3}(\.[a-z]{2,3})?\//.test(current_url):
                                                var paper_title_node_list = document.querySelectorAll("h2.js-result-title");
                                                
                                                var el_dd = document.querySelectorAll("h2.result__title"), i;
                                                for (i = 0; i < el_dd.length; ++i) {
                                                  el_dd[i].style.overflow = "visible"; //allow see all to overflow from parent and be visible
                                                }

                                                var el_dd_parent = document.querySelectorAll("a.js-result-title-link"), i;
                                                for (i = 0; i < el_dd_parent.length; ++i) {
                                                  el_dd_parent[i].style.overflow = "visible"; //allow see all to overflow from parent and be visible
                                                }

                                                var zindexduckducksearch = document.querySelector("#header_wrapper");
                                                zindexduckducksearch.style.zIndex = 99990; //fixes zindex issue and makes search wrapper of duck duck come on top of code button

                                                //TODO: REMOVE CSS FROM EXTENSION.CSS AND MAKE STYLE CHANGES HERE. will need to do polldom to get access to elements for queryselector. DDG changes that should only happen if code found

                                                var i;
                                                for(i=0;i<paper_title_node_list.length;i++){
                                                    let paper_title_node = paper_title_node_list[i];

                                                    let paper_url = paper_title_node_list[i].querySelector('a.js-result-title-link').href;
                                                    if (paper_url.match(/(arxiv\.org\/(abs|pdf)|arxiv-vanity\.com\/papers\/\d+)/) != null) {
                                                        paper_url = paper_url.split('?')[0];
                                                        paper_url = paper_url.split('#')[0];
                                                        if (paper_url.endsWith('/')) paper_url = paper_url.substring(0, paper_url.length-1);
                                                        let paper_arxiv_id = paper_url.split('/').pop().replace( /\.pdf.*$/, '' );
                                                        fetchCode(paper_title_node, title = null, arxiv_id = paper_arxiv_id);
                                                    } else {
                                                        let title = paper_title_node.querySelector('a.js-result-title-link').textContent.trim();
                                                        fetchCode(paper_title_node, title = title, arxiv_id = null, url = paper_url);
                                                    }
                                                }
                                                break;

                                            // TODO: how to make code buttons appear on subreddit page or on twitter feeds/etc. given page can modify without url or browser properly refreshing
                                            case /https:\/\/www\.reddit\.[a-z]{2,3}(\.[a-z]{2,3})?\//.test(current_url):
                                                var paper_title_node_list = document.querySelectorAll('[data-click-id="text"] div p a, a.styled-outbound-link, [data-testid="comment"] div p a');
                                                    var i;
                                                    for(i=0;i<paper_title_node_list.length;i++){
                                                        var cx_reddit_div = document.createElement('div');
                                                        cx_reddit_div.setAttribute('class', "cx_reddit_div");
                                                        paper_title_node_list[i].parentElement.appendChild(cx_reddit_div);

                                                        let paper_title_node = paper_title_node_list[i].parentElement.querySelector("div.cx_reddit_div");

                                                        //for allowing cx see all button to overflow and be accessible
                                                        var data_test_id_child_node = paper_title_node.parentElement.parentElement;
                                                        data_test_id_child_node.style.overflow = "visible";

                                                        //for making sure that code button goes in new line
                                                        var parent_of_cx_div_node = paper_title_node. parentElement.style.display = "block";

                                                        let paper_url = paper_title_node_list[i].href;

                                                        if (paper_url.match(/(arxiv\.org\/(abs|pdf)|arxiv-vanity\.com\/papers\/\d+)/) != null) {
                                                            paper_url = paper_url.split('?')[0];
                                                            paper_url = paper_url.split('#')[0];
                                                            if (paper_url.endsWith('/')) paper_url = paper_url.substring(0, paper_url.length-1);
                                                            let paper_arxiv_id = paper_url.split('/').pop().replace( /\.pdf.*$/, '' );
                                                            fetchCode(paper_title_node, title = null, arxiv_id = paper_arxiv_id);

                                                        } else {
                                                            let title = paper_title_node_list[i].parentElement.querySelector('a').textContent.trim();
                                                            fetchCode(paper_title_node, title = title, arxiv_id = null, url = paper_url);
                                                        }
                                                    }
                                                break;

                                            default:
                                                break;
                                    }
                                    sendResponse({status: "done"});
                                    return true;
                                }
                                else if (request.message === "doesnthavepermission"){
                                    sendResponse({status: "notdone"});
                                }
                            }
                        );
                        chrome.runtime.sendMessage({type: "checkchromepermissions"});
                }
                break;
        }
    }

    function fetchCode(paper_title_node, title = null, arxiv_id = null, url = null) {

        let xhr = new XMLHttpRequest();
        try{
            cx_api_url = "https://www.catalyzex.com/api/code?extension=true";

            if (arxiv_id != null){
                cx_api_url += "&paper_arxiv_id="+encodeURIComponent(arxiv_id)
            }
            if (title != null){
                cx_api_url += "&paper_title="+encodeURIComponent(title)
            }
            if (url != null){
                cx_api_url += "&paper_url="+encodeURIComponent(url)
            }

            xhr.open("GET", cx_api_url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');
            xhr.setRequestHeader("Access-Control-Allow-Origin", "*");

            function isDarkMode() {
                var dummy = document.createElement('span');
                dummy.style.display = "none";
                dummy.style.setProperty("background-color", "rgb(0, 0, 0)");
                document.body.appendChild(dummy);
                window.getComputedStyle(dummy, null).getPropertyValue("background-color");
                return document.querySelector("body").style["background-color"] == window.getComputedStyle(dummy, null).getPropertyValue("background-color");
            }

            function isDimMode() {
                var dummy2 = document.createElement('span');
                dummy2.style.display = "none";
                dummy2.style.setProperty("background-color", "rgb(21, 32, 43)");
                document.body.appendChild(dummy2);
                window.getComputedStyle(dummy2, null).getPropertyValue("background-color");
                return document.querySelector("body").style["background-color"] == window.getComputedStyle(dummy2, null).getPropertyValue("background-color");
            }

            xhr.onreadystatechange = function() {
                var addbtn_icon_img_url = chrome.extension.getURL("/icons/addcode_white.png");
                if (xhr.readyState == 4) {
                    try{
                        var resp = JSON.parse(xhr.responseText);
                        if(resp.hasOwnProperty('code_url')){

                            var code_url = resp.code_url;
                            arxiv_id = arxiv_id || resp.arxiv_id;

                            var a = document.createElement('a');
                            a.setAttribute('class', "cx_code");
                            a.setAttribute('href', code_url);
                            a.setAttribute('data-lynx-uri', "https://www.catalyzex.com/redirect?url=" + code_url);
                            a.setAttribute('data-lynx-mode', "hover");
                            a.addEventListener('mouseover', function() {
                                a.href = code_url;
                            });
                            a.addEventListener('mouseout', function() {
                                a.style.backgroundColor = "black";
                            });
                            a.addEventListener('click', function() {
                                a.href = a.getAttribute('data-lynx-uri');
                            });
                            a.addEventListener('contextmenu', function() {
                                a.href = a.getAttribute('data-lynx-uri');
                            });
                            a.setAttribute('title',"Code implementation found - CatalyzeX");
                            a.setAttribute('target', "_blank");

                            var share_icon_img_url = chrome.extension.getURL("/icons/share.png");
                            var codebtn_icon_img_url = chrome.extension.getURL("/icons/code_button_3.5x_latest.png");

                            a.style.textDecoration = "none";
                            a.style.display = "inline-block";
                            a.style.border = "1px solid currentColor";
                            a.style.margin = "2px 2.5px";
                            a.style.marginRight= "2.65px";
                            a.style.fontWeight = "bold";
                            a.style.backgroundColor = "black";
                            a.style.fontSize = "initial";
                            a.style.borderRadius = "5px";
                            a.style.width = "fit-content";
                            a.style.alignItems = "center";
                            a.style.verticalAlign = "text-bottom";
                            a.innerHTML = '<img class="btn_image" style="width: 80px; height: 26px;" src="' + codebtn_icon_img_url + '" />';
                            a.style.height = "26px";

                            var dropdown_child = document.createElement('span');
                            dropdown_child.setAttribute('class', "dropdown_child");

                            var dropdown_parent = document.createElement('span');
                            dropdown_parent.setAttribute('class', "dropdown_parent");  
                            dropdown_child.appendChild(a);

                            if (arxiv_id != null) {
                                var catalyzex_code_url = "https://www.catalyzex.com/paper/arxiv:" + arxiv_id + "/code";
                                var first_dropdown = document.createElement('a');
                                first_dropdown.setAttribute('class', "seeall_btn_parent");
                                first_dropdown.setAttribute('href', catalyzex_code_url);
                                first_dropdown.setAttribute('data-lynx-uri', catalyzex_code_url);
                                first_dropdown.setAttribute('data-lynx-mode', "hover");
                                first_dropdown.addEventListener('mouseover', function() {
                                    first_dropdown.href = catalyzex_code_url;
                                });
                                first_dropdown.addEventListener('click', function() {
                                    first_dropdown.href = first_dropdown.getAttribute('data-lynx-uri');
                                });
                                first_dropdown.addEventListener('contextmenu', function() {
                                    first_dropdown.href = a.getAttribute('data-lynx-uri');
                                });
                                first_dropdown.setAttribute('title',"See all code implementations found - CatalyzeX");
                                first_dropdown.setAttribute('target', "_blank");

                                first_dropdown.style.textDecoration = "none";
                                first_dropdown.style.boxSizing= "border-box";
                                first_dropdown.style.display = "flex";
                                first_dropdown.style.border = "1px solid currentColor";
                                first_dropdown.style.fontWeight = "bold";
                                first_dropdown.style.backgroundColor = "white";
                                first_dropdown.style.fontSize = "initial";
                                first_dropdown.style.alignItems = "center";
                                first_dropdown.style.verticalAlign = "middle";
                                first_dropdown.style.height = "28px";
                                first_dropdown.style.color = "black";
                                first_dropdown.style.width = "82px";
                                first_dropdown.innerHTML = '<span class ="seeall_btn" style="margin-left: 18px;margin-right: 15px;margin-bottom: auto;max-height: fit-content;display: flex;vertical-align: middle;align-content: space-around;font-size: 14.5px;font-weight: 500;height: 28px;">See All</span>';

                                var myli_child = document.createElement('li');
                                myli_child.setAttribute('class', "dropdown_li");

                                var myul_child = document.createElement('ul');
                                myul_child.setAttribute('class', "dropdown_ul dropdown_list_item_ul");

                                myli_child.appendChild(first_dropdown);  
                                myul_child.appendChild(myli_child);
                                dropdown_child.appendChild(myul_child);

                            }
                                
                            dropdown_parent.appendChild(dropdown_child);
                            dropdown_parent.addEventListener('click', function(event) {
                                event.stopPropagation();
                            });

                            paper_title_node.appendChild(dropdown_parent);

                            var addcodebutton = document.createElement('a');
                            addcodebutton.setAttribute('class', "addcodebutton");
                            addcodebutton.setAttribute('href', "https://docs.google.com/forms/d/1_DnaK863S3T8wPwE2pigkH04gQO-fRzTP6nOCYRywLs/viewform");
                            addcodebutton.setAttribute('title',"Add Your Code Implementation - CatalyzeX");
                            addcodebutton.setAttribute('target', "_blank");
                            addcodebutton.style.textDecoration = "none";
                            addcodebutton.style.display = "inline-block";
                            addcodebutton.style.border = "1px solid transparent";
                            addcodebutton.style.margin = "2px 2.8px 2px 2.8px";
                            addcodebutton.style.fontWeight = "bold";
                            addcodebutton.style.backgroundColor = "white";
                            addcodebutton.style.fontSize = "initial";
                            addcodebutton.style.borderRadius = "5px";
                            addcodebutton.style.width = "fit-content";
                            addcodebutton.style.alignItems = "center";
                            addcodebutton.style.verticalAlign = "text-bottom";
                            addcodebutton.innerHTML = '<img class="addcode_btn_image" style="height: 26px;" src="' + addbtn_icon_img_url + '" />';
                            addcodebutton.style.height = "26px";
                            //prevents from autoclicking and opening in new tab
                            addcodebutton.addEventListener('click', function(event) {
                                event.stopPropagation();
                            });

                            paper_title_node.appendChild(addcodebutton);

                            var sharebuttons = document.createElement('sharebuttons');
                            sharebuttons.style.textDecoration = "none";
                            sharebuttons.style.display = "inline-block";
                            sharebuttons.style.position = "absolute";
                            sharebuttons.style.padding = "1px 5px 2px 2.7px";
                            sharebuttons.style.transform = "scale(0.85)";
                            sharebuttons.style.fontSize = "18px";
                            sharebuttons.style.alignItems = "center";
                       
                            if (title != null){
                                paper_title_or_link = title;
                            } else if (arxiv_id != null) {
                                paper_title_or_link = "https://www.catalyzex.com/paper/arxiv:" + encodeURIComponent(arxiv_id);
                            } else {
                                paper_title_or_link = encodeURIComponent(url);
                            }
                        
                            var copytoclipboard_url_codebtn = "Found code for " + paper_title_or_link + " at " + code_url + " via the CatalyzeX extension (bit.ly/code_finder_chrome | bit.ly/code_finder_firefox)";
                            var email_url_codebtn = "mailto:?subject=Code%20for%20" + paper_title_or_link + "&body=Found%20code%20for%20" + paper_title_or_link + "%20at%20" + code_url + "%20with%20the%20CatalyzeX%20extension%20(chrome:%20bit.ly%2Fcode_finder_chrome%20|%20firefox:%20bit.ly%2Fcode_finder_firefox)";
                            var twitter_url_codebtn = "https://twitter.com/intent/tweet?text=Found%20code%20for%20" + paper_title_or_link + "%20at%20" + code_url + "%20with%20the%20CatalyzeX%20extension%20(bit.ly%2Fcode_finder_chrome%20%7C%20bit.ly%2Fcode_finder_firefox)";
                            var facebook_url_codebtn = "https://www.facebook.com/dialog/share?app_id=704241106642044&display=popup&href=" + code_url + "&redirect_uri=https%3A%2F%2Fcatalyzex.com&quote=Check%20out%20code%20for%20" + paper_title_or_link + "%20at%20" + code_url + "%0D%0A%0D%0A—%20found%20via%20the%20CatalyzeX%20extension%20(bit.ly%2Fcode_finder_chrome%20|%20bit.ly%2Fcode_finder_firefox)";
                            var whatsapp_url_codebtn = "https://api.whatsapp.com/send?text=Check%20out%20code%20for%20" + paper_title_or_link + "%20at%20" + code_url + "%20—%20found%20via%20the%20CatalyzeX%20extension%20(bit.ly%2Fcode_finder_chrome%20|%20bit.ly%2Fcode_finder_firefox)";
                            var messenger_url_codebtn = "https://www.facebook.com/dialog/send?app_id=704241106642044&link=" + encodeURIComponent(code_url) + "&redirect_uri=https%3A%2F%2Fcatalyzex.com";
                            var linkedin_url_codebtn = "https://www.linkedin.com/sharing/share-offsite/?url=" + code_url;
                            var reddit_url_codebtn = "https://www.reddit.com/submit?title=Code%20for%20" + paper_title_or_link + "&text=Check%20out%20code%20for%20" + paper_title_or_link + "%20at%20" + code_url + "%20—%20found%20via%20the%20CatalyzeX%20extension%20(bit.ly%2Fcode_finder_chrome%20|%20bit.ly%2Fcode_finder_firefox)";

                            var share_icon_img_url = chrome.extension.getURL("/icons/share.png");
                            var copytoclipboard_img_url = chrome.extension.getURL("/icons/link.png");
                            var email_img_url = chrome.extension.getURL("/icons/filled-message.png");
                            var twitter_img_url = chrome.extension.getURL("/icons/twitter.png");
                            var facebook_img_url = chrome.extension.getURL("/icons/facebook-new.png");
                            var whatsapp_img_url = chrome.extension.getURL("/icons/whatsapp.png");
                            var messenger_img_url = chrome.extension.getURL("/icons/facebook-messenger--v2.png");
                            var linkedin_img_url = chrome.extension.getURL("/icons/linkedin.png");
                            var reddit_img_url = chrome.extension.getURL("/icons/reddit.png");

                            sharebuttons.innerHTML = 
                            '<div class="btn_wrap" style="border-radius: 5px;">'
                            +   '<span class="share_icon_slider" style="border-radius: 8px;">'
                            +       '<img style="margin-left: -5px;height: auto;" class="sharebtnicon" alt="share icon" src="' + share_icon_img_url + '" />'
                            +   '</span>'
                            +    '<div class="containerone" style="width: 0px;">'
                            +        '<a style="margin-left: -35px;" title="Copy link" class="share-btn copytext" id="copytext" target="_blank" copytext="' + copytoclipboard_url_codebtn + '" target="_blank">'
                            +            '<i class="sharing_icons_extension"><img class="clipboard" src="' + copytoclipboard_img_url + '" /></i>'
                            +        '</a>'
                            +        '<a title="Share via email" href="' + email_url_codebtn + '" class="share-btn" target="_blank">'
                            +            '<i class="sharing_icons_extension"><img class="emailslider" src="' + email_img_url + '"/></i>'
                            +        '</a>'
                            +        '<a title="Share on Twitter" href="' + twitter_url_codebtn + '" class="share-btn" target="_blank">'
                            +            '<i class="sharing_icons_extension"><img class="twitterslider" src="' + twitter_img_url + '" /></i>'
                            +        '</a>'
                            +        '<a title="Share on Facebook" class="share-btn" href="' + facebook_url_codebtn + '" target="_blank">'
                            +            '<i class="sharing_icons_extension"><img class="facebookslider" src="' + facebook_img_url + '" /></i>'
                            +        '</a>'
                            +        '<a title="Send via Whatsapp" href="' + whatsapp_url_codebtn + '" class="share-btn" target="_blank">'
                            +            '<i class="sharing_icons_extension"><img class="whatsappslider" src="' + whatsapp_img_url + '" /></i>'
                            +        '</a>'
                            +        '<a title="Send via Messenger" href="' + messenger_url_codebtn + '" class="share-btn" target="_blank">'
                            +            '<i class="sharing_icons_extension"><img class="messengerslider" src="' + messenger_img_url + '" /></i>'
                            +        '</a>'
                            +        '<a title="Share on LinkedIn" href="' + linkedin_url_codebtn + '" class="share-btn" target="_blank">'
                            +            '<i class="sharing_icons_extension"><img class="linkedinslider" src="' + linkedin_img_url + '" /></i>'
                            +        '</a>'
                            +        '<a title="Share on Reddit" href="' + reddit_url_codebtn + '" class="share-btn" target="_blank">'
                            +            '<i class="sharing_icons_extension"><img class="redditslider" src="' + reddit_img_url + '" /></i>'
                            +        '</a>'
                            +    '</div>'
                            + '</div>';

                            //Black background and white border for social button slider if twitter dim/dark mode
                            var iconlistbg = sharebuttons.querySelector('.btn_wrap');
                            
                            if (/twitter\.com\/(\w)*\/status\//.test(current_url) && (isDarkMode() || isDimMode())) {
                                a.style.color = "white";
                                
                                addcodebutton.style.color = "white";
                                addcodebutton.style.backgroundColor = "transparent";
                                
                                iconlistbg.style.border = "1px solid white";
                                iconlistbg.style.background = "black";
                            } else { //light mode
                                a.style.color = "black";
                                
                                addcodebutton.style.color = "black";
                                
                                iconlistbg.style.border = "1px solid black";
                                
                                // Special CSS for results by GSearch bar
                                if (paper_title_node.id == "result-stats" && /https:\/\/www\.google\.[a-z]{2,3}(\.[a-z]{2,3})?\/search/.test(current_url)) {
                                    iconlistbg.querySelector("div.containerone").style.paddingTop = "10px";
                                }
                            }

                            let copycodetext = sharebuttons.querySelector('.share-btn.copytext');
                            copycodetext.addEventListener('click', function() {
                                const el = document.createElement('textarea');
                                el.value = copycodetext.getAttribute('copytext');
                                document.body.appendChild(el);
                                el.select();
                                document.execCommand('copy');
                                document.body.removeChild(el);
                                return false;
                            });

                            sharebuttons.addEventListener('click', function(event) {
                                event.stopPropagation();
                            });

                            paper_title_node.appendChild(sharebuttons);
                        }
                    } catch(err){}
                }
                else if (xhr.status == 404 && arxiv_id != null && (request_code_domains_regex.test(current_url))) {
                    var code_url = "https://www.catalyzex.com/paper/arxiv:" + arxiv_id + "/code";

                    var a = document.createElement('a');
                    a.setAttribute('class', "cx_code");
                    a.setAttribute('href', code_url);
                    a.setAttribute('data-lynx-uri', "https://www.catalyzex.com/redirect?url=" + code_url);
                    a.setAttribute('data-lynx-mode', "hover");
                    a.addEventListener('mouseover', function() {
                        a.href = code_url;
                        a.style.backgroundColor = "#ebebeb";
                    });
                    a.addEventListener('mouseout', function() {
                        a.style.backgroundColor = "white";
                    });
                    a.addEventListener('click', function() {
                        a.href = a.getAttribute('data-lynx-uri');
                    });
                    a.addEventListener('contextmenu', function() {
                        a.href = a.getAttribute('data-lynx-uri');
                    });
                    a.setAttribute('title',"Request code implementation - CatalyzeX");
                    a.setAttribute('target', "_blank");

                    a.style.color = "#4d5156";

                    a.style.textDecoration = "none";
                    a.style.display = "inline-block";
                    a.style.border = "1px solid currentColor";
                    a.style.padding = "0 4px";
                    
                    a.style.fontSize = "10px";
                    a.style.borderRadius = "2px";
                    
                    a.style.verticalAlign = "middle";
                    a.style.textAlign = "center";
                    a.style.letterSpacing = "0.75px";
                    a.style.lineHeight = "16px";
                    a.style.height = "14px";

                    a.style.margin = "0 2px 3px 6px";

                    a.innerText = "REQUEST CODE";

                    a.addEventListener('click', function(event) {
                        event.stopPropagation();
                    });

                    paper_title_node.appendChild(a);

                    var addcodebutton2 = document.createElement('a');
                    addcodebutton2.setAttribute('class', "addcodebutton2");
                    addcodebutton2.setAttribute('href', "https://docs.google.com/forms/d/1_DnaK863S3T8wPwE2pigkH04gQO-fRzTP6nOCYRywLs/viewform");
                    addcodebutton2.setAttribute('title',"Add Your Code Implementation - CatalyzeX");
                    addcodebutton2.setAttribute('target', "_blank");
                    addcodebutton2.style.textDecoration = "none";
                    addcodebutton2.style.display = "inline-block";
                    addcodebutton2.style.border = "1px solid transparent";

                    addcodebutton2.style.margin = "0 2px 3px 3px";
                    addcodebutton2.style.fontSize = "10px";
                    addcodebutton2.style.borderRadius = "2px";
                    addcodebutton2.style.verticalAlign = "middle";
                    addcodebutton2.style.textAlign = "center";
                    addcodebutton2.style.letterSpacing = "0.75px";
                    addcodebutton2.style.lineHeight = "16px";
                    addcodebutton2.style.height = "14px";

                    addcodebutton2.style.margin = "0 2px 3px 6px";
                    addcodebutton2.innerHTML = '<img class="btn_image" style="height: 14px;" src="' + addbtn_icon_img_url + '" />';
                    addcodebutton2.addEventListener('click', function(event) {
                        event.stopPropagation();
                    });

                    paper_title_node.appendChild(addcodebutton2);
                }
            }
            xhr.send();
        } catch(err1) {}
    }

    chrome.runtime.onMessage.addListener(
        function(request, sender, sendResponse) {
            let new_url = document.location.origin + document.location.pathname + document.location.search;
            if (request.type == "runExtension" && current_url != new_url) {          
                runExtension();
            }
        }
    );
}