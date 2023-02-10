// 存储p节点的颜色以及内容
let arrP = [];
let arrPColor = [];
let arrPBgcolor = [];

// 获取本地存储的值
var localP = localStorage.getItem("pItem") ? localStorage.pItem : null;
var localPColor = localStorage.getItem("pColorItem") ? localStorage.pColorItem : null;
var localPBgcolor = localStorage.getItem("pBgcolorItem") ? localStorage.pBgcolorItem : null;
// 判断是否有键和值
let count = 0;
if (localP) {
  var arrLocalP = localP.split(",");
  var arrLocalPColor = localPColor.split(",");
  var arrLocalBg = localPBgcolor.split("");
  let colorNum = [];
  for (let i = 0; i < arrLocalBg.length; i++) {
    if (Number(arrLocalBg[i]) || /\,/.test(arrLocalBg[i]) || arrLocalBg[i] == 0 || /\./.test(arrLocalBg[i])) {
      colorNum.push(arrLocalBg[i]);
    }
  }
  colorNum = colorNum.join("");
  colorNum = colorNum.split(",");
  for (let j = 0; j < arrLocalP.length; j++) {
    let reOldP = document.createElement("p");
    reOldP.innerText = arrLocalP[j];
    reOldP.setAttribute("class", "guestbook__message");
    reOldP.style.color = `${arrLocalPColor[j]}`;
    reOldP.style.background = `rgba(${colorNum[count]},${colorNum[count + 1]},${colorNum[count + 2]},${colorNum[count + 3]})`;
    $("guestbook").appendChild(reOldP);
    count += 4;
  }
}

// 【老算法】根据颜色深浅动态调节字体颜色
/*    function cutColor(color) {
     var red = parseInt(color.substr(5, 3));
     var redDecade = Math.floor(red / 10); // 红十位
     var redHun = Math.floor(red / 100); // 红百位
     if (redDecade >= 1 && redHun >= 1) {
       var green = parseInt(color.substr(9, 3));
       if (Math.floor(green / 10) >= 1 && Math.floor(green / 100) >= 1) {
         var blue = parseInt(color.substr(13, 3));
       } else if (Math.floor(green / 10) >= 1 && Math.floor(green / 100) <= 1) {
         var blue = parseInt(color.substr(12, 3));
       } else {
         var blue = parseInt(color.substr(11, 3));
       }
     } else if (redDecade >= 1 && redHun <= 1) {
       var green = parseInt(color.substr(8, 3));
       if (Math.floor(green / 10) >= 1 && Math.floor(green / 100) >= 1) {
         var blue = parseInt(color.substr(12, 3));
       } else if (Math.floor(green / 10) >= 1 && Math.floor(green / 100) <= 1) {
         var blue = parseInt(color.substr(11, 3));
       } else {
         var blue = parseInt(color.substr(10, 3));
       }
     } else {
       var green = parseInt(color.substr(7, 3));
       if (Math.floor(green / 10) >= 1 && Math.floor(green / 100) >= 1) {
         var blue = parseInt(color.substr(11, 3));
       } else if (Math.floor(green / 10) >= 1 && Math.floor(green / 100) <= 1) {
         var blue = parseInt(color.substr(10, 3));
       } else {
         var blue = parseInt(color.substr(9, 3));
       }
     }

     var num = Math.ceil(red * 0.299 + green * 0.587 + blue * 0.114);
     if (num < 150) {
       return "white";
     } else {
       return "black";
     }
   } */

// 添加节点
$("guestbook__input__addBtn").onclick = () => {
  if (!$("guestbook__input__textControl").value || /^\s/.test($("guestbook__input__textControl").value)) {
    $("guestbook__input__textControl").setAttribute("class", "shake-button");
    // 放大文字，提示输入框内无内容
    $("guestbook__input__textControl").style.fontSize = "15px";
    $("guestbook__input__textControl").placeholder = "😊请先在这里输入想法";
    // 设置1s的延时器，删掉已经使用过的动画
    setTimeout(() => {
      $("guestbook__input__textControl").removeAttribute("class");
    }, 1000);
  } else {
    $("guestbook__input__textControl").style = "font-size:14px";
    $("guestbook__input__textControl").placeholder = "🤪期待更多的想法...";
    var newText = document.createTextNode($("guestbook__input__textControl").value);
    var newP = document.createElement("p");
    newP.setAttribute("class", "guestbook__message");
    newP.style.cssText = `background: ${randomColor()}; color: ${cutColor(randomColor())};`;
    newP.appendChild(newText);
    $("guestbook").appendChild(newP);
    $("guestbook__input__textControl").value = "";
    // 判断box是否出现纵向卷轴
    isScrollY();
    // 添加本地存储
    arrP.push(newP.innerHTML);
    arrPColor.push(newP.style.color);
    arrPBgcolor.push(newP.style.background); // 因为样式是添加在行间的，所以getStyle()函数无法获取到
    if (localP && localPColor && localPBgcolor) {
      localStorage.pItem = localP + "," + arrP;
      localStorage.pColorItem = localPColor + "," + arrPColor;
      localStorage.pBgcolorItem = localPBgcolor + "," + arrPBgcolor;
    } else {
      localStorage.pItem = arrP;
      localStorage.pColorItem = arrPColor;
      localStorage.pBgcolorItem = arrPBgcolor;
    }
  }
};

