var bA = document.getElementsByTagName("a");
var bD = document.getElementById("textBox");
var arr = [
  "李世民（599年1月23日 [156]  【一说598年1月28日】 [155]  —649年7月10日），祖籍陇西成纪（今甘肃秦安），一说陇西狄道（今甘肃省临洮县）人，又说钜鹿郡人。 [138]  唐朝第二位皇帝（626年—649年在位），政治家、战略家、军事家、书法家、诗人。",
  "唐高宗李治（628年7月21日 [1-2]  -683年12月27日 [3]  ），字为善，唐朝第三位皇帝（649年7月15日-683年12月27日在位），唐太宗李世民第九子，母为文德顺圣皇后长孙氏，前太子李承乾、魏王李泰同母弟。",
  "武曌[zhào] [1]  （624年－705年12月16日 [2]  ），即武则天，并州文水（今山西省文水县）人。唐朝至武周时期政治家，武周开国君主（690年－705年在位），也是中国历史上唯一的正统女皇帝、即位年龄最大（67岁）及寿命最长的皇帝之一（82岁）。",
  "唐玄宗李隆基（685年9月8日—762年5月3日），唐高宗李治与武则天之孙，唐睿宗李旦第三子，故又称李三郎，母窦德妃。 [1]  唐朝在位最长的皇帝（712年—756年在位）。"
];

for (var i = 0; i < bA.length; i++) {
  bA[i].index = i;
  bA[i].onmouseover = function () {
    bD.style.display = "block";
    this.setAttribute('class', 'hover');
    bD.innerHTML = arr[this.index];
  }
  bA[i].onmouseout = function () {
    bD.style.display = "none";
    this.removeAttribute('class');
  }
  bA[i].onmousemove = function (e) {
    var ev = e || window.event;
    // 因为层级关系，div比a标签的层级更高，当div显示出来后，鼠标理论上就不在a标签上了，所以会触发mouseout，div就显示不出来了；所以把div的位置往右往下多调动10个px
    bD.style.left = ev.clientX + 10 + 'px';
    bD.style.top = ev.clientY + 10 + 'px';
  }
}