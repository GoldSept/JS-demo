const item = document.querySelectorAll(".start-item");
for (let i = 0; i < item.length; i++) {
  item[i].onmouseenter = () => {
    for (let index of item) {
      index.classList.remove("on");
      index.children[0].classList.remove("out");
    }
    for (let j = 0; j <= i; j++) {
      item[j].classList.add("on");
    }
    item[i].children[0].classList.add("out");
  };
}
