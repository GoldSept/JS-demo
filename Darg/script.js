// 获取div节点
var odiv = document.querySelector('div');

odiv.onmousedown = function (ev) {
  var e = ev || window.event;
  // 获取鼠标在div上的位置（鼠标至屏幕距离 — div到屏幕距离）
  var offsetX = e.clientX - odiv.offsetLeft;
  var offsetY = e.clientY - odiv.offsetTop;

  document.onmousemove = function (ev) {
    var e = ev || window.event;
    // 获取div移动的新距离 （鼠标至屏幕距离 — 鼠标至div边框距离）
    var l = e.clientX - offsetX;
    var t = e.clientY - offsetY;
    // 限制出界
    if (l <= 0) {
      l = 0;
    }
    var windowWidth = document.documentElement.clientWidth || document.body.clientWidth;
    // 浏览器宽度 — div宽度
    if (l >= windowWidth - odiv.offsetWidth) {
      l = windowWidth - odiv.offsetWidth;
    }
    if (t <= 0) {
      t = 0;
    }
    var windowHeight = document.documentElement.clientHeight || document.body.clientHieght;
    // 浏览器高度 — div高度
    if (t >= windowHeight - odiv.offsetHeight) {
      t = windowHieght - odiv.offsetHeight;
    }
    odiv.style.left = l + 'px';
    odiv.style.top = t + 'px';
  };
};

// 鼠标松开取消拖拽事件
document.onmouseup = function () {
  document.onmousemove = null;
};
