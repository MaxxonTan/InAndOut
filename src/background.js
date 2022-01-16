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
