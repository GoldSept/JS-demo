// 正则验证表单
var account = document.getElementById('account');
var text = document.getElementById('text');
var password = document.getElementById('password');
var passType = passBox.getElementsByClassName('ospan');

account.addEventListener('blur', function () {
  var emall = /^[a-zA-Z]\w+@\w+(\.\w)/;
  if (emall.test(account.value)) {
    text.innerHTML = '✅恭喜，该邮箱格式正确，可以注册！';
    text.style.color = 'green';
  } else {
    text.innerHTML = '📍请输入正确的邮箱';
    text.style.color = 'red';
  }
});

// 密码强度
var passStr = document.createElement('span');
box.appendChild(passStr);
box.lastElementChild.style.cssText = `position: absolute; right: 180px; bottom: 115px; font-size: 18px; font-weight: 600;`;
var index = null;

password.addEventListener('keyup', function () {
  // 每次必须重新获取密码框中的字符；如果声明在外面，值不会根据新输入的字符更新
  var passValue = this.value;

  // 每次改变passValue，清除所有样式
  for (var i = 0; i < passType.length; i++) {
    passType[i].style.backgroundColor = '#ccc';
  }

  // 密码强度判断
  if (passValue.length >= 6) {
    if (/^\d+$/.test(passValue) || /^[a-z]+$/.test(passValue) || /^[A-Z]+$/.test(passValue)) {
      passType[0].style.backgroundColor = 'red';
      passType[1].style.backgroundColor = 'red';
      passType[2].style.backgroundColor = 'red';
      index = 2;
    } else if (/\d/.test(passValue) && /[a-z]/.test(passValue) && /[A-Z]/.test(passValue) && passValue.length > 6) {
      for (var j = 0; j < passType.length; j++) {
        passType[j].style.backgroundColor = 'rgb(0, 255, 136)';
      }
      index = 6;
    } else {
      passType[3].style.backgroundColor = 'orange';
      passType[4].style.backgroundColor = 'orange';
      passType[5].style.backgroundColor = 'orange';
      index = 4;
    }
  }

  // 样式切换
  switch (index) {
    case 2:
      box.lastElementChild.innerText = '弱';
      box.lastElementChild.style.color = 'red';
      index = null;
      break;
    case 4:
      box.lastElementChild.innerText = '中';
      box.lastElementChild.style.color = 'orange';
      index = null;
      break;
    case 6:
      box.lastElementChild.innerText = '强';
      box.lastElementChild.style.color = 'rgb(0, 255, 136)';
      index = null;
      break;
    default:
      box.lastElementChild.innerText = ' ';
  }
});

/*  function fun() {
    var account = document.getElementById("account");
    var text = document.getElementById("text");

    var dataAcc = account.value;
    if (dataAcc.length < 6 || dataAcc.length > 18) {
      text.innerHTML = "📍长度应为6~18个字符！";
    } else if (!isABC(dataAcc[0])) {
      text.innerHTML = "📍首字符应该为字母";
    } else if (dataAcc.indexOf("@") == -1) {
      text.innerHTML = "📍确实必要符号“@”";
    } else {
      var isYes = true;
      for (var i = 0; i < dataAcc.length; i++) {
        if (!isDEF(dataAcc[i])) {
          isYes = false;
          break;
        }
      }
      if (isYes) {
        text.innerHTML = "✅恭喜，该邮箱格式正确，可以注册！";
      } else {
        text.innerHTML = "📍不得包含非法字符";
      }
    }
  }

  // 判断字符串是否是字母
  function isABC(str) {
    if (str >= "a" && str <= "z" || str >= "A" && str <= "Z") {
      return true;
    } else {
      return false;
    }
  }

  // 判断字符串是否含有字母、数字、下划线或者@
  function isDEF(str1) {
    if (str1 >= "a" && str1 <= "z" || str1 >= "A" && str1 <= "Z" || str1 >= 0 && str1 <= 9 || str1 == "_" || str1 == "@") {
      return true;
    } else {
      return false;
    }
  } */
