const input = document.querySelector(".form-control");
const main = document.querySelector(".panel-body");

function replaceText(REG, TAG, value) {
  let tagArr = textTag.match(TAG);
  let text = textTag.replace(TAG, "ヾ");
  text = text.replace(REG, `<span class="label label-success">${value}</span>`);
  let j = 0;
  text = text.replace(eval("/ヾ/g"), () => tagArr[j++]);
  /* for (let i = 0, j = 0; i < text.length; i++) {
    if (/ヾ/.test(text[i])) {
      text = text.replace(text[i], tagArr[j]);
      j++;
    }
  } */
  return text;
}

let textTag = main.innerHTML;
input.addEventListener("keyup", () => {
  let value = input.value;
  const REG = new RegExp(value, "g");
  const TAG = /<[^>]+>/g;
  if (/\S/.test(value) && value) {
    main.innerHTML = replaceText(REG, TAG, value);
  } else {
    main.innerHTML = textTag;
  }
});
