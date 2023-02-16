(function () {
  const buttonBox = document.querySelector('.js-button__container');
  let defaultShape = 'rect';
  const shapeGather = [];

  document.addEventListener('mousedown', e => {
    shapeGather.push(new CustomShape(defaultShape));
    handleMouseDown(e, shapeGather.at(-1).shapeElement);
  });
  document.addEventListener('mouseup', () => (document.onmousemove = null));

  // 自定义形状类
  class CustomShape {
    constructor(shape = '') {
      this.shape = shape;
      this.shapeElement = this.createRectInBody();
    }
    createRectInBody() {
      const element = document.createElement('div');
      element.classList.add('basic', this.shape);
      return element;
    }
  }

  // 鼠标按下事件
  function handleMouseDown(e, shape) {
    // 获取鼠标初始位置
    let mousedownX = e.clientX;
    let mousedownY = e.clientY;
    // 赋值元素初始位置
    ensureInitialPosition(shape, mousedownX, mousedownY);
    document.onmousemove = e => {
      document.body.appendChild(shape);
      shape.style.transform = `scale(${e.clientX - mousedownX}, ${e.clientY - mousedownY})`;
    };
  }

  // 确定元素起始位置
  function ensureInitialPosition(element, x, y) {
    element.style.left = `${x}px`;
    element.style.top = `${y}px`;
  }

  buttonBox.addEventListener('click', e => {
    const target = e.target;
    console.log(target.nodeName);
    if (target.nodeName.toLowerCase() === 'button') {
      const type = target.dataset['type'];
      defaultShape = type;
    }
  });
})();
