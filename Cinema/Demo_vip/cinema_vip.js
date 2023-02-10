var newDiv = document.createElement("div");
var newDiv1 = document.createElement("div");
var newUl = document.createElement("ul");

// 封装设置属性的函数
function attSet(ele, newEle, att, value) {
  ele.appendChild(newEle);
  ele.lastElementChild.setAttribute(att, value);
}

// 设置属性
attSet(document.body, newDiv, "id", "box");
attSet(document.getElementById("box"), newUl, "id", " ");
attSet(document.getElementById("box"), newDiv1, "id", "boxSonDiv");

var oDiv = document.getElementById("box");
var oUl = document.querySelector("ul");
var oDiv1 = document.getElementById("boxSonDiv");

oDiv1.innerHTML = "屏幕中央";

oDiv.style.cssText = `border: 1px solid;
                      border-radius: 15px;
                      width: 750px;
                      height: 600px;
                      display: flex; 
                      flex-direction: column;
                      align-items: center;
                      justify-content: space-around;`;
oUl.style.cssText = `width: 650px;
                     height: 440px;
                     position: relative;
                     display: flex;
                     flex-flow: row wrap-reverse;
                     justify-content: space-between;
                     align-content: space-between;`;
oDiv1.style.cssText = `border: 1px solid #c0c0c0;
                       border-radius: 15px;
                       width: 350px;
                       height: 85px;
                       text-align: center;
                       line-height: 85px;
                       letter-spacing: 6px;
                       font-size: 18px;
                       box-shadow: 3px 3px 8px #c0c0c0;
                       background: linear-gradient(to bottom, #fff, rgb(0, 47, 167));`;

let arrLi = [];

for (let i = 1; i < 37; i++) {
  var table = {
    id: i,
    vip: i % 5 == 0 ? true : false
  }
  arrLi.push(table);
}

// 动态生成li标签
for (let i = 0; i < Math.floor(oUl.getBoundingClientRect().height / 70) * 6; i++) {
  let newLi = document.createElement("li");
  oUl.appendChild(newLi);
}

var oLi = document.getElementsByTagName("li");
// 设置li标签样式
for (var j = 0; j < oLi.length; j++) {
  oLi[j].style.cssText = `background-color: #c0c0c0;
                          border-radius: 15px;
                          width: 90px;
                          height: 50px;
                          margin: 5px;
                          list-style: none;
                          transition: .5s;`;
  oLi[j].setAttribute("data-vip", arrLi[j].vip);
  oLi[j].onmouseenter = function () {
    this.style.cursor = "pointer";
  }
}

