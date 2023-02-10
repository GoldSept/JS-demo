let majorImg = document.querySelector(".js-ske-img");
let title = document.querySelector(".js-title");
let text = document.querySelector(".js-text");
let headImg = document.querySelector(".js-head-portrait");
let person = document.querySelector(".js-person-infor");
let anima = document.querySelectorAll(".ske--anima");

setTimeout(loading, 2000);

function loading() {
  majorImg.innerHTML =
    "<img src='https://images.unsplash.com/photo-1661861853202-3d8616ecd029?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=8' />";
  title.innerHTML = "<h1>This is a new iPhone, wow</h1>";
  text.innerHTML = `<div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam animi fugiat voluptatibus fugit velit esse perspiciatis cum adipisci voluptatum dolorem iure</div>`;
  headImg.innerHTML =
    '<img src="https://images.unsplash.com/photo-1582885745933-e43bee4517ae?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8aGVhZHBvcnRyYWl0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60" />';
  person.innerHTML = `<p>Kent Jakubowski</p>
  <p>Mon Apr 18 2022</p>`;

  anima.forEach(item => item.classList.remove("ske--anima"));
}
