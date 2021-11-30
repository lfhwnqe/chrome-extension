/*
 * @Author: your name
 * @Date: 2021-11-29 23:54:16
 * @LastEditTime: 2021-11-30 22:07:15
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /chrome-extension/js/content-script.js
 */
(function () {
    console.log('hello this is content-script');
    document.addEventListener('DOMContentLoaded', function () {
        const currentUrl = window.location.href
        // 判断是否在商品详情页面
        if (currentUrl.indexOf('https://item.jd.com/100014352535.html') >= 0) {
            const skuName = document.querySelector('.sku-name').innerText
            console.log('sku-name:', skuName);
            sendMessageToBackground(JSON.stringify({ skuName, currentUrl, type: 'skuName' }))
        }
        // 接收来自后台的消息
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            console.log('收到来自后台的消息：', request);
            const { type, priceHistory, otherPlatform } = JSON.parse(request)
            if (type === 'skuInfo') {
                console.log('priceHistory,', priceHistory);
                console.log('otherPlatform,', otherPlatform);
                // todo 渲染价格信息
            }
        });

    })

    function sendMessageToBackground(message) {
        chrome.runtime.sendMessage({ message }, function (response) {
            console.log('收到来自后台的回复：' + response);
        });
    }
})();