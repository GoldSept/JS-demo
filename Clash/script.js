const beginBtn = document.getElementById("begin-btn");
const left = document.querySelector(".left");
const right = document.querySelector(".right");
const leftBlock = document.querySelector(".left .block");
const rightBlock = document.querySelector(".right .block");

let flag = true;
function leftMove() {
  if (flag) {
    leftBlock.style.left = 0;
    setTimeout(() => {
      flag = false;
      leftMove();
    }, 1100);
  } else {
    leftBlock.style.left = left.offsetWidth - leftBlock.offsetWidth + "px";
    setTimeout(() => {
      flag = true;
      rightMove();
    }, 1100);
  }
}

let flag2 = true;
function rightMove() {
  if (flag2) {
    rightBlock.style.left = right.offsetWidth - rightBlock.offsetWidth + "px";
    setTimeout(() => {
      flag2 = false;
      rightMove();
    }, 1100);
  } else {
    rightBlock.style.left = 0;
    setTimeout(() => {
      flag2 = true;
      leftMove();
    }, 1100);
  }
}

beginBtn.onclick = () => {
  leftMove();
};
