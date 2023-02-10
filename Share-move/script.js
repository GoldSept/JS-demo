let shareText = document.getElementById("shareBox__text");
let shareList = document.getElementById("shareBox__list");
let shareBox = document.getElementById("shareBox");

let speed = 5;
let timer = null;
shareText.addEventListener("mouseenter", shareMove);
shareBox.addEventListener("mouseleave", shareOut);

function shareMove() {
  clearInterval(timer);
  timer = setInterval(function () {
    if (shareList.offsetLeft >= 0) {
      clearInterval(timer);
    } else {
      shareList.style.left = shareList.offsetLeft + speed + "px";
      shareText.style.left = shareText.offsetLeft + speed + "px";
    }
  }, 1000 / 60);
}

function shareOut() {
  clearInterval(timer);
  timer = setInterval(function () {
    if (shareText.offsetLeft <= 0) {
      clearInterval(timer);
    } else {
      shareList.style.left = shareList.offsetLeft - speed + "px";
      shareText.style.left = shareText.offsetLeft - speed + "px";
    }
  }, 1000 / 60);
}
