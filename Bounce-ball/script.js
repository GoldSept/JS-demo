window.addEventListener("dragstart", e => e.preventDefault());
const addBtn = document.getElementById("add-btn");
const body = document.body;
addBtn.onclick = () => {
  const ball = newBall();
  document.body.appendChild(ball);
  let speedTop = Math.round(Math.random() * (35 - 5) + 5);
  let speedLeft = Math.round(Math.random() * (35 - 5) + 5);
  ~(function move() {
    requestAnimationFrame(move);
    /* 变量保存位置信息，减少页面reflow(回流) */
    const boxHeight = body.offsetHeight;
    const boxWidth = body.offsetWidth;
    const ballTop = ball.offsetTop;
    const ballLeft = ball.offsetLeft;
    const ballHeight = ball.offsetHeight;
    const ballWidth = ball.offsetWidth;
    if (ballTop + ballHeight >= boxHeight || ballTop <= 0) {
      speedTop *= -1;
    }
    if (ballLeft + ballWidth >= boxWidth || ballLeft <= 0) {
      speedLeft *= -1;
    }
    ball.style.left = ballLeft + speedLeft + "px";
    ball.style.top = ballTop + speedTop + "px";
  })();
};

function newBall() {
  let randomColor = Math.random().toString(16).substr(2, 6);
  let randomSize = Math.round(Math.random() * (180 - 25) + 25);
  let ball = document.createElement("div");
  ball.style.cssText = `width: ${randomSize}px; 
                        height: ${randomSize}px; 
                        background-color: #${randomColor}; 
                        box-shadow: 0 0 55px #${randomColor}; 
                        filter: blur(8px); `;
  return ball;
}
