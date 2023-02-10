let box = document.querySelector("#box");
let btn = document.getElementById("btn");
let inp = document.querySelector("input[type='text']");
let mesBox = document.querySelector("#mesBox");
let message = document.querySelector("#message");
let record = document.querySelector("#recordNum");
let res = document.querySelector("input[type='reset']");

let recordNum = 0;
btn.onclick = function () {
  let num = parseInt(Math.random() * 100);

  if (Number(inp.value)) {
    if (num > inp.value) {
      mesBox.style.display = "block";
      message.innerHTML = `You guessed wrong.This number is larger than yours`;
      let newMesBox = document.createElement("span");
      let newMes = document.createTextNode(`${inp.value}`);
      newMesBox.appendChild(newMes);
      record.appendChild(newMesBox);
    } else if (num < inp.value) {
      mesBox.style.display = "block";
      message.innerHTML = `You guessed wrong.This number is smaller than yours`;
      let newMesBox = document.createElement("span");
      let newMes = document.createTextNode(`${inp.value}`);
      newMesBox.appendChild(newMes);
      record.appendChild(newMesBox);
    } else {
      let newMesBox = document.createElement("span");
      let newMes = document.createTextNode(`${inp.value}`);
      newMesBox.appendChild(newMes);
      record.appendChild(newMesBox);
      mesBox.style.display = "block";
      res.style.display = "block";
      message.classList.replace("message-red", "message-green");
      message.innerHTML = `You got it!`;
      btn.setAttribute("class", "btn--unselect");
    }
  } else {
    alert("Please enter correct characters!");
  }
  inp.value = "";
  recordNum++;
  if (recordNum == 10) {
    message.innerHTML = `GAME OVER`;
    btn.setAttribute("class", "btn--unselect");
    res.style.display = "block";
  }
};

res.addEventListener("click", function () {
  let span = record.querySelectorAll("span");
  recordNum = 0;
  inp.value = "";
  btn.classList.remove("btn--unselect");
  mesBox.style.display = "none";
  res.style.display = "none";
  message.className = "message-red";
  for (let i = 0; i < span.length; i++) {
    record.removeChild(span[i]);
  }
});

window.addEventListener("keyup", (ev) => {
  let e = ev || window.event;
  let which = e.which || e.keyCode;
  if (which == 13 && !(btn.className == "btn--unselect")) {
    btn.onclick();
  }
});
