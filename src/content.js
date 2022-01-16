fetch(chrome.runtime.getURL("/popup.html"))
  .then((res) => res.text())
  .then(async (html) => {
    // Check if already exist, if so, remove hide-container class
    const container = document.getElementsByClassName("ino-container");
    if (container && container.length > 0) {
      container[0].classList.remove("hide-container");
    } else {
      document.body.insertAdjacentHTML("afterend", html);
    }

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

    const hideButton = document.getElementById("hide");
    hideButton.addEventListener("click", () => {
      container[0].classList.add("hide-container");
    });

    const generate = document.getElementById("generate");
    const screenshots = document.getElementsByClassName("screenshot");
    console.log(screenshots);
    //Send message to background.js
    chrome.runtime.sendMessage(
      { action: "screenshot", zoom: [0.1] },
      (response) => {
        console.log(response);
      }
    );
  });
