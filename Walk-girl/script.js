function Girl(direction, width, height, url) {
  this.directionObj = {
    front: { go: 0, back: 2.7 },
    right: { go: 1.8, back: 0.9 },
    'right-front': { go: 4.5, back: 3.6 },
    'right-back': { go: 6.2, back: 5.3 },
  };
  this.width = width;
  this.height = height;
  this.url = url;
  this.stopMove = false;
  this.speed = 5;
  this.positionX = 0;
  this.positionY = -this.directionObj[direction].go * this.height;
  // 初始化girl
  this.dom = this.init();
  this.dom.onclick = () => {
    this.stopMove = !this.stopMove;
    this.move(direction);
  };
  this.move(direction);
}

// 初始化
Girl.prototype.init = function () {
  this.girl = document.createElement('div');
  this.girl.style.cssText = `width: ${this.width}px;
                             height: ${this.height}px;
                             background: url(${this.url}) no-repeat;
                             background-position: ${this.positionX}px ${this.positionY}px;`;
  document.body.appendChild(this.girl);
  return this.girl;
};

// 移动
Girl.prototype.move = function (direction) {
  let timer = setInterval(() => {
    if (this.stopMove) {
      clearInterval(timer);
    }
    // 判断是否为最后一个步长
    this.positionX = this.positionX - this.width <= -this.width * 7 ? 0 : this.positionX - this.width;
    if (direction !== 'front') {
      let l = this.dom.offsetLeft; // 获取girl移动的位置
      let maxDistance = window.innerWidth - this.dom.offsetWidth; // 获取最大移动距离
      if (l >= maxDistance) {
        this.positionY = -this.directionObj[direction].back * this.height;
        this.speed *= -1;
      }
      if (l < 0) {
        this.positionY = -this.directionObj[direction].go * this.height;
        this.speed *= -1;
      }
      this.dom.style.left = l + this.speed + 'px';
    }
    this.dom.style.backgroundPosition = `${this.positionX}px ${this.positionY}px`;
  }, 60);
};

let girl1 = new Girl('front', 82, 120, './xnh.png');
const btn = document.querySelector('.btn');
const arr = ['right-front', 'right', 'front'];
btn.addEventListener('click', e => {
  const index = parseInt(Math.random() * arr.length);
  new Girl(arr[index], 82, 120, './xnh.png');
});
