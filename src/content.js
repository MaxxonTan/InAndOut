fetch(chrome.runtime.getURL("/popup.html"))
  .then((res) => res.text())
  .then(async (html) => {
    document.body.insertAdjacentHTML("afterend", html);

    const fontStyle = document.createElement("style");
    fontStyle.textContent = `@font-face { 
            font-family: kghappy; 
            src: url("${chrome.runtime.getURL(
              "/fonts/kghappy.ttf"
            )}") format("truetype");

        }`;
    document.head.appendChild(fontStyle);

    const headerImg = document.getElementById("ino-logo");
    headerImg.src = chrome.runtime.getURL("/images/logo.png");

    const minimizeImg = document.querySelector("#hide > img");
    minimizeImg.src = chrome.runtime.getURL("/images/x.png");
  });
