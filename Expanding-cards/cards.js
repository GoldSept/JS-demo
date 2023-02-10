let box = document.getElementById("box");
let img = box.querySelectorAll(".picture");

box.addEventListener('click', ev => {
  let e = ev || window.event;
  let target = e.target || window.event.srcElement;
  if (target.nodeName.toLowerCase() == 'div') {
    removeClass();
    target.classList.add("active");
  }
});

function removeClass() {
  img.forEach(item => {
    item.classList.remove("active");
  })
}