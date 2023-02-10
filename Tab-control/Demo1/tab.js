var dBtn = document.getElementsByTagName("button");
var dDiv = document.getElementsByTagName("div");

for (var i = 0; i < dBtn.length; i++) {
  dBtn[i].index = i;
  dBtn[i].onclick = function () {
    for (var j = 0; j < dBtn.length; j++) {
      dBtn[j].className = " ";
      dDiv[j].style.display = "none";
    }
    this.className = "active";
    dDiv[this.index].style.display = "block";
  };
}