// 删除末尾节点
$("guestbook__input__delBtn").onclick = () => {
  if ($("guestbook").children.length >= 3) {
    $("guestbook").removeChild($("guestbook").lastElementChild);
    // 判断box是否出现纵向卷轴
    isScrollY();
    // 删除本地存储
    if (localP && !arrP[0]) {
      arrLocalP.pop();
      arrLocalPColor.pop();
      let findFirst = localPBgcolor.lastIndexOf("r");
      let findLast = localPBgcolor.lastIndexOf(")");
      let loopSum = findLast - findFirst;
      if (findFirst == 0) {
        for (let i = 0; i < loopSum + 1; i++) {
          arrLocalBg.pop();
        }
      } else {
        for (let i = 0; i < loopSum + 2; i++) {
          arrLocalBg.pop();
        }
      }
      arrLocalBg = arrLocalBg.join("");
      localStorage.pItem = arrLocalP;
      localStorage.pColorItem = arrLocalPColor;
      localStorage.pBgcolorItem = arrLocalBg;
      localP = localStorage.pItem;
      localPColor = localStorage.pColorItem;
      localPBgcolor = localStorage.pBgcolorItem;
      arrLocalP = localP.split(",");
      arrLocalPColor = localPColor.split(",");
      arrLocalBg = localPBgcolor.split("");
    }
    if (localP && arrP[0]) {
      arrP.pop();
      arrPColor.pop();
      arrPBgcolor.pop();
      localStorage.pItem = localP + "," + arrP;
      localStorage.pColorItem = localPColor + "," + arrPColor;
      localStorage.pBgcolorItem = localPBgcolor + "," + arrPBgcolor;
    }
    if (!localP && arrP[0]) {
      arrP.pop();
      arrPColor.pop();
      arrPBgcolor.pop();
      localStorage.pItem = arrP;
      localStorage.pColorItem = arrPColor;
      localStorage.pBgcolorItem = arrPBgcolor;
    }
  } else {
    $("guestbook__input__delBtn").setAttribute("class", "shake-button");
    setTimeout(() => {
      $("guestbook__input__delBtn").removeAttribute("class");
    }, 1000);
  }
};

// 拷贝末尾节点
$("guestbook__input__cloneBtn").onclick = () => {
  if ($("guestbook").children.length >= 3) {
    var cloneNode = $("guestbook").lastElementChild.cloneNode(true);
    $("guestbook").appendChild(cloneNode);
    // 判断box是否出现纵向卷轴
    isScrollY();
    // 本地存储
    arrP.push(cloneNode.innerHTML);
    arrPColor.push($("guestbook").lastElementChild.style.color);
    arrPBgcolor.push($("guestbook").lastElementChild.style.background);
    if (localP && localPColor && localPBgcolor) {
      localStorage.pItem = localP + "," + arrP;
      localStorage.pColorItem = localPColor + "," + arrPColor;
      localStorage.pBgcolorItem = localPBgcolor + "," + arrPBgcolor;
    } else {
      localStorage.pItem = arrP;
      localStorage.pColorItem = arrPColor;
      localStorage.pBgcolorItem = arrPBgcolor;
    }
  } else {
    $("guestbook__input__cloneBtn").setAttribute("class", "shake-button");
    setTimeout(() => {
      $("guestbook__input__cloneBtn").removeAttribute("class");
    }, 1000);
  }
};

// 设置键盘快捷键
window.addEventListener("keydown", ev => {
  var e = ev || window.event;
  var which = e.which || e.keyCode;
  if (which == 13) {
    $("guestbook__input__addBtn").onclick();
  }
  // 文本框为空的时候才能通过键盘拷贝操作(不影响鼠标事件）防止误操作
  if (e.ctrlKey && which == 67 && !$("guestbook__input__textControl").value) {
    $("guestbook__input__cloneBtn").onclick();
  }
  if (which == 46) {
    $("guestbook__input__delBtn").onclick();
  }
});
window.addEventListener("load", isScrollY);

// 动态获取标签方法
function $(id) {
  return document.getElementById(id);
}

// 随机颜色方法
function randomColor() {
  var randomC = `rgba(${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},${Math.floor(Math.random() * 255)},0.8)`;
  return randomC;
}

// 动态改变有无scrollbar时的样式
function isScrollY() {
  let isArise = $("guestbook").offsetHeight < $("guestbook").scrollHeight;
  if (isArise) {
    $("guestbook__input").style = "border-radius:2px 2px 0 0";
    $("guestbook").style = "border-radius:2px 2px 2px 2px";
  } else {
    $("guestbook__input").style = "border-radius:20px 20px 0 0";
    $("guestbook").style = "border-radius:20px";
  }
}

// 【新算法】根据颜色深浅动态调节字体颜色
function cutColor(color) {
  var arrColor = color.split("");
  var newArrColor = [];
  for (var i = 0; i < arrColor.length; i++) {
    if (Number(arrColor[i]) || /\,/.test(arrColor[i]) || arrColor[i] == 0) {
      newArrColor.push(arrColor[i]);
    }
  }
  newArrColor = newArrColor.join("");
  newArrColor = newArrColor.split(",");
  // 获得该颜色的灰阶值，以判断background的明亮程度匹配对应的反色
  var num = parseInt(newArrColor[0] * 0.299) + parseInt(newArrColor[1] * 0.587) + parseInt(newArrColor[2] * 0.114);
  if (num < 150) {
    return "white";
  } else {
    return "black";
  }
}
