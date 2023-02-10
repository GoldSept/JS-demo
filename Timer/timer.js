function $(id) {
  return document.getElementById(id);
}

var i = 0;
var timer = null;
var isRuning = false;

function run() {
  timer = setInterval(() => {
    i++;
    $("sec").innerHTML = changeNum(i % 60);
    $("min").innerHTML = changeNum(parseInt(i / 60) % 60);
    $("hour").innerHTML = changeNum(parseInt(i / 3600));
  }, 1000);
}

$("btnSP").onclick = () => {
  if (!isRuning) {
    $(
      "btnSP"
    ).innerHTML = `<svg t="1651074489161" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="3799" width="27" height="27"><path d="M320 128A64 64 0 0 0 256 192v640a64 64 0 0 0 128 0v-640A64 64 0 0 0 320 128z m384 0A64 64 0 0 0 640 192v640a64 64 0 0 0 128 0v-640A64 64 0 0 0 704 128z" p-id="3800" fill="#8a8a8a"></path></svg>`;
    isRuning = true;
    run();
  } else {
    if (i != "00") {
      $(
        "btnSP"
      ).innerHTML = `<svg t="1651074526346" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4260" width="27" height="27"><path d="M512 85.333333c235.264 0 426.666667 191.402667 426.666667 426.666667s-191.402667 426.666667-426.666667 426.666667S85.333333 747.264 85.333333 5126 27.736 85.333333 512 85.333333z m0-85.333333C229.248 0 0 229.248 0 512s229.248 512 512 512 512-229.248 512-512S794.752 0 512 0z m42.666667 512l-256 170.624V341.376L554.666667 512z m0-170.624v341.248L810.666667 512l-256-170.624z" p-id="4261" fill="#8a8a8a"></path></svg>`;
    }
    clearInterval(timer);
    isRuning = false;
  }
};

$("reset").onclick = () => {
  clearInterval(timer);
  $("sec").innerHTML = "00";
  $("min").innerHTML = "00";
  $("hour").innerHTML = "00";
  i = 0;
  $(
    "btnSP"
  ).innerHTML = `<svg t="1651074222717" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2051" width="27" height="27"><path d="M870.2 466.333333l-618.666667-373.28a53.333333 53.333333 0 0 0-80.866666 45.666667v746.56a53.206667 53.206667 0 0 0 80.886666 45.666667l618.666667-373.28a53.333333 53.333333 0 0 0 0-91.333334z" fill="#8a8a8a" p-id="2052"></path></svg>`;
  isRuning = false;
};

function changeNum(n) {
  return n < 10 ? "0" + n : n;
}
