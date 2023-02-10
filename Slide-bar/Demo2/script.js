/**
 * @Author: ATang
 * @Date: 2022-09-21 16:20:21
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-09-21 16:21:04
 * @FilePath: \JS笔记+项目\Demo\slideBar\Demo2\script.js
 * @Description:
 * @🔆神明保佑，永无BUG🔆
 * @Copyright (c) 2022 by error: git config user.name && git config user.email & please set dead value or install git, All Rights Reserved.
 */
const number = document.querySelector(".plan");
const sliderBox = document.querySelector(".slider-wrap");
const block = document.querySelector(".block");
const fill = document.querySelector(".fill");

let maxWidth = sliderBox.clientWidth;

block.addEventListener("mousedown", e => {
  let mouseX = e.clientX - block.offsetLeft;
  document.onmousemove = e => {
    let l = e.clientX - mouseX;
    let maxRange = maxWidth - block.offsetWidth;
    if (l >= maxRange) l = maxRange;
    if (l <= 0) l = 0;
    block.style.left = l + "px";
    fill.style.width = l === maxRange ? maxWidth + "px" : l + 10 + "px";
    number.innerHTML = parseInt((l / maxRange) * 100) + "%";
    number.style.fontSize = parseInt((l / maxRange) * 100) + "px";
  };
});

document.addEventListener("mouseup", () => {
  document.onmousemove = null;
});
