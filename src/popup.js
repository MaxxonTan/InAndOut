let changeColor = document.querySelector(".button");
options = [""];

changeColor.addEventListener("click", async () => {
  console.log("CLICK");

  //Zoom factor: 1 = 100%, 0.5 = 50%, 2 = 200%
  zoomFactor = 0.15;
  const interv = setInterval(() => {
    if (zoomFactor >= 3) {
      console.log("DONE");
      chrome.tabs.setZoom(1);
      clearInterval(interv);
    } else {
      let img = document.createElement("img");
      img.height = 150;
      img.width = 200;

      chrome.tabs.setZoom(zoomFactor);
      setTimeout(() => {
        chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
          img.src = dataUrl;
          document.querySelector("body").appendChild(img);
          zoomFactor += 0.5;
        });
      }, 50);
      console.log("HEre");
    }
  }, 550);
});
