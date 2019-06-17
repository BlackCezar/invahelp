// const session = require('session');

const html = document.querySelector('html');
const body = document.querySelector('body');
const btnLogin = document.querySelector('#btn-login');
const loginSubmit = document.querySelector('#loginSubmit');
const inputEmail = document.querySelector('#inputEmail');
const inputPassword = document.querySelector('#inputPassword');

const btnRegistration = document.querySelector('#btn-registration');
const btnSelectService = document.querySelector('#btn-selectService');
const loginScreen = document.querySelector('#loginScreen');
const registrationScreen = document.querySelector('#registrationScreen');
const alreadyHaveAnAccountLink = document.querySelector('#alreadyHaveAnAccountLink');
const dontHaveAnAccountLink = document.querySelector('#dontHaveAnAccountLink');
const loginBack = document.querySelector('#loginBack');
const registrationBack = document.querySelector('#registrationBack');
const btnTaxiServices = document.querySelector('.btnTaxiServices');
const btnTaxiOrderBack = document.querySelector('.btnTaxiOrderBack');
const btnVolunteerServices = document.querySelector('.btnVolunteerServices');
const btnVolunteerDeliveryService = document.querySelector('.btnVolunteerDeliveryService');
const btnSelectServiceBack = document.querySelector('.btnSelectServiceBack');
const btnOtherServiceBack = document.querySelector('.btnOtherServiceBack');
const btnDeliveryOrderBack = document.querySelector('.btnDeliveryOrderBack');
// const services = document.querySelector('.services');
const taxi = document.querySelector('.taxi');
const main = document.querySelector('.main');
const delivery = document.querySelector('.delivery');
const volunteerServices = document.querySelector('.volunteerServices');
const otherServices = document.querySelector('.otherServices');
const theOrderIsSentForExecution = document.querySelector('.theOrderIsSentForExecution');
const btnVolunteerOtherServices = document.querySelector('.btnVolunteerOtherServices');
const btnVolunteerMedicalAidService = document.querySelector('.btnVolunteerMedicalAidService');
const btnMedicalAidOrderBack = document.querySelector('.btnMedicalAidOrderBack');
const volunteerMedicalAidService = document.querySelector('.volunteerMedicalAidService');
const volunteerOtherService = document.querySelector('.volunteerOtherService');
const btnVolunteerOtherService = document.querySelector('.btnVolunteerOtherService');
const btnOtherServiceOrderBack = document.querySelector('.btnOtherServiceOrderBack');

const btnOtherServiceOrder = document.querySelector('.btnOtherServiceOrder');
const btnMedicalAidOrder = document.querySelector('.btnMedicalAidOrder');
const btnDeliveryOrder = document.querySelector('.btnDeliveryOrder');
const btnTaxiOrder = document.querySelector('.btnTaxiOrder');

// const firstScreen = document.querySelector('.firstScreen');

function showLoginScreen() {
  html.style.overflow = 'hidden';
  body.style.overflow = 'hidden';
  loginScreen.style.top = '0';
  loginScreen.style.visibility = 'visible';
}

function backFromLoginScreen() {
  loginScreen.style.top = '-100%';
  setTimeout(() => {
    body.style.removeProperty('overflow');
    html.style.removeProperty('overflow');
    loginScreen.style.visibility = 'hidden';
  }, 1500);
}

// function showRegistrationScreen() {
//   html.style.overflow = 'hidden';
//   body.style.overflow = 'hidden';
//   registrationScreen.style.top = '0';
//   registrationScreen.style.visibility = 'visible';
// }

function backFromRegistrationScreen() {
  registrationScreen.style.top = '100%';
  setTimeout(() => {
    body.style.removeProperty('overflow');
    html.style.removeProperty('overflow');
    registrationScreen.style.visibility = 'hidden';
  }, 1500);
}

function dontHaveAnAccount() {
  loginScreen.style.top = '-100%';
  registrationScreen.style.top = '0';
  registrationScreen.style.visibility = 'visible';
}

function alreadyHaveAnAccount() {
  registrationScreen.style.top = '100%';
  loginScreen.style.top = '0';
  loginScreen.style.visibility = 'visible';
}

function scrollToThirdScreen() {
  document.querySelector('.thirdScreen').scrollIntoView({
    behavior: 'smooth',
  });
}

