/*
 * @Author: your name
 * @Date: 2021-11-29 23:34:39
 * @LastEditTime: 2021-11-30 00:52:10
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: /chrome-extension/js/popup.js
 */

// 获取当前选项卡ID
function getCurrentTabId(callback) {
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
        if (callback) callback(tabs.length ? tabs[0].id : null);
    });
}
// 给 content-script 发信息
function sendMessageToContentScript(message, callback) {
    getCurrentTabId((tabId) => {
        chrome.tabs.sendMessage(tabId, message, function (response) {
            if (callback) callback(response);
        });
    });
}
// 发送消息，回调可以获取返回信息
sendMessageToContentScript('getUrl', (response) => {
    document.querySelector('.content').innerHTML = response
    console.log('response:', response);
})