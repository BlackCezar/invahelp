const registrationForm = document.querySelector('#registrationForm');
const regBtn = document.querySelector('#regBtn');


function splitFIO(string) {
  const splittedString = string.split(' ');

  const result = {
    lastname: splittedString[0],
    firstname: splittedString[1],
    surname: splittedString[2],
  };

  // console.log(result);


  return result;
}

// function defaultInput() {
//   FIO.value = 'Миронов Роман Сергеевич';
//   registrationForm.querySelector('input[type=tel]').value = '+79831466191';
//   registrationForm.querySelector('input[type=email]').value = 'vokabulyar@gmail.com';
//   registrationForm.querySelector('#pass').value = 'password';
//   registrationForm.querySelector('#repass').value = 'password';
// }

function checkPass(pass1, pass2) {
  return (pass1 === pass2);
}

function registration(btn) {
  btn.preventDefault();
  let password = registrationForm.querySelector('#pass1').value;
  const pass2 = registrationForm.querySelector('#pass2');


  console.log(checkPass(password, pass2.value));


  if (checkPass(password, pass2.value)) {
    const FIO = document.querySelector('#FIO');
    const splittedFIO = splitFIO(FIO.value);
    const role = registrationForm.querySelector('select').value;
    const {
      firstname,
      lastname,
      surname,
    } = splittedFIO;
    const phone = registrationForm.querySelector('input[type=tel]').value;
    const email = registrationForm.querySelector('input[type=email]').value;
    const user = JSON.stringify({
      role,
      firstname,
      lastname,
      surname,
      phone,
      email,
      password,
    });
    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/users/reg');
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(user);
    console.log(user);
  } else {
    password = '';
    pass2.value = '';
    pass2.placeholder = 'Введенные пароли не совпадают';
    setTimeout(() => {
      pass2.placeholder = '';
    }, 1500);
  }
}


regBtn.onclick = registration;
