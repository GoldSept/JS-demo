// 页面中插入基本样式
document.body.innerHTML = `<div id = "box">
 <ul></ul>
 <div id = "boxSonDiv">屏幕中央</div>
</div>`;
// 获取最外层div标签
var box = document.getElementById("box");
// 获取ul标签
var listBox = document.querySelector("ul");
// 获取box的子div
var boxSonDiv = document.querySelector("#boxSonDiv");

// 设置样式
box.style.cssText = `width: 750px; 
height: 600px; 
border: 1px solid;
border-radius: 25px;
display: flex;
flex-direction: column;
justify-content: space-around;
align-items: center;`;
listBox.style.cssText = `width: 650px; 
height: 440px; 
display: flex;
flex-flow: row wrap-reverse;
justify-content: space-between;
align-content: space-between;`;
boxSonDiv.style.cssText = `border: 1px solid #a4b0be;
height: 85px;
width: 350px;
border-radius: 5px;
text-align: center;
line-height: 85px;
box-shadow: 3px 3px 15px #a4b0be;`;

// 获取ul的自身高度
var listBoxDistance = listBox.getBoundingClientRect().height;
// 动态添加li标签
var addList = () => {
  var listLabel = "";
  for (var i = 0; i < Math.floor(listBoxDistance / 70) * 6; i++) {
    listLabel += "<li></li>";
  }
  return listLabel;
};

// li标签写入ul标签
listBox.innerHTML = addList();

// 获取li标签并添加样式
var list = listBox.getElementsByTagName("li");
for (var i = 0; i < list.length; i++) {
  list[i].style.cssText = `list-style: none; 
width: 90px; 
height: 50px; 
margin: 5px;
border-radius: 5px;
background: #a4b0be;
color: #000;
`;
  // 给li标签添加hover伪类
  list[i].onmouseover = function () {
    this.style.cursor = "pointer";
  };
}

// 选座逻辑(监听事件)
listBox.addEventListener(
  "mouseup",
  function (e) {
    var e = e || window.event;
    var target = e.target || e.srcElement;
    if (target.nodeName.toLowerCase() === "li") {
      for (var i = 0; i < list.length; i++) {
        list[i].onclick = function () {
          var res = this.getAttribute("class");
          if (!res) {
            this.setAttribute("class", "click");
            this.style.backgroundColor = "#7bed9f";
            this.style.transition = "0.2s";
          } else {
            this.setAttribute("class", "");
            this.style.backgroundColor = "#a4b0be";
            this.style.transition = "0.2s";
          }
        };
      }
    }
  },
  false
);
