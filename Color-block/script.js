setInterval(() => {
  let block = document.createElement('div');
  let randomColor = Math.random().toString(16).substr(2, 6);
  block.style.backgroundColor = '#' + randomColor;
  let isDead = hexToRgb(randomColor);
  if (isDead >= 100) {
    block.style.color = '#fff';
  }
  block.innerHTML = '#' + randomColor;
  document.body.appendChild(block);
}, 1000 / 60);

function hexToRgb(hex) {
  let r = parseInt('0x' + hex.slice(0, 3));
  let g = parseInt('0x' + hex.slice(3, 5));
  let b = parseInt('0x' + hex.slice(5, 7));
  const rgb = r * 0.299 + g * 0.587 + b * 0.114;
  return rgb;
}
