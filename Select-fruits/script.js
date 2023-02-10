const fruitsLeft = document.querySelector(".fruits-left");
const fruitsRight = document.querySelector(".fruits-right");
const fruitsItem = fruitsLeft.querySelectorAll(".fruits-left > li");
const btnBox = document.querySelector(".button-box");

function move(element, className) {
  if (arguments.length === 2) {
    fruitsItem.forEach(item => {
      if (item.classList.contains("active") && item.parentNode.classList.contains(className)) {
        element.appendChild(item);
        item.classList.toggle("active");
      } else {
        item.classList.remove("active");
      }
    });
  } else {
    fruitsItem.forEach(item => {
      element.appendChild(item);
      item.classList.remove("active");
    });
  }
}

btnBox.addEventListener("click", e => {
  let target = e.target;
  if (target.nodeName.toLowerCase() === "button") {
    switch (target.innerText) {
      case ">>":
        move(fruitsRight);
        break;
      case ">":
        move(fruitsRight, "fruits-left");
        break;
      case "<<":
        move(fruitsLeft);
        break;
      case "<":
        move(fruitsLeft, "fruits-right");
        break;
      default:
        break;
    }
  }
});

fruitsItem.forEach(item => {
  item.onclick = () => {
    item.classList.toggle("active");
  };
});
