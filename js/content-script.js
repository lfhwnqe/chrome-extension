/*
 * @Author: your name
 * @Date: 2021-11-29 23:54:16
 * @LastEditTime: 2021-11-30 00:52:12
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /chrome-extension/js/content-script.js
 */
(function () {
    console.log('hello this is content-script');
    document.addEventListener('DOMContentLoaded', function () {
        const currentUrl = window.location.href
        // 接收来自后台的消息
        chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
            console.log('收到来自popup的消息：', request);
            sendResponse(JSON.stringify({ currentUrl, type: 'received' }));
        });
    })
})();