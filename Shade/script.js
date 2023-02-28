const mark = document.querySelector('.mark');
const imageBox = document.querySelector('.image-container');
const markCenter = mark.getBoundingClientRect().width / 2;

const imageBoxWidth = imageBox.offsetWidth;
const imageBoxHeight = imageBox.offsetHeight;
// 定义匿名函数存储器
let callee = void 0;
// 定义遮罩目标位置和当前位置
let currentX = 0;
let currentY = 0;
let targetX = 0;
let targetY = 0;
// 定义时间戳
let timer = null;
let timerAll = null;

imageBox.addEventListener('mouseenter', e => {
  timerAll = requestAnimationFrame(updateMarkPosition);
  mark.style.opacity = 1;
  imageBox.addEventListener('mousemove', function (e) {
    mark.classList.remove('defocus');
    callee = arguments.callee;
    // 鼠标位置
    const cursorX = e.offsetX;
    const cursorY = e.offsetY;

    // 将鼠标位置作为遮罩的目标位置
    targetX = cursorX - markCenter;
    targetY = cursorY - markCenter;
    throttle(createWave, 1500)();
  });
});

// 运动算法
function easeOutQuad(time, begin, distance, duration) {
  time /= duration;
  return -distance * time * (time - 2) + begin;
}

function updateMarkPosition() {
  // 运动幅度
  currentX = easeOutQuad(1, currentX, targetX - currentX, 22);
  currentY = easeOutQuad(1, currentY, targetY - currentY, 22);

  mark.style.left = currentX + 'px';
  mark.style.top = currentY + 'px';

  timer = requestAnimationFrame(updateMarkPosition);
}

// 节流
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

function createWave() {
  const waveX = targetX;
  const waveY = targetY;
  const offsetX = imageBoxWidth - 300;
  const offsetY = imageBoxHeight - 300;
  const waveBox = document.createElement('section');
  waveBox.className = 'wave-container';
  waveBox.style.cssText = `left: ${waveX + 150}px;top: ${waveY + 150}px;`;
  let ripple = `
      <div class="wave wave5" style="z-index: 0; background-position: ${(waveX / offsetX) * 100}% ${
    (waveY / offsetY) * 100
  }%"></div>
      <div class="wave wave4" style="z-index: 1; background-position: ${(waveX / offsetX) * 100}% ${
    (waveY / offsetY) * 100
  }%"></div>
      <div class="wave wave3" style="z-index: 2; background-position: ${(waveX / offsetX) * 100}% ${
    (waveY / offsetY) * 100
  }%"></div>
      <div class="wave wave2" style="z-index: 3; background-position: ${(waveX / offsetX) * 100}% ${
    (waveY / offsetY) * 100
  }%"></div>
      <div class="wave wave1" style="z-index: 4; background-position: ${(waveX / offsetX) * 100}% ${
    (waveY / offsetY) * 100
  }%"></div>
      <div class="wave wave0" style="z-index: 5; background-position: ${(waveX / offsetX) * 100}% ${
    (waveY / offsetY) * 100
  }%"></div>`;

  waveBox.innerHTML = ripple;
  imageBox.appendChild(waveBox);
  setTimeout(() => {
    imageBox.removeChild(waveBox);
  }, 1500);
}

// 鼠标离开事件
imageBox.addEventListener('mouseleave', () => {
  cancelAnimationFrame(timerAll);
  cancelAnimationFrame(timer);
  removeEventListener('mousemove', callee);

  mark.style.left = currentX + 'px';
  mark.style.top = currentY + 'px';
  mark.style.opacity = 0;
  mark.classList.add('defocus');
});

// TODO 添加一个遮罩必须走完鼠标移出前最后一个位置的路径再返回中心, 涟漪效果优化，波纹制造不规则感
