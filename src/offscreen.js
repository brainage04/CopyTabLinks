// Offscreen documents are never focused, so navigator.clipboard is unavailable here;
// execCommand("copy") is the supported way to write the clipboard from one.
const textarea = document.getElementById("clipboard");

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message?.target !== "offscreen" || message.type !== "copy") return;

  textarea.value = message.text;
  textarea.select();
  const ok = document.execCommand("copy");
  textarea.value = "";
  sendResponse({ ok });
});
