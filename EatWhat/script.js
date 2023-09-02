// 引入拼音
const { pinyin } = pinyinPro;
const getPinyin = Chinese => pinyin(Chinese, { toneType: 'none' }).replaceAll(' ', '');

// dom元素
const container = document.querySelector('.foods-container'),
  textWrap = container.querySelector('.textWrap');

// 吃啥列表
const lunch = ['兰州拉面', '里手混沌', '味全', '螺蛳粉', '大饼粥铺', '常德津市牛肉粉', '沙县小吃'];
const dinner = ['烧腊饭', '卤肉饭', '黄焖鸡', '螺蛳粉', '意面', '猪脚饭'];
// 获取当前时间
const haveEatingTime = new Date().getHours();
const menu = foosList => foosList.map(food => ({ id: getPinyin(food), food }));
const storeFoods = menu(haveEatingTime > 14 ? dinner : lunch);

// 当前食物名称
let currFood = void 0;
// 食物下标
let randomNum = void 0;
// 设置cookie的默认过期时间
const EXPIRES_DAY = 2;
// 闭包环境
const carousel = randomScroll();

// 设置cookie的有效时限
function timeDelay(delay) {
  // 获取当前时间
  const date = new Date();
  date.setTime(date.getTime() + delay * 24 * 3600 * 1000);
  return date.toGMTString();
}

// 设置cookie
function setCookie(key, value, delay = EXPIRES_DAY) {
  document.cookie = `${key}=${value};expires=${timeDelay(delay)}`;
}

// 判断这两天是否吃过当前选中的食物
function judgeAte(foodsList) {
  const arr = foodsList.split('; ').map(item => item.split('='));
  return arr.find(food => food[1] === currFood);
}

// 决定框
function dialog(text) {
  const decision = window.confirm(text);
  if (!decision) {
    carousel();
    return;
  }
  setCookie(storeFoods[randomNum].id, currFood);
}

// 清除字幕滚动
function stopScroll(id) {
  cancelAnimationFrame(id);
}

// 监听事件
function randomScroll() {
  // 滚动动画器
  let scrollId = void 0;
  const MAX = storeFoods.length;
  // 字幕滚动开关控制
  let controller = false;
  return function () {
    if (controller) {
      stopScroll(scrollId);
      foodStore().then(dialog).catch(dialog);
      return (controller = false);
    }
    controller = !controller;
    ~(function scroll() {
      scrollId = requestAnimationFrame(scroll);
      randomNum = Math.floor(Math.random() * MAX);
      currFood = storeFoods[randomNum].food;
      textWrap.innerText = currFood;
    })();
  };
}

// 查看近两天是否吃过
function foodStore() {
  // 获取本地cookie
  const historyFoods = document.cookie;
  return new Promise((resolve, reject) => {
    if (!historyFoods) return reject('决定吃这个嘛？');
    // 返回结果确定这两天中是否已经吃过
    const result = judgeAte(historyFoods);
    return result ? resolve('最近已经吃过了噢，还要吃这个吗？') : reject('决定吃这个嘛？');
  });
}

// 文字滚动监听
container.addEventListener('click', carousel);
