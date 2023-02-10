window.addEventListener('load', init);
let commWrap = null;
let shopWrap = null;
let shopCar = null;
let shopBox = null;
let minusBtn = null;
let addBtn = null;
function init() {
  commWrap = document.querySelector('.com__wrap');
  shopWrap = document.querySelector('.shopping-car');
  shopCar = document.querySelector('.shopping__fence');
  shopBox = document.querySelector('.shop__wrap');
  // TODO
  shopBox.addEventListener('click', e => {
    const target = e.target;
    if (target.nodeName === 'BUTTON') {
      switch (target.classList.item(0)) {
        case 'shop__minus-btn':
          console.log(target);
          break;
        case 'shop__add-btn':
          console.log(target);
          break;
        default:
          break;
      }
    }
  });
  renderLocalData();
  minusBtn = document.querySelector('.shop__minus-btn');
  addBtn = document.querySelector('.shop__add-btn');

  commWrap.addEventListener('dragstart', beginDrag);
  commWrap.addEventListener('dragend', breakDrag);
  shopWrap.addEventListener('dragover', intoDrag);
  shopWrap.addEventListener('drop', overDrag);
  shopCar.addEventListener('dragover', intoDrag);
  shopCar.addEventListener('drop', overDrag);
}

function dataTidy(el) {
  const commData = {};
  Array.from(el.children).forEach(item => {
    /* 获取图片元素类名 */
    if (item.classList.contains('com__comImg')) {
      commData.classImg = item.classList.item(1);
      /* 图片路径切割 */
      /* let url = decodeURI(getComputedStyle(item)["background-image"]);
            commData.img = url.slice(url.search(/(images)/), -2); */
    }
    if (item.classList.contains('com--title')) {
      /* 获取商品链接 */
      commData.link = item.firstElementChild.href;
      /* 获取商品信息 */
      commData.title = item.innerText;
    }
    /* 获取价格 */
    if (item.classList.contains('com__price-info')) commData.price = item.firstElementChild.textContent;
  });
  commData.id = el.dataset.commid;
  return commData;
}

/* 开始拖拽时 */
function beginDrag(e) {
  shopCar.classList.add('arise');
  shopCar.style.backgroundImage = localStorage.getItem('commodityId')
    ? 'url(./images/shopCar_full.svg)'
    : 'url(./images/shopCar.svg)';
  const target = e.target;
  const commData = dataTidy(target);
  e.dataTransfer.setData('commInfo', JSON.stringify(commData));
}

/* 拖拽中断 */
function breakDrag() {
  shopCar.classList.remove('arise');
}

/* 进入目标元素时 */
function intoDrag(e) {
  e.preventDefault();
}

/* 放置拖拉元素时 */
function overDrag(e) {
  const transfer = e.dataTransfer;
  let commInfo = transfer.getData('commInfo');
  commInfo = JSON.parse(commInfo);
  if (getLocalValue(commInfo.id)) {
    renderTag(shopBox, commInfo, 1);
  } else {
    const shopCommAll = shopBox.children;
    // TODO 抽离出来
    Array.from(shopCommAll).forEach(comm => {
      if (comm.getAttribute('index') === commInfo.id) {
        const goodsNum = comm.querySelector('#commodity-number');
        getLocalValue(comm.getAttribute('index'));
        let number = ~~goodsNum.innerText;
        goodsNum.innerText = ++number;
      }
    });
  }
  transfer.clearData('commInfo');
}

/* 查找本地是否有存储 */
function getLocalValue(info) {
  let localValue = localStorage.getItem('commodityId');
  if (localValue) {
    localStorage.commodityId = localValue + ',' + info;
    return localValue.indexOf(info) === -1 ? true : false;
  } else {
    localStorage.setItem('commodityId', info);
    return true;
  }
}

/* 渲染本地存储数据 */
function renderLocalData() {
  let localValue = localStorage.getItem('commodityId');
  if (localValue) {
    let localArr = localValue.split(',');
    let statistical = {};
    localArr.forEach(item => {
      if (statistical[item]) {
        statistical[item]++;
      } else {
        statistical[item] = 1;
      }
    });
    const commList = commWrap.children;
    for (let key in statistical) {
      for (let i = 0; i < commList.length; i++) {
        if (commList[i].getAttribute('data-commid') == key) {
          const commInfo = dataTidy(commList[i]);
          renderTag(shopBox, commInfo, statistical[key]);
        }
      }
    }
  }
  return;
}

/* 渲染标签 */
function renderTag(el, data, number) {
  el.innerHTML += `<li class="shop__list" index=${data.id}>
                    <div class="com__comImg ${data.classImg}"></div>
                    <section class="shop__info-wrap">
                      <h2 class="shop--title">
                        <a href="${data.link}">${data.title}</a>
                      </h2>
                      <div class="com__price-info">
                        <span class="shop--price">${data.price}</span>
                      </div>
                      <div class="shop__number">
                        <button class="shop__minus-btn js-minus-btn">&lt;</button>
                        &times;
                        <span id="commodity-number">
                          ${number}</span>
                        <button class="shop__add-btn js-add-btn">&gt;</button>
                      </div>
                    </section>
                  </li>`;
}
