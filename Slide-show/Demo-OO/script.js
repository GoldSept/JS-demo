function Banner(dom, autoplay) {
  // 初始化
  this.translateX = 0;
  this.rollDistance = -16.67;
  this.num = 0;
  this.autoplay = autoplay;
  this.timer = null;
  // 获取banner元素
  this.domContainer = document.querySelector(`.${dom}`);
  this.domBannerBox = document.querySelector(`.${dom} > .banner-box`);
  this.domActives = document.querySelectorAll(`.${dom} .active__item`);
  this.domNextBtn = document.querySelector(`.${dom} > .next-btn`);
  this.domPrevBtn = document.querySelector(`.${dom} > .prev-btn`);
  this.init();
}

Banner.prototype.init = function () {
  this.domBannerBox.style.cssText = `transform: translateX(${this.translateX}%);`;
  this.domActives.forEach((item, index) => {
    item.onclick = () => {
      for (let item of this.domActives) {
        item.classList.remove("active");
      }
      item.classList.add("active");
      this.num = index;
      this.domBannerBox.style.transform = `translateX(${this.rollDistance * this.num}%)`;
    };
  });
  this.domActives[this.num].classList.add("active");
  this.domContainer.addEventListener("mouseenter", () => {
    clearInterval(this.timer);
  });
  this.domContainer.addEventListener("mouseleave", () => {
    this.carousel();
  });
  this.domNextBtn.addEventListener("click", this.banMove.bind(this, false));
  this.domPrevBtn.addEventListener("click", this.banMove.bind(this, true));

  if (this.autoplay) {
    this.carousel();
  }
};

Banner.prototype.carousel = function () {
  this.timer = setInterval(this.banMove.bind(this, false), 2000);
};

Banner.prototype.banMove = function (isPrev) {
  this.translateX = isPrev ? this.rollDistance * --this.num : this.rollDistance * ++this.num;
  this.domBannerBox.style.transform = `translateX(${this.translateX}%)`;
  if (this.num >= 5) {
    this.domBannerBox.style.transform = `translateX(0)`;
    this.num = 0;
  }
  if (this.num < 0) {
    this.num = 4;
    this.domBannerBox.style.transform = `translateX(${this.rollDistance * this.num}%)`;
  }
  this.domActives.forEach(item => {
    item.classList.remove("active");
  });
  this.domActives[this.num].classList.add("active");
};

const ban = new Banner("banner-container", true);
