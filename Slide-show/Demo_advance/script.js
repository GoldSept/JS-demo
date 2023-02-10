const banWrap = document.querySelector(".banner-wrap"); // 最外遮罩层
const next = document.querySelector(".js-next"); // 右箭头
const prev = document.querySelector(".js-prev"); // 左箭头
const active = document.querySelector(".active"); // 分页栏盒子
const banBox = document.querySelector(".js-ban-list-box"); // 图片盒子
let banImg = banBox.querySelectorAll("img"); // 图片集合
let cirs = document.querySelectorAll(".circle"); // 分页按钮
const slideWidth = banImg[0].offsetWidth; // 单张图片宽度

// 左右切换控件点击事件
next.addEventListener("click", throttle(moveNext));
prev.addEventListener("click", throttle(movePrev));

// 分页栏
active.addEventListener("click", activeCut);

// next
function moveNext() {
  if (Math.abs(banBox.offsetLeft) >= slideWidth * (banImg.length - 1) - 50) banBox.style.left = 0;
  let overNext = Math.abs(banBox.offsetLeft) + slideWidth,
    sumStep = 0,
    sport = 8;
  return ~(function next(nexId = null) {
    nexId = requestAnimationFrame(next);
    let step = Math.ceil((overNext - Math.abs(banBox.offsetLeft)) / sport);
    banBox.style.left = banBox.offsetLeft - step + "px";
    sumStep += step;
    if (sumStep >= slideWidth) {
      cancelAnimationFrame(nexId);
      cirPo();
    }
  })();
}

// prev
function movePrev() {
  if (Number(banBox.offsetLeft) === 0) banBox.style.left = -(slideWidth * (banImg.length - 1)) + "px";
  let overPrev = banBox.offsetLeft + slideWidth,
    sumStep = 0,
    sport = 8;
  return ~(function prev(preId = null) {
    preId = requestAnimationFrame(prev);
    let step = Math.ceil((overPrev - banBox.offsetLeft) / sport);
    banBox.style.left = banBox.offsetLeft + step + "px";
    sumStep += step;
    if (sumStep >= slideWidth) {
      cancelAnimationFrame(preId);
      cirPo();
    }
  })();
}

function activeCut(ev) {
  let e = ev || window.event;
  let target = e.target || e.scrElement;
  if (target.nodeName.toLowerCase() === "div") {
    if (!(Number(target.dataset.index) * slideWidth === Math.abs(banBox.offsetLeft))) {
      cirs.forEach(item => {
        item.classList.remove("circle--on");
      });
      target.classList.add("circle--on");
      skipSlide(target.dataset.index);
    }
  }
}

// 分页样式改变
function cirPo() {
  let itemsIndex = parseInt(Math.abs(banBox.offsetLeft) / slideWidth) === 5 ? 0 : parseInt(Math.abs(banBox.offsetLeft) / slideWidth);
  console.log(banBox.offsetLeft, itemsIndex);
  cirs.forEach(item => {
    item.classList.remove("circle--on");
  });
  cirs[itemsIndex].classList.add("circle--on");
}

// 分组栏点击跳转
function skipSlide(n) {
  const overValue = n * slideWidth;
  let skiSport = 5;
  /* let sumStep = 0;
  // BUG skipStep值有问题
  return ~(function skip(skiId = null) {
    skiId = requestAnimationFrame(skip);
    let beginValue = banBox.offsetLeft;
    if (overValue < beginValue) {
      var skipStep = Math.ceil((Math.abs(beginValue) - overValue) / skiSport);
    } else {
      var skipStep = Math.ceil((overValue - Math.abs(beginValue)) / skiSport);
    }
    banBox.style.left = banBox.offsetLeft - skipStep + "px";
    sumStep += skipStep;
    if (sumStep >= overValue) {
      cancelAnimationFrame(skiId);
    }
  })(); */
  return (function skip(skiId = null) {
    skiId = requestAnimationFrame(skip);
    if (banBox.offsetLeft <= -overValue) {
      cancelAnimationFrame(skiId);
    }
    banBox.style.left = banBox.offsetLeft - skiSport + "px";
    skiSport *= 2;
  })();
}

// 节流
function throttle(fn) {
  let start = 0;
  return function () {
    let end = Date.now();
    if (end - start >= 850) {
      start = end;
      fn.apply(this, arguments);
    }
  };
}

// 轮播图自动播放（游标移入暂停，移出继续)
function autoRotate() {
  let carouselTimer = null;
  return ~(function () {
    function timeStart() {
      carouselTimer = setInterval(() => {
        moveNext();
      }, 2000);

      banWrap.addEventListener("mouseenter", () => {
        clearInterval(carouselTimer);
      });
      /*
      // TODO carouselTimer无法关闭 id为2
      document.addEventListener("visibilitychange", function () {
            if (!document.hidden) {
              autoRotate();
              console.log("active");
            } else {
              clearInterval(carouselTimer);
              carouselTimer = null;
              console.log("hidden");
            }
          });
      */
    }
    banWrap.addEventListener("mouseleave", () => {
      timeStart();
    });
    timeStart();
  })();
}

autoRotate();
