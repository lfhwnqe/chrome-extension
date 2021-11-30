/*
 * @Author: your name
 * @Date: 2021-11-30 01:05:45
 * @LastEditTime: 2021-11-30 22:09:06
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /chrome-extension/js/background.js
 */
// 监听来自content-script的消息
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    const { message } = request
    const { skuName, currentUrl } = JSON.parse(message)
    fetch(`https://www.baidu.com?currentUrl=${encodeURIComponent(skuName)}`).then(data => {
        console.log('fetch success');
        if (currentUrl === 'https://item.jd.com/100014352535.html#crumb-wrap') {
            const skuInfo = {
                type: "skuInfo",
                priceHistory: [
                    { date: '2021/11/11', price: 5000 },
                    { date: '2021/11/12', price: 4000 },
                    { date: '2021/11/13', price: 3000 }],
                otherPlatform: [{ name: 'taobao', price: 4999 }, { name: 'suning', price: 3999 }],
            }
            sendMessageToContentScript(JSON.stringify(skuInfo), () => {
                console.log('send success');
            })
        }
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