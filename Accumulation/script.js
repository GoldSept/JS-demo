const btn = document.getElementById("btn-add");
const visiBox = document.getElementById("number");
const scrollBox = document.getElementsByClassName("scroll-num")[0];
let count = parseInt(scrollBox.lastElementChild.textContent) + 1;

function throttle(fn, sec) {
  let start = 0;
  return function () {
    let end = Date.now();
    if (end - start >= sec) {
      start = end;
      fn.apply(this, arguments);
    }
  };
}

function roll() {
  let newNum = document.createElement("div");
  newNum.innerText = count++;
  scrollBox.appendChild(newNum);
  scrollBox.style.top = parseInt(getComputedStyle(scrollBox)["top"]) - visiBox.offsetHeight + "px";
}

btn.addEventListener("click", throttle(roll, 800));