// 设置监听事件
oUl.addEventListener('mouseup', function (e) {
  var e = e || window.event;
  var target = e.target || e.srcElement;
  if (target.nodeName === "LI") {
    arrLi.forEach((item, index) => {
      oLi[index].onclick = function () {
        let classValue = this.getAttribute("class");
        if (!classValue) {
          this.setAttribute("class", "click");
          if (item.vip) {
            this.innerHTML = '<span><svg t="1651312848109" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2327" width="29" height="29"><path d="M626.568192 981.999616l-23.379968 0-36.857856 0.283648L68.137984 982.283264l0-23.989248c0 0-10.815488-134.006784 186.535936-168.308736 0 0 150.230016-20.28032 160.748544-61.595648 0 0 5.732352-4.596736 1.502208-52.578304-9.017344-102.161408-75.86816-150.234112-102.909952-189.293568-27.041792-39.063552-29.293568-84.13184-29.293568-84.13184 0-11.264 4.716544-15.391744 12.560384-22.626304 9.696256-8.950784 6.786048-18.4576 4.934656-28.52864-7.04512-38.23616-7.666688-99.662848-0.970752-138.138624 1.502208-45.820928 43.56608-82.625536 43.56608-82.625536 7.892992-6.695936 15.803392-14.062592 21.343232-22.898688 1.547264-2.460672 2.970624-5.09952 3.8144-7.897088 3.16928-10.548224-7.560192-18.292736-5.407744-29.51168 1.942528-10.116096 19.280896-10.61376 29.766656-11.164672 23.614464-1.243136 47.347712-2.172928 70.925312-0.366592C641.71008 72.155136 699.725824 137.1136 699.725824 137.1136c13.73696 16.449536 22.787072 36.566016 28.23168 57.184256 1.630208 6.16448 3.028992 12.45696 3.785728 18.79552 5.501952 31.602688 5.481472 64.559104 3.770368 96.494592-0.815104 15.22688-2.584576 30.215168-4.819968 45.282304-1.17248 7.8848-0.571392 15.222784 4.70016 21.523456 4.4032 5.271552 9.44128 8.95488 11.60192 15.881216 1.011712 3.238912 1.275904 6.736896 1.275904 10.112 0 0-2.255872 45.068288-29.297664 84.13184-27.041792 39.059456-93.893632 87.13216-102.905856 189.293568-4.23424 47.981568 1.502208 52.578304 1.502208 52.578304 10.514432 41.314304 160.748544 61.595648 160.748544 61.595648 199.55712 37.010432 186.53184 168.308736 186.53184 168.308736l0 23.989248-131.3792 0 20.70016-0.283648L836.49536 982.00064l-36.64384 0L626.568192 982.00064 626.568192 981.999616z" p-id="2328" fill="orange"></path></svg></span>';
          } else {
            this.innerHTML = '<span><svg t="1651312848109" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2327" width="29" height="29"><path d="M626.568192 981.999616l-23.379968 0-36.857856 0.283648L68.137984 982.283264l0-23.989248c0 0-10.815488-134.006784 186.535936-168.308736 0 0 150.230016-20.28032 160.748544-61.595648 0 0 5.732352-4.596736 1.502208-52.578304-9.017344-102.161408-75.86816-150.234112-102.909952-189.293568-27.041792-39.063552-29.293568-84.13184-29.293568-84.13184 0-11.264 4.716544-15.391744 12.560384-22.626304 9.696256-8.950784 6.786048-18.4576 4.934656-28.52864-7.04512-38.23616-7.666688-99.662848-0.970752-138.138624 1.502208-45.820928 43.56608-82.625536 43.56608-82.625536 7.892992-6.695936 15.803392-14.062592 21.343232-22.898688 1.547264-2.460672 2.970624-5.09952 3.8144-7.897088 3.16928-10.548224-7.560192-18.292736-5.407744-29.51168 1.942528-10.116096 19.280896-10.61376 29.766656-11.164672 23.614464-1.243136 47.347712-2.172928 70.925312-0.366592C641.71008 72.155136 699.725824 137.1136 699.725824 137.1136c13.73696 16.449536 22.787072 36.566016 28.23168 57.184256 1.630208 6.16448 3.028992 12.45696 3.785728 18.79552 5.501952 31.602688 5.481472 64.559104 3.770368 96.494592-0.815104 15.22688-2.584576 30.215168-4.819968 45.282304-1.17248 7.8848-0.571392 15.222784 4.70016 21.523456 4.4032 5.271552 9.44128 8.95488 11.60192 15.881216 1.011712 3.238912 1.275904 6.736896 1.275904 10.112 0 0-2.255872 45.068288-29.297664 84.13184-27.041792 39.059456-93.893632 87.13216-102.905856 189.293568-4.23424 47.981568 1.502208 52.578304 1.502208 52.578304 10.514432 41.314304 160.748544 61.595648 160.748544 61.595648 199.55712 37.010432 186.53184 168.308736 186.53184 168.308736l0 23.989248-131.3792 0 20.70016-0.283648L836.49536 982.00064l-36.64384 0L626.568192 982.00064 626.568192 981.999616z" p-id="2328" fill="rgba(0, 47, 167, 1)"></path></svg></span>';
          }
        } else {
          this.removeAttribute("class", " ");
          this.innerHTML = "";
        }
      }
    });
  }
}, false);