function theOrderIsSentForExecutionAnimation(btn) {
  btn.preventDefault();
  // console.log(btn.target.dataset.screentohide);
  switch (btn.target.dataset.screentohide) {
    case 'taxi':
      taxi.style.top = '100%';
      theOrderIsSentForExecution.style.top = '0';
      setTimeout(() => {
        taxi.style.top = '0';
        theOrderIsSentForExecution.style.top = '100%';
      }, 2000);
      break;
    case 'delivery':
      delivery.style.top = '100%';
      theOrderIsSentForExecution.style.top = '0';
      setTimeout(() => {
        delivery.style.top = '0';
        theOrderIsSentForExecution.style.top = '100%';
      }, 2000);
      break;
    case 'volunteerMedicalAidService':
      volunteerMedicalAidService.style.top = '100%';
      theOrderIsSentForExecution.style.top = '0';
      setTimeout(() => {
        volunteerMedicalAidService.style.top = '0';
        theOrderIsSentForExecution.style.top = '100%';
      }, 2000);
      break;
    case 'volunteerOtherService':
      volunteerOtherService.style.top = '100%';
      theOrderIsSentForExecution.style.top = '0';
      setTimeout(() => {
        volunteerOtherService.style.top = '0';
        theOrderIsSentForExecution.style.top = '100%';
      }, 2000);
      break;
    default:
      break;
  }
}

function switchScreen(btn) {
  // console.log(btn.target.dataset.destination);
  switch (btn.target.dataset.destination) {
    case 'from main to taxi':
      main.style.left = '100%';
      taxi.style.left = '0';
      break;
    case 'from taxi to main':
      btn.preventDefault();
      main.style.left = '0';
      taxi.style.left = '-100%';
      break;
    case 'from main to volunteerServices':
      main.style.left = '-100%';
      volunteerServices.style.left = '0';
      break;
    case 'from volunteerServices to main':
      main.style.left = '0';
      volunteerServices.style.left = '100%';
      break;
    case 'from volunteerServices to delivery':
      volunteerServices.style.left = '100%';
      delivery.style.left = '0';
      break;
    case 'from delivery to volunteerServices':
      btn.preventDefault();
      volunteerServices.style.left = '0';
      delivery.style.left = '-100%';
      break;
    case 'from volunteerServices to otherServices':
      volunteerServices.style.left = '-100%';
      otherServices.style.left = '0';
      break;
    case 'from otherServices to volunteerServices':
      volunteerServices.style.left = '0';
      otherServices.style.left = '100%';
      break;
    case 'from otherServices to volunteerMedicalAidService':
      volunteerMedicalAidService.style.left = '0';
      otherServices.style.left = '100%';
      break;
    case 'from volunteerMedicalAidService to otherServices':
      btn.preventDefault();
      volunteerMedicalAidService.style.left = '-100%';
      otherServices.style.left = '0';
      break;
    case 'from otherServices to volunteerOtherService':
      volunteerOtherService.style.left = '0';
      otherServices.style.left = '-100%';
      break;
    case 'from volunteerOtherService to otherServices':
      btn.preventDefault();
      volunteerOtherService.style.left = '100%';
      otherServices.style.left = '0';
      break;

    default:
      break;
  }
}


loginBack.onclick = backFromLoginScreen;
btnLogin.onclick = () => {
  alert('Личный кабинет еще в разработке');
};

registrationBack.onclick = backFromRegistrationScreen;
alreadyHaveAnAccountLink.onclick = alreadyHaveAnAccount;
dontHaveAnAccountLink.onclick = dontHaveAnAccount;

btnSelectService.onclick = scrollToThirdScreen;

btnTaxiServices.onclick = switchScreen;
btnTaxiOrderBack.onclick = switchScreen;

btnVolunteerServices.onclick = switchScreen;
btnSelectServiceBack.onclick = switchScreen;

btnVolunteerDeliveryService.onclick = switchScreen;
btnDeliveryOrderBack.onclick = switchScreen;

btnVolunteerOtherServices.onclick = switchScreen;
btnOtherServiceBack.onclick = switchScreen;

btnVolunteerMedicalAidService.onclick = switchScreen;
btnMedicalAidOrderBack.onclick = switchScreen;

btnVolunteerOtherService.onclick = switchScreen;
btnOtherServiceOrderBack.onclick = switchScreen;

