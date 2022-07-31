function string62to10(number_code) {
  number_code = String(number_code);
  var chars = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ',
    radix = chars.length,
    len = number_code.length,
    i = 0,
    origin_number = 0;
  while (i < len) {
    origin_number += Math.pow(radix, i++) * chars.indexOf(number_code.charAt(len - i) || 0);
  }
  return origin_number;
}
function decode(url) {
  var lastIndexOfSlash = url.lastIndexOf('/');
  var number = url.substr(lastIndexOfSlash + 1, 8);
  if (number.startsWith('00')) {
    return string62to10(number);
  } else {
    return parseInt(number, 16);
  }
}

const MENEU_ITEM_ID = 'reverse-weibo-image'

chrome.contextMenus.create({
  id: MENEU_ITEM_ID,
  title: '查看po主',
  contexts: ['image'],
  targetUrlPatterns: ["*://*.sinaimg.cn/*"]
});

chrome.contextMenus.onClicked.addListener(function (info) {
  if (info.menuItemId == MENEU_ITEM_ID) {
    sourceUrl = 'https://weibo.com/u/' + decode(info.srcUrl);
    chrome.tabs.create({ url: sourceUrl });
  }
})