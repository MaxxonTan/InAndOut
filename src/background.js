chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["content.js"],
  });

  chrome.scripting.insertCSS({
    files: ["popup.css"],
    target: { tabId: tab.id },
  });
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  let resultImages = [];
  request.zoom.forEach((element) => {
    chrome.tabs.setZoom(element);
  });

  sendResponse({ trash: "you're trash" });
});
