(function () {
  let callee = void 0;
  document.addEventListener('mousedown', e => {
    // 创建矩形
    const rect = createRectInBody();
    let mousedownX = e.clientX;
    let mousedownY = e.clientY;
    ensureInitialPosition(rect, mousedownX, mousedownY);
    document.addEventListener('mousemove', function (e) {
      // 将callee赋值当前函数
      callee = arguments.callee;
      rect.style.transform = `scale(${e.clientX - mousedownX}, ${e.clientY - mousedownY})`;
    });
  });
  document.addEventListener('mouseup', () => {
    document.removeEventListener('mousemove', callee);
  });

  // 创建矩形并注入body页面中
  function createRectInBody() {
    const rect = document.createElement('div');
    rect.classList.add('rect');
    document.body.appendChild(rect);
    return rect;
  }

  // 确定元素起始位置
  function ensureInitialPosition(element, x, y) {
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  }
})();
