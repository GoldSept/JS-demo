const boxContainer = document.querySelector(".box-container");
const boxItem = document.querySelectorAll(".box-item");
const images = document.querySelectorAll(".box-img");
const half = images.length / 2;

let imgPath = [];
for (let i = 0; i < half; i++) {
  let randomImg = Math.floor(Math.random() * 19);
  if (imgPath.indexOf(randomImg) === -1) {
    images[i].src = `images/${randomImg}.png`;
    imgPath.push(randomImg);
    continue;
  }
  i--;
}

for (let i = half; i < images.length; i++) {
  let randomIndex = Math.floor(Math.random() * imgPath.length);
  images[i].src = `images/${imgPath[randomIndex]}.png`;
  imgPath.splice(randomIndex, 1);
}

let imgArr = [];
boxContainer.addEventListener("mousedown", e => {
  let target = e.target;
  if (target.nodeName === "LI") {
    let img = target.children[0];
    target.classList.add("visible");
    img.classList.add("index");
    imgArr.push(img.src);
  }
  if (imgArr.length === 2) {
    boxContainer.style.pointerEvents = "none";
    setTimeout(() => {
      if (imgArr[0] === imgArr[1]) {
        images.forEach(item => {
          if (item.classList.contains("index")) {
            let div = document.createElement("div");
            boxContainer.replaceChild(div, item.parentNode);
          }
        });
      } else {
        boxItem.forEach((item, index) => {
          if (item.classList.contains("visible")) {
            item.classList.toggle("visible");
            images[index].classList.toggle("index");
          }
        });
      }
      imgArr = [];
      boxContainer.style.pointerEvents = "auto";
    }, 1000);
  }
});
