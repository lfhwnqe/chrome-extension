/*
 * @Author: your name
 * @Date: 2021-11-30 01:05:45
 * @LastEditTime: 2021-11-30 01:29:18
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /chrome-extension/js/background.js
 */
// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    console.log('收到来自content-script的消息：');
    sendResponse('我是后台，我已收到你的消息：' + JSON.stringify(request));
    console.log(request, sender, sendResponse);
    const { message } = request
    const { currentUrl } = JSON.parse(message)
    fetch(`https://www.baidu.com?currentUrl=${encodeURIComponent(currentUrl)}`).then(data => {
        console.log('fetch success');
        const adInfo = {
            type: "adInfo",
            hasAd: true,
            adDom: '.Modal-wrapper'
        }
        sendMessageToContentScript(JSON.stringify(adInfo), () => {
            console.log('send success');
        })
    })
});

// 获取当前选项卡ID
function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}
// 向content-script主动发送消息
function sendMessageToContentScript(message, callback) {
    getCurrentTabId((tabId) => {
        chrome.tabs.sendMessage(tabId, message, function (response) {
            if (callback) callback(response);
        });
    });
}