const IFRAME_ID = 'ccf790a7c9ae82e95838310329b35b5d5dbcc5d2';

function createIframe(siteUrl: string) {
  const iframe: HTMLIFrameElement = document.createElement('iframe');
  iframe.src = siteUrl;
  iframe.setAttribute(
    'style',
    'display:block;position:fixed;top:0px;left:0px;width:100%;height:100%;z-index:999999;border:0px;'
  );
  iframe.id = IFRAME_ID;

  return iframe;
}

function hideFrame(e: MessageEvent) {
  if (e.data === 'hide') {
    const someIframe = window.parent.document.getElementById(IFRAME_ID)!;
    someIframe.parentNode!.removeChild(someIframe);
    window.removeEventListener('message', hideFrame);
  }
}

function showFrameModal(siteUrl: string) {
  const exist = document.getElementById(IFRAME_ID);
  if (exist) return;

  const iframe = createIframe(siteUrl);
  document.body.append(iframe);
  window.addEventListener('message', hideFrame);
}

export default showFrameModal;
