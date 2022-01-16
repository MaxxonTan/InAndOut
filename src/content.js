fetch(chrome.runtime.getURL("/popup.html"))
  .then((res) => res.text())
  .then((html) => {
    document.body.insertAdjacentHTML("afterend", html);
  });
