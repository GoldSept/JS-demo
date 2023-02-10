const box = document.getElementById("container");
const addBtn = document.getElementById("add-btn");
const cloneBtn = document.getElementById("copy-btn");
const delBtn = document.querySelectorAll(".del-btn");
const repBtn = document.querySelectorAll(".replace-btn");

// 请求随机图片并设置随机宽高
function randomImg() {
  let width = Math.round(Math.random() * (650 - 200) + 200);
  let height = Math.round(Math.random() * (650 - 200) + 200);
  let url = Math.round(Math.random() * 2000);
  return [width, height, url];
}

addBtn.onclick = function () {
  let imgBox = document.createElement("figure");
  let [ranWidth, ranHeight, ranUrl] = randomImg();
  let str = `<button class="del-btn">删除图片</button>
                   <button class="replace-btn">替换原图</button><br />
                   <img src="https://picsum.photos/${ranWidth}/${ranHeight}?random=${ranUrl}" alt="" />`;
  imgBox.innerHTML = str;
  box.appendChild(imgBox);
};

cloneBtn.onclick = function () {
  let lastImg = box.lastElementChild.cloneNode(true);
  box.appendChild(lastImg);
};

box.addEventListener("click", e => {
  let target = e.target;
  switch (target.className) {
    case "del-btn":
      box.removeChild(target.parentNode);
      break;
    case "replace-btn":
      let [ranWidth, ranHeight, ranUrl] = randomImg();
      target.nextElementSibling.nextElementSibling.src = `https://picsum.photos/${ranWidth}/${ranHeight}?random=${ranUrl}`;
      break;
    default:
      break;
  }
});
