const boxEl = document.querySelector('.container');
const styleArr = [0, 0, 0, 0, 1, 1, 2, 3, 3, 2, 1, 2, 0, 2, 3];
const direction = ['top, left', 'top, right', 'bottom, left', 'bottom, right', 'top', 'bottom', 'left', 'right'];

function sort(arr) {
  arr.sort(() => (Math.random() > 0.5 ? 1 : -1));
}

function randomItem() {
  let itemsEl = '';
  sort(styleArr);
  sort(direction);
  for (let i = 0; i < styleArr.length; i++) {
    itemsEl += `
    <div style="transform-origin: ${direction[i] ?? 'center'}" 
      class="grid-box-item-${styleArr[i]}"></div>`;
  }
  boxEl.innerHTML = itemsEl;
}

randomItem();
// setInterval(randomItem, 1500);
