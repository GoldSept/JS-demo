const add = document.getElementById("add");
const minus = document.getElementById("minus");
const ride = document.getElementById("ride");
const divde = document.getElementById("divde");
const res = document.getElementById("res");

let numInp1 = document.getElementById("num1");
let numInp2 = document.getElementById("num2");
let numLab1 = document.querySelector('label[for="num1"]');
let numLab2 = document.querySelector('label[for="num2"]');

numInp1.onclick = function () {
  numLab1.style.cssText = "transform-origin: left top; transform: scale(.8); top:-5px; color: #ee4866;";
};
numInp2.onclick = function () {
  numLab2.style.cssText = "transform-origin: left top; transform: scale(.8); top:35px; color: #ee4866;";
};

numInp1.onblur = function () {
  if (!numInp1.value) {
    numLab1.style.cssText = "transform: scale(1); top: 10px; color: #000;";
  }
};

numInp2.onblur = function () {
  if (!numInp2.value) {
    numLab2.style.cssText = "transform: scale(1); top: 45px; color: #000;";
  }
};

// 清除所有的输入框的数据
function reset(num1, num2, data3) {
  num1.value = "";
  num2.value = "";
  data3.value = "";
}

// 获取最外层进行事件委托
const wrap = document.getElementsByClassName("calculator")[0];
wrap.addEventListener("click", ev => {
  let e = ev || window.event;
  let target = e.target;

  if (target.nodeName.toLowerCase() === "button") {
    // 获取用户输入的值
    const num1 = document.getElementById("num1");
    const num2 = document.getElementById("num2");
    let n1 = Number(num1.value);
    let n2 = Number(num2.value);
    if (n1 && n2) {
      reset(num1, num2, res);
      switch (target.id) {
        case "add":
          res.value = n1 + n2;
          break;
        case "minus":
          res.value = n1 - n2;
          break;
        case "ride":
          res.value = n1 * n2;
          break;
        case "divde":
          res.value = n1 % n2 === 0 ? n1 / n2 : (n1 / n2).toFixed(2);
          break;
        default:
          break;
      }
    } else {
      let bigTextWrap = document.createElement("div");
      let bigText = document.createTextNode("计算过程请勿儿戏！");
      bigTextWrap.appendChild(bigText);
      bigTextWrap.className = "tips";
      document.body.appendChild(bigTextWrap);
      setTimeout(function () {
        document.body.removeChild(bigTextWrap);
      }, 2000);
      reset(num1, num2, res);
    }
  }
});
