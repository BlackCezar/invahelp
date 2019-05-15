const html = document.querySelector('html');
const body = document.querySelector('body');
const btnLogin = document.querySelector('#btn-login');
const btnRegistration = document.querySelector('#btn-registration');
const loginScreen = document.querySelector('#loginScreen');
const registrationScreen = document.querySelector('#registrationScreen');
const loginBack = document.querySelector('#loginBack');
const registrationBack = document.querySelector('#registrationBack');
const FIO = document.querySelector('#FIO');
const regBtn = document.querySelector('#regBtn');


function splitFIO(string) {
  const splittedString = string.split(' ');

  const result = {
    surname: splittedString[0],
    firstName: splittedString[1],
    lastName: splittedString[2],
  };

  return result;
}

function login() {
  html.style.overflow = 'hidden';
  body.style.overflow = 'hidden';
  loginScreen.style.top = '0';
}

function loginBackClick() {
  loginScreen.style.top = '-100%';
  setTimeout(() => {
    body.style.removeProperty('overflow');
    html.style.removeProperty('overflow');
  }, 1500);
}

function registration() {
  html.style.overflow = 'hidden';
  body.style.overflow = 'hidden';
  registrationScreen.style.top = '0';

  regBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(splitFIO(FIO.value));
  });
}

function registrationBackClick() {
  registrationScreen.style.top = '100%';
  setTimeout(() => {
    body.style.removeProperty('overflow');
    html.style.removeProperty('overflow');
  }, 1500);
}

loginBack.addEventListener('click', loginBackClick);
registrationBack.addEventListener('click', registrationBackClick);
btnLogin.addEventListener('click', login);
btnRegistration.addEventListener('click', registration);
