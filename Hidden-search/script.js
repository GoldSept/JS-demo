let btn = document.querySelector("button");
let inp = document.querySelector("#search-box");
btn.onclick = () => {
  inp.classList.toggle("shrink");
  inp.focus();
};
