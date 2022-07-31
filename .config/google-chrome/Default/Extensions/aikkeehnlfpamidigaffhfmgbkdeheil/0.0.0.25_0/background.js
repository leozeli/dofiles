'use strict';

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == "runchromepermissionsrequest") {  
           chrome.permissions.request({
                origins: ["<all_urls>"]
              }, function(granted){
                // The callback argument will be true if the user granted the permissions.
                if (granted) {
                  chrome.tabs.executeScript(
                  //TODO: does chrome.tabs do it for all tabs or only current tab?
                  //TODO: deprecated so change to scripting.executeScript for manifest v3 version or through messaging
                   {code: 'document.querySelector(\' .dropdown_cx\').style.display = "none"'});
                }
            });
        }
    }
);

chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
        if (request.type == "checkchromepermissions") {  
          chrome.permissions.contains({
           origins: ["<all_urls>"]
          }, function(result){
            if (result) {
              // The extension has the permissions.
              chrome.tabs.sendMessage(sender.tab.id, {message: "haspermission"});
            } else {
              // The extension doesn't have the permissions.
              chrome.tabs.sendMessage(sender.tab.id, {message: "doesnthavepermission"});
            }
          });
        }
    }
);

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    const domains_regex = /https:\/\/duckduckgo\.[a-z]{2,3}(\.[a-z]{2,3})?\/|https:\/\/www\.reddit\.[a-z]{2,3}(\.[a-z]{2,3})?\//
    if (changeInfo.status == 'complete') {
      if (domains_regex.test(tab.url)) {
        chrome.tabs.insertCSS(tab.id, {file: 'extension.css' },
          function(results){
            chrome.tabs.executeScript(tab.id, {file: 'extension.js' },
              function(results){
                chrome.tabs.sendMessage(tab.id, {type: "runExtension", url: changeInfo.url});
              });
          });
      } else {
        chrome.tabs.sendMessage(tab.id, {type: "runExtension", url: changeInfo.url});
      }
    }
});

chrome.runtime.setUninstallURL("https://docs.google.com/forms/d/e/1FAIpQLSfmU4mG1QDqb6wXpF_FTb5V_qdHAjS8P8I7mVSOgMqa6iPReQ/viewform");
chrome.runtime.onInstalled.addListener(function(details) {
    chrome.runtime.setUninstallURL("https://docs.google.com/forms/d/e/1FAIpQLSfmU4mG1QDqb6wXpF_FTb5V_qdHAjS8P8I7mVSOgMqa6iPReQ/viewform");
    if (details.reason == "install") {
        chrome.tabs.create({url: chrome.runtime.getURL('popup.html')});
    }
});
const CONTEXT_MENU_ID = "CatalyzeX";
function getSelectedText(info,tab) {
  if (info.menuItemId !== CONTEXT_MENU_ID) {
    return;
  }
  chrome.tabs.create({
    url: encodeURI("https://www.catalyzex.com/search?query=" + info.selectionText)
  });
}
try {
    chrome.contextMenus.create({
      title: "Find papers and code for \"%s\"",
      contexts:["selection"],
      id: CONTEXT_MENU_ID
    });
} catch(err){}
chrome.contextMenus.onClicked.addListener(getSelectedText);