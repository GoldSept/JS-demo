const mark = document.querySelector('.mark');
const imageBox = document.querySelector('.image-container');
const markCenter = mark.getBoundingClientRect().width / 2;

// 获取图片盒子的宽高度
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

// 运动算法
function easeOutQuad(time, begin, distance, duration) {
  time /= duration;
  return -distance * time * (time - 2) + begin;
}

function updateMarkPosition() {
  // 运动幅度
  currentX = easeOutQuad(1, currentX, targetX - currentX, 22);
  currentY = easeOutQuad(1, currentY, targetY - currentY, 22);

  // 赋值一帧的运动幅度
  mark.style.left = currentX + 'px';
  mark.style.top = currentY + 'px';

  // 动画回调
  timer = requestAnimationFrame(updateMarkPosition);
}

function createWave() {
  // 鼠标当前位置锁定
  const waveX = targetX;
  const waveY = targetY;
  // 偏移量
  const offsetX = imageBoxWidth - 300;
  const offsetY = imageBoxHeight - 300;
  // 创建包裹涟漪的盒子
  const waveBox = document.createElement('section');
  waveBox.className = 'wave-container';
  waveBox.style.cssText = `left: ${waveX + 150}px;top: ${waveY + 150}px;`;
  // 涟漪波纹 - 6个Div
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
    // 删除涟漪节点，释放内存
    imageBox.removeChild(waveBox);
  }, 1500);
}

// 鼠标进入事件监听
imageBox.addEventListener('mouseenter', () => {
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
    // 涟漪绘制
    createWave();
  });
});

// 鼠标离开事件
imageBox.addEventListener('mouseleave', () => {
  // 清除回调动画
  cancelAnimationFrame(timerAll);
  cancelAnimationFrame(timer);
  // 清除鼠标移动事件
  removeEventListener('mousemove', callee);

  mark.style.opacity = 0;
  mark.classList.add('defocus');
});

// TODO 添加一个遮罩必须走完鼠标移出前最后一个位置的路径再返回中心, 涟漪效果优化，波纹制造不规则感
