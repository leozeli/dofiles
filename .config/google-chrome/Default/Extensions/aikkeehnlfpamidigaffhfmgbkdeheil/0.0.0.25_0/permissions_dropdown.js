async function optional_permissions_new_tab(event){
    chrome.permissions.request({
                origins: ["<all_urls>"]
              }, function(granted){
                console.log('Call successful.');
                // The callback argument will be true if the user granted the permissions.
                if (granted) {
                  console.log('permission granted.');
                  window.close();
                }
            });
}

document.getElementsByClassName('enable_all')[0].addEventListener('click', optional_permissions_new_tab);