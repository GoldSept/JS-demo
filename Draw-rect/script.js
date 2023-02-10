document.addEventListener('mousedown', e => {
  let rect = document.createElement('div');
  rect.classList.add('rect');
  document.body.appendChild(rect);
  let mousedownX = e.clientX;
  let mousedownY = e.clientY;
  rect.style.left = mousedownX + 'px';
  rect.style.top = mousedownY + 'px';
  document.onmousemove = e => {
    rect.style.transform = `scale(${e.clientX - mousedownX}, ${e.clientY - mousedownY})`;
  };
});
document.addEventListener('mouseup', () => {
  document.onmousemove = null;
});
