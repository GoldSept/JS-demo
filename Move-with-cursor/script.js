let oDiv = document.getElementsByTagName('div');

// 随机颜色
function colorRandom() {
  var randomC =
    'rgba(' +
    parseInt(Math.random() * (256 - 210) + 210) +
    ', ' +
    parseInt(Math.random() * 200) +
    ', ' +
    parseInt(Math.random() * 200) +
    ', 1)';
  return randomC;
}

// 动态跟踪上一个节点的位置
document.onmousemove = ev => {
  let e = ev || window.event;
  for (let i = oDiv.length - 1; i > 0; i--) {
    oDiv[i].style.left = oDiv[i - 1].getBoundingClientRect().left + 'px';
    oDiv[i].style.top = oDiv[i - 1].getBoundingClientRect().top + 'px';
    oDiv[i].style.backgroundColor = colorRandom();
    setTimeout(function () {
      oDiv[i].style.top = e.clientY + 'px';
      oDiv[i].style.left = e.clientX + 'px';
    }, 100);
  }
  oDiv[0].style.top = e.clientY + 'px';
  oDiv[0].style.left = e.clientX + 'px';
};
