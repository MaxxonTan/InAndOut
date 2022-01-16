fetch(chrome.runtime.getURL("/popup.html"))
  .then((res) => res.text())
  .then(async (html) => {
    // Check if container already exist, if so, remove hide-container class
    let container = document.getElementById("ino-container");
    if (container) {
      container.classList.remove("hide-container");
    } else {
      // Initialize
      document.body.insertAdjacentHTML("afterend", html);
      container = document.getElementById("ino-container");

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
      const header = document.querySelector(".ino-container > header");

      header.addEventListener("drag", (event) => {
        if (event.pageX == 0 || event.pageY == 0) return;

        container.style.top = `${Math.min(
          window.innerHeight - container.clientHeight,
          Math.max(event.pageY, 0)
        )}px`;
        container.style.left = `${Math.min(
          window.innerWidth - container.clientWidth,
          Math.max(0, event.pageX - container.clientWidth / 2)
        )}px`;
      });

      header.addEventListener("dragend", (event) => {
        container.style.top = `${Math.min(
          window.innerHeight - container.clientHeight,
          Math.max(event.pageY, 0)
        )}px`;
        container.style.left = `${Math.min(
          window.innerWidth - container.clientWidth,
          Math.max(0, event.pageX - container.clientWidth / 2)
        )}px`;
      });
    }
    const screenshots = document.getElementsByClassName("screenshot");
    console.log(screenshots);
    //Send message to background.js
    chrome.runtime.sendMessage(
      { action: "screenshot", zoom: [0.1] },
      (response) => {
        console.log(response);
      }
    );
    const generate = document.getElementById("generate");
  });
