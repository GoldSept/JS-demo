const container = document.querySelector("section");
const banWrap = document.querySelector(".banner-wrap");
const banItems = banWrap.querySelectorAll(".banner-item");
const nextBtn = document.querySelector(".next");
const prevBtn = document.querySelector(".prev");
const active = document.querySelector(".active");
const activeItems = active.querySelectorAll(".active-item");
const moveWidth = container.offsetWidth;
const maxValue = banWrap.offsetWidth - moveWidth;

// 鼠标移入定时器关闭
container.addEventListener("mouseover", () => {
  clearInterval(timer);
});
container.addEventListener("mouseout", autoPlay);

// 下一张事件监听
nextBtn.addEventListener("click", () => {
  next();
  let n = Math.abs(banWrap.offsetLeft) / moveWidth;
  activeShow(n);
});
// 上一张事件监听
prevBtn.addEventListener("click", () => {
  prev();
  let n = Math.abs(banWrap.offsetLeft) / moveWidth;
  activeShow(n);
});

// 自动轮播
let timer = null;
function autoPlay() {
  timer = setInterval(() => {
    next();
    let n = Math.abs(banWrap.offsetLeft) / moveWidth;
    activeShow(n);
  }, 1000);
}
autoPlay();

// 下一张
function next() {
  let l = banWrap.offsetLeft;
  if (l <= -maxValue) {
    banWrap.style.left = 0;
    return;
  }
  banWrap.style.left = l - moveWidth + "px";
}

// 上一张
function prev() {
  let l = banWrap.offsetLeft;
  if (l >= 0) {
    banWrap.style.left = -maxValue + "px";
    return;
  }
  banWrap.style.left = l + moveWidth + "px";
}

// 点击切换active位置
active.addEventListener("click", e => {
  let target = e.target;
  if (target.nodeName === "LI") {
    activeShow(target.dataset.index);
    banWrap.style.left = -(target.dataset.index * moveWidth) + "px";
  }
});

// 改变active位置
function activeShow(index) {
  activeItems.forEach(item => {
    item.classList.remove("on");
  });
  activeItems[index].classList.add("on");
}
