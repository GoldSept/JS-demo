let oSmall = document.getElementById('small');
let oBig = document.getElementById('big');
let oMark = document.getElementById('mark');
let bImg = oBig.getElementsByTagName('img');

oSmall.addEventListener('mouseover', function () {
  oMark.style.display = 'block';
  oBig.style.display = 'block';
});

oSmall.addEventListener('mouseout', function () {
  oMark.style.display = 'none';
  oBig.style.display = 'none';
});

oSmall.addEventListener('mousemove', function (ev) {
  let e = ev || window.event;
  let l = e.clientX - oSmall.offsetLeft - 100;
  let t = e.clientY - oSmall.offsetTop - 100;
  if (l <= 0) {
    l = 0;
  }
  if (l >= 335) {
    l = 335;
  }
  if (t <= 0) {
    t = 0;
  }
  if (t >= 603) {
    t = 603;
  }

  oMark.style.left = l + 'px';
  oMark.style.top = t + 'px';

  bImg[0].style.left = l * -2 + 'px'; // 实际业务中不要使用魔法数字，要求出具体的比例关系
  bImg[0].style.top = t * -2 + 'px';
});

// 比例关系计算（大图片的最大移动距离 / 黄色盒子的最大移动距离
// (bigImg.offsetWidth - bigBox.offsetWidth) / (smallBox.offsetWidth - oMark.offsetWidth);
// 或者大图片宽度除以小图片宽度，得到倍数关系
// 以下为封装的放大镜业务
/* function magnifyGlass(smallBox, bigBox, mark, smallImg, bigImg) {
  smallBox.addEventListener("mouseenter", function () {
    mark.style.display = "block";
    bigBox.style.display = "block";
  });
  smallBox.addEventListener("mouseleave", function () {
    mark.style.display = "none";
    bigBox.style.display = "none";
  });

  smallBox.addEventListener("mousemove", function (e) {
    let mouX = e.clientX - smallBox.offsetLeft - mark.offsetWidth / 2;
    let mouY = e.clientY - smallBox.offsetTop - mark.offsetHeight / 2;
    let maxX = smallBox.getBoundingClientRect().width - mark.offsetWidth;
    let maxY = smallBox.getBoundingClientRect().height - mark.offsetHeight;
    let multiple = bigImg.offsetWidth / smallImg.offsetWidth;

    if (mouX <= 0) mouX = 0;
    if (mouY <= 0) mouY = 0;
    if (mouX >= maxX) mouX = maxX;
    if (mouY >= maxY) mouY = maxY;

    mark.style.left = mouX + "px";
    mark.style.top = mouY + "px";
    bigImg.style.left = mouX * -multiple + "px";
    bigImg.style.top = mouY * -multiple + "px";
  });
} */
