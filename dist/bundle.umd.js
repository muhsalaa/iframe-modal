(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.showFrameModal = factory());
})(this, (function () { 'use strict';

    const IFRAME_ID = 'frame_flip';
    function createIframe(siteUrl) {
        const iframe = document.createElement('iframe');
        iframe.src = siteUrl;
        iframe.setAttribute('style', 'display:block;position:fixed;top:0px;left:0px;width:100%;height:100%;z-index:999999;border:0px;');
        iframe.id = IFRAME_ID;
        return iframe;
    }
    function hideFrame(e) {
        if (e.data === 'hide') {
            const someIframe = window.parent.document.getElementById(IFRAME_ID);
            someIframe.parentNode.removeChild(someIframe);
            window.removeEventListener('messages', hideFrame);
        }
    }
    window.addEventListener('message', hideFrame);
    function showFrameModal(siteUrl) {
        const exist = document.getElementById(IFRAME_ID);
        if (exist)
            return;
        const iframe = createIframe(siteUrl);
        document.body.append(iframe);
    }

    return showFrameModal;

}));
