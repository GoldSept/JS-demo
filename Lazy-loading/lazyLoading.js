/* 
  当页面图片比较多或已知图片体积比较大的情况下影响到页面加载速度，造成不良的用户体验
  思路：
    只加载浏览器可见区域的图片
    1.指定可视区域，判断图片是否进入可视区
    2.拿到所有图片的dom，遍历每个图片判断当前图片是否在可视区范围内
    3.如果在可视区里就设置图片的src属性，不然显示默认图片或框架
  实现方式：
    1.绑定scroll事件配合节流进行监听
    2.使用intersectionObserver判断图片是否到达可视区域，不过此种方式有浏览器兼容性问题
*/
const List = document.querySelectorAll('li');
const ulBox = document.querySelector('ul');

// 获取一个随机数
function randomNumber(max) {
  return Math.ceil(Math.random() * max);
}

/* 通过scroll实现懒加载 */
/* // 节流
function throttle(fn, delay = 800) {
  let start = 0;
  return function () {
    let end = Date.now();
    if (end - start >= delay) {
      fn.apply(this, arguments);
      start = end;
    }
  };
}

// 懒加载
function lazyLoading() {
  List.forEach(li => {
    const top = li.getBoundingClientRect().top;
    if (top <= ulBox.clientHeight) {
      // 判断是否已经加载过此图片了 - 防止用户回滚页面，重新请求图片
      if (li.children[0].src) return;
      li.children[0].src = `https://picsum.photos/189?random=${randomNumber(1000)}`;
    }
  });
}

ulBox.addEventListener('scroll', throttle(lazyLoading)); */

/* 通过IntersectionObserver实现 */
const obCallback = entries => {
  entries.forEach(entry => {
    // isIntersecting属性判断目标是否进入可视区
    if (entry.isIntersecting) {
      // 判断是否已经加载过此图片了 - 已经加载过的图片关闭观察者窗口
      observer.unobserve(entry.target);
      entry.target.children[0].src = `https://picsum.photos/189?random=${randomNumber(1000)}`;
    }
  });
};

const observer = new IntersectionObserver(obCallback);

// 将所有li标签加入被观察的队列
List.forEach(li => {
  observer.observe(li);
});
