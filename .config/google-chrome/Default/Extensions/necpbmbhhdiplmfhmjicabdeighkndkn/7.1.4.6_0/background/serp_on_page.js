const selectorTopAds = '#tads div[data-text-ad]',
    selectorBottomAds = '#tadsb div[data-text-ad]',
    selectorMain = '#rso > div > div:not([jscontroller])',
    arrayAds = [],
    arrayMain = [];
let index = 0;

function serpAd(singleAd, index) {
    let title, href, cite, dItem, description, h3;
    h3 = singleAd.querySelector('a div');
    title = h3 && h3.innerText;
    // if (h3.querySelector('a')) {
    //     href = h3.querySelectorAll('a')[1] && h3.querySelectorAll('a')[1].href;
    // } else {
    //     href = h3.parentNode;
    //     if (href.nodeName === 'A') {
    //         href = href.href;
    //     }
    // }
    cite = singleAd.querySelector('cite');
    cite = cite && cite.innerText;
    if (!cite) {
        let prospect = singleAd.querySelector('a div + div span + span');
        if (prospect) {
            cite = prospect.innerText;
        }
    }
    dItem = singleAd.querySelector('.MUxGbd.yDYNvb.lyLwlc');
    description = dItem ? dItem.innerText : '';
    return { title, href, cite, description, index };
}

function serpMain(singleMain, index) {
    let href, title, a, cite, dItem, description;
    a = singleMain.querySelector('a');
    title = a.querySelector('h3')
        ? a.querySelector('h3').innerText
        : a.innerText;
    href = a.href;
    cite = singleMain.querySelector('cite');
    cite = cite && cite.innerText;
    dItem = singleMain.querySelector('span:not([class]):not([jsname])');
    description = dItem ? dItem.innerText : '';
    return { title, href, cite, description, index };
}
document.querySelectorAll(selectorTopAds).forEach(el => {
    arrayAds.push(serpAd(el, index++));
});
document.querySelectorAll(selectorMain).forEach(el => {
    const r = serpMain(el, index + 1);
    if (r && r.title && r.href) {
        arrayMain.push(r);
        index++;
    }
});
document.querySelectorAll(selectorBottomAds).forEach(el => {
    arrayAds.push(serpAd(el, index++));
});

function reformat(o) {
    const o2 = {
        url: o.href,
        label: o.title,
        position: o.index,
        description: o.description
    };
    if (o.cite) o2.green_link = o.cite;
    return o2;
}

const a = { org: arrayMain.map(reformat), ads: arrayAds.map(reformat) };
a;
