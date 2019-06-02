const html = document.querySelector('html');
const body = document.querySelector('body');
const btnLogin = document.querySelector('#btn-login');
const btnRegistration = document.querySelector('#btn-registration');
const btnSelectService = document.querySelector('#btn-selectService');
const loginScreen = document.querySelector('#loginScreen');
const registrationScreen = document.querySelector('#registrationScreen');
const alreadyHaveAnAccountLink = document.querySelector('#alreadyHaveAnAccountLink');
const loginBack = document.querySelector('#loginBack');
const registrationBack = document.querySelector('#registrationBack');
const FIO = document.querySelector('#FIO');
const regBtn = document.querySelector('#regBtn');
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


function splitFIO(string) {
  const splittedString = string.split(' ');

  const result = {
    surname: splittedString[0],
    firstName: splittedString[1],
    lastName: splittedString[2],
  };

  return result;
}

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

function showRegistrationScreen() {
  html.style.overflow = 'hidden';
  body.style.overflow = 'hidden';
  registrationScreen.style.top = '0';
  registrationScreen.style.visibility = 'visible';

  regBtn.addEventListener('click', (e) => {
    e.preventDefault();
    console.log(splitFIO(FIO.value));
  });
}

function backFromRegistrationScreen() {
  registrationScreen.style.top = '100%';
  setTimeout(() => {
    body.style.removeProperty('overflow');
    html.style.removeProperty('overflow');
    registrationScreen.style.visibility = 'hidden';
  }, 1500);
}

function alreadyHaveAnAccount() {
  registrationScreen.style.top = '100%';
  loginScreen.style.top = '0';
  loginScreen.style.visibility = 'visible';
}

function scrollToThirdScreen() {
  // document.querySelector('.thirdScreen').scrollIntoView({behavior: 'smooth'};
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
btnLogin.onclick = showLoginScreen;

registrationBack.onclick = backFromRegistrationScreen;
alreadyHaveAnAccountLink.onclick = alreadyHaveAnAccount;

btnRegistration.onclick = showRegistrationScreen;
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