btnTaxiOrder.onclick = theOrderIsSentForExecutionAnimation;
btnDeliveryOrder.onclick = theOrderIsSentForExecutionAnimation;
btnMedicalAidOrder.onclick = theOrderIsSentForExecutionAnimation;
btnOtherServiceOrder.onclick = theOrderIsSentForExecutionAnimation;

let session = {
  auth: false,
  id: null,
  role: '',
};

function checkLoginInputs() {
  if (inputEmail.value.trim() === '') {
    alert('Вы не ввели электронную почту');
  }
  if (inputPassword.value.trim() === '') {
    alert('Вы не ввели пароль');
  }
  const data = JSON.stringify({
    email: inputEmail.value.trim(),
    password: inputPassword.value.trim(),
  });

  console.log('checkLoginInputs:');
  console.log(data);
  console.log(session);

  return data;
}

function logout() {
  const xhr = new XMLHttpRequest();
  xhr.open('GET', 'api/users/logout');
  xhr.send();
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      // console.log(xhr.responseText);
      if (xhr.status === 200) {
        session = {
          auth: false,
          id: null,
          role: null,
        };
        console.log(session);
        inputEmail.value = '';
        inputPassword.value = '';
        showLoginScreen();
        loginBack.classList.add('hidden');
        registrationBack.classList.add('hidden');
      }
    }
  };
}

function login(e) {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'api/users/login');
  xhr.setRequestHeader('Content-type', 'application/json');
  const data = checkLoginInputs();
  xhr.send(data);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const response = JSON.parse(xhr.responseText);
      if (response.status === 200) {
        let user;
        console.log(response);
        session = {
          auth: true,
          id: response.id,
          role: response.role,
        };

        if (session.role === '4') {
          window.open('https://invahelp.herokuapp.com/admin', '_self');
        } else {
          xhr.open('GET', `api/users/${session.id}`);
          xhr.send();
          xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
              console.log('/:session.id:');
              user = JSON.parse(xhr.response);
              console.log(user);
              if (response.status === 200) {
                btnLogin.innerHTML = user[0].firstname;
                btnRegistration.innerHTML = 'Выйти';
                backFromLoginScreen();
              }
            }
          };
        }
      } else {
        // if (response.status) alert(response.status);
        // if (response.reason) alert(response.reason);
      }
    }
  };
}

loginSubmit.onclick = login;

document.onreadystatechange = () => {
  showLoginScreen();
  logout();
};

btnRegistration.onclick = logout;


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

function checkRegistrationForm() {
  const FIO = document.querySelector('#FIO');
  const splittedFIO = splitFIO(FIO.value);
  const role = registrationForm.querySelector('select').value;
  const {
    firstname,
    lastname,
    surname,
  } = splittedFIO;
  let password = registrationForm.querySelector('#pass1').value;
  const pass2 = registrationForm.querySelector('#pass2');
  const phone = registrationForm.querySelector('input[type=tel]').value;
  const email = registrationForm.querySelector('input[type=email]').value;

  if (FIO.value === '') {
    FIO.placeholder = 'Заполните это поле';
    setTimeout(() => {
      FIO.placeholder = 'ФИО';
    }, 1500);
  }
  if (phone.value === '') {
    phone.placeholder = 'Заполните это поле';
    setTimeout(() => {
      phone.placeholder = 'Телефон';
    }, 1500);
  }
  if (email.value === '') {
    email.placeholder = 'Заполните это поле';
    setTimeout(() => {
      email.placeholder = 'Электронная почта';
    }, 1500);
  }
  if (password === '') {
    email.placeholder = 'Заполните это поле';
    setTimeout(() => {
      email.placeholder = 'Пароль';
    }, 1500);
  }
  if (pass2.value === '') {
    email.placeholder = 'Заполните это поле';
    setTimeout(() => {
      email.placeholder = 'Повторите пароль';
    }, 1500);
  }
  if (!checkPass(password, pass2.value)) {
    password = '';
    pass2.value = '';
    pass2.placeholder = 'Введенные пароли не совпадают';
    setTimeout(() => {
      pass2.placeholder = 'Повторите пароль';
    }, 1500);
  }
  const user = JSON.stringify({
    role,
    firstname,
    lastname,
    surname,
    phone,
    email,
    password,
  });

  return user;
}

