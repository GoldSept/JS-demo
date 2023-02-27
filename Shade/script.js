const mark = document.querySelector('.mark');
const image = document.querySelector('.image-container');
const imageSideX = image.getBoundingClientRect().width;
const imageSideY = image.getBoundingClientRect().height;

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

image.addEventListener('mouseenter', e => {
  timerAll = requestAnimationFrame(updateMarkPosition);
  image.addEventListener('mousemove', function (e) {
    mark.classList.remove('default');
    callee = arguments.callee;
    // 鼠标位置
    const cursorX = e.offsetX;
    const cursorY = e.offsetY;

    // 将鼠标位置作为遮罩的目标位置
    targetX = cursorX;
    targetY = cursorY;
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

image.addEventListener('mouseleave', () => {
  cancelAnimationFrame(timerAll);
  cancelAnimationFrame(timer);
  removeEventListener('mousemove', callee);

  currentX = imageSideX / 2;
  currentY = imageSideY / 2;
  mark.style.left = currentX + 'px';
  mark.style.top = currentY + 'px';
  mark.classList.add('default');
});

// TODO 添加一个遮罩必须走完鼠标移出前最后一个位置的路径再返回中心
