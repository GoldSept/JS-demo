const table = document.createElement("table");
table.width = 500;
table.cellSpacing = 0;
table.cellPadding = 15;
const btn = document.getElementById("add-btn");

// 创建表头 - begin
table.createCaption().innerText = "人员信息表";
table.createTHead();
table.tHead.align = "center";
let theadTr = table.tHead.insertRow();
theadTr.insertCell().innerText = "ID";
theadTr.insertCell().innerText = "Name";
theadTr.insertCell().innerText = "Subject";
theadTr.insertCell().innerText = "Grade";
theadTr.insertCell().innerText = "Operation";
// 创建表头 - end

// 创建表体
table.createTBody();
table.tBodies[0].align = "center";

table.addEventListener("click", function (e) {
  if (e.target.nodeName === "A") {
    table.tBodies[0].removeChild(e.target.parentNode.parentNode);
  }
});

// 动态渲染
let i = 0;
let id = 1;
let dataArr = [];
btn.onclick = function () {
  let nameInp = document.getElementById("name");
  let subInp = document.getElementById("subject");
  let gradeInp = document.getElementById("grade");
  if (nameInp.value && subInp.value && gradeInp.value) {
    // 存储用户数据
    let dataObj = {
      id: id++,
      perName: nameInp.value,
      sub: subInp.value,
      grade: gradeInp.value,
    };
    dataArr.push(dataObj);

    let tbodyTr = table.tBodies[0].insertRow();
    for (let key in dataArr[i]) {
      tbodyTr.insertCell().innerHTML = dataArr[i][key];
    }
    tbodyTr.insertCell().innerHTML = '<a href="javascript:;">删除</a>';
    document.body.appendChild(table);
    i++;
    nameInp.value = "";
    subInp.value = "";
    gradeInp.value = "";
  } else {
    alert("无数据");
  }
};
