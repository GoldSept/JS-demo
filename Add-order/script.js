const goodsData = [
  { gName: "iPhone5", gPrice: "￥200.00" },
  { gName: "电饭煲", gPrice: "￥500.00" },
];
// 初始化表格数据
window.onload = function () {
  init();
};
// 创建订单输入框
const goodsName = `商品名称：<input type="text" id="goodsName"> `;
const goodsPri = `商品价格：<input type="text" id="goodsPri">`;
// 生成表格及渲染样式
const table = document.createElement("table");
table.cellSpacing = 0;
table.cellPadding = 5;
table.width = 500;
table.style.cssText = `border: 1px solid #ccc; margin: 20px auto`;
// 生成表头
let hTr = table.createTHead().insertRow();
hTr.bgColor = "#99ff66";
let textData = ["商品名称", "商品价格", "备注"];
for (let i = 0; i < textData.length; i++) {
  let hTh = document.createElement("th");
  hTh.innerHTML = textData[i];
  hTr.appendChild(hTh);
}
// 生成表体、表格底部
let tbody = table.createTBody();
tbody.align = "center";
let tfoot = table.createTFoot();
let btnCell = tfoot.insertRow().insertCell();
btnCell.innerHTML = "<button>增加订单</button>";
tfoot.align = "center";
btnCell.colSpan = 3;
// 表格内渲染数据
function init() {
  for (let i = 0; i < goodsData.length; i++) {
    let bTr = tbody.insertRow();
    for (let key in goodsData[i]) {
      bTr.insertCell().innerHTML = goodsData[i][key];
    }
    bTr.insertCell().innerHTML = '<a href="javascript:;">删除</a>';
  }
}
// 封装存储新增订单信息并渲染功能
function add() {
  let inpName = document.getElementById("goodsName");
  let inpPri = document.getElementById("goodsPri");
  if (inpName.value && inpPri.value) {
    tbody.innerHTML = "";
    let newOderData = {
      gName: inpName.value,
      gPrice: inpPri.value,
    };
    goodsData.push(newOderData);
    inpPri.value = "";
    inpName.value = "";
    init();
  } else {
    alert("请输入订单信息哦");
  }
}
// 封装删除订单数据
function del(target) {
  // 将DOM集合类数组转换为普通数组
  let listTr = Array.from(tbody.querySelectorAll("tr"));
  // 获取当前要被删除订单一行的下标
  let delDataIndex = listTr.indexOf(target.parentNode.parentNode);
  // 订单数据对象中删除对应的数据
  goodsData.splice(delDataIndex, 1);
  tbody.removeChild(target.parentNode.parentNode);
}
// 增加/删除表格数据
table.addEventListener("click", e => {
  let target = e.target;
  switch (target.nodeName) {
    case "A":
      del(target);
      break;
    case "BUTTON":
      add();
      break;
    default:
      break;
  }
});

document.write(goodsName);
document.write(goodsPri);
document.body.appendChild(table);
