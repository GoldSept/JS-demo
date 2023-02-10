var box = document.getElementById("box");
var filler = document.getElementById("filler");
var slide = document.getElementById("slide");

// 判断是否有浏览器保存的键
var l = localStorage.getItem("fillerLocation") ? localStorage.fillerLocation : 0;
slide.style.left = l + "px";
filler.style.width = l + "px";

// 取消拖拽时[不可放置]箭头的默认事件
window.addEventListener("dragstart", function (ev) {
  var e = ev || window.event;
  e.preventDefault();
});

// 拖拽三件套
slide.onmousedown = function (ev) {
  var e = ev || window.event;
  var slideLeft = e.clientX - slide.offsetLeft;

  document.onmousemove = function (ev) {
    var e = ev || window.event;
    var l = e.clientX - slideLeft;
    if (l <= 0) {
      l = 0;
    }
    if (l >= 660) {
      l = 660;
    }
    slide.style.left = l + "px";
    // 填充模块filler随滑块slide位置改变宽度吗，实现跟随状态
    filler.style.width = l + "px";

    // 在浏览器存储滑块和填充的位置
    if (!window.localStorage) {
      alert("不支持localStorage");
    } else {
      localStorage.setItem("fillerLocation", l);
    }
  };
};
document.onmouseup = function () {
  document.onmousemove = null;
};
