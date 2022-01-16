const DEFAULT_ZOOM_FACTORS = [0.1, 0.4, 0.8, 1.5, 2, 3, 3.5, 4];
const generate = document.getElementById("generate");
const screenshots = document.getElementsByClassName("screenshot");
let isClicked = false;

generate.addEventListener("click", () => {
  if (isClicked) return;
  else isClicked = true;
  let index = 0;

  //Zoom factor: 1 = 100%, 0.5 = 50%, 2 = 200%
  const interv = setInterval(() => {
    if (DEFAULT_ZOOM_FACTORS[index] >= 3.5) {
      chrome.tabs.setZoom(1);
      isClicked = false;
      clearInterval(interv);
    } else {
      let img = document.createElement("img");
      chrome.tabs.setZoom(DEFAULT_ZOOM_FACTORS[index]);
      setTimeout(() => {
        chrome.tabs.captureVisibleTab(null, { format: "png" }, (dataUrl) => {
          screenshots[index].children[0].src = dataUrl;
          index++;
        });
      }, 50);
    }
  }, 550);
});
