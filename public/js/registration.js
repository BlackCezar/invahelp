const registrationForm = document.querySelector('#registrationForm');
const FIO = document.querySelector('#FIO').value;
const regBtn = document.querySelector('#regBtn');


function splitFIO(string) {
  const splittedString = string.split(' ');

  const result = {
    lastname: splittedString[0],
    firstname: splittedString[1],
    surname: splittedString[2],
  };

  return result;
}

const splittedFIO = splitFIO(FIO);

function registration(btn) {
  btn.preventDefault();
  const type = registrationForm.querySelector('select').value;
  const {
    firstname,
  } = splittedFIO.firstname;
  const {
    lastname,
  } = splittedFIO.lastname;
  const {
    surname,
  } = splittedFIO.surname;
  const tel = registrationForm.querySelector('input[type=tel]').value;
  const email = registrationForm.querySelector('input[type=email]').value;
  const password = registrationForm.querySelector('input[type=password]').value;

  const user = JSON.stringify({
    type,
    firstname,
    lastname,
    surname,
    tel,
    email,
    password,
  });
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/users/reg');
  xhr.setRequestHeader('Content-type', 'application/json');
  console.log(user);
  xhr.send(user);
}

regBtn.onclick = registration;
