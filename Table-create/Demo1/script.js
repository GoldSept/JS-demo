let row = document.getElementById("row");
let col = document.getElementById("col");
let table = document.getElementById("table");
let btn = document.getElementById("btn");

// 动态生成表格
btn.onclick = function () {
  if (Number(row.value) && Number(col.value)) {
    for (let i = 0; i < row.value; i++) {
      var tr = document.createElement("tr");
      if (i % 2 == 1) {
        tr.className = "rowC";
      }
      for (let i = 0; i < col.value; i++) {
        var td = document.createElement("td");
        tr.appendChild(td);
      }
      // 创建删除按钮
      var dTd = document.createElement("td");
      dTd.innerHTML = `<button>Delete</button>`;
      tr.appendChild(dTd);

      table.appendChild(tr);
    }
  } else {
    alert("请输入数字");
  }
};

// 删除行功能
table.addEventListener(
  "click",
  function (ev) {
    var e = ev || window.event;
    var target = e.target || window.event.srcElement;
    if (target.nodeName.toLowerCase() === "button") {
      // 删除button父节点的父节点（tr > td > button)
      table.removeChild(target.parentNode.parentNode);
    }
  },
  false
);

// 回车键生成绑定
window.onkeydown = ev => {
  var e = ev || window.event;
  var which = e.which || e.keyCode;
  if (which == 13) btn.onclick();
};