function registration(e) {
  e.preventDefault();
  const userData = checkRegistrationForm();
  const xhr = new XMLHttpRequest();
  xhr.open('POST', '/api/users/reg');
  xhr.setRequestHeader('Content-type', 'application/json');
  console.log(userData);
  xhr.send(userData);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      console.log('reg success');
      xhr.open('POST', '/api/users/login');
      xhr.setRequestHeader('Content-type', 'application/json');
      console.log('userData here:');
      xhr.send(userData);
      console.log(userData);
      let user;
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          const response = JSON.parse(xhr.responseText);
          if (response.status === 200) {
            console.log(response);
            session = {
              auth: true,
              id: response.id,
              role: response.role,
            };
            console.log('session');
            console.log(session);
            xhr.open('GET', `api/users/${session.id}`);
            xhr.send();
            console.log(`api/users/${session.id}`);
            xhr.onreadystatechange = () => {
              if (xhr.readyState === 4) {
                user = JSON.parse(xhr.response);
                console.log(user);
                btnLogin.innerHTML = user[0].firstname;
                btnRegistration.innerHTML = 'Выйти';
                backFromRegistrationScreen();
              } else {
                console.log('progress...');
              }
            };
            console.log('session');
            console.log(session);
          }
        }
      };
    }
    console.log('registration in progress...');
  };
}

regBtn.onclick = registration;


function createTaxiOrder(e) {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'api/orders/');
  xhr.setRequestHeader('Content-type', 'application/json');

  // const form = document.querySelector('#taxiOrderForm');
  const caddress = document.querySelector('#clientAddress');
  const daddress = document.querySelector('#destinationAddress');
  const dttaxi = document.querySelector('#datetime-taxi');
  if (caddress.value === '') {
    caddress.placeholder = 'Необходимо ввести ваш адрес';
    setTimeout(() => {
      caddress.placeholder = 'Ваш адрес';
      caddress.focus();
    }, 1500);
    return;
  }
  if (daddress.value === '') {
    daddress.placeholder = 'Необходимо ввести адрес назначения';
    setTimeout(() => {
      daddress.placeholder = 'Адрес назначения';
      daddress.focus();
    }, 1500);
    return;
  }
  const data = JSON.stringify({
    'service id': 0,
    'user id': session.id,
    'appointed time': dttaxi.value,
    'client address': caddress.value,
    'destination address': daddress.value,
    'shopping list': 'Не требуется',
    'payment method': 'Не требуется',
    comment: null,
  });
  xhr.send(data);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const response = JSON.parse(xhr.response);
      if (response.status === 200) {
        console.log('Заявка успешно отправлена');
        theOrderIsSentForExecutionAnimation(e);
        caddress.value = '';
        daddress.value = '';
        dttaxi.value = '';
      }
    }
  };
}

btnTaxiOrder.onclick = createTaxiOrder;

function createDeliveryOrder(e) {
  e.preventDefault();
  const xhr = new XMLHttpRequest();
  xhr.open('POST', 'api/orders/');
  xhr.setRequestHeader('Content-type', 'application/json');
  // const form = document.querySelector('#deliveryOrderForm');
  const serviceId = document.querySelector('#serviceId');
  const caddress = document.querySelector('#clientAddressDelivery');
  const sp = document.querySelector('#shoppingListDelivery');
  const dtdelivery = document.querySelector('#datetime-delivery');
  if (sp.value === '') {
    sp.placeholder = 'Необходимо ввести значение';
    setTimeout(() => {
      sp.placeholder = 'Список покупок';
      sp.focus();
    }, 1500);
    return;
  }
  if (caddress.value === '') {
    caddress.placeholder = 'Необходимо ввести ваш адрес';
    setTimeout(() => {
      caddress.placeholder = 'Ваш адрес';
      caddress.focus();
    }, 1500);
    return;
  }

  const data = JSON.stringify({
    'service id': serviceId.value,
    'user id': session.id,
    'appointed time': dtdelivery.value,
    'client address': caddress.value,
    'destination address': 'Не требуется',
    'shopping list': sp.value,
    'payment method': 'Не требуется',
  });
  xhr.send(data);
  xhr.onreadystatechange = () => {
    if (xhr.readyState === 4) {
      const response = JSON.parse(xhr.response);
      if (response.status === 200) {
        console.log('Заявка успешно отправлена');
        theOrderIsSentForExecutionAnimation(e);
        caddress.value = '';
        sp.value = '';
        dtdelivery.value = '';
      }
    }
  };
}

btnDeliveryOrder.onclick = createDeliveryOrder;
